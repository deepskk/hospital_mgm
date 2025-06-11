const mysql = require("mysql2");

const db = mysql.createConnection({
    host:"localhost",
    user: "root",
    password: "root",
    database:"hospital_mgm",
});

db.connect((err)=>{
    if(!err)
    {
        console.log("connected db...")
    }
})