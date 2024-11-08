import PollModel from "../models/poll.model.js";

export async function createPollByData(data) {
    try {
        const poll = await PollModel.create(data);
        return poll;
    }
    catch(err){
        throw err;
    }
}