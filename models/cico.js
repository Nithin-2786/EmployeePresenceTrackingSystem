const mongoose=require("mongoose")
const cicoSchema=mongoose.Schema({
   username:{
    type:String,
   },
    date:{
        type:String,
    },
    checkIn:{
        type:Object,
    },
    checkOut:{
        type:Object,
    }
})
module.exports = mongoose.model("cico",cicoSchema)