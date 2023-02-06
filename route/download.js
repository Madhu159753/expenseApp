const express=require('express');
const router=express.Router();
const authgetuserkey=require('../middleware/auth');
const downloadcontroller=require('../controller/download');
router.get('/download',authgetuserkey.authenticate,downloadcontroller.download);

module.exports=router;