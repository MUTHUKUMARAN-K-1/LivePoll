import { voteMessageTestService } from "../services/vote.service.js";

export async function voteTestController(req, res) {
    try{
        const message = voteMessageTestService();
        res.json({
            success: true,
            message: message,
        });
    }
    catch(err) {
        console.log(err);
        if (err.statusCode) {
            res.status(err.statusCode).json({
                success: false,
                message: err.message,
            });
        } else {
            res.status(500).json({
                success: false,
                message: err.message,
            });
        }
    }
}