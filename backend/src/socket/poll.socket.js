import { getPollDataService } from "../services/poll.service.js";

export const handlePollSocket = (io) => {
  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("joinPoll", (pollId) => {
      socket.join(pollId);
      console.log(`User ${socket.id} joined poll room: ${pollId}`);
    });

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
    });

    socket.on("vote", async (data) => {
      if (data.success) {
        console.log("Vote received:", data);

        try {
          const pollData = await getPollDataService(data.pollId);
          
          io.to(data.pollId).emit("pollDataUpdated", { data: pollData });
        } catch (error) {
          console.error("Error fetching poll data:", error);
          socket.emit("error", { message: "Failed to fetch poll data" });
        }
      } else {
        console.log("Vote failed:", data);
        socket.emit("error", { message: "Vote was unsuccessful" });
      }
    });
  });
};
