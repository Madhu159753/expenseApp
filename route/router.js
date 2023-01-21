const bcrypt=require('bcrypt');
const path=require('path');
const jwt=require('jsonwebtoken');
const express=require('express');
const router=express.Router();
const postData=require('../controller/postdata');
const gettingData=require('../controller/gettingData');
const getuserkey=require('../middleware/auth');

const Additem=require('../model/Additem');

router.post('/user-signup',postData.postDataForSignUp);
router.post('/user-logins',postData.postLoginData);
router.post('/get-expense',getuserkey.authenticate,postData.addDataInExpense);
router.get('/get-data',getuserkey.authenticate,gettingData.gettingDataFromExpense);

router.delete('/delete-user/:id',getuserkey.authenticate,gettingData.deletedata);
module.exports=router;