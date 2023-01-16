const jwt=require("jsonwebtoken");
require("dotenv").config();
const authenticate=(req,res,next)=>{
    const token=req.headers.autorization;
    if(token){
        const decode=jwt.verify(token,process.env.key);
        if(decode){
            next();
        }else{
            res.send("Login Again")
        }
    }else{
        res.send("Login Again")
    }
}

module.exports={authenticate}