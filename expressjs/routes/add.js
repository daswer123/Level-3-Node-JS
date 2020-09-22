const { Router } = require("express");
const Courses = require("../models")
const router = Router();

router.get("/",(req,res) => {
    res.render("add",{
        title : "Добавить курс",
        isAdd : true
    })
})

router.post("/", async (req,res) =>{
    console.log(req.body)

    const {name,price,img} = req.body
    const Course = new Courses(name,price,img);

     await Course.save();

    res.redirect("/courses")
})

module.exports = router