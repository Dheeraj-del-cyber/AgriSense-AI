"""Persistent account, profile, and scan-history API."""
import base64
import hashlib
import hmac
import json
import os
import re
import secrets
import sqlite3
from contextlib import contextmanager
from datetime import datetime, timedelta, timezone
from functools import wraps

from flask import Blueprint, g, jsonify, request


profile_bp = Blueprint("profile_api", __name__)
PASSWORD_ITERATIONS = 260_000
SESSION_DAYS = 30
MAX_HISTORY = 12
MAX_PHOTO_BYTES = 800_000
MAX_THUMBNAIL_BYTES = 350_000


def _database_path():
    return os.environ.get(
        "AGRISENSE_DATABASE_PATH",
        os.path.join(os.path.dirname(os.path.dirname(__file__)), "instance", "agrisense.sqlite3"),
    )


@contextmanager
def _connect():
    path = _database_path()
    os.makedirs(os.path.dirname(os.path.abspath(path)), exist_ok=True)
    connection = sqlite3.connect(path, timeout=10)
    connection.row_factory = sqlite3.Row
    connection.execute("PRAGMA foreign_keys = ON")
    try:
        yield connection
        connection.commit()
    except Exception:
        connection.rollback()
        raise
    finally:
        connection.close()


def initialize_profile_store():
    with _connect() as connection:
        connection.executescript(
            """
            CREATE TABLE IF NOT EXISTS profile_users (
                phone TEXT PRIMARY KEY,
                name TEXT NOT NULL,
                password_salt BLOB NOT NULL,
                password_hash BLOB NOT NULL,
                joined_at TEXT NOT NULL,
                photo TEXT NOT NULL DEFAULT '',
                scan_count INTEGER NOT NULL DEFAULT 0
            );
            CREATE TABLE IF NOT EXISTS profile_sessions (
                token_hash TEXT PRIMARY KEY,
                phone TEXT NOT NULL REFERENCES profile_users(phone) ON DELETE CASCADE,
                expires_at TEXT NOT NULL
            );
            CREATE TABLE IF NOT EXISTS profile_scans (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                phone TEXT NOT NULL REFERENCES profile_users(phone) ON DELETE CASCADE,
                diagnosis TEXT NOT NULL,
                confidence REAL,
                moisture REAL,
                guidance TEXT NOT NULL DEFAULT '',
                guidance_details TEXT,
                created_at TEXT NOT NULL,
                thumbnail TEXT NOT NULL DEFAULT ''
            );
            CREATE INDEX IF NOT EXISTS idx_profile_scans_phone_id
                ON profile_scans(phone, id DESC);
            """
        )


def _utc_now():
    return datetime.now(timezone.utc)


def _hash_password(password, salt):
    return hashlib.pbkdf2_hmac(
        "sha256", password.encode("utf-8"), salt, PASSWORD_ITERATIONS
    )


def _hash_token(token):
    return hashlib.sha256(token.encode("utf-8")).hexdigest()


def _json_body():
    data = request.get_json(silent=True)
    if not isinstance(data, dict):
        return None
    return data


def _public_profile(connection, user):
    scans = connection.execute(
        """
        SELECT diagnosis, confidence, moisture, guidance, guidance_details,
               created_at, thumbnail
        FROM profile_scans
        WHERE phone = ?
        ORDER BY id DESC
        LIMIT ?
        """,
        (user["phone"], MAX_HISTORY),
    ).fetchall()
    return {
        "name": user["name"],
        "phone": user["phone"],
        "joinDate": user["joined_at"],
        "photo": user["photo"],
        "scanCount": user["scan_count"],
        "scans": [
            {
                "diagnosis": scan["diagnosis"],
                "confidence": scan["confidence"],
                "moisture": scan["moisture"],
                "guidance": scan["guidance"],
                "guidanceDetails": json.loads(scan["guidance_details"])
                if scan["guidance_details"]
                else None,
                "createdAt": scan["created_at"],
                "thumbnail": scan["thumbnail"],
            }
            for scan in scans
        ],
    }


def _issue_session(connection, phone):
    token = secrets.token_urlsafe(32)
    expires_at = (_utc_now() + timedelta(days=SESSION_DAYS)).isoformat()
    connection.execute(
        "INSERT INTO profile_sessions (token_hash, phone, expires_at) VALUES (?, ?, ?)",
        (_hash_token(token), phone, expires_at),
    )
    return token


