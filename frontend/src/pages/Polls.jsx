import React, { useState } from "react";
import { useQuery } from "react-query";
import getPollsService from "../services/getPollsService";
import PollCard from "../components/PollCard/PollCard";
import ErrorFallback from "../components/Errors/ErrorFallback";
import { FaSearch, FaFilter, FaUsers, FaChartBar } from "react-icons/fa";

function Polls() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(9);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const { data, isLoading, isError, isSuccess, refetch } = useQuery(
    ["polls", page, limit],
    () => getPollsService(page, limit),
    {
      cacheTime: 1000 * 60 * 5,
      staleTime: 1000 * 60 * 10,
    }
  );

  const categories = [
    { value: "all", label: "All Polls" },
    { value: "quiz", label: "Quizzes" },
    { value: "feedback", label: "Feedback" },
    { value: "icebreaker", label: "Icebreakers" },
    { value: "general", label: "General" }
  ];

  const filteredPolls = data?.data?.polls?.filter(poll => {
    const matchesSearch = poll.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         poll.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  }) || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Discover Amazing Polls
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Explore polls created by educators worldwide. Get inspired and find new ways to engage your students.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-slate-700/50">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search polls by title or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input input-bordered w-full pl-12 bg-slate-700 text-white border-slate-600 focus:border-blue-400"
              />
            </div>
            
            <div className="flex gap-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="select select-bordered bg-slate-700 text-white border-slate-600 focus:border-blue-400"
              >
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 text-center border border-slate-700/50">
            <FaChartBar className="text-3xl text-blue-400 mx-auto mb-3" />
            <div className="text-2xl font-bold text-white">{data?.data?.totalPollCount || 0}</div>
            <div className="text-gray-400">Total Polls</div>
          </div>
          
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 text-center border border-slate-700/50">
            <FaUsers className="text-3xl text-green-400 mx-auto mb-3" />
            <div className="text-2xl font-bold text-white">{filteredPolls.length}</div>
            <div className="text-gray-400">Showing Results</div>
          </div>
          
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 text-center border border-slate-700/50">
            <FaFilter className="text-3xl text-purple-400 mx-auto mb-3" />
            <div className="text-2xl font-bold text-white">{data?.data?.totalPages || 0}</div>
            <div className="text-gray-400">Total Pages</div>
          </div>
        </div>

        {/* Polls Grid */}
        {isError && (
          <div className="flex justify-center">
            <ErrorFallback onRetry={() => refetch()} />
          </div>
        )}

        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="skeleton h-64 w-full bg-slate-700"></div>
            ))}
          </div>
        )}

        {isSuccess && (
          <>
            {filteredPolls.length === 0 ? (
              <div className="text-center py-12">
                <FaSearch className="text-6xl text-gray-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-400 mb-2">No polls found</h3>
                <p className="text-gray-500">Try adjusting your search terms or filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {filteredPolls.map((poll) => (
                  <PollCard key={poll._id} poll={poll} />
                ))}
              </div>
            )}

            {/* Pagination */}
            <div className="flex justify-center items-center gap-4">
              <button
                className="btn btn-outline btn-primary"
                disabled={page <= 1}
                onClick={() => setPage(page - 1)}
              >
                Previous
              </button>
              
              <div className="flex items-center gap-2">
                <span className="text-white">Page</span>
                <span className="badge badge-primary">{page}</span>
                <span className="text-white">of</span>
                <span className="badge badge-outline">{data?.data?.totalPages || 1}</span>
              </div>
              
              <button
                className="btn btn-outline btn-primary"
                disabled={data?.data?.totalPages === page}
                onClick={() => setPage(page + 1)}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Polls;