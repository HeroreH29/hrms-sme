import User from "../models/User.js";

class UserController {
  async getUsers(req, res, next) {
    try {
      const users = await User.find({}).select("-password");
      res.json(users);
    } catch (error) {
      next(error);
    }
  }

  async createUser(req, res, next) {
    try {
      const newUser = await User.create(req.body);

      res.status(200).json({ message: `User ${newUser.email} created!` });
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req, res, next) {
    try {
      const { id } = req.body;

      if (!id) throw new Error("id is required!");
      const updatedUser = await User.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      res.status(200).json({ message: `User ${updatedUser.email} updated!` });
    } catch (error) {
      next(error);
    }
  }
}

export const userController = new UserController();
