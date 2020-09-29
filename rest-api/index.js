const express = require("express");
const path = require("path")

const sequelize = require("./utils/db");

const app = express();
const PORT = process.env.PORT || 3000;

const todoRoutes = require("./routes/todo");

app.use(express.urlencoded({extended : true}));
app.use(express.json())

app.use(express.static(path.join(__dirname,"public")))

app.use("/api/task",todoRoutes)

async function start() {
    await sequelize.sync();
    app.listen( PORT, () => {
        console.log("Сервер запущен на порту "+PORT)
    } )
}

start()
