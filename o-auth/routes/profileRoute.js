import express from "express";

const router = express.Router();

const checkProfile = async (req, res, next) => {
  if (!req.user) {
    return res.redirect("/");
  } else {
    next();
  }
};

router.get("/", checkProfile, (req, res) => {
  res.render("profile", { user: req.user });
});

export default router;
