
const Mongoose = require ("mongoose")
const schema = Mongoose.Schema;

const detailsSchema = new schema({

    username :{type:String,required :true},
    password : {type: String,required :true}
   
})
var adminModel = Mongoose.model("admin",detailsSchema);
module.exports = {adminModel}