import { Schema, model } from "mongoose";

const departmentSchema = new Schema(
  {
    name: String,
  },
  { _id: false }
);

const branchSchema = new Schema({
  name: String,
  city: String,
  departments: { type: departmentSchema },
  active: { type: Boolean, default: true },
});

const Branch = model("Branch", branchSchema);
export default Branch;
