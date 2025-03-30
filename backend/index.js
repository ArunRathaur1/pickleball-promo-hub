require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session"); 
const MongoStore = require("connect-mongo"); 
const userRoutes = require("./routes/userRoutes");
const googleAuthRoutes = require("./routes/goolgeauth"); 
const passportStrategy = require("./passport");

const app = express();

app.use(
  session({
    secret: process.env.COOKIE_SECRET || "default_key",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }), // ✅ Store sessions in MongoDB
    cookie: {
      maxAge: 60, 
      secure: false, 
      httpOnly: true,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:8080",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use("/users", userRoutes);
app.use("/auth", googleAuthRoutes);


mongoose
  .connect(process.env.MONGO_URI)

  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
