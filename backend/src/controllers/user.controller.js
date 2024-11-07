import { signupService } from "../services/user.service.js";

export async function signupController(req, res) {
    try {
        const { username, email, password } = req.body;
        const user = await signupService(username, email, password);
        res.status(201).json({
            success : true,
            message : "User created successfully",
            data : user
        })
    }
    catch(err){
        console.log(err);
        if (err.statusCode){
            res.status(err.statusCode).json({
                success : false,
                message : err.message
            })
        }
        else {
            res.status(500).json({
                success : false,
                message : err.message
            })
        }
    }
}