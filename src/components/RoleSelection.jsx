import { useState } from 'react';
import { ROLE_CONFIGS } from '../services/interviewService';
import * as pdfjsLib from 'pdfjs-dist';

// Configure PDF.js worker - Use local worker file
pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

/**
 * RoleSelection Component
 * Beautiful interface for selecting interview role and difficulty
 */
export default function RoleSelection({ onRoleSelect }) {
  const [selectedRole, setSelectedRole] = useState(null);
  const [difficulty, setDifficulty] = useState('medium');
  const [showSettings, setShowSettings] = useState(false);
  const [resumeText, setResumeText] = useState('');
  const [resumeFile, setResumeFile] = useState(null);
  const [isParsingResume, setIsParsingResume] = useState(false);

  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setResumeFile(file);
    setIsParsingResume(true);

    try {
      const text = await extractTextFromFile(file);
      console.log('Extracted text length:', text.length);
      console.log('First 200 chars:', text.substring(0, 200));
      setResumeText(text);
      setIsParsingResume(false);
    } catch (error) {
      console.error('Error parsing resume:', error);
      console.error('Error stack:', error.stack);
      alert(`Failed to parse resume: ${error.message}. Please try a different file or paste your resume text.`);
      setIsParsingResume(false);
    }
  };

  const extractTextFromFile = async (file) => {
    // Handle PDF files
    if (file.type === 'application/pdf') {
      return await extractTextFromPDF(file);
    }
    
    // Handle text files
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        const text = e.target.result;
        resolve(text);
      };
      
      reader.onerror = reject;
      reader.readAsText(file);
    });
  };

  const extractTextFromPDF = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let fullText = '';

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map(item => item.str).join(' ');
      fullText += pageText + '\n';
    }

    return fullText.trim();
  };

  const handleStart = () => {
    if (selectedRole) {
      onRoleSelect(selectedRole, difficulty, resumeText);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Interview Practice Partner
        </h1>
        <p className="text-xl text-slate-300 mb-2">
          Ace your next interview with AI-powered practice
        </p>
        <p className="text-slate-400">
          Real interviewer behaviors • Adaptive difficulty • Detailed feedback
        </p>
      </div>

      {/* Features Banner */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
        {[
          { icon: '🎯', title: 'Adaptive', desc: 'Adjusts to your level' },
          { icon: '🗣️', title: 'Voice-First', desc: 'Natural conversations' },
          { icon: '📊', title: 'Detailed Feedback', desc: 'STAR framework scoring' },
          { icon: '📄', title: 'Resume-Based', desc: 'Questions from YOUR resume' },
        ].map((feature, idx) => (
          <div key={idx} className="card text-center">
            <div className="text-4xl mb-2">{feature.icon}</div>
            <h3 className="font-semibold text-white mb-1">{feature.title}</h3>
            <p className="text-sm text-slate-400">{feature.desc}</p>
          </div>
        ))}
      </div>

      {/* 🔥 RESUME UPLOAD - NEW FEATURE! */}
      <div className="card mb-8 bg-gradient-to-br from-purple-900/40 to-blue-900/40 border-purple-500/30">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <span className="text-3xl mr-3">📄</span>
            <div>
              <h3 className="text-xl font-bold text-white">Upload Your Resume (Optional)</h3>
              <p className="text-sm text-slate-300">Get personalized questions based on your experience</p>
            </div>
          </div>
          {resumeFile && (
            <span className="text-green-400 font-semibold">✓ Uploaded</span>
          )}
        </div>

        <div className="space-y-4">
          {/* File Upload */}
          <div>
            <label className="block">
              <div className="border-2 border-dashed border-slate-600 rounded-lg p-6 text-center hover:border-blue-500 transition-colors cursor-pointer">
                <input
                  type="file"
                  accept=".txt,.pdf,.doc,.docx"
                  onChange={handleResumeUpload}
                  className="hidden"
                  disabled={isParsingResume}
                />
                {isParsingResume ? (
                  <div className="text-blue-400">
                    <div className="animate-spin text-4xl mb-2">⚙️</div>
                    <p>Parsing your resume...</p>
                  </div>
                ) : resumeFile ? (
                  <div className="text-green-400">
                    <div className="text-4xl mb-2">✅</div>
                    <p className="font-semibold">{resumeFile.name}</p>
                    <p className="text-sm text-slate-400 mt-1">Click to upload a different file</p>
                  </div>
                ) : (
                  <div className="text-slate-300">
                    <div className="text-4xl mb-2">📤</div>
                    <p className="font-semibold">Click to upload resume</p>
                    <p className="text-sm text-slate-400 mt-1">Supports: TXT, PDF, DOC, DOCX</p>
                  </div>
                )}
              </div>
            </label>
          </div>

          {/* OR Paste Resume Text */}
          <div className="text-center text-slate-400">OR</div>
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              Paste Your Resume Text
            </label>
            <textarea
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              placeholder="Paste your resume content here... The AI will analyze your experience, projects, and skills to ask relevant questions."
              className="w-full h-32 px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          {resumeText && (
            <div className="bg-green-900/30 border border-green-500/30 rounded-lg p-3 text-sm">
              <p className="text-green-300">
                <strong>✓ Resume loaded!</strong> The AI will ask questions about your experience, projects mentioned in your resume, and skills you've listed.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Role Selection */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Choose Your Interview Role</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(ROLE_CONFIGS).map(([key, config]) => (
            <button
              key={key}
              onClick={() => setSelectedRole(key)}
              className={`card text-left transition-all duration-300 hover:scale-105 cursor-pointer
                ${selectedRole === key 
                  ? 'ring-4 ring-blue-500 bg-slate-700/70' 
                  : 'hover:bg-slate-700/50'
                }`}
            >
              <div className="text-5xl mb-3">{config.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2">{config.name}</h3>
              <p className="text-slate-300 text-sm">{config.description}</p>
              
              {selectedRole === key && (
                <div className="mt-4 flex items-center text-blue-400 text-sm font-semibold">
                  <span className="mr-2">✓</span> Selected
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Difficulty Settings */}
      <div className="card mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">Interview Settings</h3>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            {showSettings ? 'Hide' : 'Show'} Settings
          </button>
        </div>

        {showSettings && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-3">
                Difficulty Level
              </label>
              <div className="grid grid-cols-3 gap-3">
                {['easy', 'medium', 'hard'].map((level) => (
                  <button
                    key={level}
                    onClick={() => setDifficulty(level)}
                    className={`py-3 px-4 rounded-lg font-semibold transition-all capitalize
                      ${difficulty === level
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
                      }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
              <p className="text-sm text-slate-400 mt-2">
                {difficulty === 'easy' && '📝 Basic questions, gentle follow-ups'}
                {difficulty === 'medium' && '⚡ Standard interview difficulty'}
                {difficulty === 'hard' && '🔥 Deep dives, challenging scenarios'}
              </p>
            </div>

            <div className="border-t border-slate-700 pt-4">
              <h4 className="font-semibold text-white mb-2">What to expect:</h4>
              <ul className="text-sm text-slate-300 space-y-2">
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>5-7 questions with intelligent follow-ups</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>Real-time hints and guidance</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>Comprehensive feedback with scoring</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>Voice or text input supported</span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Start Button */}
      <div className="text-center">
        <button
          onClick={handleStart}
          disabled={!selectedRole}
          className="btn-primary text-lg px-12 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {selectedRole ? '🎤 Start Interview' : 'Select a Role to Continue'}
        </button>
        
        {selectedRole && (
          <p className="text-slate-400 text-sm mt-4">
            💡 Make sure you're in a quiet environment and your microphone is working
          </p>
        )}
      </div>

      {/* Demo Scenarios Info */}
      <div className="card mt-12 bg-blue-900/20 border-blue-500/30">
        <h3 className="text-lg font-bold text-blue-300 mb-3">✨ Try These Demo Scenarios</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="font-semibold text-white mb-1">😕 Confused User</p>
            <p className="text-slate-300">Say: "Um, I want interview practice... for jobs?"</p>
          </div>
          <div>
            <p className="font-semibold text-white mb-1">⚡ Efficient User</p>
            <p className="text-slate-300">Say: "Software engineer interview, let's go"</p>
          </div>
          <div>
            <p className="font-semibold text-white mb-1">💬 Chatty User</p>
            <p className="text-slate-300">Go off-topic during answers to test redirection</p>
          </div>
          <div>
            <p className="font-semibold text-white mb-1">🎭 Edge Case User</p>
            <p className="text-slate-300">Try one-word answers or long silences</p>
          </div>
        </div>
      </div>
    </div>
  );
}
