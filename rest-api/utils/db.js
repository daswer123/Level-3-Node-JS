const Seqelize = require("sequelize");

const DB_NAME = "node-todo"
const USER_NAME = "root"
const PASSWORD  = "12qw34er12"

const seqelize = new Seqelize(DB_NAME, USER_NAME, PASSWORD, {
    host : "localhost",
    dialect : "mysql"
});

module.exports = seqelize