const Sequelize=require('sequelize');
const sequelize=new Sequelize('node-complete','root','Madhu@159',{
    dialect:'mysql',
    host:'localhost'
});
module.exports=sequelize;