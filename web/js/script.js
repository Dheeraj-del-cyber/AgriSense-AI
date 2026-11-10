/* ================================================
   AGRISENSE AI — REBUILT CORE LOGIC
   Clean, Modular, and Robust PWA Implementation
   ================================================ */

// AgriSense AI Core State (v1.0.1)
const AppState = {
    currentScreen: 'screenHome',
    previousScreen: null,
    resultSource: null,
    selectedFile: null,
    currentLang: localStorage.getItem('agri-lang') || 'en',
    iotInterval: null,
    lastMoisture: 0
};



/* --- Translations --- */
const TRANSLATIONS = {
    en: {
        navHome: 'Hub', navDetect: 'Diagnostics', navCrops: 'Crops', navScan: 'Start Scan',
        navBottomHub: 'Hub', navBottomDetect: 'Detect', navBottomPlanner: 'Planner', navBottomIoT: 'Telemetry', navBottomAdvisor: 'Advisor', navBottomProfile: 'Profile',
        heroBadge: 'Precision Agronomic Intelligence',
        heroTitle1: 'Healthy Crops', heroTitle2: 'Predictable Yields',
        heroDesc: 'Clinical foliar disease diagnosis, real-time root-zone telemetry, and verified agronomic protocols.',
        heroBtn1: 'Analyze Leaf Specimen',
        statCrops: 'Crops Supported', statDiseases: 'Pathogens Modeled', statLangs: 'Languages',
        statAdvice: 'Advisory Engine', statFocus: 'Edge Field Ready',
        selectLang: 'Platform Language',
        doThisFirst: 'Primary Operations',
        qaScanLeaf: 'Pathology Diagnostics', qaScanSub: 'Instant foliar classification',
        qaIoT: 'Soil Telemetry', qaIoTSub: 'Real-time root-zone moisture',
        qaChat: 'Agronomic Consultation', qaChatSub: 'Interactive crop advisory',
        secFeaturesTitle: 'Operational Systems',
        secFeaturesDesc: 'Integrated field intelligence combining neural diagnostics and hardware telematics.',
        featDetect: 'Disease Diagnostics', featDetectDesc: 'Computer vision analysis across 38+ plant pathogens.',
        featMonitor: 'Soil Telemetry', featMonitorDesc: 'Live root-zone moisture tracking with dynamic thresholds.',
        todayTip: "Agronomic Bulletin",
        workflowTitle: 'Diagnostic Protocol', workflowSubtitle: 'From field sample to actionable agronomic treatment in seconds',
        step1Title: 'Capture Specimen', step1Desc: 'Photograph affected crop foliage under natural lighting.',
        step2Title: 'Neural Analysis', step2Desc: 'CNN evaluates pathogen signature with confidence scoring.',
        step3Title: 'Apply Treatment', step3Desc: 'Follow structured biological, chemical, and preventive protocols.',
        back: 'Back', pageDetect: 'Pathology Diagnostics',
        uploadTitle: 'Upload Foliage Specimen', uploadDrag: 'Drag and drop image or browse file system',
        uploadFormats: 'JPEG / PNG formats supported (up to 8 MB)', uploadHint: 'Ensure foliage is flat, sharp, and in natural daylight.',
        btnTakePhoto: 'Capture with Camera', btnChoosePhoto: 'Browse Image File',
        retake: 'Discard Specimen', analyze: 'Run Diagnostic Analysis',
        scanStepsTitle: 'Diagnostic Operating Procedure',
        scanStep1: 'Mount or hold specimen flat with clear background',
        scanStep2: 'Initiate diagnostic inference for pathology report',
        scanStep3: 'Review targeted biological and chemical remediation',
        photoTipsTitle: 'Imaging Best Practices',
        tip1: 'Natural, diffused daylight without direct harsh glare',
        tip2: 'Fill 70% or more of the frame with the target leaf',
        tip3: 'Ensure macro focus is sharp and motionless',
        tip4: 'Frame both healthy tissue and symptomatic lesions',
        iotTitle: 'Field Telemetry & Soil Station', iotSoilMoisture: 'Soil Moisture Level',
        fetching: 'Syncing telemetry...', lastUpdated: 'Last Packet:',
        iotAIRec: 'Agronomic Assessment', iotOptRange: 'Target Range',
        iotConn: 'Telemetry Link', iotLive: 'Active', iotOffline: 'Offline', iotDisconnected: 'Sensor telemetry interrupted. Verify hardware link.',
        iotMinToday: '24h Minimum', iotMaxToday: '24h Maximum',
        iotAverage: 'Moving Average', iotReadings: 'Packet Count',
        iotChartTitle: 'Root-Zone Moisture Trendline', iotLast20: 'Last 20 Telemetry Samples',
        iotWeather: 'Field Agrometeorology', iotDetectLoc: 'Querying station coordinates...',
        iotRefreshWeather: 'Refresh Weather Feed',
        iotSoilHealth: 'Soil Vigor Index', iotWaiting: 'Evaluating...',
        iotConnectSensor: 'Awaiting live sensor telemetry to compute soil health score.',
        chatGreeting: "Welcome to AgriSense AI. You can query pathogen management, chemical dosages, biological controls, or irrigation schedules.",
        chatPlaceholder: 'Inquire about pathology, soil nutrients, or field management...',
        iotDry: 'Deficit (Dry)', iotDryRec: 'Soil moisture is critically low. Initiate targeted irrigation to prevent plant dehydration and vascular stress.',
        iotOpt: 'Optimal', iotOptRec: 'Root-zone moisture is balanced. Transpiration and nutrient uptake conditions are ideal.',
        iotWet: 'Saturated (Wet)', iotWetRec: 'Soil is waterlogged. Suspend irrigation and verify field drainage to prevent root hypoxia and fungal proliferation.',
        navRecommend: 'Crop Planner', featRecommend: 'Cultivar Recommendation', featRecommendDesc: 'Soil taxonomy and microclimate modeling for optimal crop selection.',
        recTitle: 'Agronomic Crop Planner', recAutoFill: 'Auto-detect Microclimate & Coordinates',
        recLocation: 'Field Region / Territory', recTemp: 'Ambient Temperature (°C)', recHumid: 'Relative Humidity (%)',
        recSoil: 'Soil Classification', recSeason: 'Agro-Climatic Season', recBtn: 'Generate Cultivar Plan',
        recResultTitle: 'Optimal Crop Selections', recReasoning: 'Agronomic Rationale', recPrep: 'Field & Seedbed Preparation',
        recEmpty: 'Specify regional coordinates, climate metrics, and soil taxonomy to compute optimal crop recommendations.',
        qaRecommend: 'Crop Planning', qaRecommendSub: 'Targeted cultivar selection'
    },
    hi: {
        navHome: 'हब', navDetect: 'रोग पहचान', navCrops: 'फसलें', navScan: 'स्कैन शुरू करें',
        navBottomHub: 'हब', navBottomDetect: 'पहचान', navBottomPlanner: 'योजना', navBottomIoT: 'सेंसर', navBottomAdvisor: 'सलाहकार', navBottomProfile: 'प्रोफ़ाइल',
        heroBadge: 'सटीक कृषि आसूचना',
        heroTitle1: 'स्वस्थ फसलें', heroTitle2: 'स्थिर उत्पादन',
        heroDesc: 'सटीक फसल रोग पहचान, वास्तविक समय मिट्टी नमी ट्रैकिंग, और सत्यापित कृषि उपचार।',
        heroBtn1: 'पत्ती का नमूना विश्लेषित करें',
        statCrops: 'फसलें', statDiseases: 'रोग वर्गीकरण', statLangs: 'भाषाएं',
        statAdvice: 'सलाह इंजन', statFocus: 'फील्ड-तैयार',
        selectLang: 'भाषा चुनें',
        doThisFirst: 'प्रमुख कार्यप्रणाली',
        qaScanLeaf: 'रोग निदान', qaScanSub: 'त्वरित रोग पहचान',
        qaIoT: 'मिट्टी टेलीमेट्री', qaIoTSub: 'लाइव मिट्टी नमी डेटा',
        qaChat: 'कृषि परामर्श', qaChatSub: 'विशेषज्ञ से प्रश्न पूछें',
        secFeaturesTitle: 'स्मार्ट कृषि उपकरण',
        secFeaturesDesc: 'कृषि में सटीक निर्णयों के लिए कृत्रिम बुद्धिमत्ता और IoT आधारित प्लेटफॉर्म।',
        featDetect: 'रोग पहचान', featDetectDesc: 'पत्तियों की छवियों से तुरंत 38+ पादप रोगों का सटीक निदान।',
        featMonitor: 'मिट्टी टेलीमेट्री', featMonitorDesc: 'लाइव रूट-ज़ोन नमी ट्रैकिंग और सिंचाई दिशानिर्देश।',
        todayTip: 'कृषि बुलेटिन',
        workflowTitle: 'मानक निदान प्रक्रिया', workflowSubtitle: 'नमूना कैप्चर से लेकर सटीक उपचार तक की त्वरित प्रक्रिया',
        step1Title: 'नमूना कैप्चर करें', step1Desc: 'स्पष्ट प्राकृतिक प्रकाश में फसल की पत्ती की फोटो लें।',
        step2Title: 'न्यूरल विश्लेषण', step2Desc: 'CNN मॉडल विश्वास स्कोर के साथ रोग की पहचान करता है।',
        step3Title: 'उपचार लागू करें', step3Desc: 'प्रमाणित जैविक और रासायनिक नियंत्रण दिशानिर्देशों का पालन करें।',
        back: 'वापस', pageDetect: 'पादप रोग निदान',
        uploadTitle: 'पत्ती का नमूना अपलोड करें', uploadDrag: 'फ़ाइल खींचें या सिस्टम से चुनें',
        uploadFormats: 'JPG / PNG प्रारूप (अधिकतम 8 MB)', uploadHint: 'पत्ती को प्राकृतिक प्रकाश में रखें।',
        btnTakePhoto: 'कैमरे से फोटो लें', btnChoosePhoto: 'फ़ाइल ब्राउज़ करें',
        retake: 'दूसरा फोटो लें', analyze: 'विश्लेषण शुरू करें',
        scanStepsTitle: 'निदान कार्यप्रणाली',
        scanStep1: 'पत्ती को केंद्र में रखकर फोटो चुनें',
        scanStep2: 'विश्लेषण शुरू करें पर क्लिक करें',
        scanStep3: 'सटीक जैविक व रासायनिक उपचार निर्देश देखें',
        photoTipsTitle: 'उत्तम फोटोग्राफी दिशा-निर्देश',
        tip1: 'पर्याप्त प्राकृतिक प्रकाश रखें',
        tip2: 'पत्ती से फ्रेम का 70% हिस्सा भरें',
        tip3: 'कैमरे को स्थिर रखें',
        tip4: 'प्रभावित क्षेत्र स्पष्ट दिखना चाहिए',
        iotTitle: 'IoT फील्ड स्टेशन', iotSoilMoisture: 'मिट्टी की नमी',
        fetching: 'डेटा प्राप्त हो रहा है...', lastUpdated: 'अंतिम पैकेट:',
        iotAIRec: 'कृषि मूल्यांकन', iotOptRange: 'आदर्श सीमा',
        iotConn: 'सेंसर लिंक', iotLive: 'सक्रिय', iotOffline: 'ऑफ़लाइन', iotDisconnected: 'सेंसर डिस्कनेक्ट है। हार्डवेयर जांचें।',
        iotMinToday: '24 घंटे का न्यूनतम', iotMaxToday: '24 घंटे का अधिकतम',
        iotAverage: 'औसत नमी', iotReadings: 'रीडिंग गणना',
        iotChartTitle: 'नमी रुझान रेखा', iotLast20: 'अंतिम 20 टेलीमेट्री नमूने',
        iotWeather: 'खेत का मौसम', iotDetectLoc: 'स्थान की जानकारी खोजी जा रही है...',
        iotRefreshWeather: 'मौसम अपडेट करें',
        iotSoilHealth: 'मिट्टी स्वास्थ्य सूचकांक', iotWaiting: 'प्रतीक्षा...',
        iotConnectSensor: 'मिट्टी स्वास्थ्य स्कोर के लिए सेंसर कनेक्ट करें।',
        chatGreeting: 'AgriSense AI में आपका स्वागत है। आप फसल रोग, रासायनिक मात्रा, जैविक उपचार या सिंचाई के बारे में प्रश्न पूछ सकते हैं।',
        chatPlaceholder: 'फसल स्वास्थ्य या खेती प्रबंधन के बारे में पूछें...',
        iotDry: 'अति शुष्क', iotDryRec: 'मिट्टी में नमी अत्यधिक कम है। फसल को क्षति से बचाने हेतु तुरंत सिंचाई प्रारंभ करें।',
        iotOpt: 'अनुकूल', iotOptRec: 'मिट्टी की नमी आदर्श स्तर पर है। फसल वृद्धि के लिए अनुकूल परिस्थिति है।',
        iotWet: 'अत्यधिक गीला', iotWetRec: 'मिट्टी जलमग्न है। जड़ सड़न रोकने के लिए सिंचाई रोकें और जल निकासी सुनिश्चित करें।',
        navRecommend: 'फसल योजना', featRecommend: 'फसल अनुशंसा', featRecommendDesc: 'मिट्टी और जलवायु के आधार पर सर्वश्रेष्ठ फसल का चयन।',
        recTitle: 'फसल योजनाकार', recAutoFill: 'स्थान और मौसम स्वतः पहचानें',
        recLocation: 'खेत का क्षेत्र', recTemp: 'तापमान (°C)', recHumid: 'सापेक्ष आर्द्रता (%)',
        recSoil: 'मिट्टी का प्रकार', recSeason: 'ऋतु', recBtn: 'फसल योजना बनाएं',
        recResultTitle: 'अनुशंसित फसलें', recReasoning: 'कृषि तर्क', recPrep: 'खेत की तैयारी',
        recEmpty: 'खेत की मिट्टी और जलवायु विवरण दर्ज करके सर्वोत्तम फसलों की सिफारिश प्राप्त करें।',
        qaRecommend: 'फसल योजना', qaRecommendSub: 'उत्कृष्ट फसल विकल्प'
    },
    kn: {
        navHome: 'ಹಬ್', navDetect: 'ರೋಗ ಪತ್ತೆ', navCrops: 'ಬೆಳೆಗಳು', navScan: 'ಸ್ಕ್ಯಾನ್ ಪ್ರಾರಂಭಿಸಿ',
        navBottomHub: 'ಹಬ್', navBottomDetect: 'ಪತ್ತೆ', navBottomPlanner: 'ಯೋಜನೆ', navBottomIoT: 'ಸಂವೇದಕ', navBottomAdvisor: 'ಸಲಹೆಗಾರ', navBottomProfile: 'ಪ್ರೊಫೈಲ್',
        heroBadge: 'ನಿಖರ ಕೃಷಿ ಮಾಹಿತಿ ವ್ಯವಸ್ಥೆ',
        heroTitle1: 'ಆರೋಗ್ಯಕರ ಬೆಳೆಗಳು', heroTitle2: 'ಸುಸ್ಥಿರ ಆದಾಯ',
        heroDesc: 'ಸಸ್ಯ ರೋಗಗಳ ನಿಖರ ಪತ್ತೆ, ನೈಜ ಸಮಯದ ಮಣ್ಣಿನ ತೇವಾಂಶ ಮೇಲ್ವಿಚಾರಣೆ ಮತ್ತು ಕೃಷಿ ಮಾರ್ಗದರ್ಶನ.',
        heroBtn1: 'ಎಲೆಯ ಮಾದರಿ ವಿಶ್ಲೇಷಿಸಿ',
        statCrops: 'ಬೆಳೆಗಳು', statDiseases: 'ರೋಗ ಮಾದರಿಗಳು', statLangs: 'ಭಾಷೆಗಳು',
        statAdvice: 'ಸಲಹಾ ವ್ಯವಸ್ಥೆ', statFocus: 'ಕ್ಷೇತ್ರ-ಸಿದ್ಧ',
        selectLang: 'ಭಾಷೆ ಆಯ್ಕೆಮಾಡಿ',
        doThisFirst: 'ಪ್ರಮುಖ ಕಾರ್ಯಗಳು',
        qaScanLeaf: 'ರೋಗ ಪತ್ತೆಹಚ್ಚುವಿಕೆ', qaScanSub: 'ತಕ್ಷಣದ ಎಲೆ ರೋಗ ಪತ್ತೆ',
        qaIoT: 'ಮಣ್ಣಿನ ಟೆಲಿಮೆಟ್ರಿ', qaIoTSub: 'ಲೈವ್ ಮಣ್ಣಿನ ತೇವಾಂಶ ಡೇಟಾ',
        qaChat: 'ಕೃಷಿ ಸಮಾಲೋಚನೆ', qaChatSub: 'ತಜ್ಞರೊಂದಿಗೆ ಚರ್ಚಿಸಿ',
        secFeaturesTitle: 'ಕೃಷಿ ತಂತ್ರಜ್ಞಾನ ವ್ಯವಸ್ಥೆಗಳು',
        secFeaturesDesc: 'ಕೃತಕ ಬುದ್ಧಿಮತ್ತೆ ಮತ್ತು IoT ಸಂಯೋಜಿತ ಆಧುನಿಕ ಕೃಷಿ ವೇದಿಕೆ.',
        featDetect: 'ರೋಗ ಪತ್ತೆ', featDetectDesc: 'ಕಂಪ್ಯೂಟರ್ ದೃಷ್ಟಿ ತಂತ್ರಜ್ಞಾನದ ಮೂಲಕ 38+ ಸಸ್ಯ ರೋಗಗಳ ನಿಖರ ಪತ್ತೆ.',
        featMonitor: 'ಮಣ್ಣಿನ ಟೆಲಿಮೆಟ್ರಿ', featMonitorDesc: 'ಮಣ್ಣಿನ ತೇವಾಂಶದ ನೈಜ ಸಮಯದ ಟ್ರ್ಯಾಕಿಂಗ್.',
        todayTip: 'ಕೃಷಿ ಬುಲೆಟಿನ್',
        workflowTitle: 'ರೋಗ ಪತ್ತೆ ವಿಧಾನ', workflowSubtitle: 'ಫೋಟೋದಿಂದ ನಿಖರ ಪರಿಹಾರದವರೆಗಿನ ಸರಳ ಪ್ರಕ್ರಿಯೆ',
        step1Title: 'ಮಾದರಿ ಸೆರೆಹಿಡಿಯಿರಿ', step1Desc: 'ನೈಸರ್ಗಿಕ ಬೆಳಕಿನಲ್ಲಿ ಎಲೆಯ ಸ್ಪಷ್ಟ ಚಿತ್ರವನ್ನು ತೆಗೆದುಕೊಳ್ಳಿ.',
        step2Title: 'ನ್ಯೂರಲ್ ವಿಶ್ಲೇಷಣೆ', step2Desc: 'CNN ಮಾದರಿಯು ರೋಗದ ನಿಖರ ಸ್ಕೋರ್ ನೀಡುತ್ತದೆ.',
        step3Title: 'ಚಿಕಿತ್ಸೆ ಅನ್ವಯಿಸಿ', step3Desc: 'ಪ್ರಮಾಣಿತ ಸಾವಯವ ಮತ್ತು ರಾಸಾಯನಿಕ ಕ್ರಮಗಳನ್ನು ಅನುಸರಿಸಿ.',
        back: 'ಹಿಂದೆ', pageDetect: 'ರೋಗ ಪತ್ತೆಹಚ್ಚುವಿಕೆ',
        uploadTitle: 'ಎಲೆಯ ಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ', uploadDrag: 'ಚಿತ್ರವನ್ನು ಇಲ್ಲಿ ಎಳೆದುಬಿಡಿ ಅಥವಾ ಫೈಲ್ ಆಯ್ಕೆಮಾಡಿ',
        uploadFormats: 'JPG / PNG ಬೆಂಬಲಿತವಾಗಿದೆ (ಗರಿಷ್ಠ 8 MB)', uploadHint: 'ಎಲೆಯನ್ನು ನೈಸರ್ಗಿಕ ಬೆಳಕಿನಲ್ಲಿ ಸ್ಪಷ್ಟವಾಗಿ ಇರಿಸಿ.',
        btnTakePhoto: 'ಕ್ಯಾಮೆರಾದಿಂದ ಫೋಟೋ ತೆಗೆಯಿರಿ', btnChoosePhoto: 'ಚಿತ್ರವನ್ನು ಆಯ್ಕೆಮಾಡಿ',
        retake: 'ಮತ್ತೆ ತೆಗೆಯಿರಿ', analyze: 'ವಿಶ್ಲೇಷಣೆ ಪ್ರಾರಂಭಿಸಿ',
        scanStepsTitle: 'ಕಾರ್ಯಾಚರಣೆ ಹಂತಗಳು',
        scanStep1: 'ಸ್ಪಷ್ಟ ಎಲೆಯ ಫೋಟೋವನ್ನು ಆಯ್ಕೆಮಾಡಿ',
        scanStep2: 'ವಿಶ್ಲೇಷಣೆ ಪ್ರಾರಂಭಿಸಿ ಕ್ಲಿಕ್ ಮಾಡಿ',
        scanStep3: 'ಚಿಕಿತ್ಸಾ ಮಾರ್ಗಸೂಚಿಗಳನ್ನು ಪರಿಶೀಲಿಸಿ',
        photoTipsTitle: 'ಉತ್ತಮ ಫೋಟೋ ಸಲಹೆಗಳು',
        tip1: 'ನೈಸರ್ಗಿಕ ಬೆಳಕಿನಲ್ಲಿ ಫೋಟೋ ತೆಗೆಯಿರಿ',
        tip2: 'ಫ್ರೇಮ್‌ನ 70% ಭಾಗದಲ್ಲಿ ಎಲೆ ಇರಲಿ',
        tip3: 'ಕ್ಯಾಮೆರಾ ಅಲುಗಾಡದಂತೆ ಹಿಡಿಯಿರಿ',
        tip4: 'ಬಾಧಿತ ಭಾಗ ಸ್ಪಷ್ಟವಾಗಿ ಕಾಣಿಸಲಿ',
        iotTitle: 'IoT ಕೃಷಿ ಕೇಂದ್ರ', iotSoilMoisture: 'ಮಣ್ಣಿನ ತೇವಾಂಶ ಮಟ್ಟ',
        fetching: 'ಮಾಹಿತಿ ಪಡೆಯಲಾಗುತ್ತಿದೆ...', lastUpdated: 'ಕೊನೆಯ ಸಂದೇಶ:',
        iotAIRec: 'ಕೃಷಿ ಶಿಫಾರಸು', iotOptRange: 'ಸೂಕ್ತ ವ್ಯಾಪ್ತಿ',
        iotConn: 'ಸಂಪರ್ಕ ಸ್ಥಿತಿ', iotLive: 'ಸಕ್ರಿಯ', iotOffline: 'ಆಫ್‌ಲೈನ್', iotDisconnected: 'ಸೆಂನ್ಸರ್ ಸಂಪರ್ಕ ಕಡಿತಗೊಂಡಿದೆ.',
        iotMinToday: '24 ಗಂಟೆಯ ಕನಿಷ್ಠ', iotMaxToday: '24 ಗಂಟೆಯ ಗರಿಷ್ಠ',
        iotAverage: 'ಸರಾಸರಿ ತೇವಾಂಶ', iotReadings: 'ರೀಡಿಂಗ್‌ಗಳು',
        iotChartTitle: 'ತೇವಾಂಶ ಇತಿಹಾಸ ಗ್ರಾಫ್', iotLast20: 'ಕಳೆದ 20 ನಮೂನೆಗಳು',
        iotWeather: 'ಸ್ಥಳೀಯ ಹವಾಮಾನ', iotDetectLoc: 'ಸ್ಥಳ ಗುರುತಿಸಲಾಗುತ್ತಿದೆ...',
        iotRefreshWeather: 'ಹವಾಮಾನ ನವೀಕರಿಸಿ',
        iotSoilHealth: 'ಮಣ್ಣಿನ ಆರೋಗ್ಯ ಸೂಚ್ಯಂಕ', iotWaiting: 'ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ...',
        iotConnectSensor: 'ಮಣ್ಣಿನ ಆರೋಗ್ಯ ಸ್ಕೋರ್ ಪಡೆಯಲು ಸೆನ್ಸರ್ ಸಂಪರ್ಕಿಸಿ.',
        chatGreeting: 'AgriSense AI ಗೆ ಸ್ವಾಗತ. ರೋಗ ನಿರ್ವಹಣೆ, ರಸಗೊಬ್ಬರ ಪ್ರಮಾಣ ಅಥವಾ ನೀರಾವರಿ ಬಗ್ಗೆ ಪ್ರಶ್ನಿಸಬಹುದು.',
        chatPlaceholder: 'ಬೆಳೆ ಅಥವಾ ಕೃಷಿ ನಿರ್ವಹಣೆ ಬಗ್ಗೆ ಕೇಳಿ...',
        iotDry: 'ಅತ್ಯಂತ ಒಣಗಿದೆ', iotDryRec: 'ಮಣ್ಣಿನಲ್ಲಿ ತೇವಾಂಶ ತೀರ ಕಡಿಮೆಯಾಗಿದೆ. ತಕ್ಷಣ ನೀರಾವರಿ ಪ್ರಾರಂಭಿಸಿ.',
        iotOpt: 'ಸೂಕ್ತವಾಗಿದೆ', iotOptRec: 'ಮಣ್ಣಿನ ತೇವಾಂಶವು ಆದರ್ಶ ಮಟ್ಟದಲ್ಲಿದೆ. ಬೆಳೆ ಬೆಳವಣಿಗೆಗೆ ಉತ್ತಮವಾಗಿದೆ.',
        iotWet: 'ಅತಿಯಾದ ತೇವಾಂಶ', iotWetRec: 'ಮಣ್ಣು ಜಲಾವೃತವಾಗಿದೆ. ಬೇರು ಕೊಳೆಯುವುದನ್ನು ತಪ್ಪಿಸಲು ನೀರಾವರಿ ನಿಲ್ಲಿಸಿ.',
        navRecommend: 'ಬೆಳೆ ಯೋಜನೆ', featRecommend: 'ಬೆಳೆ ಶಿಫಾರಸು', featRecommendDesc: 'ಮಣ್ಣು ಮತ್ತು ಹವಾಮಾನಕ್ಕೆ ಸೂಕ್ತವಾದ ಬೆಳೆಯ ಆಯ್ಕೆ.',
        recTitle: 'ಬೆಳೆ ಯೋಜನೆಗಾರ', recAutoFill: 'ಸ್ಥಳ ಮತ್ತು ಹವಾಮಾನ ಸ್ವಯಂ-ಗುರುತಿಸಿ',
        recLocation: 'ಪ್ರದೇಶ / ಜಾಗ', recTemp: 'ತಾಪಮಾನ (°C)', recHumid: 'ಆರ್ದ್ರತೆ (%)',
        recSoil: 'ಮಣ್ಣಿನ ವಿಧ', recSeason: 'ಋತುಮಾನ', recBtn: 'ಬೆಳೆ ಯೋಜನೆ ರಚಿಸಿ',
        recResultTitle: 'ಶಿಫಾರಸು ಮಾಡಿದ ಬೆಳೆಗಳು', recReasoning: 'ಕೃಷಿ ಕಾರಣಗಳು', recPrep: 'ಭೂಮಿ ಸಿದ್ಧತೆ',
        recEmpty: 'ನಿಮ್ಮ ಮಣ್ಣು ಮತ್ತು ಹವಾಮಾನದ ವಿವರಗಳನ್ನು ನಮೂದಿಸಿ ಉತ್ತಮ ಬೆಳೆಯ ಶಿಫಾರಸು ಪಡೆಯಿರಿ.',
        qaRecommend: 'ಬೆಳೆ ಯೋಜನೆ', qaRecommendSub: 'ಉತ್ತಮ ಬೆಳೆ ಆಯ್ಕೆಗಳು'
    }
};

