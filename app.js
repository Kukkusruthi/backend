const Express=require("express");
const Bodyparser=require("body-parser")
const Cors=require("cors")
const Mongoose=require("mongoose")


const{productModel}=require("./productModel")
const{userModel}=require("./src/model/userModel")
const { adminModel } = require("./src/model/adminModel")
const app=Express()
app.use(Cors())
app.use(Bodyparser.urlencoded({extended:true}))
app.use(Bodyparser.json())

Mongoose.connect("mongodb+srv://sruthi:sruthikukku@cluster0.9ku0d77.mongodb.net/eshopDB?retryWrites=true&w=majority")



app.post("/Frontpage", async(req, res) => {
    const request = req.body
    userModel.findOne({ email: request.email }, (err,  regdata) => {
        if ( regdata) {
            if ( regdata.password == request.password) {
                res.send({ "success": true,  regdata:  regdata });

            } else {
                res.send({ "success": "Invalid password!" });
            }
        } else {
            res.send({ "success": "No User Found!" });
        }
    })
})

app.post("/signup",async(req,res)=>{
    const data=req.body
    console.log(data)
    const ob=new userModel(data)
    ob.save((error,data)=>{
        if(error)
        {
            res.send("error occured")
        }
        else
        {
            res.send(data)
        }
    }) 
})
app.post("/adminlogin",async(req,res)=>{
    const data=req.body
    console.log(data)
    const ob=new adminModel(data)
    ob.save((error,data)=>{
        if(error)
        {
            res.send("error occured")
        }
        else
        {
            res.send(data)
            console.log("hai")
        }
    }) 
})








app.post("/create",(req,res)=>{
    const datas=req.body 
    const ob=new productModel(datas)
    ob.save((error,data)=>{
        if(error)
        {
            res.send("error occured")
        }
        else
        {
            res.send(data)
        }

    })
})

app.get("/viewProduct",(req,res)=>{
    productModel.find(
        (error,data)=>{
            if(error){
                res.send(error)
                
            }
            else{
                res.send(data)
                console.log(data)
            }
        }
    )
})
app.delete('/delete/:id',function(req,res){
    const id = req.params.id;
    productModel.findByIdAndDelete(id,(error,data)=>{
       if(error){
        res.send(error)
       }else{
        res.status(200).json({
            msg:data
        })
       }
    })
})
app.post("/viewprdt",(req,res)=>{
    console.log(req.body)
    productModel.find({productcategory:req.body.productcategory},
        (error,data)=>{
            if(error){
                res.send(error)
                
            }
            else{
                res.send(data)
                console.log(data)
            }
        }
    )
})

app.put('/update/:id',function(req,res){
    
    const id = req.params.id,
    productid=req.body.productid,
    productname=req.body.productname,
    productcategory=req.body.productcategory,
    productquantity=req.body.productquantity,
    productprice=req.body.productprice,
    productimage=req.body.productimage
    productModel.findByIdAndUpdate({"_id":id},
    {$set:{"productid":productid,
        "productname":productname,
        "productcategory":productcategory,
        "productquantity":productquantity,
        "productprice":productprice,
        "productimage":productimage
}}).then(function(){
    productModel.find(
        (error,data)=>{
            if(error){
                res.send(error)
                
            }
            else{
                res.status(200).json({
                    msg:data
                })
            }
        }
    )})
  })




app.listen(4000,()=>{console.log("server running at http://localhost:4000")})