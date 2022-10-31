
const Mongoose = require ("mongoose")
const schema = Mongoose.Schema;

const detailsSchema = new schema({

    email :{type:String,required :true},
    password : {type: String,required :true}
   
})
var userModel = Mongoose.model("details",detailsSchema);
module.exports = {userModel}