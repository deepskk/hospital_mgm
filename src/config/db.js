const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user:"root",
    password:"root",
    database:"hospital_mgm",
});

connection.connect((err) => {
    if(err)
    {
        console.error("Database connection failed: "+ err.stack);
        return;
    }
    console.log("Connection to Mysql Database!  ");
});

module.exports = connection;





/*
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root", // your mysql username
  password: "rishi", // your mysql password
  database: "hms", 

});

connection.connect((err) => {
  if (err) {
    console.error("Database connection failed: " + err.stack);
    return;
  }
  console.log("Connected to MySQL Database!");
});

module.exports = connection;
*/
