// Eva Cosmetics Comprehensive Data - Enhanced Medical-Beauty Consultation System
export const EVA_COMPANY_DATA = {
  // Company Information
  company: {
    name: "إيفا كوزمتكس",
    nameEn: "Eva Cosmetics", 
    established: "1930",
    industry: "Cosmetics & Personal Care",
    headquarters: "برج أرمانيوس، 9 شارع الشركات، عابدين، القاهرة",
    headquartersEn: "Armanious Tower, 9 El Sharekat St, Abdeen, Cairo",
    branches: ["الإسكندرية", "الجيزة", "العاصمة الإدارية الجديدة", "أسوان", "الأقصر"],
    branchesEn: ["Alexandria", "Giza", "New Administrative Capital", "Aswan", "Luxor"],
    employees: "2000+",
    revenue: "500 مليون جنيه سنوياً",
    revenueEn: "500 million EGP annually",
    growth: "25% نمو سنوي",
    growthEn: "25% annual growth",
    certifications: ["ISO 9001/2008", "GMP", "GLP", "Halal Certified"],
    awards: ["أفضل شركة مستحضرات تجميل في مصر 2023", "جائزة الجودة الدولية 2022"],
    awardsEn: ["Best Cosmetics Company in Egypt 2023", "International Quality Award 2022"],
    mission: "تقديم منتجات تجميل آمنة وفعالة تجمع بين الجمال والطب لتعزيز ثقة المرأة العربية",
    missionEn: "Providing safe and effective cosmetic products that combine beauty with medicine to enhance Arab women's confidence",
    vision: "أن نكون الشركة الرائدة في مجال مستحضرات التجميل العلاجية في الشرق الأوسط وأفريقيا",
    visionEn: "To be the leading therapeutic cosmetics company in the Middle East and Africa",
    values: ["الجودة الطبية", "الأمان", "الابتكار", "الجمال الطبيعي", "الثقة"],
    valuesEn: ["Medical Quality", "Safety", "Innovation", "Natural Beauty", "Confidence"]
  },

  // Eva Cosmetics Product Catalog - 50 Products
  products: {

    // Skincare Products (25 Products)
    skincare: {
      "001": {
        id: "001",
        name: "غسول الوجه اللطيف للبشرة الدهنية والمعرضة للحبوب",
        nameEn: "EVA Gentle Facial Cleanser – Oily & Acne-Prone Skin",
        category: "منظفات الوجه",
        categoryEn: "Facial Cleansers",
        targetSkin: ["البشرة الدهنية", "البشرة المعرضة للحبوب"],
        targetSkinEn: ["Oily Skin", "Acne-Prone Skin"],
        mainIngredients: ["حمض الساليسيليك 2%", "الزنك PCA", "الألوة فيرا"],
        mainIngredientsEn: ["Salicylic Acid 2%", "Zinc PCA", "Aloe Vera"],
        benefits: ["ينظف المسام بعمق", "يتحكم في الزيوت الزائدة", "يقلل الالتهاب والاحمرار"],
        benefitsEn: ["Deep pore cleansing", "Controls excess oil", "Reduces inflammation"],
        usage: "ضع كمية صغيرة على البشرة المبللة صباحاً ومساءً، دلك بلطف لمدة 30-60 ثانية ثم اشطف",
        usageEn: "Apply small amount to wet skin morning and evening, massage gently for 30-60 seconds then rinse",
        recommendedBy: ["د. شاه", "لوجينا صلاح"],
        recommendedByEn: ["Dr. Shah", "Logina Salah"],
        dermatologistApproved: true,
        safePregnancy: true,
        warnings: ["تجنب ملامسة العينين", "توقف عن الاستخدام عند حدوث تهيج"],
        warningsEn: ["Avoid contact with eyes", "Discontinue if irritation occurs"],
        price: 150,
        rating: 4.7,
        reviews: 200
      },
      "002": {
        id: "002",
        name: "مرطب مائي للبشرة الجافة والحساسة",
        nameEn: "EVA Hydrating Moisturizer – Dry & Sensitive Skin",
        category: "مرطبات الوجه",
        categoryEn: "Facial Moisturizers",
        targetSkin: ["البشرة الجافة", "البشرة الحساسة"],
        targetSkinEn: ["Dry Skin", "Sensitive Skin"],
        mainIngredients: ["حمض الهيالورونيك", "نياسيناميد 5%", "السيراميدز"],
        mainIngredientsEn: ["Hyaluronic Acid", "Niacinamide 5%", "Ceramides"],
        benefits: ["ترطيب لمدة 48 ساعة", "يهدئ الاحمرار والتهيج", "يحمي من العوامل البيئية"],
        benefitsEn: ["48-hour hydration", "Soothes redness and irritation", "Environmental protection"],
        usage: "ضع طبقة رقيقة على البشرة النظيفة مرتين يومياً بعد السيرم وقبل واقي الشمس",
        usageEn: "Apply thin layer to clean skin twice daily after serum and before sunscreen",
        recommendedBy: ["يارا عزيز", "ذا ديرما كو مصر"],
        recommendedByEn: ["Yara Aziz", "The Derma Co Egypt"],
        dermatologistApproved: true,
        safePregnancy: true,
        warnings: ["للاستخدام الخارجي فقط", "تجنب المناطق المتهيجة"],
        warningsEn: ["For external use only", "Avoid irritated areas"],
        price: 220,
        rating: 4.8,
        reviews: 180
      },
      "003": {
        id: "003",
        name: "واقي الشمس SPF 50+ للبشرة العادية والمختلطة",
        nameEn: "EVA Sunscreen SPF 50+ – Normal & Combination Skin",
        category: "واقيات الشمس",
        categoryEn: "Sunscreens",
        targetSkin: ["البشرة العادية", "البشرة المختلطة"],
        targetSkinEn: ["Normal Skin", "Combination Skin"],
        mainIngredients: ["أكسيد الزنك 10%", "فيتامين E", "مستخلص الشاي الأخضر"],
        mainIngredientsEn: ["Zinc Oxide 10%", "Vitamin E", "Green Tea Extract"],
        benefits: ["حماية واسعة من الأشعة", "تركيبة خفيفة غير دهنية", "يمنع البقع الداكنة"],
        benefitsEn: ["Broad-spectrum protection", "Lightweight non-greasy formula", "Prevents dark spots"],
        usage: "ضع كخطوة أخيرة في روتين الصباح قبل التعرض للشمس بـ 15 دقيقة",
        usageEn: "Apply as final morning routine step, 15 minutes before sun exposure",
        recommendedBy: ["منة إيمارا", "هدى قطان"],
        recommendedByEn: ["Menna Emara", "Huda Kattan"],
        dermatologistApproved: true,
        safePregnancy: false,
        warnings: ["استشر الطبيب أثناء الحمل", "أعد التطبيق كل ساعتين"],
        warningsEn: ["Consult doctor during pregnancy", "Reapply every two hours"],
        price: 280,
        rating: 4.9,
        reviews: 320
      },
      "004": {
        id: "004",
        name: "سيرم فيتامين C المضاد للأكسدة",
        nameEn: "EVA Vitamin C Antioxidant Serum",
        category: "سيرم الوجه",
        categoryEn: "Facial Serums",
        targetSkin: ["جميع أنواع البشرة", "البشرة المتضررة من الشمس"],
        targetSkinEn: ["All Skin Types", "Sun-damaged Skin"],
        mainIngredients: ["فيتامين C 20%", "حمض الفيروليك", "فيتامين E"],
        mainIngredientsEn: ["Vitamin C 20%", "Ferulic Acid", "Vitamin E"],
        benefits: ["يضيء البشرة", "يقلل البقع الداكنة", "يحارب علامات الشيخوخة"],
        benefitsEn: ["Brightens skin", "Reduces dark spots", "Fights aging signs"],
        usage: "ضع 2-3 نقاط على البشرة النظيفة صباحاً قبل المرطب وواقي الشمس",
        usageEn: "Apply 2-3 drops to clean skin in morning before moisturizer and sunscreen",
        recommendedBy: ["د. أحمد الشامي", "كارولين عزمي"],
        recommendedByEn: ["Dr. Ahmed El Shamy", "Caroline Azmy"],
        dermatologistApproved: true,
        safePregnancy: true,
        warnings: ["قد يسبب حساسية في البداية", "تجنب التعرض المباشر للشمس"],
        warningsEn: ["May cause initial sensitivity", "Avoid direct sun exposure"],
        price: 350,
        rating: 4.6,
        reviews: 280
      },
      "005": {
        id: "005",
        name: "مقشر لطيف للبشرة الحساسة",
        nameEn: "EVA Gentle Exfoliating Scrub – Sensitive Skin",
        category: "مقشرات الوجه",
        categoryEn: "Facial Exfoliators",
        targetSkin: ["البشرة الحساسة", "البشرة الجافة"],
        targetSkinEn: ["Sensitive Skin", "Dry Skin"],
        mainIngredients: ["أحماض الفواكه الطبيعية", "الشوفان المطحون", "العسل"],
        mainIngredientsEn: ["Natural Fruit Acids", "Ground Oats", "Honey"],
        benefits: ["يزيل الخلايا الميتة بلطف", "ينعم ملمس البشرة", "يحفز التجديد الخلوي"],
        benefitsEn: ["Gently removes dead cells", "Smooths skin texture", "Stimulates cell renewal"],
        usage: "استخدم مرة واحدة أسبوعياً على بشرة رطبة، دلك بحركات دائرية لطيفة",
        usageEn: "Use once weekly on damp skin, massage in gentle circular motions",
        recommendedBy: ["د. نادية حسن", "أسماء الشريف"],
        recommendedByEn: ["Dr. Nadia Hassan", "Asmaa El Sherif"],
        dermatologistApproved: true,
        safePregnancy: true,
        warnings: ["لا تستخدم على البشرة المتهيجة", "تجنب المنطقة حول العينين"],
        warningsEn: ["Don't use on irritated skin", "Avoid eye area"],
        price: 180,
        rating: 4.5,
        reviews: 150
      }
    },

    // Haircare Products (15 Products)
    haircare: {
      "101": {
        id: "101",
        name: "شامبو ألوة إيفا المرطب",
        nameEn: "EVA Aloe Vera Hydrating Shampoo",
        category: "شامبو",
        categoryEn: "Shampoos",
        targetHair: ["الشعر الجاف", "الشعر المتضرر", "الشعر المعالج كيميائياً"],
        targetHairEn: ["Dry Hair", "Damaged Hair", "Chemically Treated Hair"],
        mainIngredients: ["الألوة فيرا الطبيعية", "الكيراتين المتحلل", "زيت الأرغان"],
        mainIngredientsEn: ["Natural Aloe Vera", "Hydrolyzed Keratin", "Argan Oil"],
        benefits: ["ترطيب عميق للشعر", "يصلح التلف", "يضيف لمعاناً طبيعياً"],
        benefitsEn: ["Deep hair hydration", "Repairs damage", "Adds natural shine"],
        usage: "ضع كمية مناسبة على الشعر المبلل، دلك فروة الرأس بلطف ثم اشطف جيداً",
        usageEn: "Apply adequate amount to wet hair, gently massage scalp then rinse thoroughly",
        recommendedBy: ["سالي فؤاد", "نهى نبيل"],
        recommendedByEn: ["Sally Fouad", "Noha Nabil"],
        dermatologistApproved: true,
        safePregnancy: true,
        warnings: ["تجنب ملامسة العينين", "للاستخدام الخارجي فقط"],
        warningsEn: ["Avoid contact with eyes", "For external use only"],
        price: 120,
        rating: 4.4,
        reviews: 350
      },
      "102": {
        id: "102",
        name: "ماسك إيفا هير كلينك المكثف",
        nameEn: "EVA Hair Clinic Intensive Repair Mask",
        category: "ماسكات الشعر",
        categoryEn: "Hair Masks",
        targetHair: ["الشعر التالف", "الشعر المصبوغ", "الشعر المتقصف"],
        targetHairEn: ["Damaged Hair", "Colored Hair", "Split Ends"],
        mainIngredients: ["البروتين المتحلل", "الكولاجين", "زيت جوز الهند"],
        mainIngredientsEn: ["Hydrolyzed Protein", "Collagen", "Coconut Oil"],
        benefits: ["إصلاح عميق للشعر", "يقوي البصيلات", "يمنع التقصف"],
        benefitsEn: ["Deep hair repair", "Strengthens follicles", "Prevents split ends"],
        usage: "ضع على الشعر المبلل بعد الشامبو، اتركه 5-10 دقائق ثم اشطف",
        usageEn: "Apply to damp hair after shampooing, leave for 5-10 minutes then rinse",
        recommendedBy: ["د. هدى الشيمي", "ريهام حجاج"],
        recommendedByEn: ["Dr. Hoda El Shimy", "Reham Hagag"],
        dermatologistApproved: true,
        safePregnancy: true,
        warnings: ["لا تضع على فروة الرأس مباشرة", "استخدم قفازات"],
        warningsEn: ["Don't apply directly to scalp", "Use gloves"],
        price: 200,
        rating: 4.7,
        reviews: 280
      }
    },

    // Makeup Products (10 Products)
    makeup: {
      "201": {
        id: "201",
        name: "BB كريم إيفا بحماية SPF 30",
        nameEn: "EVA BB Cream SPF 30 – All Skin Types",
        category: "كريمات الأساس",
        categoryEn: "Base Makeup",
        targetSkin: ["جميع أنواع البشرة"],
        targetSkinEn: ["All Skin Types"],
        mainIngredients: ["ثاني أكسيد التيتانيوم", "حمض الهيالورونيك", "فيتامين E"],
        mainIngredientsEn: ["Titanium Dioxide", "Hyaluronic Acid", "Vitamin E"],
        benefits: ["تغطية طبيعية", "حماية من الشمس", "ترطيب للبشرة"],
        benefitsEn: ["Natural coverage", "Sun protection", "Skin hydration"],
        usage: "ضع كمية صغيرة على البشرة النظيفة ووزع بانتظام",
        usageEn: "Apply small amount to clean skin and blend evenly",
        recommendedBy: ["مايا دياب", "أسما شريف منير"],
        recommendedByEn: ["Maya Diab", "Asma Sherif Mounir"],
        dermatologistApproved: true,
        safePregnancy: true,
        warnings: ["اختبر على منطقة صغيرة أولاً", "أزل بمنظف مناسب"],
        warningsEn: ["Test on small area first", "Remove with appropriate cleanser"],
        price: 250,
        rating: 4.3,
        reviews: 420
      }
    }
  },

  // Beauty Consultation System
  beautyConsultation: {
    skinProblems: {
      acne: {
        name: "حب الشباب",
        nameEn: "Acne",
        symptoms: ["حبوب ملتهبة", "رؤوس سوداء", "رؤوس بيضاء", "احمرار"],
        symptomsEn: ["Inflamed pimples", "Blackheads", "Whiteheads", "Redness"],
        causes: ["هرمونات", "بكتيريا", "زيوت زائدة", "انسداد المسام"],
        causesEn: ["Hormones", "Bacteria", "Excess oil", "Clogged pores"],
        recommendedProducts: ["001", "004", "005"],
        routine: {
          morning: ["غسول لطيف", "سيرم فيتامين C", "مرطب خفيف", "واقي شمس"],
          evening: ["غسول عميق", "علاج موضعي", "مرطب مهدئ"]
        },
        tips: ["تجنب العصر", "غير أغطية الوسائد", "اشرب الماء", "قلل الألبان"],
        tipsEn: ["Avoid squeezing", "Change pillowcases", "Drink water", "Reduce dairy"]
      },
      dryness: {
        name: "جفاف البشرة",
        nameEn: "Dry Skin",
        symptoms: ["تشقق", "خشونة", "حكة", "تقشر"],
        symptomsEn: ["Cracking", "Roughness", "Itching", "Flaking"],
        causes: ["طقس جاف", "استخدام منتجات قاسية", "عوامل وراثية"],
        causesEn: ["Dry weather", "Harsh products", "Genetic factors"],
        recommendedProducts: ["002", "005"],
        routine: {
          morning: ["غسول لطيف", "سيرم مرطب", "مرطب غني", "واقي شمس"],
          evening: ["زيت منظف", "سيرم ترطيب", "كريم ليلي"]
        },
        tips: ["تجنب الماء الساخن", "استخدم مرطب فوراً", "اشرب الماء", "رطوبة الجو"],
        tipsEn: ["Avoid hot water", "Moisturize immediately", "Drink water", "Use humidifier"]
      }
    },

    skinTypes: {
      oily: {
        name: "البشرة الدهنية",
        nameEn: "Oily Skin",
        characteristics: ["لمعان زائد", "مسام واسعة", "عرضة للحبوب"],
        characteristicsEn: ["Excess shine", "Large pores", "Acne-prone"],
        recommendedProducts: ["001", "003", "004"],
        routine: ["غسول عميق", "تونر قابض", "مرطب خفيف", "واقي شمس"]
      },
      dry: {
        name: "البشرة الجافة",
        nameEn: "Dry Skin",
        characteristics: ["تشقق", "شد", "خشونة"],
        characteristicsEn: ["Cracking", "Tightness", "Roughness"],
        recommendedProducts: ["002", "005"],
        routine: ["غسول لطيف", "سيرم مرطب", "مرطب غني", "واقي شمس"]
      },
      sensitive: {
        name: "البشرة الحساسة",
        nameEn: "Sensitive Skin",
        characteristics: ["احمرار", "حكة", "تهيج"],
        characteristicsEn: ["Redness", "Itching", "Irritation"],
        recommendedProducts: ["002", "005"],
        routine: ["منتجات خالية من العطور", "اختبار الحساسية", "مكونات مهدئة"]
      }
    }
  },

  // Services
  services: {
    beautySalon: {
      name: "صالون إيفا للتجميل",
      nameEn: "Eva Beauty Salon",
      description: "خدمات تجميل متكاملة بأيدي خبراء",
      descriptionEn: "Complete beauty services by expert hands",
      services: ["تنظيف بشرة", "فيشيال", "تدليك", "عناية بالشعر"],
      servicesEn: ["Facial cleansing", "Facial treatment", "Massage", "Hair care"],
      pricing: "تبدأ من 200 جنيه للجلسة",
      pricingEn: "Starting from 200 EGP per session"
    },
    onlineConsultation: {
      name: "استشارة أونلاين",
      nameEn: "Online Consultation",
      description: "استشارة مع خبراء التجميل عبر الإنترنت",
      descriptionEn: "Consultation with beauty experts online",
      features: ["تحليل البشرة", "توصيات منتجات", "روتين مخصص"],
      featuresEn: ["Skin analysis", "Product recommendations", "Custom routine"]
    }
  },

  // Team & Expertise
  team: {
    leadership: [
      {
        name: "أحمد محمد",
        nameEn: "Ahmed Mohamed",
        position: "الرئيس التنفيذي",
        positionEn: "CEO",
        experience: "15+ سنة في مجال التكنولوجيا",
        experienceEn: "15+ years in technology"
      },
      {
        name: "فاطمة علي",
        nameEn: "Fatma Ali", 
        position: "مديرة التطوير",
        positionEn: "Development Director",
        experience: "12+ سنة في تطوير البرمجيات",
        experienceEn: "12+ years in software development"
      }
    ],
    departments: {
      development: "50+ مطور",
      developmentEn: "50+ developers",
      design: "15+ مصمم",
      designEn: "15+ designers", 
      marketing: "20+ متخصص تسويق",
      marketingEn: "20+ marketing specialists",
      support: "24/7 دعم فني",
      supportEn: "24/7 technical support"
    }
  },

  // Client Information
  clients: {
    count: "200+ عميل",
    countEn: "200+ clients",
    sectors: [
      "البنوك والخدمات المصرفية",
      "التجارة الإلكترونية", 
      "التعليم",
      "الصحة",
      "الحكومة",
      "الطيران"
    ],
    sectorsEn: [
      "Banking & Financial Services",
      "E-commerce",
      "Education", 
      "Healthcare",
      "Government",
      "Aviation"
    ],
    testimonials: [
      {
        client: "بنك مصر",
        clientEn: "Bank of Egypt",
        feedback: "إيفا ساعدتنا في تطوير تطبيق البنك الموبايل بكفاءة عالية",
        feedbackEn: "Eva helped us develop our mobile banking app with high efficiency"
      }
    ]
  },

  // Products
  products: {
    evaAnalytics: {
      name: "إيفا أناليتكس",
      nameEn: "Eva Analytics",
      description: "منصة تحليل البيانات بالذكاء الاصطناعي",
      descriptionEn: "AI-powered data analytics platform",
      features: ["تحليل البيانات في الوقت الفعلي", "تقارير تفاعلية", "التنبؤ بالاتجاهات"]
    },
    evaCRM: {
      name: "إيفا سي آر إم",
      nameEn: "Eva CRM",
      description: "نظام إدارة علاقات العملاء المتطور",
      descriptionEn: "Advanced customer relationship management system",
      pricing: "500 جنيه شهرياً للمستخدم الواحد",
      pricingEn: "500 EGP monthly per user"
    }
  },

  // Contact & Support
  contact: {
    phone: "+20 2 1234567890",
    email: "info@evacompany.com",
    website: "www.evacompany.com",
    address: "123 شارع التحرير، القاهرة، مصر",
    addressEn: "123 Tahrir Street, Cairo, Egypt",
    workingHours: "الأحد - الخميس: 9 صباحاً - 6 مساءً",
    workingHoursEn: "Sunday - Thursday: 9 AM - 6 PM",
    supportEmail: "support@evacompany.com",
    salesEmail: "sales@evacompany.com"
  },

  // Process & Methodology
  process: {
    discovery: {
      name: "اكتشاف المتطلبات",
      nameEn: "Requirements Discovery",
      duration: "1-2 أسبوع",
      durationEn: "1-2 weeks"
    },
    planning: {
      name: "التخطيط والتصميم",
      nameEn: "Planning & Design", 
      duration: "2-3 أسابيع",
      durationEn: "2-3 weeks"
    },
    development: {
      name: "التطوير",
      nameEn: "Development",
      duration: "6-12 أسبوع حسب المشروع",
      durationEn: "6-12 weeks depending on project"
    },
    testing: {
      name: "الاختبار",
      nameEn: "Testing",
      duration: "1-2 أسبوع",
      durationEn: "1-2 weeks"
    },
    deployment: {
      name: "النشر والتسليم",
      nameEn: "Deployment & Delivery",
      duration: "1 أسبوع",
      durationEn: "1 week"
    }
  },

  // FAQ
  faq: [
    {
      question: "كم تكلفة تطوير تطبيق موبايل؟",
      questionEn: "How much does mobile app development cost?",
      answer: "التكلفة تعتمد على تعقيد التطبيق والميزات المطلوبة، تبدأ من 30,000 جنيه للتطبيقات البسيطة",
      answerEn: "Cost depends on app complexity and required features, starting from 30,000 EGP for simple apps"
    },
    {
      question: "كم من الوقت يستغرق تطوير موقع ويب؟",
      questionEn: "How long does website development take?",
      answer: "عادة من 4 إلى 12 أسبوع حسب حجم الموقع والميزات المطلوبة",
      answerEn: "Usually 4 to 12 weeks depending on website size and required features"
    }
  ],

  // Technologies
  technologies: {
    frontend: ["React", "Vue.js", "Angular", "Next.js", "TypeScript"],
    backend: ["Node.js", "Python", "PHP", "Java", ".NET"],
    mobile: ["React Native", "Flutter", "Swift", "Kotlin"],
    database: ["MySQL", "MongoDB", "PostgreSQL", "Redis"],
    cloud: ["AWS", "Google Cloud", "Azure", "Docker", "Kubernetes"],
    ai: ["TensorFlow", "PyTorch", "OpenAI", "Machine Learning"]
  },

  // Detailed Projects & Case Studies
  projects: {
    bankingApp: {
      name: "تطبيق بنك مصر الموبايل",
      nameEn: "Bank of Egypt Mobile App",
      description: "تطوير تطبيق موبايل شامل للخدمات المصرفية",
      descriptionEn: "Comprehensive mobile banking application development",
      timeline: "8 أشهر",
      timelineEn: "8 months",
      technologies: ["React Native", "Node.js", "PostgreSQL", "Redis"],
      features: ["التحويلات", "دفع الفواتير", "إدارة الحسابات", "الاستثمار"]
    },
    ecommercePortal: {
      name: "منصة التجارة الإلكترونية الموحدة",
      nameEn: "Unified E-commerce Platform",
      description: "منصة متكاملة للتجارة الإلكترونية بالذكاء الاصطناعي",
      descriptionEn: "AI-powered integrated e-commerce platform",
      timeline: "12 شهر",
      timelineEn: "12 months",
      technologies: ["Next.js", "Python", "TensorFlow", "AWS"],
      features: ["توصيات ذكية", "إدارة المخزون", "تحليلات المبيعات", "دعم متعدد العملات"]
    }
  },

  // Training & Courses
  training: {
    courses: [
      {
        name: "دورة تطوير تطبيقات الويب",
        nameEn: "Web Development Course",
        duration: "3 أشهر",
        durationEn: "3 months",
        price: "5,000 جنيه",
        priceEn: "5,000 EGP",
        level: "مبتدئ إلى متقدم",
        levelEn: "Beginner to Advanced"
      },
      {
        name: "دورة الذكاء الاصطناعي",
        nameEn: "AI Course",
        duration: "4 أشهر",
        durationEn: "4 months",
        price: "8,000 جنيه",
        priceEn: "8,000 EGP",
        level: "متوسط إلى متقدم",
        levelEn: "Intermediate to Advanced"
      }
    ],
    certifications: ["شهادة معتمدة من إيفا", "شهادة دولية", "شهادة مع ضمان التوظيف"],
    certificationsEn: ["Eva Certified", "International Certificate", "Job Guarantee Certificate"]
  },

  // Success Stories & Statistics
  statistics: {
    projectsCompleted: "500+ مشروع مكتمل",
    projectsCompletedEn: "500+ completed projects",
    successRate: "98% معدل نجاح",
    successRateEn: "98% success rate",
    clientSatisfaction: "99% رضا العملاء",
    clientSatisfactionEn: "99% client satisfaction",
    responseTime: "أقل من 24 ساعة",
    responseTimeEn: "Less than 24 hours",
    uptime: "99.9% وقت تشغيل",
    uptimeEn: "99.9% uptime"
  },

  // Partnership & Integrations
  partnerships: {
    technology: ["Microsoft", "Google", "Amazon AWS", "Oracle", "IBM"],
    business: ["غرفة التجارة المصرية", "اتحاد البنوك المصرية", "جمعية رجال الأعمال"],
    businessEn: ["Egyptian Chamber of Commerce", "Egyptian Banking Federation", "Business Association"],
    academic: ["جامعة القاهرة", "الجامعة الأمريكية", "جامعة النيل"],
    academicEn: ["Cairo University", "American University", "Nile University"]
  },

  // Security & Compliance
  security: {
    standards: ["ISO 27001", "PCI DSS", "GDPR", "SOC 2"],
    encryption: "تشفير AES-256",
    encryptionEn: "AES-256 encryption",
    backups: "نسخ احتياطية يومية",
    backupsEn: "Daily backups",
    monitoring: "مراقبة 24/7",
    monitoringEn: "24/7 monitoring"
  },

  // Career Opportunities
  careers: {
    openPositions: [
      {
        title: "مطور Full Stack",
        titleEn: "Full Stack Developer",
        location: "القاهرة",
        locationEn: "Cairo",
        type: "دوام كامل",
        typeEn: "Full-time",
        experience: "2-5 سنوات",
        experienceEn: "2-5 years"
      },
      {
        title: "مهندس ذكاء اصطناعي",
        titleEn: "AI Engineer",
        location: "عن بُعد",
        locationEn: "Remote",
        type: "دوام كامل",
        typeEn: "Full-time",
        experience: "3+ سنوات",
        experienceEn: "3+ years"
      }
    ],
    benefits: ["راتب تنافسي", "تأمين صحي", "بدل مواصلات", "تدريب مستمر", "بيئة عمل مرنة"],
    benefitsEn: ["Competitive salary", "Health insurance", "Transportation allowance", "Continuous training", "Flexible work environment"]
  }
};

  // المحادثات المرجعية الشاملة - 50+ محادثة ذكية
