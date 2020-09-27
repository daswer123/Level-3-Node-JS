const {Schema,model} = require("mongoose");

const tokenSchema = new Schema( {
        tokenId : {
            type : String,
            required : true
        },
        userId : {
            type : Schema.Types.ObjectId,
            ref : "User",
            required : true
        },
        expires : {
            type: Date,
            default : new Date(new Date().setDate(new Date().getDate() + 1))
            
    }
})

module.exports = model("Token",tokenSchema)