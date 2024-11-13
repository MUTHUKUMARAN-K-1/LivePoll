import express from "express";
import { verifyToken } from "../../middlwares/verifyToken.js";
import { voteTestController } from "../../controllers/vote.controller.js";
const voteRouter = express.Router();

/**
 * @swagger
 * /vote/test:
 *   get:
 *     summary: Test route for vote
 *     tags: [Vote]
 *     responses:
 *       200:
 *         description: Success
 */
voteRouter.get("/test", voteTestController)
// voteRouter.get("/voted/:pollId", verifyToken, getVotedDataController);

export default voteRouter;