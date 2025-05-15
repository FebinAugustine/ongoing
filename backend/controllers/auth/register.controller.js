import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { User } from "../../models/schemas/user.model.js";

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password)
    return res
      .status(400)
      .json({ message: "Username and password are required." });

  /* Checking If User with this Username Exist */
  const userWithThisUsernameAlreadyExists = await User.findOne({ username });
  if (userWithThisUsernameAlreadyExists) {
    return res
      .status(409)
      .json(new ApiError(409, "User with this username already exists"));
  }

  /* Checking If User with this Email Exist */
  const userWithThisEmailAlreadyExists = await User.findOne({ email });
  if (userWithThisEmailAlreadyExists) {
    return res.status(409).json(
      new ApiError(409, "User with this email already exists", {
        message: "User with this email already exists",
      })
    );
  }

  try {
    // 5. Create user in database
    const user = await User.create({
      username,
      email,
      password,
    });

    // 6. Remove sensitive fields and return response
    const createdUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );
    if (!createdUser) {
      throw new ApiError(500, "Failed to create user");
    }
    console.log(createdUser);

    return res
      .status(200)
      .json(new ApiResponse(200, createdUser, "User Registred Successfully"));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default registerUser;
