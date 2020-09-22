const { Router } = require("express");
const router = Router();
const Cart = require("../models/cart");
const Courses = require("../models/courses")

router.post("/add", async (req,res) =>{
    console.log(req.body)
    const course = await Courses.getOneItem(req.body.id);
    Cart.add(course)
    res.redirect("/cart")
})

router.get("/",async (req,res) => {
    const cart = await Cart.fetch()
    res.render("cart",{
        title : "Cart",
        isCart : true,
        price : cart.price,
        courses : cart.courses
    })
})


module.exports = router