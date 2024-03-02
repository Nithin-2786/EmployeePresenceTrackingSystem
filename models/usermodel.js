const mongoose = require("mongoose")
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "please type your username"]
    },
    email: {
        type: String,
        required: [true, "please fill the email"],
        unique: [true, "email is already exist"]
    },
    password: {
        type: String,
        required: [true, "please type the password"]
    },
    department: {
        type:String,
        
    },
    userType:{
        type:String,
        
    },
    dob:{
        type:String,
    }
    
}, 
{
    timeStamps: true
})
module.exports = mongoose.model("User", userSchema)