import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Globe, Mic, MicOff, Volume2, VolumeX, Settings, RefreshCw, Copy, Download, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { EVA_COMPANY_DATA, CONVERSATION_PATTERNS, GROQ_FALLBACK_RESPONSES } from '@/data/evaData';
import { GroqService, detectLanguage, detectTone } from '@/services/groqService';
import evaLogo from '@/assets/eva-logo.png';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  language: 'ar' | 'en';
  tone?: 'formal' | 'informal';
  source?: 'eva' | 'groq';
}

interface ChatbotProps {
  apiKey?: string;
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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Initialize with welcome message
  useEffect(() => {
    const welcomeMessage: Message = {
      id: '1',
      content: language === 'ar' 
        ? 'أهلاً وسهلاً! أنا مساعد إيفا الذكي 🤖 إزيك النهاردة؟ أقدر أساعدك في أي حاجة خاصة بشركة إيفا أو أي استفسارات تانية! اكتب بالعربي أو الإنجليزي زي ما تحب، وهاكتشف إذا كنت عايز تتكلم بشكل رسمي ولا ودود.'
        : 'Hello and welcome! I\'m Eva\'s smart assistant 🤖 How are you today? I can help you with anything about Eva Company or any other inquiries! Write in Arabic or English as you prefer, and I\'ll detect whether you want to communicate formally or friendly.',
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

  // Enhanced Eva data search with better matching
  const searchEvaData = (query: string, userLanguage: 'ar' | 'en'): string | null => {
    const lowerQuery = query.toLowerCase();
    const data = EVA_COMPANY_DATA;
    
    // Company information
    if (lowerQuery.includes('company') || lowerQuery.includes('شركة') || lowerQuery.includes('إيفا') || 
        lowerQuery.includes('eva') || lowerQuery.includes('about') || lowerQuery.includes('عن')) {
      return userLanguage === 'ar' 
        ? `🏢 شركة إيفا هي شركة تكنولوجيا مبتكرة تأسست في ${data.company.established}. مقرها في ${data.company.headquarters} وتضم أكثر من ${data.company.employees} موظف.\n\n✨ رسالتنا: ${data.company.mission}\n🎯 رؤيتنا: ${data.company.vision}\n\nإحنا متخصصين في تقديم حلول تكنولوجيا متطورة للشركات في كل الشرق الأوسط!`
        : `🏢 Eva Company is an innovative technology company established in ${data.company.established}. Headquartered in ${data.company.headquartersEn} with ${data.company.employees} employees.\n\n✨ Our mission: ${data.company.missionEn}\n🎯 Our vision: ${data.company.visionEn}\n\nWe specialize in providing cutting-edge technology solutions for companies across the Middle East!`;
    }

    // Services
    if (lowerQuery.includes('service') || lowerQuery.includes('خدمة') || lowerQuery.includes('خدمات') || 
        lowerQuery.includes('development') || lowerQuery.includes('تطوير')) {
      const services = Object.values(data.services);
      const servicesList = services.map((service, index) => 
        userLanguage === 'ar' 
          ? `${index + 1}. 💼 ${service.name}: ${service.description}${'pricing' in service ? `\n   💰 السعر: ${service.pricing}` : ''}`
          : `${index + 1}. 💼 ${service.nameEn}: ${service.descriptionEn}${'pricingEn' in service ? `\n   💰 Price: ${service.pricingEn}` : ''}`
      ).join('\n\n');
      
      return userLanguage === 'ar'
        ? `🚀 خدماتنا الرئيسية:\n\n${servicesList}\n\nعايز تعرف أكتر عن خدمة معينة؟ اسألني!`
        : `🚀 Our main services:\n\n${servicesList}\n\nWant to know more about a specific service? Just ask!`;
    }

    // Contact information
    if (lowerQuery.includes('contact') || lowerQuery.includes('تواصل') || lowerQuery.includes('رقم') || 
        lowerQuery.includes('ايميل') || lowerQuery.includes('email') || lowerQuery.includes('phone')) {
      return userLanguage === 'ar'
        ? `📞 معلومات التواصل:\n\n📱 الهاتف: ${data.contact.phone}\n📧 الإيميل: ${data.contact.email}\n🌐 الموقع: ${data.contact.website}\n📍 العنوان: ${data.contact.address}\n🕒 ساعات العمل: ${data.contact.workingHours}\n\n💬 للدعم الفني: ${data.contact.supportEmail}\n💼 للمبيعات: ${data.contact.salesEmail}`
        : `📞 Contact Information:\n\n📱 Phone: ${data.contact.phone}\n📧 Email: ${data.contact.email}\n🌐 Website: ${data.contact.website}\n📍 Address: ${data.contact.addressEn}\n🕒 Working Hours: ${data.contact.workingHoursEn}\n\n💬 Technical Support: ${data.contact.supportEmail}\n💼 Sales: ${data.contact.salesEmail}`;
    }

    // Pricing
    if (lowerQuery.includes('price') || lowerQuery.includes('cost') || lowerQuery.includes('سعر') || 
        lowerQuery.includes('تكلفة') || lowerQuery.includes('فلوس')) {
      return userLanguage === 'ar'
        ? `💰 أسعارنا المميزة:\n\n📱 تطوير التطبيقات: ${data.services.softwareDevelopment.pricing}\n🏢 نظام إدارة العملاء: ${data.products.evaCRM.pricing}\n\n⭐ الأسعار تختلف حسب:\n• تعقيد المشروع\n• الميزات المطلوبة\n• المدة الزمنية\n\nعايز عرض سعر مخصوص؟ كلمنا وهانعملك عرض مناسب لميزانيتك!`
        : `💰 Our competitive pricing:\n\n📱 Software Development: ${data.services.softwareDevelopment.pricingEn}\n🏢 CRM System: ${data.products.evaCRM.pricingEn}\n\n⭐ Prices vary based on:\n• Project complexity\n• Required features\n• Timeline\n\nWant a custom quote? Contact us and we'll create a suitable offer for your budget!`;
    }

    // Team
    if (lowerQuery.includes('team') || lowerQuery.includes('فريق') || lowerQuery.includes('موظف') || 
        lowerQuery.includes('staff') || lowerQuery.includes('employees')) {
      return userLanguage === 'ar'
        ? `👥 فريق العمل المتميز:\n\n👨‍💻 ${data.team.departments.development}\n🎨 ${data.team.departments.design}\n📈 ${data.team.departments.marketing}\n🛠️ ${data.team.departments.support}\n\n🌟 قيادة خبيرة:\n• ${data.team.leadership[0].name} - ${data.team.leadership[0].position} (${data.team.leadership[0].experience})\n• ${data.team.leadership[1].name} - ${data.team.leadership[1].position} (${data.team.leadership[1].experience})\n\nإحنا فريق شاب ومتحمس نخدمك بأفضل شكل ممكن!`
        : `👥 Our exceptional team:\n\n👨‍💻 ${data.team.departments.developmentEn}\n🎨 ${data.team.departments.designEn}\n📈 ${data.team.departments.marketingEn}\n🛠️ ${data.team.departments.supportEn}\n\n🌟 Expert leadership:\n• ${data.team.leadership[0].nameEn} - ${data.team.leadership[0].positionEn} (${data.team.leadership[0].experienceEn})\n• ${data.team.leadership[1].nameEn} - ${data.team.leadership[1].positionEn} (${data.team.leadership[1].experienceEn})\n\nWe're a young and enthusiastic team ready to serve you in the best way possible!`;
    }

    // Clients
    if (lowerQuery.includes('client') || lowerQuery.includes('عميل') || lowerQuery.includes('عملاء') || 
        lowerQuery.includes('customer') || lowerQuery.includes('portfolio')) {
      return userLanguage === 'ar'
        ? `🤝 عملاؤنا المميزون:\n\n📊 ${data.clients.count}\n\n🏭 القطاعات:\n${data.clients.sectors.map(sector => `• ${sector}`).join('\n')}\n\n⭐ شهادة عميل:\n"${data.clients.testimonials[0].feedback}" - ${data.clients.testimonials[0].client}\n\nإحنا فخورين بثقة عملائنا فينا ونشتغل على إنجاح مشاريعهم!`
        : `🤝 Our valued clients:\n\n📊 ${data.clients.countEn}\n\n🏭 Sectors:\n${data.clients.sectorsEn.map(sector => `• ${sector}`).join('\n')}\n\n⭐ Client testimonial:\n"${data.clients.testimonials[0].feedbackEn}" - ${data.clients.testimonials[0].clientEn}\n\nWe're proud of our clients' trust and work hard to make their projects successful!`;
    }

    // Technologies
    if (lowerQuery.includes('technology') || lowerQuery.includes('tech') || lowerQuery.includes('تكنولوجيا') || 
        lowerQuery.includes('تقنية') || lowerQuery.includes('برمجة')) {
      return userLanguage === 'ar'
        ? `💻 التقنيات المستخدمة:\n\n🎨 الواجهات الأمامية:\n${data.technologies.frontend.join(' • ')}\n\n⚙️ الخوادم:\n${data.technologies.backend.join(' • ')}\n\n📱 تطبيقات الموبايل:\n${data.technologies.mobile.join(' • ')}\n\n🗄️ قواعد البيانات:\n${data.technologies.database.join(' • ')}\n\n☁️ الحوسبة السحابية:\n${data.technologies.cloud.join(' • ')}\n\n🧠 الذكاء الاصطناعي:\n${data.technologies.ai.join(' • ')}\n\nإحنا بنستخدم أحدث التقنيات عشان نضمنلك أفضل النتائج!`
        : `💻 Technologies we use:\n\n🎨 Frontend:\n${data.technologies.frontend.join(' • ')}\n\n⚙️ Backend:\n${data.technologies.backend.join(' • ')}\n\n📱 Mobile:\n${data.technologies.mobile.join(' • ')}\n\n🗄️ Databases:\n${data.technologies.database.join(' • ')}\n\n☁️ Cloud:\n${data.technologies.cloud.join(' • ')}\n\n🧠 AI:\n${data.technologies.ai.join(' • ')}\n\nWe use the latest technologies to ensure the best results for you!`;
    }

    // Process
    if (lowerQuery.includes('process') || lowerQuery.includes('methodology') || lowerQuery.includes('عملية') || 
        lowerQuery.includes('مراحل') || lowerQuery.includes('how') || lowerQuery.includes('إزاي')) {
      const processSteps = Object.values(data.process);
      const processList = processSteps.map((step, index) => 
        userLanguage === 'ar' 
          ? `${index + 1}. 📋 ${step.name} (${step.duration})`
          : `${index + 1}. 📋 ${step.nameEn} (${step.durationEn})`
      ).join('\n');
      
      return userLanguage === 'ar'
        ? `⚙️ منهجية العمل المتطورة:\n\n${processList}\n\nإحنا بنتبع منهجية منظمة ومدروسة عشان نضمن نجاح مشروعك من البداية للنهاية!`
        : `⚙️ Our advanced work methodology:\n\n${processList}\n\nWe follow an organized and well-studied methodology to ensure your project's success from start to finish!`;
    }

    return null;
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
          if (!response) {
            source = 'groq';
            const context = groqService.extractContext(currentQuery, EVA_COMPANY_DATA);
            response = await groqService.generateResponse(currentQuery, detectedLang, tone, context);
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
      toast({
        title: detectedLang === 'ar' ? 'خطأ' : 'Error',
        description: detectedLang === 'ar' ? 'حدث خطأ في الإرسال' : 'Error sending message',
        variant: 'destructive'
      });
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