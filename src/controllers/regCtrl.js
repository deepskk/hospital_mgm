exports.regHomePage = (req,res)=>{
    console.log("Rendering home page..");
    res.render("home");
};

exports.regCtrlLogin = (req, res) => {
    console.log("Rendering login page");
    res.render("login");
};