import express from "express";
import passport from "passport";

const router = express.Router();

router.get("/login", (req, res) => {
  if (req.user) {
    res.redirect("/profile");
  }
  res.render("login");
});

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);

// callback routes

router.get("/redirect", passport.authenticate("google"), (req, res) => {
  res.redirect("/profile");
});

router.get("/logout", (req, res) => {
  req.logOut((err) => {
    if (err) {
      return res.status(500).json("failed to logout");
    }
  });
  res.redirect("/");
});

export default router;
