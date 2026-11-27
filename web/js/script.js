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
    lastMoisture: 0,
    cameraStream: null
};



/* --- Translations --- */
const TRANSLATIONS = {
    en: {
        navHome: 'Hub', navDetect: 'Diagnostics', navCrops: 'Crops', navScan: 'Start Scan', navShop: 'Shop', shopTitle: 'Smart Crop Pharmacy & Store',
        navBottomHub: 'Home', navBottomDetect: 'Detect', navBottomPlanner: 'Crop', navBottomIoT: 'Water', navBottomShop: 'Shop', navBottomAdvisor: 'Advisor', navBottomProfile: 'Profile', navBottomAnalytics: 'Analytics', navBottomTools: 'Tools',
        heroBadge: 'Precision Agronomic Intelligence',
        heroTitle1: 'Healthy Crops', heroTitle2: 'Predictable Yields',
        heroDesc: 'Clinical foliar disease diagnosis, real-time root-zone telemetry, and verified agronomic protocols.',
        heroBtn1: 'Analyze Leaf',
        statCrops: 'Crops Supported', statDiseases: 'Pathogens Modeled', statLangs: 'Languages',
        statAdvice: 'Advisory Engine', statFocus: 'Edge Field Ready',
        selectLang: 'Platform Language',
        doThisFirst: 'Primary Operations',
        qaScanLeaf: 'Disease Detection', qaScanSub: 'Instant foliar classification',
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
        back: 'Back', pageDetect: 'Disease Detection',
        uploadTitle: 'Upload Leaf Image', uploadDrag: 'Choose photo from your phone',
        uploadFormats: 'JPEG / PNG formats supported', uploadHint: 'Ensure foliage is flat, sharp, and in natural daylight.',
        btnTakePhoto: 'Capture with Camera', btnChoosePhoto: 'Browse Image File',
        retake: 'Cancel', analyze: 'Continue',
        scanStepsTitle: 'Diagnostic Operating Procedure',
        scanStep1: 'Mount or hold specimen flat with clear background',
        scanStep2: 'Initiate diagnostic inference for pathology report',
        scanStep3: 'Review targeted biological and chemical remediation',
        photoTipsTitle: 'Imaging Best Practices',
        tip1: 'Natural, diffused daylight without direct harsh glare',
        tip2: 'Fill 70% or more of the frame with the target leaf',
        tip3: 'Ensure macro focus is sharp and motionless',
        tip4: 'Frame both healthy tissue and symptomatic lesions',
        iotTitle: 'Soil Moisture', iotSoilMoisture: 'Soil Moisture Level',
        fetching: 'Syncing telemetry...', lastUpdated: 'Last Packet:',
        iotAIRec: 'Field Guidance', iotOptRange: 'Target Range',
        iotConn: 'Telemetry Link', iotLive: 'Active', iotOffline: 'Offline', iotDisconnected: '',
        iotMinToday: '24h Minimum', iotMaxToday: '24h Maximum',
        iotAverage: 'Moving Average', iotReadings: 'Packet Count',
        iotChartTitle: 'Moisture Pattern', iotLast20: 'Last 20 Telemetry Samples',
        iotWeather: 'Farm Weather', iotDetectLoc: 'Querying station coordinates...',
        iotRefreshWeather: 'Refresh Weather Feed',
        iotSoilHealth: 'Soil Condition', iotWaiting: 'Evaluating...',
        iotConnectSensor: 'Awaiting live sensor telemetry to compute soil health score.',
        chatGreeting: "Welcome to AgriSense AI. You can query pathogen management, chemical dosages, biological controls, or irrigation schedules.",
        chatPlaceholder: 'Inquire about pathology, soil nutrients, or field management...',
        iotDry: 'Deficit (Dry)', iotDryRec: 'Soil moisture is critically low. Initiate targeted irrigation to prevent plant dehydration and vascular stress.',
        iotOpt: 'Optimal', iotOptRec: 'Root-zone moisture is balanced. Transpiration and nutrient uptake conditions are ideal.',
        iotWet: 'Saturated (Wet)', iotWetRec: 'Soil is waterlogged. Suspend irrigation and verify field drainage to prevent root hypoxia and fungal proliferation.',
        navRecommend: 'Crop Planner', featRecommend: 'Cultivar Recommendation', featRecommendDesc: 'Soil taxonomy and microclimate modeling for optimal crop selection.',
        recTitle: 'Crop Guidance', recAutoFill: 'Auto-detect Climate & Coordinates',
        recLocation: 'Field Region / Territory', recTemp: 'Ambient Temperature (°C)', recHumid: 'Relative Humidity (%)',
        recSoil: 'Soil Classification', recSeason: 'Agro-Climatic Season', recBtn: 'Continue',
        recResultTitle: 'Optimal Crop Selections', recReasoning: 'Agronomic Rationale', recPrep: 'Field & Seedbed Preparation',
        recEmpty: 'Specify regional coordinates, climate metrics, and soil taxonomy to compute optimal crop recommendations.', recLoading: 'Loading Field Specifications',
        qaRecommend: 'Crop Planning', qaRecommendSub: 'Targeted cultivar selection'
    },
    hi: {
        navHome: 'हब', navDetect: 'रोग पहचान', navCrops: 'फसलें', navScan: 'स्कैन शुरू करें', navShop: 'दुकान', shopTitle: 'स्मार्ट फसल फार्मेसी व स्टोर',
        navBottomHub: 'होम', navBottomDetect: 'पहचान', navBottomPlanner: 'फसल', navBottomIoT: 'पानी', navBottomShop: 'दुकान', navBottomAdvisor: 'सलाहकार', navBottomProfile: 'प्रोफ़ाइल', navBottomAnalytics: 'विश्लेषण', navBottomTools: 'उपकरण',
        heroBadge: 'सटीक कृषि आसूचना',
        heroTitle1: 'स्वस्थ फसलें', heroTitle2: 'स्थिर उत्पादन',
        heroDesc: 'सटीक फसल रोग पहचान, वास्तविक समय मिट्टी नमी ट्रैकिंग, और सत्यापित कृषि उपचार।',
        heroBtn1: 'पत्ती जांचें',
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
        navHome: 'ಹಬ್', navDetect: 'ರೋಗ ಪತ್ತೆ', navCrops: 'ಬೆಳೆಗಳು', navScan: 'ಸ್ಕ್ಯಾನ್ ಪ್ರಾರಂಭಿಸಿ', navShop: 'ಅಂಗಡಿ', shopTitle: 'ಸ್ಮಾರ್ಟ್ ಬೆಳೆ ಔಷಧಾಲಯ ಮತ್ತು ಅಂಗಡಿ',
        navBottomHub: 'ಮುಖಪುಟ', navBottomDetect: 'ಪತ್ತೆ', navBottomPlanner: 'ಬೆಳೆ', navBottomIoT: 'ನೀರು', navBottomShop: 'ಅಂಗಡಿ', navBottomAdvisor: 'ಸಲಹೆಗಾರ', navBottomProfile: 'ಪ್ರೊಫೈಲ್', navBottomAnalytics: 'ವಿಶ್ಲೇಷಣೆ', navBottomTools: 'ಪರಿಕರ',
        heroBadge: 'ನಿಖರ ಕೃಷಿ ಮಾಹಿತಿ ವ್ಯವಸ್ಥೆ',
        heroTitle1: 'ಆರೋಗ್ಯಕರ ಬೆಳೆಗಳು', heroTitle2: 'ಸುಸ್ಥಿರ ಆದಾಯ',
        heroDesc: 'ಸಸ್ಯ ರೋಗಗಳ ನಿಖರ ಪತ್ತೆ, ನೈಜ ಸಮಯದ ಮಣ್ಣಿನ ತೇವಾಂಶ ಮೇಲ್ವಿಚಾರಣೆ ಮತ್ತು ಕೃಷಿ ಮಾರ್ಗದರ್ಶನ.',
        heroBtn1: 'ಎಲೆಯ ಮಾದರಿ',
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
    if (AppState.currentScreen === 'screenHome') {
        document.body.classList.add('mobile-home-fixed');
    }

    // Navigation listener
    window.addEventListener('scroll', () => {
        document.getElementById('navbar')?.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });

    // Initial Data
    renderDailyTip();
    updateMetrics();
    initHorizLoopCards();
}

function attachProfileButtons() {
    document.querySelectorAll('.nav-profile-btn, .mobile-profile-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openProfile();
        });
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
        if (typeof stopInAreaCamera === 'function') stopInAreaCamera();
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

    if (screenId === 'screenHome') {
        document.body.classList.add('mobile-home-fixed');
    } else {
        document.body.classList.remove('mobile-home-fixed');
    }

    // Hide footer completely on Home screen, display on inner screens
    const farmFooter = document.querySelector('.farm-footer');
    if (farmFooter) {
        farmFooter.style.display = (screenId === 'screenHome') ? 'none' : 'block';
    }

    // Update Nav UI
    document.querySelectorAll('.nav-link').forEach(l => {
        l.classList.toggle('active', l.getAttribute('data-screen') === screenId);
    });
    const bottomNavLinks = [...document.querySelectorAll('.bottom-nav-link')];
    const selectedBottomLink = bottomNavLinks.find(l => l.getAttribute('data-screen') === screenId);
    bottomNavLinks.forEach(l => l.classList.toggle('active', l === selectedBottomLink));

    // Vibrate on navigation (mobile)
    if (window.navigator.vibrate) {
        window.navigator.vibrate(50);
    }

    // Sub-initializers
    if (screenId === 'screenDiseaseDetect') initUploadZone();
    if (screenId === 'screenIoT') startIoTMonioting();
    else stopIoTMonioting();
    if (screenId === 'screenShop') renderSmartShop();
}

function navigateFromBottomNav(screenId, link) {
    navigateTo(screenId);
    document.querySelectorAll('.bottom-nav-link').forEach(item => {
        item.classList.toggle('active', item === link);
    });
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
        if (dict[key]) {
            const targetSpan = el.querySelector('span');
            if (targetSpan && el.querySelector('svg')) {
                targetSpan.textContent = dict[key];
            } else {
                el.textContent = dict[key];
            }
        }
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

    // Update active quick pill item
    document.querySelectorAll('.lang-pill-item').forEach(pill => {
        const match = (pill.getAttribute('onclick') || '').match(/'([^']+)'/);
        if (match) {
            pill.classList.toggle('active', match[1] === lang);
        }
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
    const zone = document.getElementById('uploadZone');
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
    stopInAreaCamera();
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

    if (chooseBtn) chooseBtn.style.display = '';
    if (hint) {
        hint.textContent = '';
        hint.style.display = 'none';
    }
}

function triggerUpload() {
    const input = document.getElementById('fileInput');
    if (!input) return;
    input.click();
}

async function startInAreaCamera() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        const cameraInput = document.getElementById('cameraInput');
        if (cameraInput) cameraInput.click();
        return;
    }

    stopInAreaCamera();

    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: { ideal: 'environment' } },
            audio: false
        });
        AppState.cameraStream = stream;

        const video = document.getElementById('cameraVideo');
        const placeholder = document.getElementById('cameraPlaceholder');
        const preview = document.getElementById('imagePreview');
        const controls = document.getElementById('cameraLiveControls');
        const closeButton = document.getElementById('closeCameraBtn');
        const zone = document.getElementById('uploadZone');

        placeholder.style.display = 'none';
        preview.style.display = 'none';
        video.srcObject = stream;
        video.style.display = 'block';
        controls.style.display = 'flex';
        closeButton.style.display = 'flex';
        zone.classList.add('camera-live');

        await video.play();
    } catch (error) {
        stopInAreaCamera();
        alert('Camera access could not be opened. Please allow camera permission or use Browse Image File.');
    }
}

function stopInAreaCamera() {
    if (AppState.cameraStream) {
        AppState.cameraStream.getTracks().forEach(track => track.stop());
        AppState.cameraStream = null;
    }

    const video = document.getElementById('cameraVideo');
    if (video) {
        video.pause();
        video.srcObject = null;
        video.style.display = 'none';
    }

    const controls = document.getElementById('cameraLiveControls');
    if (controls) controls.style.display = 'none';
    const closeButton = document.getElementById('closeCameraBtn');
    if (closeButton) closeButton.style.display = 'none';

    const zone = document.getElementById('uploadZone');
    if (zone) zone.classList.remove('camera-live');

    const preview = document.getElementById('imagePreview');
    if (preview && preview.style.display === 'none') {
        const placeholder = document.getElementById('cameraPlaceholder');
        if (placeholder) placeholder.style.display = 'flex';
    }
}

function captureFromInAreaCamera() {
    const video = document.getElementById('cameraVideo');
    const canvas = document.getElementById('cameraCanvas');
    if (!video || !video.videoWidth || !video.videoHeight) {
        alert('Camera is still starting. Please wait a moment and try again.');
        return;
    }

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
        if (!blob) {
            alert('Could not capture the photo. Please try again.');
            return;
        }
        const file = new File([blob], `leaf-capture-${Date.now()}.jpg`, { type: 'image/jpeg' });
        loadImageFile(file);
    }, 'image/jpeg', 0.92);
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
    stopInAreaCamera();
    const img = document.getElementById('imagePreview');
    img.style.display = 'none';
    img.src = '';
    AppState.selectedFile = null;
    document.getElementById('cameraPlaceholder').style.display = 'flex';
    document.getElementById('uploadControls').classList.remove('hidden');
    document.getElementById('analyzeControls').classList.add('hidden');
    const chooseBtn = document.getElementById('choosePhotoBtn');
    if (chooseBtn) chooseBtn.style.display = '';
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

const MAX_PROFILE_SCAN_HISTORY = 12;
const DEFAULT_PROFILE_PHOTO = 'assets/images/profile-default.png';
let profileHistorySaveWarning = null;

function createScanThumbnail() {
    const image = document.getElementById('imagePreview');
    if (!image || !image.complete || !image.naturalWidth || !image.naturalHeight) return '';

    const scale = Math.min(1, 320 / Math.max(image.naturalWidth, image.naturalHeight));
    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
    canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
    const context = canvas.getContext('2d');
    if (!context) return '';
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL('image/jpeg', 0.68);
}

function getHistoryGuidance(guidance) {
    if (typeof guidance !== 'string' || !guidance.trim()) return '';
    try {
        const parsed = JSON.parse(guidance);
        const suggestions = ['recovery', 'prevention', 'organic', 'chemical']
            .map((key) => parsed[key])
            .find((items) => Array.isArray(items) && typeof items[0] === 'string');
        return suggestions ? suggestions[0].trim().slice(0, 180) : '';
    } catch (error) {
        return guidance.replace(/\s+/g, ' ').trim().slice(0, 180);
    }
}

function saveDiagnosticScan(data) {
    let phone = '';
    try {
        const user = JSON.parse(localStorage.getItem('agri_active_user') || 'null');
        if (!user || !user.phone) return;

        phone = String(user.phone);
        const key = `agri_scan_history_${phone}`;
        const stored = JSON.parse(localStorage.getItem(key) || '[]');
        if (!Array.isArray(stored)) throw new Error('Stored scan history is not a list.');

        const confidence = data.prediction_results.confidence == null
            ? NaN
            : Number(data.prediction_results.confidence);
        const hasMoisture = AppState.lastMoisture !== null && AppState.lastMoisture !== undefined && Number.isFinite(Number(AppState.lastMoisture));
        const moisture = hasMoisture ? Number(AppState.lastMoisture) : null;

        let parsedGuidance = null;
        try {
            parsedGuidance = typeof data.guidance === 'string' ? JSON.parse(data.guidance) : data.guidance;
        } catch (_) {}

        const record = {
            diagnosis: String(data.prediction_results.disease || 'Unknown'),
            confidence: Number.isFinite(confidence) ? confidence : null,
            moisture: moisture,
            guidance: getHistoryGuidance(data.guidance),
            guidanceDetails: parsedGuidance || null,
            createdAt: new Date().toISOString(),
            thumbnail: createScanThumbnail()
        };
        stored.unshift(record);
        localStorage.setItem(key, JSON.stringify(stored.slice(0, MAX_PROFILE_SCAN_HISTORY)));
        if (profileHistorySaveWarning && profileHistorySaveWarning.phone === phone) {
            profileHistorySaveWarning = null;
        }
    } catch (error) {
        console.error('Unable to save this scan to profile history:', error);
        profileHistorySaveWarning = {
            phone,
            message: 'The scan completed, but its history could not be saved on this device.'
        };
        const notice = document.getElementById('profileHistoryNotice');
        if (notice && phone) {
            notice.textContent = profileHistorySaveWarning.message;
            notice.classList.remove('hidden');
        }
    }
}

function renderProfileScanHistory(phone) {
    const list = document.getElementById('profileHistoryList');
    const count = document.getElementById('profileHistoryCount');
    const buttonCount = document.getElementById('profileHistoryButtonCount');
    const notice = document.getElementById('profileHistoryNotice');
    if (!list) return;

    list.textContent = '';
    if (notice) {
        const warning = profileHistorySaveWarning && profileHistorySaveWarning.phone === String(phone)
            ? profileHistorySaveWarning.message
            : '';
        notice.textContent = warning;
        notice.classList.toggle('hidden', !warning);
    }

    let history;
    try {
        history = JSON.parse(localStorage.getItem(`agri_scan_history_${phone}`) || '[]');
        if (!Array.isArray(history)) throw new Error('Stored scan history is not a list.');
    } catch (error) {
        console.error('Unable to read profile scan history:', error);
        history = null;
    }

    if (history === null) {
        if (count) count.textContent = 'Unavailable';
        if (buttonCount) buttonCount.textContent = '--';
        const errorState = document.createElement('div');
        errorState.className = 'profile-history-empty';
        errorState.textContent = 'Scan history could not be loaded from this device.';
        list.appendChild(errorState);
        return;
    }

    const records = history.slice(0, MAX_PROFILE_SCAN_HISTORY);
    if (count) count.textContent = `${records.length} ${records.length === 1 ? 'scan' : 'scans'}`;
    if (buttonCount) buttonCount.textContent = records.length;
    if (!records.length) {
        const emptyState = document.createElement('div');
        emptyState.className = 'profile-history-empty';
        emptyState.innerHTML = `
            <span class="profile-history-empty-icon" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M23 19a2 2 0 0 1-2-2V8a2 2 0 0 0-2-2h-4l-2-3H9L7 6H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2z"></path>
                    <circle cx="12" cy="13" r="3"></circle>
                </svg>
            </span>
            <strong>No scans saved yet</strong>
            <span>Successful leaf scans will appear here.</span>
        `;
        list.appendChild(emptyState);
        return;
    }

    const locale = { en: 'en-US', hi: 'hi-IN', kn: 'kn-IN' }[AppState.currentLang] || 'en-US';
    records.forEach((record) => {
        const item = document.createElement('article');
        item.className = 'profile-history-item';

        const thumbnail = document.createElement('div');
        thumbnail.className = 'profile-history-thumb';
        if (typeof record.thumbnail === 'string' && record.thumbnail.startsWith('data:image/')) {
            const image = document.createElement('img');
            image.src = record.thumbnail;
            image.alt = `Scanned crop: ${record.diagnosis || 'diagnosis'}`;
            image.loading = 'lazy';
            thumbnail.appendChild(image);
        } else {
            thumbnail.textContent = 'Leaf scan';
        }
        item.appendChild(thumbnail);

        const details = document.createElement('div');
        details.className = 'profile-history-details';
        const titleRow = document.createElement('div');
        titleRow.className = 'profile-history-title-row';

        const title = document.createElement('h4');
        title.textContent = String(record.diagnosis || 'Unknown diagnosis');
        titleRow.appendChild(title);

        const confidence = Number(record.confidence);
        if (record.confidence !== null && record.confidence !== undefined && Number.isFinite(confidence)) {
            const confidenceLabel = document.createElement('span');
            confidenceLabel.className = 'profile-history-confidence';
            confidenceLabel.textContent = `${confidence}%`;
            titleRow.appendChild(confidenceLabel);
        }
        details.appendChild(titleRow);

        const meta = document.createElement('p');
        meta.className = 'profile-history-meta';
        const date = new Date(record.createdAt);
        const dateLabel = Number.isNaN(date.getTime()) ? 'Date unavailable' : date.toLocaleString(locale);
        const moisture = Number(record.moisture);
        meta.textContent = record.moisture !== null && record.moisture !== undefined && Number.isFinite(moisture)
            ? `${dateLabel} · Moisture ${moisture.toFixed(2)}%`
            : `${dateLabel} · Moisture: Sensor Offline`;
        details.appendChild(meta);

        if (typeof record.guidance === 'string' && record.guidance) {
            const note = document.createElement('p');
            note.className = 'profile-history-note';
            note.textContent = record.guidance;
            details.appendChild(note);
        }

        item.appendChild(details);
        list.appendChild(item);
    });
}

function setProfileHistoryExpanded(expanded) {
    const button = document.getElementById('profileHistoryToggle');
    const panel = document.getElementById('profileHistoryPanel');
    const buttonText = document.getElementById('profileHistoryToggleText');
    if (!button || !panel) return;

    button.setAttribute('aria-expanded', String(expanded));
    panel.classList.toggle('hidden', !expanded);
    if (buttonText) {
        buttonText.textContent = expanded ? 'Hide scan history' : 'View your previous scans';
    }

    if (expanded) {
        const reduceMotion = window.matchMedia &&
            window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        panel.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'nearest' });
    }
}

function toggleProfileHistory() {
    const button = document.getElementById('profileHistoryToggle');
    if (!button) return;
    setProfileHistoryExpanded(button.getAttribute('aria-expanded') !== 'true');
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
            AppState.lastMoisture = (data.moisture !== null && data.moisture !== undefined && !isNaN(data.moisture))
                ? Number(data.moisture)
                : null;
            AppState.isSensorOnline = Boolean(data.is_sensor_online);

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

            saveDiagnosticScan(data);
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


async function generateSpecimenPdf() {
    const protocolCards = Array.from(document.querySelectorAll('#resultBody .advisory-grid > .advisory-card'));
    if (protocolCards.length !== 4) {
        throw new Error('The specimen report must contain all four treatment protocols.');
    }

    const protocols = protocolCards.map((card) => {
        const title = card.querySelector('h4')?.textContent.trim();
        const items = Array.from(card.querySelectorAll('li'))
            .map((item) => item.textContent.trim());
        if (!title || items.length === 0) {
            throw new Error('A treatment protocol is missing its heading or instructions.');
        }
        return { title, items };
    });

    const pageWidth = 1240;
    const pageHeight = 1754;
    const renderScale = 2;
    const canvas = document.createElement('canvas');
    canvas.width = pageWidth * renderScale;
    canvas.height = pageHeight * renderScale;
    const context = canvas.getContext('2d');
    if (!context) {
        throw new Error('This browser cannot create the specimen report PDF.');
    }
    context.scale(renderScale, renderScale);

    const textWidth = 440;
    const wrapText = (text, maxWidth = textWidth) => {
        const lines = [];
        text.split(/\r?\n/).forEach((paragraph) => {
            const words = paragraph.split(/\s+/).filter(Boolean);
            let line = '';
            words.forEach((word) => {
                const parts = [];
                let part = '';
                Array.from(word).forEach((character) => {
                    if (part && context.measureText(part + character).width > maxWidth) {
                        parts.push(part);
                        part = character;
                    } else {
                        part += character;
                    }
                });
                if (part) parts.push(part);

                parts.forEach((wordPart, index) => {
                    const candidate = line ? `${line} ${wordPart}` : wordPart;
                    if (line && context.measureText(candidate).width > maxWidth) {
                        lines.push(line);
                        line = wordPart;
                    } else {
                        line = candidate;
                    }
                    if (index < parts.length - 1) {
                        lines.push(line);
                        line = '';
                    }
                });
            });
            lines.push(line);
        });
        return lines;
    };

    const diagnosis = document.querySelector('#resultBody .result-name')?.textContent.trim() || 'Specimen Evaluation';
    const confidence = document.querySelector('#resultBody .result-confidence-badge')
        ?.textContent.trim().replace(/\s+Neural Confidence$/i, '') || '';
    context.font = 'bold 27px Arial, sans-serif';
    const diagnosisLines = wrapText(diagnosis, 610);
    const summaryHeight = Math.max(82, diagnosisLines.length * 26 + 40);
    const margin = 82;
    const gap = 28;
    const gridTop = 180 + summaryHeight + 20;
    const gridBottom = pageHeight - 105;
    const cellWidth = (pageWidth - margin * 2 - gap) / 2;
    const cellHeight = (gridBottom - gridTop - gap) / 2;
    const bodyStart = 138;
    const bodyBottomPadding = 24;
    const availableBodyHeight = cellHeight - bodyStart - bodyBottomPadding;
    let bodyFontSize;
    let bodyLineHeight;
    let itemGap;
    let protocolItems;
    for (const fontSize of [28, 26, 24, 22, 20, 18, 16, 15]) {
        context.font = `${fontSize}px Arial, sans-serif`;
        const wrappedItems = protocols.map((protocol) => protocol.items.map((item) => {
            const wrapped = wrapText(item);
            return wrapped.map((line, index) => index === 0 ? `• ${line}` : `  ${line}`);
        }));
        const lineHeight = fontSize * 1.22;
        const spacing = fontSize * 0.35;
        const fitsOnPage = wrappedItems.every((items) => {
            const requiredHeight = items.reduce((height, lines, index) => (
                height + lines.length * lineHeight + (index < items.length - 1 ? spacing : 0)
            ), 0);
            return requiredHeight <= availableBodyHeight;
        });
        if (fitsOnPage) {
            bodyFontSize = fontSize;
            bodyLineHeight = lineHeight;
            itemGap = spacing;
            protocolItems = wrappedItems;
            break;
        }
    }
    if (!protocolItems) {
        throw new Error('The treatment instructions are too long to fit on one readable page.');
    }

    const reportDate = new Date().toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });
    const protocolColors = ['#c17b16', '#43834e', '#347b9b', '#164e35'];
    const pageImages = [];

    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, pageWidth, pageHeight);
    context.fillStyle = '#164e35';
    context.fillRect(0, 0, pageWidth, 14);
    context.fillStyle = '#164e35';
    context.font = 'bold 30px Arial, sans-serif';
    context.fillText('AgriSense', margin, 66);
    context.fillStyle = '#52705e';
    context.font = 'bold 18px Arial, sans-serif';
    context.fillText('PRECISION AGRICULTURE', margin + 148, 64);
    context.fillStyle = '#68776e';
    context.font = '20px Arial, sans-serif';
    context.textAlign = 'right';
    context.fillText(`FIELD REPORT  •  ${reportDate}`, pageWidth - margin, 64);
    context.textAlign = 'left';

    context.fillStyle = '#173b2b';
    context.font = 'bold 48px Georgia, serif';
    context.fillText('Specimen Evaluation Report', margin, 124);
    context.fillStyle = '#52645a';
    context.font = '24px Arial, sans-serif';
    context.fillText('Crop health assessment and treatment guidance', margin, 158);
    context.fillStyle = '#f1f6f2';
    context.fillRect(margin, 180, pageWidth - margin * 2, summaryHeight);
    context.strokeStyle = '#d5e0d8';
    context.lineWidth = 2;
    context.strokeRect(margin, 180, pageWidth - margin * 2, summaryHeight);
    context.fillStyle = '#68776e';
    context.font = 'bold 17px Arial, sans-serif';
    context.fillText('SPECIMEN', margin + 20, 208);
    context.fillStyle = '#173b2b';
    context.font = 'bold 27px Arial, sans-serif';
    diagnosisLines.forEach((line, index) => {
        context.fillText(line, margin + 20, 232 + index * 26);
    });
    context.fillStyle = '#68776e';
    context.font = 'bold 17px Arial, sans-serif';
    context.fillText('NEURAL CONFIDENCE', margin + 700, 208);
    context.fillStyle = '#164e35';
    context.font = 'bold 26px Arial, sans-serif';
    context.fillText(confidence || 'Not available', margin + 700, 240);

    protocols.forEach((protocol, index) => {
        const column = index % 2;
        const row = Math.floor(index / 2);
        const x = margin + column * (cellWidth + gap);
        const y = gridTop + row * (cellHeight + gap);
        const padding = 28;
        const accent = protocolColors[index];

        context.fillStyle = '#ffffff';
        context.strokeStyle = '#d2ded5';
        context.lineWidth = 2;
        context.fillRect(x, y, cellWidth, cellHeight);
        context.strokeRect(x, y, cellWidth, cellHeight);
        context.fillStyle = accent;
        context.fillRect(x + 2, y + 2, cellWidth - 4, 9);
        context.fillStyle = '#f3f7f4';
        context.fillRect(x + 2, y + 11, cellWidth - 4, 82);
        context.fillStyle = accent;
        context.font = 'bold 18px Arial, sans-serif';
        context.fillText(String(index + 1).padStart(2, '0'), x + padding, y + 47);
        context.fillStyle = '#173b2b';
        context.font = 'bold 28px Arial, sans-serif';
        const titleLines = wrapText(protocol.title, cellWidth - padding * 2 - 48);
        titleLines.slice(0, 2).forEach((line, titleLine) => {
            context.fillText(line, x + padding + 42, y + 42 + titleLine * 32);
        });
        context.strokeStyle = '#e0e8e2';
        context.lineWidth = 2;
        context.beginPath();
        context.moveTo(x + padding, y + 92);
        context.lineTo(x + cellWidth - padding, y + 92);
        context.stroke();

        context.fillStyle = '#26352c';
        context.font = `${bodyFontSize}px Arial, sans-serif`;
        let textY = y + bodyStart;
        protocolItems[index].forEach((itemLines, itemIndex) => {
            itemLines.forEach((line) => {
                context.fillText(line, x + padding, textY);
                textY += bodyLineHeight;
            });
            if (itemIndex < protocolItems[index].length - 1) textY += itemGap;
        });
    });

    context.strokeStyle = '#d5e0d8';
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(margin, pageHeight - 74);
    context.lineTo(pageWidth - margin, pageHeight - 74);
    context.stroke();
    context.fillStyle = '#68776e';
    context.font = '19px Arial, sans-serif';
    context.fillText('AgriSense AI  •  Specimen report', margin, pageHeight - 42);
    context.textAlign = 'right';
    context.fillText('Page 1', pageWidth - margin, pageHeight - 42);
    context.textAlign = 'left';

    const jpeg = await new Promise((resolve, reject) => {
        canvas.toBlob((blob) => {
            if (blob) resolve(blob);
            else reject(new Error('The browser could not render the PDF page.'));
        }, 'image/jpeg', 0.94);
    });
    const bytes = new Uint8Array(await jpeg.arrayBuffer());
    let binary = '';
    for (let offset = 0; offset < bytes.length; offset += 0x8000) {
        binary += String.fromCharCode(...bytes.subarray(offset, offset + 0x8000));
    }
    pageImages.push(binary);

    const objects = [
        '<< /Type /Catalog /Pages 2 0 R >>',
        `<< /Type /Pages /Kids [${pageImages.map((_, index) => `${3 + index * 3} 0 R`).join(' ')}] /Count ${pageImages.length} >>`
    ];
    pageImages.forEach((image, index) => {
        const pageObject = 3 + index * 3;
        const imageObject = pageObject + 1;
        const contentObject = pageObject + 2;
        const content = 'q\n595.28 0 0 841.89 0 0 cm\n/Im0 Do\nQ\n';
        objects.push(
            `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595.28 841.89] /Resources << /XObject << /Im0 ${imageObject} 0 R >> >> /Contents ${contentObject} 0 R >>`,
            `<< /Type /XObject /Subtype /Image /Width ${canvas.width} /Height ${canvas.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${image.length} >>\nstream\n${image}\nendstream`,
            `<< /Length ${content.length} >>\nstream\n${content}endstream`
        );
    });

    let pdf = '%PDF-1.4\n';
    const offsets = [0];
    objects.forEach((object, index) => {
        offsets.push(pdf.length);
        pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
    });
    const xrefOffset = pdf.length;
    pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
    offsets.slice(1).forEach((offset) => {
        pdf += `${String(offset).padStart(10, '0')} 00000 n \n`;
    });
    pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;

    const pdfBytes = new Uint8Array(pdf.length);
    for (let index = 0; index < pdf.length; index += 1) {
        pdfBytes[index] = pdf.charCodeAt(index);
    }
    return new File([pdfBytes], 'AgriSense_Specimen_Report.pdf', { type: 'application/pdf' });
}

