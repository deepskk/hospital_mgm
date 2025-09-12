const express = require("express");
const router = express.Router();
const db = require("../config/db");

// ✅ Login GET route
router.get("/login", (req, res) => {
  if (req.session.username && req.session.role) {
    switch (req.session.role) {
      case "admin":
        return res.redirect("/admin/dashboard");
      case "doctor":
        return res.redirect("/doctor/dashboard");
      case "receptionist":
        return res.redirect("/receptionist/dashboard");
    }
  }
  res.render("login", { error: null });
});

// ✅ Login POST route
router.post("/login", async (req, res) => {
  const { username, password, role } = req.body;

  try {
    const [rows] = await db.promise().query(
      "SELECT * FROM users WHERE user_name = ? AND password = ? AND role = ?",
      [username, password, role]
    );

    if (rows.length > 0) {
      const user = rows[0];
      req.session.username = user.user_name;
      req.session.user_id = user.user_id;
      req.session.role = user.role;

      // Set extra session variables if needed
      if (role === "doctor") {
        const [docRows] = await db.promise().query(
          "SELECT doctor_id FROM doctor WHERE user_id = ?",
          [user.user_id]
        );
        if (docRows.length > 0) {
          req.session.doctor_id = docRows[0].doctor_id;
        }
      }

      // ✅ Redirect by role
      if (role === "admin") return res.redirect("/admin/dashboard");
      if (role === "doctor") return res.redirect("/doctor/dashboard");
      if (role === "receptionist") return res.redirect("/receptionist/dashboard");

    } else {
      return res.render("login", { error: "Invalid credentials or role mismatch" });
    }
  } catch (err) {
    console.error("Login error:", err);
    return res.render("login", { error: "Internal server error" });
  }
});

// ✅ Logout route
router.get("/logout", (req, res) => {
  req.session.destroy((err) => {    
    if (err) {
      console.error("Logout error:", err);
    }
    res.clearCookie("connect.sid");
    res.redirect("/login");
  });
});

// ✅ Home Page Route
router.get("/", (req, res) => {
  res.render("home");  // This renders views/home.ejs
});

module.exports = router;
