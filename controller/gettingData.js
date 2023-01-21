const logindata=require('../model/logindata');
const Additem=require('../model/Additem');
const jwt=require('jsonwebtoken');

exports.gettingDataFromExpense=async(req,res,next)=>{
    try{
    const user=await Additem.findAll({where:{loginId:req.user.id}});
     return  res.status(201).json({allData:user});
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({
            Error:err
        })
    }
}
exports.deletedata=async(req,res)=>{
    try{
     if(req.params.id=='undefined'){
         return res.status(400).json({err:'id not found'});
     }
     const uId=req.params.id;
    const row= await Additem.destroy({where:{id:uId,loginId:req.user.id}});
    if(row===0){
        return res.status(404).json({success:false,message:'this data belong to other user '})
    }
    return res.sendStatus(200);

    }catch(err){
     res.status(500).json({
         error:err
     })
    }
 }