const Mongoose=require("mongoose")
const cartModel=Mongoose.model("carts",Mongoose.Schema({

    productid:String,
    productname:String,
    productcategory:String,
    productquantity:String,
    productprice:String,
    productimage:String,
    
    email :{type:String},
}))
module.exports={cartModel}