const express=require("express");
const authRouter=express.Router();
const {validateSignUpData}=require("../src/utils/validation");
const User=require("../src/models/user");
const bcrypt = require("bcrypt");

authRouter.post("/signup",async (req,res)=>{
   
    const userObj={
        firstName:"virat",
        lastName:"kohli",
        emailId:"virat@kohli.com",
        password:"virat@123"
    }

    try{
  //validation of data

validateSignUpData(req);

  //encrypt the password
  const { firstName, lastName, emailId,password}=req.body;

const passwordHash=await bcrypt.hash(password,10);



    //creating a new instance of the user model
//const user=new User(userObj);
const user=new User({
    firstName,lastName,emailId,password:passwordHash,
});


//const user=new User(req.body);
await user.save(); //save at db
  return res.status(201).send("user added");
    }catch(err){
      return  res.status(400).send("Error "+err.message);
    }

});
authRouter.post("/login",async(req,res)=>{
try{
const {emailId,password}=req.body;
    const user=await User.findOne({emailId:emailId});
    if(!user){
        throw new Error("Invaild credentials");
    }



const isPasswprdvalid= await user.validatePassword(password);

if(isPasswprdvalid){

//create a jwt token
const token= user.getJWT();

// add the token to cookie and send the response back to the user
res.cookie("token",token);



    res.send("Login Successfull");
}else{
    throw new Error("Invaild credentials");
}

}
catch(err){
    res.status(400).send("ERROR : "+err.message);
}
});

authRouter.post("/logout",async(req,res)=>{
res.cookie("token",null,{
    expires:new Date(Date.now()),
})
res.send("Logout successfully");
});

module.exports=authRouter;