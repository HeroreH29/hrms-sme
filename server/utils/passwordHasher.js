import bcrypt from "bcrypt";

export const passwordHasher = async (password = "") => {
  const hashedPassword = await bcrypt.hash(password, 10);

  return hashedPassword;
};
