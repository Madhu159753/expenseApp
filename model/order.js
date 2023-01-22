const sequelize=require('../util/database');
const Sequelize=require('sequelize');
const order=sequelize.define('order',{
id:{
    type:Sequelize.INTEGER,
    unique:true,
    autoIncrement:true,
    allowNull:false,
    primaryKey:true

},
paymentid:Sequelize.STRING,
orderid:Sequelize.STRING,
status:Sequelize.STRING
})
module.exports=order;