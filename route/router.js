const path=require('path');
const express=require('express');
const router=express.Router();
const rootDir=require('../util/path');
const logindata=require('../model/logindata');
router.get('/',(req,res,next)=>{
    res.sendFile(path.join(rootDir,'view','signin.html'));
});
router.post('/user-signin',async(req,res,next)=>{
     try{
     const name=req.body.name;
     const email=req.body.email;
     const password=req.body.password;
     if(name=='undefined'|| name===0 
        || password=='null'|| password===0
        || email=='null' || email===0){
            return res.status(400).json({err:'bad parameer, something is missing'})
        }
     await logindata.create({name:name,email:email,password:password});
     res.status(201).json({Details:'successfuly creaed new user'});
     }
     catch(err){
        console.log(err);
        res.sendStatus(500).json({
            error:err
        })
     }
});
router.get('/user-login',(req,res,next)=>{
    res.sendFile(path.join(rootDir,'view','logIn.html'));
})
module.exports=router;