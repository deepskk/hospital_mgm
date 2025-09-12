const express = require("express");
const path = require("path");
const session = require("express-session");

const route = require("./routes/regroutes"); // General login/home routes
const receptionRoutes = require("./routes/receptionRoutes"); // Receptionist modules
const receptionistRouter = require("./routes/receptionistRouter");
const adminRouter = require("./routes/adminRouter"); // Admin modules
const doctorRouter = require("./routes/doctorRouter");
const medicalRoutes = require("./routes/medicalRoutes");

const app = express();

// Middleware to parse form data and JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static files
app.use(express.static("public"));

// -------------------------
// ✅ SESSION Middleware
// -------------------------
app.use(session({
  secret: 'hospital_secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,          // true only with HTTPS
    maxAge: 1000 * 60 * 30   // 30 minutes
  }
}));

// -------------------------
// ✅ Prevent Browser Caching (so user can't go back after logout)
// -------------------------
app.use((req, res, next) => {
  res.set("Cache-Control", "no-store, no-cache, must-revalidate, private");
  res.set("Pragma", "no-cache");
  res.set("Expires", "0");
  next();
});

// -------------------------
// ✅ Make session username available to all views
// -------------------------
app.use((req, res, next) => {
  res.locals.username = req.session.username;
  next();
});

// Set EJS view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// -------------------------
// ✅ Routes
// -------------------------
app.use("/receptionist", receptionRoutes);
app.use("/receptionist", receptionistRouter);
app.use("/admin", adminRouter);
app.use("/doctor", doctorRouter);
app.use("/medical", medicalRoutes);
app.use("/", route); // General login/home routes – keep at bottom

module.exports = app;