const LANG_META = {
    en: { code: 'EN', name: 'English' },
    hi: { code: 'HI', name: 'हिन्दी' },
    kn: { code: 'KN', name: 'ಕನ್ನಡ' }
};

/* --- Core Initialization --- */
window.addEventListener('load', () => {
    applyLanguage(AppState.currentLang);
    updateChatSystemPrompt(AppState.currentLang);
    initApp();
    setupPhotoButtons();
});

function initApp() {
    checkAuth();
    attachProfileButtons();

    // Navigation listener
    window.addEventListener('scroll', () => {
        document.getElementById('navbar')?.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });

    // Initial Data
    renderDailyTip();
    updateMetrics();
}

function attachProfileButtons() {
    document.querySelectorAll('.nav-profile-btn, .mobile-profile-btn').forEach(btn => {
        btn.addEventListener('click', openProfile);
        if (!btn.hasAttribute('type')) btn.setAttribute('type', 'button');
    });
}

/* --- Navigation System --- */
function navigateTo(screenId) {
    const screens = document.querySelectorAll('.screen');
    const target = document.getElementById(screenId);

    if (!target) return;

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Cleanup current
    if (AppState.currentScreen === 'screenDiseaseDetect' && screenId !== 'screenResult') {
        if (typeof stopCamera === 'function') stopCamera();
    }

    screens.forEach(s => {
        s.classList.remove('active', 'entering');
    });

    // Staggered entrance for grid items
    const gridItems = target.querySelectorAll('.feat-card, .float-card, .form-glass, .product-card, .result-card');
    gridItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });

    target.classList.add('active', 'entering');
    AppState.previousScreen = AppState.currentScreen;
    AppState.currentScreen = screenId;

    // Update Nav UI
    document.querySelectorAll('.nav-link, .bottom-nav-link').forEach(l => {
        l.classList.toggle('active', l.getAttribute('data-screen') === screenId);
    });

    // Vibrate on navigation (mobile)
    if (window.navigator.vibrate) {
        window.navigator.vibrate(50);
    }

    // Sub-initializers
    if (screenId === 'screenDiseaseDetect') initUploadZone();
    if (screenId === 'screenIoT') startIoTMonioting();
    else stopIoTMonioting();
}

