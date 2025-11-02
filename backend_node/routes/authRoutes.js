import express from "express";
import passport from "passport";
import { 
  registerUser, 
  loginUser, 
  oauthSuccess, 
  subscribeToPush,
  unsubscribeFromPush
} from "../controllers/authController.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"], session: false }));
router.get("/google/callback", passport.authenticate("google", { failureRedirect: "/login", session: false }), oauthSuccess);

router.get("/github", passport.authenticate("github", { scope: ["user:email"], session: false }));
router.get("/github/callback", passport.authenticate("github", { failureRedirect: "/login", session: false }), oauthSuccess);

router.post("/subscribe", verifyToken, subscribeToPush);
router.post("/unsubscribe", verifyToken, unsubscribeFromPush);

export default router;