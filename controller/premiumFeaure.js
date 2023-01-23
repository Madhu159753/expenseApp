//const express=require('express');
const logindata=require('../model/logindata');
const Additem=require('../model/Additem');
//const sequelize=require('../util/database');

exports.getUserLeaderBoard=async (req,res)=>{
    try{
       const users=await logindata.findAll()
       const expenses=await Additem.findAll();
       const userAggregatedExpenses={}
       expenses.forEach((expense )=> {
        if(userAggregatedExpenses[expense.loginId]){
         userAggregatedExpenses[expense.loginId]=userAggregatedExpenses[expense.loginId]+expense.amount
        }else
        {
            userAggregatedExpenses[expense.loginId]=expense.amount
        }
       })
     
      userLeaderBoardDetails=[];
      users.forEach((user)=>{
        userLeaderBoardDetails.push({name:user.name, total_cost:userAggregatedExpenses[user.id]||0 })
      })
     userLeaderBoardDetails.sort((a,b)=> b.total_cost-a.total_cost )
      res.status(200).json(userLeaderBoardDetails)
     }
    catch(err){
        //console.log(err);
        res.status(500).json(err)
    }
}