const express = require("express");
// const expressLayouts = require('express-ejs-layouts');
const path = require("path");
const route = require("./routes/regroutes");
const db = require("./config/db");
const adminRouter = require('./routes/adminRouter');
// const doctorRoutes = require("./routes/doctorRoutes");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// app.use(expressLayouts);


app.use("/", route);
app.use('/admin', adminRouter);

module.exports = app;