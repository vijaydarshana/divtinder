const mongoose=require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt"); 
const jwt=require("jsonwebtoken");

const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String
    },
    emailId:{
        type:String,
        required:true,
        unique:true,
        validate(value){
if(!validator.isEmail(value)){
    throw new Error("Invalid email address");
}
        }
    },
    password:{
        type:String,
         required:true
    },
    age:{
        type:Number,
        min:18,
    },
    gender:{
        type:String,
        validate(value){
            if(!["male","female","other"].includes(value)){
                throw new Error("gender not valid")
            }
        },
    },   
},
{
    timestamps:true,
});

userSchema.methods.getJWT=  function(){
    const user=this;
    const token= jwt.sign({_id:user._id},"DEV@Tinder$790",{expiresIn:"1h"});
     return token;
}

userSchema.methods.validatePassword=async function (passwordInputByUser) {
    const user=this;
    const passwordHash=user.password;
    const isPasswordValid=await bcrypt.compare(passwordInputByUser,passwordHash);
return isPasswordValid;
}
const userModel=mongoose.model("User",userSchema); 


module.exports=userModel;