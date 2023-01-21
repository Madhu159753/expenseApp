const path=require('path');

const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const app=express();
app.use(bodyParser.json());
app.use(express.json());
const router=require('./route/router');
const sequelize=require('./util/database');
const logindata = require('./model/logindata');
const Additem = require('./model/Additem');
const { and } = require('sequelize');
app.use(express.static(path.join(__dirname,'public')));
app.use(cors());
app.use(router);
logindata.hasMany(Additem);
Additem.belongsTo(logindata);

sequelize
.sync()
.then(result=>{
    console.log(result);
    app.listen(4000);
})
.catch(err=>{
    console.log(err);
})

