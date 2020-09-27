const {Router} = require("express");
const User = require("../models/user");
const Token = require("../models/token");
const uuid = require("uuid");
const crypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const sendgrid = require("nodemailer-sendgrid-transport");
const keys = require("../keys")
const emailOptions = require("../keys/email");
const router = Router();

const transport = nodemailer.createTransport(sendgrid({
    auth : {api_key : keys.EMAIL_API_KEY}
}))


router.get("/login",(req,res) =>{
    res.render("auth/login",{
        isLogin : true,
        title : "Authorization",
        logErr : req.flash("loginErr"),
        regErr : req.flash("registerErr"),
        ConfirmPass : req.flash("ConfirmPass")
    })
})

router.get("/logout",(req,res) =>{
    req.session.destroy(() => {
        res.redirect("/auth/login")
    })
})

router.get("/reset",(req,res)=>{
    res.render("auth/reset")
})

router.post("/reset",async (req,res)=>{

    const email = req.body.email;
    const userId = await User.findOne({ email });
    console.log(userId)
    const tokenId = uuid.v4();

    const isTokenExists = await Token.findOne({ userId })
    
    if (isTokenExists){
        await Token.deleteOne({ userId })
    }

    const tokenHash = await crypt.hash(tokenId,10)

    const token = new Token({
        userId : userId,
        tokenId : tokenHash
    })

    await token.save()

    transport.sendMail(emailOptions.reset(userId.email,tokenId,userId._id))

    req.flash("ConfirmPass","Check your email we send a form")
    res.redirect("/auth/login");
})

router.get("/resetpass", async (req,res) => {
    const tokenId = req.query.token;
    const userId = req.query.id

    // const token = await Token.findOne({ userId });

    const token = await Token.findOne({ userId })

    if (token === null){
        res.render("auth/login")
    }
    const isTokenRight = await crypt.compare(tokenId,token.tokenId)

    if (isTokenRight){
        res.render("auth/resetpass",{
            userId : userId
        });
    } else {
        res.render("auth/login")
    }
    

    
})

router.post("/resetpass",async(req,res) => {
    const {password,confirm} = req.body
    const userId = req.body.userId

    const user = await User.findById(userId);
    console.log(user, userId)

    await Token.findOneAndDelete({ userId })
    
    const newPass = await crypt.hash(password,10)

    await user.updateOne({password : newPass})

    req.flash("ConfirmPass", "Your password succssesfully be changed!")
    res.redirect("/auth/login")
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

        // await transport.sendMail(emailOptions.registration(email))

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