def _authorized_user():
    authorization = request.headers.get("Authorization", "")
    scheme, separator, token = authorization.partition(" ")
    if not separator or scheme.lower() != "bearer" or not token.strip():
        return None

    token_hash = _hash_token(token.strip())
    with _connect() as connection:
        row = connection.execute(
            """
            SELECT u.*, s.token_hash
            FROM profile_sessions s
            JOIN profile_users u ON u.phone = s.phone
            WHERE s.token_hash = ? AND s.expires_at > ?
            """,
            (token_hash, _utc_now().isoformat()),
        ).fetchone()
    if row:
        g.profile_token_hash = row["token_hash"]
    return row


def _require_auth(handler):
    @wraps(handler)
    def wrapped(*args, **kwargs):
        user = _authorized_user()
        if not user:
            return jsonify({"error": "Please sign in to access your profile."}), 401
        g.profile_user = user
        return handler(*args, **kwargs)

    return wrapped


def _validate_credentials(data, require_name=False):
    phone = data.get("phone")
    password = data.get("password")
    name = data.get("name")
    if not isinstance(phone, str) or not re.fullmatch(r"[0-9]{10}", phone):
        return None, None, None, "Enter a valid 10-digit phone number."
    if not isinstance(password, str) or not 8 <= len(password) <= 128:
        return None, None, None, "Password must be between 8 and 128 characters."
    if require_name and (
        not isinstance(name, str) or not name.strip() or len(name.strip()) > 80
    ):
        return None, None, None, "Name must be between 1 and 80 characters."
    return phone, password, name.strip() if isinstance(name, str) else None, None


@profile_bp.post("/api/auth/register")
def register():
    data = _json_body()
    if data is None:
        return jsonify({"error": "A JSON request body is required."}), 400
    phone, password, name, error = _validate_credentials(data, require_name=True)
    if error:
        return jsonify({"error": error}), 400

    salt = secrets.token_bytes(16)
    password_hash = _hash_password(password, salt)
    joined_at = _utc_now().date().isoformat()
    with _connect() as connection:
        try:
            connection.execute(
                """
                INSERT INTO profile_users (phone, name, password_salt, password_hash, joined_at)
                VALUES (?, ?, ?, ?, ?)
                """,
                (phone, name, salt, password_hash, joined_at),
            )
        except sqlite3.IntegrityError:
            return jsonify({"error": "An account with this phone number already exists. Please sign in."}), 409
        token = _issue_session(connection, phone)
        user = connection.execute(
            "SELECT * FROM profile_users WHERE phone = ?", (phone,)
        ).fetchone()
        profile = _public_profile(connection, user)
    return jsonify({"token": token, "profile": profile}), 201


@profile_bp.post("/api/auth/login")
def login():
    data = _json_body()
    if data is None:
        return jsonify({"error": "A JSON request body is required."}), 400
    phone, password, _, error = _validate_credentials(data)
    if error:
        return jsonify({"error": error}), 400

    with _connect() as connection:
        user = connection.execute(
            "SELECT * FROM profile_users WHERE phone = ?", (phone,)
        ).fetchone()
        if not user or not hmac.compare_digest(
            _hash_password(password, user["password_salt"]), user["password_hash"]
        ):
            return jsonify({"error": "Phone number or password is incorrect."}), 401
        token = _issue_session(connection, phone)
        profile = _public_profile(connection, user)
    return jsonify({"token": token, "profile": profile})


@profile_bp.post("/api/auth/logout")
@_require_auth
def logout():
    with _connect() as connection:
        connection.execute(
            "DELETE FROM profile_sessions WHERE token_hash = ?",
            (g.profile_token_hash,),
        )
    return jsonify({"success": True})


@profile_bp.get("/api/profile")
@_require_auth
def get_profile():
    with _connect() as connection:
        user = connection.execute(
            "SELECT * FROM profile_users WHERE phone = ?",
            (g.profile_user["phone"],),
        ).fetchone()
        return jsonify({"profile": _public_profile(connection, user)})


@profile_bp.put("/api/profile")
@_require_auth
def update_profile():
    data = _json_body()
    if data is None or not data:
        return jsonify({"error": "Provide profile fields to update."}), 400
    if set(data) - {"name", "photo"}:
        return jsonify({"error": "Only the name and photo can be updated."}), 400

    name = data.get("name")
    if name is not None and (
        not isinstance(name, str) or not name.strip() or len(name.strip()) > 80
    ):
        return jsonify({"error": "Name must be between 1 and 80 characters."}), 400

    photo = data.get("photo")
    if photo is not None:
        if not isinstance(photo, str):
            return jsonify({"error": "Photo must be an encoded image."}), 400
        if photo and (
            len(photo) > MAX_PHOTO_BYTES
            or not re.fullmatch(r"data:image/(?:jpeg|png);base64,[A-Za-z0-9+/=]+", photo)
        ):
            return jsonify({"error": "Photo must be a JPEG or PNG under 600 KB."}), 400
        if photo:
            try:
                base64.b64decode(photo.split(",", 1)[1], validate=True)
            except (ValueError, base64.binascii.Error):
                return jsonify({"error": "The photo data is invalid."}), 400

    updates = []
    values = []
    if name is not None:
        updates.append("name = ?")
        values.append(name.strip())
    if photo is not None:
        updates.append("photo = ?")
        values.append(photo)

    with _connect() as connection:
        connection.execute(
            f"UPDATE profile_users SET {', '.join(updates)} WHERE phone = ?",
            (*values, g.profile_user["phone"]),
        )
        user = connection.execute(
            "SELECT * FROM profile_users WHERE phone = ?",
            (g.profile_user["phone"],),
        ).fetchone()
        profile = _public_profile(connection, user)
    return jsonify({"profile": profile})


