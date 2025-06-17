const db = require("../config/db");

exports.regHomePage = (req,res)=>{
    console.log("Rendering home page..");
    res.render("home");
};

exports.regCtrlLogin = (req, res) => {
    console.log("Rendering login page");
    res.render("login");
};

exports.SignIn = async (req, res) => {
  const { username, password, role } = req.body;

  if (role === "admin") {
    // Static admin login
    if (username === "admin" && password === "admin") {
      return res.render("Admin/adminDashboard");
    } else {
      return res.send("Invalid admin credentials");
    }
  }

  if (role === "receptionist") {
    try {
      const [rows] = await db.promise().query(
        "SELECT * FROM users WHERE user_name = ? AND password = ? AND role = ?",
        [username, password, "reception"]
      );

      if (rows.length > 0) {
        return res.render("Receptionist/dashboard");
      } else {
        return res.send("Invalid receptionist credentials");
      }
    } catch (err) {
      console.error("Database error:", err);
      return res.send("Internal Server Error");
    }
  }

  // Optional: add logic for doctor login here

  res.send("Invalid Username, Password, or Role.");
};

exports.addDoctor =(req,res)=>{
    console.log("Rendering addDoctor page.");
    res.render("addDoctor");
}

