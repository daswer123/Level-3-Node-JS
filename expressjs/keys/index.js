const api = require("./email_api.js");

const keys ={
    EMAIL_API_KEY : api.EMAIL_API_KEY,
    MONGO_DB_URL  : api.MONGO_DB_URL,
    SECRET_KEY    : "My secret code",
    EMAIL_ROOT_NAME : "mailservice@boldyrevdev.xyz",
    MAIN_URL : "http://localhost:3000/"
}

module.exports = keys