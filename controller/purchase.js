const Razorpay=require('razorpay');
const order=require('../model/order');

exports.purchasePremium= (req,res)=>{
try{
 var rzp= new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
 })
 const amount = 2000;
  rzp.orders.create({amount, currency: "INR"},(err,order)=>{
    if(err){
        throw new Error(JSON.stringify(err))
    }
    req.user.createOrder({orderid:order.id,status:'pending'}).then(()=>{
        return res.status(201).json({order,key_id:rzp.key_id});
    }).catch(err=>{
        throw new Error(err)
    })
  })
}
catch(err){
console.log(err);
res.json({message:"some thing went wrong",erroe:err})
}
};
exports.updateTransactionStatus=(req,res)=>{
    try{
        const{payment_id,order_id}=req.body;
        order.findOne({where:{orderid:order_id}}).then(order=>{
            order.update({paymentid:payment_id,status:'SUCCESSFUL'}).then(()=>{
                req.user.update({ ispremiumuser:true}).then(()=>{
                    return res.status(202).json({success:true,message:'success  ful'});
                }).catch(err=>{
                    throw new Error(err);
                })
            }).catch(err=>{
                throw new Error(err);
            })
        }).catch(err=>{
            throw new Error(err);
        })
    }
    catch(err){
        res.status(500).json({message:"payment fail",error:err})
    }
}