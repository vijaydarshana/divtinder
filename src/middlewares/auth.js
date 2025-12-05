const jwt=require("jsonwebtoken");
const User=require("../models/user");

const userAuth= async (req,res,next)=>{
// Read the token from the req cookie
try{

const {token}=req.cookies;
if(!token){
    throw new Error("Invalid Token");
}

//validate the token
const decodeobj=await jwt.verify(token,"DEV@Tinder$790");

const {_id}=decodeobj;
//find the user
const user=await User.findById(_id);
if(!user){
    throw new Error("Invalid User");
}
req.user=user;
next();
}
catch(err){
    res.status(400).send("ERROR : "+err.message);
}
};

module.exports=userAuth;