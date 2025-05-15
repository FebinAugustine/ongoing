import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { User } from "../../models/schemas/user.model.js";
import { generateAccessAndRefreshTokens } from "../../models/helpers/generateAccessAndRefreshTokens.js";

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res
        .status(400)
        .json({ message: "Username and password are required." });

    /* Checking If User with this Username Exist */
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(409)
        .json(new ApiError(409, "User with this email does not exists"));
    }

    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
      return res.status(401).json(new ApiError(401, "Invalid credentials"));
    }

    if (isPasswordValid) {
      const roles = Object.values(user.roles).filter(Boolean);
      const { accessToken, refreshToken } = generateAccessAndRefreshTokens(
        user._id,
        user.email,
        user.roles
      );

      // Saving refreshToken with current user
      user.refreshToken = refreshToken;
      user.lastLogin = new Date();
      const result = await user.save();

      const loggedInUser = {
        _id: result._id,
        username: result.username,
        email: result.email,
        roles: result.roles,
        accessToken,
      };

      // Creates Secure Cookie with refresh token
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 10 * 1000, // 15 seconds
      });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 24 * 60 * 60 * 1000,
      });

      return res
        .status(200)
        .json(
          new ApiResponse(200, loggedInUser, "User Logged In Successfully")
        );
    } else {
      return res
        .status(401)
        .json(new ApiError(401, "Somethingwent wrong while logging in"));
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default loginUser;
