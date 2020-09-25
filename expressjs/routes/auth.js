const {Router} = require("express");
const User = require("../models/user")
const crypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const sendgrid = require("nodemailer-sendgrid-transport");
const keys = require("../keys")
const emailOptions = require("../keys/email")
const router = Router();

const transport = nodemailer.createTransport(sendgrid({
    auth : {api_key : keys.EMAIL_API_KEY}
}))

router.get("/login",(req,res) =>{
    res.render("auth/login",{
        isLogin : true,
        title : "Authorization",
        logErr : req.flash("loginErr"),
        regErr : req.flash("registerErr")
    })
})

router.get("/logout",(req,res) =>{
    req.session.destroy(() => {
        res.redirect("/auth/login")
    })
})

router.post("/login",async(req,res) =>{
    try {
        const {email,password} = req.body;

        const user = await User.findOne({ email })
        if(user){            
        const passSame = await crypt.compare(password, user.password)
            if (passSame){
                req.session.user = user;
                req.session.isAuth = true;
                req.session.save(err => {
                    if (err) {throw err}
                    res.redirect("/")
                })
            } else {
                req.flash("loginErr","Your password is wrong");
                res.redirect("/auth/login#login");
            }
        } else{
            req.flash("loginErr","User don't exists");
            res.redirect("/auth/login#login");  
        }

    }
    catch (err) {
        console.log(err)
    }
    // req.session.isAuth = true
    // const user = await User.findById("5f6d985fc123d91a00852dd9");
    // req.session.user = user;
    // req.session.save(err=> {
    //     if (err) throw err
    //     res.redirect("/")
    // })
})

router.post("/register",async (req,res) => {
    try{
        const {email, password, confirm ,username} = req.body;
        const userHere = await User.findOne({ email })

        if (userHere){
            req.flash("registerErr","There is user with the same Email")
            res.redirect("/auth/login#register")
            return
        }

        if (password !== confirm) {
            req.flash("registerErr","Password doesn't matches")
            res.redirect("/auth/login#register")
            return
        }

        const hashPassword = await crypt.hash(password,10)
        const user = new User({
            email,username,password : hashPassword, cart : {items : []}
        })

        await user.save()

        await transport.sendMail(emailOptions(email))

        req.session.user = user;
        req.session.isAuth = true;
        req.session.save(err => {
            if (err) {throw err}
            res.redirect("/")
            return
        })

    } catch (err){
        console.log(err)
    }
})

module.exports = router