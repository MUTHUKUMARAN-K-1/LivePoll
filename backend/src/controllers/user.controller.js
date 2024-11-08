import { signinService, signupService } from "../services/user.service.js";

export async function signupController(req, res) {
  try {
    const { username, email, password } = req.body;
    const user = await signupService(username, email, password);
    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (err) {
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

export async function signinController(req, res) {
  try {
    const { email, password } = req.body;
    const { token, userData } = await signinService(email, password);
    res.cookie("access-token", token, {
      httpOnly: true,
      maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days
    }).status(200).json({
        success : true,
        message : "User signedin successfully.",
        user : userData
    });

  } catch (err) {
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
