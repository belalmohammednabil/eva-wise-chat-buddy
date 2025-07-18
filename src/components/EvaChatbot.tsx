import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Globe, Mic, MicOff, Volume2, VolumeX, Settings, RefreshCw, Copy, Download, ChevronDown, Stethoscope, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { EVA_COMPANY_DATA, CONVERSATION_DATABASE, CONVERSATION_PATTERNS } from '@/data/evaData';
import { GroqService, detectLanguage, detectTone } from '@/services/groqService';
import evaLogo from '@/assets/eva-logo-official.png';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  language: 'ar' | 'en';
  tone?: 'formal' | 'informal';
  source?: 'eva' | 'groq';
  productRecommendations?: string[];
  medicalAdvice?: boolean;
}

interface ChatbotProps {
  apiKey?: string;
}

interface SkinAnalysis {
  skinType: string;
  problems: string[];
  recommendations: string[];
  routine: string[];
}

const EvaChatbot: React.FC<ChatbotProps> = ({ apiKey = 'demo-key' }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState<'ar' | 'en'>('ar');
  const [detectedTone, setDetectedTone] = useState<'formal' | 'informal'>('informal');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [groqService] = useState(() => new GroqService(apiKey));
  const [conversationMode, setConversationMode] = useState<'smart' | 'eva-only' | 'ai-only'>('smart');
  const [skinAnalysis, setSkinAnalysis] = useState<SkinAnalysis | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const { toast } = useToast();

  // Initialize with welcome message
  useEffect(() => {
    const welcomeMessage: Message = {
      id: '1',
      content: language === 'ar' 
        ? 'أهلاً وسهلاً! أنا مساعد إيفا الذكي للجمال والعناية 💄✨\n\nأنا هنا عشان أساعدك في:\n🌸 تحليل نوع بشرتك وحل مشاكلها\n💅 اختيار المنتجات المناسبة علمياً\n🧴 بناء روتين عناية مثالي\n👩‍⚕️ نصائح طبية-تجميلية آمنة\n🛍️ توصيات منتجات إيفا المناسبة\n\nاكتب أو سجل رسالة صوتية عن مشكلتك، وأنا هاحللك الوضع وأديك الحل المناسب! 😊'
        : 'Hello and welcome! I\'m Eva\'s smart beauty and care assistant 💄✨\n\nI\'m here to help you with:\n🌸 Analyzing your skin type and solving problems\n💅 Choosing scientifically suitable products\n🧴 Building the perfect care routine\n👩‍⚕️ Safe medical-cosmetic advice\n🛍️ Eva product recommendations\n\nWrite or record a voice message about your concern, and I\'ll analyze your situation and give you the right solution! 😊',
      isUser: false,
      timestamp: new Date(),
      language,
      tone: 'informal',
      source: 'eva'
    };
    setMessages([welcomeMessage]);
  }, []);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Enhanced Eva data search with comprehensive matching - NO EMPTY RESPONSES
  const searchEvaData = (query: string, userLanguage: 'ar' | 'en'): string | null => {
    const lowerQuery = query.toLowerCase();
    const data = EVA_COMPANY_DATA;
    
    // First check the conversation database for exact or similar matches
    const matchingConversations = CONVERSATION_DATABASE.conversations.filter(conv => {
      const queryLower = conv.userQuery.toLowerCase();
      return queryLower.includes(lowerQuery) || lowerQuery.includes(queryLower) ||
             conv.userQuery.split(' ').some(word => lowerQuery.includes(word.toLowerCase()));
    });

    if (matchingConversations.length > 0) {
      // Sort by language match and return the best match
      const languageMatches = matchingConversations.filter(conv => conv.language === userLanguage);
      if (languageMatches.length > 0) {
        return languageMatches[0].botResponse;
      }
      return matchingConversations[0].botResponse;
    }

    const names = ['حبيبي', 'صديقي', 'بطل', 'محترم', 'استاذ', 'يا فندم'];
    const englishNames = ['buddy', 'friend', 'dear', 'sir', 'mate'];

    // Enhanced greetings detection
    if (lowerQuery.includes('hello') || lowerQuery.includes('hi') || lowerQuery.includes('أهلا') ||
        lowerQuery.includes('مرحبا') || lowerQuery.includes('السلام') || lowerQuery.includes('صباح') ||
        lowerQuery.includes('مساء') || lowerQuery.includes('إزيك') || lowerQuery.includes('ازيك') ||
        lowerQuery.includes('ازاي') || lowerQuery.includes('عامل') || lowerQuery.includes('اخبارك') ||
        lowerQuery.includes('أزيك') || lowerQuery.includes('ايه أخبارك') || lowerQuery.includes('إيه أخبارك') ||
        lowerQuery.includes('good morning') || lowerQuery.includes('good evening') || lowerQuery.includes('hey') ||
        lowerQuery.includes('what\'s up') || lowerQuery.includes('whats up')) {
      return userLanguage === 'ar'
        ? `أهلاً وسهلاً! ${names[Math.floor(Math.random() * names.length)]} 🌟 أنا مساعد إيفا الذكي، هنا علشان أساعدك في كل اللي تحتاجه!\n\n🚀 أقدر أساعدك في:\n• معرفة خدماتنا ومنتجاتنا الكاملة\n• معلومات عن الأسعار والعروض الحالية\n• تفاصيل المشاريع والتدريبات المتاحة\n• التواصل مع الفريق والدعم الفني\n• نصائح للعناية والجمال\n• معلومات عن جودة وشهادات إيفا\n\n💬 ممكن تسألني عن أي حاجة تخص إيفا أو أي استفسار تقني عام! إزاي أقدر أساعدك النهاردة؟ 😊`
        : `Hello there! ${englishNames[Math.floor(Math.random() * englishNames.length)]} 🌟 I'm Eva's intelligent assistant, here to help you with everything you need!\n\n🚀 I can assist you with:\n• Complete information about our services and products\n• Current pricing and promotional offers\n• Available projects and training details\n• Team contact and technical support\n• Beauty and care tips\n• Information about Eva's quality and certifications\n\n💬 Feel free to ask me anything about Eva or any general technical questions! How can I help you today? 😊`;
    }
    
    // Company information - expanded
    if (lowerQuery.includes('company') || lowerQuery.includes('شركة') || lowerQuery.includes('إيفا') || 
        lowerQuery.includes('eva') || lowerQuery.includes('about') || lowerQuery.includes('عن') ||
        lowerQuery.includes('تأسست') || lowerQuery.includes('founded') || lowerQuery.includes('history')) {
      return userLanguage === 'ar' 
        ? `🏢 شركة إيفا - قصة نجاح تقنية مميزة!\n\n📅 تأسست: ${data.company.established}\n📍 المقر الرئيسي: ${data.company.headquarters}\n🏢 الفروع: ${data.company.branches.join(' • ')}\n👥 فريق العمل: ${data.company.employees}\n💰 الإيرادات: ${data.company.revenue}\n📈 النمو: ${data.company.growth}\n\n🏆 الجوائز:\n${data.company.awards.map(award => `• ${award}`).join('\n')}\n\n📜 الشهادات:\n${data.company.certifications.join(' • ')}\n\n✨ رسالتنا: ${data.company.mission}\n🎯 رؤيتنا: ${data.company.vision}\n\n💡 قيمنا الأساسية:\n${data.company.values.map(value => `• ${value}`).join('\n')}\n\nإحنا مش مجرد شركة تكنولوجيا، إحنا شركاء نجاحك في العصر الرقمي! 🚀`
        : `🏢 Eva Company - A Distinguished Tech Success Story!\n\n📅 Established: ${data.company.established}\n📍 Headquarters: ${data.company.headquartersEn}\n🏢 Branches: ${data.company.branchesEn.join(' • ')}\n👥 Team: ${data.company.employees}\n💰 Revenue: ${data.company.revenueEn}\n📈 Growth: ${data.company.growthEn}\n\n🏆 Awards:\n${data.company.awardsEn.map(award => `• ${award}`).join('\n')}\n\n📜 Certifications:\n${data.company.certifications.join(' • ')}\n\n✨ Our mission: ${data.company.missionEn}\n🎯 Our vision: ${data.company.visionEn}\n\n💡 Core values:\n${data.company.valuesEn.map(value => `• ${value}`).join('\n')}\n\nWe're not just a tech company, we're your success partners in the digital age! 🚀`;
    }

    // Services - comprehensive
    if (lowerQuery.includes('service') || lowerQuery.includes('خدمة') || lowerQuery.includes('خدمات') || 
        lowerQuery.includes('development') || lowerQuery.includes('تطوير') || lowerQuery.includes('solutions') ||
        lowerQuery.includes('حلول') || lowerQuery.includes('products') || lowerQuery.includes('منتجات')) {
      const services = Object.values(data.services);
      const servicesList = services.map((service, index) => 
        userLanguage === 'ar' 
          ? `${index + 1}. 💼 ${service.name}:\n   📝 ${service.description}${'pricing' in service ? `\n   💰 السعر: ${service.pricing}` : ''}`
          : `${index + 1}. 💼 ${service.nameEn}:\n   📝 ${service.descriptionEn}${'pricingEn' in service ? `\n   💰 Price: ${service.pricingEn}` : ''}`
      ).join('\n\n');
      
      return userLanguage === 'ar'
        ? `🚀 خدماتنا المتميزة والشاملة:\n\n${servicesList}\n\n📊 إحصائياتنا المشرّفة:\n• ${data.statistics.projectsCompleted}\n• ${data.statistics.successRate}\n• ${data.statistics.clientSatisfaction}\n• وقت الاستجابة: ${data.statistics.responseTime}\n\n🎯 عايز تعرف تفاصيل أكتر عن خدمة معينة؟ اسألني براحتك! أو لو محتاج استشارة مجانية، أنا هنا! 💪`
        : `🚀 Our Distinguished and Comprehensive Services:\n\n${servicesList}\n\n📊 Our Outstanding Statistics:\n• ${data.statistics.projectsCompletedEn}\n• ${data.statistics.successRateEn}\n• ${data.statistics.clientSatisfactionEn}\n• Response time: ${data.statistics.responseTimeEn}\n\n🎯 Want to know more details about a specific service? Just ask! Or if you need a free consultation, I'm here! 💪`;
    }

    // Projects and case studies
    if (lowerQuery.includes('project') || lowerQuery.includes('مشروع') || lowerQuery.includes('مشاريع') ||
        lowerQuery.includes('portfolio') || lowerQuery.includes('case') || lowerQuery.includes('دراسة حالة') ||
        lowerQuery.includes('examples') || lowerQuery.includes('أمثلة')) {
      const projects = Object.values(data.projects);
      const projectsList = projects.map((project, index) =>
        userLanguage === 'ar'
          ? `${index + 1}. 🎯 ${project.name}:\n   📋 ${project.description}\n   ⏰ المدة: ${project.timeline}\n   🛠️ التقنيات: ${project.technologies.join(', ')}\n   ✨ الميزات: ${project.features.join(' • ')}`
          : `${index + 1}. 🎯 ${project.nameEn}:\n   📋 ${project.descriptionEn}\n   ⏰ Timeline: ${project.timelineEn}\n   🛠️ Technologies: ${project.technologies.join(', ')}\n   ✨ Features: ${project.features.join(' • ')}`
      ).join('\n\n');
      
      return userLanguage === 'ar'
        ? `💼 مشاريعنا الناجحة والمميزة:\n\n${projectsList}\n\n📈 ${data.statistics.projectsCompleted} مع ${data.statistics.successRate}\n\nكل مشروع بنعمله بحب واهتمام عشان نضمن نجاحك! 🌟 عايز تشوف مشاريع أكتر؟ أو عايز نبدأ مشروعك؟`
        : `💼 Our Successful and Distinguished Projects:\n\n${projectsList}\n\n📈 ${data.statistics.projectsCompletedEn} with ${data.statistics.successRateEn}\n\nEvery project we create with love and attention to ensure your success! 🌟 Want to see more projects? Or want to start your project?`;
    }

    // Training and courses
    if (lowerQuery.includes('training') || lowerQuery.includes('تدريب') || lowerQuery.includes('course') ||
        lowerQuery.includes('دورة') || lowerQuery.includes('دورات') || lowerQuery.includes('learning') ||
        lowerQuery.includes('تعلم') || lowerQuery.includes('education') || lowerQuery.includes('تعليم')) {
      const courses = data.training.courses;
      const coursesList = courses.map((course, index) =>
        userLanguage === 'ar'
          ? `${index + 1}. 📚 ${course.name}:\n   ⏰ المدة: ${course.duration}\n   💰 السعر: ${course.price}\n   📊 المستوى: ${course.level}`
          : `${index + 1}. 📚 ${course.nameEn}:\n   ⏰ Duration: ${course.durationEn}\n   💰 Price: ${course.priceEn}\n   📊 Level: ${course.levelEn}`
      ).join('\n\n');
      
      return userLanguage === 'ar'
        ? `🎓 دوراتنا التدريبية المتخصصة:\n\n${coursesList}\n\n🏆 الشهادات المتاحة:\n${data.training.certifications.map(cert => `• ${cert}`).join('\n')}\n\n💼 مع إيفا، التعلم مش مجرد معلومات، ده استثمار في مستقبلك المهني! عايز تعرف أكتر عن دورة معينة؟`
        : `🎓 Our Specialized Training Courses:\n\n${coursesList}\n\n🏆 Available Certifications:\n${data.training.certificationsEn.map(cert => `• ${cert}`).join('\n')}\n\n💼 With Eva, learning isn't just information, it's an investment in your professional future! Want to know more about a specific course?`;
    }

    // Contact information - enhanced
    if (lowerQuery.includes('contact') || lowerQuery.includes('تواصل') || lowerQuery.includes('رقم') || 
        lowerQuery.includes('ايميل') || lowerQuery.includes('email') || lowerQuery.includes('phone') ||
        lowerQuery.includes('address') || lowerQuery.includes('عنوان') || lowerQuery.includes('location') ||
        lowerQuery.includes('موقع') || lowerQuery.includes('اتصال') || lowerQuery.includes('call')) {
      return userLanguage === 'ar'
        ? `📞 معلومات التواصل الكاملة:\n\n🏢 المقر الرئيسي:\n📍 ${data.contact.address}\n\n📱 أرقام التواصل:\n• الهاتف الرئيسي: ${data.contact.phone}\n\n📧 البريد الإلكتروني:\n• الإيميل العام: ${data.contact.email}\n• الدعم الفني: ${data.contact.supportEmail}\n• المبيعات: ${data.contact.salesEmail}\n\n🌐 الموقع الإلكتروني: ${data.contact.website}\n\n🕒 ساعات العمل: ${data.contact.workingHours}\n\n🏢 فروعنا الأخرى:\n${data.company.branches.map(branch => `• ${branch}`).join('\n')}\n\n💬 إحنا دايماً مستعدين نساعدك! اتصل بينا في أي وقت! 🤝`
        : `📞 Complete Contact Information:\n\n🏢 Headquarters:\n📍 ${data.contact.addressEn}\n\n📱 Contact Numbers:\n• Main Phone: ${data.contact.phone}\n\n📧 Email Addresses:\n• General Email: ${data.contact.email}\n• Technical Support: ${data.contact.supportEmail}\n• Sales: ${data.contact.salesEmail}\n\n🌐 Website: ${data.contact.website}\n\n🕒 Working Hours: ${data.contact.workingHoursEn}\n\n🏢 Other Branches:\n${data.company.branchesEn.map(branch => `• ${branch}`).join('\n')}\n\n💬 We're always ready to help! Contact us anytime! 🤝`;
    }

    // Pricing - comprehensive
    if (lowerQuery.includes('price') || lowerQuery.includes('cost') || lowerQuery.includes('سعر') || 
        lowerQuery.includes('تكلفة') || lowerQuery.includes('فلوس') || lowerQuery.includes('budget') ||
        lowerQuery.includes('quote') || lowerQuery.includes('عرض سعر') || lowerQuery.includes('ميزانية')) {
      return userLanguage === 'ar'
        ? `💰 أسعارنا التنافسية والمرنة:\n\n🏗️ الخدمات الأساسية:\n• تطوير التطبيقات: ${data.services.softwareDevelopment.pricing}\n• نظام إدارة العملاء: ${data.products.evaCRM.pricing}\n\n📚 الدورات التدريبية:\n${data.training.courses.map(course => `• ${course.name}: ${course.price}`).join('\n')}\n\n⭐ العوامل المؤثرة على السعر:\n• تعقيد المشروع والميزات المطلوبة\n• التقنيات المستخدمة\n• المدة الزمنية المطلوبة\n• حجم الفريق المطلوب\n• مستوى الدعم المطلوب\n\n🎯 مميزات خاصة:\n• استشارة مجانية أولى\n• ضمان الجودة\n• دعم فني مستمر\n• أسعار مرنة حسب الميزانية\n\n💼 عايز عرض سعر مخصوص؟ احكيلي عن مشروعك وهاعملك عرض مناسب لميزانيتك! 🤝`
        : `💰 Our Competitive and Flexible Pricing:\n\n🏗️ Core Services:\n• Software Development: ${data.services.softwareDevelopment.pricingEn}\n• CRM System: ${data.products.evaCRM.pricingEn}\n\n📚 Training Courses:\n${data.training.courses.map(course => `• ${course.nameEn}: ${course.priceEn}`).join('\n')}\n\n⭐ Factors Affecting Price:\n• Project complexity and required features\n• Technologies used\n• Required timeline\n• Team size needed\n• Level of support required\n\n🎯 Special Benefits:\n• Free initial consultation\n• Quality guarantee\n• Continuous technical support\n• Flexible pricing based on budget\n\n💼 Want a custom quote? Tell me about your project and I'll create a suitable offer for your budget! 🤝`;
    }

    // Team and careers
    if (lowerQuery.includes('team') || lowerQuery.includes('فريق') || lowerQuery.includes('موظف') || 
        lowerQuery.includes('staff') || lowerQuery.includes('employees') || lowerQuery.includes('career') ||
        lowerQuery.includes('وظيفة') || lowerQuery.includes('وظائف') || lowerQuery.includes('job') ||
        lowerQuery.includes('work') || lowerQuery.includes('شغل') || lowerQuery.includes('hiring')) {
      const positions = data.careers.openPositions;
      const positionsList = positions.map((pos, index) =>
        userLanguage === 'ar'
          ? `${index + 1}. 💼 ${pos.title}\n   📍 المكان: ${pos.location}\n   ⏰ النوع: ${pos.type}\n   📊 الخبرة: ${pos.experience}`
          : `${index + 1}. 💼 ${pos.titleEn}\n   📍 Location: ${pos.locationEn}\n   ⏰ Type: ${pos.typeEn}\n   📊 Experience: ${pos.experienceEn}`
      ).join('\n\n');
      
      return userLanguage === 'ar'
        ? `👥 فريق العمل المتميز وفرص العمل:\n\n🌟 فريقنا الحالي:\n👨‍💻 ${data.team.departments.development}\n🎨 ${data.team.departments.design}\n📈 ${data.team.departments.marketing}\n🛠️ ${data.team.departments.support}\n\n👔 القيادة:\n${data.team.leadership.map(leader => `• ${leader.name} - ${leader.position} (${leader.experience})`).join('\n')}\n\n💼 وظائف متاحة حالياً:\n\n${positionsList}\n\n🎁 مزايا العمل معنا:\n${data.careers.benefits.map(benefit => `• ${benefit}`).join('\n')}\n\n🚀 إحنا دايماً بندور على المواهب المميزة! عايز تنضملنا؟ ابعتلنا CV على ${data.contact.email}`
        : `👥 Our Exceptional Team and Job Opportunities:\n\n🌟 Our Current Team:\n👨‍💻 ${data.team.departments.developmentEn}\n🎨 ${data.team.departments.designEn}\n📈 ${data.team.departments.marketingEn}\n🛠️ ${data.team.departments.supportEn}\n\n👔 Leadership:\n${data.team.leadership.map(leader => `• ${leader.nameEn} - ${leader.positionEn} (${leader.experienceEn})`).join('\n')}\n\n💼 Currently Available Positions:\n\n${positionsList}\n\n🎁 Benefits of Working With Us:\n${data.careers.benefitsEn.map(benefit => `• ${benefit}`).join('\n')}\n\n🚀 We're always looking for exceptional talents! Want to join us? Send your CV to ${data.contact.email}`;
    }

    // Technologies - expanded
    if (lowerQuery.includes('technology') || lowerQuery.includes('tech') || lowerQuery.includes('تكنولوجيا') || 
        lowerQuery.includes('تقنية') || lowerQuery.includes('برمجة') || lowerQuery.includes('programming') ||
        lowerQuery.includes('tools') || lowerQuery.includes('أدوات') || lowerQuery.includes('stack') ||
        lowerQuery.includes('framework') || lowerQuery.includes('library')) {
      return userLanguage === 'ar'
        ? `💻 تقنياتنا المتقدمة وأدواتنا الاحترافية:\n\n🎨 تطوير الواجهات الأمامية:\n${data.technologies.frontend.map(tech => `• ${tech}`).join('\n')}\n\n⚙️ تطوير الخوادم والبنية التحتية:\n${data.technologies.backend.map(tech => `• ${tech}`).join('\n')}\n\n📱 تطوير تطبيقات الموبايل:\n${data.technologies.mobile.map(tech => `• ${tech}`).join('\n')}\n\n🗄️ إدارة قواعد البيانات:\n${data.technologies.database.map(tech => `• ${tech}`).join('\n')}\n\n☁️ الحوسبة السحابية والاستضافة:\n${data.technologies.cloud.map(tech => `• ${tech}`).join('\n')}\n\n🧠 الذكاء الاصطناعي والتعلم الآلي:\n${data.technologies.ai.map(tech => `• ${tech}`).join('\n')}\n\n🔒 الأمان والامتثال:\n${data.security.standards.map(std => `• ${std}`).join('\n')}\n\n✨ إحنا مش بنجري وراء الموضة، إحنا بنختار التقنيات اللي تحقق أفضل النتائج لمشروعك! 🎯`
        : `💻 Our Advanced Technologies and Professional Tools:\n\n🎨 Frontend Development:\n${data.technologies.frontend.map(tech => `• ${tech}`).join('\n')}\n\n⚙️ Backend Development and Infrastructure:\n${data.technologies.backend.map(tech => `• ${tech}`).join('\n')}\n\n📱 Mobile App Development:\n${data.technologies.mobile.map(tech => `• ${tech}`).join('\n')}\n\n🗄️ Database Management:\n${data.technologies.database.map(tech => `• ${tech}`).join('\n')}\n\n☁️ Cloud Computing and Hosting:\n${data.technologies.cloud.map(tech => `• ${tech}`).join('\n')}\n\n🧠 Artificial Intelligence and Machine Learning:\n${data.technologies.ai.map(tech => `• ${tech}`).join('\n')}\n\n🔒 Security and Compliance:\n${data.security.standards.map(std => `• ${std}`).join('\n')}\n\n✨ We don't chase trends, we choose technologies that deliver the best results for your project! 🎯`;
    }

    // Security and compliance
    if (lowerQuery.includes('security') || lowerQuery.includes('أمان') || lowerQuery.includes('أمن') ||
        lowerQuery.includes('privacy') || lowerQuery.includes('خصوصية') || lowerQuery.includes('compliance') ||
        lowerQuery.includes('امتثال') || lowerQuery.includes('certification') || lowerQuery.includes('شهادة')) {
      return userLanguage === 'ar'
        ? `🔒 الأمان والخصوصية - أولويتنا القصوى:\n\n🛡️ معايير الأمان:\n${data.security.standards.map(std => `• ${std}`).join('\n')}\n\n🔐 التشفير: ${data.security.encryption}\n💾 النسخ الاحتياطية: ${data.security.backups}\n👁️ المراقبة: ${data.security.monitoring}\n⏰ وقت التشغيل: ${data.statistics.uptime}\n\n📋 الشهادات والامتثال:\n${data.company.certifications.map(cert => `• ${cert}`).join('\n')}\n\n🌟 الشراكات التقنية الآمنة:\n${data.partnerships.technology.map(partner => `• ${partner}`).join('\n')}\n\n🛡️ أمان معلوماتك مش مجرد وعد، ده التزام نعيش عليه كل يوم! 💪`
        : `🔒 Security and Privacy - Our Top Priority:\n\n🛡️ Security Standards:\n${data.security.standards.map(std => `• ${std}`).join('\n')}\n\n🔐 Encryption: ${data.security.encryptionEn}\n💾 Backups: ${data.security.backupsEn}\n👁️ Monitoring: ${data.security.monitoringEn}\n⏰ Uptime: ${data.statistics.uptimeEn}\n\n📋 Certifications and Compliance:\n${data.company.certifications.map(cert => `• ${cert}`).join('\n')}\n\n🌟 Secure Technology Partnerships:\n${data.partnerships.technology.map(partner => `• ${partner}`).join('\n')}\n\n🛡️ Your data security isn't just a promise, it's a commitment we live by every day! 💪`;
    }

    // If no specific match found, return a smart general response instead of null
    return userLanguage === 'ar'
      ? `🤔 سؤال مثير للاهتمام! رغم إن مش لقيت إجابة مباشرة في بياناتي، لكن خليني أساعدك:\n\n🚀 إيفا شركة تكنولوجيا شاملة متخصصة في:\n• تطوير التطبيقات والمواقع\n• الذكاء الاصطناعي والتحول الرقمي\n• التدريب والاستشارات التقنية\n• الحلول السحابية والأمان الرقمي\n\n💡 لو سؤالك عن موضوع تقني أو تجاري، أقدر أساعدك بمعلومات عامة مفيدة.\n\nممكن توضحلي أكتر عن اللي محتاجه؟ أو اسأل عن خدماتنا التفصيلية! 🎯`
      : `🤔 Interesting question! While I didn't find a direct answer in my database, let me help you:\n\n🚀 Eva is a comprehensive technology company specialized in:\n• App and website development\n• AI and digital transformation\n• Technical training and consulting\n• Cloud solutions and digital security\n\n💡 If your question is about technical or business topics, I can help with useful general information.\n\nCould you clarify more about what you need? Or ask about our detailed services! 🎯`;
  };

  // Enhanced message handling with smart mode
  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const detectedLang = detectLanguage(inputValue);
    const tone = detectTone(inputValue, detectedLang);
    setDetectedTone(tone);
    setLanguage(detectedLang);

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isUser: true,
      timestamp: new Date(),
      language: detectedLang,
      tone
    };

    setMessages(prev => [...prev, userMessage]);
    const currentQuery = inputValue;
    setInputValue('');
    setIsLoading(true);

    try {
      let response: string;
      let source: 'eva' | 'groq' = 'eva';

      switch (conversationMode) {
        case 'eva-only':
          response = searchEvaData(currentQuery, detectedLang) || 
            (detectedLang === 'ar' 
              ? 'عذراً، لا أملك معلومات عن هذا الموضوع في قاعدة بيانات إيفا. جرب تسأل عن خدماتنا أو معلومات الشركة!'
              : 'Sorry, I don\'t have information about this topic in Eva\'s database. Try asking about our services or company information!');
          break;
          
        case 'ai-only':
          source = 'groq';
          const context = groqService.extractContext(currentQuery, EVA_COMPANY_DATA);
          response = await groqService.generateResponse(currentQuery, detectedLang, tone, context);
          break;
          
        default: // smart mode
          response = searchEvaData(currentQuery, detectedLang);
          // Since searchEvaData never returns null now, we have response
          // But check if it's the generic fallback response, then enhance with Groq
          if (response.includes('مثير للاهتمام') || response.includes('Interesting question')) {
            source = 'groq';
            const context = groqService.extractContext(currentQuery, EVA_COMPANY_DATA);
            const groqResponse = await groqService.generateResponse(currentQuery, detectedLang, tone, context);
            // Combine Eva's general info with Groq's specific answer
            response = groqResponse;
          }
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        isUser: false,
        timestamp: new Date(),
        language: detectedLang,
        tone,
        source
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error in handleSendMessage:', error);
      // Provide intelligent response even if Groq fails
      const evaResponse = searchEvaData(currentQuery, detectedLang);
      const smartResponses = CONVERSATION_DATABASE.smartResponses[detectedLang];
      const randomResponse = smartResponses.general[Math.floor(Math.random() * smartResponses.general.length)];
      
      const fallbackResponse = detectedLang === 'ar'
        ? evaResponse || `${randomResponse}\n\n🤖 ${CONVERSATION_DATABASE.fallbackSystem.ar.beforeAI}\n\nلكن معلومات إيفا الأساسية متوفرة دائماً:\n• خدمة العملاء: 17125\n• الإيميل: info@eva-cosmetics.com\n• المتجر: shop@eva-cosmetics.com\n\n💼 إيه اللي تحب تعرفه عن إيفا؟`
        : evaResponse || `${randomResponse}\n\n🤖 ${CONVERSATION_DATABASE.fallbackSystem.en.beforeAI}\n\nBut Eva's essential information is always available:\n• Customer Service: 17125\n• Email: info@eva-cosmetics.com\n• Store: shop@eva-cosmetics.com\n\n💼 What would you like to know about Eva?`;
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: fallbackResponse,
        isUser: false,
        timestamp: new Date(),
        language: detectedLang,
        tone,
        source: 'eva'
      };

      setMessages(prev => [...prev, botMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Copy message to clipboard
  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
    toast({
      title: language === 'ar' ? 'تم النسخ' : 'Copied',
      description: language === 'ar' ? 'تم نسخ الرسالة' : 'Message copied to clipboard'
    });
  };

  // Export conversation
  const exportConversation = () => {
    const conversation = messages.map(msg => 
      `${msg.isUser ? (language === 'ar' ? 'أنت' : 'You') : 'Eva'} (${msg.timestamp.toLocaleString()}): ${msg.content}`
    ).join('\n\n');
    
    const blob = new Blob([conversation], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `eva-conversation-${new Date().getTime()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: language === 'ar' ? 'تم التصدير' : 'Exported',
      description: language === 'ar' ? 'تم تصدير المحادثة بنجاح' : 'Conversation exported successfully'
    });
  };

  // Clear conversation
  const clearConversation = () => {
    setMessages([]);
    setTimeout(() => {
      const welcomeMessage: Message = {
        id: '1',
        content: language === 'ar' 
          ? 'تم مسح المحادثة! 🔄 كيف يمكنني مساعدتك اليوم؟'
          : 'Conversation cleared! 🔄 How can I help you today?',
        isUser: false,
        timestamp: new Date(),
        language,
        tone: detectedTone,
        source: 'eva'
      };
      setMessages([welcomeMessage]);
    }, 100);
  };

  // Speech recognition (placeholder)
  const toggleSpeechRecognition = () => {
    setIsListening(!isListening);
    toast({
      title: language === 'ar' ? 'التعرف على الصوت' : 'Speech Recognition',
      description: language === 'ar' ? 'سيتم تفعيل هذه الميزة قريباً' : 'This feature will be activated soon'
    });
  };

  // Text to speech (placeholder)
  const toggleTextToSpeech = () => {
    setIsSpeaking(!isSpeaking);
    toast({
      title: language === 'ar' ? 'التحويل إلى صوت' : 'Text to Speech',
      description: language === 'ar' ? 'سيتم تفعيل هذه الميزة قريباً' : 'This feature will be activated soon'
    });
  };

  return (
    <div className="min-h-screen bg-chat-bg text-text-primary">
      {/* Header */}
      <div className="bg-chat-surface border-b border-chat-border p-4 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden shadow-lg ring-2 ring-eva-primary/30">
              <img src={evaLogo} alt="Eva Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-eva-primary to-eva-secondary bg-clip-text text-transparent">
                {language === 'ar' ? 'مساعد إيفا الذكي' : 'Eva Smart Assistant'}
              </h1>
              <p className="text-sm text-text-secondary">
                {language === 'ar' ? 'مساعدك الشخصي في شركة إيفا' : 'Your personal assistant at Eva Company'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant={detectedTone === 'formal' ? 'default' : 'secondary'} className="animate-pulse">
              {language === 'ar' 
                ? (detectedTone === 'formal' ? 'رسمي' : 'ودود') 
                : (detectedTone === 'formal' ? 'Formal' : 'Friendly')
              }
            </Badge>
            
            <Select value={conversationMode} onValueChange={(value: 'smart' | 'eva-only' | 'ai-only') => setConversationMode(value)}>
              <SelectTrigger className="w-32 h-8 text-xs bg-chat-card border-chat-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="smart">{language === 'ar' ? 'ذكي' : 'Smart'}</SelectItem>
                <SelectItem value="eva-only">{language === 'ar' ? 'إيفا فقط' : 'Eva Only'}</SelectItem>
                <SelectItem value="ai-only">{language === 'ar' ? 'ذكاء اصطناعي' : 'AI Only'}</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="ghost"
              size="sm"
              onClick={exportConversation}
              className="text-text-secondary hover:text-eva-accent transition-colors"
              title={language === 'ar' ? 'تصدير المحادثة' : 'Export Conversation'}
            >
              <Download className="w-4 h-4" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={clearConversation}
              className="text-text-secondary hover:text-destructive transition-colors"
              title={language === 'ar' ? 'مسح المحادثة' : 'Clear Conversation'}
            >
              <RefreshCw className="w-4 h-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
              className="text-text-secondary hover:text-eva-accent transition-colors"
            >
              <Globe className="w-4 h-4 mr-1" />
              {language === 'ar' ? 'EN' : 'عر'}
            </Button>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="max-w-4xl mx-auto p-4 h-[calc(100vh-200px)] overflow-y-auto">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <Card className={`max-w-[80%] p-4 group hover:shadow-lg transition-all duration-200 ${
                message.isUser 
                  ? 'bg-gradient-to-br from-eva-primary to-eva-primary-dark text-white border-eva-primary/20' 
                  : 'bg-chat-bot border-chat-border hover:border-eva-accent/30'
              }`}>
                <div className="flex items-start gap-3">
                  {!message.isUser && (
                    <div className="w-6 h-6 bg-gradient-to-br from-eva-primary to-eva-secondary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                  )}
                  {message.isUser && (
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <User className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="whitespace-pre-wrap leading-relaxed break-words">
                      {message.content}
                    </p>
                    <div className="flex items-center justify-between mt-3 text-xs opacity-70">
                      <div className="flex items-center gap-2">
                        <span>
                          {message.timestamp.toLocaleTimeString(
                            message.language === 'ar' ? 'ar-EG' : 'en-US'
                          )}
                        </span>
                        {message.source && (
                          <Badge variant="outline" className="text-xs border-current">
                            {message.source === 'eva' ? 
                              (language === 'ar' ? 'بيانات إيفا' : 'Eva Data') : 
                              (language === 'ar' ? 'مساعد ذكي' : 'AI Assistant')
                            }
                          </Badge>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyMessage(message.content)}
                        className="opacity-0 group-hover:opacity-100 h-6 w-6 p-0 hover:bg-white/10 transition-all"
                        title={language === 'ar' ? 'نسخ' : 'Copy'}
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <Card className="bg-chat-bot border-chat-border p-4">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-gradient-to-br from-eva-primary to-eva-secondary rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-eva-primary rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-eva-primary rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-eva-primary rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                  <span className="text-sm text-text-muted">
                    {language === 'ar' ? 'جارٍ الكتابة...' : 'Typing...'}
                  </span>
                </div>
              </Card>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="fixed bottom-0 left-0 right-0 bg-chat-surface/95 backdrop-blur-sm border-t border-chat-border p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleSpeechRecognition}
              className={`text-text-secondary hover:text-eva-accent transition-colors ${isListening ? 'text-eva-accent animate-pulse' : ''}`}
              title={language === 'ar' ? 'التعرف على الصوت' : 'Speech Recognition'}
            >
              {isListening ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
            </Button>
            
            <div className="flex-1 relative">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                placeholder={
                  language === 'ar'
                    ? 'اكتب رسالتك هنا... مثال: "إيه خدماتكم؟" أو "How much does development cost?"'
                    : 'Type your message here... Example: "What are your services?" or "كام سعر التطوير؟"'
                }
                className="bg-chat-card border-chat-border text-text-primary placeholder:text-text-muted pr-14 pl-4 py-3 rounded-xl focus:ring-2 focus:ring-eva-primary/50 focus:border-eva-primary transition-all"
                disabled={isLoading}
              />
              <Button
                onClick={handleSendMessage}
                disabled={isLoading || !inputValue.trim()}
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-eva-primary to-eva-secondary hover:from-eva-primary-dark hover:to-eva-primary shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTextToSpeech}
              className={`text-text-secondary hover:text-eva-accent transition-colors ${isSpeaking ? 'text-eva-accent animate-pulse' : ''}`}
              title={language === 'ar' ? 'التحويل إلى صوت' : 'Text to Speech'}
            >
              {isSpeaking ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </Button>
          </div>
          
          <div className="text-center mt-3">
            <p className="text-xs text-text-muted">
              {language === 'ar'
                ? '🤖 مدعوم بالذكاء الاصطناعي من إيفا • يدعم العربية والإنجليزية • ذكي في اكتشاف نبرة المحادثة'
                : '🤖 Powered by Eva AI • Supports Arabic & English • Smart tone detection'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvaChatbot;