import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GitHubStrategy } from "passport-github2";
import User from "../models/User.js";

const setupPassport = () => {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ googleId: profile.id });
      if (user) {
        return done(null, user);
      }

      user = await User.findOne({ email: profile.emails[0].value });
      if (user) {
        user.googleId = profile.id;
        await user.save();
        return done(null, user);
      }

      const newUser = await User.create({
        name: profile.displayName,
        email: profile.emails[0].value,
        googleId: profile.id,
      });
      return done(null, newUser);
    } catch (err) {
      return done(err, null);
    }
  }));

  passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "/api/auth/github/callback",
    scope: ['user:email']
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const email = profile.emails && profile.emails[0].value;

      let user = await User.findOne({ githubId: profile.id });
      if (user) {
        return done(null, user);
      }
      
      if (email) {
        user = await User.findOne({ email: email });
        if (user) {
          user.githubId = profile.id;
          await user.save();
          return done(null, user);
        }
      }

      const newUser = await User.create({
        name: profile.displayName || profile.username,
        email: email,
        githubId: profile.id,
      });
      return done(null, newUser);
    } catch (err) {
      return done(err, null);
    }
  }));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });
};

export default setupPassport;