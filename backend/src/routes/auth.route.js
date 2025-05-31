import express from "express";
import { checkAuth, loginUser, logoutUser, registerUser } from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/verify.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/logout", verifyToken, logoutUser);
router.get("/checkauth", verifyToken, checkAuth)


export default router;