const mongoose=require("mongoose")
const{Schema}=mongoose;
const UserSchema=new Schema({
    name:{
        type:String,
        requiered:true
    },
    location:{
        type:String,
        requiered:true
    },
    email:{
        type:String,
        requiered:true
    },
    password:{
        type:String,
        requiered:true
    },
    date:{
        type:Date,
        default: Date.now
    },
})
module.exports=mongoose.model('user',UserSchema)