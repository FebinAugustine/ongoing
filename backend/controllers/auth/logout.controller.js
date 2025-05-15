import { ApiResponse } from "../../utils/ApiResponse.js";
import { User } from "../../models/schemas/user.model.js";

const logoutUser = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res.status(204).json(new ApiResponse(204, {}, "No refresh token")); // No content, but successful
    }

    // Find the user with the refresh token
    const user = await User.findOne({ refreshToken });
    if (!user) {
      // Clear cookie if user not found.  Important Security measure
      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
        sameSite: "None",
      });
      return res
        .status(204)
        .json(new ApiResponse(204, {}, "User not found. Cookie cleared.")); // No content, but successful
    }

    // Clear the refresh token in the database
    user.refreshToken = undefined;
    await user.save();

    // Clear cookies

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Logged out successfully"));
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({ message: error.message });
  }
};

export default logoutUser;
