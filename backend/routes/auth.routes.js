import express from "express";
import registerUser from "../controllers/auth/register.controller.js";
import loginUser from "../controllers/auth/login.controller.js";
import refreshAccessToken from "../controllers/auth/refreshAccesToken.controller.js";
import logoutUser from "../controllers/auth/logout.controller.js";
import getAllUsers from "../controllers/auth/getAllUsers.controller.js";
import { verifyJWT } from "../middlewares/verify.middleware.js";

const router = express.Router();

// Public routes
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);

router.route("/getallusers").get(verifyJWT, getAllUsers);

router.route("/refresh").get(refreshAccessToken);

export default router;
