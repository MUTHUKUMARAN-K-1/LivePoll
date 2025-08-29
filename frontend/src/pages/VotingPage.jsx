import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useMutation, useQuery } from "react-query";
import { useParams, useNavigate } from "react-router-dom";
import getPollData from "../services/getPollData";
import ErrorFallback from "../components/Errors/ErrorFallback";
import createVoteService from "../services/createVoteService";
import { FaBookmark, FaUsers, FaShare, FaQrcode, FaCopy, FaChartLine } from "react-icons/fa";
import { toast } from "react-toastify";
import { makeChartDataObjFromPollData } from "../utils/util";
import useBookmark from "../hooks/useBookmark";
import { io } from "socket.io-client";
import { getPollSelectedOptionData } from "../services/getPollSelectedOptionData";
import TeacherPollControls from "../components/Teacher/TeacherPollControls";

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

function VotingPage() {
  const { pollId } = useParams();
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(null);
  const { handleBookmark } = useBookmark();
  const [poll, setPoll] = useState(null);
  const [socket, setSocket] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);

  const studentUrl = `${window.location.origin}/student/${pollId}`;

  useEffect(() => {
    const s = io("https://livepoll-anjx.onrender.com");
    setSocket(s);

    s.on("connect", () => {
      s.emit("joinPoll", pollId);
    });

    return () => s.disconnect();
  }, [pollId]);

  const { data, isLoading, isError, refetch } = useQuery(
    ["poll", pollId], 
    () => getPollData(pollId),
    {
      onSuccess: (data) => {
        setPoll(data);
      },
    }
  );

  useQuery(
    ["selectedOption", pollId], 
    () => getPollSelectedOptionData(pollId),
    {
      onSuccess: (data) => {
        setSelectedOption(data?.data?.optionId || null);
      },
    }
  );

  useEffect(() => {
    if (socket) {
      socket.on("pollDataUpdated", (data) => {
        setPoll(data);
      });
    }
  }, [socket]);

  const mutation = useMutation(createVoteService, {
    onSuccess: (data) => {
      toast.success("Vote submitted successfully");
      if (socket) {
        socket.emit("vote", { pollId, success: data?.success });
      }
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "An unexpected error occurred"
      );
    },
  });

  const handleOptionSelect = (id) => {
    if (!selectedOption) {
      setSelectedOption(id);
    }
    mutation.mutate({ pollId, optionId: id });
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Link copied to clipboard!");
  };

  const totalVotes = poll?.data?.pollData?.options.reduce((sum, opt) => sum + opt.voteCount, 0) || 0;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="skeleton h-96 w-full max-w-4xl mx-auto"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
        <ErrorFallback onRetry={refetch} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-8 border border-slate-700/50">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-4">
              <img
                src={`https://ui-avatars.com/api/?name=${poll?.data?.creatorData?.username}&background=6366f1&color=fff&size=60`}
                alt={poll?.data?.creatorData?.username}
                className="rounded-full"
              />
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white">
                  {poll?.data?.pollData?.title}
                </h1>
                <p className="text-gray-300">
                  Created by {poll?.data?.creatorData?.username}
                </p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button
                className="btn btn-outline gap-2"
                onClick={() => handleBookmark(pollId)}
              >
                <FaBookmark /> Bookmark
              </button>
              <button
                className="btn btn-primary gap-2"
                onClick={() => setShowShareModal(true)}
              >
                <FaShare /> Share with Students
              </button>
            </div>
          </div>

          {poll?.data?.pollData?.description && (
            <div className="mt-4 p-4 bg-slate-700/50 rounded-xl">
              <p className="text-gray-300">{poll.data.pollData.description}</p>
            </div>
          )}

          <div className="mt-4 flex items-center gap-6 text-sm text-gray-400">
            <span className="flex items-center gap-2">
              <FaUsers /> {totalVotes} total votes
            </span>
            <span className="flex items-center gap-2">
              <FaChartLine /> Live updates enabled
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Voting Section */}
          <div className="lg:col-span-2">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-slate-700/50 mb-6">
              <h2 className="text-xl font-bold text-white mb-6">Poll Options</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {poll?.data?.pollData?.options.map((option, index) => {
                  const percentage = totalVotes > 0 ? (option.voteCount / totalVotes) * 100 : 0;
                  return (
                    <div
                      key={option._id}
                      onClick={() => handleOptionSelect(option._id)}
                      className={`p-4 rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                        selectedOption === option._id
                          ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                          : "bg-slate-700/50 hover:bg-slate-600/50 text-white border border-slate-600/50 hover:border-blue-400/50"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold flex items-center gap-2">
                          <span className="w-6 h-6 bg-slate-600 rounded-full flex items-center justify-center text-sm font-bold">
                            {String.fromCharCode(65 + index)}
                          </span>
                          {option.name}
                        </span>
                        <span className="text-sm font-bold">
                          {option.voteCount}
                        </span>
                      </div>
                      <div className="w-full bg-slate-600 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-400 to-purple-400 h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <div className="text-right text-xs mt-1 opacity-75">
                        {Math.round(percentage)}%
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Chart Visualization */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-slate-700/50">
              <h2 className="text-xl font-bold text-white mb-6">Live Results Chart</h2>
              <div className="h-80">
                <Bar
                  data={makeChartDataObjFromPollData(poll)}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: { display: false },
                      tooltip: {
                        backgroundColor: 'rgba(15, 23, 42, 0.9)',
                        titleColor: 'white',
                        bodyColor: 'white',
                      },
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        ticks: { color: 'rgba(255, 255, 255, 0.7)' },
                        grid: { color: 'rgba(255, 255, 255, 0.1)' },
                      },
                      x: {
                        ticks: { color: 'rgba(255, 255, 255, 0.7)' },
                        grid: { display: false },
                      },
                    },
                  }}
                />
              </div>
            </div>
          </div>

          {/* Teacher Controls */}
          <div className="lg:col-span-1">
            <TeacherPollControls 
              poll={poll} 
              studentUrl={studentUrl}
              onShare={() => setShowShareModal(true)}
            />
          </div>
        </div>

        {/* Share Modal */}
        {showShareModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 rounded-2xl p-8 max-w-md w-full border border-slate-700">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">
                Share with Students
              </h3>
              
              <div className="space-y-4">
                <div className="bg-white p-6 rounded-xl text-center">
                  <div className="w-32 h-32 bg-gray-200 mx-auto rounded-lg flex items-center justify-center mb-4">
                    <FaQrcode className="text-4xl text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-600">Students scan to join</p>
                </div>
                
                <div className="bg-slate-700 p-4 rounded-xl">
                  <p className="text-sm text-gray-400 mb-2">Student Link:</p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={studentUrl}
                      readOnly
                      className="input input-bordered flex-1 bg-slate-600 text-white text-sm"
                    />
                    <button
                      className="btn btn-primary btn-sm gap-1"
                      onClick={() => copyToClipboard(studentUrl)}
                    >
                      <FaCopy /> Copy
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  className="btn btn-ghost flex-1"
                  onClick={() => setShowShareModal(false)}
                >
                  Close
                </button>
                <button
                  className="btn btn-primary flex-1 gap-2"
                  onClick={() => {
                    copyToClipboard(studentUrl);
                    setShowShareModal(false);
                  }}
                >
                  <FaShare /> Share Link
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default VotingPage;