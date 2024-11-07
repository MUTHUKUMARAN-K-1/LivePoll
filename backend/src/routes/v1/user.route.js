import express from "express";
import { signupController } from "../../controllers/user.controller.js";
import validate from "../../validations/validator.js";
import signupSchema from "../../validations/signupValidation.js";
const userRouter = express.Router();

/**
 * @swagger
 * /user/test:
 *   get:
 *     summary: Test route for user
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Success
 */
userRouter.get("/test", (req, res) => {
    res.json({
        success: true,
        message : "User route is working✔️"
    })
})

/**
 * @swagger
 * /user/signup:
 *   post:
 *     summary: User signup
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Success
 */
userRouter.post("/signup", validate(signupSchema), signupController);

export default userRouter;