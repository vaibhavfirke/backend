const express=require("express");
const { userModel } = require("../model/user.model");
const userRouter=express.Router();
const bcrypt=require("bcrypt");
require("dotenv").config();
const jwt=require("jsonwebtoken")
userRouter.post("/register",async(req,res)=>{
    const {name,email,gender,password}=req.body;
    const userData=await userModel.find({email});
    if(userData.length==0){
        try{
            bcrypt.hash(password,5,async(err,hash)=>{

                const user=new userModel({name,email,gender,password:hash});
                await user.save();
                res.send("Register Successfull")
            })
    
          }catch(err){
            console.log("somting went wrong");
            console.log(err);
          } 
    }else{
        res.send("Email allready exixt")
    }
      
})

userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body;
      try{
        const user=await userModel.find({email})
        if(user.length>0){
            bcrypt.compare(password,user[0].password,function(err,result){
                if(result){
                    const token=jwt.sign({course:"fullstack"},process.env.key);
                    res.send({msg:"Login Successfull",token:token})
                }else{
                    res.send("wrong credentials")
                }
            })

        }else{
            res.send("wring credentials")
        }
        await user.save();
        res.send("Register Successfull")

      }catch(err){
        console.log("somting went wrong");
        console.log(err);
      }
})

module.exports={userRouter}