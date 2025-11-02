import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import passport from "passport";
import webpush from "web-push";
import schedule from "node-schedule";
import setupPassport from "./config/passport.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import urlRoutes from "./routes/urlRoutes.js";
import User from "./models/User.js";

dotenv.config();
const app = express();

webpush.setVapidDetails(
  'mailto:dummy@gmail.com',
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

app.use(express.json());

// 🔽 THIS IS THE FIX 🔽
// Allow all origins
app.use(cors());
// 🔼 🔼 🔼 🔼 🔼 🔼 🔼

app.use(passport.initialize());
setupPassport();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("Mongo Error:", err.message));

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/url", urlRoutes);

schedule.scheduleJob('0 10 * * *', async () => {
  console.log('Running scheduled job: Sending daily security tips...');
  const payload = JSON.stringify({
    title: 'TrustNet Security Tip 💡',
    body: 'Remember to always verify the sender before opening attachments!'
  });

  try {
    const users = await User.find({ pushSubscription: { $ne: null } });
    
    for (const user of users) {
      webpush.sendNotification(user.pushSubscription, payload)
        .catch(err => console.log(`Error sending push to user ${user._id}:`, err.message));
    }
  } catch (error) {
    console.log('Error fetching users for scheduled push:', error);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));