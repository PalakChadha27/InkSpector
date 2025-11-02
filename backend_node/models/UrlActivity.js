import mongoose from "mongoose";

const urlActivitySchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    url: String,
    isSafe: { type: Boolean, default: true },
    detectedThreat: { type: String, default: null },
    checkedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("UrlActivity", urlActivitySchema);