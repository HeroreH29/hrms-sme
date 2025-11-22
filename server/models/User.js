import { Schema, model, Types } from "mongoose";
import { passwordHasher } from "../utils/passwordHasher.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema({
  email: { type: String, required: true, unique: true, immutable: true },
  password: { type: String, required: true },
  online: { type: Boolean, default: false },
  active: { type: Boolean, default: true },
  role: { type: String, default: "Employee" },
});

userSchema.pre("save", async function (next) {
  if (this.$isNew) {
    this.password = await passwordHasher(this.password);
  }

  next();
});

userSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();

  const { password } = update;

  if (!password) throw new Error("password is required!");

  this.set("password", await passwordHasher(password));
});

userSchema.methods.login = async function (password) {
  const isPasswordMatch = await bcrypt.compare(password, this?.password);

  if (!isPasswordMatch) throw new Error("Password is incorrect!");

  const payload = this.toObject();
  delete payload.password; // exclude password in payload

  const token = jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: process.env.NODE_ENV === "production" ? "15m" : "1h",
  });

  this.online = true;
  await this.save();

  return token;
};

userSchema.methods.logout = async function () {
  this.online = false;
  await this.save();
};

const User = model("User", userSchema);
export default User;
