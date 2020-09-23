const exphbs = require("express-handlebars")
const path = require("path")
const express = require("express")
const homeRoutes = require("./routes/index")
const courseRoutes = require("./routes/course")
const addRoutes = require("./routes/add")
const cartRoutes = require("./routes/cart")

const app = express();

const hbs = exphbs.create({
    defaultLayout : "main",
    extname : "hbs"
})

app.engine("hbs", hbs.engine);

app.set("view engine", "hbs");
app.set("views","pages")

app.use(express.static(path.join(__dirname,"public")))

app.use(express.urlencoded({extended : true}))

app.use("/",homeRoutes)
app.use("/courses",courseRoutes)
app.use("/add",addRoutes)
app.use("/cart",cartRoutes)



const PORT = process.env.PORT || 3000

app.listen((PORT),()=>{
    console.log("Сервер запущен..."+PORT)
})