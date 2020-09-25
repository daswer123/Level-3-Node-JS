const { Router } = require("express");
const router = Router();
const auth = require("../middleware/auth");
const Courses = require("../models/courses");

router.get("/", async (req,res) =>{
    const courses = await Courses.find()
    .populate("userId","email username")
    .select("userId price title img");

    const fixedCourses = courses.map(elem => elem.toObject())

    res.render("courses",{
        title : "Courses",
        isCourse : true,
        courses : fixedCourses        
    })
})

router.get("/:id/edit", auth , async (req,res) => {
    if(!req.query.allow){
        return res.redirect("/")
    }

    const course = await Courses.findById(req.params.id)

    res.render("course-edit",{
        title : `Edit ${course.title}`,
        course : course.toObject()
    })
})

router.post("/remove", auth,async (req,res)=>{
    try {
        await Courses.deleteOne({ _id : req.body.id })
        res.redirect("/courses")
    }
    catch(err){
        console.log(err)
    }
})

router.post("/edit", auth,async (req,res) => {
    const id = req.body.id;
    delete req.body.id;
    await Courses.findByIdAndUpdate(id,req.body);
    res.redirect("/courses")
})

router.get("/:id",async (req,res) => {
    const course = await Courses.findById(req.params.id)
    .populate("userId","username")
    .select("title price img");

    res.render("course", {
        title : `Курс ${course.title}`,
        layout : "empty",
        course : course.toObject(),
        author : course.userId.username
    })
})

module.exports = router