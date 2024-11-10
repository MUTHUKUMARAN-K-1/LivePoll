// VotingPage.js
import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from "chart.js";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import getPollData from "../services/getPollData";

ChartJS.register(BarElement, CategoryScale, LinearScale);

function VotingPage() {

  const { pollId } = useParams();

  const { data: poll, isLoading, isError } = useQuery(["poll", pollId], () => getPollData(pollId), {
    cacheTime : 10*100*60, // 10 minutes
    staleTime : 20*100*60, // 20 minutes
  });
  console.log(poll);
  
  const pollData = {
    title: "What's your favorite programming language?",
    options: [
      { id: 1, label: "JavaScript", votes: 20 },
      { id: 2, label: "Python", votes: 35 },
      { id: 3, label: "Java", votes: 25 },
      { id: 4, label: "C++", votes: 15 },
    ],
    creator: {
      name: "John Doe",
      image: "https://via.placeholder.com/100",
    },
  };

  // Dummy chart data for visualization
  const chartData = {
    labels: pollData.options.map(option => option.label),
    datasets: [
      {
        label: "Votes",
        data: pollData.options.map(option => option.votes),
        backgroundColor: ["#3B82F6", "#EF4444", "#10B981", "#F59E0B"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="bg-base-200 min-h-screen p-6 text-white flex flex-col items-center">
      {/* Poll Creator Info */}
      <div className="flex items-center justify-center gap-4 mb-6">
        <img
          src={pollData.creator.image}
          alt={pollData.creator.name}
          className="rounded-full h-7 md:h-10 w-7 md:w-10"
        />
        <h2 className="text-lg md:text-xl font-semibold">{pollData.creator.name}</h2>
      </div>

      {/* Poll Title */}
      <h1 className="text-xl md:text-3xl font-bold mb-4 text-center">{pollData.title}</h1>

      {/* Voting Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-lg mb-6">
        {pollData.options.map(option => (
          <div
            key={option.id}
            className="md:p-4 p-2 bg-base-100 rounded-lg shadow-md flex items-center justify-center cursor-pointer hover:bg-base-300 transition"
          >
            <span className="text-lg">{option.label}</span>
          </div>
        ))}
      </div>

      {/* Chart Visualization */}
      <div className="w-full max-w-lg">
        <Bar data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
      </div>
    </div>
  );
}

export default VotingPage;