function downloadSpecimenPdfFile(file) {
    const url = URL.createObjectURL(file);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'AgriSense_Specimen_Report.pdf';
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

async function handleSpecimenPdfAction(action) {
    const buttons = Array.from(document.querySelectorAll('.specimen-pdf-actions button'));
    buttons.forEach((item) => { item.disabled = true; });
    try {
        const file = await generateSpecimenPdf();
        if (action === 'download') {
            downloadSpecimenPdfFile(file);
            return;
        }

        let canShareFile = false;
        if (typeof navigator.share === 'function' && typeof navigator.canShare === 'function') {
            try {
                canShareFile = navigator.canShare({ files: [file] });
            } catch (error) {
                canShareFile = false;
            }
        }
        if (!canShareFile) {
            downloadSpecimenPdfFile(file);
            alert('Native PDF sharing is unavailable. The report has been downloaded instead.');
            return;
        }

        try {
            await navigator.share({
                files: [file],
                title: 'AgriSense Specimen Report',
                text: 'AgriSense specimen evaluation report'
            });
        } catch (error) {
            if (error.name === 'AbortError') return;
            downloadSpecimenPdfFile(file);
            alert('Native PDF sharing failed. The report has been downloaded instead.');
        }
    } catch (error) {
        if (error.name !== 'AbortError') {
            console.error('Unable to generate or share the specimen PDF:', error);
            alert('The specimen PDF could not be generated or shared. Please try again.');
        }
    } finally {
        buttons.forEach((item) => { item.disabled = false; });
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
    const pdfActionsHtml = advisoryHtml.includes('class="advisory-card')
        ? `<div class="specimen-pdf-actions" aria-label="Specimen report actions">
            <button type="button" class="btn-primary" onclick="handleSpecimenPdfAction('download')">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                <span>Download PDF</span>
            </button>
            <button type="button" class="btn-secondary" onclick="handleSpecimenPdfAction('share')">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <circle cx="18" cy="5" r="3"></circle>
                    <circle cx="6" cy="12" r="3"></circle>
                    <circle cx="18" cy="19" r="3"></circle>
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                </svg>
                <span>Share PDF</span>
            </button>
        </div>`
        : '';

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
        
        ${pdfActionsHtml}
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
                    <span class="metric-val" style="color:${AppState.lastMoisture !== null ? 'var(--accent-sky)' : 'var(--n-500)'}">${AppState.lastMoisture !== null ? AppState.lastMoisture.toFixed(2) + '%' : 'Sensor Offline (--%)'}</span>
                </div>
                <div class="metric-bar-track">
                    <div class="metric-bar-fill" style="width:${AppState.lastMoisture !== null ? AppState.lastMoisture : 0}%; background:${AppState.lastMoisture !== null ? 'var(--accent-sky)' : 'var(--n-300)'}"></div>
                </div>
            </div>
        </div>

        <h3 class="section-subheading">Agronomic Treatment Protocol</h3>
        ${advisoryHtml}

        <div class="result-actions-strip">
            <button class="btn-primary" onclick="openShopForDiagnosis('${(disease || '').replace(/'/g, "\\'")}', '${conf || 85}', '${type || 'disease'}')" style="display:inline-flex;align-items:center;gap:0.5rem;background:#059669;border-color:#059669;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
                <span>Browse Prescribed Products in Store</span>
            </button>
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
        const langName = lang === 'hi' ? 'Hindi (हिन्दी)' : lang === 'kn' ? 'Kannada (ಕನ್ನಡ)' : 'English';
        chatHistory[0].content = `You are AgriBot, the context-aware RAG agronomic farming assistant embedded in AgriSense AI. 
        
Your mission is to provide definitive, personalized, high-accuracy answers to ANY agricultural question.
You have direct access to this farmer's retrieved knowledge base, past leaf scans, detected plant diseases, soil moisture telemetry, and prescription histories.

Rules:
1. PERSONALIZED RAG MEMORY: Seamlessly remember and reference the farmer's past diagnoses and treatments when they ask follow-up questions. Do not ask them to repeat information already available in their farm records.
2. AUTHORITY & SIMPLICITY: Speak with the confidence of an expert agronomist, but keep advice simple, empathetic, and farmer-friendly.
3. ACCURACY & NO HALLUCINATION: If reliable information is unavailable, state it clearly. Never invent chemical dosages without verified standards.
4. STRUCTURE: Use clear formatting with bullet points and bold headers for recovery, organic solutions, chemical fungicides, and prevention.
5. STRICT LANGUAGE MANDATE: You MUST ALWAYS respond entirely in ${langName}. Regardless of what language the farmer typed in, your full response must be in ${langName}.
6. DOMAIN LIMITS: STRICTLY DECLINE non-agricultural topics (coding, general entertainment). You are solely dedicated to crop health, farming, and agronomy.`;
    }
}

const CHAT_ICON_SVG = '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v2"></path><circle cx="12" cy="2.5" r=".5" fill="#fff"></circle><rect x="4" y="6" width="16" height="14" rx="4"></rect><path d="M2 11v4M22 11v4M9 16h6"></path><circle cx="9" cy="11.5" r="1" fill="#fff" stroke="none"></circle><circle cx="15" cy="11.5" r="1" fill="#fff" stroke="none"></circle></svg>';
const CHAT_CLOSE_SVG = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';

let chatOpen = false;
let chatIsLoading = false;
let chatHideTimer = null;
let chatLockedScrollY = null;
let chatMorphAnimation = null;
const CHAT_MORPH_DURATION = 560;
const CHAT_MOBILE_DURATION = 200;

function lockChatBackground() {
    if (!window.matchMedia('(max-width: 768px)').matches || chatLockedScrollY !== null) return;
    chatLockedScrollY = window.scrollY;
    document.documentElement.classList.add('chat-scroll-lock');
    document.body.classList.add('chat-scroll-lock');
}

function unlockChatBackground() {
    if (chatLockedScrollY === null) return;
    const scrollY = chatLockedScrollY;
    chatLockedScrollY = null;
    document.documentElement.classList.remove('chat-scroll-lock');
    document.body.classList.remove('chat-scroll-lock');
    window.scrollTo(0, scrollY);
}

function morphChatWidget(widget, expanding, onComplete) {
    const currentTransform = getComputedStyle(widget).transform;
    const currentRadius = getComputedStyle(widget).borderRadius;
    const wasExpanded = widget.classList.contains('chat-expanded');

    if (chatMorphAnimation) {
        widget.style.transform = currentTransform;
        widget.style.borderRadius = currentRadius;
        chatMorphAnimation.cancel();
        chatMorphAnimation = null;
    }

    widget.classList.add('chat-expanded');
    const width = widget.offsetWidth;
    const height = widget.offsetHeight;
    const button = document.getElementById('chatToggleBtn');
    const collapsedWidth = button ? button.offsetWidth : 52;
    const collapsedHeight = button ? button.offsetHeight : 52;
    const collapsedTransform = `scale(${collapsedWidth / width}, ${collapsedHeight / height})`;
    const fromTransform = expanding
        ? (wasExpanded && currentTransform !== 'none' ? currentTransform : collapsedTransform)
        : (currentTransform === 'none' ? 'scale(1, 1)' : currentTransform);
    const toTransform = expanding ? 'scale(1, 1)' : collapsedTransform;
    const fromRadius = expanding ? (wasExpanded ? currentRadius : '50%') : currentRadius;
    const toRadius = expanding ? getComputedStyle(widget).borderRadius : '50%';

    if (typeof widget.animate !== 'function') {
        if (!expanding) widget.classList.remove('chat-expanded');
        widget.style.transform = '';
        widget.style.borderRadius = '';
        onComplete();
        return;
    }

    const animation = widget.animate(
        [
            { transform: fromTransform, borderRadius: fromRadius },
            { transform: toTransform, borderRadius: toRadius }
        ],
        {
            duration: CHAT_MORPH_DURATION,
            easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
            fill: 'forwards'
        }
    );
    chatMorphAnimation = animation;
    animation.onfinish = () => {
        if (chatMorphAnimation !== animation) return;
        chatMorphAnimation = null;
        animation.cancel();
        widget.style.transform = '';
        widget.style.borderRadius = '';
        if (!expanding) widget.classList.remove('chat-expanded');
        onComplete();
    };
}

function syncChatViewport() {
    const visualViewport = window.visualViewport;
    const visibleHeight = visualViewport ? visualViewport.height : window.innerHeight;
    const keyboardInset = visualViewport
        ? Math.max(0, window.innerHeight - visualViewport.offsetTop - visualViewport.height)
        : 0;

    document.documentElement.style.setProperty('--chat-visible-height', `${visibleHeight}px`);
    document.documentElement.style.setProperty('--chat-keyboard-inset', `${keyboardInset}px`);
}

syncChatViewport();
window.addEventListener('resize', syncChatViewport, { passive: true });
if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', syncChatViewport, { passive: true });
    window.visualViewport.addEventListener('scroll', syncChatViewport, { passive: true });
}

function toggleChatbot() {
    const panel = document.getElementById('chatPanel');
    const btn = document.getElementById('chatToggleBtn');
    const widget = document.getElementById('chatbotWidget');

    if (!panel) return;
    chatOpen = !chatOpen;

    if (chatOpen) {
        clearTimeout(chatHideTimer);
        panel.style.display = 'flex';
        panel.classList.remove('chat-open');
        panel.classList.add('chat-hidden');
        if (widget) {
            if (window.matchMedia('(max-width: 768px)').matches) {
                widget.classList.add('chat-expanded');
            } else {
                morphChatWidget(widget, true, () => {});
            }
        }
        panel.classList.remove('chat-hidden');
        panel.classList.add('chat-open');
        lockChatBackground();
        if (btn) {
            btn.innerHTML = CHAT_CLOSE_SVG;
            btn.setAttribute('aria-expanded', 'true');
            btn.setAttribute('aria-label', 'Close Chat');
            btn.setAttribute('title', 'Close Consultation');
        }
        const input = document.getElementById('chatInput');
        if (input) {
            if (window.matchMedia('(max-width: 768px)').matches) input.blur();
            else input.focus({ preventScroll: true });
        }
        // ensure latest messages visible
        const container = document.getElementById('chatMessages');
        if (container) container.scrollTop = container.scrollHeight;
    } else {
        panel.classList.remove('chat-open');
        panel.classList.add('chat-hidden');
        const finishClose = () => {
            if (!chatOpen) {
                if (widget && window.matchMedia('(max-width: 768px)').matches) {
                    widget.classList.remove('chat-expanded');
                }
                panel.style.display = 'none';
                unlockChatBackground();
            }
        };
        if (widget && !window.matchMedia('(max-width: 768px)').matches) {
            morphChatWidget(widget, false, finishClose);
        }
        else chatHideTimer = setTimeout(
            finishClose,
            window.matchMedia('(max-width: 768px)').matches ? CHAT_MOBILE_DURATION : CHAT_MORPH_DURATION
        );
        if (btn) {
            btn.innerHTML = CHAT_ICON_SVG;
            btn.setAttribute('aria-expanded', 'false');
            btn.setAttribute('aria-label', 'Open Chat');
            btn.setAttribute('title', 'Open Agronomic Consultation');
        }
    }
}

