const sequelize=require('../util/database');
const Sequelize = require('sequelize');
const logindata=sequelize.define('login',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        unique:true,
        primaryKey:true,
        allowNull:false
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false
    },
    email:{
       type:Sequelize.STRING,
       allowNull:false,
       unique:true
    },
    password:
    {
       type:Sequelize.STRING,
       allowNull:false
    },
});
module.exports=logindata;