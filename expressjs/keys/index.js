const api = require("./email_api.js");

const keys ={
    EMAIL_API_KEY : api.EMAIL_API_KEY,
    MONGO_DB_URL  : "mongodb+srv://daswer_server:1XLpnSuGk5J8s6pE@cluster0.4jm4e.mongodb.net/shop-tutor?retryWrites=true&w=majority",
    SECRET_KEY    : "My secret code",
    EMAIL_ROOT_NAME : "mailservice@boldyrevdev.xyz",
    MAIN_URL : "http://localhost:3000/"
}

module.exports = keys