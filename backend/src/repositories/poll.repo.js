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

export async function findPollById(id) {
    try {
        const poll = await PollModel.findById(id).populate("creatorId");
        return poll;
    }
    catch(err){
        throw err;
    }
}