@profile_bp.post("/api/profile/scans")
@_require_auth
def save_scan():
    data = _json_body()
    if data is None:
        return jsonify({"error": "A JSON request body is required."}), 400

    diagnosis = data.get("diagnosis")
    if not isinstance(diagnosis, str) or not diagnosis.strip() or len(diagnosis) > 160:
        return jsonify({"error": "A valid diagnosis is required."}), 400

    confidence = data.get("confidence")
    if confidence is not None:
        if isinstance(confidence, bool):
            return jsonify({"error": "Confidence must be a number from 0 to 100."}), 400
        try:
            confidence = float(confidence)
        except (TypeError, ValueError):
            return jsonify({"error": "Confidence must be a number from 0 to 100."}), 400
        if not 0 <= confidence <= 100:
            return jsonify({"error": "Confidence must be a number from 0 to 100."}), 400

    moisture = data.get("moisture")
    if moisture is not None:
        if isinstance(moisture, bool):
            return jsonify({"error": "Moisture must be a number from 0 to 100."}), 400
        try:
            moisture = float(moisture)
        except (TypeError, ValueError):
            return jsonify({"error": "Moisture must be a number from 0 to 100."}), 400
        if not 0 <= moisture <= 100:
            return jsonify({"error": "Moisture must be a number from 0 to 100."}), 400

    guidance = data.get("guidance", "")
    if not isinstance(guidance, str) or len(guidance) > 1000:
        return jsonify({"error": "Guidance must be 1000 characters or fewer."}), 400

    guidance_details = data.get("guidanceDetails")
    if guidance_details is not None and not isinstance(guidance_details, (dict, list)):
        return jsonify({"error": "Guidance details must be an object or list."}), 400
    try:
        guidance_details_json = (
            json.dumps(guidance_details, ensure_ascii=False)
            if guidance_details is not None
            else None
        )
    except (TypeError, ValueError):
        return jsonify({"error": "Guidance details could not be saved."}), 400
    if guidance_details_json and len(guidance_details_json) > 20_000:
        return jsonify({"error": "Guidance details are too large to save."}), 400

    thumbnail = data.get("thumbnail", "")
    if not isinstance(thumbnail, str):
        return jsonify({"error": "Thumbnail must be an encoded image."}), 400
    if thumbnail and (
        len(thumbnail) > MAX_THUMBNAIL_BYTES
        or not re.fullmatch(r"data:image/(?:jpeg|png);base64,[A-Za-z0-9+/=]+", thumbnail)
    ):
        return jsonify({"error": "Thumbnail must be a JPEG or PNG under 260 KB."}), 400
    if thumbnail:
        try:
            base64.b64decode(thumbnail.split(",", 1)[1], validate=True)
        except (ValueError, base64.binascii.Error):
            return jsonify({"error": "Thumbnail data is invalid."}), 400

    created_at = _utc_now().isoformat()
    phone = g.profile_user["phone"]
    with _connect() as connection:
        connection.execute(
            """
            INSERT INTO profile_scans
                (phone, diagnosis, confidence, moisture, guidance, guidance_details, created_at, thumbnail)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                phone,
                diagnosis.strip(),
                confidence,
                moisture,
                guidance.strip(),
                guidance_details_json,
                created_at,
                thumbnail,
            ),
        )
        connection.execute(
            "UPDATE profile_users SET scan_count = scan_count + 1 WHERE phone = ?",
            (phone,),
        )
        connection.execute(
            """
            DELETE FROM profile_scans
            WHERE phone = ? AND id NOT IN (
                SELECT id FROM profile_scans WHERE phone = ? ORDER BY id DESC LIMIT ?
            )
            """,
            (phone, phone, MAX_HISTORY),
        )
        user = connection.execute(
            "SELECT * FROM profile_users WHERE phone = ?", (phone,)
        ).fetchone()
        profile = _public_profile(connection, user)
    return jsonify({"success": True, "profile": profile}), 201
