const Additem=require('../model/Additem');

exports.gettingDataFromExpense=(req,res,next)=>{
    console.log('getting expenses')
    const ITEMS_PER_PAGE=2;
    let page=+req.query.page||1;
     let totalItems;
     Additem.count().then((total)=>{
        totalItems=total;
        return Additem.findAll({where:{loginId:req.user.id},offset:(page-1)*ITEMS_PER_PAGE,limit:ITEMS_PER_PAGE})
            })
      .then((products)=>{
        res.json({
            products:products,
            currentPage:page,
            hasNextPage:ITEMS_PER_PAGE*page<totalItems,
            nextPage:+page+1,
            hasPreviousPage:page>1,
            previousPage:+page-1,
            lastPage:Math.ceil(totalItems/ITEMS_PER_PAGE)

        })
      })

    }
exports.deletedata=async(req,res)=>{
    try{
     if(req.params.id=='undefined'){
         return res.status(400).json({err:'id not found'});
     }
     const uId=req.params.id;
    const row= await Additem.destroy({where:{id:uId,loginId:req.user.id}});
    if(row===0){
        return res.status(404).json({success:false,message:'this data belong to other user '})
    }
    return res.sendStatus(200);

    }catch(err){
     res.status(500).json({
         error:err
     })
    }
 }
 
//  exports.gettingDataOfSingleUser=async(req,res,next)=>{
//     try{
//     const user=await Additem.findAll({where:{loginId:req.user.id}});
//      return  res.status(201).json({allData:user});
//     }
//     catch(err)
//     {
//         //console.log(err);
//         res.status(500).json({
//             Error:err
//         })
//     }
// }