function getCurrentUserPhone() {
    try {
        const user = JSON.parse(localStorage.getItem('agri_active_user') || 'null');
        if (user && user.phone) return String(user.phone);
    } catch (_) {}
    return 'guest';
}

function getUserKnowledgeContext() {
    const phone = getCurrentUserPhone();
    let user = null;
    try {
        user = JSON.parse(localStorage.getItem('agri_active_user') || 'null');
    } catch (_) {}
    let scans = [];
    try {
        scans = JSON.parse(localStorage.getItem(`agri_scan_history_${phone}`) || '[]');
    } catch (_) {}

    const formattedScans = Array.isArray(scans) ? scans.slice(0, 10).map(s => ({
        diagnosis: s.diagnosis || 'Unknown',
        confidence: s.confidence,
        moisture: s.moisture,
        createdAt: s.createdAt,
        guidance: s.guidanceDetails || s.guidance || ''
    })) : [];

    return {
        profile: user ? {
            name: user.name || 'Farmer',
            phone: user.phone,
            location: user.location || user.farmLocation || 'Karnataka, India',
            crops: user.crops || user.preferredCrops || []
        } : null,
        scans: formattedScans
    };
}

function saveUserChatHistory() {
    try {
        const phone = getCurrentUserPhone();
        const nonSystem = (chatHistory || []).filter(m => m.role !== 'system');
        localStorage.setItem(`agri_chat_history_${phone}`, JSON.stringify(nonSystem.slice(-20)));
    } catch (_) {}
}

function loadUserChatHistory() {
    try {
        const phone = getCurrentUserPhone();
        const stored = JSON.parse(localStorage.getItem(`agri_chat_history_${phone}`) || '[]');
        if (Array.isArray(stored) && stored.length > 0) {
            chatHistory = [chatHistory[0], ...stored];
            const container = document.getElementById('chatMessages');
            if (container) {
                container.innerHTML = '';
                stored.forEach(msg => {
                    appendChatMsg(msg.content, msg.role === 'user' ? 'user' : 'bot');
                });
                const sugg = document.getElementById('chatSuggestions');
                if (sugg) sugg.style.display = 'none';
            }
        }
    } catch (_) {}
}

// Start hidden properly & restore conversation history
document.addEventListener('DOMContentLoaded', () => {
    const panel = document.getElementById('chatPanel');
    if (panel) {
        panel.classList.add('chat-hidden');
        panel.style.display = 'none';
    }
    loadUserChatHistory();
});

function clearChat() {
    // Reset conversation history (keep only system prompt)
    if (typeof chatHistory !== 'undefined' && chatHistory.length > 0) {
        chatHistory = [chatHistory[0]];
    }
    const phone = getCurrentUserPhone();
    try {
        localStorage.removeItem(`agri_chat_history_${phone}`);
    } catch (_) {}

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
    saveUserChatHistory();

    // Show animated typing dots
    const typingId = appendTypingIndicator();

    try {
        let reply;
        if (!navigator.onLine) {
            // OFFLINE: use context-aware local knowledge
            reply = getLocalFallback(msg);
        } else {
            reply = await callGroqAPI(chatHistory);
        }

        // Add AI reply to history
        chatHistory.push({ role: 'assistant', content: reply });
        saveUserChatHistory();

        removeTypingIndicator(typingId);
        appendChatMsg(reply, 'bot');
    } catch (err) {
        console.error('Chat error:', err);
        removeTypingIndicator(typingId);
        // Try local knowledge first, show a proper error if not found
        const localReply = getLocalFallback(msg, true);
        chatHistory.push({ role: 'assistant', content: localReply });
        saveUserChatHistory();
        appendChatMsg(localReply, 'bot');
    }

    chatIsLoading = false;
}

