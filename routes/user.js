const express=require('express');
const userAuth = require('../src/middlewares/auth');
const  ConnectionRequest=require("../src/models/connectionRequest")
const userRouter=express.Router();
const User=require("../src/models/user");
const USER_SAFE_DATA="firstName lastName age gender ";
userRouter.get("/user/requests/received",userAuth, async (req,res)=>{
try{
const loggedInUser=req.user;
const connectionRequest=await ConnectionRequest.find({
    toUserId:loggedInUser._id,
    status:"interested",
}).populate("fromUserId",["firstName","lastName"]);
res.json({message:"Data fetched successfully",data:connectionRequest});
}
catch(err){
    res.status(400),send("ERROR"+err.message);
}
});

userRouter.get("/user/connection",userAuth,async (req,res)=>{
try{

    const loggedInUser=req.user;
const connectionRequest=await ConnectionRequest.find({
    $or:[
        {toUserId:loggedInUser._id,status:"accepted"},
        {fromUserId:loggedInUser._id,status:"accepted"},
    ],
}).populate("fromUserId",["firstName","lastName"]).populate("toUserId",["firstName","lastName"]);

const data=connectionRequest.map((row)=>{
    if(row.fromUserId._id.toString()===loggedInUser._id.toString()){
return row.toUserId
    }
 return   row.fromUserId
})

res.json({data});

}
catch(err){
    res.status(400),send("ERROR"+err.message);
}
});

userRouter.get("/feed",userAuth,async (req,res)=>{
try{
const loggedInUser=req.user;

const page=parseInt(req.query.page)|| 1;
let limit=parseInt(req.query.limit)|| 10;
limit=limit>50?50:limit;
const skip=(page-1)*limit;
// finding all connection request(send+request)
const connectionRequest= await ConnectionRequest.find({
    $or:[
        {fromUserId:loggedInUser._id},
        {toUserId:loggedInUser._id}
    ]
}).select("fromUserId toUserId");

const hideUsersfromfeed=new Set();
connectionRequest.forEach(req=>{
    hideUsersfromfeed.add(req.fromUserId.toString());
    hideUsersfromfeed.add(req.toUserId.toString());
});

const user=await User.find({
  $and: [ {_id:{$nin:Array.from(hideUsersfromfeed)},},{
    _id:{$ne:loggedInUser._id}
  },],
}).select(USER_SAFE_DATA).skip(skip).limit(limit);

res.send(user);
}
catch(err){
    res.status(400),send("ERROR"+err.message);
}
});

module.exports = userRouter;