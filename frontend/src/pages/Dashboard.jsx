import React from "react";
import { FaPlus, FaChartLine, FaUsers, FaClock, FaBookmark } from "react-icons/fa";
import PollTableRow from "../components/PollTableRow/PollTableRow";
import { useNavigate } from "react-router-dom";
import useUserStore from "../store/useStore";
import { useQuery } from "react-query";
import getUserPollData from "../services/getUserPollData";
import ErrorFallback from "../components/Errors/ErrorFallback";
import { formatDataByDate } from "../utils/util";
import QuickActions from "../components/Dashboard/QuickActions";
import StatsCards from "../components/Dashboard/StatsCards";

function Dashboard() {
  const navigator = useNavigate();
  const { user } = useUserStore();

  const { data, isLoading, isError, refetch, isSuccess } = useQuery(
    ["polls", user._id],
    getUserPollData,
    {
      cacheTime: 1000 * 60 * 5,
      staleTime: 1000 * 60 * 10,
    }
  );

  const totalVotes = data?.reduce((sum, poll) => {
    return sum + poll.options.reduce((optSum, opt) => optSum + opt.voteCount, 0);
  }, 0) || 0;

  const activePolls = data?.length || 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="container mx-auto p-6">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Welcome back, {user?.username}! 👋
              </h1>
              <p className="text-lg text-gray-300">
                Ready to engage your students today?
              </p>
            </div>
            <div className="mt-4 lg:mt-0">
              <button
                className="btn btn-primary btn-lg gap-2 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                onClick={() => navigator("/create")}
              >
                <FaPlus /> Create New Poll
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <StatsCards activePolls={activePolls} totalVotes={totalVotes} />

        {/* Quick Actions */}
        <QuickActions navigator={navigator} />

        {/* Recent Polls Section */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-slate-700/50">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <FaChartLine className="text-blue-400" />
              Your Polls
            </h2>
            <button
              className="btn btn-outline btn-sm text-blue-400 border-blue-400 hover:bg-blue-400 hover:text-white"
              onClick={() => navigator("/analytics")}
            >
              View Analytics
            </button>
          </div>

          {isError && (
            <div className="h-60 w-full">
              <ErrorFallback onRetry={refetch} />
            </div>
          )}
          
          {isLoading && (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="skeleton h-16 w-full bg-slate-700"></div>
              ))}
            </div>
          )}
          
          {isSuccess && (
            <>
              {data?.length === 0 ? (
                <div className="text-center py-12">
                  <FaChartLine className="text-6xl text-gray-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-400 mb-2">No polls yet</h3>
                  <p className="text-gray-500 mb-6">Create your first poll to start engaging your students!</p>
                  <button
                    className="btn btn-primary gap-2"
                    onClick={() => navigator("/create")}
                  >
                    <FaPlus /> Create Your First Poll
                  </button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="table w-full">
                    <thead>
                      <tr className="border-slate-600">
                        <th className="text-gray-300">#</th>
                        <th className="text-gray-300">Title</th>
                        <th className="text-gray-300">Description</th>
                        <th className="text-gray-300">Responses</th>
                        <th className="text-gray-300">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {formatDataByDate(data)?.map((poll, index) => (
                        <PollTableRow key={poll._id} refetch={refetch} poll={poll} index={index} />
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;