function goBackFromResult() {
    if (AppState.resultSource === 'disease') navigateTo('screenDiseaseDetect');
    else navigateTo('screenHome');
}

/* --- i18n Logic --- */
function setLanguage(lang) {
    AppState.currentLang = lang;
    localStorage.setItem('agri-lang', lang);
    applyLanguage(lang);
    closeLangMenu();
    updateChatSystemPrompt(lang);

    // Auto-refresh disease result if currently shown to trigger translation in new language
    // We cannot automatically re-run AI inference without the user knowing, so we just clear it or let it be.
    // However, updating the chat greeting is a good idea.
    if (typeof chatHistory !== 'undefined' && chatHistory.length <= 1) {
        clearChat();
    }

    // Refresh dynamic content instantly
    if (AppState.currentScreen === 'screenIoT' && typeof fetchIoTData === 'function') {
        fetchIoTData();
    }
}

function applyLanguage(lang) {
    const dict = TRANSLATIONS[lang] || TRANSLATIONS.en;

    // Elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key]) el.textContent = dict[key];
    });

    // Placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (dict[key]) el.placeholder = dict[key];
    });

    // Update dynamic elements like chat input
    const chatInput = document.getElementById('chatInput');
    if (chatInput && dict['chatPlaceholder']) {
        chatInput.placeholder = dict['chatPlaceholder'];
    }

    // Sync voice assistant language if available
    const voiceLangMap = {
        'en': 'en-US',
        'hi': 'hi-IN',
        'kn': 'kn-IN'
    };
    if (typeof currentVoiceLang !== 'undefined') {
        currentVoiceLang = voiceLangMap[lang] || 'en-US';
        if (typeof updateVoiceSuggestions === 'function') updateVoiceSuggestions();
    }

    // Update Selector
    const meta = LANG_META[lang];
    if (meta) {
        const langCodeEl = document.getElementById('langCode');
        if (langCodeEl) langCodeEl.textContent = meta.name;

        const langIconEl = document.querySelector('.lang-icon');
        // keep svg icon intact
    }

    // Update active dropdown item
    document.querySelectorAll('.lang-opt').forEach(opt => {
        const optLang = opt.getAttribute('onclick').match(/'([^']+)'/)[1];
        opt.classList.toggle('active', optLang === lang);
    });
}

function toggleLangMenu() {
    const d = document.getElementById('langDropdown');
    if (d) d.classList.toggle('show');
}

function closeLangMenu() {
    const d = document.getElementById('langDropdown');
    if (d) d.classList.remove('show');
}

/* --- Upload Zone (Desktop) --- */
function initUploadZone() {
    const zone = document.getElementById('cameraArea');
    if (!zone || zone._dragReady) return;
    zone._dragReady = true;

    zone.addEventListener('dragover', (e) => {
        e.preventDefault();
        zone.style.borderColor = 'var(--g-400)';
        zone.style.background = 'rgba(62,175,96,0.08)';
    });
    zone.addEventListener('dragleave', () => {
        zone.style.borderColor = '';
        zone.style.background = '';
    });
    zone.addEventListener('drop', (e) => {
        e.preventDefault();
        zone.style.borderColor = '';
        zone.style.background = '';
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            loadImageFile(file);
        }
    });
}

function loadImageFile(file) {
    const reader = new FileReader();
    reader.onload = (event) => {
        const img = document.getElementById('imagePreview');
        img.src = event.target.result;
        img.style.display = 'block';
        document.getElementById('cameraPlaceholder').style.display = 'none';
        showAnalyzeControls();
    };
    reader.readAsDataURL(file);
    // Store file reference for form submission
    AppState.selectedFile = file;
}

/* --- Upload Logic --- */
function showAnalyzeControls() {
    document.getElementById('uploadControls').classList.add('hidden');
    document.getElementById('analyzeControls').classList.remove('hidden');
}

function setupPhotoButtons() {
    const chooseBtn = document.getElementById('choosePhotoBtn');
    const hint = document.getElementById('uploadHintText');

    if (chooseBtn) chooseBtn.style.display = 'block';
    if (hint) hint.textContent = 'Click to browse files from your computer.';
}

function triggerUpload() {
    const input = document.getElementById('fileInput');
    if (!input) return;
    input.click();
}

function handleFileSelect(e) {
    const file = e.target.files[0];
    if (!file) return;
    loadImageFile(file);
}

function showAnalyzeControls() {
    document.getElementById('uploadControls').classList.add('hidden');
    document.getElementById('analyzeControls').classList.remove('hidden');
}

function retakePhoto() {
    resetDetection();
}

function resetDetection() {
    const img = document.getElementById('imagePreview');
    img.style.display = 'none';
    img.src = '';
    AppState.selectedFile = null;
    document.getElementById('cameraPlaceholder').style.display = 'flex';
    document.getElementById('uploadControls').classList.remove('hidden');
    document.getElementById('analyzeControls').classList.add('hidden');
    const chooseBtn = document.getElementById('choosePhotoBtn');
    if (chooseBtn) chooseBtn.style.display = 'block';
    document.getElementById('fileInput').value = '';
    const cameraInput = document.getElementById('cameraInput');
    if (cameraInput) cameraInput.value = '';
}


/* =====================================================
    BACKEND INTEGRATION — Real Flask API
    ===================================================== */
// Resolve API base from (in order): injected runtime config, meta tag, or same-origin
const API_BASE = (typeof window.API_BASE !== 'undefined' && window.API_BASE) ||
    (typeof window.__API_BASE__ !== 'undefined' && window.__API_BASE__) ||
    document.querySelector('meta[name="api-base"]')?.content ||
    (window.location.protocol === 'file:' || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' ? 'http://127.0.0.1:5000' : '');



/* Get image file — always use original file to preserve quality */
function getCurrentImageFile() {
    return new Promise((resolve, reject) => {
        if (AppState.selectedFile) {
            return resolve(AppState.selectedFile);
        }
        const fi = document.getElementById('fileInput');
        if (fi && fi.files && fi.files[0]) {
            return resolve(fi.files[0]);
        }
        reject(new Error('No image source available'));
    });
}

/* Main analyze function */
async function analyzeImage() {
    const imgEl = document.getElementById('imagePreview');
    if (!imgEl || !imgEl.src || imgEl.style.display === 'none') {
        alert('Please take or upload a photo first.');
        return;
    }

    if (!navigator.onLine) {
        alert('No internet connection. Please connect to the internet to analyze the image.');
        return;
    }

    showLoading('Analyzing crop health with AI...');
    try {
        const file = await getCurrentImageFile();
        const fd = new FormData();
        fd.append('image', file);

        // ADD LANGUAGE
        const plainLangName = AppState.currentLang === 'hi' ? 'Hindi' : AppState.currentLang === 'kn' ? 'Kannada' : 'English';
        fd.append('language', plainLangName);

        const res = await fetch(`${API_BASE}/detect`, { method: 'POST', body: fd });
        const data = await res.json();
        hideLoading();

        AppState.resultSource = 'disease';
        if (res.ok && data.status === 'clear' && data.prediction_results) {

            // Update scan count
            const userStr = localStorage.getItem('agri_active_user');
            if (userStr) {
                try {
                    const user = JSON.parse(userStr);
                    user.scanCount = (user.scanCount || 0) + 1;
                    localStorage.setItem('agri_active_user', JSON.stringify(user));
                    let users = JSON.parse(localStorage.getItem('agri_users_db') || '{}');
                    if (users[user.phone]) {
                        users[user.phone].scanCount = user.scanCount;
                        localStorage.setItem('agri_users_db', JSON.stringify(users));
                    }
                } catch (e) { }
            }

            renderRealDiseaseResult(data);
        } else if (data.status === 'blurry') {
            renderBlurryResult(data.message || 'Image is too blurry. Please retake.');
        } else {
            renderErrorResult(data.error || 'Analysis failed. Please try again.');
        }
        navigateTo('screenResult');
    } catch (err) {
        hideLoading();
        renderErrorResult('Server unreachable. Please check your connection and try again.');
    }
}


function renderRealDiseaseResult(data) {
    const pr = data.prediction_results;
    const disease = pr.disease;
    const conf = pr.confidence;
    const isHealthy = disease === 'Healthy';
    const type = isHealthy ? 'success' : 'danger';

    let advisoryHtml = '';
    try {
        const g = JSON.parse(data.guidance);
        advisoryHtml = `
            <div class="advisory-grid">
                <div class="advisory-card advisory-recovery">
                    <div class="advisory-card-header">
                        <span class="advisory-icon-svg">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
                        </span>
                        <h4>Immediate Recovery</h4>
                    </div>
                    <ul>${g.recovery.map(i => `<li>${i}</li>`).join('')}</ul>
                </div>
                <div class="advisory-card advisory-organic">
                    <div class="advisory-card-header">
                        <span class="advisory-icon-svg">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 20h10"></path><path d="M10 20c5.5-2.5.8-6.4 3-10"></path><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4.1 5.5.8z"></path><path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z"></path></svg>
                        </span>
                        <h4>Biological & Organic Controls</h4>
                    </div>
                    <ul>${g.organic.map(i => `<li>${i}</li>`).join('')}</ul>
                </div>
                <div class="advisory-card advisory-chemical">
                    <div class="advisory-card-header">
                        <span class="advisory-icon-svg">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 2v7.31L4.69 18.5a2 2 0 0 0 1.74 3h11.14a2 2 0 0 0 1.74-3L14 9.31V2"></path><line x1="8.5" y1="2" x2="15.5" y2="2"></line><line x1="7" y1="14" x2="17" y2="14"></line></svg>
                        </span>
                        <h4>Chemical Therapeutics</h4>
                    </div>
                    <ul>${g.chemical.map(i => `<li>${i}</li>`).join('')}</ul>
                </div>
                <div class="advisory-card advisory-prevention">
                    <div class="advisory-card-header">
                        <span class="advisory-icon-svg">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                        </span>
                        <h4>Field Hygiene & Prevention</h4>
                    </div>
                    <ul>${g.prevention.map(i => `<li>${i}</li>`).join('')}</ul>
                </div>
            </div>
        `;
    } catch (e) {
        advisoryHtml = `<div class="result-card"><div class="result-card-header">Agronomic Advisory</div><div class="result-card-body" style="white-space:pre-wrap">${data.guidance}</div></div>`;
    }

    const body = document.getElementById('resultBody');
    const title = document.getElementById('resultTitle');
    title.textContent = isHealthy ? 'Specimen Evaluation' : 'Diagnostic Report';

    const statusIcon = isHealthy
        ? `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`
        : `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`;

    body.innerHTML = `
        <div class="result-hero result-${type}">
            <div class="result-icon-ring">${statusIcon}</div>
            <div class="result-meta-block">
                <span class="result-status-tag">${isHealthy ? 'Pathogen Negative' : 'Pathogen Detected'}</span>
                <h3 class="result-name">${disease}</h3>
                <span class="result-confidence-badge">${conf}% Neural Confidence</span>
            </div>
        </div>
        
        <div class="result-card" style="margin:1.25rem 0">
            <div class="result-card-header">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
                <span>Diagnostic Metrics & Field Telemetry</span>
            </div>
            <div class="result-card-body">
                <div class="metric-line">
                    <span class="metric-label">Neural Confidence Score</span>
                    <span class="metric-val" style="color:var(--g-700)">${conf}%</span>
                </div>
                <div class="metric-bar-track">
                    <div class="metric-bar-fill" style="width:${conf}%; background:var(--g-700)"></div>
                </div>
                
                <div class="metric-line" style="margin-top:1rem">
                    <span class="metric-label">Live Soil Moisture (IoT Station)</span>
                    <span class="metric-val" style="color:var(--accent-sky)">${(AppState.lastMoisture || 0).toFixed(2)}%</span>
                </div>
                <div class="metric-bar-track">
                    <div class="metric-bar-fill" style="width:${AppState.lastMoisture || 0}%; background:var(--accent-sky)"></div>
                </div>
            </div>
        </div>

        <h3 class="section-subheading">Agronomic Treatment Protocol</h3>
        ${advisoryHtml}

        <div class="result-actions-strip">
            <button class="btn-primary" onclick="navigateTo('screenDiseaseDetect')">Scan Another Foliage Specimen</button>
            <button class="btn-secondary" onclick="navigateTo('screenHome')">Return to Station Hub</button>
        </div>
    `;
}

function renderBlurryResult(msg) {
    const body = document.getElementById('resultBody');
    document.getElementById('resultTitle').textContent = 'Image Quality Issue';
    body.innerHTML = `
        <div class="result-hero result-danger">
            <div class="result-icon-ring">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
            </div>
            <div class="result-meta-block">
                <span class="result-status-tag" style="background:#fef2f2;color:#b91c1c;">Quality Rejected</span>
                <h3 class="result-name">Image Resolution Defect</h3>
                <p class="result-confidence">${msg}</p>
            </div>
        </div>
        <div class="result-card" style="margin-top:1.25rem;">
            <div class="result-card-header">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                <span>Imaging Best Practices</span>
            </div>
            <div class="result-card-body">
                <ul class="sop-list">
                    <li>Hold camera steady with both hands or rest on a surface.</li>
                    <li>Utilize diffused natural daylight; avoid deep shadows.</li>
                    <li>Frame the specimen at 15–20 cm distance to fill the sensor.</li>
                    <li>Ensure macro focal point is centered on symptomatic foliage lesions.</li>
                </ul>
            </div>
        </div>
        <button class="btn-primary btn-full" style="margin-top:1.5rem;width:100%" onclick="navigateTo('screenDiseaseDetect')">Re-capture Specimen</button>
    `;
}

function renderErrorResult(msg) {
    const body = document.getElementById('resultBody');
    document.getElementById('resultTitle').textContent = 'Analysis Interrupted';
    body.innerHTML = `
        <div class="result-hero result-danger">
            <div class="result-icon-ring">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
            </div>
            <div class="result-meta-block">
                <span class="result-status-tag" style="background:#fef2f2;color:#b91c1c;">Service Exception</span>
                <h3 class="result-name">Analysis Failed</h3>
                <p class="result-confidence">${msg}</p>
            </div>
        </div>
        <button class="btn-primary btn-full" style="margin-top:1.5rem;width:100%" onclick="navigateTo('screenDiseaseDetect')">Try Again</button>
    `;
}

function updateTempDisplay(v) {
    const el = document.getElementById('tempValue');
    if (el) el.textContent = v;
}

function toggleMobileMenu() {
    const drawer = document.getElementById('mobDrawer');
    const overlay = document.getElementById('mobOverlay');
    const isOpen = drawer.style.right === '0px';

    if (isOpen) {
        drawer.style.right = '-300px';
        overlay.classList.add('hidden');
        document.body.style.overflow = '';
    } else {
        drawer.style.right = '0px';
        overlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

function renderDailyTip() {
    const tips = ["Water crops early morning", "Rotate crops each season", "Use organic compost", "Check soil pH regularly"];
    const el = document.getElementById('dailyTip');
    if (el) el.textContent = tips[new Date().getDate() % tips.length];
}

function initVoiceAssistant() {
    // Initialize voice assistant with default language
    updateVoiceSuggestions();
    // Reset voice state
    if (window.recognition) {
        window.recognition.stop();
    }

    // Only reset elements if they exist (screen is active)
    const transcriptEl = document.getElementById('voiceTranscript');
    const responseEl = document.getElementById('voiceResponse');
    const voiceBtnEl = document.getElementById('voiceBtn');

    if (transcriptEl) transcriptEl.textContent = 'Click the microphone to start speaking...';
    if (responseEl) responseEl.textContent = '';
    if (voiceBtnEl) voiceBtnEl.classList.remove('active');
}



/* --- Helpers --- */
function showLoading(txt) {
    const overlay = document.getElementById('loadingOverlay');
    document.getElementById('loadingText').textContent = txt;
    overlay.classList.remove('hidden');
}

function hideLoading() {
    document.getElementById('loadingOverlay').classList.add('hidden');
}

function renderDailyTip() {
    const tips = ["Water crops early morning", "Rotate crops each season", "Use organic compost", "Check soil pH regularly"];
    const el = document.getElementById('dailyTip');
    if (el) el.textContent = tips[new Date().getDate() % tips.length];
}

function updateMetrics() {
    const m = { temp: '28°C', humid: '65%', moist: '42%' };
    const elTemp = document.getElementById('mTemp');
    if (elTemp) elTemp.textContent = m.temp;
    const elHumid = document.getElementById('mHumid');
    if (elHumid) elHumid.textContent = m.humid;
    const elMoist = document.getElementById('mMoist');
    if (elMoist) elMoist.textContent = m.moist;
}

// Global escape listener
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        hideLoading();
        closeLangMenu();

    }
});



/* --- Voice Assistant Functionality --- */

// Voice Assistant State
let voiceRecognition = null;
let isListening = false;
let currentVoiceLang = 'en-US';

// Language mappings for speech recognition and synthesis
const VOICE_LANGUAGES = {
    'en-US': { name: 'English', recognition: 'en-US', synthesis: 'en-US' },
    'hi-IN': { name: 'Hindi', recognition: 'hi-IN', synthesis: 'hi-IN' },
    'kn-IN': { name: 'Kannada', recognition: 'kn-IN', synthesis: 'kn-IN' }
};

// Initialize voice assistant when navigating to voice screen
if (typeof navigateTo !== 'undefined') {
    const originalNavigateTo2 = navigateTo;
    navigateTo = function (screenId) {
        originalNavigateTo2(screenId);
        if (screenId === 'screenVoiceAssistant') {
            initializeVoiceAssistant();
        }
    };
}

function initializeVoiceAssistant() {
    // Set initial language based on app language
    const langSelect = document.getElementById('voiceLangSelect');
    if (langSelect) {
        langSelect.value = currentVoiceLang;
        updateVoiceSuggestions();
    }
}

function changeVoiceLanguage() {
    const langSelect = document.getElementById('voiceLangSelect');
    currentVoiceLang = langSelect.value;
    updateVoiceSuggestions();

    // Stop current recognition if running
    if (isListening) {
        stopVoiceRecognition();
    }
}

function updateVoiceSuggestions() {
    const suggestions = document.getElementById('voiceSuggestions');
    if (!suggestions) return;
    const lang = VOICE_LANGUAGES[currentVoiceLang];

    let suggestionTexts = [];

    if (currentVoiceLang === 'en-US') {
        suggestionTexts = [
            'What diseases affect tomato plants?',
            'How to treat powdery mildew?',
            'What is the weather forecast for farming?',
            'How can I improve soil health?'
        ];
    } else if (currentVoiceLang === 'hi-IN') {
        suggestionTexts = [
            'टमाटर के पौधों को कौन सी बीमारियाँ होती हैं?',
            'पाउडरी मिल्ड्यू का इलाज कैसे करें?',
            'खेती के लिए मौसम का पूर्वानुमान?',
            'मिट्टी के स्वास्थ्य को कैसे बेहतर बनाया जाए?'
        ];
    } else if (currentVoiceLang === 'kn-IN') {
        suggestionTexts = [
            'ಟೊಮೆಟೊ ಸಸ್ಯಗಳಿಗೆ ಯಾವ ರೋಗಗಳು ಬರುತ್ತವೆ?',
            'ಪೌಡರಿ ಮಿಲ್ಡ್ಯೂವನ್ನು ಹೇಗೆ ಚಿಕಿತ್ಸಿಸುವುದು?',
            'ಕೃಷಿಗಾಗಿ ಹವಾಮಾನ ಮುನ್ಸೂಚನೆ?',
            'ಮಣ್ಣಿನ ಆರೋಗ್ಯವನ್ನು ಹೇಗೆ ಸುಧಾರಿಸಬಹುದು?'
        ];
    }

    suggestions.innerHTML = suggestionTexts.map(text =>
        `<button class="suggestion-btn" onclick="speakSuggestion('${text}')">${text}</button>`
    ).join('');
}

function speakSuggestion(text) {
    // Set the transcript
    document.getElementById('userTranscript').textContent = text;

    // Process the query
    processVoiceQuery(text);
}

function toggleVoiceRecognition() {
    if (isListening) {
        stopVoiceRecognition();
    } else {
        startVoiceRecognition();
    }
}

