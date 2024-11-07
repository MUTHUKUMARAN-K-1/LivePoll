import UserModel from "../models/user.model.js"

export const createUser = async (username, email, password) => {
    try {
        const createdUser = await UserModel.create({
            username,
            email,
            password
        })

        return createdUser;
    }
    catch(err) {
        throw err
    }
}