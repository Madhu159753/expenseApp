const bcrypt=require('bcrypt');
const path=require('path');
const express=require('express');
const router=express.Router();
const rootDir=require('../util/path');
const logindata=require('../model/logindata');
router.get('/',(req,res,next)=>{
    res.sendFile(path.join(rootDir,'view','signin.html'));
});
 function isstringinvalid(string){
    if(string==undefined||string.length===0)
    {
        return true;
    }
    else{
        return false;
    }
 }
router.post('/user-signup',async(req,res,next)=>{
     try{
     const {name,email,password}=req.body;
     if(isstringinvalid(name)||isstringinvalid(email)||isstringinvalid(password)){
            return res.status(400).json({err:'bad parameer, something is missing'})
        }
        const saltrounds=10;
        bcrypt.hash(password,saltrounds,async(err,hash)=>{
            console.log(err)
     await logindata.create({name,email,password:hash});
     res.status(201).json({Details:'successfuly creaed new user'});
    })
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
    if(isstringinvalid(email)||isstringinvalid(password))
    {
        return res.status(400).json({err:'bad parameer, something is missing'})
    }
    const user=await logindata.findAll({where:{email}})
    if(user.length>0){
        bcrypt.compare(password,user[0].password,(err,result)=>{ 
            if(err){
                throw new Error('something went wrong')
            }
            if(result===true){
                res.status(200).json({success:true,message:"user loged in successfuly"})
            }
        else{
         return res.status(400).json({success:false,message:"password is incorrect"})
        }
    })
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