export const saveSelectedOption = (pollId, selectedOptionId) => {
    localStorage.setItem(pollId, selectedOptionId);
}

export const getSelectedOption = (pollId) => {
    const selectedId = localStorage.getItem(pollId);
    return selectedId;
}

export const makeChartDataObjFromPollData = (poll) => {
    const options = poll?.data?.pollData?.options || [];
    return {
        labels: options.map((option, index) => `${String.fromCharCode(65 + index)}: ${option.name}`),
        datasets: [
          {
            label: "Votes",
            data: options.map(option => option.voteCount),
            backgroundColor: [
              "rgba(59, 130, 246, 0.8)",
              "rgba(16, 185, 129, 0.8)", 
              "rgba(245, 158, 11, 0.8)",
              "rgba(239, 68, 68, 0.8)",
              "rgba(139, 92, 246, 0.8)",
              "rgba(236, 72, 153, 0.8)"
            ],
            borderColor: [
              "rgb(59, 130, 246)",
              "rgb(16, 185, 129)",
              "rgb(245, 158, 11)", 
              "rgb(239, 68, 68)",
              "rgb(139, 92, 246)",
              "rgb(236, 72, 153)"
            ],
            borderWidth: 2,
            borderRadius: 8,
          },
        ],
      };
}

export const formatDataByDate = (data) => {
  if (!data) return [];
  const formattedData = [...data].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  return formattedData;
}

export const calculateEngagementRate = (polls) => {
  if (!polls || polls.length === 0) return 0;
  const totalVotes = polls.reduce((sum, poll) => {
    return sum + poll.options.reduce((optSum, opt) => optSum + opt.voteCount, 0);
  }, 0);
  const expectedVotes = polls.length * 25; // Assuming 25 students per class
  return Math.round((totalVotes / expectedVotes) * 100);
}

export const getTopPerformingPoll = (polls) => {
  if (!polls || polls.length === 0) return null;
  return polls.reduce((top, poll) => {
    const votes = poll.options.reduce((sum, opt) => sum + opt.voteCount, 0);
    const topVotes = top ? top.options.reduce((sum, opt) => sum + opt.voteCount, 0) : 0;
    return votes > topVotes ? poll : top;
  }, null);
}