function startVoiceRecognition() {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        alert('Speech recognition is not supported in this browser. Please use Chrome or Edge.');
        return;
    }

    // Stop any existing recognition
    if (voiceRecognition) {
        voiceRecognition.stop();
    }

    // Create new recognition instance
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    voiceRecognition = new SpeechRecognition();

    // Configure recognition
    voiceRecognition.lang = currentVoiceLang;
    voiceRecognition.continuous = false;
    voiceRecognition.interimResults = false;
    voiceRecognition.maxAlternatives = 1;

    voiceRecognition.onstart = function () {
        isListening = true;
        updateVoiceUI();
        document.getElementById('voiceStatus').textContent = 'Listening... Speak now';
    };

    voiceRecognition.onresult = function (event) {
        const transcript = event.results[0][0].transcript;
        document.getElementById('userTranscript').textContent = transcript;

        // Process the voice query
        processVoiceQuery(transcript);
    };

    voiceRecognition.onerror = function (event) {
        console.error('Speech recognition error:', event.error);
        document.getElementById('voiceStatus').textContent = 'Error: ' + event.error;
        stopVoiceRecognition();
    };

    voiceRecognition.onend = function () {
        isListening = false;
        updateVoiceUI();
        if (!document.getElementById('userTranscript').textContent) {
            document.getElementById('voiceStatus').textContent = 'Click the microphone to start speaking';
        }
    };

    try {
        voiceRecognition.start();
    } catch (error) {
        console.error('Failed to start speech recognition:', error);
        document.getElementById('voiceStatus').textContent = 'Failed to start voice recognition';
    }
}

function stopVoiceRecognition() {
    if (voiceRecognition) {
        voiceRecognition.stop();
    }
    isListening = false;
    updateVoiceUI();
}

function updateVoiceUI() {
    const voiceBtn = document.getElementById('voiceBtn');
    const voiceAnim = document.getElementById('voiceAnim');
    const voiceBtnIcon = document.getElementById('voiceBtnIcon');
    const voiceBtnText = document.getElementById('voiceBtnText');

    if (isListening) {
        voiceBtn.classList.add('listening');
        voiceAnim.classList.add('listening');
        voiceBtnIcon.textContent = '⏹️';
        voiceBtnText.textContent = 'Stop Listening';
    } else {
        voiceBtn.classList.remove('listening');
        voiceAnim.classList.remove('listening');
        // voice mic icon
        voiceBtnText.textContent = 'Start Listening';
    }
}

function processVoiceQuery(query) {
    const responseElement = document.getElementById('aiResponse');
    responseElement.textContent = 'Processing your question...';

    // Convert query to lowercase for easier matching
    const lowerQuery = query.toLowerCase();

    let response = '';

    // Disease-related queries
    if (lowerQuery.includes('disease') || lowerQuery.includes('बीमारी') || lowerQuery.includes('ರೋಗ')) {
        if (lowerQuery.includes('tomato') || lowerQuery.includes('टमाटर') || lowerQuery.includes('ಟೊಮೆಟೊ')) {
            response = getDiseaseInfo('tomato');
        } else if (lowerQuery.includes('potato') || lowerQuery.includes('आलू') || lowerQuery.includes('ಆಲೂಗಡ್ಡೆ')) {
            response = getDiseaseInfo('potato');
        } else {
            response = 'I can help you identify diseases in tomato, potato, and other crops. Please specify which crop you\'re asking about.';
        }
    }


    // Treatment queries
    else if (lowerQuery.includes('treat') || lowerQuery.includes('treatment') || lowerQuery.includes('इलाज') || lowerQuery.includes('ಚಿಕಿತ್ಸೆ')) {
        if (lowerQuery.includes('mildew') || lowerQuery.includes('powdery') || lowerQuery.includes('मिल्ड्यू') || lowerQuery.includes('ಮಿಲ್ಡ್ಯೂ')) {
            response = 'For powdery mildew, use copper fungicide or neem oil spray. Ensure good air circulation and avoid overhead watering.';
        } else if (lowerQuery.includes('blight') || lowerQuery.includes('ब्लाइट') || lowerQuery.includes('ಬ್ಲೈಟ್')) {
            response = 'For blight, apply copper fungicide and remove affected plant parts. Improve drainage and avoid working with wet plants.';
        } else {
            response = 'I can provide treatment advice for common plant diseases. Please specify the disease you\'re dealing with.';
        }
    }

    // Weather queries
    else if (lowerQuery.includes('weather') || lowerQuery.includes('मौसम') || lowerQuery.includes('ಹವಾಮಾನ')) {
        response = 'I can help you understand weather impacts on farming. For current weather data, please check your local weather service or use our weather integration feature.';
    }

    // Default response
    else {
        response = 'I\'m here to help with farming questions! You can ask me about plant diseases, treatments, weather, or general farming advice.';
    }

    // Speak the response
    speakResponse(response);

    // Display the response
    responseElement.textContent = response;
}

function getDiseaseInfo(crop) {
    const diseases = {
        tomato: 'Common tomato diseases include: 1) Bacterial Spot - treat with copper fungicide, 2) Early Blight - use fungicide sprays, 3) Fusarium Wilt - improve drainage and use resistant varieties.',
        potato: 'Common potato diseases include: 1) Late Blight - apply copper fungicide, 2) Early Blight - use preventive fungicide sprays, 3) Potato Scab - maintain proper soil pH.'
    };

    return diseases[crop] || 'I have information about diseases affecting various crops. Please specify the crop.';
}

function speakResponse(text) {
    if (!('speechSynthesis' in window)) {
        console.log('Speech synthesis not supported');
        return;
    }

    // Stop any ongoing speech
    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    // Set language for speech synthesis
    utterance.lang = currentVoiceLang;

    // Adjust voice settings
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 0.8;

    // Try to find a suitable voice for the language
    const voices = speechSynthesis.getVoices();
    const suitableVoice = voices.find(voice => voice.lang.startsWith(currentVoiceLang.split('-')[0]));
    if (suitableVoice) {
        utterance.voice = suitableVoice;
    }

    speechSynthesis.speak(utterance);
}

// Load voices when they become available
if ('speechSynthesis' in window) {
    speechSynthesis.onvoiceschanged = function () {
        console.log('Voices loaded:', speechSynthesis.getVoices().length);
    };
}

/* ================================================
   FLOATING CHATBOT WIDGET — AI-Powered (Groq LLaMA 3)
   ================================================ */

const GROQ_API_KEY = ""; // Set your API key here
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

// Conversation memory (keeps last 10 turns for context)
let chatHistory = [
    {
        role: "system",
        content: `You are AgriBot, an elite agricultural scientist and field expert embedded in the "AgriSense AI" platform. 
        
Your mission is to provide definitive, high-accuracy answers to ANY agricultural question. Your knowledge base is vast and covers:
- In-depth crop science, genetics, and variety selection
- Advanced pathology (fungal, bacterial, viral, and physiological disorders)
- Soil chemistry, physics, and restorative biology
- Modern and traditional fertilizer protocols (precision farming vs. organic)
- Hydroponics, aquaponics, and greenhouse climate control
- Global agricultural trends, market economics, and supply chain logistics
- Veterinary basics for farm animals (cattle, poultry, goats, pigs)
- Agricultural engineering, tool maintenance, and automation
        - Sustainable and regenerative practices (no-till, cover cropping, carbon farming)

Rules:
1. AUTHORITY: Speak with the confidence of an expert, but keep it accessible for a farmer.
2. ACCURACY: If a user asks an agricultural question, ANSWER IT FULLY. Do not decline agricultural queries.
3. STRUCTURE: Use markdown-like formatting (bullet points, bold text) for readability.
4. LANGUAGE: You MUST ALWAYS respond entirely in English.
5. LIMITS: STRICTLY DECLINE ANY non-agricultural, non-rural, or programming/coding topics. If asked to write code or about unrelated subjects, refuse and remind the user that you only answer agriculture-related questions.
6. STYLE: Maintain a precise, professional agronomic tone with bullet points for readability.`
    }
];

function updateChatSystemPrompt(lang) {
    if (typeof chatHistory !== 'undefined' && chatHistory[0]) {
        const langName = lang === 'hi' ? 'Hindi' : lang === 'kn' ? 'Kannada' : 'English';
        chatHistory[0].content = `You are AgriBot, an elite agricultural scientist and field expert embedded in the "AgriSense AI" platform. 
        
Your mission is to provide definitive, high-accuracy answers to ANY agricultural question. Your knowledge base is vast and covers:
- In-depth crop science, genetics, and variety selection
- Advanced pathology (fungal, bacterial, viral, and physiological disorders)
- Soil chemistry, physics, and restorative biology
- Modern and traditional fertilizer protocols (precision farming vs. organic)
- Hydroponics, aquaponics, and greenhouse climate control
- Global agricultural trends, market economics, and supply chain logistics
- Veterinary basics for farm animals (cattle, poultry, goats, pigs)
- Agricultural engineering, tool maintenance, and automation
- Sustainable and regenerative practices (no-till, cover cropping, carbon farming)

Rules:
1. AUTHORITY: Speak with the confidence of an expert, but keep it accessible for a farmer.
2. ACCURACY: If a user asks an agricultural question, ANSWER IT FULLY. Do not decline agricultural queries.
3. STRUCTURE: Use markdown-like formatting (bullet points, bold text) for readability.
4. LANGUAGE: You MUST ALWAYS respond entirely in ${langName}. Do not use English unless the selected language is English.
5. LIMITS: STRICTLY DECLINE ANY non-agricultural, non-rural, or programming/coding topics. If asked to write code or about unrelated subjects, refuse and remind the user that you only answer agriculture-related questions.
6. STYLE: Maintain a precise, professional agronomic tone with bullet points for readability.`;
    }
}

const CHAT_ICON_SVG = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>';
const CHAT_CLOSE_SVG = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';

let chatOpen = false;
let chatIsLoading = false;

function toggleChatbot() {
    chatOpen = !chatOpen;
    const panel = document.getElementById('chatPanel');
    const btn = document.getElementById('chatToggleBtn');

    if (!panel) return; // nothing to do

    if (chatOpen) {
        // show with animation
        panel.classList.remove('chat-hidden');
        panel.classList.add('chat-open');
        panel.style.display = 'flex';
        if (btn) {
            btn.innerHTML = CHAT_CLOSE_SVG;
            btn.setAttribute('aria-expanded', 'true');
            btn.setAttribute('title', 'Close Consultation');
        }
        const input = document.getElementById('chatInput');
        if (input) input.focus({ preventScroll: true });
        // ensure latest messages visible
        const container = document.getElementById('chatMessages');
        if (container) container.scrollTop = container.scrollHeight;
    } else {
        panel.classList.remove('chat-open');
        panel.classList.add('chat-hidden');
        // keep a short timeout before hiding to allow animation
        setTimeout(() => { panel.style.display = 'none'; }, 260);
        if (btn) {
            btn.innerHTML = CHAT_ICON_SVG;
            btn.setAttribute('aria-expanded', 'false');
            btn.setAttribute('title', 'Open Agronomic Consultation');
        }
    }
}

// Start hidden properly
document.addEventListener('DOMContentLoaded', () => {
    const panel = document.getElementById('chatPanel');
    if (panel) {
        panel.classList.add('chat-hidden');
        panel.style.display = 'none';
    }
});

function clearChat() {
    // Reset conversation history (keep only system prompt)
    if (typeof chatHistory !== 'undefined' && chatHistory.length > 0) {
        chatHistory = [chatHistory[0]];
    }

    // Clear messages UI
    const container = document.getElementById('chatMessages');
    const dict = TRANSLATIONS[AppState.currentLang] || TRANSLATIONS.en;
    const greetingMsg = dict.chatGreeting || "Welcome to AgriSense AI. How may I assist your crop diagnostics or field management today?";

    if (container) {
        container.innerHTML = `
            <div class="chat-msg ai-msg">
                ${greetingMsg}
            </div>`;
    }

    // Show suggestions again
    const sugg = document.getElementById('chatSuggestions');
    if (sugg) sugg.style.display = 'flex';
}

function sendChatSuggestion(text) {
    document.getElementById('chatInput').value = text;
    sendChatMessage();
    const sugg = document.getElementById('chatSuggestions');
    if (sugg) sugg.style.display = 'none';
}

