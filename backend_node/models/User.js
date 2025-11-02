import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String, // Hashed password
    googleId: String,
    githubId: String,
    credits: { type: Number, default: 0 },
    threatsBlocked: { type: Number, default: 0 },
    attemptsDetected: { type: Number, default: 0 },
    protectionPercent: { type: Number, default: 0 },
    
    pushSubscription: { type: Object, default: null },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);