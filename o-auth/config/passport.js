import passport from "passport";
import passportGoogle from "passport-google-oauth20";
import User from "../model/User.js";

const googleStrategy = passportGoogle.Strategy;

passport.use(
  new googleStrategy(
    {
      clientID: "",
      clientSecret: "",
      callbackURL: "",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          const newUser = await User.create({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails?.[0].value,
          });

          return done(null, newUser);
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});
