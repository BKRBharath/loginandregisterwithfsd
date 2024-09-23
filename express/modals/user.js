var mongoose=require('mongoose');
var schema=mongoose.Schema;
var userschema=new schema({
    username:String,
    password:String,
})


var user=mongoose.model('/login',userschema);
module.exports=user;