const exphbs = require("express-handlebars")
const express = require("express")
const homeRoutes = require("./routes/index")
const courseRoutes = require("./routes/course")
const addRoutes = require("./routes/add")

const app = express();

const hbs = exphbs.create({
    defaultLayout : "main",
    extname : "hbs"
})

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views","pages")

app.use(express.static("public"))

app.use(express.urlencoded({extended : true}))

app.use("/",homeRoutes)
app.use("/courses",courseRoutes)
app.use("/add",addRoutes)



const PORT = process.env.PORT || 3000

app.listen((PORT),()=>{
    console.log("Сервер запущен..."+PORT)
})