async function callGroqAPI(messages) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 25000); // 25s timeout

    try {
        const plainLangName = AppState.currentLang === 'hi' ? 'Hindi' : AppState.currentLang === 'kn' ? 'Kannada' : 'English';
        const userContext = getUserKnowledgeContext();

        // Call our own Flask backend with RAG user_context and language
        const response = await fetch(`${API_BASE}/chat`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                messages,
                language: plainLangName,
                user_context: userContext
            }),
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
        if (err.name === 'AbortError') throw new Error('Request timed out after 25s');
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
        div.className = 'chat-msg user user-msg';
        div.style.cssText = 'background:linear-gradient(135deg, #1b6e46, #155e37); color:#ffffff; border-radius:18px 18px 4px 18px; padding:10px 14px; font-size:0.875rem; max-width:85%; align-self:flex-end; box-shadow:0 2px 8px rgba(27, 110, 70, 0.22); word-break:break-word;';
        div.textContent = text;
    } else {
        div.className = 'chat-msg ai-msg markdown-body';
        div.style.cssText = 'background:#ffffff; color:#1e293b; border:1px solid rgba(22, 78, 53, 0.12); border-radius:18px 18px 18px 4px; padding:11px 15px; font-size:0.875rem; max-width:88%; align-self:flex-start; box-shadow:0 2px 8px rgba(10, 35, 20, 0.05); line-height:1.55; word-break:break-word;';
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

/* --- Context-Aware Multilingual Offline Fallback (when no internet or rate-limited) --- */
function getLocalFallback(q, isApiError = false) {
    const lower = q.toLowerCase();
    const lang = AppState.currentLang || 'en';
    const userCtx = getUserKnowledgeContext();
    const latestScan = userCtx && userCtx.scans && userCtx.scans[0];

    // Check if query is asking about previous scan, crop health, or treatment follow-up
    const isFollowUp = latestScan && (
        lower.includes('my plant') || lower.includes('my crop') || lower.includes('disease') ||
        lower.includes('treatment') || lower.includes('spray') || lower.includes('cure') ||
        lower.includes('cured') || lower.includes('scan') || lower.includes('medicine') ||
        lower.includes(String(latestScan.diagnosis).toLowerCase())
    );

    if (isFollowUp) {
        const diag = latestScan.diagnosis;
        const details = latestScan.guidance && typeof latestScan.guidance === 'object' ? latestScan.guidance : null;
        const recStr = details && details.recovery ? (Array.isArray(details.recovery) ? details.recovery[0] : details.recovery) : 'Prune infected leaves safely.';
        const orgStr = details && details.organic ? (Array.isArray(details.organic) ? details.organic[0] : details.organic) : 'Apply cold-pressed neem oil (5ml/L).';
        const chemStr = details && details.chemical ? (Array.isArray(details.chemical) ? details.chemical[0] : details.chemical) : 'Apply copper oxychloride early morning.';
        const prevStr = details && details.prevention ? (Array.isArray(details.prevention) ? details.prevention[0] : details.prevention) : 'Ensure good airflow and avoid wetting leaves.';

        if (lang === 'kn') {
            return `ನಿಮ್ಮ ಇತ್ತೀಚಿನ ಸ್ಕ್ಯಾನ್ ಆಧಾರದ ಮೇಲೆ (${diag}):\n• **ತಕ್ಷಣದ ಕ್ರಮ**: ${recStr}\n• **ಜೈವಿಕ ಪರಿಹಾರ**: ${orgStr}\n• **ರಾಸಾಯನಿಕ ರಕ್ಷಣೆ**: ${chemStr}\n• **ಮುನ್ನೆಚ್ಚರಿಕೆ ಕ್ರಮ**: ${prevStr}`;
        } else if (lang === 'hi') {
            return `आपकी हालिया जांच (${diag}) के आधार पर:\n• **तत्काल उपाय**: ${recStr}\n• **जैविक समाधान**: ${orgStr}\n• **रासायनिक सुरक्षा**: ${chemStr}\n• **भविष्य की रोकथाम**: ${prevStr}`;
        } else {
            return `Based on your recent scan for ${diag}:\n• **Immediate Action**: ${recStr}\n• **Organic Solution**: ${orgStr}\n• **Chemical Protection**: ${chemStr}\n• **Preventive Care**: ${prevStr}`;
        }
    }

    // Match known disease
    for (const [disease, info] of Object.entries(LOCAL_ADVISORY)) {
        if (lower.includes(disease.toLowerCase())) {
            if (lang === 'kn') {
                return `${disease} ನಿರ್ವಹಣಾ ಮಾರ್ಗದರ್ಶಿ:\n• ತಕ್ಷಣದ ಚಿಕಿತ್ಸೆ: ${info.recovery}\n• ಜೈವಿಕ ನಿಯಂತ್ರಣ: ${info.organic}\n• ರಾಸಾಯನಿಕ ಶಿಲೀಂಧ್ರನಾಶಕ: ${info.chemical}\n• ಕೃಷಿ ಮುನ್ನೆಚ್ಚರಿಕೆ: ${info.prevention}`;
            } else if (lang === 'hi') {
                return `${disease} प्रबंधन मार्गदर्शिका:\n• त्वरित उपचार: ${info.recovery}\n• जैविक नियंत्रण: ${info.organic}\n• रासायनिक सुरक्षा: ${info.chemical}\n• रोकथाम: ${info.prevention}`;
            } else {
                return `${disease} Management:\n• Immediate Recovery: ${info.recovery}\n• Biological & Organic: ${info.organic}\n• Chemical Therapeutics: ${info.chemical}\n• Cultural Prevention: ${info.prevention}`;
            }
        }
    }

    if (lang === 'kn') {
        if (lower.includes('organic') || lower.includes('pest') || lower.includes('ಜೈವಿಕ') || lower.includes('ಕೀಟ')) {
            return 'ಜೈವಿಕ ಕೀಟ ನಿರ್ವಹಣೆ: ಶುದ್ಧ ಬೇವಿನ ಎಣ್ಣೆ (0.5%), ಹಳದಿ ಅಂಟು ಬಲೆಗಳು ಮತ್ತು ಟ್ರೈಕೋಡರ್ಮಾ ಜೈವಿಕ ನಿಯಂತ್ರಕಗಳನ್ನು ಬಳಸಿ.';
        }
        if (lower.includes('fertilizer') || lower.includes('ಗೊಬ್ಬರ') || lower.includes('npk')) {
            return 'NPK ಸಮತೋಲನ ಮಾರ್ಗಸೂಚಿ:\n• N (ಸಾರಜನಕ): ಸಸ್ಯದ ಹಸಿರು ಬೆಳವಣಿಗೆಗೆ\n• P (ರಂಜಕ): ಬೇರುಗಳ ಬಲವರ್ಧನೆ ಮತ್ತು ಹೂವು ಬಿಡಲು\n• K (ಪೊಟ್ಯಾಶ್): ರೋಗ ನಿರೋಧಕತೆ ಮತ್ತು ಗುಣಮಟ್ಟದ ಇಳುವರಿಗೆ';
        }
        if (lower.match(/^(hi|hello|hey|namaste|ನಮಸ್ಕಾರ)/)) {
            return 'ನಮಸ್ಕಾರ! AgriSense ಕೃಷಿ ಸಹಾಯಕ್ಕೆ ಸ್ವಾಗತ. ನಿಮ್ಮ ಬೆಳೆ ರಕ್ಷಣೆ, ರೋಗ ಪತ್ತೆ ಅಥವಾ ಹೊಲದ ನಿರ್ವಹಣೆ ಕುರಿತು ಯಾವುದೇ ಪ್ರಶ್ನೆ ಕೇಳಿ.';
        }
        return 'ದಯವಿಟ್ಟು ನಿಮ್ಮ ಕೃಷಿ ಪ್ರಶ್ನೆಯನ್ನು ಕೇಳಿ. ಉದಾಹರಣೆಗೆ:\n• "ಟೊಮೆಟೊ ಎಲೆ ಸುರುಟು ರೋಗಕ್ಕೆ ಮದ್ದು ಏನು?"\n• "ನನ್ನ ಗಿಡದ ಸ್ಕ್ಯಾನ್ ಬಗ್ಗೆ ಮುಂದಿನ ಕ್ರಮವೇನು?"';
    }

    if (lang === 'hi') {
        if (lower.includes('organic') || lower.includes('pest') || lower.includes('जैविक') || lower.includes('कीट')) {
            return 'जैविक कीट प्रबंधन: कोल्ड-प्रेस नीम का तेल (0.5%), ट्राइकोडर्मा और पीले चिपचिपे जाल का उपयोग करें।';
        }
        if (lower.includes('fertilizer') || lower.includes('खाद') || lower.includes('npk')) {
            return 'NPK पोषक तत्व संतुलन:\n• N (नाइट्रोजन): पत्तियों और वानस्पतिक वृद्धि के लिए\n• P (फास्फोरस): जड़ों के विकास और फूलों के लिए\n• K (पोटेशियम): फल की गुणवत्ता और रोग प्रतिरोधक क्षमता के लिए';
        }
        if (lower.match(/^(hi|hello|hey|namaste|नमस्ते)/)) {
            return 'नमस्ते! AgriSense कृषि सहायक में आपका स्वागत है। आप फसल रोग, रासायनिक मात्रा या खेती प्रबंधन के बारे में पूछ सकते हैं।';
        }
        return 'कृपया अपना कृषि संबंधी प्रश्न पूछें। जैसे:\n• "टमाटर में झुलसा रोग का उपचार क्या है?"\n• "मेरी पिछली जांच के बाद क्या करना चाहिए?"';
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

let gaugeTiltEnabled = false;
let gaugeTiltPermissionGranted = false;
let gaugeMotionPermissionGranted = false;
let gaugeTiltBaseline = null;
let gaugeShakeBaseline = null;
let gaugeTiltFrame = null;
let gaugeTiltEventTimer = null;
let gaugeTiltHasSensorData = false;
let gaugeTiltShake = null;
let gaugeTiltTarget = { angle: 0, x: 0, y: 0 };
let gaugeTiltCurrent = { angle: 0, x: 0, y: 0 };

function startIoTMonioting() {
    IoTHistory = [];
    fetchIoTData();
    if (AppState.iotInterval) clearInterval(AppState.iotInterval);
    AppState.iotInterval = setInterval(fetchIoTData, 20000);
    if (!IoTWeatherLoaded) fetchIoTWeather();
    initializeGaugeTilt();
}

function stopIoTMonioting() {
    if (AppState.iotInterval) {
        clearInterval(AppState.iotInterval);
        AppState.iotInterval = null;
    }
    stopGaugeTilt();
}

function initializeGaugeTilt() {
    if (!window.isSecureContext || !window.DeviceOrientationEvent) {
        return;
    }

    const orientationNeedsPermission =
        typeof window.DeviceOrientationEvent.requestPermission === 'function' && !gaugeTiltPermissionGranted;
    const motionNeedsPermission =
        window.DeviceMotionEvent &&
        typeof window.DeviceMotionEvent.requestPermission === 'function' &&
        !gaugeMotionPermissionGranted;
    const permissionRequests = [];

    try {
        if (orientationNeedsPermission) {
            permissionRequests.push(window.DeviceOrientationEvent.requestPermission().then(permission => {
                gaugeTiltPermissionGranted = permission === 'granted';
                return permission;
            }).catch(error => {
                console.error('Phone orientation permission error:', error);
                return 'denied';
            }));
        }
        if (motionNeedsPermission) {
            permissionRequests.push(window.DeviceMotionEvent.requestPermission().then(permission => {
                gaugeMotionPermissionGranted = permission === 'granted';
                return permission;
            }).catch(error => {
                console.error('Phone motion permission error:', error);
                return 'denied';
            }));
        }
    } catch (error) {
        console.error('Phone motion permission error:', error);
        return;
    }

    if (permissionRequests.length > 0) {
        Promise.all(permissionRequests).then(() => {
            if (orientationNeedsPermission && !gaugeTiltPermissionGranted) {
                return;
            }
            startGaugeTilt();
        }).catch(error => {
            console.error('Phone motion permission error:', error);
            if (!orientationNeedsPermission) {
                startGaugeTilt();
            }
        });
        return;
    }

    startGaugeTilt();
}

function startGaugeTilt() {
    if (gaugeTiltEnabled || AppState.currentScreen !== 'screenIoT') return;
    gaugeTiltEnabled = true;
    gaugeTiltBaseline = null;
    gaugeShakeBaseline = null;
    gaugeTiltShake = null;
    gaugeTiltHasSensorData = false;
    window.addEventListener('deviceorientation', handleGaugeTilt, true);
    if (window.DeviceMotionEvent) {
        window.addEventListener('devicemotion', handleGaugeShake, true);
    }
    document.getElementById('moistureGaugeTrack')?.classList.add('tilt-active');
}

function stopGaugeTilt() {
    if (gaugeTiltEnabled) {
        window.removeEventListener('deviceorientation', handleGaugeTilt, true);
        window.removeEventListener('devicemotion', handleGaugeShake, true);
        gaugeTiltEnabled = false;
    }
    if (gaugeTiltEventTimer !== null) {
        clearTimeout(gaugeTiltEventTimer);
        gaugeTiltEventTimer = null;
    }
    gaugeTiltBaseline = null;
    gaugeShakeBaseline = null;
    gaugeTiltHasSensorData = false;
    gaugeTiltShake = null;
    if (gaugeTiltFrame !== null) {
        cancelAnimationFrame(gaugeTiltFrame);
        gaugeTiltFrame = null;
    }

    gaugeTiltTarget = { angle: 0, x: 0, y: 0 };
    gaugeTiltCurrent = { angle: 0, x: 0, y: 0 };
    const waterFill = document.getElementById('moistureWaterFill');
    document.getElementById('moistureGaugeTrack')?.classList.remove('tilt-active');
    if (waterFill) {
        waterFill.style.setProperty('--water-tilt-angle', '0deg');
        waterFill.style.setProperty('--water-tilt-x', '0px');
        waterFill.style.setProperty('--water-tilt-y', '0px');
    }
}

function handleGaugeTilt(event) {
    if (!gaugeTiltEnabled || AppState.currentScreen !== 'screenIoT' ||
        !Number.isFinite(event.beta) || !Number.isFinite(event.gamma)) return;

    markGaugeSensorData();

    if (!gaugeTiltBaseline) {
        gaugeTiltBaseline = { beta: event.beta, gamma: event.gamma };
        return;
    }

    const normalizeDelta = (value) => ((value + 180) % 360 + 360) % 360 - 180;
    const deltaBeta = normalizeDelta(event.beta - gaugeTiltBaseline.beta);
    const deltaGamma = normalizeDelta(event.gamma - gaugeTiltBaseline.gamma);
    const screenAngle = ((screen.orientation?.angle ?? window.orientation ?? 0) % 360 + 360) % 360;
    let roll = deltaGamma;
    let pitch = deltaBeta;

    if (screenAngle === 90) {
        roll = deltaBeta;
        pitch = -deltaGamma;
    } else if (screenAngle === 180) {
        roll = -deltaGamma;
        pitch = -deltaBeta;
    } else if (screenAngle === 270) {
        roll = -deltaBeta;
        pitch = deltaGamma;
    }

    const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
    gaugeTiltTarget = {
        angle: clamp(-roll * 1.15 + pitch * 0.55, -34, 34),
        x: clamp(roll * 0.5, -14, 14),
        y: clamp(-pitch * 0.28, -10, 10)
    };

    queueGaugeTiltFrame();
}

function handleGaugeShake(event) {
    if (!gaugeTiltEnabled || AppState.currentScreen !== 'screenIoT') return;

    markGaugeSensorData();
    let intensity = 0;
    let direction = 1;
    const acceleration = event.acceleration;
    if (acceleration && [acceleration.x, acceleration.y, acceleration.z].every(Number.isFinite)) {
        const magnitude = Math.hypot(acceleration.x, acceleration.y, acceleration.z);
        if (magnitude < 5.5) return;
        const primaryAxis = Math.abs(acceleration.x) > Math.abs(acceleration.y)
            ? acceleration.x
            : acceleration.y;
        direction = primaryAxis < 0 ? -1 : 1;
        intensity = Math.min(24, (magnitude - 5.5) * 2.2);
    } else {
        const gravity = event.accelerationIncludingGravity;
        if (!gravity || ![gravity.x, gravity.y, gravity.z].every(Number.isFinite)) return;
        if (!gaugeShakeBaseline) {
            gaugeShakeBaseline = { x: gravity.x, y: gravity.y, z: gravity.z };
            return;
        }
        const deltaX = gravity.x - gaugeShakeBaseline.x;
        const deltaY = gravity.y - gaugeShakeBaseline.y;
        const deltaZ = gravity.z - gaugeShakeBaseline.z;
        gaugeShakeBaseline = { x: gravity.x, y: gravity.y, z: gravity.z };
        const magnitude = Math.hypot(deltaX, deltaY, deltaZ);
        if (magnitude < 2.5) return;
        const primaryAxis = Math.abs(deltaX) > Math.abs(deltaY) ? deltaX : deltaY;
        direction = primaryAxis < 0 ? -1 : 1;
        intensity = Math.min(24, magnitude * 3);
    }

    if (intensity <= 0) return;
    gaugeTiltShake = {
        angle: direction * intensity,
        x: direction * Math.min(16, intensity * 0.65),
        startedAt: performance.now()
    };
    queueGaugeTiltFrame();
}

function markGaugeSensorData() {
    if (gaugeTiltHasSensorData) return;
    gaugeTiltHasSensorData = true;
    if (gaugeTiltEventTimer !== null) {
        clearTimeout(gaugeTiltEventTimer);
        gaugeTiltEventTimer = null;
    }
}

function queueGaugeTiltFrame() {
    if (gaugeTiltFrame === null) {
        gaugeTiltFrame = requestAnimationFrame(animateGaugeTilt);
    }
}

function animateGaugeTilt() {
    gaugeTiltFrame = null;
    const waterFill = document.getElementById('moistureWaterFill');
    if (!waterFill || !gaugeTiltEnabled) return;

    let shakeAngle = 0;
    let shakeX = 0;
    if (gaugeTiltShake) {
        const elapsed = performance.now() - gaugeTiltShake.startedAt;
        const decay = Math.max(0, 1 - elapsed / 650);
        if (decay > 0) {
            const wave = Math.sin(elapsed / 42) * decay;
            shakeAngle = gaugeTiltShake.angle * wave;
            shakeX = gaugeTiltShake.x * wave;
        } else {
            gaugeTiltShake = null;
        }
    }

    const smoothing = 0.3;
    const targetAngle = Math.max(-40, Math.min(40, gaugeTiltTarget.angle + shakeAngle));
    const targetX = Math.max(-18, Math.min(18, gaugeTiltTarget.x + shakeX));
    gaugeTiltCurrent.angle += (targetAngle - gaugeTiltCurrent.angle) * smoothing;
    gaugeTiltCurrent.x += (targetX - gaugeTiltCurrent.x) * smoothing;
    gaugeTiltCurrent.y += (gaugeTiltTarget.y - gaugeTiltCurrent.y) * smoothing;

    waterFill.style.setProperty('--water-tilt-angle', `${gaugeTiltCurrent.angle.toFixed(2)}deg`);
    waterFill.style.setProperty('--water-tilt-x', `${gaugeTiltCurrent.x.toFixed(2)}px`);
    waterFill.style.setProperty('--water-tilt-y', `${gaugeTiltCurrent.y.toFixed(2)}px`);

    const remaining = Math.abs(targetAngle - gaugeTiltCurrent.angle) +
        Math.abs(targetX - gaugeTiltCurrent.x) +
        Math.abs(gaugeTiltTarget.y - gaugeTiltCurrent.y);
    if (remaining > 0.08 || gaugeTiltShake) {
        queueGaugeTiltFrame();
    } else {
        gaugeTiltCurrent = { ...gaugeTiltTarget };
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
    const heroLiveMoist = document.getElementById('heroLiveMoist');
    if (heroLiveMoist) heroLiveMoist.textContent = 'ESP32';
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
        recBox.textContent = 'Live soil moisture monitoring is unavailable.';
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

    if (rawLastUpdated === 'Never' || data.status === 'offline' || data.is_online === false) {
        setIoTOffline(rawLastUpdated);
        return;
    }

    const lastUpdated = formatLocalTime(rawLastUpdated);

    // Update Value with Smooth Count-Up Animation
    animateMoistureNumber(moisture);
    const heroLiveMoist = document.getElementById('heroLiveMoist');
    if (heroLiveMoist) heroLiveMoist.textContent = Math.round(moisture) + '%';

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
            if (recBox) recBox.textContent = dict.iotDryRec || 'Soil moisture is critically low. Initiate targeted irrigation to prevent plant dehydration and vascular stress.';
        } else if (moisture >= 30 && moisture <= 75) {
            badge.classList.add('status-good');
            badge.textContent = dict.iotOpt || 'Optimal';
            if (recBox) recBox.textContent = dict.iotOptRec || 'Root-zone moisture is balanced. Transpiration and nutrient uptake conditions are ideal.';
        } else {
            badge.classList.add('status-wet');
            badge.textContent = dict.iotWet || 'Too Wet';
            if (recBox) recBox.textContent = dict.iotWetRec || 'Soil is waterlogged. Suspend irrigation and verify field drainage to prevent root hypoxia and fungal proliferation.';
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
    const cssW = wrap.clientWidth || 400;
    const cssH = wrap.clientHeight || 176;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.round(cssW * dpr);
    canvas.height = Math.round(cssH * dpr);
    canvas.style.width = cssW + 'px';
    canvas.style.height = cssH + 'px';
    const ctx = canvas.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, cssW, cssH);

    const left = 54;
    const right = 16;
    const top = 16;
    const bottom = 20;
    const plotW = Math.max(1, cssW - left - right);
    const plotH = Math.max(1, cssH - top - bottom);
    const yFor = value => top + plotH - (value / 100) * plotH;
    const wetY = yFor(75);
    const dryY = yFor(30);

    ctx.fillStyle = 'rgba(239, 68, 68, 0.13)';
    ctx.fillRect(left, dryY, plotW, top + plotH - dryY);
    ctx.fillStyle = 'rgba(34, 197, 94, 0.12)';
    ctx.fillRect(left, wetY, plotW, dryY - wetY);
    ctx.fillStyle = 'rgba(14, 165, 233, 0.08)';
    ctx.fillRect(left, top, plotW, wetY - top);

    ctx.font = '600 12px Inter, sans-serif';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#8a9290';
    [100, 75, 30, 0].forEach(value => {
        const y = yFor(value);
        ctx.fillText(value + '%', left - 10, y);
        ctx.beginPath();
        ctx.moveTo(left, y);
        ctx.lineTo(left + plotW, y);
        ctx.strokeStyle = value === 30 ? 'rgba(239,68,68,0.20)' : 'rgba(148,163,184,0.28)';
        ctx.lineWidth = 1;
        ctx.stroke();
    });

    if (IoTHistory.length === 0) return;

    const points = IoTHistory.map((value, index) => {
        const x = IoTHistory.length === 1
            ? left + plotW
            : left + (index / (IoTHistory.length - 1)) * plotW;
        return { x, y: yFor(Math.max(0, Math.min(100, value))), value };
    });

    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
        const previous = points[i - 1];
        const current = points[i];
        const midX = (previous.x + current.x) / 2;
        ctx.bezierCurveTo(midX, previous.y, midX, current.y, current.x, current.y);
    }

    ctx.save();
    ctx.lineTo(points[points.length - 1].x, top + plotH);
    ctx.lineTo(points[0].x, top + plotH);
    ctx.closePath();
    const areaGradient = ctx.createLinearGradient(0, top, 0, top + plotH);
    areaGradient.addColorStop(0, 'rgba(34,197,94,0.68)');
    areaGradient.addColorStop(1, 'rgba(34,197,94,0.12)');
    ctx.fillStyle = areaGradient;
    ctx.fill();
    ctx.restore();

    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
        const previous = points[i - 1];
        const current = points[i];
        const midX = (previous.x + current.x) / 2;
        ctx.bezierCurveTo(midX, previous.y, midX, current.y, current.x, current.y);
    }
    ctx.strokeStyle = '#22c55e';
    ctx.lineWidth = 3;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.stroke();

    points.forEach((point, index) => {
        const isLast = index === points.length - 1;
        ctx.beginPath();
        ctx.arc(point.x, point.y, isLast ? 6 : 4, 0, Math.PI * 2);
        ctx.fillStyle = point.value < 30 ? '#ef4444' : point.value > 75 ? '#0ea5e9' : '#22c55e';
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.stroke();
    });

    const latest = points[points.length - 1];
    const status = latest.value < 30 ? 'Deficit' : latest.value > 75 ? 'Saturated' : 'Optimal';
    const label = `${Math.round(latest.value)}% • ${status}`;
    ctx.font = '700 14px Inter, sans-serif';
    const labelWidth = ctx.measureText(label).width + 18;
    const labelHeight = 34;
    let labelX = latest.x - labelWidth - 10;
    if (labelX < left) labelX = latest.x - labelWidth / 2;
    labelX = Math.max(left, Math.min(cssW - labelWidth - 6, labelX));
    const labelY = Math.max(4, latest.y - 48);

    ctx.shadowColor = 'rgba(15, 23, 42, 0.16)';
    ctx.shadowBlur = 8;
    ctx.shadowOffsetY = 3;
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.roundRect(labelX, labelY, labelWidth, labelHeight, 8);
    ctx.fill();
    ctx.shadowColor = 'transparent';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#3e4a47';
    ctx.fillText(label, labelX + labelWidth / 2, labelY + labelHeight / 2);
}

window.addEventListener('resize', drawMoistureChart, { passive: true });

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
        setSunTrajectoryLocation(lat, lon);
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
function setProfilePhoto(photo) {
    const photoEmoji = document.getElementById('profilePhotoEmoji');
    const photoImg = document.getElementById('profilePhotoImg');
    if (!photoImg) return;

    let usingFallback = !photo;
    photoImg.onerror = () => {
        if (!usingFallback) {
            usingFallback = true;
            photoImg.src = DEFAULT_PROFILE_PHOTO;
            return;
        }
        photoImg.style.display = 'none';
        if (photoEmoji) photoEmoji.style.display = 'inline';
    };

    if (photoEmoji) photoEmoji.style.display = 'none';
    photoImg.src = photo || DEFAULT_PROFILE_PHOTO;
    photoImg.style.display = 'block';
}

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

        setProfilePhoto(user.photo || '');

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

        renderProfileScanHistory(user.phone);
    } catch (e) { }

    setProfileHistoryExpanded(false);

    // Use style.display directly — most reliable on mobile
    modal.classList.remove('hidden');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    // Highlight bottom nav profile item if present
    const profileNavBtn = document.querySelector('.bottom-nav-link.mobile-profile-btn');
    if (profileNavBtn) {
        document.querySelectorAll('.bottom-nav-link').forEach(l => l.classList.remove('active'));
        profileNavBtn.classList.add('active');
    }
}