async function sendChatMessage() {
    if (chatIsLoading) return;
    const input = document.getElementById('chatInput');
    const msg = input.value.trim();
    if (!msg) return;
    input.value = '';

    appendChatMsg(msg, 'user');
    chatIsLoading = true;

    // Add to history
    chatHistory.push({ role: 'user', content: msg });
    // Keep history under 22 entries (system + 10 turns)
    if (chatHistory.length > 22) {
        chatHistory = [chatHistory[0], ...chatHistory.slice(-20)];
    }

    // Show animated typing dots
    const typingId = appendTypingIndicator();

    try {
        let reply;
        if (!navigator.onLine) {
            // OFFLINE: use local knowledge
            reply = getLocalFallback(msg);
        } else {
            reply = await callGroqAPI(chatHistory);
        }

        // Add AI reply to history
        chatHistory.push({ role: 'assistant', content: reply });

        removeTypingIndicator(typingId);
        appendChatMsg(reply, 'bot');
    } catch (err) {
        console.error('Chat error:', err);
        removeTypingIndicator(typingId);
        // Try local knowledge first, show a proper error if not found
        const localReply = getLocalFallback(msg, true);
        chatHistory.push({ role: 'assistant', content: localReply });
        appendChatMsg(localReply, 'bot');
    }

    chatIsLoading = false;
}

async function callGroqAPI(messages) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000); // 20s timeout

    try {
        // Call our own Flask backend — no CORS issues, API key stays server-side
        const response = await fetch(`${API_BASE}/chat`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messages }),
            signal: controller.signal
        });

        clearTimeout(timeout);

        const data = await response.json();

        if (!response.ok || !data.success) {
            console.error('Chat backend error:', data.error || response.status);
            throw new Error(data.error || `Server error ${response.status}`);
        }

        return data.reply;
    } catch (err) {
        clearTimeout(timeout);
        if (err.name === 'AbortError') throw new Error('Request timed out after 20s');
        throw err;
    }
}