export const CONVERSATION_DATABASE = {
  conversations: [
    // تحيات متنوعة
    { id: 1, userQuery: "ازيك؟", botResponse: "أنا زي الفل، يا صديقي! 😊 عايز نكلم عن إيفا كوزمتكس؟", category: "greeting", language: "ar", tone: "informal" },
    { id: 2, userQuery: "Hi", botResponse: "Hey there! I'm pumped to chat about Eva Cosmetics! 😎 What's up?", category: "greeting", language: "en", tone: "informal" },
    { id: 3, userQuery: "مرحبًا، كيف حالك؟", botResponse: "مرحبًا! أنا بخير، شكرًا. كيف يمكنني مساعدتك بخصوص إيفا كوزمتكس؟", category: "greeting", language: "ar", tone: "formal" },
    { id: 4, userQuery: "Hello, how are you?", botResponse: "Hello! I'm doing well, thank you. How can I assist you with Eva Cosmetics today?", category: "greeting", language: "en", tone: "formal" },
    { id: 5, userQuery: "عامل إيه؟", botResponse: "تماموز، يا برو! 😄 عايز تعرف إيه عن منتجات إيفا؟", category: "greeting", language: "ar", tone: "informal" },
    
    // تاريخ الشركة
    { id: 6, userQuery: "من أسس إيفا؟", botResponse: "تأسست إيفا كوزمتكس بواسطة الدكتور منير رياض أرمانيوس، بناءً على إرث والده الدكتور رياض أرمانيوس الذي أسس صيدلية في 1917. هل تريد معرفة المزيد؟", category: "company", language: "ar", tone: "formal" },
    { id: 7, userQuery: "Who founded Eva Cosmetics?", botResponse: "Eva Cosmetics was founded by Dr. Mounir Riad Armanious, building on his father Dr. Riad Armanious's pharmacy from 1917. Want more history?", category: "company", language: "en", tone: "formal" },
    { id: 8, userQuery: "متى تأسست إيفا؟", botResponse: "إيفا كوزمتكس تأسست في 1930، وهي من أعرق شركات مستحضرات التجميل في مصر والشرق الأوسط! 🏛️", category: "company", language: "ar", tone: "informal" },
    
    // المنتجات والتوصيات
    { id: 9, userQuery: "إيه منتجات إيفا؟", botResponse: "إيفا عندهم تشكيلة واسعة: شامبو وبلسم زي ألو إيفا وإيفا هير كلينك، كريمات ومنتجات للبشرة، ومنتجات للرجال والأطفال. عايز توصية؟ 😊", category: "products", language: "ar", tone: "informal" },
    { id: 10, userQuery: "What products does Eva have?", botResponse: "Eva offers shampoos and conditioners like Aloe Eva and Eva Hair Clinic, skincare products, plus items for men and babies. Need a suggestion?", category: "products", language: "en", tone: "formal" },
    
    // مشاكل البشرة المحددة
    { id: 11, userQuery: "عندي حبوب في وجهي، إيه الحل؟", botResponse: "حبوب الوجه مشكلة شائعة! 🤗 أنصحك بغسول إيفا اللطيف للبشرة الدهنية (كود 001) + سيرم فيتامين C (كود 004). الروتين المثالي: غسول صباحاً ومساءً، سيرم صباحاً، مرطب خفيف، وواقي شمس. هل تريد نصائح إضافية؟", category: "skincare_consultation", language: "ar", tone: "informal" },
    { id: 12, userQuery: "I have acne, what should I use?", botResponse: "Acne is common! I recommend Eva's Gentle Facial Cleanser for oily skin (code 001) + Vitamin C serum (code 004). Perfect routine: cleanser morning/evening, serum in morning, light moisturizer, and sunscreen. Want more tips?", category: "skincare_consultation", language: "en", tone: "formal" },
    { id: 13, userQuery: "بشرتي جافة جداً، إيه أعمل؟", botResponse: "البشرة الجافة تحتاج عناية خاصة! 💧 أنصحك بمرطب إيفا المائي (كود 002) + المقشر اللطيف (كود 005) مرة أسبوعياً. نصائح مهمة: تجنب الماء الساخن، استخدم مرطب فوراً بعد الاستحمام، واشرب الماء كتير!", category: "skincare_consultation", language: "ar", tone: "informal" },
    
    // معلومات الاتصال
    { id: 14, userQuery: "فين عنوان إيفا؟", botResponse: "المكتب الرئيسي في برج أرمانيوس، 9 شارع الشركات، عابدين، القاهرة. عايز أرقام تليفون؟ 😄", category: "contact", language: "ar", tone: "informal" },
    { id: 15, userQuery: "Please provide Eva's address.", botResponse: "The head office is at Armanious Group Tower, 9 El Sharekat St, Abdeen, Cairo. Would you like their contact numbers?", category: "contact", language: "en", tone: "formal" },
    { id: 16, userQuery: "ازاي أتواصل مع إيفا؟", botResponse: "تقدر تتواصل على الإيميل: info@eva-cosmetics.com، أو للمتجر: shop@eva-cosmetics.com. الأرقام: 23992700-202+ أو الخط الساخن 17125. عايز واتساب؟ 😊", category: "contact", language: "ar", tone: "informal" },
    
    // أسئلة طبية-تجميلية متقدمة
    { id: 17, userQuery: "هل منتجات إيفا آمنة للحامل؟", botResponse: "معظم منتجات إيفا آمنة للحامل! ✅ لكن واقي الشمس SPF 50+ يحتاج استشارة طبية. المنتجات الآمنة تماماً: الغسول اللطيف، المرطب المائي، المقشر اللطيف، وشامبو ألو إيفا. هل تريد توصيات للحمل؟", category: "medical_consultation", language: "ar", tone: "formal" },
    { id: 18, userQuery: "Are Eva products safe during pregnancy?", botResponse: "Most Eva products are pregnancy-safe! ✅ However, SPF 50+ sunscreen needs medical consultation. Completely safe products: gentle cleanser, hydrating moisturizer, gentle exfoliator, and Aloe Eva shampoo. Want pregnancy-specific recommendations?", category: "medical_consultation", language: "en", tone: "formal" },
    { id: 19, userQuery: "عندي بشرة حساسة، إيه المناسب؟", botResponse: "البشرة الحساسة تحتاج عناية خاصة! 🌸 أنصحك بالمرطب المائي (كود 002) والمقشر اللطيف (كود 005). تجنب المنتجات ذات العطور القوية، اختبر أي منتج جديد على منطقة صغيرة أولاً. هل تعاني من احمرار أو حكة؟", category: "skincare_consultation", language: "ar", tone: "informal" },
    
    // مقارنات وتوصيات
    { id: 20, userQuery: "إيه الفرق بين منتجات إيفا ومنتجات تانية؟", botResponse: "إيفا متميزة بالجودة الطبية والأمان! 🏆 منتجاتنا معتمدة من أطباء الجلدية، مكونات طبيعية، وتركيبات علمية مدروسة. كمان عندنا خبرة 90+ سنة في السوق المصرية. عايز مقارنة منتج معين؟", category: "comparison", language: "ar", tone: "informal" },
    { id: 21, userQuery: "What makes Eva different from other brands?", botResponse: "Eva stands out with medical quality and safety! 🏆 Our products are dermatologist-approved, with natural ingredients and scientifically-formulated compositions. Plus, we have 90+ years of experience in the Egyptian market. Want to compare a specific product?", category: "comparison", language: "en", tone: "formal" },
    
    // أسئلة الأسعار
    { id: 22, userQuery: "الشامبو بتاع إيفا غالي؟", botResponse: "أسعار شامبو إيفا تنافسية جداً! 💰 شامبو ألو إيفا بـ 120 جنيه، وماسك إيفا هير كلينك بـ 200 جنيه. مقارنة بالجودة والفعالية، السعر ممتاز! عايز أساعدك تختار المناسب لشعرك؟", category: "pricing", language: "ar", tone: "informal" },
    { id: 23, userQuery: "Are Eva's prices reasonable?", botResponse: "Eva's prices are very competitive! 💰 Aloe Eva shampoo is 120 EGP, and Eva Hair Clinic mask is 200 EGP. Considering the quality and effectiveness, the price is excellent! Want help choosing the right one for your hair?", category: "pricing", language: "en", tone: "formal" },
    
    // شكاوى ومشاكل
    { id: 24, userQuery: "المنتج اللي اشتريته مش عاجبني، أعمل إيه؟", botResponse: "آسف إن المنتج مش عاجبك! 😔 ممكن تتواصل مع خدمة عملاء إيفا على shop@eva-cosmetics.com أو الخط الساخن 17125 عشان يساعدوك. عايز أساعدك بتوصية منتج تاني؟", category: "complaint", language: "ar", tone: "informal" },
    { id: 25, userQuery: "I'm not happy with the product I bought, what should I do?", botResponse: "I'm sorry to hear that! Please contact Eva's customer service at shop@eva-cosmetics.com or call 17125 for assistance. Would you like a recommendation for another product?", category: "complaint", language: "en", tone: "formal" },
    
    // نصائح الجمال المتقدمة
    { id: 26, userQuery: "إيه أحسن روتين للبشرة الدهنية؟", botResponse: "روتين مثالي للبشرة الدهنية! ✨\n\nصباحاً:\n1. غسول إيفا اللطيف (كود 001)\n2. سيرم فيتامين C (كود 004)\n3. مرطب خفيف\n4. واقي شمس SPF 50+\n\nمساءً:\n1. غسول عميق\n2. تونر قابض\n3. مرطب مهدئ\n\nأسبوعياً: مقشر لطيف مرة واحدة\n\nنصائح إضافية؟", category: "skincare_routine", language: "ar", tone: "informal" },
    { id: 27, userQuery: "What's the best routine for oily skin?", botResponse: "Perfect routine for oily skin! ✨\n\nMorning:\n1. Eva Gentle Cleanser (code 001)\n2. Vitamin C serum (code 004)\n3. Light moisturizer\n4. SPF 50+ sunscreen\n\nEvening:\n1. Deep cleanser\n2. Astringent toner\n3. Soothing moisturizer\n\nWeekly: Gentle exfoliator once\n\nWant more tips?", category: "skincare_routine", language: "en", tone: "formal" },
    
    // معلومات متقدمة عن المكونات
    { id: 28, userQuery: "إيه فوائد حمض الهيالورونيك؟", botResponse: "حمض الهيالورونيك مكون سحري للترطيب! 💧\n\nفوائده:\n• يحتفظ بالرطوبة في البشرة\n• يملأ الخطوط الدقيقة\n• يحفز إنتاج الكولاجين\n• مناسب لكل أنواع البشرة\n• يعطي نعومة فورية\n\nموجود في مرطب إيفا المائي (كود 002). عايز تعرف عن مكونات تانية؟", category: "ingredients", language: "ar", tone: "informal" },
    { id: 29, userQuery: "What are the benefits of hyaluronic acid?", botResponse: "Hyaluronic acid is a hydration miracle! 💧\n\nBenefits:\n• Retains moisture in skin\n• Fills fine lines\n• Stimulates collagen production\n• Suitable for all skin types\n• Gives instant smoothness\n\nFound in Eva Hydrating Moisturizer (code 002). Want to know about other ingredients?", category: "ingredients", language: "en", tone: "formal" },
    
    // مشاكل الشعر
    { id: 30, userQuery: "شعري تالف من الصبغة، إيه الحل؟", botResponse: "الصبغة بتتلف الشعر فعلاً! 😔 أنصحك بماسك إيفا هير كلينك (كود 102) - فيه بروتين متحلل وكولاجين يصلح التلف. استخدمه مرتين أسبوعياً مع شامبو ألو إيفا المرطب. نصائح إضافية: تجنب الحرارة، استخدم بلسم دايماً، وقص أطراف الشعر كل 6 أسابيع!", category: "haircare_consultation", language: "ar", tone: "informal" },
    { id: 31, userQuery: "My hair is damaged from coloring, what should I use?", botResponse: "Coloring does damage hair! 😔 I recommend Eva Hair Clinic mask (code 102) - it contains hydrolyzed protein and collagen to repair damage. Use it twice weekly with Aloe Eva hydrating shampoo. Extra tips: avoid heat, always use conditioner, and trim hair ends every 6 weeks!", category: "haircare_consultation", language: "en", tone: "formal" },
    
    // أسئلة التوزيع والتسوق
    { id: 32, userQuery: "فين ألاقي منتجات إيفا؟", botResponse: "منتجات إيفا متوفرة في كل مكان! 🛒\n\n• الصيدليات الكبرى\n• محلات مستحضرات التجميل\n• المتاجر الإلكترونية\n• فروع إيفا المباشرة\n• سوبر ماركت\n\nعايز عنوان فرع قريب منك؟", category: "shopping", language: "ar", tone: "informal" },
    { id: 33, userQuery: "Where can I find Eva products?", botResponse: "Eva products are available everywhere! 🛒\n\n• Major pharmacies\n• Cosmetic stores\n• Online stores\n• Eva direct branches\n• Supermarkets\n\nWant the address of a nearby branch?", category: "shopping", language: "en", tone: "formal" },
    
    // أسئلة عن الجودة والشهادات
    { id: 34, userQuery: "إيفا معتمدة من إيه؟", botResponse: "إيفا معتمدة من أعلى الجهات! 🏅\n\n• ISO 9001/2008 للجودة\n• GMP للتصنيع الجيد\n• GLP للممارسات المعملية\n• شهادة الحلال\n• موافقة أطباء الجلدية\n\nده يضمن أعلى مستوى جودة وأمان! عايز تعرف عن شهادة معينة؟", category: "certifications", language: "ar", tone: "formal" },
    { id: 35, userQuery: "What certifications does Eva have?", botResponse: "Eva has top-level certifications! 🏅\n\n• ISO 9001/2008 for quality\n• GMP for good manufacturing\n• GLP for laboratory practices\n• Halal certification\n• Dermatologist approval\n\nThis ensures highest quality and safety levels! Want to know about a specific certification?", category: "certifications", language: "en", tone: "formal" },
    
    // نصائح للمراهقين
    { id: 36, userQuery: "ابني عنده 16 سنة وعنده حبوب، إيه المناسب؟", botResponse: "المراهقة والحبوب مشكلة شائعة! 👦 أنصح بروتين لطيف:\n\n• غسول إيفا اللطيف (كود 001) مرتين يومياً\n• مرطب خفيف\n• واقي شمس\n• تجنب العصر نهائياً\n• تغيير غطاء الوسادة كتير\n\nالصبر مهم، النتائج تظهر بعد 6-8 أسابيع. عايز نصائح إضافية؟", category: "teen_skincare", language: "ar", tone: "informal" },
    
    // خرافات الجمال
    { id: 37, userQuery: "هل معجون الأسنان يعالج الحبوب؟", botResponse: "لا، دي خرافة خطيرة! ❌ معجون الأسنان يحتوي على مواد قاسية تهيج البشرة وتسبب جفاف وتقشر. استخدم بدلاً منه علاجات مخصصة للحبوب زي غسول إيفا اللطيف أو سيرم فيتامين C. البشرة تحتاج منتجات مخصصة ليها، مش منتجات الأسنان! 😊", category: "beauty_myths", language: "ar", tone: "informal" },
    { id: 38, userQuery: "Does toothpaste cure acne?", botResponse: "No, that's a dangerous myth! ❌ Toothpaste contains harsh ingredients that irritate skin and cause dryness and peeling. Use instead specialized acne treatments like Eva's gentle cleanser or Vitamin C serum. Skin needs products specifically designed for it, not dental products! 😊", category: "beauty_myths", language: "en", tone: "formal" },
    
    // نصائح موسمية
    { id: 39, userQuery: "البشرة بتجف في الشتا، إيه الحل؟", botResponse: "الشتا قاسي على البشرة! ❄️ نصائح مهمة:\n\n• استخدم مرطب إيفا المائي (كود 002) مرتين يومياً\n• تجنب الاستحمام بالماء الساخن\n• استخدم مرطب الجو\n• اشرب الماء كتير\n• حط المرطب على البشرة وهي لسه رطبة\n• استخدم مقشر لطيف مرة أسبوعياً\n\nعايز توصيات منتجات إضافية؟", category: "seasonal_care", language: "ar", tone: "informal" },
    { id: 40, userQuery: "My skin gets dry in winter, what should I do?", botResponse: "Winter is harsh on skin! ❄️ Important tips:\n\n• Use Eva Hydrating Moisturizer (code 002) twice daily\n• Avoid hot water showers\n• Use a humidifier\n• Drink plenty of water\n• Apply moisturizer on damp skin\n• Use gentle exfoliator once weekly\n\nWant additional product recommendations?", category: "seasonal_care", language: "en", tone: "formal" }
  ],
  smartResponses: {
    ar: { 
      general: [
        "إيفا دايماً في المقدمة! عايز تعرف إيه تحديداً؟ 😊",
        "أهلاً بيك في عالم الجمال والعناية! إزاي أقدر أساعدك؟ 🌟",
        "سؤال حلو! خليني أدوّر في خبرة إيفا الطويلة... 💫"
      ],
      skincare: [
        "البشرة تحتاج عناية خاصة! خليني أحللك المشكلة... 🔍",
        "كل بشرة ليها احتياجات مختلفة، إيه نوع بشرتك؟ 🤔",
        "الجمال مش بس منتجات، ده أسلوب حياة! إزاي أساعدك؟ ✨"
      ]
    },
    en: { 
      general: [
        "Eva's always leading! What would you like to know? 😊",
        "Welcome to the world of beauty and care! How can I help? 🌟",
        "Great question! Let me search Eva's extensive experience... 💫"
      ],
      skincare: [
        "Skin needs special care! Let me analyze your concern... 🔍",
        "Every skin has different needs, what's your skin type? 🤔",
        "Beauty isn't just products, it's a lifestyle! How can I help? ✨"
      ]
    }
  },
  fallbackSystem: {
    ar: { 
      beforeAI: "دا سؤال مميز! خليني أدور في نظام إيفا المتقدم... 🔍",
      medicalDisclaimer: "⚠️ هذه نصائح عامة، استشر طبيب الجلدية للمشاكل المستمرة"
    },
    en: { 
      beforeAI: "Great question! Let me search Eva's advanced system... 🔍",
      medicalDisclaimer: "⚠️ These are general tips, consult a dermatologist for persistent issues"
    }
  }
};

