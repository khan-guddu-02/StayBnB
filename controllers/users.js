const User=require("../models/user");


module.exports.renderSignupForm=(req,res)=>{
    res.render("users/signup.ejs")
}

module.exports.singup=async (req,res)=>{
    try{
        let {email, username,password}=req.body;
        let newUser=new User({email,username});
        let regiteredUser=await User.register(newUser,password);
        console.log(regiteredUser);
        req.login(regiteredUser,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("success","welcome to the wanderlust");
        res.redirect("/listings");
        })
      
    }catch(err){
        req.flash("error","username all ready exist");
        res.redirect("/signup");
    }


}

module.exports.renderLoginForm= (req,res)=>{
    res.render("users/login.ejs");
}

module.exports.login= async (req,res)=>{
    req.flash("success", "welcome to wanderlust !");
   let redirectUrl=res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
}

module.exports.logout=(req,res,next)=>{
    req.logOut((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","logged you out!");
        res.redirect("/listings");
    })
}