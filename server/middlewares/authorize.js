import User from "../models/User.js";

export const authorize = (allowedRoles = []) => {
  return async (req, res, next) => {
    try {
      // Populate the single role from DB
      const user = await User.findById(req.user._id);
      if (!user) return res.status(401).json({ message: "User not found" });

      // Check if user's role is allowed
      if (!allowedRoles.includes(user.role)) {
        return res.status(403).json({ message: "Forbidden" });
      }

      next();
    } catch (err) {
      console.error("Authorize error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
};
