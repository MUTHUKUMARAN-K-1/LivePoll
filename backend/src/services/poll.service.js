import mongoose from "mongoose";
import { createPollByData } from "../repositories/poll.repo.js";

export async function createPollService(title, description, options, userId) {
    try {
        const optionsData = options.map(option => ({
            name: option,
            _id : new mongoose.Types.ObjectId()
        }));

        const data = {
            title,
            description,
            options : optionsData,
            creatorId: userId
        }
        const poll = await createPollByData(data);
        return poll;
    }
    catch(err){
        throw err;
    }
}