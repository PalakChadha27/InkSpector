import UrlActivity from "../models/UrlActivity.js";
import User from "../models/User.js";

const DANGEROUS_DOMAINS = [
  'evil-example.com',
  'phishing-site.net',
  'malware-download.org',
  'totally-safe-bank.com.xyz',
];

const detectPhishing = (url) => {
  try {
    const parsedUrl = new URL(url);
    const domain = parsedUrl.hostname.replace('www.', '');
    
    if (DANGEROUS_DOMAINS.includes(domain)) {
      return { isSafe: false, detectedThreat: 'Known Phishing Domain' };
    }
    
    if (domain.endsWith('.zip') || domain.endsWith('.mov')) {
       return { isSafe: false, detectedThreat: 'Suspicious TLD' };
    }
    
    return { isSafe: true, detectedThreat: null };

  } catch (error) {
    return { isSafe: false, detectedThreat: 'Invalid URL format' };
  }
};

export const checkUrl = async (req, res) => {
  try {
    const { url } = req.body;
    const userId = req.userId;

    const { isSafe, detectedThreat } = detectPhishing(url);

    const activity = await UrlActivity.create({ userId, url, isSafe, detectedThreat });

    const user = await User.findById(userId);
    
    user.attemptsDetected += 1;
    
    if (!isSafe) {
      user.threatsBlocked += 1;
    }
    
    user.protectionPercent = Math.round(
      (user.threatsBlocked * 100) / Math.max(1, user.attemptsDetected)
    );

    await user.save();

    res.json({ message: "URL checked", isSafe, activity });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getRecentActivity = async (req, res) => {
  try {
    const activities = await UrlActivity.find({ userId: req.userId })
      .sort({ createdAt: -1 })
      .limit(10);
    res.json(activities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};