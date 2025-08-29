import React from 'react';
import { FaPlus, FaChartLine, FaBookmark, FaUsers, FaQrcode, FaDownload } from 'react-icons/fa';

function QuickActions({ navigator }) {
  const actions = [
    {
      icon: <FaPlus className="text-xl" />,
      title: "Quick Poll",
      description: "Create a poll in 30 seconds",
      action: () => navigator("/create"),
      color: "btn-primary"
    },
    {
      icon: <FaChartLine className="text-xl" />,
      title: "Analytics",
      description: "View detailed insights",
      action: () => navigator("/analytics"),
      color: "btn-secondary"
    },
    {
      icon: <FaBookmark className="text-xl" />,
      title: "Bookmarks",
      description: "Saved polls & templates",
      action: () => navigator("/bookmarks"),
      color: "btn-accent"
    },
    {
      icon: <FaUsers className="text-xl" />,
      title: "Browse Polls",
      description: "Explore community polls",
      action: () => navigator("/polls"),
      color: "btn-info"
    }
  ];

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
        <FaQrcode className="text-blue-400" />
        Quick Actions
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action, index) => (
          <button
            key={index}
            className={`${action.color} btn h-auto p-6 flex-col gap-3 hover:shadow-lg transform hover:scale-105 transition-all duration-200`}
            onClick={action.action}
          >
            {action.icon}
            <div className="text-center">
              <div className="font-semibold">{action.title}</div>
              <div className="text-xs opacity-70">{action.description}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default QuickActions;