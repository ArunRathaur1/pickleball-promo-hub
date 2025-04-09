require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");

// Import Routes
const userRoutes = require("./routes/userRoutes");
const tournamentRoutes = require("./routes/tournamentRoutes");
const athleteRoutes = require("./routes/athleteRoutes");
const courtRoutes = require("./routes/courtRoutes");
const googleAuthRoutes = require("./routes/goolgeauth");
const adminRoutes = require("./routes/adminroute");
const blogRoutes = require("./routes/blogRoutes");
const airoutes=require('./routes/airoutes');
const clublist=require('./routes/clublist');
const newsletter=require('./routes/newsletterRoutes');
const Instagram=require('./routes/Instagramroutes');
const Inquary=require('./routes/inquary');

require("./passport"); // Passport Config

const app = express();

// ✅ SESSION CONFIGURATION
app.use(
  session({
    secret: process.env.COOKIE_SECRET || "default_secret_key",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: "sessions",
    }),
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // ⏳ 1 Day (previously 60ms, which was too low)
      secure: false, // Set to true if using HTTPS
      httpOnly: true,
      sameSite: "lax", // Allows authentication across subdomains
    },
  })
);

// ✅ PASSPORT MIDDLEWARE
app.use(passport.initialize());
app.use(passport.session());

// ✅ MIDDLEWARES
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:8080",
    methods: ["GET", "POST", "PUT", "DELETE","PATCH"],
    credentials: true, // 🔑 Allow cookies
  })
);

// ✅ ROUTES
app.use("/users", userRoutes);
app.use("/tournaments", tournamentRoutes);
app.use("/athletes", athleteRoutes);
app.use("/court", courtRoutes);
app.use("/auth", googleAuthRoutes);
app.use("/admin", adminRoutes);
app.use("/blogs", blogRoutes);
app.use("/airoutes",airoutes);
app.use('/clublist',clublist);
app.use('/newsletter',newsletter);
app.use('/instagram',Instagram);
app.use("/inquary", Inquary);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));


// ✅ START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
