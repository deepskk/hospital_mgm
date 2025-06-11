const express = require("express");
const bodyparser = require("body-parser");

const app = express();
const db = require("./config/db"); // Import database connection

app.use(express.json());

// Sample route to test DB
app.get("/patients", (req, res) => {
    const query = "SELECT * FROM patients"; // change table name as per your schema

    db.query(query, (err, results) => {
        if (err) {
            console.error("Error executing query:", err);
            return res.status(500).send("Database error");
        }
        res.json(results);
    });
});

module.exports = app;