function closeProfile() {
    const modal = document.getElementById('profileModal');
    if (!modal) return;
    modal.style.display = 'none';
    modal.classList.add('hidden');
    document.body.style.overflow = '';

    // Restore active state to current screen bottom nav item
    const profileNavBtn = document.querySelector('.bottom-nav-link.mobile-profile-btn');
    if (profileNavBtn) {
        profileNavBtn.classList.remove('active');
        const activeNav = document.querySelector(`.bottom-nav-link[data-screen="${AppState.currentScreen}"]`);
        if (activeNav) activeNav.classList.add('active');
    }
}

function logout() {
    localStorage.removeItem('agri_active_user');
    closeProfile();
    checkAuth();
}

function setProfilePhotoStatus(message, isError) {
    const status = document.getElementById('profilePhotoStatus');
    if (!status) return;
    status.textContent = message;
    status.classList.toggle('is-error', Boolean(isError));
    status.classList.toggle('hidden', !message);
}

function compressProfilePhoto(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = () => reject(reader.error || new Error('Unable to read the selected image.'));
        reader.onload = () => {
            if (typeof reader.result !== 'string') {
                reject(new Error('The selected image could not be read.'));
                return;
            }

            const image = new Image();
            image.onerror = () => reject(new Error('The selected file is not a supported image.'));
            image.onload = () => {
                try {
                    const scale = Math.min(1, 512 / Math.max(image.naturalWidth, image.naturalHeight));
                    const canvas = document.createElement('canvas');
                    canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
                    canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
                    const context = canvas.getContext('2d');
                    if (!context) throw new Error('Image compression is unavailable in this browser.');

                    context.fillStyle = '#edf5ee';
                    context.fillRect(0, 0, canvas.width, canvas.height);
                    context.drawImage(image, 0, 0, canvas.width, canvas.height);
                    const compressedPhoto = canvas.toDataURL('image/jpeg', 0.82);
                    if (compressedPhoto === 'data:,') {
                        throw new Error('The selected image could not be compressed.');
                    }
                    resolve(compressedPhoto);
                } catch (error) {
                    reject(error);
                }
            };
            image.src = reader.result;
        };
        reader.readAsDataURL(file);
    });
}

async function handleProfilePhotoUpload(event) {
    const input = event.currentTarget || event.target;
    const file = input.files && input.files[0];
    if (!file) return;

    setProfilePhotoStatus('Saving profile photo...', false);
    try {
        const photo = await compressProfilePhoto(file);
        const activeUserString = localStorage.getItem('agri_active_user');
        if (!activeUserString) throw new Error('No signed-in profile is available.');

        const user = JSON.parse(activeUserString);
        if (!user.phone) throw new Error('The signed-in profile has no user identifier.');

        const usersString = localStorage.getItem('agri_users_db');
        const users = JSON.parse(usersString || '{}');
        if (!users || typeof users !== 'object' || Array.isArray(users)) {
            throw new Error('The saved user database is invalid.');
        }

        const updatedUser = Object.assign({}, user, { photo });
        const updatedUsers = Object.assign({}, users);
        updatedUsers[user.phone] = Object.assign({}, users[user.phone] || user, { photo });
        try {
            localStorage.setItem('agri_users_db', JSON.stringify(updatedUsers));
            localStorage.setItem('agri_active_user', JSON.stringify(updatedUser));
        } catch (storageError) {
            try {
                if (usersString === null) localStorage.removeItem('agri_users_db');
                else localStorage.setItem('agri_users_db', usersString);
                localStorage.setItem('agri_active_user', activeUserString);
            } catch (rollbackError) {
                console.error('Unable to restore profile data after a failed photo save:', rollbackError);
            }
            throw storageError;
        }

        setProfilePhoto(photo);
        setProfilePhotoStatus('Profile photo saved.', false);
    } catch (error) {
        console.error('Unable to save profile photo:', error);
        setProfilePhotoStatus('Could not save your photo. Try a smaller image.', true);
    } finally {
        input.value = '';
    }
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
        setSunTrajectoryLocation(lat, lon);
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
   MOBILE HERO SUN / MOON TRAJECTORY
   ========================================================================== */
let sunTrajectoryLocation = null;
let sunTrajectoryFrame = null;
let sunTrajectoryTimer = null;
let sunTrajectoryPath = null;
let sunTrajectoryPathLength = 0;
let sunTrajectorySun = null;
let sunTrajectoryMoon = null;
let sunTrajectoryRoot = null;
let cachedSunEventsKey = '';
let cachedSunEvents = null;
const SUN_TRAJECTORY_UPDATE_INTERVAL = 5000;

function setSunTrajectoryLocation(latitude, longitude) {
    if (!Number.isFinite(latitude) || !Number.isFinite(longitude) ||
        latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) return;

    sunTrajectoryLocation = { latitude, longitude };
    cachedSunEventsKey = '';
    updateSunTrajectory();
}

function fallbackSunEvent(date, sunrise) {
    const event = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    event.setHours(sunrise ? 6 : 18, 0, 0, 0);
    return event;
}

function normalizeDegrees(degrees) {
    return ((degrees % 360) + 360) % 360;
}

function calculateSunEvent(date, sunrise) {
    if (!sunTrajectoryLocation) return fallbackSunEvent(date, sunrise);

    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const dayOfYear = Math.floor(
        (Date.UTC(year, month, day) - Date.UTC(year, 0, 0)) / 86400000
    );
    const longitudeHour = sunTrajectoryLocation.longitude / 15;
    const approximateTime = dayOfYear + ((sunrise ? 6 : 18) - longitudeHour) / 24;
    const meanAnomaly = 0.9856 * approximateTime - 3.289;
    const trueLongitude = normalizeDegrees(
        meanAnomaly +
        1.916 * Math.sin(meanAnomaly * Math.PI / 180) +
        0.020 * Math.sin(2 * meanAnomaly * Math.PI / 180) +
        282.634
    );

    let rightAscension = normalizeDegrees(
        Math.atan(0.91764 * Math.tan(trueLongitude * Math.PI / 180)) * 180 / Math.PI
    );
    rightAscension += Math.floor(trueLongitude / 90) * 90 -
        Math.floor(rightAscension / 90) * 90;
    rightAscension /= 15;

    const sinDeclination = 0.39782 * Math.sin(trueLongitude * Math.PI / 180);
    const cosDeclination = Math.cos(Math.asin(sinDeclination));
    const latitudeRadians = sunTrajectoryLocation.latitude * Math.PI / 180;
    const cosHourAngle = (
        Math.cos(90.833 * Math.PI / 180) -
        sinDeclination * Math.sin(latitudeRadians)
    ) / (cosDeclination * Math.cos(latitudeRadians));

    if (!Number.isFinite(cosHourAngle) || cosHourAngle < -1 || cosHourAngle > 1) {
        return fallbackSunEvent(date, sunrise);
    }

    const hourAngle = sunrise
        ? 360 - Math.acos(cosHourAngle) * 180 / Math.PI
        : Math.acos(cosHourAngle) * 180 / Math.PI;
    const localMeanTime = hourAngle / 15 + rightAscension -
        0.06571 * approximateTime - 6.622;
    const utcHours = ((localMeanTime - longitudeHour) % 24 + 24) % 24;
    let event = new Date(Date.UTC(year, month, day) + utcHours * 3600000);
    const targetDate = Date.UTC(year, month, day);

    for (let attempt = 0; attempt < 3; attempt++) {
        const eventDate = Date.UTC(event.getFullYear(), event.getMonth(), event.getDate());
        if (eventDate === targetDate) return event;
        event.setDate(event.getDate() + (eventDate < targetDate ? 1 : -1));
    }

    return fallbackSunEvent(date, sunrise);
}

function getSunEvents(now) {
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const key = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}-${now.getTimezoneOffset()}-` +
        `${sunTrajectoryLocation ? `${sunTrajectoryLocation.latitude},${sunTrajectoryLocation.longitude}` : 'fallback'}`;

    if (key !== cachedSunEventsKey) {
        const yesterday = new Date(today);
        const tomorrow = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        tomorrow.setDate(tomorrow.getDate() + 1);
        cachedSunEvents = {
            sunrise: calculateSunEvent(today, true),
            sunset: calculateSunEvent(today, false),
            previousSunset: calculateSunEvent(yesterday, false),
            nextSunrise: calculateSunEvent(tomorrow, true)
        };
        cachedSunEventsKey = key;
    }

    return cachedSunEvents;
}

function clampProgress(value) {
    return Math.max(0, Math.min(1, value));
}

function updateSunTrajectory(now = new Date()) {
    if (!sunTrajectoryPath || !sunTrajectorySun || !sunTrajectoryMoon || !sunTrajectoryRoot) return null;

    const events = getSunEvents(now);
    const transitionDuration = 20 * 60 * 1000;
    const sunProgress = clampProgress(
        (now.getTime() - events.sunrise.getTime()) /
        (events.sunset.getTime() - events.sunrise.getTime())
    );
    const sunriseFade = clampProgress(
        (now.getTime() - (events.sunrise.getTime() - transitionDuration / 2)) / transitionDuration
    );
    const sunsetFade = clampProgress(
        ((events.sunset.getTime() + transitionDuration / 2) - now.getTime()) / transitionDuration
    );
    const sunOpacity = Math.min(sunriseFade, sunsetFade);
    const moonStart = now.getTime() < events.sunrise.getTime() + transitionDuration / 2
        ? events.previousSunset
        : events.sunset;
    const moonEnd = now.getTime() < events.sunrise.getTime() + transitionDuration / 2
        ? events.sunrise
        : events.nextSunrise;
    const moonProgress = 1 - clampProgress(
        (now.getTime() - moonStart.getTime()) / (moonEnd.getTime() - moonStart.getTime())
    );
    const sunPoint = sunTrajectoryPath.getPointAtLength(sunTrajectoryPathLength * sunProgress);
    const moonPoint = sunTrajectoryPath.getPointAtLength(sunTrajectoryPathLength * moonProgress);

    sunTrajectorySun.setAttribute('transform', `translate(${sunPoint.x} ${sunPoint.y})`);
    sunTrajectoryMoon.setAttribute('transform', `translate(${moonPoint.x} ${moonPoint.y})`);
    sunTrajectorySun.setAttribute('opacity', String(sunOpacity));
    sunTrajectoryMoon.setAttribute('opacity', String(1 - sunOpacity));
    sunTrajectoryRoot.dataset.phase = sunOpacity > 0.99 ? 'day' : sunOpacity < 0.01 ? 'night' : 'twilight';
    sunTrajectoryRoot.dataset.sunProgress = String(sunProgress);
    sunTrajectoryRoot.dataset.moonProgress = String(moonProgress);

    return { phase: sunTrajectoryRoot.dataset.phase, sunProgress, moonProgress, sunOpacity };
}

function animateSunTrajectory() {
    sunTrajectoryFrame = null;
    if (document.hidden) return;

    updateSunTrajectory(new Date());
    scheduleSunTrajectoryUpdate();
}

function scheduleSunTrajectoryUpdate() {
    if (document.hidden || sunTrajectoryTimer !== null || sunTrajectoryFrame !== null) return;

    sunTrajectoryTimer = window.setTimeout(() => {
        sunTrajectoryTimer = null;
        sunTrajectoryFrame = requestAnimationFrame(animateSunTrajectory);
    }, SUN_TRAJECTORY_UPDATE_INTERVAL);
}

function startSunTrajectory() {
    sunTrajectoryRoot = document.querySelector('.hero-trajectory');
    sunTrajectoryPath = document.getElementById('trajectoryPath');
    sunTrajectoryPathLength = sunTrajectoryPath ? sunTrajectoryPath.getTotalLength() : 0;
    sunTrajectorySun = document.getElementById('trajectorySun');
    sunTrajectoryMoon = document.getElementById('trajectoryMoon');
    if (!sunTrajectoryPath || !sunTrajectorySun || !sunTrajectoryMoon ||
        !sunTrajectoryRoot || document.hidden ||
        getComputedStyle(sunTrajectoryRoot).display === 'none') {
        stopSunTrajectory();
        return;
    }

    updateSunTrajectory(new Date());
    scheduleSunTrajectoryUpdate();
}

function stopSunTrajectory() {
    if (sunTrajectoryFrame !== null) {
        cancelAnimationFrame(sunTrajectoryFrame);
        sunTrajectoryFrame = null;
    }
    if (sunTrajectoryTimer !== null) {
        clearTimeout(sunTrajectoryTimer);
        sunTrajectoryTimer = null;
    }
}

document.addEventListener('DOMContentLoaded', startSunTrajectory);
document.addEventListener('visibilitychange', () => {
    if (document.hidden) stopSunTrajectory();
    else startSunTrajectory();
});
window.addEventListener('resize', startSunTrajectory);
window.addEventListener('pagehide', stopSunTrajectory);
window.addEventListener('pageshow', startSunTrajectory);

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
    if (typeof fetchIoTData === 'function') {
        fetchIoTData();
    }
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
            startSunTrajectory();
            const track = document.querySelector('.hub-horiz-loop-track');
            if (track) track.style.animationPlayState = 'running';
        } else {
            stopSunTrajectory();
            const track = document.querySelector('.hub-horiz-loop-track');
            if (track) track.style.animationPlayState = 'paused';
        }
    };
}

// ==========================================
// HORIZONTAL MOVING CARDS LOOP CONTROLLER (DYNAMIC ARCH)
// ==========================================
let horizLoopAnimFrame = null;

function initHorizLoopCards() {
    const track = document.querySelector('.hub-horiz-loop-track');
    const container = document.getElementById('hubHorizLoopContainer');
    if (!track || !container) return;

    const originalCards = Array.from(track.querySelectorAll('.hub-big-card'))
        .filter(card => card.getAttribute('aria-hidden') !== 'true');
    if (!originalCards.length) return;

    let cards = [];

    function configureLoopCopies() {
        track.querySelectorAll('.hub-big-card[aria-hidden="true"]').forEach(card => card.remove());

        const groupWidth = originalCards.reduce((width, card) => {
            const style = window.getComputedStyle(card);
            return width + card.getBoundingClientRect().width + (parseFloat(style.marginRight) || 0);
        }, 0);

        if (!groupWidth) return;

        const copyCount = Math.max(2, Math.ceil((container.clientWidth + groupWidth) / groupWidth));
        for (let copyIndex = 1; copyIndex < copyCount; copyIndex += 1) {
            originalCards.forEach(card => {
                const clone = card.cloneNode(true);
                clone.setAttribute('aria-hidden', 'true');
                track.appendChild(clone);
            });
        }

        track.style.setProperty('--hub-loop-offset', `-${groupWidth}px`);
        cards = Array.from(track.querySelectorAll('.hub-big-card'));
    }

    configureLoopCopies();

    function updateDynamicCardArch() {
        const homeScreen = document.getElementById('screenHome');
        const isHomeActive = homeScreen && homeScreen.classList.contains('active');

        if (isHomeActive && window.innerWidth <= 768) {
            const screenWidth = window.innerWidth;
            const screenCenterX = screenWidth / 2;
            const halfScreen = screenWidth * 0.52;
            const maxDip = 18; // px: matches the dome curve curvature
            const maxRotation = 2.4; // deg: dynamic radial arch flare

            for (let i = 0; i < cards.length; i++) {
                const card = cards[i];
                const rect = card.getBoundingClientRect();

                // Skip if offscreen
                if (rect.right < -40 || rect.left > screenWidth + 40) continue;

                const cardCenterX = rect.left + rect.width / 2;
                const dist = (cardCenterX - screenCenterX) / halfScreen;
                const clamped = Math.max(-1.15, Math.min(1.15, dist));

                // Quadratic parabolic curve matching dome arch
                const dip = Math.pow(clamped, 2) * maxDip;
                const rot = clamped * maxRotation;
                const scale = 1 - Math.abs(clamped) * 0.025;

                card.style.transform = `translate3d(0, ${dip.toFixed(2)}px, 0) rotate(${rot.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
            }
        } else if (window.innerWidth > 768) {
            cards.forEach(card => {
                if (card.style.transform) card.style.transform = '';
            });
        }

        horizLoopAnimFrame = requestAnimationFrame(updateDynamicCardArch);
    }

    if (horizLoopAnimFrame) cancelAnimationFrame(horizLoopAnimFrame);
    horizLoopAnimFrame = requestAnimationFrame(updateDynamicCardArch);

    // Prevent duplicate event listeners
    if (!track.dataset.loopListenersAttached) {
        track.dataset.loopListenersAttached = 'true';
        window.addEventListener('resize', configureLoopCopies, { passive: true });

        // Pause moving cards on touch/hover, resume on release
        container.addEventListener('pointerenter', () => {
            track.style.animationPlayState = 'paused';
        });
        container.addEventListener('pointerleave', () => {
            track.style.animationPlayState = 'running';
        });
        container.addEventListener('touchstart', () => {
            track.style.animationPlayState = 'paused';
        }, { passive: true });
        container.addEventListener('touchend', () => {
            track.style.animationPlayState = 'running';
        }, { passive: true });
    }
}

