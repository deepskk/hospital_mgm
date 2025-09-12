const db = require("../config/db");

// Render Home Page
exports.regHomePage = (req, res) => {
  console.log("Rendering home page..");
  res.render("home");
};

// Render Login Page
exports.regCtrlLogin = (req, res) => {
  console.log("Rendering login page");
  res.render("login");
};

// Sign In Logic
exports.SignIn = async (req, res) => {
  const { username, password, role } = req.body;
  console.log(`${username}  ${password} ${role}`);

  // Static Admin Login
  if (role === "admin") {
    if (username === "admin" && password === "admin") {
      req.session.username = username;
      req.session.role = role;
      return res.redirect("/admin/dashboard");
    } else {
      return res.send("Invalid admin credentials");
    }
  }

  try {
    let dbRole = role;
    if (role === "receptionist") dbRole = "reception";

    const [rows] = await db.promise().query(
      "SELECT * FROM users WHERE user_name = ? AND password = ? AND role = ?",
      [username, password, dbRole]
    );

    console.log("DB query result:", rows);

    if (rows.length > 0) {
      const user = rows[0];
      req.session.username = user.user_name;
      req.session.role = role;
      req.session.user_id = user.user_id; // Store user_id (useful)

      // Doctor login: Fetch and store doctor_id
      if (role === "doctor") {
        const [docRows] = await db.promise().query(
          "SELECT doctor_id FROM doctor WHERE user_id = ?",
          [user.user_id]
        );

        if (docRows.length > 0) {
          req.session.doctor_id = docRows[0].doctor_id;
        }

        return res.redirect("/doctor/dashboard");
      }

      // Receptionist login
      if (role === "receptionist") {
        return res.redirect("/receptionist/dashboard");
      }

    } else {
      return res.send("Invalid credentials");
    }

  } catch (err) {
    console.error("Login Error:", err);
    return res.status(500).send("Internal Server Error");
  }
};

// Add Doctor Page
exports.addDoctor = (req, res) => {
  console.log("Rendering addDoctor page.");
  res.render("addDoctor");
};

// Logout Handler
exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Logout error:", err);
    }
    res.redirect("/login");
  });
};
