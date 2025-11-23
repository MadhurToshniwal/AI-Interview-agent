import { useState, useEffect, useRef } from 'react';
import { InterviewAgent, VoiceService, ROLE_CONFIGS } from '../services/interviewService';

/**
 * InterviewInterface Component
 * The main interview experience with voice/text input, real-time feedback, and adaptive AI
 */
export default function InterviewInterface({ role, difficulty, resumeText = '', onComplete, onBack }) {
  const [agent] = useState(() => new InterviewAgent(role, difficulty, resumeText));
  const [voiceService] = useState(() => new VoiceService());
  
  const [isLoading, setIsLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [questionNumber, setQuestionNumber] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(7);
  
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [useVoice, setUseVoice] = useState(true);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  
  const [transcript, setTranscript] = useState('');
  const [finalTranscript, setFinalTranscript] = useState('');
  const [conversationHistory, setConversationHistory] = useState([]);
  
  const [currentHint, setCurrentHint] = useState(null);
  const [error, setError] = useState(null);
  const [silenceTimer, setSilenceTimer] = useState(null);
  
  // Advanced features
  const [liveScore, setLiveScore] = useState(0);
  const [sentimentScore, setSentimentScore] = useState(50);
  const [detectedPersona, setDetectedPersona] = useState('analyzing...');
  const [responseQuality, setResponseQuality] = useState('');
  const [liveCoachingTip, setLiveCoachingTip] = useState(null);
  const [wordCount, setWordCount] = useState(0);
  const [speakingPace, setSpeakingPace] = useState('normal');
  
  const textInputRef = useRef(null);
  const conversationEndRef = useRef(null);

  // Initialize interview
  useEffect(() => {
    startInterview();
    checkVoiceAvailability();
  }, []);

  // Auto-scroll conversation
  useEffect(() => {
    conversationEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversationHistory, transcript]);

  const checkVoiceAvailability = () => {
    const hasVoice = 'speechSynthesis' in window && 
                     ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window);
    setVoiceEnabled(hasVoice);
    if (!hasVoice) {
      setUseVoice(false);
    }
  };

  const startInterview = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const { question, questionNumber: qNum, totalQuestions: total } = await agent.startInterview();
      
      setCurrentQuestion(question);
      setQuestionNumber(qNum);
      setTotalQuestions(total);
      setConversationHistory([{ role: 'interviewer', content: question }]);
      
      // Speak the question if voice is enabled
      if (useVoice && voiceEnabled) {
        speakQuestion(question);
      }
      
      setIsLoading(false);
    } catch (err) {
      console.error('Failed to start interview:', err);
      setError('Failed to start interview. Please check your API key in the .env file.');
      setIsLoading(false);
    }
  };

  const speakQuestion = async (text) => {
    try {
      setIsSpeaking(true);
      await voiceService.speak(text);
      setIsSpeaking(false);
    } catch (err) {
      console.error('Speech error:', err);
      setIsSpeaking(false);
    }
  };

  const startListening = () => {
    if (!voiceEnabled) return;
    
    setTranscript('');
    setFinalTranscript('');
    setIsListening(true);
    setError(null);
    
    // Start silence detection
    const timer = setTimeout(() => {
      handleSilence();
    }, 30000); // 30 seconds of silence
    setSilenceTimer(timer);
    
    voiceService.startListening(
      (result) => {
        // Clear silence timer on activity
        if (silenceTimer) {
          clearTimeout(silenceTimer);
        }
        
        setTranscript(result.interim);
        if (result.isFinal && result.final) {
          setFinalTranscript(result.final);
          setIsListening(false);
          handleUserResponse(result.final);
        }
      },
      (error) => {
        console.error('Speech recognition error:', error);
        setIsListening(false);
        if (error === 'not-allowed') {
          setError('Microphone permission denied. Please enable it or use text input.');
        }
      }
    );
  };

  const stopListening = () => {
    voiceService.stopListening();
    setIsListening(false);
    if (silenceTimer) {
      clearTimeout(silenceTimer);
    }
    
    // If we have a transcript, submit it
    if (transcript || finalTranscript) {
      handleUserResponse(finalTranscript || transcript);
    }
  };

  const handleSilence = async () => {
    setIsListening(false);
    const response = await agent.handleEdgeCase('silence');
    setConversationHistory(prev => [...prev, { role: 'interviewer', content: response }]);
    if (useVoice && voiceEnabled) {
      speakQuestion(response);
    }
  };

  const handleUserResponse = async (response) => {
    if (!response || response.trim().length === 0) return;
    
    // Clear silence timer
    if (silenceTimer) {
      clearTimeout(silenceTimer);
    }
    
    setIsLoading(true);
    setTranscript('');
    setFinalTranscript('');
    
    // Add user response to history
    setConversationHistory(prev => [...prev, { role: 'user', content: response }]);
    
    try {
      // Handle edge cases
      if (response.trim().split(/\s+/).length <= 2) {
        // One or two word answer - edge case
        const edgeResponse = await agent.handleEdgeCase('oneWord');
        setConversationHistory(prev => [...prev, { role: 'interviewer', content: edgeResponse }]);
        if (useVoice && voiceEnabled) {
          speakQuestion(edgeResponse);
        }
        setIsLoading(false);
        return;
      }
      
      // Check for off-topic responses (basic heuristic)
      const offTopicKeywords = ['weather', 'sports', 'movie', 'food', 'game'];
      const isOffTopic = offTopicKeywords.some(keyword => 
        response.toLowerCase().includes(keyword)
      );
      
      if (isOffTopic && Math.random() > 0.5) { // Sometimes let it slide
        const redirectResponse = await agent.handleEdgeCase('offTopic', { originalQuestion: currentQuestion });
        setConversationHistory(prev => [...prev, { role: 'interviewer', content: redirectResponse }]);
        if (useVoice && voiceEnabled) {
          speakQuestion(redirectResponse);
        }
        setIsLoading(false);
        return;
      }
      
      // Generate follow-up question
      const result = await agent.generateFollowUp(response);
      
      // Update advanced metrics
      updateLiveMetrics(result.analysis);
      
      // Check if interview is complete
      if (result.isComplete) {
        // Stop voice service to prevent speaking after completion
        voiceService.stop();
        setIsLoading(false);
        setTimeout(() => completeInterview(), 1500);
      } else {
        // Interview continues - add question to history and display
        setCurrentQuestion(result.question);
        setQuestionNumber(result.questionNumber);
        setConversationHistory(prev => [...prev, { role: 'interviewer', content: result.question }]);
        
        // Show hint if available
        if (result.hint) {
          setCurrentHint(result.hint);
          setTimeout(() => setCurrentHint(null), 8000);
        }
        
        // Show live coaching tip
        if (result.coachingTip) {
          setLiveCoachingTip(result.coachingTip);
          setTimeout(() => setLiveCoachingTip(null), 10000);
        }
        
        // Speak next question
        if (useVoice && voiceEnabled) {
          speakQuestion(result.question);
        }
        
        setIsLoading(false);
      }
    } catch (err) {
      console.error('Error processing response:', err);
      setError('Failed to process your response. Please try again.');
      setIsLoading(false);
    }
  };

  const handleTextSubmit = (e) => {
    e.preventDefault();
    const input = textInputRef.current.value.trim();
    if (input) {
      handleUserResponse(input);
      textInputRef.current.value = '';
    }
  };

  const completeInterview = async () => {
    // CRITICAL: Stop all voice activity immediately when interview completes
    voiceService.stop();
    voiceService.stopListening();
    
    setIsLoading(true);
    try {
      const feedback = await agent.generateFeedback();
      onComplete(feedback, conversationHistory);
    } catch (err) {
      console.error('Error generating feedback:', err);
      setError('Failed to generate feedback. Please try again.');
      setIsLoading(false);
    }
  };

  const handleSkipToFeedback = () => {
    if (window.confirm('Are you sure you want to end the interview early?')) {
      completeInterview();
    }
  };

  // Advanced: Update live metrics based on response analysis
  const updateLiveMetrics = (analysis) => {
    if (!analysis) return;
    
    // Calculate live score (0-100)
    let score = 50;
    if (analysis.hasExample) score += 15;
    if (analysis.hasMetrics) score += 15;
    if (analysis.hasSTAR) score += 20;
    if (analysis.quality === 'excellent') score = Math.min(100, score + 10);
    if (analysis.quality === 'too-brief') score -= 20;
    
    setLiveScore(score);
    
    // Sentiment analysis (simple)
    const uncertaintyRatio = analysis.uncertaintyCount / Math.max(1, analysis.wordCount / 50);
    const sentiment = Math.max(0, Math.min(100, 70 - uncertaintyRatio * 30));
    setSentimentScore(sentiment);
    
    // Response quality
    setResponseQuality(analysis.quality);
    
    // Word count
    setWordCount(analysis.wordCount);
    
    // Speaking pace (estimated)
    if (analysis.wordCount < 30) setSpeakingPace('too brief');
    else if (analysis.wordCount > 200) setSpeakingPace('too lengthy');
    else if (analysis.wordCount > 100) setSpeakingPace('detailed');
    else setSpeakingPace('concise');
  };

  const roleConfig = ROLE_CONFIGS[role];

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <button
            onClick={onBack}
            className="text-slate-400 hover:text-white transition-colors mb-2 flex items-center"
          >
            ← Back to Role Selection
          </button>
          <h1 className="text-3xl font-bold flex items-center">
            <span className="text-4xl mr-3">{roleConfig.icon}</span>
            {roleConfig.name} Interview
          </h1>
        </div>
        <div className="text-right">
          <div className="text-sm text-slate-400 mb-1">Progress</div>
          <div className="text-2xl font-bold text-blue-400">
            {questionNumber} / {totalQuestions}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6 bg-slate-700 rounded-full h-2 overflow-hidden">
        <div
          className="bg-gradient-to-r from-blue-500 to-purple-500 h-full transition-all duration-500"
          style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
        />
      </div>

      {/* 🔥 ADVANCED: Live Performance Dashboard */}
      {questionNumber > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-6">
          {/* Live Score */}
          <div className="card bg-gradient-to-br from-blue-900/40 to-blue-800/40 border-blue-500/30">
            <div className="text-xs text-blue-300 mb-1">Live Score</div>
            <div className="text-3xl font-bold text-blue-400">{liveScore}%</div>
            <div className="text-xs text-slate-400 mt-1">
              {liveScore >= 80 ? '🔥 Excellent!' : liveScore >= 60 ? '👍 Good' : '💡 Keep going'}
            </div>
          </div>

          {/* Sentiment */}
          <div className="card bg-gradient-to-br from-green-900/40 to-green-800/40 border-green-500/30">
            <div className="text-xs text-green-300 mb-1">Confidence</div>
            <div className="text-3xl font-bold text-green-400">{Math.round(sentimentScore)}%</div>
            <div className="text-xs text-slate-400 mt-1">
              {sentimentScore >= 70 ? '😊 Confident' : sentimentScore >= 50 ? '😐 Neutral' : '😟 Nervous'}
            </div>
          </div>

          {/* Response Quality */}
          <div className="card bg-gradient-to-br from-purple-900/40 to-purple-800/40 border-purple-500/30">
            <div className="text-xs text-purple-300 mb-1">Response Quality</div>
            <div className="text-lg font-bold text-purple-400 capitalize">{responseQuality || 'analyzing...'}</div>
            <div className="text-xs text-slate-400 mt-1">{wordCount} words</div>
          </div>

          {/* Speaking Pace */}
          <div className="card bg-gradient-to-br from-orange-900/40 to-orange-800/40 border-orange-500/30">
            <div className="text-xs text-orange-300 mb-1">Speaking Pace</div>
            <div className="text-lg font-bold text-orange-400 capitalize">{speakingPace}</div>
            <div className="text-xs text-slate-400 mt-1">
              {speakingPace === 'too brief' ? 'Add more detail' : speakingPace === 'too lengthy' ? 'Be concise' : 'Perfect!'}
            </div>
          </div>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="card bg-red-900/30 border-red-500/50 mb-6">
          <div className="flex items-start">
            <span className="text-2xl mr-3">⚠️</span>
            <div>
              <h3 className="font-bold text-red-300 mb-1">Error</h3>
              <p className="text-red-200">{error}</p>
              <button
                onClick={() => setError(null)}
                className="text-sm text-red-300 hover:text-red-200 mt-2 underline"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Live Coaching Tip */}
      {liveCoachingTip && (
        <div className="card bg-yellow-900/30 border-yellow-500/50 mb-6 animate-pulse-slow">
          <div className="flex items-start">
            <span className="text-2xl mr-3">💡</span>
            <div>
              <h3 className="font-bold text-yellow-300 mb-1">Live Coaching Tip</h3>
              <p className="text-yellow-200">{liveCoachingTip}</p>
            </div>
          </div>
        </div>
      )}

      {/* Hint Display */}
      {currentHint && (
        <div className="card bg-blue-900/30 border-blue-500/50 mb-6 animate-pulse-slow">
          <p className="text-blue-200">{currentHint}</p>
        </div>
      )}

      {/* Conversation History */}
      <div className="card mb-6 max-h-96 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4 sticky top-0 bg-slate-800/90 backdrop-blur-sm pb-2">
          Interview Conversation
        </h2>
        
        <div className="space-y-4">
          {conversationHistory.map((message, idx) => (
            <div
              key={idx}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-4 py-3 ${
                  message.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-700 text-slate-100'
                }`}
              >
                <div className="text-xs opacity-70 mb-1">
                  {message.role === 'user' ? 'You' : 'Interviewer'}
                </div>
                <p className="leading-relaxed">{message.content}</p>
              </div>
            </div>
          ))}
          
          {/* Live transcript while speaking */}
          {(transcript || finalTranscript) && (
            <div className="flex justify-end">
              <div className="max-w-[80%] rounded-lg px-4 py-3 bg-blue-600/50 text-white border-2 border-blue-400">
                <div className="text-xs opacity-70 mb-1">You (speaking...)</div>
                <p className="leading-relaxed">{finalTranscript || transcript}</p>
              </div>
            </div>
          )}
          
          <div ref={conversationEndRef} />
        </div>
      </div>

      {/* Voice/Text Input Section */}
      <div className="card">
        {/* Input Mode Toggle */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold">Your Response</h3>
          {voiceEnabled && (
            <button
              onClick={() => setUseVoice(!useVoice)}
              className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
            >
              Switch to {useVoice ? 'Text' : 'Voice'} Input
            </button>
          )}
        </div>

        {useVoice ? (
          /* Voice Input */
          <div className="text-center py-8">
            {/* Waveform Animation */}
            {(isListening || isSpeaking) && (
              <div className="flex justify-center items-center space-x-2 mb-6 h-20">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-2 bg-blue-500 rounded-full animate-wave"
                    style={{
                      animationDelay: `${i * 0.1}s`,
                      height: '40px',
                    }}
                  />
                ))}
              </div>
            )}

            {isSpeaking && (
              <div className="text-slate-300 mb-4">
                🔊 Interviewer is speaking...
              </div>
            )}

            {isListening ? (
              <div>
                <div className="text-2xl mb-2">🎤</div>
                <div className="text-slate-300 mb-4">Listening... Speak your answer</div>
                <button
                  onClick={stopListening}
                  className="btn-secondary"
                  disabled={isLoading}
                >
                  Stop & Submit
                </button>
              </div>
            ) : (
              <button
                onClick={startListening}
                disabled={isLoading || isSpeaking || !voiceEnabled}
                className="btn-primary text-lg"
              >
                🎤 {isLoading ? 'Processing...' : 'Start Speaking'}
              </button>
            )}
            
            {!voiceEnabled && (
              <p className="text-sm text-red-400 mt-4">
                Voice input not available. Please use text input.
              </p>
            )}
          </div>
        ) : (
          /* Text Input */
          <form onSubmit={handleTextSubmit}>
            <textarea
              ref={textInputRef}
              placeholder="Type your answer here..."
              className="input w-full min-h-[120px] resize-y mb-4"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full"
            >
              {isLoading ? 'Processing...' : '📝 Submit Answer'}
            </button>
          </form>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between mt-6">
        <button
          onClick={handleSkipToFeedback}
          className="btn-secondary"
          disabled={isLoading || questionNumber < 3}
        >
          End Interview Early
        </button>
        
        <div className="text-sm text-slate-400 flex items-center">
          {isLoading && (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent mr-2"></div>
              Processing...
            </>
          )}
        </div>
      </div>

      {/* Tips */}
      <div className="card mt-6 bg-purple-900/20 border-purple-500/30">
        <h3 className="font-bold text-purple-300 mb-2">💡 Interview Tips</h3>
        <ul className="text-sm text-slate-300 space-y-1">
          <li>• Use the STAR method: Situation, Task, Action, Result</li>
          <li>• Provide specific examples from your experience</li>
          <li>• Include metrics and measurable outcomes when possible</li>
          <li>• Take your time to think before responding</li>
        </ul>
      </div>
    </div>
  );
}