/* ==========================================================================
   SCREEN 6: PRECISION AGRI-STORE (Smart ML Recommendation Engine)
   ========================================================================== */

const AGRI_PRODUCTS = [
    {
        id: 'prod_ridomil',
        name: 'Ridomil Gold MZ 68 WG',
        brand: 'Syngenta Agro',
        activeIngredient: 'Mefenoxam 4% + Mancozeb 64% WG',
        image: 'assets/images/products/ridomil_gold.jpg',
        category: 'cure',
        categoryLabel: 'Targeted Chemical Cure',
        typeTag: 'Systemic & Contact Anti-Oomycete',
        diseases: ['late_blight', 'root_rot'],
        crops: ['Potato', 'Tomato', 'Grapes', 'Vegetables'],
        severitySuitability: ['critical', 'moderate'],
        climates: ['karnataka', 'coastal', 'north', 'all'],
        moistureNeed: 'any',
        price: 740,
        packSize: '500 g',
        rating: 4.9,
        dosageRate: '2.5 g / L water',
        sprayVolumePerAcre: 200,
        dosePerAcreGrams: 500,
        modeOfAction: 'Inhibits fungal RNA polymerase and halts sporangial germination within 2 hours.',
        dealerAvailability: 'Available at 14 licensed dealers near your sub-district'
    },
    {
        id: 'prod_amistar',
        name: 'Amistar Top Broad-Spectrum',
        brand: 'Syngenta Agro',
        activeIngredient: 'Azoxystrobin 18.2% + Difenoconazole 11.4% SC',
        category: 'cure',
        categoryLabel: 'Targeted Chemical Cure',
        typeTag: 'Broad-Spectrum Curative + Protective',
        diseases: ['early_blight', 'powdery_mildew', 'bacterial_blight'],
        crops: ['Tomato', 'Potato', 'Chilli', 'Rice', 'Maize'],
        severitySuitability: ['critical', 'moderate', 'early'],
        climates: ['karnataka', 'maharashtra', 'north', 'all'],
        moistureNeed: 'any',
        price: 890,
        packSize: '200 ml',
        rating: 4.8,
        dosageRate: '1.0 ml / L water',
        sprayVolumePerAcre: 200,
        dosePerAcreGrams: 200,
        modeOfAction: 'Dual-action strobilurin + triazole blocking cellular respiration and fungal ergosterol synthesis.',
        dealerAvailability: 'In stock at 11 agro-centers with fast rural dispatch'
    },
    {
        id: 'prod_copper',
        name: 'Blitox 50 WP Copper Shield',
        brand: 'Tata Rallis',
        activeIngredient: 'Copper Oxychloride 50% WP',
        category: 'cure',
        categoryLabel: 'Targeted Chemical Cure',
        typeTag: 'Protective Spore Neutralizer',
        diseases: ['bacterial_blight', 'early_blight', 'late_blight'],
        crops: ['Tomato', 'Potato', 'Pomegranate', 'Paddy', 'Citrus'],
        severitySuitability: ['moderate', 'early', 'preventive'],
        climates: ['karnataka', 'coastal', 'all'],
        moistureNeed: 'any',
        price: 380,
        packSize: '500 g',
        rating: 4.7,
        dosageRate: '3.0 g / L water',
        sprayVolumePerAcre: 200,
        dosePerAcreGrams: 600,
        modeOfAction: 'Denatures bacterial and fungal proteins upon contact, halting lesion expansion.',
        dealerAvailability: 'Standard stock in all village cooperative credit societies'
    },
    {
        id: 'prod_trichoderma',
        name: 'Tricho-Bio Protectant (Bio-Fungicide)',
        brand: 'Multiplex Bio',
        activeIngredient: 'Trichoderma Viride 1.5% WP (2x10^8 CFU/g)',
        category: 'organic',
        categoryLabel: '100% Bio & Organic',
        typeTag: 'Biological Antagonist & Root Colonizer',
        diseases: ['root_rot', 'early_blight', 'all'],
        crops: ['All Vegetable Crops', 'Pulses', 'Oilseeds', 'Cotton'],
        severitySuitability: ['early', 'preventive', 'moderate'],
        climates: ['karnataka', 'maharashtra', 'coastal', 'north', 'all'],
        moistureNeed: 'optimal',
        price: 240,
        packSize: '1.0 kg',
        rating: 4.8,
        dosageRate: '5.0 g / L water (or 2.5 kg/acre soil application)',
        sprayVolumePerAcre: 200,
        dosePerAcreGrams: 1000,
        modeOfAction: 'Parasitizes pathogen hyphae and secretes antibiotic gliotoxin to guard root zones naturally.',
        dealerAvailability: 'Organic farmers federation outlet & local mandis'
    },
    {
        id: 'prod_neem',
        name: 'NeemGuard 10,000 PPM Azadirachtin',
        brand: 'EcoAgri Organic',
        activeIngredient: 'Cold-Pressed Pure Neem Extract 1.0% EC',
        category: 'organic',
        categoryLabel: '100% Bio & Organic',
        typeTag: 'Vector & Pest Repellent',
        diseases: ['yellow_curl', 'early', 'all'],
        crops: ['Tomato', 'Chilli', 'Okra', 'Brinjal', 'Cotton'],
        severitySuitability: ['early', 'preventive', 'moderate'],
        climates: ['karnataka', 'north', 'maharashtra', 'all'],
        moistureNeed: 'any',
        price: 460,
        packSize: '500 ml',
        rating: 4.7,
        dosageRate: '2.5 ml / L water',
        sprayVolumePerAcre: 200,
        dosePerAcreGrams: 500,
        modeOfAction: 'Anti-feedant; disrupts whitefly/aphid reproductive cycles that vector leaf curl virus.',
        dealerAvailability: 'Immediate pickup available across 16 district hubs'
    },
    {
        id: 'prod_custodia',
        name: 'Custodia Curative Fungicide',
        brand: 'ADAMA Agricultural Solutions',
        activeIngredient: 'Azoxystrobin 11% + Tebuconazole 18.3% w/w SC',
        category: 'cure',
        categoryLabel: 'Targeted Chemical Cure',
        typeTag: 'Broad Systemic Eradicant',
        diseases: ['early_blight', 'late_blight', 'powdery_mildew'],
        crops: ['Chilli', 'Tomato', 'Potato', 'Onion', 'Rice'],
        severitySuitability: ['critical', 'moderate'],
        climates: ['karnataka', 'north', 'maharashtra', 'coastal', 'all'],
        moistureNeed: 'any',
        price: 950,
        packSize: '250 ml',
        rating: 4.9,
        dosageRate: '1.5 ml / L water',
        sprayVolumePerAcre: 200,
        dosePerAcreGrams: 300,
        modeOfAction: 'Fast translaminar penetration curing deep-seated vascular fungal infections.',
        dealerAvailability: 'Available at certified agro-chemical dealers'
    },
    {
        id: 'prod_bio_npk',
        name: 'NutriVigor Foliar Recovery Tonic',
        brand: 'Coromandel Agrico',
        activeIngredient: 'Chelated Micronutrients (Fe, Zn, B) + Bio-Active Humic Acids 15%',
        category: 'nutrition',
        categoryLabel: 'Plant Recovery & Foliar',
        typeTag: 'Chlorophyll Restorative Tonic',
        diseases: ['all', 'yellow_curl', 'early_blight'],
        crops: ['All Crops', 'Horticulture', 'Vegetables'],
        severitySuitability: ['early', 'moderate', 'critical', 'preventive'],
        climates: ['all', 'karnataka', 'north', 'maharashtra', 'coastal'],
        moistureNeed: 'any',
        price: 340,
        packSize: '1.0 L',
        rating: 4.8,
        dosageRate: '3.0 ml / L water',
        sprayVolumePerAcre: 200,
        dosePerAcreGrams: 600,
        modeOfAction: 'Accelerates vegetative cellular regeneration and reverses yellowing post-pathogen stress.',
        dealerAvailability: 'High stock availability in regional agro-depots'
    },
    {
        id: 'prod_hydrosmart',
        name: 'HydroSmart Agri-Polymer Moisture Shield',
        brand: 'KrishiTech Innovations',
        activeIngredient: 'Cross-linked Potassium Polyacrylate Hydrogel',
        category: 'soil',
        categoryLabel: 'Moisture & Soil Conditioners',
        typeTag: 'Root-Zone Water Reservoir',
        diseases: ['drought_stress', 'root_rot', 'all'],
        crops: ['All Crops', 'Vegetables', 'Dryland Agriculture'],
        severitySuitability: ['moderate', 'early', 'preventive'],
        climates: ['karnataka', 'maharashtra', 'north', 'all'],
        moistureNeed: 'deficit',
        price: 520,
        packSize: '1.0 kg',
        rating: 4.9,
        dosageRate: '1.0 kg per acre mixed into root zone soil',
        sprayVolumePerAcre: 0,
        dosePerAcreGrams: 1000,
        modeOfAction: 'Absorbs and retains 400x its weight in water, buffering against soil moisture drought drops.',
        dealerAvailability: 'Precision irrigation & hardware retailers'
    },
    {
        id: 'prod_streptomycin',
        name: 'Plantomycin Pure Bactericide',
        brand: 'Aries Agro',
        activeIngredient: 'Streptomycin Sulphate 9% + Tetracycline Hydrochloride 1%',
        category: 'cure',
        categoryLabel: 'Targeted Chemical Cure',
        typeTag: 'Systemic Antibiotic for Vascular Bacteria',
        diseases: ['bacterial_blight'],
        crops: ['Rice', 'Cotton', 'Tomato', 'Potato', 'Citrus'],
        severitySuitability: ['critical', 'moderate'],
        climates: ['karnataka', 'coastal', 'north', 'all'],
        moistureNeed: 'any',
        price: 180,
        packSize: '100 g',
        rating: 4.9,
        dosageRate: '0.5 g / L water',
        sprayVolumePerAcre: 200,
        dosePerAcreGrams: 100,
        modeOfAction: 'Inhibits bacterial protein translation, eradicating bacterial blight and black arm cankers.',
        dealerAvailability: 'Specialty plant protection counters'
    },
    {
        id: 'prod_seaweed',
        name: 'BioZyme Seaweed Bio-Stimulant',
        brand: 'Biostadt India',
        activeIngredient: 'Ascophyllum Nodosum Marine Algae Extract + Amino Acids',
        category: 'nutrition',
        categoryLabel: 'Plant Recovery & Foliar',
        typeTag: 'Immunity & Vascular Strengthener',
        diseases: ['all', 'early', 'drought_stress'],
        crops: ['All Fruit & Vegetable Crops'],
        severitySuitability: ['early', 'preventive', 'moderate'],
        climates: ['all', 'karnataka', 'north', 'maharashtra'],
        moistureNeed: 'any',
        price: 490,
        packSize: '500 ml',
        rating: 4.8,
        dosageRate: '2.0 ml / L water',
        sprayVolumePerAcre: 200,
        dosePerAcreGrams: 400,
        modeOfAction: 'Stimulates endogenous phytoalexins, boosting natural plant immune defense against spores.',
        dealerAvailability: 'Certified organic agro-dealers across Karnataka and Maharashtra'
    }
];

