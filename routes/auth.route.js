import express from "express";
import { register, login, logout, getCurrentUser } from "../controllers/auth.controller.js";
import { checkDuplicateUsername } from "../middlewares/verifyRegister.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.route("/register").post(checkDuplicateUsername, register);
router.route("/login").post(login);
router.route("/getCurrentUser").get(verifyToken, getCurrentUser);
router.route("/logout").post(logout);

export default router;