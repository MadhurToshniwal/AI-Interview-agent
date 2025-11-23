import Groq from 'groq-sdk';

// Initialize Groq AI
const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY || '',
  dangerouslyAllowBrowser: true // Required for client-side usage
});

/**
 * Role-specific configuration for interviews
 * Each role has tailored questions and evaluation criteria
 */
export const ROLE_CONFIGS = {
  'software-engineer': {
    name: 'Software Engineer',
    icon: '💻',
    description: 'Technical and behavioral questions for software engineering roles',
    openingQuestions: [
      "Tell me about yourself and your experience in software development.",
      "Walk me through a recent project you're proud of.",
      "What attracted you to software engineering?",
    ],
    questionBank: {
      technical: [
        "Describe your approach to debugging a complex production issue.",
        "How do you ensure code quality in your projects?",
        "Tell me about a time you optimized system performance.",
        "Explain how you handle technical debt.",
        "What's your experience with testing and CI/CD?",
      ],
      behavioral: [
        "Tell me about a time you disagreed with a team member on a technical decision.",
        "Describe a situation where you had to learn a new technology quickly.",
        "How do you handle tight deadlines and competing priorities?",
        "Tell me about a project that failed. What did you learn?",
        "Describe your code review process and philosophy.",
      ],
      problem_solving: [
        "Walk me through how you would design a URL shortener.",
        "How would you handle a database that's becoming a bottleneck?",
        "Explain your approach to breaking down a large feature into tasks.",
      ],
    },
    evaluationCriteria: {
      technicalDepth: 'Demonstrates solid technical knowledge and problem-solving',
      systemThinking: 'Thinks about scalability, edge cases, and trade-offs',
      codeQuality: 'Mentions testing, documentation, and maintainability',
      collaboration: 'Shows ability to work with teams and communicate technical concepts',
    },
  },
  'product-manager': {
    name: 'Product Manager',
    icon: '📊',
    description: 'Product thinking, strategy, and stakeholder management questions',
    openingQuestions: [
      "Tell me about your product management experience.",
      "What's a product you've shipped that you're most proud of?",
      "How did you get into product management?",
    ],
    questionBank: {
      product_sense: [
        "How would you improve [popular product like Instagram/Slack]?",
        "Tell me about a time you had to prioritize features with limited resources.",
        "How do you decide what to build next?",
        "Describe your process for gathering user feedback.",
      ],
      strategy: [
        "How do you balance user needs with business goals?",
        "Tell me about a time you had to make a difficult product decision.",
        "How do you measure product success?",
        "Describe how you've used data to inform product decisions.",
      ],
      stakeholder: [
        "How do you work with engineering teams?",
        "Tell me about a time you had to convince stakeholders to change direction.",
        "How do you handle conflicting feedback from different stakeholders?",
      ],
    },
    evaluationCriteria: {
      productThinking: 'Shows structured approach to product problems',
      dataOriented: 'Uses metrics and data to make decisions',
      userEmpathy: 'Demonstrates understanding of user needs',
      leadership: 'Can influence and align stakeholders',
    },
  },
  'sales': {
    name: 'Sales Representative',
    icon: '💼',
    description: 'Sales methodology, relationship building, and closing techniques',
    openingQuestions: [
      "Tell me about your sales experience and background.",
      "What's your biggest sales win?",
      "Why are you interested in this sales role?",
    ],
    questionBank: {
      methodology: [
        "Walk me through your sales process from prospecting to close.",
        "How do you qualify leads?",
        "Tell me about a deal you lost. What happened?",
        "How do you handle objections?",
      ],
      relationship: [
        "How do you build rapport with potential clients?",
        "Tell me about a time you turned a 'no' into a 'yes'.",
        "How do you maintain relationships with existing clients?",
        "Describe your approach to networking.",
      ],
      performance: [
        "How do you stay motivated when deals fall through?",
        "Tell me about a time you exceeded your quota.",
        "How do you prioritize your pipeline?",
      ],
    },
    evaluationCriteria: {
      persuasion: 'Demonstrates ability to influence and close deals',
      resilience: 'Shows persistence and ability to handle rejection',
      relationship: 'Builds trust and maintains long-term relationships',
      process: 'Follows structured sales methodology',
    },
  },
};

/**
 * Intelligent follow-up generation based on response analysis
 */
