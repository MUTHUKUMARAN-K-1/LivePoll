import express from "express";
import { verifyToken } from "../../middlwares/verifyToken.js";
import { createPollController } from "../../controllers/poll.controller.js";
import pollDataSchema from "../../validations/pollDataValidation.js";
import validator from "../../validations/validator.js";
const pollRouter = express.Router();

/**
 * @swagger
 * /poll/test:
 *   get:
 *     summary: Test route for poll
 *     tags: [Poll]
 *     responses:
 *       200:
 *         description: Success
 */
pollRouter.get("/test", (req, res) => {
    res.json({
        success : true,
        message : "Poll route is working✔️"
    })
})

/**
 * @swagger
 * /poll/create:
 *   post:
 *     summary: Create poll
 *     tags: [Poll]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               options:
 *                 type: array
 *                 items:
 *                   type: string
 *             required:
 *               - title
 *               - description
 *               - options
 *     responses:
 *       201: 
 *         description: Poll created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 * 
 */
pollRouter.post("/create", validator(pollDataSchema), verifyToken, createPollController);

export default pollRouter;