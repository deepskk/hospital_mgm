const express = require("express");
const path = require("path");
const route = require("./routes/regroutes");
const db = require("./config/db");

const app = express();

app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "view"));

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
app.use(express.static("public"));

app.use("/", route);

module.exports = app;