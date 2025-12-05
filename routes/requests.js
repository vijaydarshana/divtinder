const express=require("express");
const requestRouter=express.Router();
const userAuth=require("../src/middlewares/auth");
const ConnectionRequest=require("../src/models/connectionRequest");
const User=require("../src/models/user");
requestRouter.post("/request/send/:status/:touserId",userAuth,async(req,res)=>{
try{
const fromUserId=req.user._id;
const toUserId = req.params.touserId;
const status=req.params.status;

const allowedStatus=["ignored","interested"];
if(!allowedStatus.includes(status)){
return res.status(400).json({message:"Invalid status type"+status
});
}




const toUser = await User.findById(toUserId);

if (!toUser) {
  return res.status(404).json({ message: "User not found" });
}


//if there is any existing connectionrequest
const existingConnectionRequest=await ConnectionRequest.findOne({
  $or:[
    {fromUserId,toUserId},
    {fromUserId:toUserId,toUserId:fromUserId},
  ],
});

if(existingConnectionRequest){
throw new Error("connection request exits")
}

const connectionRequest=new ConnectionRequest({
  fromUserId,
  toUserId,
  status,
});
   const data= await connectionRequest.save();
     res.json({
      message:"Connection request send successfully",
      data,
     });
}
catch(err){
res.status(400).send("Error:"+err.message);
}

});

requestRouter.post("/request/review/:status/:requestId",userAuth,async (req,res)=>{
  try{
const loggedInUser=req.user;
const {status,requestId}=req.params;
const allowedStatus=["accepted","rejected"];
if(!allowedStatus.includes(status)){
  return res.status(400).json({message:"Status is not valid"})
}
const connectionRequest=await ConnectionRequest.findOne({
  _id:requestId,
   touserId:loggedInUser._id,
  status:"interested",
});

if(!connectionRequest){
  return res.status(404).json({message:"Connection request not found"});
}
connectionRequest.status=status;
const data= await connectionRequest.save();
res.json({message:"Connection request"+status,data});
  }
  catch(err){
res.status(400).send("Error:"+err.message);
}
})


module.exports = requestRouter;