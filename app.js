const path=require('path');

const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const app=express();
app.use(bodyParser.json());
app.use(express.json());
const router=require('./route/router');
const premium=require('./route/purchase');
const sequelize=require('./util/database');
const logindata = require('./model/logindata');
const Additem = require('./model/Additem');
//const premium = require('./model/order');
const order = require('./model/order');
app.use(express.static(path.join(__dirname,'public')));
app.use(cors());
app.use(router);
app.use(premium);
logindata.hasMany(Additem);
Additem.belongsTo(logindata);

logindata.hasMany(order);
order.belongsTo(logindata);

sequelize
.sync()
.then(result=>{
    //console.log(result);
    app.listen(4000);
})
.catch(err=>{
    console.log(err);
})

