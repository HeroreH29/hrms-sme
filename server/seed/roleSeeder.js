import Role from "../models/Role.js";

const defaultRoles = [
  { name: "Admin", permissions: ["*"] },
  { name: "Manager", permissions: ["view_employee", "approve_leave"] },
  { name: "Employee", permissions: ["view_self_profile"] },
];

export const roleSeeder = async () => {
  for (const r of defaultRoles) {
    const exists = await Role.findOne({ name: r.name });
    if (!exists) {
      await Role.create(r);
      console.log(`Role ${r.name} created`);
    }
  }
};
