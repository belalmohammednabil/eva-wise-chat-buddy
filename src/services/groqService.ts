// Groq API Integration Service
import Groq from 'groq-sdk';

export class GroqService {
  private groq: Groq | null = null;

  constructor(apiKey?: string) {
    if (apiKey) {
      this.groq = new Groq({
        apiKey: apiKey,
        dangerouslyAllowBrowser: true // Note: In production, use a backend proxy
      });
    }
  }

  async generateResponse(
    query: string, 
    language: 'ar' | 'en', 
    tone: 'formal' | 'informal',
    context?: string
  ): Promise<string> {
    if (!this.groq) {
      return this.getFallbackResponse(language, tone);
    }

    try {
      const systemPrompt = this.buildSystemPrompt(language, tone, context);
      
      const completion = await this.groq.chat.completions.create({
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: query }
        ],
        model: 'mixtral-8x7b-32768',
        temperature: tone === 'formal' ? 0.3 : 0.7,
        max_tokens: 1000,
        top_p: 0.9,
        frequency_penalty: 0.1,
        presence_penalty: 0.1
      });

      return completion.choices[0]?.message?.content || this.getFallbackResponse(language, tone);
    } catch (error) {
      console.error('Groq API Error:', error);
      return this.getFallbackResponse(language, tone);
    }
  }

  private buildSystemPrompt(language: 'ar' | 'en', tone: 'formal' | 'informal', context?: string): string {
    const basePrompts = {
      ar: {
        formal: `أنت مساعد إيفا الذكي المتخصص في خدمة العملاء. تجيب بطريقة رسمية ومهذبة ومحترفة. 
        استخدم العربية الفصحى وكن دقيقاً في المعلومات. اجعل إجاباتك مفيدة وشاملة.`,
        informal: `أنت مساعد إيفا الذكي الودود! اتكلم بطريقة ودية وطبيعية زي ما تكون صاحب للعميل. 
        استخدم العامية المصرية أحياناً واجعل المحادثة مريحة وممتعة. كن مفيد ومبسط في الشرح.`
      },
      en: {
        formal: `You are Eva's professional AI assistant. Respond in a formal, polite, and professional manner. 
        Provide accurate, comprehensive information and maintain a business-appropriate tone throughout.`,
        informal: `You are Eva's friendly AI assistant! Chat in a casual, warm, and approachable way like you're 
        a helpful friend. Keep things conversational, fun, and easy to understand.`
      }
    };

    let prompt = basePrompts[language][tone];
    
    if (context) {
      prompt += language === 'ar' 
        ? `\n\nمعلومات إضافية عن شركة إيفا: ${context}`
        : `\n\nAdditional Eva Company information: ${context}`;
    }

    prompt += language === 'ar'
      ? '\n\nقواعد مهمة:\n- اجب دائماً بالعربية\n- كن مفيداً ومساعداً\n- إذا لم تعرف المعلومة، اعترف بذلك\n- قدم حلول عملية'
      : '\n\nImportant rules:\n- Always respond in English\n- Be helpful and supportive\n- If you don\'t know something, admit it\n- Provide practical solutions';

    return prompt;
  }

  private getFallbackResponse(language: 'ar' | 'en', tone: 'formal' | 'informal'): string {
    const responses = {
      ar: {
        formal: 'أعتذر، لم أتمكن من معالجة طلبكم في الوقت الحالي. يرجى المحاولة مرة أخرى أو التواصل مع فريق الدعم.',
        informal: 'عذراً، مش قادر أساعدك دلوقتي. جرب تاني أو كلم فريق الدعم بتاعنا!'
      },
      en: {
        formal: 'I apologize, I was unable to process your request at the moment. Please try again or contact our support team.',
        informal: 'Sorry, I can\'t help with that right now. Try again or reach out to our support team!'
      }
    };

    return responses[language][tone];
  }

  // Smart context extraction for better responses
  extractContext(query: string, evaData: any): string {
    const lowerQuery = query.toLowerCase();
    let context = '';

    // Add relevant Eva data based on query keywords
    if (lowerQuery.includes('service') || lowerQuery.includes('خدمة')) {
      context += `Services: ${Object.keys(evaData.services).join(', ')}. `;
    }

    if (lowerQuery.includes('price') || lowerQuery.includes('سعر')) {
      context += `Pricing available for software development and CRM. `;
    }

    if (lowerQuery.includes('contact') || lowerQuery.includes('تواصل')) {
      context += `Contact: ${evaData.contact.phone}, ${evaData.contact.email}. `;
    }

    return context.trim();
  }
}

// Utility functions for language and tone detection
export const detectLanguage = (text: string): 'ar' | 'en' => {
  const arabicPattern = /[\u0600-\u06FF]/;
  return arabicPattern.test(text) ? 'ar' : 'en';
};

export const detectTone = (text: string, language: 'ar' | 'en'): 'formal' | 'informal' => {
  const formalPatterns = {
    ar: ['حضرتك', 'سيادتكم', 'المحترم', 'من فضلكم', 'إذا سمحتم', 'أود أن'],
    en: ['sir', 'madam', 'please', 'kindly', 'would you', 'could you', 'i would like']
  };

  const informalPatterns = {
    ar: ['إزيك', 'إيه أخبارك', 'عامل إيه', 'إزاي', 'يلا', 'تمام', 'كدا', 'علطول'],
    en: ['hey', 'what\'s up', 'how\'s it going', 'cool', 'awesome', 'thanks', 'hi there']
  };

  const lowerText = text.toLowerCase();
  
  const formalMatch = formalPatterns[language].some(pattern => lowerText.includes(pattern));
  const informalMatch = informalPatterns[language].some(pattern => lowerText.includes(pattern));

  if (formalMatch) return 'formal';
  if (informalMatch) return 'informal';
  
  // Default based on language - Arabic tends to be more formal
  return language === 'ar' ? 'formal' : 'informal';
};