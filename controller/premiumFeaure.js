//const express=require('express');
const logindata=require('../model/logindata');
const Additem=require('../model/Additem');
const sequelize=require('../util/database');

exports.getUserLeaderBoard=async (req,res)=>{
    try{
       const users=await logindata.findAll({
         attributes:['id','name',[sequelize.fn('sum',sequelize.col('additems.amount')),'total_cost']],
         include:[
            {
            model:Additem,
            attributes:[]
         }
        ],
        group:['login.Id'],
        order:[['total_cost','DESC']]
       });

       
      res.status(200).json(users)
     }
    catch(err){
       console.log(err);
        res.status(500).json(err)
    }
}