export class InterviewAgent {
  constructor(role, difficulty = 'medium', resumeText = '') {
    this.role = role;
    this.difficulty = difficulty;
    this.resumeText = resumeText;
    this.conversationHistory = [];
    this.questionCount = 0;
    this.maxQuestions = 10;
    this.currentResumeItem = null;
    this.followUpCountForCurrentItem = 0;
    this.resumeItemsCovered = [];
    this.userProfile = {
      nervousness: 0,
      confidence: 0,
      verbosity: 0,
      technicalDepth: 0,
      starUsage: 0,
    };
    
    // Store system instruction for Groq (will be regenerated with each call)
    this.chatHistory = [];
  }

  /**
   * Crafted system instruction for natural interviewer behavior
   */
  getSystemInstruction() {
    const roleConfig = ROLE_CONFIGS[this.role];
    
    let instruction = `You are an expert ${roleConfig.name} interviewer conducting a realistic job interview. Your goal is to:

PERSONALITY:
- Be professional yet warm and encouraging
- Use natural interviewer behaviors like "Hmm, interesting..." or "I see..."
- Ask thoughtful follow-up questions based on the candidate's responses
- Probe deeper when answers are vague or incomplete
- Show genuine interest in the candidate's experiences

QUESTION STRATEGY:
- Start with an opening question to make the candidate comfortable
- Ask ${this.maxQuestions} questions total across different areas: ${Object.keys(roleConfig.questionBank).join(', ')}
- Adapt difficulty based on candidate responses (current level: ${this.difficulty})
- Use STAR method (Situation, Task, Action, Result) as a framework
- Ask clarifying questions if the candidate misses key elements

${this.resumeText ? `
🔥 RESUME-BASED QUESTIONS (CRITICAL - MUST FOLLOW THIS STRATEGY):
The candidate has provided their resume. Follow this EXACT interview flow:

1. IDENTIFY ITEMS: Extract all projects, internships, experiences from the resume
2. ONE ITEM AT A TIME: Pick one project/experience to discuss
3. INITIAL QUESTION: Ask them to tell you about that specific project/internship/experience
4. ONE FOLLOW-UP ONLY: After they answer, ask ONLY ONE more question about that same item to go deeper
5. MOVE ON: After the follow-up, switch to a DIFFERENT project/experience from their resume
6. REPEAT: Continue this pattern until you've covered all major items from their resume

IMPORTANT RULES:
- Do NOT ask more than 2 questions (1 initial + 1 follow-up) about the same project/experience
- Move through different items to COVER THE ENTIRE RESUME
- Be specific - mention the exact project/company/role name from their resume
- Ask about: technical details, challenges faced, impact/results, technologies used
- Make sure to touch on different experiences so they can showcase everything

RESUME CONTENT:
${this.resumeText.substring(0, 2000)}
${this.resumeText.length > 2000 ? '... (truncated)' : ''}

Current Item Being Discussed: ${this.currentResumeItem || 'None yet - pick the first project/experience'}
Follow-ups for Current Item: ${this.followUpCountForCurrentItem}/1
Items Already Covered: ${this.resumeItemsCovered.join(', ') || 'None yet'}

${this.followUpCountForCurrentItem >= 1 ? '⚠️ MOVE TO NEXT ITEM - You\'ve asked enough about the current topic!' : ''}
` : ''}

FOLLOW-UP RULES:
- If answer is vague → "Can you give me a specific example?"
- If answer lacks metrics → "How did you measure success?"
- If answer is too brief → "Tell me more about that..."
- If answer shows good insight → Ask a deeper, related question
- If candidate struggles → Offer a simpler variation or gentle hint
- If candidate goes off-topic → Politely redirect: "That's interesting, but let's focus on..."

RESPONSE FORMAT:
- Keep responses concise (1-3 sentences max)
- One question at a time
- Natural, conversational tone
- Occasionally acknowledge good points before asking next question

EVALUATION FOCUS:
${Object.entries(roleConfig.evaluationCriteria).map(([k, v]) => `- ${k}: ${v}`).join('\n')}

Remember: You're evaluating both WHAT they say and HOW they say it. Real interviewers notice communication skills, structure, and confidence.`;

    return instruction;
  }