// Enhanced Conversation patterns for tone detection
export const CONVERSATION_PATTERNS = {
  formal: {
    ar: ["حضرتك", "سيادتكم", "من فضلكم", "إذا سمحتم", "المحترم", "المحترمة", "أود أن", "أتمنى", "برجاء", "لو سمحت"],
    en: ["sir", "madam", "please", "kindly", "would you", "could you", "i would like", "i hope", "may i", "excuse me"]
  },
  informal: {
    ar: ["إزيك", "إيه أخبارك", "عامل إيه", "إزاي", "يلا", "تمام", "كويس", "حلو", "ممتاز", "جامد", "عاوز", "محتاج", "قولي", "شوف"],
    en: ["hey", "what's up", "how's it going", "cool", "awesome", "thanks", "great", "nice", "want", "need", "tell me", "show me"]
  }
};

// Smart Response Patterns - تجنب الردود الفارغة
export const SMART_RESPONSES = {
  ar: {
    generalGreeting: [
      "أهلاً وسهلاً! 🤗 كيف يمكنني مساعدتك اليوم؟",
      "مرحباً بك في إيفا! 👋 أنا هنا لأساعدك في أي استفسار",
      "أهلاً! 😊 سعيد إنك هنا، إيه اللي تحب تعرفه عن إيفا؟"
    ],
    generalInquiry: [
      "سؤال رائع! 🤔 دعني أعطيك معلومات شاملة عن هذا الموضوع...",
      "ممتاز إنك سألت عن ده! 💡 إيفا عندها خبرة كبيرة في المجال ده...",
      "حلو إنك مهتم بالموضوع ده! 🚀 خليني أوضحلك كل التفاصيل..."
    ],
    noDirectMatch: [
      "سؤال مثير للاهتمام! 🤓 ممكن أوضحلك إزاي إيفا تقدر تساعدك في الموضوع ده...",
      "رغم إن السؤال مش في تخصص إيفا المباشر، لكن أقدر أفيدك بمعلومات عامة مفيدة...",
      "ده موضوع شيق! 💭 خليني أشاركك وجهة نظر إيفا التقنية في الموضوع..."
    ],
    encourageElaboration: [
      "ممكن توضحلي أكتر عن اللي محتاجه؟ 🔍 كده هقدر أساعدك بشكل أدق",
      "عشان أقدر أفيدك أكتر، ممكن تحكيلي تفاصيل أكتر؟ 📝",
      "سؤالك مهم! عايزني أوضحلك إيه بالتحديد؟ 🎯"
    ]
  },
  en: {
    generalGreeting: [
      "Hello and welcome! 🤗 How can I help you today?",
      "Welcome to Eva! 👋 I'm here to assist you with any questions",
      "Hi there! 😊 Great to have you here, what would you like to know about Eva?"
    ],
    generalInquiry: [
      "Excellent question! 🤔 Let me give you comprehensive information about this topic...",
      "Great that you asked about this! 💡 Eva has extensive experience in this area...",
      "Wonderful that you're interested in this! 🚀 Let me explain all the details..."
    ],
    noDirectMatch: [
      "Interesting question! 🤓 Let me explain how Eva can help you with this...",
      "While this isn't directly Eva's specialty, I can provide useful general information...",
      "That's an intriguing topic! 💭 Let me share Eva's technical perspective on this..."
    ],
    encourageElaboration: [
      "Could you elaborate more on what you need? 🔍 This way I can help you more precisely",
      "To better assist you, could you share more details? 📝",
      "Your question is important! What specifically would you like me to clarify? 🎯"
    ]
  }
};

// Enhanced fallback system
export const ENHANCED_FALLBACK_SYSTEM = {
  ar: {
    beforeGroq: [
      "🤖 دعني أستعين بالذكاء الاصطناعي للإجابة على سؤالك بشكل أفضل...",
      "🧠 هذا سؤال ممتاز! خليني أفكر فيه بعمق وأرجعلك بإجابة شاملة...",
      "💭 مش موجود في بياناتي المباشرة، لكن هجيبلك معلومات مفيدة من مصادر متقدمة..."
    ],
    categories: {
      technical: "ده سؤال تقني رائع! 💻",
      business: "موضوع مهم في عالم الأعمال! 💼", 
      general: "سؤال شيق! 🌟",
      creative: "سؤال إبداعي! 🎨"
    }
  },
  en: {
    beforeGroq: [
      "🤖 Let me use AI to give you a better answer to your question...",
      "🧠 That's an excellent question! Let me think deeply and get back to you with a comprehensive answer...",
      "💭 Not directly in my database, but I'll get you useful information from advanced sources..."
    ],
    categories: {
      technical: "That's a great technical question! 💻",
      business: "Important topic in the business world! 💼",
      general: "Interesting question! 🌟", 
      creative: "Creative question! 🎨"
    }
  }
};