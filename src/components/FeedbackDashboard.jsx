import { ROLE_CONFIGS } from '../services/interviewService';

/**
 * FeedbackDashboard Component
 * Comprehensive post-interview feedback with scores, insights, and actionable advice
 */
export default function FeedbackDashboard({ feedback, history, role, onRestart, onRetry }) {
  const roleConfig = ROLE_CONFIGS[role];

  const ScoreCircle = ({ score, label, maxScore = 10 }) => {
    const percentage = (score / maxScore) * 100;
    const color = percentage >= 70 ? 'text-green-400' : percentage >= 50 ? 'text-yellow-400' : 'text-red-400';
    const bgColor = percentage >= 70 ? 'bg-green-400' : percentage >= 50 ? 'bg-yellow-400' : 'bg-red-400';
    
    return (
      <div className="text-center">
        <div className="relative inline-flex items-center justify-center mb-3">
          <svg className="transform -rotate-90 w-24 h-24">
            <circle
              cx="48"
              cy="48"
              r="40"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              className="text-slate-700"
            />
            <circle
              cx="48"
              cy="48"
              r="40"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={`${2 * Math.PI * 40}`}
              strokeDashoffset={`${2 * Math.PI * 40 * (1 - percentage / 100)}`}
              className={color}
              strokeLinecap="round"
            />
          </svg>
          <span className={`absolute text-2xl font-bold ${color}`}>
            {score}
            {maxScore === 10 && <span className="text-sm">/10</span>}
            {maxScore === 100 && <span className="text-sm">%</span>}
          </span>
        </div>
        <div className="text-sm text-slate-300 font-semibold">{label}</div>
      </div>
    );
  };

  const getOverallGrade = (score) => {
    if (score >= 80) return { grade: 'A', text: 'Excellent', color: 'text-green-400' };
    if (score >= 70) return { grade: 'B', text: 'Good', color: 'text-blue-400' };
    if (score >= 60) return { grade: 'C', text: 'Average', color: 'text-yellow-400' };
    if (score >= 50) return { grade: 'D', text: 'Needs Work', color: 'text-orange-400' };
    return { grade: 'F', text: 'Keep Practicing', color: 'text-red-400' };
  };

  const overallGrade = getOverallGrade(feedback.scores.overall);

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-block card mb-6">
          <div className={`text-6xl font-bold ${overallGrade.color} mb-2`}>
            {overallGrade.grade}
          </div>
          <div className="text-xl text-slate-300">{overallGrade.text}</div>
        </div>
        
        <h1 className="text-4xl font-bold mb-4">
          Interview Feedback Report
        </h1>
        <p className="text-xl text-slate-300">
          <span className="text-3xl mr-2">{roleConfig.icon}</span>
          {roleConfig.name} Interview
        </p>
      </div>

      {/* Overall Scores */}
      <div className="card mb-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Performance Scores</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          <ScoreCircle 
            score={feedback.scores.starFramework} 
            label="STAR Framework" 
          />
          <ScoreCircle 
            score={feedback.scores.technicalDepth} 
            label="Technical Depth" 
          />
          <ScoreCircle 
            score={feedback.scores.communicationClarity} 
            label="Communication" 
          />
          <ScoreCircle 
            score={feedback.scores.confidence} 
            label="Confidence" 
          />
          <ScoreCircle 
            score={feedback.scores.overall} 
            label="Overall Readiness"
            maxScore={100}
          />
        </div>
      </div>

      {/* Key Takeaway */}
      <div className="card mb-8 bg-gradient-to-r from-purple-900/30 to-blue-900/30 border-purple-500/50">
        <h2 className="text-xl font-bold mb-3 flex items-center">
          <span className="text-2xl mr-2">🎯</span>
          Key Takeaway
        </h2>
        <p className="text-lg text-slate-200 leading-relaxed">
          {feedback.keyTakeaway}
        </p>
      </div>

      {/* Personality Profile */}
      {feedback.personalityProfile && (
        <div className="card mb-8 bg-blue-900/20 border-blue-500/30">
          <h2 className="text-xl font-bold mb-3 flex items-center">
            <span className="text-2xl mr-2">🎭</span>
            Interview Style Profile
          </h2>
          <p className="text-slate-200 capitalize text-lg">
            {feedback.personalityProfile}
          </p>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* Strengths */}
        <div className="card bg-green-900/20 border-green-500/30">
          <h2 className="text-2xl font-bold mb-4 text-green-300 flex items-center">
            <span className="text-3xl mr-2">✅</span>
            Strengths
          </h2>
          <ul className="space-y-3">
            {feedback.strengths.map((strength, idx) => (
              <li key={idx} className="flex items-start">
                <span className="text-green-400 mr-2 mt-1">•</span>
                <span className="text-slate-200">{strength}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Areas for Improvement */}
        <div className="card bg-orange-900/20 border-orange-500/30">
          <h2 className="text-2xl font-bold mb-4 text-orange-300 flex items-center">
            <span className="text-3xl mr-2">📈</span>
            Areas for Improvement
          </h2>
          <div className="space-y-4">
            {feedback.improvements.map((improvement, idx) => (
              <div key={idx} className="border-l-4 border-orange-500 pl-4">
                <h3 className="font-bold text-white mb-1">{improvement.area}</h3>
                <p className="text-slate-300 text-sm mb-2">{improvement.feedback}</p>
                {improvement.example && (
                  <div className="bg-slate-800/50 rounded p-3 text-sm">
                    <div className="text-orange-400 font-semibold mb-1">Better approach:</div>
                    <p className="text-slate-300 italic">"{improvement.example}"</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Answers & Needs Work */}
      {(feedback.topAnswers?.length > 0 || feedback.needsWork?.length > 0) && (
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Top Answers */}
          {feedback.topAnswers?.length > 0 && (
            <div className="card">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <span className="text-2xl mr-2">🌟</span>
                Top Answers
              </h2>
              <div className="space-y-3">
                {feedback.topAnswers.map((answer, idx) => (
                  <div key={idx} className="bg-slate-700/50 rounded-lg p-4">
                    <div className="font-semibold text-blue-300 mb-1">
                      {answer.question}
                    </div>
                    <p className="text-sm text-slate-300">{answer.why}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Needs Work */}
          {feedback.needsWork?.length > 0 && (
            <div className="card">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <span className="text-2xl mr-2">🔧</span>
                Needs More Work
              </h2>
              <div className="space-y-3">
                {feedback.needsWork.map((answer, idx) => (
                  <div key={idx} className="bg-slate-700/50 rounded-lg p-4">
                    <div className="font-semibold text-yellow-300 mb-1">
                      {answer.question}
                    </div>
                    <p className="text-sm text-slate-300">{answer.why}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Interview Transcript */}
      <div className="card mb-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <span className="text-2xl mr-2">📝</span>
          Interview Transcript
        </h2>
        <div className="max-h-96 overflow-y-auto space-y-4">
          {history.map((message, idx) => (
            <div
              key={idx}
              className={`${
                message.role === 'user' ? 'ml-8' : 'mr-8'
              }`}
            >
              <div
                className={`rounded-lg px-4 py-3 ${
                  message.role === 'user'
                    ? 'bg-blue-600/30 border-l-4 border-blue-500'
                    : 'bg-slate-700/50 border-l-4 border-purple-500'
                }`}
              >
                <div className="text-xs opacity-70 mb-1 font-semibold">
                  {message.role === 'user' ? 'You' : 'Interviewer'}
                </div>
                <p className="text-slate-200 leading-relaxed">{message.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <button
          onClick={onRetry}
          className="btn-primary w-full sm:w-auto px-8"
        >
          🔄 Practice Same Role Again
        </button>
        <button
          onClick={onRestart}
          className="btn-secondary w-full sm:w-auto px-8"
        >
          🏠 Try Different Role
        </button>
      </div>

      {/* Next Steps */}
      <div className="card mt-8 bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-blue-500/30">
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <span className="text-2xl mr-2">🚀</span>
          Next Steps to Improve
        </h2>
        <ol className="space-y-3 text-slate-200">
          <li className="flex items-start">
            <span className="font-bold text-blue-400 mr-3">1.</span>
            <span>Review the improvement areas above and create specific examples for each</span>
          </li>
          <li className="flex items-start">
            <span className="font-bold text-blue-400 mr-3">2.</span>
            <span>Practice the STAR method (Situation, Task, Action, Result) with your past experiences</span>
          </li>
          <li className="flex items-start">
            <span className="font-bold text-blue-400 mr-3">3.</span>
            <span>Record yourself answering common questions and review for clarity and confidence</span>
          </li>
          <li className="flex items-start">
            <span className="font-bold text-blue-400 mr-3">4.</span>
            <span>Practice again with this tool to track your progress over time</span>
          </li>
        </ol>
      </div>

      {/* Share Results (Future Enhancement) */}
      <div className="text-center mt-8 text-slate-400 text-sm">
        <p>💡 Tip: Take a screenshot of this feedback to track your progress!</p>
      </div>
    </div>
  );
}
