// backend/controllers/auth.controller.js
import jwt from "jsonwebtoken";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { User } from "../../models/schemas/user.model.js";
import { generateAccessAndRefreshTokens } from "../../models/helpers/generateAccessAndRefreshTokens.js"; // Just generate access token here
import dotenv from "dotenv";
dotenv.config();

const refreshAccessToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.refreshToken) return res.sendStatus(401);
  const refreshToken = cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json(new ApiError(401, "Refresh token is required"));
  }

  const user = await User.findOne({ refreshToken });
  if (!user) {
    res.clearCookie("refreshToken", {
      // Clear invalid refresh token
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
    return res.status(403).json(new ApiError(403, "Forbiden request"));
  }

  // Verify the refresh token
  try {
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
  } catch (error) {
    // Clear cookie if refresh token is invalid.
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
    return res
      .status(403)
      .json(new ApiError(403, "Invalid refresh token HELLO"));
  }

  const roles = Object.values(user.roles);

  const { accessToken } = generateAccessAndRefreshTokens(
    user._id,
    user.email,
    user.roles
  );

  // Creates Secure Cookie with refresh token
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 10 * 1000, // 10 seconds
  });

  return res
    .status(200)
    .json(
      new ApiResponse(200, { roles, accessToken }, "Access token refreshed")
    );
};

export default refreshAccessToken;