let currentShopCategory = 'all';
let currentSelectedModalProduct = null;

function computeProductMatchScore(product, context) {
    let score = 55;

    // 1. Disease Matching
    if (context.disease && context.disease !== 'all') {
        if (product.diseases.includes(context.disease)) {
            score += 30;
        } else if (product.diseases.includes('all')) {
            score += 10;
        } else {
            score -= 22;
        }
    } else {
        score += 15;
    }

    // 2. Severity Fit
    if (context.severity && product.severitySuitability.includes(context.severity)) {
        score += 14;
    }

    // 3. Locality / Climatic Zone Fit
    if (context.locality && (product.climates.includes(context.locality) || product.climates.includes('all'))) {
        score += 8;
    }

    // 4. Live Soil Moisture Telemetry Cross-Referencing
    const liveMoist = AppState.lastMoisture;
    if (liveMoist !== null) {
        if (liveMoist < 30 && (product.id === 'prod_hydrosmart' || product.category === 'soil')) {
            score += 18;
        } else if (liveMoist > 75 && (product.diseases.includes('root_rot') || product.id === 'prod_ridomil')) {
            score += 12;
        }
    }

    return Math.min(99, Math.max(62, score));
}

function openShopForDiagnosis(disease, conf, type) {
    let diseaseKey = 'all';
    const dLower = (disease || '').toLowerCase();
    if (dLower.includes('early blight')) diseaseKey = 'early_blight';
    else if (dLower.includes('late blight')) diseaseKey = 'late_blight';
    else if (dLower.includes('bacterial') || dLower.includes('canker')) diseaseKey = 'bacterial_blight';
    else if (dLower.includes('yellow') || dLower.includes('curl')) diseaseKey = 'yellow_curl';
    else if (dLower.includes('mildew') || dLower.includes('rust')) diseaseKey = 'powdery_mildew';
    else if (dLower.includes('rot') || dLower.includes('wilt')) diseaseKey = 'root_rot';

    let severity = 'moderate';
    const cNum = Number(conf);
    if (!isNaN(cNum) && cNum > 82) severity = 'critical';
    else if (!isNaN(cNum) && cNum < 65) severity = 'early';

    AppState.shopFilter = {
        disease: diseaseKey,
        diseaseName: disease,
        severity: severity,
        fromScan: true
    };

    navigateTo('screenShop');
    renderSmartShop();
}

let userDetectedLocation = null;
let isDetectingShopLocation = false;

async function detectUserShopLocation(forceRefresh = false) {
    if (isDetectingShopLocation) return;
    const nameEl = document.getElementById('shopLocationName');
    const btn = document.getElementById('btnShopLocationRefresh');

    if (!nameEl) return;

    if (!forceRefresh && userDetectedLocation) {
        applyLocationToShopUI(userDetectedLocation);
        return;
    }

    isDetectingShopLocation = true;
    if (nameEl) nameEl.textContent = 'Acquiring satellite & network coordinates...';
    if (btn) btn.classList.add('loading');

    if (!navigator.geolocation) {
        fallbackLocation('Geolocation not supported on this browser');
        if (btn) btn.classList.remove('loading');
        isDetectingShopLocation = false;
        return;
    }

    navigator.geolocation.getCurrentPosition(
        async (position) => {
            const { latitude, longitude, accuracy } = position.coords;
            const latFixed = latitude.toFixed(4);
            const lonFixed = longitude.toFixed(4);
            const latStr = `${Math.abs(latFixed)}° ${latitude >= 0 ? 'N' : 'S'}`;
            const lonStr = `${Math.abs(lonFixed)}° ${longitude >= 0 ? 'E' : 'W'}`;

            let locationName = '';
            let stateName = '';
            let localityKey = 'karnataka';

            try {
                // Reverse geocode via OpenStreetMap Nominatim
                const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=14&addressdetails=1`);
                if (res.ok) {
                    const data = await res.json();
                    const addr = data.address || {};
                    const city = addr.city || addr.town || addr.village || addr.suburb || addr.municipality || '';
                    const district = addr.state_district || addr.county || '';
                    stateName = addr.state || '';
                    const countryName = addr.country || 'India';

                    const parts = [];
                    if (city) parts.push(city);
                    if (district && district !== city) parts.push(district);
                    if (stateName) parts.push(stateName);
                    if (countryName) parts.push(countryName);

                    locationName = parts.join(', ');
                }
            } catch (err) {
                console.warn('Reverse geocode error:', err);
            }

            if (!locationName) {
                locationName = `${latStr}, ${lonStr} (Exact Field Coordinates)`;
            }

            // Derive agro-climatic region from state for ML ranking
            const sLower = stateName.toLowerCase();
            if (sLower.includes('karnataka') || sLower.includes('tamil') || sLower.includes('andhra') || sLower.includes('telangana') || sLower.includes('kerala')) {
                localityKey = 'karnataka';
            } else if (sLower.includes('maharashtra') || sLower.includes('madhya') || sLower.includes('gujarat')) {
                localityKey = 'maharashtra';
            } else if (sLower.includes('punjab') || sLower.includes('haryana') || sLower.includes('uttar') || sLower.includes('bihar') || sLower.includes('delhi')) {
                localityKey = 'north';
            } else if (sLower.includes('goa') || sLower.includes('konkan') || sLower.includes('bengal') || sLower.includes('odisha') || sLower.includes('assam')) {
                localityKey = 'coastal';
            }

            userDetectedLocation = {
                coordsText: `${latStr}, ${lonStr}`,
                accuracy: Math.round(accuracy || 15),
                name: locationName,
                state: stateName,
                localityKey: localityKey
            };

            applyLocationToShopUI(userDetectedLocation);
            if (btn) btn.classList.remove('loading');
            isDetectingShopLocation = false;

            // Re-render products matching this exact location
            renderSmartShop();
        },
        (error) => {
            console.warn('Geolocation error / permission denied:', error.message);
            fallbackLocation('Permission pending - using default regional hub');
            if (btn) btn.classList.remove('loading');
            isDetectingShopLocation = false;
        },
        { enableHighAccuracy: true, timeout: 8000, maximumAge: 60000 }
    );
}

function fallbackLocation(note) {
    userDetectedLocation = {
        coordsText: '12.9716° N, 77.5946° E',
        accuracy: 25,
        name: 'Bengaluru, Karnataka, India',
        state: 'Karnataka',
        localityKey: 'karnataka',
        isFallback: true,
        fallbackNote: note
    };
    applyLocationToShopUI(userDetectedLocation);
    renderSmartShop();
}

function applyLocationToShopUI(loc) {
    const nameEl = document.getElementById('shopLocationName');
    if (nameEl) nameEl.textContent = loc.name;
}

function renderSmartShop() {
    const grid = document.getElementById('shopProductsGrid');
    if (!grid) return;

    if (!userDetectedLocation && !isDetectingShopLocation) {
        detectUserShopLocation();
    }

    const context = {
        locality: (userDetectedLocation && userDetectedLocation.localityKey) ? userDetectedLocation.localityKey : 'karnataka',
        disease: (AppState.shopFilter && AppState.shopFilter.disease) ? AppState.shopFilter.disease : 'all',
        severity: (AppState.shopFilter && AppState.shopFilter.severity) ? AppState.shopFilter.severity : 'moderate'
    };

    // Calculate dynamic scores and sort
    const scoredProducts = AGRI_PRODUCTS.map(p => {
        const score = computeProductMatchScore(p, context);
        return { ...p, score };
    }).filter(p => {
        if (currentShopCategory === 'all') return true;
        return p.category === currentShopCategory;
    });

    scoredProducts.sort((a, b) => b.score - a.score);

    if (scoredProducts.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem; background: var(--surface); border-radius: var(--radius-lg); border: 1px dashed var(--border);">
                <p style="font-size: 1.1rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.5rem;">No products found for this specific filter combination.</p>
                <p style="color: var(--text-muted); font-size: 0.9rem;">Try switching category to "All ML Prescriptions" or resetting disease focus.</p>
                <button class="btn-primary" style="margin-top: 1rem;" onclick="resetShopFilters()">Reset Filters</button>
            </div>
        `;
        return;
    }

    grid.innerHTML = scoredProducts.map((prod, idx) => {
        const isTopMatch = idx === 0 && prod.score >= 85;
        const scoreClass = prod.score >= 88 ? 'match-high' : 'match-mid';

        if (prod.image) {
            return `
                <div class="product-card product-card-split ${isTopMatch ? 'top-match' : ''}">
                    <div class="product-card-img-wrap">
                        <div class="product-badge-overlay">
                            <span class="match-score-badge ${scoreClass}">
                                ${prod.score}%
                            </span>
                        </div>
                        <img src="${prod.image}" alt="${prod.name}" class="product-img" loading="lazy">
                    </div>

                    <div class="product-card-bottom-info">
                        <div>
                            <div class="category-tag">${prod.categoryLabel}</div>
                            <h3 class="product-name" title="${prod.name}">${prod.name}</h3>
                        </div>

                        <div class="product-card-footer">
                            <div class="dealer-stock-pill">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                                <span>${prod.dealerAvailability}</span>
                            </div>

                            <div class="product-price-action-row">
                                <div class="product-price-block">
                                    <span class="product-price-val">₹${prod.price}</span>
                                    <span class="product-pack-size">Per ${prod.packSize}</span>
                                </div>
                                <button type="button" class="btn-dosage-calc" onclick="openDosageModal('${prod.id}')">
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                        <line x1="8" y1="12" x2="16" y2="12"></line>
                                        <line x1="12" y1="8" x2="12" y2="16"></line>
                                    </svg>
                                    <span>Dose & Order</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }

        return `
            <div class="product-card ${isTopMatch ? 'top-match' : ''}">
                <div>
                    <div class="product-badge-row">
                        <span class="match-score-badge ${scoreClass}">
                            ${prod.score}%
                        </span>
                        <span class="category-tag">${prod.categoryLabel}</span>
                    </div>

                    <h3 class="product-name">${prod.name}</h3>
                </div>

                <div class="product-card-footer">
                    <div class="dealer-stock-pill">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                        <span>${prod.dealerAvailability}</span>
                    </div>

                    <div class="product-price-action-row">
                        <div class="product-price-block">
                            <span class="product-price-val">₹${prod.price}</span>
                            <span class="product-pack-size">Per ${prod.packSize}</span>
                        </div>
                        <button type="button" class="btn-dosage-calc" onclick="openDosageModal('${prod.id}')">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                <line x1="8" y1="12" x2="16" y2="12"></line>
                                <line x1="12" y1="8" x2="12" y2="16"></line>
                            </svg>
                            <span>Dose & Order</span>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function applyShopFilters() {
    if (AppState.shopFilter) {
        AppState.shopFilter.fromScan = false;
    }
    renderSmartShop();
}

function setShopCategory(cat, btn) {
    currentShopCategory = cat;
    document.querySelectorAll('#shopCategoryPills .shop-pill').forEach(p => p.classList.remove('active'));
    if (btn) btn.classList.add('active');
    renderSmartShop();
}

function resetShopFilters() {
    AppState.shopFilter = null;
    currentShopCategory = 'all';
    document.querySelectorAll('#shopCategoryPills .shop-pill').forEach((p, idx) => {
        p.classList.toggle('active', idx === 0);
    });
    renderSmartShop();
}

/* Dosage & Order Modal Functions */
function openDosageModal(productId) {
    const prod = AGRI_PRODUCTS.find(p => p.id === productId);
    if (!prod) return;

    currentSelectedModalProduct = prod;

    const modal = document.getElementById('dosageOrderModal');
    const nameEl = document.getElementById('modalProductName');
    const rateEl = document.getElementById('modalDosageRate');

    if (nameEl) nameEl.textContent = `${prod.name} (${prod.brand})`;
    if (rateEl) rateEl.textContent = prod.dosageRate;

    calculateDosageForModal();

    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

function closeDosageModal() {
    const modal = document.getElementById('dosageOrderModal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }
}

function calculateDosageForModal() {
    if (!currentSelectedModalProduct) return;

    const acresInput = document.getElementById('farmAcresInput');
    const acres = acresInput ? Math.max(0.1, parseFloat(acresInput.value) || 1.0) : 1.0;

    const waterVol = document.getElementById('modalWaterVolume');
    const qtyEl = document.getElementById('modalProductQty');
    const priceEl = document.getElementById('modalTotalPrice');

    const totalWater = Math.round(acres * (currentSelectedModalProduct.sprayVolumePerAcre || 200));
    if (waterVol) waterVol.textContent = totalWater > 0 ? `${totalWater} Litres` : 'Direct Soil Incorporation';

    const packsNeeded = Math.max(1, Math.ceil(acres));
    const totalPrice = packsNeeded * currentSelectedModalProduct.price;

    if (qtyEl) qtyEl.textContent = `${packsNeeded} Unit (${packsNeeded * 500 >= 1000 ? (packsNeeded * 0.5).toFixed(1) + ' kg' : (packsNeeded * 500) + ' g/ml'})`;
    if (priceEl) priceEl.textContent = `₹${totalPrice.toLocaleString('en-IN')}`;
}

function confirmShopOrder() {
    if (!currentSelectedModalProduct) return;
    const acresInput = document.getElementById('farmAcresInput');
    const acres = acresInput ? acresInput.value : '1.0';

    alert(`🎉 Order Request Placed Successfully!\n\nProduct: ${currentSelectedModalProduct.name}\nQuantity: ${Math.ceil(acres)} pack(s) for ${acres} Acre(s)\n\nNearest Authorized Center: Kaveri Agro-Kendra has reserved your stock.\nA rural dispatch agent will contact your mobile within 30 minutes for delivery.`);
    closeDosageModal();
}

