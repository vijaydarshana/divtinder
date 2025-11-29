const mongoose=require("mongoose");
const validator=require("validation");
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
if(validator.isEmail(value)){
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

const userModel=mongoose.model("User",userSchema);

module.exports=userModel;