  /**
   * Generate opening question
   */
  async startInterview() {
    const roleConfig = ROLE_CONFIGS[this.role];
    const openingQuestion = roleConfig.openingQuestions[
      Math.floor(Math.random() * roleConfig.openingQuestions.length)
    ];
    
    this.questionCount = 1;
    this.conversationHistory.push({
      role: 'interviewer',
      content: openingQuestion,
      timestamp: Date.now(),
    });
    
    return {
      question: openingQuestion,
      questionNumber: this.questionCount,
      totalQuestions: this.maxQuestions,
    };
  }

  /**
   * Analyze response quality and user persona
   */
  analyzeResponse(response) {
    const wordCount = response.split(/\s+/).length;
    const hasExample = /example|instance|time when|situation/i.test(response);
    const hasMetrics = /\d+%|\d+ percent|increased|decreased|improved/i.test(response);
    const hasSTAR = /situation|task|action|result/i.test(response);
    const uncertaintyMarkers = /um|uh|maybe|i think|kind of|sort of/gi;
    const uncertaintyCount = (response.match(uncertaintyMarkers) || []).length;
    
    // Update user profile
    this.userProfile.verbosity += wordCount > 150 ? 1 : wordCount < 30 ? -1 : 0;
    this.userProfile.nervousness += uncertaintyCount;
    this.userProfile.confidence += hasMetrics || hasExample ? 1 : 0;
    this.userProfile.technicalDepth += hasExample ? 1 : 0;
    this.userProfile.starUsage += hasSTAR ? 1 : 0;
    
    return {
      wordCount,
      hasExample,
      hasMetrics,
      hasSTAR,
      uncertaintyCount,
      quality: this.getResponseQuality(wordCount, hasExample, hasMetrics),
    };
  }

  getResponseQuality(wordCount, hasExample, hasMetrics) {
    if (wordCount < 20) return 'too-brief';
    if (wordCount > 200) return 'too-verbose';
    if (hasExample && hasMetrics) return 'excellent';
    if (hasExample) return 'good';
    return 'needs-improvement';
  }

  /**
   * Generate intelligent follow-up question
   */
  async generateFollowUp(userResponse) {
    // Add user response to history
    this.conversationHistory.push({
      role: 'candidate',
      content: userResponse,
      timestamp: Date.now(),
    });

    // Analyze response
    const analysis = this.analyzeResponse(userResponse);
    
    // Determine persona and adjust strategy
    const persona = this.detectPersona();
    
    // Build context for AI
    const context = this.buildContext(analysis, persona);
    
    try {
      // Build messages for Groq (regenerate system instruction with current state)
      const messages = [
        { role: 'system', content: this.getSystemInstruction() },
        ...this.chatHistory,
        { role: 'user', content: context }
      ];

      let aiResponse;
      
      try {
        // Try primary model (70B - better quality)
        const response = await groq.chat.completions.create({
          model: 'llama-3.3-70b-versatile',
          messages: messages,
          temperature: 0.7,
          max_tokens: 300, // Reduced from 500 to save tokens
        });
        aiResponse = response.choices[0].message.content;
      } catch (rateLimitError) {
        // If rate limit hit, try smaller model (uses fewer tokens)
        if (rateLimitError.status === 429) {
          console.warn('Rate limit hit on 70B model, trying smaller 8B model...');
          const response = await groq.chat.completions.create({
            model: 'llama-3.1-8b-instant', // Smaller, faster, uses 10x fewer tokens
            messages: messages,
            temperature: 0.7,
            max_tokens: 300,
          });
          aiResponse = response.choices[0].message.content;
        } else {
          throw rateLimitError;
        }
      }
      
      // Update chat history
      this.chatHistory.push(
        { role: 'user', content: context },
        { role: 'assistant', content: aiResponse }
      );
      
      // Track which resume item the AI is asking about (extract from question)
      if (this.resumeText && !this.currentResumeItem && aiResponse) {
        this.currentResumeItem = this.extractResumeItemFromQuestion(aiResponse);
      }
      
      this.questionCount++;
      
      // Check if interview is complete
      const isComplete = this.questionCount >= this.maxQuestions;
      
      // Only add interviewer message if interview continues
      if (!isComplete) {
        this.conversationHistory.push({
          role: 'interviewer',
          content: aiResponse,
          timestamp: Date.now(),
          analysis,
        });
      }
      
      return {
        question: isComplete ? '' : aiResponse, // No question if complete
        questionNumber: this.questionCount,
        totalQuestions: this.maxQuestions,
        analysis,
        isComplete: isComplete,
        hint: this.generateHint(analysis),
        coachingTip: this.generateCoachingTip(analysis, persona),
      };
    } catch (error) {
      console.error('Error generating follow-up:', error);
      
      // Better error messages
      if (error.status === 429) {
        const errorMsg = error.error?.message || 'Rate limit exceeded';
        throw new Error(`Groq API rate limit reached. ${errorMsg}. Please wait a few minutes or get a new API key from https://console.groq.com/keys`);
      } else if (error.status === 401) {
        throw new Error('Invalid Groq API key. Please add your API key to the .env file.');
      } else if (!navigator.onLine) {
        throw new Error('No internet connection. Please check your network.');
      } else {
        throw new Error(`Failed to generate question: ${error.message}`);
      }
    }
  }

