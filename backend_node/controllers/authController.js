import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const createToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed });

    const token = createToken(user);
    // Return user object without password
    const userResponse = user.toObject();
    delete userResponse.password;
    
    res.status(201).json({ token, user: userResponse });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!user.password) {
      return res.status(401).json({ message: "Please log in using Google or GitHub." });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Invalid credentials" });

    const token = createToken(user);
    const userResponse = user.toObject();
    delete userResponse.password;
    
    res.json({ token, user: userResponse });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const oauthSuccess = (req, res) => {
  const token = createToken(req.user);
  res.redirect(`${process.env.CLIENT_URL}/oauth-success?token=${token}`);
};


export const subscribeToPush = async (req, res) => {
  const subscription = req.body;
  const userId = req.userId;

  if (!subscription || !subscription.endpoint) {
    return res.status(400).json({ message: "Invalid subscription object." });
  }

  try {
    await User.findByIdAndUpdate(userId, {
      pushSubscription: subscription
    });
    res.status(201).json({ message: "Subscribed to notifications" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const unsubscribeFromPush = async (req, res) => {
  const userId = req.userId;

  try {
    await User.findByIdAndUpdate(userId, {
      pushSubscription: null
    });
    res.status(200).json({ message: "Unsubscribed from notifications" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};