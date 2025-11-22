import { Schema, model } from "mongoose";

const counterSchema = new Schema({
  branchCode: { type: String, unique: true },
  seq: { type: Number, default: 0 },
});

const Counter = model("Counter", counterSchema);
export default Counter;
