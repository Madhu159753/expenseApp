const path=require('path');
const express=require('express');
const router=express.Router();
const rootDir=require('../util/path');
const logindata=require('../model/logindata');
router.get('/',(req,res,next)=>{
    res.sendFile(path.join(rootDir,'view','signin.html'));
});
router.post('/user-signup',async(req,res,next)=>{
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
    res.sendFile(path.join(rootDir,'view','login.html'));
});
router.post('/user-logins',async(req,res,next)=>{
   try{
    const email=req.body.email;
    const password=req.body.password;
    const user=await logindata.findAll({where:{email}})
    if(user.length>0){
        if(user[0].password===password)
        {
            res.status(200).json({success:true,message:"user loged in successfuly"})
        }
        else{
         return res.status(400).json({success:false,message:"password is incorrect"})
        }
    }
    else{
        return res.status(404).json({success:false,message:"user doesn't exist"})
    }
   }
   catch(err)
   {
    res.status(500).json({message:err,success:false})
   }
})
module.exports=router;