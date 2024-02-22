const mongoose=require("mongoose");
const departmentSchema=mongoose.Schema({
    departmentId:{
        type:String,
        required:[true,"please fill the departmentid"]
    },
    departmentName:{
        type:String,
        required:[true,"please fill the departmentname"]
    }

},{
    timestamp:true,
})
module.exports=mongoose.model("Department",departmentSchema)