//Setting router and mongoose model_________________________________

const router = require('express').Router();
const mongoose= require('mongoose');
let model_user = require('../model/model_user');
//API___________________________________________________

router.route('/create').post( (req,res) =>
{
const email = req.body.email;
const password=req.body.password;
const this_user = new model_user({email,password});
this_user.save().then(
()=> 
{
res.status(200);
res.json('User added');
} 
).catch( err=> {res.status(400);res.json('Error adding user:\n' + err);} ); 
}
);


router.route('/:email/product').post( (req,res) => {
const mail =req.params.email;
const Name =req.body.productName
const Price = req.body.productPrice
if (Price==null || Name ==null || Price.length==0 || Name.length ==0){res.status(400); res.json('Both productName and productPrice is required'); }else{
model_user.findOneAndUpdate(
{email: mail},
{$push:{"products":{productName:Name,productPrice:Price}}},
{upsert: false, new: true},
function(err, result) {
    if (err) {
      res.status(401);
      res.json(err);  
    } else {
      if(result==null || result.length==0){
        res.status(401);
        res.json('User not found');
      }else{
      res.status(200);
      res.json(result);  
    }}
})
}
}
);


router.route('/:email/product/:productId').put( (req,res) => {
const mail =req.params.email;
const id=req.params.productId; 
const Name=req.body.productName;
const Price=req.body.productPrice; 
if (Price==null || Name ==null || Price.length==0 || Name.length ==0){res.status(400); res.json('Both productName and productPrice is required'); }else{
model_user.findOneAndUpdate(
  {email: mail,"products._id":id},
  {"products.$.productName":Name,"products.$.productPrice":Price},
  {upsert: false, new: true},
  function(err, result) {
      if (err) {
        res.status(500);
        res.json(err);
      } else {
        if(result == null || result.length==0){res.status(401);
          res.json('invalid user or product ID');}else{
        res.status(204);
        res.json('Updated');  }
      }
  })}
  });

  router.route('/:email/product/:productId').delete((req,res)=>
  {
    const mail =req.params.email;
    const id=req.params.productId;
    
    model_user.update(
      {email: mail},
{$pull:{"products":{_id:id}}},
function(err, result) {
  if (err) {
    res.status(401);
    res.json('invalid user or product id');  
  } else {
    if(result == null || result.nModified==0){res.status(401);
      res.json('invalid user or product id');}else{
    res.status(204).json('deleted');  }

  }
})
});

router.route('/:email/product').get((req,res)=>
{
const mail=req.params.email
model_user.find({email:mail}).select("products").exec(function(err, result) {
  if (err) {
    res.status(401);
    res.json('error getting products');  
  } else {
    if(result==null || result.length==0){res.status(401).json('Invalid user');}else{
      if(result[0].products.length==0){res.status(200).json('user has no products');}else{
      res.status(200);
      res.json(result); } 
    }
  }
})
});



//export_______________________________________
module.exports = router;

