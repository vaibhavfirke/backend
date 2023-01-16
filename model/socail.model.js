const mongoose=require("mongoose");

const socialSchema=mongoose.Schema({
  title:String,
  body:String,
  device:String
})

const socialModel=mongoose.model("social",socialSchema);
module.exports={socialModel}