import { User } from "../../models/schemas/user.model.js";

export const getAllUsers = async (req, res) => {
  const { jwt } = req.cookies;
  console.log("jwt 123", jwt);

  const users = await User.find();
  if (!users) return res.status(204).json({ message: "No users found" });
  res.json(users);
};