function appendTypingIndicator() {
    const container = document.getElementById('chatMessages');
    const id = 'typing-' + Date.now();
    const div = document.createElement('div');
    div.id = id;
    div.className = 'typing-indicator';
    div.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
        <small style="margin-left: 8px; color: var(--n-500); font-weight: 600;">AgriBot is thinking...</small>`;
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
    return id;
}

function removeTypingIndicator(id) {
    const el = document.getElementById(id);
    if (el) el.remove();
}

function appendChatMsg(text, role, isTyping = false) {
    const container = document.getElementById('chatMessages');
    const id = 'msg-' + Date.now() + Math.random().toString(36).slice(2);

    const div = document.createElement('div');
    div.id = id;

    if (role === 'user') {
        div.className = 'chat-msg user-msg';
        div.style.cssText = 'background:var(--g-600); color:white; border-radius:18px 18px 4px 18px; padding:12px 16px; font-size:0.95rem; max-width:85%; align-self:flex-end; box-shadow:var(--sh-md);';
        div.textContent = text;
    } else {
        div.className = 'chat-msg ai-msg markdown-body';
        div.style.cssText = 'background:var(--white); color:var(--n-800); border:1px solid var(--border); border-radius:18px 18px 18px 4px; padding:12px 16px; font-size:0.95rem; max-width:90%; align-self:flex-start; box-shadow:var(--sh-sm); line-height:1.6;';
        if (typeof marked !== 'undefined') {
            div.innerHTML = marked.parse(text);
        } else {
            div.style.whiteSpace = 'pre-wrap';
            div.textContent = text;
        }
    }

    if (isTyping) div.style.opacity = '0.6';

    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
    return id;
}

/* --- Local Advisory Data --- */
const LOCAL_ADVISORY = {
    "Tomato Bacterial Spot": {
        recovery: "70-85% if treated early.",
        organic: "Spray neem oil or copper-based fungicides. Remove infected leaves.",
        chemical: "Use Streptomycin or copper oxychloride sprays.",
        prevention: "Use certified seeds, rotate crops, and avoid overhead irrigation."
    },
    "Tomato Early Blight": {
        recovery: "80-90% with proper fungicide application.",
        organic: "Apply Bacillus subtilis or compost tea. Improve air circulation.",
        chemical: "Use Chlorothalonil or Mancozeb fungicides.",
        prevention: "Rotate crops, mulch soil, and keep foliage dry."
    },
    "Tomato Late Blight": {
        recovery: "Low if widespread; needs immediate action.",
        organic: "Copper sprays and removal of all infected plants.",
        chemical: "Use Ridomil Gold or other systemic fungicides.",
        prevention: "Plant resistant varieties and monitor during humid weather."
    },
    "Tomato Leaf Mold": {
        recovery: "Good in greenhouses with humidity control.",
        organic: "Increase ventilation and reduce humidity. Use vinegar sprays.",
        chemical: "Use Difenoconazole or similar fungicides.",
        prevention: "Ensure high spacing between plants and use drip irrigation."
    },
    "Potato Early Blight": {
        recovery: "High with timely fungicide use.",
        organic: "Use crop rotation and maintain plant vigor with compost.",
        chemical: "Apply Mancozeb or Chlorothalonil.",
        prevention: "Avoid nitrogen deficiency and overhead watering."
    },
    "Potato Late Blight": {
        recovery: "Critical; can destroy crops in days.",
        organic: "Immediate removal of infected plants; copper sprays.",
        chemical: "Use Metalaxyl or Cymoxanil-based products.",
        prevention: "Use healthy tubers and avoid planting near tomatoes."
    },
    "Healthy": {
        recovery: "100% - Maintain current care.",
        organic: "Continue using organic fertilizers and natural pest control.",
        chemical: "No chemical intervention needed.",
        prevention: "Continue monitoring and regular soil testing."
    }
};

/* --- Offline Fallback (when no internet) --- */
function getLocalFallback(q, isApiError = false) {
    const lower = q.toLowerCase();

    for (const [disease, info] of Object.entries(LOCAL_ADVISORY)) {
        if (lower.includes(disease.toLowerCase())) {
            return `${disease} Management:\n• Immediate Recovery: ${info.recovery}\n• Biological & Organic: ${info.organic}\n• Chemical Therapeutics: ${info.chemical}\n• Cultural Prevention: ${info.prevention}`;
        }
    }
    if (lower.includes('organic') || lower.includes('pest')) return 'Organic Pest Management: Cold-pressed neem oil (0.5%), Bacillus thuringiensis, yellow bio-traps, and beneficial predator conservation.';
    if (lower.includes('fertilizer') || lower.includes('npk')) return 'NPK Agronomic Guidelines:\n• N (Nitrogen/Urea): Vegetative canopy growth\n• P (Phosphorus/DAP): Root-zone establishment and flowering\n• K (Potassium/MOP): Fruit sizing, brix value, and drought resistance';
    if (lower.includes('irrigat') || lower.includes('water')) return 'Irrigation Standards: Drip emitters at root crown offer >90% water efficiency. Water during early morning to minimize foliar wetness and fungal sporulation.';
    if (lower.match(/^(hi|hello|hey|namaste)/)) return 'Welcome to AgriSense Agronomic Intelligence. How can I assist with your crop diagnostics, soil telemetry, or integrated pest management today?';

    if (!navigator.onLine) {
        return 'System is offline. Local diagnostic references for supported pathogens remain accessible.';
    }
    if (isApiError) {
        return 'The cloud inference service is momentarily rate-limited. Local agronomic references are active.';
    }
    return 'Please state your agronomic inquiry. For example:\n• "How to treat late blight in tomatoes?"\n• "Biological pest control for whiteflies"\n• "Recommended soil moisture for orchard crops"';
}

/* =====================================================
   IOT MONITORING LOGIC
   ===================================================== */

function startIoTMonioting() {
    IoTHistory = [];
    fetchIoTData();
    if (AppState.iotInterval) clearInterval(AppState.iotInterval);
    AppState.iotInterval = setInterval(fetchIoTData, 20000);
    if (!IoTWeatherLoaded) fetchIoTWeather();
}

function stopIoTMonioting() {
    if (AppState.iotInterval) {
        clearInterval(AppState.iotInterval);
        AppState.iotInterval = null;
    }
}

async function fetchIoTData() {
    try {
        const res = await fetch(`${API_BASE}/get_moisture`);
        if (!res.ok) throw new Error('Failed to fetch sensor data');
        const data = await res.json();
        updateIoTUI(data);
    } catch (err) {
        console.error('IoT Fetch Error:', err);
        setIoTOffline();
    }
}

function setIoTOffline(lastUpdated = '--:--:--') {
    const dict = TRANSLATIONS[AppState.currentLang] || TRANSLATIONS.en;
    const offlineText = dict.iotOffline || 'Offline';

    const valEl = document.getElementById('moistureValue');
    const updateEl = document.getElementById('lastUpdated');
    const connStatus = document.getElementById('connectionStatus');
    const badge = document.getElementById('moistureStatusBadge');
    const recBox = document.getElementById('iotRecommendation');
    const gradeEl = document.getElementById('healthGrade');
    const scoreEl = document.getElementById('healthScore');
    const waterFill = document.getElementById('moistureWaterFill');
    const ring = document.getElementById('healthRingFill');
    const banner = document.getElementById('iotAlertBanner');

    if (valEl) valEl.textContent = '--';
    if (updateEl) updateEl.textContent = (lastUpdated === 'Never' || lastUpdated === '--:--:--') ? offlineText : lastUpdated;
    if (connStatus) {
        connStatus.textContent = offlineText;
        connStatus.setAttribute('data-i18n', 'iotOffline');
        connStatus.style.color = 'var(--accent-rose)';
    }
    if (badge) {
        badge.className = 'status-badge status-unknown';
        badge.textContent = offlineText;
    }
    if (recBox) {
        recBox.textContent = dict.iotDisconnected || 'Sensor disconnected. Please check connection.';
    }
    if (gradeEl) {
        gradeEl.textContent = offlineText;
        gradeEl.className = 'health-grade grade-bad';
    }
    if (scoreEl) scoreEl.textContent = '--';
    if (waterFill) {
        waterFill.style.bottom = '-10%';
    }
    const gaugeTrack = document.getElementById('moistureGaugeTrack');
    if (gaugeTrack) {
        gaugeTrack.classList.remove('state-dry', 'state-opt', 'state-wet');
    }
    if (ring) {
        const circ = 2 * Math.PI * 34;
        ring.style.strokeDasharray = circ;
        ring.style.strokeDashoffset = circ;
        ring.style.stroke = 'var(--n-300)';
    }
    if (banner) banner.classList.add('hidden');

    // Clear history and stats to prevent showing old data
    if (typeof IoTHistory !== 'undefined') {
        IoTHistory = [];
        updateIoTStats();
        drawMoistureChart();
    }
}

function formatLocalTime(utcTimeStr) {
    if (!utcTimeStr || utcTimeStr === '--:--:--' || utcTimeStr === 'Never') return utcTimeStr;
    const parts = utcTimeStr.split(':');
    if (parts.length !== 3) return utcTimeStr;

    const d = new Date();
    d.setUTCHours(parseInt(parts[0], 10));
    d.setUTCMinutes(parseInt(parts[1], 10));
    d.setUTCSeconds(parseInt(parts[2], 10));

    let h = d.getHours();
    const m = String(d.getMinutes()).padStart(2, '0');
    const s = String(d.getSeconds()).padStart(2, '0');
    const ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12;
    h = h ? h : 12;
    const hStr = String(h).padStart(2, '0');

    return `${hStr}:${m}:${s} ${ampm}`;
}

function updateIoTUI(data) {
    const moisture = isNaN(parseFloat(data.moisture)) ? 0 : parseFloat(data.moisture);
    const rawLastUpdated = data.last_updated || '--:--:--';
    const dict = TRANSLATIONS[AppState.currentLang] || TRANSLATIONS.en;

    if (rawLastUpdated === 'Never' || data.status === 'offline') {
        setIoTOffline(rawLastUpdated);
        return;
    }

    const lastUpdated = formatLocalTime(rawLastUpdated);

    // Update Value with Smooth Count-Up Animation
    animateMoistureNumber(moisture);

    const updateEl = document.getElementById('lastUpdated');
    const connStatus = document.getElementById('connectionStatus');

    if (updateEl) updateEl.textContent = lastUpdated;
    if (connStatus) {
        connStatus.textContent = dict.iotLive || 'Live';
        connStatus.setAttribute('data-i18n', 'iotLive');
        connStatus.style.color = 'var(--g-600)';
    }

    // Update Fluid Gauge & Dynamic State Theme
    const waterFill = document.getElementById('moistureWaterFill');
    const gaugeTrack = document.getElementById('moistureGaugeTrack');
    if (waterFill) {
        const clamped = Math.max(0, Math.min(100, moisture));
        if (clamped <= 0) {
            waterFill.style.bottom = '-10%';
        } else if (clamped >= 100) {
            waterFill.style.bottom = '110%';
        } else {
            waterFill.style.bottom = clamped + '%';
        }
    }

    if (gaugeTrack) {
        gaugeTrack.classList.remove('state-dry', 'state-opt', 'state-wet');
        if (moisture < 30) {
            gaugeTrack.classList.add('state-dry');
        } else if (moisture <= 75) {
            gaugeTrack.classList.add('state-opt');
        } else {
            gaugeTrack.classList.add('state-wet');
        }
    }

    // Trigger Telemetry Synchronize Ping Ring
    triggerGaugePulse();

    // Update Status Badge & Recommendation
    const badge = document.getElementById('moistureStatusBadge');
    const recBox = document.getElementById('iotRecommendation');

    if (badge) {
        badge.className = 'status-badge'; // reset
        if (moisture < 30) {
            badge.classList.add('status-dry');
            badge.textContent = dict.iotDry || 'Too Dry';
            if (recBox) recBox.textContent = dict.iotDryRec || 'Soil moisture is critically low. Initiate irrigation immediately.';
        } else if (moisture >= 30 && moisture <= 75) {
            badge.classList.add('status-good');
            badge.textContent = dict.iotOpt || 'Optimal';
            if (recBox) recBox.textContent = dict.iotOptRec || 'Soil moisture is at an ideal level for most crops. No action needed.';
        } else {
            badge.classList.add('status-wet');
            badge.textContent = dict.iotWet || 'Too Wet';
            if (recBox) recBox.textContent = dict.iotWetRec || 'Soil is saturated. Stop irrigation and ensure proper drainage to avoid root rot.';
        }
    }

    AppState.lastMoisture = moisture;

    // Enhanced features
    IoTHistory.push(moisture);
    if (IoTHistory.length > 20) IoTHistory.shift();
    updateIoTStats();
    drawMoistureChart();
    updateHealthScore(moisture);
    updateIoTAlert(moisture);
}

let moistureAnimFrame = null;

function animateMoistureNumber(target) {
    const valEl = document.getElementById('moistureValue');
    if (!valEl) return;

    if (moistureAnimFrame) cancelAnimationFrame(moistureAnimFrame);

    const start = typeof AppState.lastMoisture === 'number' && !isNaN(AppState.lastMoisture) 
        ? AppState.lastMoisture 
        : (parseFloat(valEl.textContent) || 0);
    const targetVal = Math.round(target);
    const duration = 750;
    const startTime = performance.now();

    function step(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(start + (targetVal - start) * ease);
        valEl.textContent = current;

        if (progress < 1) {
            moistureAnimFrame = requestAnimationFrame(step);
        } else {
            valEl.textContent = targetVal;
            moistureAnimFrame = null;
        }
    }
    moistureAnimFrame = requestAnimationFrame(step);
}

function triggerGaugePulse() {
    const ring = document.getElementById('gaugePulseRing');
    if (ring) {
        ring.classList.remove('pulse-active');
        void ring.offsetWidth; // Force reflow to re-trigger keyframe
        ring.classList.add('pulse-active');
    }
}

/* =====================================================
   IOT ENHANCED HELPER FUNCTIONS
   ===================================================== */

let IoTHistory = [];
let IoTWeatherLoaded = false;

function updateIoTStats() {
    const minEl = document.getElementById('moistureMin');
    const maxEl = document.getElementById('moistureMax');
    const avgEl = document.getElementById('moistureAvg');
    const countEl = document.getElementById('moistureCount');

    if (IoTHistory.length === 0) {
        if (minEl) minEl.textContent = '--';
        if (maxEl) maxEl.textContent = '--';
        if (avgEl) avgEl.textContent = '--';
        if (countEl) countEl.textContent = '0';
        return;
    }
    const min = Math.min(...IoTHistory);
    const max = Math.max(...IoTHistory);
    const avg = IoTHistory.reduce((a, b) => a + b, 0) / IoTHistory.length;

    if (minEl) minEl.textContent = min.toFixed(2);
    if (maxEl) maxEl.textContent = max.toFixed(2);
    if (avgEl) avgEl.textContent = avg.toFixed(2);
    if (countEl) countEl.textContent = IoTHistory.length;
}

function drawMoistureChart() {
    const canvas = document.getElementById('moistureChart');
    if (!canvas) return;
    const wrap = canvas.parentElement;
    const W = wrap.clientWidth || 400;
    const H = wrap.clientHeight || 120;
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, W, H);

    if (IoTHistory.length < 2) return;

    const dryY = H - (30 / 100) * H;
    const wetY = H - (75 / 100) * H;

    // Zone backgrounds
    ctx.fillStyle = 'rgba(239,68,68,0.07)'; ctx.fillRect(0, dryY, W, H - dryY);
    ctx.fillStyle = 'rgba(34,197,94,0.07)'; ctx.fillRect(0, wetY, W, dryY - wetY);
    ctx.fillStyle = 'rgba(14,165,233,0.07)'; ctx.fillRect(0, 0, W, wetY);

    // Threshold lines
    ctx.setLineDash([5, 5]);
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(239,68,68,0.35)'; ctx.beginPath(); ctx.moveTo(0, dryY); ctx.lineTo(W, dryY); ctx.stroke();
    ctx.strokeStyle = 'rgba(14,165,233,0.35)'; ctx.beginPath(); ctx.moveTo(0, wetY); ctx.lineTo(W, wetY); ctx.stroke();
    ctx.setLineDash([]);

    const stepX = (IoTHistory.length > 1) ? W / (IoTHistory.length - 1) : W;

    // Gradient fill
    const grad = ctx.createLinearGradient(0, 0, 0, H);
    grad.addColorStop(0, 'rgba(3,169,244,0.25)');
    grad.addColorStop(1, 'rgba(3,169,244,0.01)');
    ctx.beginPath();
    IoTHistory.forEach((v, i) => {
        const x = i * stepX, y = H - (v / 100) * H;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.closePath();
    ctx.fillStyle = grad; ctx.fill();

    // Line
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(3,169,244,0.9)';
    ctx.lineWidth = 2.5; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
    IoTHistory.forEach((v, i) => {
        const x = i * stepX, y = H - (v / 100) * H;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.stroke();

    // Dots
    IoTHistory.forEach((v, i) => {
        const x = i * stepX, y = H - (v / 100) * H;
        const isLast = i === IoTHistory.length - 1;
        ctx.beginPath();
        ctx.arc(x, y, isLast ? 5 : 3, 0, Math.PI * 2);
        ctx.fillStyle = v < 30 ? '#ef4444' : v > 75 ? '#0ea5e9' : '#22c55e';
        ctx.fill();
        if (isLast) { ctx.strokeStyle = 'white'; ctx.lineWidth = 2; ctx.stroke(); }
    });
}

function updateHealthScore(moisture) {
    let score, grade, tip;
    if (moisture >= 40 && moisture <= 65) {
        score = 90 + Math.round(Math.random() * 9);
        grade = 'Optimal'; tip = 'Perfect moisture balance. Crops are thriving in ideal conditions!';
    } else if (moisture >= 30 && moisture < 40) {
        score = 65 + Math.round((moisture - 30) * 2.5);
        grade = 'Adequate'; tip = 'Slightly low. Consider a light irrigation soon.';
    } else if (moisture > 65 && moisture <= 75) {
        score = 70 + Math.round((75 - moisture) * 2);
        grade = 'Adequate'; tip = 'Slightly above optimal. Ensure good drainage is in place.';
    } else if (moisture < 30) {
        score = Math.max(10, moisture * 2);
        grade = 'Critical Deficit'; tip = 'Soil is very dry! Irrigate immediately to prevent crop stress.';
    } else {
        score = Math.max(20, 100 - moisture);
        grade = 'Saturated / Waterlogged'; tip = 'Soil oversaturated. Stop watering and check drainage channels.';
    }
    score = Math.min(100, score);

    const scoreEl = document.getElementById('healthScore');
    const gradeEl = document.getElementById('healthGrade');
    const tipEl = document.getElementById('healthTip');
    const ring = document.getElementById('healthRingFill');

    if (scoreEl) scoreEl.textContent = score;
    if (gradeEl) {
        gradeEl.textContent = grade;
        gradeEl.className = 'health-grade';
        if (score >= 80) gradeEl.classList.add('grade-excellent');
        else if (score >= 60) gradeEl.classList.add('grade-good');
        else if (score >= 40) gradeEl.classList.add('grade-warn');
        else gradeEl.classList.add('grade-bad');
    }
    if (tipEl) tipEl.textContent = tip;
    if (ring) {
        const circ = 2 * Math.PI * 34;
        ring.style.strokeDasharray = circ;
        ring.style.strokeDashoffset = circ - (score / 100) * circ;
        ring.style.stroke = score >= 80 ? '#22c55e' : score >= 60 ? '#f59e0b' : '#ef4444';
    }
}

function updateIoTAlert(moisture) {
    const banner = document.getElementById('iotAlertBanner');
    const icon = document.getElementById('iotAlertIcon');
    const title = document.getElementById('iotAlertTitle');
    const msg = document.getElementById('iotAlertMsg');
    if (!banner) return;
    if (moisture < 20) {
        banner.classList.remove('hidden', 'alert-wet');
        banner.classList.add('alert-dry');
        if (icon) icon.innerHTML = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>';
        if (title) title.textContent = 'Critical Soil Water Deficit';
        if (msg) msg.textContent = `Root-zone moisture is at ${moisture}%. Immediate irrigation is required to avoid irreversible wilting.`;
    } else if (moisture > 85) {
        banner.classList.remove('hidden', 'alert-dry');
        banner.classList.add('alert-wet');
        if (icon) icon.innerHTML = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path></svg>';
        if (title) title.textContent = 'Soil Saturation & Hypoxia Risk';
        if (msg) msg.textContent = `Root-zone moisture is at ${moisture}%. Halt irrigation immediately and verify trench drainage.`;
    } else {
        banner.classList.add('hidden');
    }
}

async function fetchIoTWeather() {
    const content = document.getElementById('iotWeatherContent');
    if (!content) return;
    content.innerHTML = '<p class="text-muted" style="text-align:center;padding:1rem 0;">Querying local weather telemetry...</p>';
    if (!navigator.geolocation) {
        content.innerHTML = '<p class="text-warn">Geolocation unavailable on this device.</p>';
        return;
    }
    navigator.geolocation.getCurrentPosition(async (pos) => {
        const { latitude: lat, longitude: lon } = pos.coords;
        try {
            const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,apparent_temperature&timezone=auto`);
            const data = await res.json();
            if (!data.current) throw new Error();
            const c = data.current;
            const temp = Math.round(c.temperature_2m);
            const feels = Math.round(c.apparent_temperature);
            const hum = c.relative_humidity_2m;
            const wind = Math.round(c.wind_speed_10m);

            const weatherDescMap = {
                0: 'Clear Sky', 1: 'Mainly Clear', 2: 'Partly Cloudy', 3: 'Overcast',
                45: 'Foggy', 48: 'Depositing Rime Fog', 51: 'Light Drizzle', 53: 'Moderate Drizzle',
                55: 'Dense Drizzle', 61: 'Slight Rain', 63: 'Moderate Rain', 65: 'Heavy Rain',
                80: 'Rain Showers', 81: 'Heavy Showers', 82: 'Violent Showers', 95: 'Thunderstorm'
            };
            const wDesc = weatherDescMap[c.weather_code] || 'Current Microclimate';

            content.innerHTML = `
                <div class="iot-weather-main">
                    <div class="weather-temp-block">
                        <div class="weather-temp">${temp}°C</div>
                        <div class="weather-desc">${wDesc}</div>
                        <div class="weather-feels">Apparent: ${feels}°C</div>
                    </div>
                </div>
                <div class="iot-weather-stats">
                    <div class="iot-weather-stat">
                        <span class="stat-glyph"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path></svg></span>
                        <span class="stat-number">${hum}%</span>
                        <small>Humidity</small>
                    </div>
                    <div class="iot-weather-stat">
                        <span class="stat-glyph"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"></path></svg></span>
                        <span class="stat-number">${wind} km/h</span>
                        <small>Wind Velocity</small>
                    </div>
                    <div class="iot-weather-stat">
                        <span class="stat-glyph"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg></span>
                        <span class="stat-number">${lat.toFixed(2)}°N</span>
                        <small>Coordinates</small>
                    </div>
                </div>`;
            IoTWeatherLoaded = true;
        } catch (e) {
            content.innerHTML = '<p class="text-warn">Unable to query Open-Meteo telemetry.</p>';
        }
    }, () => {
        content.innerHTML = '<p class="text-warn">Location permissions declined.</p>';
    });
}

/* --- Authentication Logic --- */
let currentAuthMode = 'signup';

