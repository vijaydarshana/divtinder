const express=require("express");
const profileRouter=express.Router();
const userAuth=require("../src/middlewares/auth");
const { validate } = require("../src/models/user");
const {validateProfileEditData}=require("../src/utils/validation");
profileRouter.get("/profile/view", userAuth, async (req,res)=>{
try{
   // const cookie=req.cookies;

    //const {token}=cookie;
// if(!token){
//     throw new Error("invalid token");
// }

    // const isTokenvalid=await jwt.verify(token,"DEV@Tinder$790");
   
    // const {_id}=isTokenvalid;


 const user=req.user;
//  if(!user){
//     throw new Error("User not exist");
//  }
res.send(user);
}
    catch(err){
res.status(400).send("something went wrong");
    }
});

profileRouter.patch("/profile/edit",userAuth,async(req,res)=>{
try{
       
    if(!validateProfileEditData(req)){
        throw new Error("Invalid Edit Request");
    }
    const loggedinuser=req.user;
    Object.keys(req.body).forEach(key=>(loggedinuser[key]=req.body[key]));
    await loggedinuser.save();
  res.send("Profile updated successfully");

}catch(err){
    res.status(400).send("ERROR:"+err.message);
}
});

module.exports=profileRouter;