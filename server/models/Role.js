import { Schema, model } from "mongoose";

const roleSchema = new Schema({
  name: { type: String, required: true, unique: true }, // e.g., Admin, Manager
  permissions: [{ type: String }], // optional: e.g., ['create_user', 'view_salary']
});
const Role = model("Role", roleSchema);
export default Role;