function toggleAuthMode(mode) {
    currentAuthMode = mode;
    const nameGroup = document.getElementById('nameGroup');
    const authName = document.getElementById('authName');
    const authTitle = document.getElementById('authTitle');
    const authSubtitle = document.getElementById('authSubtitle');
    const authSubmitBtn = document.getElementById('authSubmitBtn');
    const forgotLink = document.getElementById('forgotPasswordLink');
    const authPassword = document.getElementById('authPassword');

    document.getElementById('btnSignup').classList.toggle('active', mode === 'signup');
    document.getElementById('btnLogin').classList.toggle('active', mode === 'login');
    document.getElementById('authError').textContent = '';

    if (mode === 'login') {
        nameGroup.style.display = 'none';
        authName.removeAttribute('required');
        authTitle.textContent = 'Welcome Back';
        authSubtitle.textContent = 'Login to AgriSense AI to continue.';
        authSubmitBtn.textContent = 'Login';
        if (forgotLink) forgotLink.style.display = 'block';
        if (authPassword) authPassword.placeholder = "Enter your password";
    } else if (mode === 'reset') {
        nameGroup.style.display = 'none';
        authName.removeAttribute('required');
        authTitle.textContent = 'Reset Password';
        authSubtitle.textContent = 'Enter phone number and new password.';
        authSubmitBtn.textContent = 'Reset Password';
        if (forgotLink) forgotLink.style.display = 'none';
        if (authPassword) authPassword.placeholder = "Enter new password";
    } else {
        nameGroup.style.display = 'block';
        authName.setAttribute('required', 'true');
        authTitle.textContent = 'Create Account';
        authSubtitle.textContent = 'Join AgriSense AI to continue.';
        authSubmitBtn.textContent = 'Sign Up';
        if (forgotLink) forgotLink.style.display = 'none';
        if (authPassword) authPassword.placeholder = "Create a password";
    }
}

function checkAuth() {
    const userStr = localStorage.getItem('agri_active_user') || localStorage.getItem('agri_user');
    const overlay = document.getElementById('authOverlay');
    if (!overlay) return;

    if (!userStr) {
        overlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        toggleAuthMode('signup');
    } else {
        overlay.classList.add('hidden');
        document.body.style.overflow = '';
    }
}

function handleAuth(e) {
    e.preventDefault();
    const phone = document.getElementById('authPhone').value.trim();
    const password = document.getElementById('authPassword').value.trim();
    const errorEl = document.getElementById('authError');

    if (phone.length !== 10 || isNaN(phone)) {
        errorEl.textContent = 'Please enter a valid 10-digit phone number.';
        return;
    }

    if (password.length < 4) {
        errorEl.textContent = 'Password must be at least 4 characters.';
        return;
    }

    let users = JSON.parse(localStorage.getItem('agri_users_db') || '{}');

    if (currentAuthMode === 'signup') {
        const name = document.getElementById('authName').value.trim();
        if (!name) {
            errorEl.textContent = 'Please enter your full name.';
            return;
        }
        if (users[phone]) {
            errorEl.textContent = 'An account with this phone number already exists. Please login.';
            return;
        }

        const joinDate = new Date().toLocaleDateString();
        users[phone] = { name, phone, password, joinDate };
        localStorage.setItem('agri_users_db', JSON.stringify(users));
        localStorage.setItem('agri_active_user', JSON.stringify(users[phone]));
    } else if (currentAuthMode === 'reset') {
        if (!users[phone]) {
            errorEl.textContent = 'Account not found. Please sign up first.';
            return;
        }
        users[phone].password = password;
        localStorage.setItem('agri_users_db', JSON.stringify(users));
        localStorage.setItem('agri_active_user', JSON.stringify(users[phone]));
        alert('Password reset successfully!');
    } else {
        // Login
        if (!users[phone]) {
            errorEl.textContent = 'Account not found. Please sign up first.';
            return;
        }
        if (users[phone].password !== password) {
            errorEl.textContent = 'Incorrect password.';
            return;
        }
        // Backfill joinDate for old accounts that were created before this field existed
        if (!users[phone].joinDate) {
            users[phone].joinDate = new Date().toLocaleDateString();
            localStorage.setItem('agri_users_db', JSON.stringify(users));
        }
        localStorage.setItem('agri_active_user', JSON.stringify(users[phone]));
    }

    errorEl.textContent = '';

    // Close overlay
    const overlay = document.getElementById('authOverlay');
    if (overlay) {
        overlay.classList.add('hidden');
        document.body.style.overflow = '';
    }
}

/* --- Profile & Logout --- */
function openProfile() {
    const modal = document.getElementById('profileModal');
    if (!modal) return;

    const userStr = localStorage.getItem('agri_active_user');
    if (!userStr) {
        checkAuth();
        return;
    }

    try {
        const user = JSON.parse(userStr);
        document.getElementById('profileName').textContent = (user.name || 'User').toUpperCase();
        document.getElementById('profilePhone').textContent = user.phone || '';

        // Profile photo logic
        const photoEmoji = document.getElementById('profilePhotoEmoji');
        const photoImg = document.getElementById('profilePhotoImg');
        if (user.photo) {
            if (photoEmoji) photoEmoji.style.display = 'none';
            if (photoImg) {
                photoImg.src = user.photo;
                photoImg.style.display = 'block';
            }
        } else {
            if (photoEmoji) photoEmoji.style.display = 'inline';
            if (photoImg) {
                photoImg.src = '';
                photoImg.style.display = 'none';
            }
        }

        // Extra info
        const elLang = document.getElementById('profileLanguage');
        if (elLang) {
            const langNames = { 'en': 'English', 'hi': 'Hindi', 'kn': 'Kannada' };
            elLang.textContent = langNames[AppState.currentLang] || 'English';
        }

        const elDate = document.getElementById('profileDate');
        if (elDate) elDate.textContent = user.joinDate || 'Unknown';

        const elScans = document.getElementById('profileScans');
        if (elScans) elScans.textContent = user.scanCount || 0;

        const elMoisture = document.getElementById('profileMoisture');
        if (elMoisture) elMoisture.textContent = AppState.lastMoisture ? AppState.lastMoisture.toFixed(2) + '%' : '--';

    } catch (e) { }

    // Use style.display directly — most reliable on mobile
    modal.classList.remove('hidden');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeProfile() {
    const modal = document.getElementById('profileModal');
    if (!modal) return;
    modal.style.display = 'none';
    modal.classList.add('hidden');
    document.body.style.overflow = '';
}

function logout() {
    localStorage.removeItem('agri_active_user');
    closeProfile();
    checkAuth();
}

function handleProfilePhotoUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
        const base64Data = event.target.result;

        // Update DOM
        const photoEmoji = document.getElementById('profilePhotoEmoji');
        const photoImg = document.getElementById('profilePhotoImg');
        if (photoEmoji) photoEmoji.style.display = 'none';
        if (photoImg) {
            photoImg.src = base64Data;
            photoImg.style.display = 'block';
        }

        // Update local storage
        const userStr = localStorage.getItem('agri_active_user');
        if (userStr) {
            try {
                const user = JSON.parse(userStr);
                user.photo = base64Data;
                localStorage.setItem('agri_active_user', JSON.stringify(user));

                // Update users DB as well
                let users = JSON.parse(localStorage.getItem('agri_users_db') || '{}');
                if (users[user.phone]) {
                    users[user.phone].photo = base64Data;
                    localStorage.setItem('agri_users_db', JSON.stringify(users));
                }
            } catch (err) {
                console.error('Error saving profile photo', err);
            }
        }
    };
    reader.readAsDataURL(file);
}

/* =====================================================
   CROP RECOMMENDATION LOGIC
   ===================================================== */
function autoFillLocationData() {
    if (!navigator.geolocation) {
        alert("Geolocation is not supported by your browser");
        return;
    }

    // Show some loading indication on the button
    const btn = document.querySelector('#screenRecommend .tip-card button');
    const oldText = btn.textContent;
    btn.textContent = "Detecting Location & Weather...";

    navigator.geolocation.getCurrentPosition(async (pos) => {
        const { latitude: lat, longitude: lon } = pos.coords;
        try {
            // Fetch Location Name (Reverse Geocoding)
            const geoRes = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
            if (geoRes.ok) {
                const geoData = await geoRes.json();
                let locName = "";
                if (geoData.address) {
                    locName = geoData.address.city || geoData.address.town || geoData.address.village || geoData.address.county || "";
                    if (geoData.address.state) locName += (locName ? ", " : "") + geoData.address.state;
                }
                if (locName) document.getElementById('recLocation').value = locName;
            }

            // Fetch Weather
            const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m&timezone=auto`);
            if (weatherRes.ok) {
                const weatherData = await weatherRes.json();
                if (weatherData.current) {
                    document.getElementById('recTemp').value = weatherData.current.temperature_2m;
                    document.getElementById('recHumid').value = weatherData.current.relative_humidity_2m;
                }
            }

            // Guess season based on month (India focused roughly)
            const month = new Date().getMonth(); // 0-11
            const seasonSelect = document.getElementById('recSeason');
            if (month >= 5 && month <= 9) seasonSelect.value = "Kharif"; // Jun-Oct
            else if (month >= 10 || month <= 2) seasonSelect.value = "Rabi"; // Nov-Mar
            else seasonSelect.value = "Zaid"; // Apr-May

            btn.textContent = "Telemetry Populated";
            setTimeout(() => { btn.textContent = oldText; }, 3000);

        } catch (error) {
            console.error("Auto-fill error:", error);
            alert("Failed to auto-fetch data. Please fill manually.");
            btn.textContent = oldText;
        }
    }, () => {
        alert("Location permission denied. Please fill manually.");
        btn.textContent = oldText;
    });
}

async function fetchCropRecommendation() {
    const location = document.getElementById('recLocation').value;
    const temp = document.getElementById('recTemp').value;
    const humid = document.getElementById('recHumid').value;
    const soil = document.getElementById('recSoil').value;
    const season = document.getElementById('recSeason').value;
    const language = AppState.currentLang === 'hi' ? 'Hindi' : AppState.currentLang === 'kn' ? 'Kannada' : 'English';

    if (!location || !temp || !humid) {
        alert("Please fill all required fields");
        return;
    }

    const submitBtn = document.querySelector('#recommendForm button[type="submit"]');
    const oldBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = "Analyzing Cultivar Suitability...";
    submitBtn.disabled = true;

    try {
        const res = await fetch(`${API_BASE}/recommend_crop`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                location: location,
                temperature: parseFloat(temp),
                humidity: parseFloat(humid),
                soil_type: soil,
                season: season,
                language: language
            })
        });

        const data = await res.json();

        submitBtn.innerHTML = oldBtnText;
        submitBtn.disabled = false;

        if (res.ok && data.success) {
            const rec = data.recommendation;
            document.getElementById('recommendEmpty').style.display = 'none';
            document.getElementById('recommendResult').style.display = 'block';

            // Format recommended crops
            const cropsHtml = rec.recommended_crops.map(c =>
                `<div style="display:inline-block; background:rgba(245,158,11,0.1); color:var(--g-700); padding:0.4rem 0.8rem; border-radius:20px; font-weight:700; font-size:0.9rem; margin:0 0.5rem 0.5rem 0;">${c}</div>`
            ).join('');

            document.getElementById('recCropsList').innerHTML = cropsHtml;
            document.getElementById('recReasoning').textContent = rec.reasoning;
            document.getElementById('recPrep').textContent = rec.preparation;

            // Scroll to the result (important for mobile phones)
            document.getElementById('recommendResult').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
            alert(data.error || "Failed to get recommendations.");
        }
    } catch (error) {
        console.error("Recommendation error:", error);
        alert("Server unreachable or error occurred.");
        submitBtn.innerHTML = oldBtnText;
        submitBtn.disabled = false;
    }
}


/* ==========================================================================
   FARM CANVAS LIGHTING LOGIC
   ========================================================================== */
function updateFarmLighting() {
    const overlay = document.getElementById('farmLightingOverlay');
    if (!overlay) return;

    const hour = new Date().getHours();

    // Remove existing classes
    overlay.className = 'farm-lighting-overlay';

    if (hour >= 5 && hour < 8) {
        overlay.classList.add('farm-lighting-morning');
    } else if (hour >= 8 && hour < 17) {
        overlay.classList.add('farm-lighting-day');
    } else if (hour >= 17 && hour < 20) {
        overlay.classList.add('farm-lighting-dusk');
    } else {
        overlay.classList.add('farm-lighting-night');
    }
}

// Run on load
document.addEventListener('DOMContentLoaded', () => {
    updateFarmLighting();
    setInterval(updateFarmLighting, 1000 * 60 * 60);
});

// If the app is SPA and doesn't trigger DOMContentLoaded on navigation, 
// we hook into the existing navigateTo function globally or just rely on the interval.
// To be safe, we will override navigateTo slightly to include lighting update.
const originalNavigateTo = window.navigateTo;
if (typeof originalNavigateTo === "function") {
    window.navigateTo = function (screenId) {
        originalNavigateTo(screenId);
        if (screenId === "screenHome") {
            updateFarmLighting();
        }
    };
}

