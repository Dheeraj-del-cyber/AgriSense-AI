"""
AgriSense AI RAG (Retrieval-Augmented Generation) Knowledge Engine
Retrieves and ranks relevant user diagnosis history, plant scans, treatments,
and farm context to personalize LLM agronomic advice.
"""

import re
from typing import List, Dict, Any, Optional
from datetime import datetime

# Agronomic keyword vocabulary for fast intent mapping
CROPS = ["apple", "grape", "tomato", "potato", "corn", "rice", "wheat", "cotton", "soybean", "pepper", "citrus", "mango"]
DISEASES = [
    "scab", "blight", "rot", "rust", "spot", "mildew", "curl", "measles", "esca", 
    "bacterial", "fungal", "viral", "mosaic", "wilt", "canker", "chlorosis", "healthy"
]
TREATMENT_TERMS = [
    "spray", "chemical", "organic", "cure", "treatment", "fungicide", "pesticide", 
    "medicine", "dose", "dosage", "fertilizer", "manure", "copper", "mancozeb",
    "neem", "water", "irrigation", "moisture", "prevention", "protect", "prune"
]
FOLLOW_UP_TERMS = [
    "it", "this", "my plant", "my crop", "the disease", "last scan", "previous",
    "earlier", "yesterday", "again", "cured", "progress", "follow up", "still",
    "same", "improve", "worse", "better", "photo", "image", "leaf"
]

def _tokenize(text: str) -> set:
    if not text:
        return set()
    cleaned = re.sub(r"[^\w\s]", " ", str(text).lower())
    return {w for w in cleaned.split() if len(w) > 2}

def score_scan_relevance(scan: Dict[str, Any], query_tokens: set, is_latest: bool = False) -> float:
    """
    Computes a relevance score between a farmer's query and a historical scan.
    """
    score = 0.0
    diagnosis = str(scan.get("diagnosis", "")).lower()
    diag_tokens = _tokenize(diagnosis)

    # 1. Direct disease or crop name match
    overlap = query_tokens.intersection(diag_tokens)
    if overlap:
        score += 10.0 * len(overlap)

    # 2. Crop match
    for crop in CROPS:
        if crop in query_tokens and crop in diagnosis:
            score += 8.0

    # 3. Disease symptom / type match
    for dis in DISEASES:
        if dis in query_tokens and dis in diagnosis:
            score += 7.0

    # 4. If query asks about treatment, give points if scan has detailed guidance
    if any(t in query_tokens for t in TREATMENT_TERMS):
        if scan.get("guidance"):
            score += 4.0

    # 5. Follow-up intent boost (e.g. "how do I treat my plant", "is it cured")
    if any(f in query_tokens for f in FOLLOW_UP_TERMS):
        score += 3.0
        if is_latest:
            score += 8.0  # Strongly prefer the latest diagnosed crop if follow-up pronoun is used

    # 6. Recency baseline so latest scan is known if relevant
    if is_latest:
        score += 2.0

    return score

def format_date_str(iso_or_str: Optional[str]) -> str:
    if not iso_or_str:
        return "Recent"
    try:
        dt = datetime.fromisoformat(iso_or_str.replace("Z", "+00:00"))
        return dt.strftime("%b %d, %Y (%I:%M %p)")
    except Exception:
        return str(iso_or_str)

def retrieve_user_context(query: str, user_context: Optional[Dict[str, Any]], max_scans: int = 3) -> str:
    """
    Retrieves and synthesizes relevant context from the user's personal knowledge base.
    """
    if not user_context:
        return "No prior user farm records found. Treat as a new farmer consultation."

    profile = user_context.get("profile") or {}
    scans = user_context.get("scans") or []

    context_lines = []

    # 1. Farmer Profile Summary
    farmer_name = profile.get("name") or "Farmer"
    farmer_phone = profile.get("phone") or "Not registered"
    farmer_location = profile.get("location") or profile.get("farmLocation") or "Karnataka, India"
    crops_grown = profile.get("crops") or profile.get("preferredCrops") or []
    
    crops_str = ", ".join(crops_grown) if isinstance(crops_grown, list) and crops_grown else "General Agriculture"
    context_lines.append(f"Farmer Profile: Name: {farmer_name} | Location: {farmer_location} | Registered Crops: {crops_str}")

    # 2. Scans retrieval
    if not scans:
        context_lines.append("Plant Scan History: No leaf scans or disease records stored yet.")
    else:
        query_tokens = _tokenize(query)
        scored_scans = []
        for idx, scan in enumerate(scans):
            is_latest = (idx == 0)
            score = score_scan_relevance(scan, query_tokens, is_latest=is_latest)
            scored_scans.append((score, idx, scan))

        # Sort by score descending, then by recency (lower original index)
        scored_scans.sort(key=lambda x: (x[0], -x[1]), reverse=True)
        top_scans = [s[2] for s in scored_scans[:max_scans]]

        context_lines.append(f"Relevant Field Diagnostic Records (Total user scans: {len(scans)}):")
        for i, s in enumerate(top_scans, 1):
            diag = s.get("diagnosis", "Unknown Plant")
            conf = s.get("confidence")
            conf_str = f"{round(float(conf), 1)}%" if conf is not None else "N/A"
            moist = s.get("moisture")
            moist_str = f"{moist}%" if (moist is not None and str(moist).lower() not in ("offline", "none")) else "Sensor Offline (--%)"
            scan_date = format_date_str(s.get("createdAt") or s.get("date"))

            scan_info = f"  [{i}] Crop/Condition: {diag} | Confidence: {conf_str} | Soil Moisture: {moist_str} | Date: {scan_date}"
            
            # Extract treatments if present
            guidance = s.get("guidance")
            if isinstance(guidance, dict):
                org = guidance.get("organic") or []
                chem = guidance.get("chemical") or []
                rec = guidance.get("recovery") or []
                prev = guidance.get("prevention") or []

                treatment_summary = []
                if rec:
                    t_str = rec[0] if isinstance(rec, list) else str(rec)
                    treatment_summary.append(f"Immediate Action: {t_str}")
                if org:
                    t_str = org[0] if isinstance(org, list) else str(org)
                    treatment_summary.append(f"Organic: {t_str}")
                if chem:
                    t_str = chem[0] if isinstance(chem, list) else str(chem)
                    treatment_summary.append(f"Chemical: {t_str}")
                if prev:
                    t_str = prev[0] if isinstance(prev, list) else str(prev)
                    treatment_summary.append(f"Prevention: {t_str}")

                if treatment_summary:
                    scan_info += "\n      Previous Prescriptions: " + "; ".join(treatment_summary)
            elif isinstance(guidance, str) and guidance.strip():
                scan_info += f"\n      Prescription note: {guidance[:140]}..."

            context_lines.append(scan_info)

    return "\n".join(context_lines)
