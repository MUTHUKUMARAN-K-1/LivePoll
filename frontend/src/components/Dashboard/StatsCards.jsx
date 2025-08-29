import React from 'react';
import { FaChartBar, FaUsers, FaClock, FaBookmark } from 'react-icons/fa';

function StatsCards({ activePolls, totalVotes }) {
  const stats = [
    {
      icon: <FaChartBar className="text-2xl text-blue-400" />,
      title: "Active Polls",
      value: activePolls,
      subtitle: "polls created",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <FaUsers className="text-2xl text-green-400" />,
      title: "Total Responses",
      value: totalVotes,
      subtitle: "student votes",
      color: "from-green-500 to-green-600"
    },
    {
      icon: <FaClock className="text-2xl text-purple-400" />,
      title: "Time Saved",
      value: Math.round(activePolls * 0.5 * 10) / 10,
      subtitle: "hours this week",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: <FaBookmark className="text-2xl text-orange-400" />,
      title: "Engagement Rate",
      value: totalVotes > 0 ? Math.round((totalVotes / (activePolls * 25)) * 100) : 0,
      subtitle: "% participation",
      color: "from-orange-500 to-orange-600"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div 
          key={index}
          className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 hover:transform hover:-translate-y-1"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.color}`}>
              {stat.icon}
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
            <p className="text-sm text-gray-400 font-medium">{stat.title}</p>
            <p className="text-xs text-gray-500">{stat.subtitle}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StatsCards;