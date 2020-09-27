const { Router } = require("express");
const router = Router();
const auth = require("../middleware/auth")

router.get("/", auth ,async (req,res) => {
    const user = await req.user
    res.render("profile",{
        title: "Profile "+user.username,
        isProfile : true,
        user : user.toObject()
    })
})

module.exports = router;