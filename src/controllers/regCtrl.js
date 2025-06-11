exports.regHomePage = (req,res)=>{
    console.log("Rendering home page..");
    res.render("home");
};

exports.regCtrlLogin = (req, res) => {
    console.log("Rendering login page");
    res.render("login");
};

exports.verifyLogin = (req, res) => {
    const { username, password, role } = req.body;

    // Static check for Admin credentials
    if (username === "admin" && password === "admin" && role === "admin") {
        return res.render("adminDashboard"); // ✅ Show dashboard
    }

    // If login fails
    res.send("❌ Invalid Username, Password or Role.");
};
