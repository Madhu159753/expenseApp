const path=require('path');
const express=require('express');
const router=express.Router();
const rootDir=require('../util/path');
const logindata=require('../model/logindata');
router.get('/',(req,res,next)=>{
    res.sendFile(path.join(rootDir,'view','login.html'));
});
router.post('/user-login',async(req,res,next)=>{
     try{
     const name=req.body.name;
     const email=req.body.email;
     const password=req.body.password;
     const data=await logindata.create({name:name,email:email,password:password});
     res.status(201).json({Details:data});
     }
     catch(err){
        console.log(err);
        res.send(500).json({
            error:err
        })
     }
});
module.exports=router;