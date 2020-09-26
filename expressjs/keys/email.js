const keys = require(".");

function registration(to){
    return {
        to,
        from : keys.EMAIL_ROOT_NAME,
        subject : "Your account is created",
        html : `
            <h1>Congrutulation your Acount has been created</h1>
            <p>Now you can login into out greate service</p>
            <p>We rember that your ${to}</p>
            <hr/>
            <p>You can visit to our shop right now <a href="${keys.MAIN_URL}">click here</a></p>
        `
    }
}


module.exports = {registration}