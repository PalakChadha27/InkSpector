import express from "express";
import { verifyToken } from "../utils/verifyToken.js";
import { checkUrl, getRecentActivity } from "../controllers/urlController.js";

const router = express.Router();


router.use(verifyToken);

router.post("/check", checkUrl);
router.get("/activity/recent", getRecentActivity);

export default router;