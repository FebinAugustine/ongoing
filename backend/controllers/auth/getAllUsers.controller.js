import { User } from "../../models/schemas/user.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { ApiError } from "../../utils/ApiError.js";

const getAllUsers = async (req, res) => {
  const cUser = req.userId;
  console.log("cUser", cUser);
  console.log("req.user", req.user);

  if (!cUser) {
    return res.status(401).json(new ApiError(401, "Unauthorized request 1"));
  }

  const user = await User.findById(cUser);
  if (!user) {
    return res.status(401).json(new ApiError(401, "Unauthorized request 2"));
  }

  try {
    const users = await User.find({}); // Retrieves all users from the database
    if (!users) {
      return res.status(200).json(new ApiResponse(200, [], "No users found")); // sending empty array
    }

    return res
      .status(200)
      .json(new ApiResponse(200, users, "All users retrieved successfully"));
  } catch (error) {
    console.error("Error getting all users:", error);
    return res
      .status(500)
      .json(new ApiError(500, "Failed to retrieve users", error.message));
  }
};

export default getAllUsers;
