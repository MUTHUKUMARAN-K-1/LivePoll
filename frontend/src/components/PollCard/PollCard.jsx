import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUsers, FaCalendar, FaEye, FaBookmark } from "react-icons/fa";
import useBookmark from "../../hooks/useBookmark";

function PollCard({ poll }) {
  const navigator = useNavigate();
  const { handleBookmark } = useBookmark();

  const handleViewOnClick = () => {
    navigator(`/poll/${poll._id}`);
  };

  const totalVotes = poll.options?.reduce((sum, opt) => sum + opt.voteCount, 0) || 0;

  return (
    <div className="card bg-slate-800/50 backdrop-blur-sm shadow-xl border border-slate-700/50 hover:border-blue-400/50 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl">
      <div className="card-body p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h2 className="card-title text-xl font-bold text-white mb-2 leading-tight">
              {poll.title}
            </h2>
            <p className="text-sm text-gray-300 line-clamp-2 leading-relaxed">
              {poll.description}
            </p>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleBookmark(poll._id);
            }}
            className="btn btn-ghost btn-sm btn-circle text-gray-400 hover:text-yellow-400 transition-colors"
          >
            <FaBookmark />
          </button>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 mb-4 text-sm">
          <div className="flex items-center gap-2 text-blue-400">
            <FaUsers />
            <span className="font-medium">{totalVotes} votes</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <FaCalendar />
            <span>{new Date(poll?.createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Creator Info */}
        <div className="flex items-center gap-3 mb-4 p-3 bg-slate-700/50 rounded-lg">
          <img
            src={`https://ui-avatars.com/api/?name=${poll.creatorData.username}&background=6366f1&color=fff&size=32`}
            alt={poll.creatorData.username}
            className="rounded-full"
          />
          <div>
            <p className="text-sm text-gray-400">Created by</p>
            <p className="font-medium text-white">{poll.creatorData.username}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="card-actions justify-end">
          <button
            onClick={handleViewOnClick}
            className="btn btn-primary gap-2 hover:shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            <FaEye /> View Poll
          </button>
        </div>
      </div>
    </div>
  );
}

export default PollCard;