const express = require("express");
// const expressLayouts = require('express-ejs-layouts');
const path = require("path");
const route = require("./routes/regroutes");
const db = require("./config/db");
const adminRouter = require('./routes/adminRouter');
// const doctorRoutes = require("./routes/doctorRoutes");
const receptionRoutes = require("./routes/receptionRoutes");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use("/receptionist", receptionRoutes);
// Server Bootstrap CSS and JS
// app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));


app.use("/", route);
app.use('/admin', adminRouter);

module.exports = app;


