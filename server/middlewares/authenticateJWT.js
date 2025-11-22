import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const authenticateJWT = async (req, res, next) => {
  const token = req.cookies?.token; // read from cookie

  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(decoded._id).populate("role");
    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = user; // now req.user is ready for RBAC
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
