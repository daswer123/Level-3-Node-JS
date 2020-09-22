const { Router } = require("express");
const router = Router();
const Courses = require("../models")

router.get("/", async (req,res) =>{
    const courses = await Courses.getAllData();

    res.render("courses",{
        title : "Курсы",
        isCourse : true,
        courses : courses        
    })
})

router.get("/:id/edit", async (req,res) => {
    if(!req.query.allow){
        return res.redirect("/")
    }

    const course = await Courses.getOneItem(req.params.id)

    res.render("course-edit",{
        title : `Edit ${course.title}`,
        course : course
    })
})

router.post("/edit",async (req,res) => {
    await Courses.update(req.body)
    res.redirect("/courses")
})

router.get("/:id",async (req,res) => {
    const course = await Courses.getOneItem(req.params.id)
    res.render("course", {
        title : `Курс ${course.title}`,
        layout : "empty",
        course : course 
    })
})

module.exports = router