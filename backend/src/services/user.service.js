import { SALT } from "../config/veriables.js";
import { createUser } from "../repositories/user.repo.js";
import bcrypt from "bcrypt";

export async function signupService(username, email, password) {
  try {
    if (username.trim() == "" || email.trim() == "" || password.trim() == "") {
      throw {
        statusCode: 400,
        message: "All fields are required",
      };
    }
    const hashedPassword = bcrypt.hashSync(password, SALT);
    const user = await createUser(username, email, hashedPassword);
    return user;
  } catch (err) {
    if (err.code == 11000) {
      throw {
        statusCode: 409,
        message: "User already exists",
      };
    } else {
      throw err;
    }
  }
}
