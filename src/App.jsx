import { useState } from 'react';
import RoleSelection from './components/RoleSelection';
import InterviewInterface from './components/InterviewInterface';
import FeedbackDashboard from './components/FeedbackDashboard';
import './index.css';

/**
 * Main App Component
 * Orchestrates the interview flow: Role Selection → Interview → Feedback
 */
function App() {
  const [currentScreen, setCurrentScreen] = useState('role-selection'); // role-selection | interview | feedback
  const [selectedRole, setSelectedRole] = useState(null);
  const [difficulty, setDifficulty] = useState('medium');
  const [resumeText, setResumeText] = useState('');
  const [feedbackData, setFeedbackData] = useState(null);
  const [interviewHistory, setInterviewHistory] = useState([]);

  const handleRoleSelect = (role, diff, resume = '') => {
    setSelectedRole(role);
    setDifficulty(diff);
    setResumeText(resume);
    setCurrentScreen('interview');
  };

  const handleInterviewComplete = (feedback, history) => {
    setFeedbackData(feedback);
    setInterviewHistory(history);
    setCurrentScreen('feedback');
  };

  const handleRestart = () => {
    setCurrentScreen('role-selection');
    setSelectedRole(null);
    setDifficulty('medium');
    setResumeText('');
    setFeedbackData(null);
    setInterviewHistory([]);
  };

  const handleRetry = () => {
    setCurrentScreen('interview');
    setFeedbackData(null);
    setInterviewHistory([]);
  };

  return (
    <div className="min-h-screen w-full overflow-auto">
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-slow"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-slow animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-slow animation-delay-4000"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10">
        {currentScreen === 'role-selection' && (
          <RoleSelection onRoleSelect={handleRoleSelect} />
        )}
        
        {currentScreen === 'interview' && (
          <InterviewInterface
            role={selectedRole}
            difficulty={difficulty}
            resumeText={resumeText}
            onComplete={handleInterviewComplete}
            onBack={handleRestart}
          />
        )}
        
        {currentScreen === 'feedback' && (
          <FeedbackDashboard
            feedback={feedbackData}
            history={interviewHistory}
            role={selectedRole}
            onRestart={handleRestart}
            onRetry={handleRetry}
          />
        )}
      </div>

      {/* Footer */}
      <footer className="relative z-10 text-center py-6 text-slate-400 text-sm">
        <p>Built with ❤️ using React, Gemini AI & Web Speech API</p>
        <p className="mt-1">© 2025 Interview Practice Partner</p>
      </footer>
    </div>
  );
}

export default App;
