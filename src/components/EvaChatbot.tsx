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

  // Smart delay for realistic responses
  const addDelay = (baseTime: number = 1000): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, baseTime + Math.random() * 1500));
  };

  // Enhanced Eva data search - Smart and contextual responses
  const searchEvaData = (query: string, userLanguage: 'ar' | 'en'): string | null => {
    const lowerQuery = query.toLowerCase();
    const data = EVA_COMPANY_DATA;
    
    // Check conversation database first for exact matches
    const exactMatch = CONVERSATION_DATABASE.conversations.find(conv => 
      conv.userQuery.toLowerCase() === lowerQuery || 
      lowerQuery.includes(conv.userQuery.toLowerCase())
    );
    
    if (exactMatch && exactMatch.language === userLanguage) {
      return exactMatch.botResponse;
    }

    // Smart skin problem detection and product recommendation
    const skinProblems = {
      acne: ['حبوب', 'حب الشباب', 'بثور', 'رؤوس سوداء', 'acne', 'pimples', 'breakouts', 'blackheads'],
      dryness: ['جفاف', 'جافة', 'تشقق', 'خشونة', 'dry', 'dryness', 'rough', 'flaky'],
      oily: ['دهنية', 'زيوت', 'لمعان', 'دهون', 'oily', 'greasy', 'shiny', 'sebum'],
      sensitive: ['حساسة', 'تهيج', 'احمرار', 'حكة', 'sensitive', 'irritation', 'redness', 'itchy'],
      aging: ['تجاعيد', 'شيخوخة', 'خطوط', 'ترهل', 'wrinkles', 'aging', 'fine lines', 'sagging'],
      dark_spots: ['بقع', 'تصبغ', 'potg داكنة', 'تلون', 'dark spots', 'pigmentation', 'melasma']
    };

    // Detect user's skin problem
    let detectedProblem = '';
    let recommendedProducts: string[] = [];
    
    for (const [problem, keywords] of Object.entries(skinProblems)) {
      if (keywords.some(keyword => lowerQuery.includes(keyword))) {
        detectedProblem = problem;
        break;
      }
    }

    // Product recommendations based on detected problem
    if (detectedProblem) {
      const recommendations = {
        acne: {
          products: ['001', '004', '005'],
          arMessage: `فهمت إن عندك مشكلة حبوب! 🤗 دي مشكلة شائعة وليها حل:\n\n🧴 المنتجات المناسبة:\n• غسول إيفا اللطيف للبشرة الدهنية (كود 001) - 150ج\n  ▫️ يحتوي على حمض الساليسيليك 2% لتنظيف المسام\n  ▫️ الزنك PCA يقلل البكتيريا\n  ▫️ الألوة فيرا تهدئ الالتهاب\n\n• سيرم فيتامين C المضاد للأكسدة (كود 004) - 350ج\n  ▫️ يفتح البقع الداكنة من آثار الحبوب\n  ▫️ يحارب البكتيريا الضارة\n\n🔄 الروتين المثالي:\nصباحاً: غسول → سيرم → مرطب خفيف → واقي شمس\nمساءً: غسول → علاج موضعي → مرطب مهدئ\n\n⚠️ نصائح مهمة:\n• لا تعصر الحبوب نهائياً\n• غير غطاء الوسادة يومياً\n• تجنب لمس الوجه\n• النتائج تظهر بعد 4-6 أسابيع\n\nعايز تعرف أكتر عن منتج معين؟`,
          enMessage: `I understand you have acne concerns! 🤗 This is common and treatable:\n\n🧴 Recommended Products:\n• Eva Gentle Facial Cleanser for Oily Skin (Code 001) - 150 EGP\n  ▫️ Contains 2% Salicylic Acid for pore cleansing\n  ▫️ Zinc PCA reduces bacteria\n  ▫️ Aloe Vera soothes inflammation\n\n• Vitamin C Antioxidant Serum (Code 004) - 350 EGP\n  ▫️ Brightens dark spots from acne marks\n  ▫️ Fights harmful bacteria\n\n🔄 Perfect Routine:\nMorning: Cleanser → Serum → Light moisturizer → Sunscreen\nEvening: Cleanser → Spot treatment → Soothing moisturizer\n\n⚠️ Important Tips:\n• Never squeeze pimples\n• Change pillowcase daily\n• Avoid touching face\n• Results show after 4-6 weeks\n\nWant to know more about a specific product?`
        },
        dryness: {
          products: ['002', '005'],
          arMessage: `أشوف إن بشرتك جافة! 💧 مش مشكلة، إيفا عندها الحل:\n\n🧴 المنتجات المناسبة:\n• مرطب إيفا المائي للبشرة الجافة (كود 002) - 220ج\n  ▫️ حمض الهيالورونيك يحتفظ بالرطوبة 48 ساعة\n  ▫️ نياسيناميد 5% يقوي حاجز البشرة\n  ▫️ السيراميدز تمنع فقدان الماء\n\n• مقشر إيفا اللطيف للبشرة الحساسة (كود 005) - 180ج\n  ▫️ أحماض فواكه طبيعية تزيل الجلد الميت\n  ▫️ الشوفان والعسل يرطبان بعمق\n\n🔄 الروتين المثالي:\nصباحاً: غسول لطيف → سيرم مرطب → مرطب غني → واقي شمس\nمساءً: زيت منظف → سيرم → كريم ليلي مكثف\nأسبوعياً: مقشر لطيف مرة واحدة\n\n⚠️ نصائح ذهبية:\n• تجنب الماء الساخن\n• استخدم مرطب على البشرة الرطبة\n• اشرب 2 لتر ماء يومياً\n• استخدم مرطب الجو في الشتا\n\nعايز تعرف أكتر؟`,
          enMessage: `I see your skin is dry! 💧 No problem, Eva has the solution:\n\n🧴 Recommended Products:\n• Eva Hydrating Moisturizer for Dry Skin (Code 002) - 220 EGP\n  ▫️ Hyaluronic Acid retains moisture for 48 hours\n  ▫️ 5% Niacinamide strengthens skin barrier\n  ▫️ Ceramides prevent water loss\n\n• Eva Gentle Exfoliating Scrub (Code 005) - 180 EGP\n  ▫️ Natural fruit acids remove dead skin\n  ▫️ Oats and honey deeply moisturize\n\n🔄 Perfect Routine:\nMorning: Gentle cleanser → Hydrating serum → Rich moisturizer → Sunscreen\nEvening: Oil cleanser → Serum → Intensive night cream\nWeekly: Gentle scrub once\n\n⚠️ Golden Tips:\n• Avoid hot water\n• Apply moisturizer on damp skin\n• Drink 2L water daily\n• Use humidifier in winter\n\nWant to know more?`
        },
        oily: {
          products: ['001', '003'],
          arMessage: `بشرتك دهنية؟ 🌟 ده مش عيب، ده نعمة لو عرفتِ تتعاملي معاها صح:\n\n🧴 المنتجات المناسبة:\n• غسول إيفا اللطيف للبشرة الدهنية (كود 001) - 150ج\n  ▫️ ينظف الزيوت الزائدة بدون جفاف\n  ▫️ حمض الساليسيليك ينظف المسام بعمق\n\n• واقي الشمس إيفا SPF 50+ (كود 003) - 280ج\n  ▫️ تركيبة خفيفة غير دهنية\n  ▫️ مقاوم للماء والعرق\n  ▫️ لا يسد المسام\n\n🔄 الروتين المثالي:\nصباحاً: غسول → تونر قابض → مرطب خفيف → واقي شمس\nمساءً: غسول عميق → تونر → سيرم نياسيناميد → مرطب ليلي\n\n💡 حقائق مهمة:\n• البشرة الدهنية تتقدم في السن أبطأ\n• الترطيب ضروري حتى للبشرة الدهنية\n• تجنب الإفراط في التنظيف\n• اشرب الماء وقلل السكريات\n\nعايز نصايح أكتر؟`,
          enMessage: `Oily skin? 🌟 That's not a flaw, it's a blessing if you handle it right:\n\n🧴 Recommended Products:\n• Eva Gentle Cleanser for Oily Skin (Code 001) - 150 EGP\n  ▫️ Removes excess oil without drying\n  ▫️ Salicylic acid deep cleans pores\n\n• Eva Sunscreen SPF 50+ (Code 003) - 280 EGP\n  ▫️ Lightweight non-greasy formula\n  ▫️ Water and sweat resistant\n  ▫️ Non-comedogenic\n\n🔄 Perfect Routine:\nMorning: Cleanser → Astringent toner → Light moisturizer → Sunscreen\nEvening: Deep cleanser → Toner → Niacinamide serum → Night moisturizer\n\n💡 Important Facts:\n• Oily skin ages slower\n• Moisturizing is essential even for oily skin\n• Avoid over-cleansing\n• Drink water and reduce sugars\n\nWant more tips?`
        }
      };

      const recommendation = recommendations[detectedProblem as keyof typeof recommendations];
      if (recommendation) {
        return userLanguage === 'ar' ? recommendation.arMessage : recommendation.enMessage;
      }
    }

    // Enhanced greetings with smart detection
    if (lowerQuery.includes('hello') || lowerQuery.includes('hi') || lowerQuery.includes('أهلا') ||
        lowerQuery.includes('مرحبا') || lowerQuery.includes('السلام') || lowerQuery.includes('صباح') ||
        lowerQuery.includes('مساء') || lowerQuery.includes('إزيك') || lowerQuery.includes('ازيك') ||
        lowerQuery.includes('ازاي') || lowerQuery.includes('عامل') || lowerQuery.includes('اخبارك')) {
      return userLanguage === 'ar'
        ? `أهلاً وسهلاً! 🌟 أنا مساعد إيفا الذكي للجمال والعناية\n\nإزاي أقدر أساعدك النهاردة؟\n• عندك مشكلة في البشرة؟ 🤔\n• محتاج توصيات منتجات؟ 💄\n• عايز روتين عناية مخصوص؟ ✨\n• سؤال عن منتج معين؟ 🧴\n\nاكتب مشكلتك وأنا هاديك الحل المناسب! 😊`
        : `Hello and welcome! 🌟 I'm Eva's intelligent beauty and care assistant\n\nHow can I help you today?\n• Have a skin concern? 🤔\n• Need product recommendations? 💄\n• Want a custom care routine? ✨\n• Question about a specific product? 🧴\n\nDescribe your concern and I'll give you the right solution! 😊`;
    }

    return null; // Return null if no match found, will trigger AI response
  };

  // Enhanced message sending with realistic delay
  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue.trim(),
      isUser: true,
      timestamp: new Date(),
      language: detectLanguage(inputValue),
      tone: detectTone(inputValue, detectLanguage(inputValue)),
      source: 'eva'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Add realistic thinking delay
    await addDelay(800);

    try {
      // Update detected language and tone
      const detectedLang = detectLanguage(inputValue);
      const detectedToneValue = detectTone(inputValue, detectedLang);
      setLanguage(detectedLang);
      setDetectedTone(detectedToneValue);

      // First try Eva's knowledge base
      let botResponse = searchEvaData(inputValue.trim(), detectedLang);
      let source: 'eva' | 'groq' = 'eva';

      // If no direct match, use AI for intelligent response
      if (!botResponse) {
        await addDelay(1200); // Extra delay for AI thinking
        try {
          const aiResponse = await groqService.generateResponse(
            inputValue.trim(),
            detectedLang,
            detectedToneValue,
            'Eva beauty assistant context'
          );
          
          botResponse = aiResponse || (detectedLang === 'ar' 
            ? `شكراً لسؤالك! 🤗 ده موضوع شيق، وإيفا دايماً مهتمة بتقديم أفضل الحلول. ممكن توضحلي أكتر عشان أقدر أساعدك بشكل أدق؟`
            : `Thank you for your question! 🤗 That's an interesting topic, and Eva always aims to provide the best solutions. Could you clarify more so I can help you more accurately?`);
          source = 'groq';
        } catch (error) {
          // Fallback to smart Eva response
          botResponse = detectedLang === 'ar'
            ? `أهلاً بيك! 🌟 إيفا عندها خبرة كبيرة في مجال الجمال والعناية. عايز تسأل عن إيه تحديداً؟ منتجات العناية بالبشرة؟ روتين يومي؟ ولا مشكلة معينة محتاج حل ليها؟`
            : `Welcome! 🌟 Eva has extensive experience in beauty and care. What specifically would you like to ask about? Skincare products? Daily routine? Or a specific problem you need a solution for?`;
          source = 'eva';
        }
      }

      // Final delay before showing response
      await addDelay(600);

      const responseMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: botResponse,
        isUser: false,
        timestamp: new Date(),
        language: detectedLang,
        tone: detectedToneValue,
        source
      };

      setMessages(prev => [...prev, responseMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: language === 'ar' 
          ? 'عذراً، حدث خطأ تقني. ممكن تحاول تاني؟ 🤖'
          : 'Sorry, a technical error occurred. Could you try again? 🤖',
        isUser: false,
        timestamp: new Date(),
        language,
        tone: detectedTone,
        source: 'eva'
      };
      setMessages(prev => [...prev, errorMessage]);
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