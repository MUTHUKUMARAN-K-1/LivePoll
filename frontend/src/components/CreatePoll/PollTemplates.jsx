import React from 'react';
import { FaGraduationCap, FaUsers, FaClock, FaLightbulb } from 'react-icons/fa';

function PollTemplates({ onTemplateSelect }) {
  const templates = [
    {
      title: "Quick Understanding Check",
      description: "How well did you understand today's lesson?",
      options: ["Completely understood", "Mostly understood", "Somewhat confused", "Need more help"],
      category: "feedback",
      icon: <FaGraduationCap className="text-blue-400" />
    },
    {
      title: "Icebreaker: Favorite Season",
      description: "What's your favorite season of the year?",
      options: ["Spring", "Summer", "Fall", "Winter"],
      category: "icebreaker",
      icon: <FaUsers className="text-green-400" />
    },
    {
      title: "Class Pace Check",
      description: "How do you feel about our current pace?",
      options: ["Too fast", "Just right", "Too slow", "Need more practice"],
      category: "feedback",
      icon: <FaClock className="text-orange-400" />
    },
    {
      title: "Learning Style Preference",
      description: "Which learning method helps you most?",
      options: ["Visual aids", "Hands-on activities", "Group discussions", "Individual work"],
      category: "quiz",
      icon: <FaLightbulb className="text-purple-400" />
    }
  ];

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-slate-700/50">
      <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <FaLightbulb className="text-yellow-400" />
        Quick Templates
      </h2>
      
      <div className="space-y-4">
        {templates.map((template, index) => (
          <button
            key={index}
            className="w-full text-left p-4 bg-slate-700/50 hover:bg-slate-600/50 rounded-xl transition-all duration-200 border border-slate-600/30 hover:border-blue-400/50 group"
            onClick={() => onTemplateSelect(template)}
          >
            <div className="flex items-start gap-3">
              <div className="p-2 bg-slate-600 rounded-lg group-hover:scale-110 transition-transform duration-200">
                {template.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-white mb-1 group-hover:text-blue-400 transition-colors">
                  {template.title}
                </h3>
                <p className="text-sm text-gray-400 mb-2">{template.description}</p>
                <div className="flex flex-wrap gap-1">
                  {template.options.slice(0, 2).map((option, i) => (
                    <span key={i} className="text-xs bg-slate-600 text-gray-300 px-2 py-1 rounded">
                      {option}
                    </span>
                  ))}
                  {template.options.length > 2 && (
                    <span className="text-xs text-gray-500">
                      +{template.options.length - 2} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl border border-blue-500/30">
        <h3 className="font-semibold text-white mb-2">💡 Template Benefits</h3>
        <ul className="text-sm text-gray-300 space-y-1">
          <li>• Save 5+ minutes per poll</li>
          <li>• Proven engagement patterns</li>
          <li>• Educational best practices</li>
        </ul>
      </div>
    </div>
  );
}

export default PollTemplates;