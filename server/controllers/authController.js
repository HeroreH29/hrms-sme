import User from "../models/User.js";
import jwt from "jsonwebtoken";

const cookieOpts = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  maxAge:
    process.env.NODE_ENV === "production"
      ? 1000 * 60 * 60 * 24 * 7 // 7 days in prod
      : 1000 * 60 * 60, // 1 hour in dev
};

class AuthController {
  async login(req, res, next) {
    const { email, password } = req.body;

    try {
      if (!email || !password)
        throw new Error("Email or Password is required!");

      const user = await User.findOne({ email });

      const token = await user.login(password);

      res.cookie("token", token);

      res.status(200).json({ message: "Logged in!" });
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    const { token } = req.cookies;
    try {
      // decode token to get current user
      const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

      const { email } = decodedToken;

      const currentUser = await User.findOne({ email });

      await currentUser.logout();

      res.clearCookie("token", cookieOpts);
      res.status(200).json({ message: "Logged out!" });
    } catch (error) {
      next(error);
    }
  }
}

export const authController = new AuthController();
