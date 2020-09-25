const { Router } = require("express");
const Courses = require("../models/courses")
const auth = require("../middleware/auth")
const router = Router();

router.get("/", auth, (req,res) => {
    res.render("add",{
        title : "Добавить курс",
        isAdd : true
    })
})

router.post("/", auth, async (req,res) =>{
    const {name,price,img} = req.body
    // const Course = new Courses(name,price,img);

    const courses = new Courses({
        title : name,
        price : price,
        img : img,
        userId : req.user
    })

    try {
        await courses.save()
        res.redirect("/courses")
    } catch (err) {
        console.log(err)
    }
})

module.exports = router