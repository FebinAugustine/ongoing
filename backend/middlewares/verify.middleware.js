import jwt from "jsonwebtoken";
import TokenExpiredError from "jsonwebtoken"; // Import TokenExpiredError
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import pkg from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const verifyJWT = asyncHandler(async (req, res, next) => {
  const authHeader = req.header("Authorization");
  console.log("Authorization Header:", authHeader);
  const { TokenExpiredError } = pkg;

  // Use a more robust token extraction
  const token = authHeader
    ? authHeader.trim().replace(/^Bearer\s+/i, "")
    : undefined;
  console.log("Token after replace:", token);

  if (!token) {
    throw new ApiError(401, "unauthorized request 001");
  }

  console.log("Token before verify:", token); // Log the token

  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log(
      "ACCESS_TOKEN_SECRET (verify):",
      process.env.ACCESS_TOKEN_SECRET
    );

    req.userId = decodedToken.userId;
    console.log("req.userId", req.userId);
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error); // Log the error
    if (error instanceof TokenExpiredError) {
      throw new ApiError(403, "Token expired"); // Throw 403 for expired tokens
    } else {
      throw new ApiError(401, error?.message || "Invalid access token"); // Keep 401 for other errors
    }
  }
});