  /**
   * Build context message for AI
   */
  buildContext(analysis, persona) {
    let context = `Candidate's response: "${this.conversationHistory[this.conversationHistory.length - 1].content}"\n\n`;
    
    // Track resume item discussion
    if (this.resumeText) {
      // Check if they mentioned a new project/experience in their answer
      const response = this.conversationHistory[this.conversationHistory.length - 1].content.toLowerCase();
      
      // Simple detection - if they're talking about a specific topic
      if (!this.currentResumeItem) {
        // First resume question - AI should pick an item
        context += `\n📋 RESUME FLOW: This is your first resume-based question. Pick a specific project/internship/experience from their resume to discuss.\n\n`;
      } else if (this.followUpCountForCurrentItem === 0) {
        // They just answered the initial question about an item
        this.followUpCountForCurrentItem = 1;
        context += `\n📋 RESUME FLOW: They just told you about "${this.currentResumeItem}". Ask ONE follow-up question to go deeper (technical details, challenges, impact).\n\n`;
      } else if (this.followUpCountForCurrentItem >= 1) {
        // Time to move to next item
        this.resumeItemsCovered.push(this.currentResumeItem);
        this.currentResumeItem = null;
        this.followUpCountForCurrentItem = 0;
        context += `\n📋 RESUME FLOW: Move to a DIFFERENT project/experience from their resume. Don't repeat: ${this.resumeItemsCovered.join(', ')}.\n\n`;
      }
    }
    
    // Add analysis insights
    context += `Response analysis:\n`;
    context += `- Length: ${analysis.quality}\n`;
    context += `- Contains example: ${analysis.hasExample ? 'Yes' : 'No'}\n`;
    context += `- Contains metrics: ${analysis.hasMetrics ? 'Yes' : 'No'}\n`;
    context += `- Uses STAR framework: ${analysis.hasSTAR ? 'Yes' : 'No'}\n\n`;
    
    // Add persona context
    context += `Detected persona: ${persona}\n`;
    context += `Question ${this.questionCount} of ${this.maxQuestions}\n\n`;
    
    // Add guidance
    if (this.questionCount >= this.maxQuestions) {
      context += `This is the final question. Ask a forward-looking or closing question.\n`;
    } else if (analysis.quality === 'too-brief') {
      context += `The answer was very brief. Ask an open-ended follow-up to get more details.\n`;
    } else if (analysis.quality === 'too-verbose') {
      context += `The answer was lengthy. Ask a focused question to keep the interview on track.\n`;
    } else if (!analysis.hasExample) {
      context += `The answer lacks a specific example. Ask for one.\n`;
    } else if (!analysis.hasMetrics && this.role === 'software-engineer') {
      context += `Good answer but missing measurable impact. Ask how they measured success.\n`;
    }
    
    return context;
  }

  /**
   * Detect user persona for adaptive behavior
   */
  detectPersona() {
    const avgVerbosity = this.userProfile.verbosity / this.questionCount;
    const avgNervousness = this.userProfile.nervousness / this.questionCount;
    
    if (avgNervousness > 2) return 'confused';
    if (avgVerbosity > 2) return 'chatty';
    if (avgVerbosity < -1) return 'efficient';
    return 'balanced';
  }

  /**
   * Extract which resume item (project/experience) is being discussed
   */
  extractResumeItemFromQuestion(question) {
    // Simple extraction - look for quoted text or capitalized phrases
    // Examples: "your React Dashboard project", "your internship at Google"
    
    // Try to find quoted phrases
    const quotedMatch = question.match(/"([^"]+)"/);
    if (quotedMatch) return quotedMatch[1];
    
