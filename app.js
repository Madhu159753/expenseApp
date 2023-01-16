const path=require('path');
const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const app=express();
app.use(bodyParser.json());
const router=require('./route/router');
const sequelize=require('./util/database');
app.use(express.static(path.join(__dirname,'public')));
app.use(cors());
app.use(router);
sequelize
.sync()
.then(result=>{
    console.log(result);
    app.listen(4000);
})
.catch(err=>{
    console.log(err);
})

