import express from "express";
import { signinController, signupController } from "../../controllers/user.controller.js";
import validate from "../../validations/validator.js";
import signupSchema from "../../validations/signupValidation.js";
import signinSchema from "../../validations/signinValidation.js";
import { verifyToken } from "../../middlwares/verifyToken.js";
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
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
userRouter.post("/signup", validate(signupSchema), signupController);

/**
 * @swagger
 * /user/signin:
 *   post:
 *     summary: User signin
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 * 
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 * 
 */
userRouter.post("/signin", validate(signinSchema), signinController);

userRouter.get("/user", verifyToken, (req, res) => {
    try{
        res.json({
            success : true,
            message : "Found",
            data : req.user
        })
    }
    catch(err){
        res.status(500).json({
            success : false,
            message : err.message
        })
    }
})

export default userRouter;