    // Try to find phrases after "your" or "the"
    const patterns = [
      /your\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*(?:\s+(?:project|internship|experience|work|role|position))?)/,
      /the\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*(?:\s+(?:project|internship|experience|work|role|position))?)/,
      /at\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/
    ];
    
    for (const pattern of patterns) {
      const match = question.match(pattern);
      if (match) return match[1];
    }
    
    // Default: use first few words of question
    return question.substring(0, 50).replace(/[?.,]/g, '');
  }

  /**
   * Generate live feedback hints (shown subtly during interview)
   */
  generateHint(analysis) {
    if (!analysis.hasSTAR && this.questionCount > 2) {
      return '💡 Tip: Try using the STAR method (Situation, Task, Action, Result)';
    }
    if (!analysis.hasMetrics && this.questionCount > 3) {
      return '💡 Tip: Quantify your impact with numbers or percentages';
    }
    if (analysis.quality === 'too-brief') {
      return '💡 Tip: Provide more context and details in your answer';
    }
    return null;
  }

  /**
   * 🔥 ADVANCED: Generate real-time coaching tips
   */
  generateCoachingTip(analysis, persona) {
    const tips = {
      confused: [
        'Take a deep breath and structure your thoughts before answering.',
        'Start with a specific example from your experience.',
        'Break down your answer: Situation → Task → Action → Result',
      ],
      chatty: [
        'Great enthusiasm! Now focus on the core question being asked.',
        'Try to keep your answers under 2 minutes and stay on topic.',
        'Strong communication! Balance detail with conciseness.',
      ],
      efficient: [
        'Excellent structure! Consider adding emotional context to make it more engaging.',
        'Your answers are strong. Try varying your pace for emphasis.',
        'Great use of metrics! Add a personal reflection to deepen your answer.',
      ],
      balanced: null,
    };

    const personaTips = tips[persona];
    if (!personaTips) return null;

    // Additional quality-based tips
    if (analysis.quality === 'too-brief') {
      return 'Your answer is too short. Aim for 60-120 words with specific examples.';
    }
    if (analysis.quality === 'too-verbose' && persona !== 'chatty') {
      return 'Try to be more concise. Focus on the most impactful details.';
    }
    if (!analysis.hasExample && this.questionCount > 2) {
      return 'Use concrete examples from your experience to illustrate your points.';
    }

    // Return random tip from persona tips
    return personaTips[Math.floor(Math.random() * personaTips.length)];
  }

  /**
   * Generate comprehensive post-interview feedback
   */
  async generateFeedback() {
    const feedbackPrompt = `You are an expert interview coach providing detailed, constructive feedback.

Based on this interview transcript:
${this.conversationHistory.map((msg, i) => 
  `${msg.role === 'interviewer' ? 'Interviewer' : 'Candidate'}: ${msg.content}`
).join('\n\n')}

Provide comprehensive feedback in the following JSON format:
{
  "scores": {
    "starFramework": <0-10, how well they used Situation, Task, Action, Result>,
    "technicalDepth": <0-10, depth of technical/domain knowledge>,
    "communicationClarity": <0-10, clarity and structure of responses>,
    "confidence": <0-10, confidence level detected>,
    "overall": <0-100, overall interview readiness percentage>
  },
  "strengths": [
    "Specific strength with example from interview",
    "Another strength with example",
    "Third strength"
  ],
  "improvements": [
    {
      "area": "Area needing improvement",
      "feedback": "Specific, actionable advice",
      "example": "Here's how you could have answered better: '...'"
    },
    {
      "area": "Another area",
      "feedback": "More advice",
      "example": "Better answer example"
    }
  ],
  "topAnswers": [
    {
      "question": "Which question",
      "why": "Why this answer was strong"
    }
  ],
  "needsWork": [
    {
      "question": "Which question",
      "why": "Why this needs improvement"
    }
  ],
  "personalityProfile": "Detected interview style/persona",
  "keyTakeaway": "One sentence most important thing to work on"
}

Be specific, encouraging, and actionable. Reference actual responses from the interview.`;

    try {
      const response = await groq.chat.completions.create({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: 'You are an expert interview coach. Provide detailed, constructive feedback in valid JSON format only.' },
          { role: 'user', content: feedbackPrompt }
        ],
        temperature: 0.3,
        max_tokens: 2000,
        response_format: { type: "json_object" }
      });
      
      const responseText = response.choices[0].message.content;
      
      // Parse JSON response
      const feedback = JSON.parse(responseText);
      return feedback;
    } catch (error) {
      console.error('Error generating feedback:', error);
      // Return fallback feedback
      return this.generateFallbackFeedback();
    }
  }

  /**
   * Fallback feedback if AI generation fails
   */
  generateFallbackFeedback() {
    const starScore = Math.min(10, (this.userProfile.starUsage / this.questionCount) * 10);
    const techScore = Math.min(10, (this.userProfile.technicalDepth / this.questionCount) * 10);
    const commScore = Math.max(3, 10 - this.userProfile.nervousness);
    const confScore = Math.min(10, this.userProfile.confidence);
    
    return {
      scores: {
        starFramework: Math.round(starScore),
        technicalDepth: Math.round(techScore),
        communicationClarity: Math.round(commScore),
        confidence: Math.round(confScore),
        overall: Math.round((starScore + techScore + commScore + confScore) * 2.5),
      },
      strengths: [
        "Completed the full interview",
        "Engaged with all questions",
      ],
      improvements: [
        {
          area: "STAR Framework",
          feedback: "Practice structuring answers with Situation, Task, Action, Result",
          example: "Instead of just describing what you did, explain the context, your specific role, actions you took, and measurable results.",
        },
      ],
      topAnswers: [],
      needsWork: [],
      personalityProfile: this.detectPersona(),
      keyTakeaway: "Practice using the STAR method to structure your responses.",
    };
  }

  /**
   * Handle edge cases: silence, topic changes, etc.
   */
  async handleEdgeCase(caseType, context = {}) {
    const responses = {
      silence: "Take your time. If you need me to rephrase the question, just let me know.",
      oneWord: "Could you elaborate on that? I'd love to hear more details about your experience.",
      offTopic: "That's interesting! But let's get back to the question at hand. " + 
                (context.originalQuestion || "Can you tell me more about that?"),
      changeRole: "I understand you'd like to switch focus. Let's finish this interview first, then we can explore other roles.",
      restart: "Of course! Let's start fresh. Are you ready to begin again?",
    };
    
    return responses[caseType] || "Let's continue with the interview.";
  }
}

