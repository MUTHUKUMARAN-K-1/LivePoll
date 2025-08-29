import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import getPollData from "../services/getPollData";
import createVoteService from "../services/createVoteService";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
import { FaUsers, FaCheckCircle, FaSpinner } from "react-icons/fa";
import StudentPollResults from "../components/Student/StudentPollResults";

function StudentView() {
  const { pollId } = useParams();
  const [selectedOption, setSelectedOption] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [poll, setPoll] = useState(null);
  const [socket, setSocket] = useState(null);
  const [totalVotes, setTotalVotes] = useState(0);

  useEffect(() => {
    const s = io("https://livepoll-anjx.onrender.com");
    setSocket(s);

    s.on("connect", () => {
      s.emit("joinPoll", pollId);
    });

    return () => s.disconnect();
  }, [pollId]);

  const { data, isLoading, isError } = useQuery(
    ["poll", pollId], 
    () => getPollData(pollId),
    {
      onSuccess: (data) => {
        setPoll(data);
        const votes = data?.data?.pollData?.options.reduce((sum, opt) => sum + opt.voteCount, 0) || 0;
        setTotalVotes(votes);
      },
    }
  );

  useEffect(() => {
    if (socket) {
      socket.on("pollDataUpdated", (data) => {
        setPoll(data);
        const votes = data?.data?.pollData?.options.reduce((sum, opt) => sum + opt.voteCount, 0) || 0;
        setTotalVotes(votes);
      });
    }
  }, [socket]);

  const voteMutation = useMutation(createVoteService, {
    onSuccess: () => {
      setHasVoted(true);
      toast.success("🎉 Your vote has been recorded!");
      if (socket) {
        socket.emit("vote", { pollId, success: true });
      }
    },
    onError: (error) => {
      if (error?.response?.data?.message?.includes("already voted")) {
        setHasVoted(true);
        toast.info("You've already voted on this poll!");
      } else {
        toast.error("Failed to submit vote. Please try again.");
      }
    },
  });

  const handleVote = (optionId) => {
    if (hasVoted) return;
    setSelectedOption(optionId);
    voteMutation.mutate({ pollId, optionId });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="text-6xl text-blue-400 animate-spin mx-auto mb-4" />
          <p className="text-xl text-white">Loading poll...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 to-pink-900 flex items-center justify-center">
        <div className="text-center bg-slate-800/50 p-8 rounded-2xl">
          <h2 className="text-2xl font-bold text-white mb-4">Poll Not Found</h2>
          <p className="text-gray-300">This poll may have been removed or the link is incorrect.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900">
      <div className="container mx-auto p-4 max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center animate-pulse">
            <span className="text-2xl">📊</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
            {poll?.data?.pollData?.title}
          </h1>
          {poll?.data?.pollData?.description && (
            <p className="text-lg text-blue-100 mb-6 leading-relaxed">
              {poll.data.pollData.description}
            </p>
          )}
          <div className="flex items-center justify-center gap-2 text-blue-200">
            <FaUsers />
            <span>{totalVotes} students have voted</span>
          </div>
        </div>

        {!hasVoted ? (
          /* Voting Interface */
          <div className="space-y-4 mb-8">
            <h2 className="text-xl font-semibold text-white text-center mb-6">
              Choose your answer:
            </h2>
            {poll?.data?.pollData?.options.map((option, index) => (
              <button
                key={option._id}
                onClick={() => handleVote(option._id)}
                disabled={voteMutation.isLoading}
                className={`w-full p-6 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl ${
                  selectedOption === option._id
                    ? 'bg-gradient-to-r from-green-500 to-green-600 text-white'
                    : 'bg-white/90 hover:bg-white text-slate-800 hover:from-blue-500 hover:to-purple-500 hover:text-white'
                } ${voteMutation.isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="w-8 h-8 bg-slate-700 text-white rounded-full flex items-center justify-center font-bold">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span>{option.name}</span>
                  </div>
                  {voteMutation.isLoading && selectedOption === option._id && (
                    <FaSpinner className="animate-spin" />
                  )}
                </div>
              </button>
            ))}
          </div>
        ) : (
          /* Results View */
          <div className="mb-8">
            <div className="bg-green-500/20 border border-green-500/50 rounded-2xl p-6 mb-6 text-center">
              <FaCheckCircle className="text-4xl text-green-400 mx-auto mb-3" />
              <h2 className="text-xl font-bold text-white mb-2">Vote Submitted!</h2>
              <p className="text-green-200">Thank you for participating. Here are the live results:</p>
            </div>
            
            <StudentPollResults poll={poll} />
          </div>
        )}

        {/* Teacher Info */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 text-center border border-slate-700/50">
          <div className="flex items-center justify-center gap-3 mb-3">
            <img
              src={`https://ui-avatars.com/api/?name=${poll?.data?.creatorData?.username}&background=6366f1&color=fff&size=40`}
              alt="Teacher"
              className="rounded-full"
            />
            <div>
              <p className="text-sm text-gray-400">Created by</p>
              <p className="font-semibold text-white">{poll?.data?.creatorData?.username}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentView;