const Sequlize = require("sequelize")
const seqelize = require("../utils/db");

const Task = seqelize.define("Task", {
    id : {
        primaryKey :  true,
        autoIncrement : true,
        allowNull : false,
        type : Sequlize.INTEGER
    },
    done : {
        type: Sequlize.BOOLEAN,
        allowNull : false
    },
    title : {
        type : Sequlize.STRING,
        allowNull : false
    }
})

module.exports = Task