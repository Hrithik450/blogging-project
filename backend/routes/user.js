import express from "express";
import {
  Register,
  Login,
  Logout,
  GetProfile,
  GetAuthors,
} from "../controllers/user.js";
import { verifytoken, isAuthorized } from "../middlewares/auth.js";
const router = express.Router();

router.post("/createUser", Register);
router.post("/loginUser", Login);
router.get("/logout", verifytoken, Logout);
router.get("/me", verifytoken, GetProfile);
router.get("/authors", GetAuthors);

export default router;
