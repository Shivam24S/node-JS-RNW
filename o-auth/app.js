import express from "express";
import session from "express-session";
import passport from "passport";

import connectDB from "./config/db.js";
import httpError from "./middleware/errorHandler.js";
import authRoutes from "./routes/authRoutes.js";
import profileRoutes from "./routes/profileRoute.js";

const app = express();

app.set("view engine", "ejs");

app.use(
  session({
    secret: "session-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

app.use(passport.initialize());

app.use(passport.session());

import "./config/passport.js";

app.use("/auth", authRoutes);

app.use("/profile", profileRoutes);

app.get("/", (req, res) => {
  // res.status(200).json("hello from server");

  res.render("home", { user: req.user });
});

// undefined routes

app.use((req, res, next) => {
  next(new httpError("requested route not available", 404));
});

app.use((error, req, res, next) => {
  if (req.headersSent) {
    return next(error);
  }

  res
    .status(error.statusCode || 500)
    .json(error.message || "something went wrong please try again later");
});

const port = 5000;

const startServer = async () => {
  try {
    const connect = await connectDB();

    if (!connect) {
      throw new Error("failed to connect db");
    }

    console.log("db connected");

    app.listen(port, () => {
      console.log("server running on port", port);
    });
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

startServer();