/**
 * Voice synthesis utility
 */
export class VoiceService {
  constructor() {
    this.synthesis = window.speechSynthesis;
    this.recognition = null;
    this.isListening = false;
    
    // Initialize speech recognition if available
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = true;
      this.recognition.lang = 'en-US';
    }
  }

  /**
   * Speak text with natural pacing
   */
  speak(text, options = {}) {
    return new Promise((resolve, reject) => {
      // Cancel any ongoing speech
      this.synthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = options.rate || 0.9; // Slightly slower for clarity
      utterance.pitch = options.pitch || 1;
      utterance.volume = options.volume || 1;
      
      // Use a professional voice if available
      const voices = this.synthesis.getVoices();
      const preferredVoice = voices.find(v => 
        v.name.includes('Google') || v.name.includes('Microsoft')
      );
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }
      
      utterance.onend = resolve;
      utterance.onerror = reject;
      
      this.synthesis.speak(utterance);
    });
  }

  /**
   * Stop speaking
   */
  stop() {
    this.synthesis.cancel();
  }

  /**
   * Start listening for speech
   */
  startListening(onResult, onError) {
    if (!this.recognition) {
      onError(new Error('Speech recognition not supported'));
      return;
    }

    this.isListening = true;
    let finalTranscript = '';
    let interimTranscript = '';

    this.recognition.onresult = (event) => {
      interimTranscript = '';
      
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript + ' ';
        } else {
          interimTranscript += transcript;
        }
      }
      
      onResult({
        final: finalTranscript.trim(),
        interim: interimTranscript,
        isFinal: false,
      });
    };

    this.recognition.onend = () => {
      this.isListening = false;
      if (finalTranscript) {
        onResult({
          final: finalTranscript.trim(),
          interim: '',
          isFinal: true,
        });
      }
    };

    this.recognition.onerror = (event) => {
      this.isListening = false;
      onError(event.error);
    };

    try {
      this.recognition.start();
    } catch (error) {
      onError(error);
    }
  }

  /**
   * Stop listening
   */
  stopListening() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    }
  }
}
