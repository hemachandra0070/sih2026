import type { QuestionDefinition, AssessmentAnswers } from "./schema";

export const ASSESSMENT_QUESTIONS: QuestionDefinition[] = [
  // 1. INTENT
  {
    id: "intent",
    type: "single_select",
    category: "intent",
    title: {
      en: "What would you like help with today?",
      hi: "आज आप किस प्रकार की सहायता चाहते हैं?",
      te: "ఈరోజు మీకు ఎలాంటి సహాయం కావాలి?",
    },
    subtitle: {
      en: "Choose the option that best describes what you want to do.",
      hi: "वह विकल्प चुनें जो आपके उद्देश्य से सबसे मेल खाता हो।",
      te: "మీ ఉద్దేశాన్ని ఉత్తమంగా వివరించే ఎంపికను ఎంచుకోండి.",
    },
    helpText: {
      en: "This helps us guide you to the right government assistance programs.",
      hi: "इससे हम आपको सही सरकारी सहायता योजना तक पहुंचाने में मदद कर सकते हैं।",
      te: "సరైన ప్రభుత్వ సహాయ పథకాలను మీకు చూపించడానికి ఇది సహాయపడుతుంది.",
    },
    options: [
      {
        value: "new_business",
        label: {
          en: "Start a new business",
          hi: "नया व्यवसाय शुरू करें",
          te: "కొత్త వ్యాపారాన్ని ప్రారంభించండి",
        },
        description: {
          en: "Financial support to set up a new shop, trade, or enterprise.",
          hi: "नई दुकान, व्यापार या उद्यम स्थापित करने के लिए वित्तीय सहायता।",
          te: "కొత్త దుకాణం, వ్యాపారం లేదా పరిశ్రమను ఏర్పాటు చేయడానికి ఆర్థిక సహాయం.",
        },
        icon: "Store",
      },
      {
        value: "expand_business",
        label: {
          en: "Grow my existing business",
          hi: "मौजूदा व्यवसाय को बढ़ाएं",
          te: "ప్రస్తుత వ్యాపారాన్ని విస్తరించండి",
        },
        description: {
          en: "Working capital, machinery, or scaling up your running venture.",
          hi: "चल रहे व्यवसाय के लिए कार्यशील पूंजी, मशीनरी या विस्तार।",
          te: "నడుస్తున్న వ్యాపారం కోసం మూలధనం, యంత్రాలు లేదా విస్తరణ.",
        },
        icon: "TrendingUp",
      },
      {
        value: "education",
        label: {
          en: "Get an education loan",
          hi: "शिक्षा ऋण प्राप्त करें",
          te: "విద్యా రుణం పొందండి",
        },
        description: {
          en: "Tuition fee and living expense support for technical or degree courses.",
          hi: "तकनीकी या डिग्री पाठ्यक्रमों के लिए ट्यूशन फीस और खर्च।",
          te: "సాంకేతిక లేదా డిగ్రీ కోర్సుల కోసం ఫీజు మరియు ఖర్చులకు సహాయం.",
        },
        icon: "GraduationCap",
      },
      {
        value: "equipment_vehicle",
        label: {
          en: "Buy equipment or a vehicle for work",
          hi: "काम के लिए उपकरण या वाहन खरीदें",
          te: "పని కోసం పరికరాలు లేదా వాహనం కొనండి",
        },
        description: {
          en: "Tractors, auto-rickshaws, commercial tools, or machinery.",
          hi: "ट्रैक्टर, ऑटो-रिक्शा, व्यावसायिक उपकरण या मशीनरी।",
          te: "ట్రాక్టర్లు, ఆటో రిక్షాలు, వాణిజ్య పరికరాలు లేదా యంత్రాలు.",
        },
        icon: "Truck",
      },
      {
        value: "unsure",
        label: {
          en: "I'm not sure / Explore options",
          hi: "मुझे पक्का नहीं पता / विकल्प देखें",
          te: "నాకు ఖచ్చితంగా తెలియదు / ఎంపికలను చూడండి",
        },
        description: {
          en: "We will ask a few simple questions to suggest the best paths for you.",
          hi: "हम आपके लिए सर्वोत्तम योजनाएं ढूंढने हेतु कुछ सरल प्रश्न पूछेंगे।",
          te: "మీ కోసం ఉత్తమ ఎంపికలను సూచించడానికి మేము కొన్ని సాధారణ ప్రశ్నలు అడుగుతాము.",
        },
        icon: "HelpCircle",
      },
    ],
    required: true,
  },

  // 2. COMMUNITY PROFILE
  {
    id: "is_sc",
    type: "yes_no_unknown",
    category: "profile",
    title: {
      en: "Do you or your family belong to the Scheduled Caste (SC) community?",
      hi: "क्या आप या आपका परिवार अनुसूचित जाति (SC) समुदाय से संबंधित हैं?",
      te: "మీరు లేదా మీ కుటుంబం షెడ్యూల్డ్ కులం (SC) వర్గానికి చెందినవారా?",
    },
    subtitle: {
      en: "These schemes are specifically designated for Scheduled Caste beneficiaries.",
      hi: "ये योजनाएं विशेष रूप से अनुसूचित जाति के लाभार्थियों के लिए बनाई गई हैं।",
      te: "ఈ పథకాలు ప్రత్యేకంగా షెడ్యూల్డ్ కులాల లబ్ధిదారుల కోసం ఉద్దేశించబడ్డాయి.",
    },
    helpText: {
      en: "You will need a valid caste certificate issued by a competent revenue officer to apply.",
      hi: "आवेदन के लिए सक्षम राजस्व अधिकारी द्वारा जारी वैध जाति प्रमाण पत्र आवश्यक होगा।",
      te: "దరఖాస్తు చేసుకోవడానికి తహశీల్దార్ లేదా సంబంధిత అధికారి జారీ చేసిన కుల ధృవీకరణ పత్రం అవసరం.",
    },
    options: [
      {
        value: "yes",
        label: { en: "Yes", hi: "हाँ", te: "అవును" },
        description: {
          en: "I have or can obtain an SC community certificate.",
          hi: "मेरे पास SC जाति प्रमाण पत्र है या मैं प्राप्त कर सकता हूँ।",
          te: "నా దగ్గర SC కుల ధృవీకరణ పత్రం ఉంది లేదా పొందగలను.",
        },
      },
      {
        value: "no",
        label: { en: "No", hi: "नहीं", te: "కాదు" },
        description: {
          en: "I belong to another community.",
          hi: "मैं अन्य समुदाय से हूँ।",
          te: "నేను ఇతర వర్గానికి చెందినవాడిని.",
        },
      },
      {
        value: "unknown",
        label: {
          en: "I'm not sure",
          hi: "मुझे पक्का नहीं पता",
          te: "నాకు ఖచ్చితంగా తెలియదు",
        },
        description: {
          en: "We will check general guidelines for you.",
          hi: "हम आपके लिए सामान्य दिशानिर्देश जांचेंगे।",
          te: "మేము మీ కోసం సాధారణ నిబంధనలను పరిశీలిస్తాము.",
        },
      },
    ],
    allowUnknown: true,
    required: true,
  },

  // 3A. EDUCATION: COURSE TYPE (Only if intent is education)
  {
    id: "course",
    type: "search_select",
    category: "activity",
    dependsOn: (answers: AssessmentAnswers) => answers.intent === "education",
    title: {
      en: "What course are you studying or planning to study?",
      hi: "आप कौन सा कोर्स पढ़ रहे हैं या पढ़ने की योजना बना रहे हैं?",
      te: "మీరు ఏ కోర్సు చదువుతున్నారు లేదా చదవాలని ప్లాన్ చేస్తున్నారు?",
    },
    subtitle: {
      en: "Select the field that matches your college or university program.",
      hi: "वह क्षेत्र चुनें जो आपके कॉलेज या विश्वविद्यालय के पाठ्यक्रम से मेल खाता हो।",
      te: "మీ కళాశాల లేదా విశ్వవిద్యాలయ కోర్సుకు సరిపోయే విభాగాన్ని ఎంచుకోండి.",
    },
    placeholder: {
      en: "Select or search course...",
      hi: "कोर्स चुनें या खोजें...",
      te: "కోర్సును ఎంచుకోండి లేదా శోధించండి...",
    },
    options: [
      {
        value: "engineering",
        label: {
          en: "Engineering & Technology",
          hi: "इंजीनियरिंग और प्रौद्योगिकी",
          te: "ఇంజనీరింగ్ & టెక్నాలజీ",
        },
        description: {
          en: "B.Tech, B.E, M.Tech, Polytechnic Diploma",
          hi: "बी.टेक, बी.ई, एम.टेक, पॉलिटेक्निक डिप्लोमा",
          te: "బి.టెక్, బి.ఇ, ఎం.టెక్, పాలిటెక్నిక్ డిప్లొమా",
        },
      },
      {
        value: "medical_nursing",
        label: {
          en: "Medical, Dental & Healthcare",
          hi: "चिकित्सा, दंत और स्वास्थ्य सेवा",
          te: "వైద్య, దంత & ఆరోగ్య సేవలు",
        },
        description: {
          en: "MBBS, BDS, B.Sc Nursing, Pharmacy, Physiotherapy",
          hi: "एमबीबीएस, बीडीएस, बीएससी नर्सिंग, फार्मेसी, फिजियोथेरेपी",
          te: "ఎంబిబిఎస్, బిడిఎస్, నర్సింగ్, ఫార్మసీ, ఫిజియోథెరపీ",
        },
      },
      {
        value: "management",
        label: {
          en: "Management & Commerce",
          hi: "प्रबंधन और वाणिज्य",
          te: "మేనేజ్మెంట్ & కామర్స్",
        },
        description: {
          en: "MBA, BBA, Hotel Management, Chartered Accountancy (CA)",
          hi: "एमबीए, बीबीए, होटल मैनेजमेंट, सीए",
          te: "ఎంబిఎ, బిబిఎ, హోటల్ మేనేజ్మెంట్, సిఎ",
        },
      },
      {
        value: "it_computer",
        label: {
          en: "Information Technology & Computer Apps",
          hi: "सूचना प्रौद्योगिकी और कंप्यूटर",
          te: "ఇన్ఫర్మేషన్ టెక్నాలజీ & కంప్యూటర్",
        },
        description: {
          en: "MCA, BCA, Data Science, Software Diploma",
          hi: "एमसीए, बीसीए, डेटा साइंस",
          te: "ఎంసిఎ, బిసిఎ, కంప్యూటర్ అప్లికేషన్స్",
        },
      },
      {
        value: "law_higher",
        label: {
          en: "Law & Higher Research Studies",
          hi: "कानून और उच्च अनुसंधान अध्ययन",
          te: "న్యాయ & ఉన్నత పరిశోధనలు",
        },
        description: {
          en: "LLB, LLM, Journalism, Doctoral Studies (PhD / M.Phil)",
          hi: "एलएलबी, एलएलएम, पत्रकारिता, पीएचडी",
          te: "ఎల్ఎల్బి, జర్నలిజం, పిహెచ్‌డి",
        },
      },
      {
        value: "other",
        label: {
          en: "Other recognized course / Can't find my course",
          hi: "अन्य मान्यता प्राप्त कोर्स / मेरा कोर्स नहीं मिल रहा",
          te: "ఇతర గుర్తింపు పొందిన కోర్సు / నా కోర్సు కనిపించడం లేదు",
        },
        description: {
          en: "Enter your degree or course manually.",
          hi: "अपना कोर्स नाम दर्ज करें।",
          te: "మీ కోర్సు పేరును టైప్ చేయండి.",
        },
      },
    ],
    allowUnknown: true,
    required: true,
  },

  // 3B. BUSINESS: WORK / ACTIVITY TYPE (Only if intent != education)
  {
    id: "activity",
    type: "search_select",
    category: "activity",
    dependsOn: (answers: AssessmentAnswers) => answers.intent !== "education",
    title: {
      en: "What kind of work or business do you want to do?",
      hi: "आप किस प्रकार का काम या व्यवसाय करना चाहते हैं?",
      te: "మీరు ఎలాంటి పని లేదా వ్యాపారం చేయాలనుకుంటున్నారు?",
    },
    subtitle: {
      en: "Choose the activity closest to your work, or enter your own.",
      hi: "अपने काम से सबसे निकटतम गतिविधि चुनें, या अपना काम दर्ज करें।",
      te: "మీ పనికి సరిపోయే కార్యాచరణను ఎంచుకోండి లేదా మీ పనిని నమోదు చేయండి.",
    },
    placeholder: {
      en: "Select or search work category...",
      hi: "काम की श्रेणी चुनें या खोजें...",
      te: "పని విభాగాన్ని ఎంచుకోండి లేదా శోధించండి...",
    },
    options: [
      {
        value: "agriculture_dairy",
        label: {
          en: "Farming, Dairy & Livestock",
          hi: "खेती, डेयरी और पशुपालन",
          te: "వ్యవసాయం, పాడి & పశుపోషణ",
        },
        description: {
          en: "Dairy cows/buffaloes, poultry, goat/sheep rearing, horticulture, fisheries",
          hi: "डेयरी गाय/भैंस, पोल्ट्री, बकरी पालन, बागवानी, मछली पालन",
          te: "పాడి ఆవులు/గేదెలు, కోళ్ల ఫారమ్, మేకల పెంపకం, చేపల చెరువులు",
        },
      },
      {
        value: "tailoring_garments",
        label: {
          en: "Tailoring, Garments & Boutique",
          hi: "सिलाई, वस्त्र और बुटीक",
          te: "టైలరింగ్, వస్త్రాలు & బొటిక్",
        },
        description: {
          en: "Tailoring machines, readymade garments, embroidery, handlooms",
          hi: "सिलाई मशीन, रेडीमेड कपड़े, कढ़ाई, हथकरघा",
          te: "టైలరింగ్ మిషన్లు, రెడీమేడ్ బట్టలు, ఎంబ్రాయిడరీ, చేనేత",
        },
      },
      {
        value: "retail_shop",
        label: {
          en: "Grocery, Provisions & Retail Shop",
          hi: "किराना दुकान और खुदरा व्यापार",
          te: "కిరాణా దుకాణం & రిటైల్ షాప్",
        },
        description: {
          en: "Departmental store, medical shop, electrical items, stationery",
          hi: "किराना दुकान, मेडिकल स्टोर, बिजली का सामान, स्टेशनरी",
          te: "జనరల్ స్టోర్, మెడికల్ షాప్, ఎలక్ట్రికల్ వస్తువులు, స్టేషనరీ",
        },
      },
      {
        value: "food_processing",
        label: {
          en: "Food, Snacks & Agro Processing",
          hi: "खाद्य, नाश्ता और कृषि प्रसंस्करण",
          te: "ఆహార ఉత్పత్తులు, టిఫిన్ & బేకరీ",
        },
        description: {
          en: "Bakery, flour mill, spices grinding, food packaging, tea stall/tiffin",
          hi: "बेकरी, आटा चक्की, मसाला पिसाई, टिफिन सेंटर",
          te: "బేకరీ, పిండి మిల్లు, మసాలా పొడులు, టిఫిన్ సెంటర్",
        },
      },
      {
        value: "transport_vehicles",
        label: {
          en: "Transport & Commercial Vehicles",
          hi: "परिवहन और व्यावसायिक वाहन",
          te: "రవాణా & వాణిజ్య వాహనాలు",
        },
        description: {
          en: "Auto-rickshaw, passenger taxi, delivery goods vehicle, tractor",
          hi: "ऑटो-रिक्शा, टैक्सी, मालवाहक वाहन, ट्रैक्टर",
          te: "ఆటో రిక్షా, ట్యాక్సీ, సరుకుల రవాణా వాహనం, ట్రాక్టర్",
        },
      },
      {
        value: "skilled_services",
        label: {
          en: "Skilled Trades & Repair Services",
          hi: "कुशल कारीगरी और मरम्मत सेवाएं",
          te: "నైపుణ్య పనులు & మరమ్మతు కేంద్రం",
        },
        description: {
          en: "Mobile repair, carpentry, welding, electrical winding, plumbing",
          hi: "मोबाइल रिपेयरिंग, बढ़ईगीरी, वेल्डिंग, बिजली का काम",
          te: "మొబైల్ రిపేరింగ్, వడ్రంగి పని, వెల్డింగ్, ఎలక్ట్రికల్ పనులు",
        },
      },
      {
        value: "beauty_tech_centers",
        label: {
          en: "Beauty Salons & Computer/Digital Centers",
          hi: "ब्यूटी पार्लर और कंप्यूटर/डिजिटल केंद्र",
          te: "బ్యూటీ పార్లర్ & కంప్యూటర్ సెంటర్",
        },
        description: {
          en: "Beauty parlor, digital photo studio, Xerox & DTP center, clinic lab",
          hi: "ब्यूटी पार्लर, डिजिटल स्टूडियो, जेरॉक्स और डीटीपी केंद्र",
          te: "బ్యూటీ పార్లర్, డిజిటల్ స్టూడియో, జిరాక్స్ & డిటిపి సెంటర్",
        },
      },
      {
        value: "other",
        label: {
          en: "I can't find my work / Other business",
          hi: "मेरा काम नहीं मिल रहा / अन्य व्यवसाय",
          te: "నా పని కనిపించడం లేదు / ఇతర వ్యాపారం",
        },
        description: {
          en: "Type in your specific trade or activity.",
          hi: "अपना विशिष्ट कार्य या गतिविधि लिखें।",
          te: "మీ పనిని స్వయంగా టైప్ చేయండి.",
        },
      },
    ],
    allowUnknown: true,
    required: true,
  },

  // 3C. CUSTOM ACTIVITY / COURSE FREE TEXT INPUT (If "other" was chosen)
  {
    id: "custom_activity",
    type: "text",
    category: "activity",
    dependsOn: (answers: AssessmentAnswers) =>
      answers.activity === "other" || answers.course === "other",
    title: {
      en: "Please tell us what work or course you have in mind:",
      hi: "कृपया बताएं कि आपके मन में कौन सा काम या कोर्स है:",
      te: "దయచేసి మీ ఆలోచనలోని పని లేదా కోర్సు పేరును తెలపండి:",
    },
    subtitle: {
      en: "Write in simple words. We will match it with eligible government categories.",
      hi: "सरल शब्दों में लिखें। हम इसे सरकारी श्रेणियों से मिलाएंगे।",
      te: "సాధారణ పదాలలో రాయండి. మేము దీనిని ప్రభుత్వ నిబంధనలతో పోల్చుతాము.",
    },
    placeholder: {
      en: "e.g. Leather shoe making, coaching center, solar repair...",
      hi: "उदा. चमड़े के जूते बनाना, कोचिंग सेंटर, सोलर रिपेयर...",
      te: "ఉదా. తోలు పాదరక్షల తయారీ, కోచింగ్ సెంటర్, సోలార్ రిపేర్...",
    },
    required: true,
  },

  // 4. BUSINESS STATUS (Only for business flows)
  {
    id: "business_status",
    type: "single_select",
    category: "activity",
    dependsOn: (answers: AssessmentAnswers) => answers.intent !== "education",
    title: {
      en: "Do you already have this business?",
      hi: "क्या आपके पास पहले से यह व्यवसाय है?",
      te: "మీరు ఇప్పటికే ఈ వ్యాపారాన్ని కలిగి ఉన్నారా?",
    },
    subtitle: {
      en: "Helps us distinguish between seed capital and expansion term finance.",
      hi: "यह नए काम और विस्तार ऋण के बीच चयन करने में मदद करता है।",
      te: "కొత్త వ్యాపారం లేదా విస్తరణ రుణాన్ని నిర్ణయించడానికి ఇది సహాయపడుతుంది.",
    },
    options: [
      {
        value: "new",
        label: {
          en: "I am starting a new business",
          hi: "मैं नया व्यवसाय शुरू कर रहा हूँ",
          te: "నేను కొత్త వ్యాపారాన్ని ప్రారంభిస్తున్నాను",
        },
        description: {
          en: "Setting up a venture for the first time.",
          hi: "पहली बार काम शुरू कर रहे हैं।",
          te: "మొదటిసారిగా పనిని ప్రారంభిస్తున్నాను.",
        },
      },
      {
        value: "existing",
        label: {
          en: "I already have this business",
          hi: "मेरे पास पहले से यह व्यवसाय है",
          te: "నాకు ఇప్పటికే ఈ వ్యాపారం ఉంది",
        },
        description: {
          en: "Currently operating and looking for regular working capital.",
          hi: "वर्तमान में काम चल रहा है और पूंजी की आवश्यकता है।",
          te: "ప్రస్తుతం నడుస్తోంది మరియు పెట్టుబడి అవసరం.",
        },
      },
      {
        value: "expanding",
        label: {
          en: "I want to expand my existing business",
          hi: "मैं अपने मौजूदा काम को बड़े स्तर पर बढ़ाना चाहता हूँ",
          te: "నా వ్యాపారాన్ని పెద్ద ఎత్తున విస్తరించాలనుకుంటున్నాను",
        },
        description: {
          en: "Buying new machinery, opening another branch, or modernizing.",
          hi: "नई मशीनरी खरीदना या विस्तार करना।",
          te: "కొత్త యంత్రాలు కొనడం లేదా విస్తరించడం.",
        },
      },
      {
        value: "unknown",
        label: {
          en: "I'm not sure",
          hi: "मुझे पक्का नहीं पता",
          te: "నాకు ఖచ్చితంగా తెలియదు",
        },
      },
    ],
    allowUnknown: true,
    required: true,
  },

  // 5. FINANCIAL NEED / AMOUNT NEEDED
  {
    id: "amount_needed",
    type: "currency",
    category: "finance",
    title: {
      en: "About how much money do you need?",
      hi: "आपको लगभग कितने रुपयों की आवश्यकता है?",
      te: "మీకు సుమారుగా ఎంత మొత్తం అవసరం?",
    },
    subtitle: {
      en: "An estimate of your total project cost, equipment price, or course fees.",
      hi: "आपकी परियोजना, मशीनरी या कोर्स फीस का अनुमानित खर्च।",
      te: "మీ ప్రాజెక్ట్ ఖర్చు, యంత్రాల ధర లేదా కోర్సు ఫీజుల అంచనా మొత్తం.",
    },
    helpText: {
      en: "NSFDC schemes can provide up to 90% financing for eligible projects.",
      hi: "NSFDC योजनाएं पात्र परियोजनाओं के लिए 90% तक ऋण प्रदान कर सकती हैं।",
      te: "NSFDC పథకాలు అర్హత గల ప్రాజెక్టులకు 90% వరకు రుణం అందిస్తాయి.",
    },
    placeholder: {
      en: "Enter amount (e.g. 1,40,000)",
      hi: "राशि दर्ज करें (उदा. 1,40,000)",
      te: "మొత్తం నమోదు చేయండి (ఉదా. 1,40,000)",
    },
    suggestions: [50000, 140000, 500000, 1500000, 4000000],
    allowUnknown: true,
    unknownLabel: {
      en: "I'm not sure about the exact amount",
      hi: "मुझे सटीक राशि का पता नहीं है",
      te: "నాకు ఖచ్చితమైన మొత్తం తెలియదు",
    },
    required: true,
  },

  // 6. ANNUAL FAMILY INCOME RANGE
  {
    id: "annual_income_range",
    type: "income_range",
    category: "finance",
    title: {
      en: "About how much does your family earn in a year?",
      hi: "आपके परिवार की साल में कुल कितनी कमाई हो जाती है?",
      te: "మీ కుటుంబం సంవత్సరంలో సుమారుగా ఎంత సంపాదిస్తుంది?",
    },
    subtitle: {
      en: "Combined earnings of all earning family members. Approximate is fine.",
      hi: "परिवार के सभी कमाने वाले सदस्यों की कुल आय। लगभग बताएं।",
      te: "కుటుంబ సభ్యులందరి మొత్తం వార్షిక ఆదాయం. సుమారుగా చెప్పవచ్చు.",
    },
    helpText: {
      en: "Most government schemes have income eligibility guidelines. Approximate range is fine.",
      hi: "अधिकांश सरकारी योजनाओं में आय सीमा होती है। अनुमानित श्रेणी काफी है।",
      te: "ప్రభుత్వ పథకాలకు ఆదాయ పరిమితులు ఉంటాయి. సుమారు శ్రేణి సరిపోతుంది.",
    },
    options: [
      {
        value: "under_1l",
        label: {
          en: "Less than ₹1 lakh",
          hi: "₹1 लाख से कम",
          te: "₹1 లక్ష కంటే తక్కువ",
        },
        description: {
          en: "Under ₹8,000 per month",
          hi: "लगभग ₹8,000 प्रति माह से कम",
          te: "నెలకు ₹8,000 కంటే తక్కువ",
        },
      },
      {
        value: "1l_to_2l",
        label: {
          en: "₹1 lakh to ₹2 lakh",
          hi: "₹1 लाख से ₹2 लाख",
          te: "₹1 లక్ష నుండి ₹2 లక్షలు",
        },
        description: {
          en: "₹8,000 – ₹16,000 per month",
          hi: "₹8,000 – ₹16,000 प्रति माह",
          te: "నెలకు ₹8,000 – ₹16,000",
        },
      },
      {
        value: "2l_to_5l",
        label: {
          en: "₹2 lakh to ₹5 lakh",
          hi: "₹2 लाख से ₹5 लाख",
          te: "₹2 లక్షల నుండి ₹5 లక్షలు",
        },
        description: {
          en: "₹16,000 – ₹40,000 per month",
          hi: "₹16,000 – ₹40,000 प्रति माह",
          te: "నెలకు ₹16,000 – ₹40,000",
        },
      },
      {
        value: "5l_to_10l",
        label: {
          en: "₹5 lakh to ₹10 lakh",
          hi: "₹5 लाख से ₹10 लाख",
          te: "₹5 లక్షల నుండి ₹10 లక్షలు",
        },
        description: {
          en: "Above ₹40,000 per month",
          hi: "₹40,000 प्रति माह से अधिक",
          te: "నెలకు ₹40,000 కంటే ఎక్కువ",
        },
      },
      {
        value: "above_10l",
        label: {
          en: "More than ₹10 lakh",
          hi: "₹10 लाख से अधिक",
          te: "₹10 లక్షల కంటే ఎక్కువ",
        },
      },
      {
        value: "unknown",
        label: {
          en: "I don't know / I'm not sure",
          hi: "मुझे नहीं पता / पक्का नहीं है",
          te: "నాకు తెలియదు / ఖచ్చితంగా లేదు",
        },
        description: {
          en: "We will ask a simpler follow-up question.",
          hi: "हम एक आसान अनुवर्ती प्रश्न पूछेंगे।",
          te: "మేము ఒక సాధారణ ప్రశ్న అడుగుతాము.",
        },
      },
    ],
    allowUnknown: true,
    required: true,
  },

  // 7. INCOME FOLLOW-UP (Only if user answered "unknown" for income range)
  {
    id: "income_below_5l",
    type: "yes_no_unknown",
    category: "finance",
    dependsOn: (answers: AssessmentAnswers) => answers.annual_income_range === "unknown",
    title: {
      en: "Is your family's yearly income below ₹5 lakh?",
      hi: "क्या आपके परिवार की वार्षिक आय ₹5 लाख से कम है?",
      te: "మీ కుటుంబ వార్షిక ఆదాయం ₹5 లక్షల కంటే తక్కువగా ఉందా?",
    },
    subtitle: {
      en: "This simple check helps us find which schemes apply to you.",
      hi: "यह सरल जांच आपको उपयुक्त योजनाओं से जोड़ने में मदद करती है।",
      te: "ఈ సాధారణ ప్రశ్న మీకు సరిపోయే పథకాలను కనుగొనడంలో సహాయపడుతుంది.",
    },
    options: [
      {
        value: "yes",
        label: {
          en: "Yes, below ₹5 lakh",
          hi: "हाँ, ₹5 लाख से कम",
          te: "అవును, ₹5 లక్షల కంటే తక్కువ",
        },
      },
      {
        value: "no",
        label: {
          en: "No, ₹5 lakh or higher",
          hi: "नहीं, ₹5 लाख या उससे अधिक",
          te: "కాదు, ₹5 లక్షలు లేదా అంతకంటే ఎక్కువ",
        },
      },
      {
        value: "unknown",
        label: {
          en: "I'm still not sure",
          hi: "मुझे अभी भी पक्का नहीं पता",
          te: "నాకు ఇంకా ఖచ్చితంగా తెలియదు",
        },
      },
    ],
    allowUnknown: true,
    required: true,
  },

  // 8. ASSETS: HOUSE
  {
    id: "owns_house",
    type: "yes_no_unknown",
    category: "assets",
    title: {
      en: "Do you or your family own a house?",
      hi: "क्या आपके या आपके परिवार के पास अपना घर है?",
      te: "మీకు లేదా మీ కుటుంబానికి స్వంత ఇల్లు ఉందా?",
    },
    subtitle: {
      en: "Whether pucca or kuccha house in your village or town.",
      hi: "चाहे गांव में हो या शहर में, पक्का या कच्चा मकान।",
      te: "గ్రామంలో లేదా పట్టణంలో పక్కా లేదా కచ్చా ఇల్లు ఏదైనా.",
    },
    options: [
      {
        value: "yes",
        label: { en: "Yes", hi: "हाँ", te: "అవును" },
      },
      {
        value: "no",
        label: {
          en: "No (Rented / Living with relatives)",
          hi: "नहीं (किराए पर / रिश्तेदारों के साथ)",
          te: "లేదు (అద్దెకు / బంధువులతో నివాసం)",
        },
      },
      {
        value: "unknown",
        label: { en: "I'm not sure", hi: "मुझे नहीं पता", te: "నాకు తెలియదు" },
      },
    ],
    allowUnknown: true,
    required: false,
  },

  // 8B. ASSETS: HOUSE AREA (Only if owns_house == yes)
  {
    id: "house_area",
    type: "single_select",
    category: "assets",
    dependsOn: (answers: AssessmentAnswers) => answers.owns_house === "yes",
    title: {
      en: "Do you know approximately how big the house is?",
      hi: "क्या आपको पता है कि मकान लगभग कितना बड़ा है?",
      te: "మీ ఇల్లు సుమారుగా ఎంత వైశాల్యం ఉంటుందో మీకు తెలుసా?",
    },
    options: [
      {
        value: "less_than_1000",
        label: {
          en: "Less than 1,000 sq. ft. (Small / medium house)",
          hi: "1,000 वर्ग फुट से कम (छोटा/मध्यम घर)",
          te: "1,000 చదరపు అడుగుల కంటే తక్కువ (చిన్న/మధ్య తరహా ఇల్లు)",
        },
      },
      {
        value: "1000_or_more",
        label: {
          en: "1,000 sq. ft. or larger",
          hi: "1,000 वर्ग फुट या उससे बड़ा",
          te: "1,000 చదరపు అడుగులు లేదా అంతకంటే పెద్దది",
        },
      },
      {
        value: "unknown",
        label: {
          en: "I don't know the exact area",
          hi: "मुझे सटीक माप नहीं पता",
          te: "నాకు ఖచ్చితమైన కొలత తెలియదు",
        },
      },
    ],
    allowUnknown: true,
    required: false,
  },

  // 9. ASSETS: AGRICULTURAL LAND (Only if agricultural activity or intent)
  {
    id: "owns_land",
    type: "yes_no_unknown",
    category: "assets",
    dependsOn: (answers: AssessmentAnswers) =>
      answers.activity === "agriculture_dairy" || answers.intent === "equipment_vehicle",
    title: {
      en: "Do you or your family have agricultural land?",
      hi: "क्या आपके या आपके परिवार के पास कृषि भूमि है?",
      te: "మీకు లేదా మీ కుటుంబానికి వ్యవసాయ భూమి ఉందా?",
    },
    options: [
      {
        value: "yes",
        label: { en: "Yes", hi: "हाँ", te: "అవును" },
      },
      {
        value: "no",
        label: {
          en: "No land / Landless",
          hi: "नहीं / भूमिहीन",
          te: "లేదు / భూమి లేదు",
        },
      },
      {
        value: "unknown",
        label: { en: "I'm not sure", hi: "मुझे नहीं पता", te: "నాకు తెలియదు" },
      },
    ],
    allowUnknown: true,
    required: false,
  },

  // 9B. LAND SIZE (If owns_land == yes)
  {
    id: "land_size",
    type: "single_select",
    category: "assets",
    dependsOn: (answers: AssessmentAnswers) => answers.owns_land === "yes",
    title: {
      en: "Approximately how much land do you have?",
      hi: "आपके पास लगभग कितनी जमीन है?",
      te: "మీ వద్ద సుమారుగా ఎంత భూమి ఉంది?",
    },
    options: [
      {
        value: "less_than_1_acre",
        label: {
          en: "Less than 1 acre (Marginal farmer)",
          hi: "1 एकड़ से कम (सीमांत किसान)",
          te: "1 ఎకరం కంటే తక్కువ (చిన్న రైతు)",
        },
      },
      {
        value: "1_to_2_5_acres",
        label: {
          en: "1 to 2.5 acres (Small farmer)",
          hi: "1 से 2.5 एकड़ (छोटे किसान)",
          te: "1 నుండి 2.5 ఎకరాలు",
        },
      },
      {
        value: "more_than_2_5_acres",
        label: {
          en: "More than 2.5 acres",
          hi: "2.5 एकड़ से अधिक",
          te: "2.5 ఎకరాల కంటే ఎక్కువ",
        },
      },
      {
        value: "unknown",
        label: { en: "I'm not sure", hi: "मुझे नहीं पता", te: "నాకు తెలియదు" },
      },
    ],
    allowUnknown: true,
    required: false,
  },

  // 10. ASSETS: VEHICLE (If transport, equipment, or business)
  {
    id: "owns_vehicle",
    type: "single_select",
    category: "assets",
    dependsOn: (answers: AssessmentAnswers) =>
      answers.intent === "equipment_vehicle" ||
      answers.activity === "transport_vehicles" ||
      answers.intent === "new_business" ||
      answers.intent === "expand_business",
    title: {
      en: "Do you or your family have a vehicle?",
      hi: "क्या आपके या आपके परिवार के पास कोई वाहन है?",
      te: "మీకు లేదా మీ కుటుంబానికి ఏదైనా వాహనం ఉందా?",
    },
    options: [
      {
        value: "none",
        label: {
          en: "None / No vehicle",
          hi: "कोई वाहन नहीं है",
          te: "ఏ వాహనం లేదు",
        },
      },
      {
        value: "bike_scooter",
        label: {
          en: "Bicycle or Bike / Scooter",
          hi: "साइकिल या बाइक / स्कूटर",
          te: "సైకిల్ లేదా బైక్ / స్కూటర్",
        },
      },
      {
        value: "auto_rickshaw",
        label: {
          en: "Auto-rickshaw",
          hi: "ऑटो-रिक्शा",
          te: "ఆటో రిక్షా",
        },
      },
      {
        value: "tractor",
        label: {
          en: "Tractor",
          hi: "ट्रैक्टर",
          te: "ట్రాక్టర్",
        },
      },
      {
        value: "commercial_vehicle",
        label: {
          en: "Commercial vehicle / Goods pickup / Car",
          hi: "व्यावसायिक मालवाहक / पिकअप / कार",
          te: "వాణిజ్య వాహనం / సరుకుల రవాణా / కారు",
        },
      },
      {
        value: "unknown",
        label: { en: "I'm not sure", hi: "मुझे नहीं पता", te: "నాకు తెలియదు" },
      },
    ],
    allowUnknown: true,
    required: false,
  },

  // 11. EXISTING LOANS
  {
    id: "has_existing_loan",
    type: "yes_no_unknown",
    category: "loans",
    title: {
      en: "Are you or your family currently paying off any loan?",
      hi: "क्या आप या आपका परिवार वर्तमान में कोई ऋण (लोन) चुका रहे हैं?",
      te: "మీరు లేదా మీ కుటుంబం ప్రస్తుతం ఏదైనా రుణం చెల్లిస్తున్నారా?",
    },
    subtitle: {
      en: "From any bank, society, or microfinance institution.",
      hi: "किसी भी बैंक, सोसायटी या वित्तीय संस्थान से।",
      te: "ఏదైనా బ్యాంకు, సహకార సంఘం లేదా ఆర్థిక సంస్థ నుండి.",
    },
    options: [
      {
        value: "no",
        label: {
          en: "No, no active loans",
          hi: "नहीं, कोई पुराना लोन नहीं है",
          te: "లేదు, ఎలాంటి రుణాలు లేవు",
        },
      },
      {
        value: "yes",
        label: {
          en: "Yes, currently paying a loan",
          hi: "हाँ, लोन चल रहा है",
          te: "అవును, ప్రస్తుతం రుణం నడుస్తోంది",
        },
      },
      {
        value: "unknown",
        label: { en: "I'm not sure", hi: "मुझे नहीं पता", te: "నాకు తెలియదు" },
      },
    ],
    allowUnknown: true,
    required: false,
  },

  // 11B. EXISTING LOAN PURPOSE (If has_existing_loan == yes)
  {
    id: "existing_loan_purpose",
    type: "single_select",
    category: "loans",
    dependsOn: (answers: AssessmentAnswers) => answers.has_existing_loan === "yes",
    title: {
      en: "What is this loan mainly for?",
      hi: "यह ऋण मुख्यतः किस काम के लिए है?",
      te: "ఈ రుణం ప్రధానంగా దేని కోసం తీసుకున్నారు?",
    },
    options: [
      {
        value: "business",
        label: { en: "Business or Trade", hi: "व्यापार या दुकान", te: "వ్యాపారం కోసం" },
      },
      {
        value: "agriculture",
        label: { en: "Farming or Crop loan", hi: "खेती या फसल ऋण", te: "వ్యవసాయం లేదా పంట రుణం" },
      },
      {
        value: "vehicle",
        label: { en: "Vehicle purchase", hi: "वाहन खरीद", te: "వాహనం కొనుగోలు" },
      },
      {
        value: "house",
        label: { en: "House construction or Land", hi: "मकान या जमीन", te: "ఇల్లు లేదా స్థలం" },
      },
      {
        value: "education",
        label: { en: "Education fees", hi: "शिक्षा की फीस", te: "విద్యా ఫీజులు" },
      },
      {
        value: "other",
        label: { en: "Other personal purpose", hi: "अन्य व्यक्तिगत कारण", te: "ఇతర కారణాలు" },
      },
    ],
    allowUnknown: true,
    required: false,
  },

  // 12. LOCATION
  {
    id: "location",
    type: "location",
    category: "location",
    title: {
      en: "Where do you live?",
      hi: "आप कहाँ रहते हैं?",
      te: "మీరు ఎక్కడ నివసిస్తున్నారు?",
    },
    subtitle: {
      en: "We will find authorized channel partner offices and bank branches near your district.",
      hi: "हम आपके जिले के पास अधिकृत चैनल पार्टनर कार्यालय और बैंक शाखाएं ढूंढेंगे।",
      te: "మేము మీ జిల్లాకు సమీపంలోని అధీకృత భాగస్వామ్య బ్యాంకులు మరియు కార్యాలయాలను కనుగొంటాము.",
    },
    helpText: {
      en: "GPS is optional. You can easily pick your district or type your city name.",
      hi: "जीपीएस अनिवार्य नहीं है। आप सीधे अपना जिला चुन सकते हैं।",
      te: "జిపిఎస్ తప్పనిసరి కాదు. మీరు నేరుగా మీ జిల్లాను ఎంచుకోవచ్చు.",
    },
    required: true,
  },
];

/**
 * Evaluates which questions are currently active given the collected answers.
 */
export function getActiveQuestions(answers: AssessmentAnswers): QuestionDefinition[] {
  return ASSESSMENT_QUESTIONS.filter((q) => {
    if (!q.dependsOn) return true;
    try {
      return q.dependsOn(answers);
    } catch {
      return false;
    }
  });
}
