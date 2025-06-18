const express = require("express");
const path = require("path");

const route = require("./routes/regroutes"); // General login/home routes
const receptionRoutes = require("./routes/receptionRoutes"); // Receptionist modules
const adminRouter = require("./routes/adminRouter"); // Admin modules

const db = require("./config/db"); // MySQL DB Connection

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Routes
app.use("/receptionist", receptionRoutes);
app.use("/admin", adminRouter);
app.use("/", route); // This should be last to act as fallback route

module.exports = app;
