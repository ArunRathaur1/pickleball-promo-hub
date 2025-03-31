const router = require("express").Router();
const passport = require("passport");

const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:8080"; // Default frontend URL

router.get("/login/success", (req, res) => {
  if (!req.user) {
    return res
      .status(403)
      .json({ error: true, message: "User not authenticated" });
  }

  res.status(200).json({
    error: false,
    message: "Successfully Logged In",
    user: req.user,
  });
});



// ❌ Login Failure Route
router.get("/login/failed", (req, res) => {
  res.status(401).json({
    error: true,
    message: "Login Failure",
  });
});

// 🌍 Google OAuth Login Route
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// 🔄 Google OAuth Callback Route
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:8080/dashboard",
    failureRedirect: "/auth/login/failed",
  })
);

// 🚪 Logout Route
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: true, message: "Logout Failed" });
    }
    req.session.destroy(() => {
      res.clearCookie("connect.sid", { path: "/" }); // ✅ Clear session cookie
      res.status(200).json({ message: "Logged out successfully" });
    });
  });
});


module.exports = router;
