import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import User from "./models/User.js";
import UrlActivity from "./models/UrlActivity.js";

dotenv.config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Seed script connected to MongoDB.");

    // 1. Wipe existing data
    console.log("Wiping existing data...");
    await User.deleteMany({});
    await UrlActivity.deleteMany({});
    console.log("Data wiped.");

    // 2. Create Seed User (Armaan)
    console.log("Creating seed user 'Armaan'...");
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("password123", salt);

    // Stats from Screenshot (939).jpg
    const armaan = await User.create({
      name: "Armaan",
      email: "testing@gmail.com",
      password: hashedPassword,
      credits: 0,
      threatsBlocked: 0,
      attemptsDetected: 0,
      protectionPercent: 0, // 0 blocked / 0 attempts = 0%
    });
    console.log("👤 User 'Armaan' created.");

    // 3. Create Seed Activities
    console.log("Creating seed URL activities...");
    const activitiesToSeed = [
      {
        userId: armaan._id,
        url: "https://devrel.co/about/",
        isSafe: true,
        detectedThreat: null,
        checkedAt: new Date("2025-09-27T08:54:00.000Z"), // From screenshot
      },
      {
        userId: armaan._id,
        url: "https://devrel.co/about/",
        isSafe: true,
        detectedThreat: null,
        checkedAt: new Date("2025-09-27T08:55:00.000Z"), // From screenshot
      },
      {
        userId: armaan._id,
        url: "https://devrel.co/about/",
        isSafe: true,
        detectedThreat: null,
        checkedAt: new Date("2025-09-27T08:58:00.000Z"), // <-- This was the line with the typo
      },
      {
        userId: armaan._id,
        url: "https://devrel.co/about/",
        isSafe: true,
        detectedThreat: null,
        checkedAt: new Date("2025-09-27T09:00:00.000Z"), // From screenshot
      },
      {
        userId: armaan._id,
        url: "https://devrel.co/about/",
        isSafe: true,
        detectedThreat: null,
        checkedAt: new Date("2025-09-27T09:03:00.000Z"), // From screenshot
      },
    ];

    await UrlActivity.insertMany(activitiesToSeed);
    console.log("✅ Seed activities created.");

    console.log("🎉 Database seeding complete!");

  } catch (error) {
    console.error("❌ Error seeding database:", error.message);
  } finally {
    // 5. Disconnect from DB
    await mongoose.connection.close();
    console.log("🔌 Seed script disconnected from MongoDB.");
  }
};

// Run the function
seedDatabase();