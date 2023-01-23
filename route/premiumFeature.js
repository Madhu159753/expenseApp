const express=require('express');
const router=express.Router();
const authgetuserkey=require('../middleware/auth');
const premiumFeature=require('../controller/premiumFeaure');

router.get('/showLeaderboard',authgetuserkey.authenticate,premiumFeature.getUserLeaderBoard)
module.exports=router;