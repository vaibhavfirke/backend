const express=require("express");
const { socialModel } = require("../model/socail.model");
const socialRouter=express.Router();

socialRouter.get("/",async(req,res)=>{
    const q=req.query.device1;
    const q2=req.query.device2;
   
    try{
        if(q=="TABLET"){
            const social= await socialModel.find({device:"TABLET"});
            res.send(social)
        }else if(q=="PC"){
            const social= await socialModel.find({device:"PC"});
            res.send(social)
        }else if(q=="MOBILE"){
            const social= await socialModel.find({device:"MOBILE"});
            res.send(social)
        }
        else if(q=="MOBILE"&&q2=="PC"){
            const social= await socialModel.find({$or:[{device:"MOBILE"},{device:"pc"}]});
            res.send(social)
        }else{
            const social= await socialModel.find();
            res.send(social)

        }

    }catch(err){
        res.send("somthing went wrong")
        console.log(err)
    }
})

socialRouter.post("/create",async(req,res)=>{
    const payload=req.body;
    try{
        const social=new socialModel(payload);
        await social.save();
        res.send("socila post created")
    }catch(err){
        res.send("somthing went wrong")
        console.log(err)
    }
})

socialRouter.patch("/update/:id",async(req,res)=>{
    const payload=req.body;
    const ID=req.params.id;

    try{
        await socialModel.findByIdAndUpdate({_id:ID},payload);

        res.send(`post data updated with id:${ID}`)
    }catch(err){
        res.send("somthing went wrong")
        console.log(err)
    }
})
socialRouter.delete("/delete/:id",async(req,res)=>{
   
    const ID=req.params.id;

    try{
        await socialModel.findByIdAndDelete({_id:ID});

        res.send(`post data deleted with id:${ID}`)
    }catch(err){
        res.send("somthing went wrong")
        console.log(err)
    }
})

module.exports={socialRouter}

// "title":"fullstack",
// "body":"creating the fullstack application",
// "device":"TABLET"