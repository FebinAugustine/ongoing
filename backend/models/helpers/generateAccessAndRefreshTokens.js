import jwt from "jsonwebtoken";
import dotenv from "dotenv"; // Import dotenv

dotenv.config();

export const generateAccessAndRefreshTokens = (userId, email, roles) => {
  // console.log("ACCESS_TOKEN_SECRET (sign):", process.env.ACCESS_TOKEN_SECRET);
  const accessToken = jwt.sign(
    { userId, email, roles },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );

  const refreshToken = jwt.sign(
    { userId, email, roles },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );

  return { accessToken, refreshToken };
};
