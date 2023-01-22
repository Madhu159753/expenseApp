const express=require('express');
const router=express.Router();
const authgetuserkey=require('../middleware/auth');
const purchase=require('../controller/purchase');
router.get('/premiummembership',authgetuserkey.authenticate,purchase.purchasePremium);
router.post('/updatetransactionstatus',authgetuserkey.authenticate,purchase.updateTransactionStatus);
module.exports=router;