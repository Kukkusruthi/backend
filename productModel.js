const Mongoose=require("mongoose")
const productModel=Mongoose.model("products",Mongoose.Schema({

    productid:String,
    productname:String,
    productcategory:String,
    productquantity:String,
    productprice:String,
    productimage:String,
}))
module.exports={productModel}