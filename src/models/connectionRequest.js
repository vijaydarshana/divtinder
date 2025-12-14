const mongoose=require("mongoose");
const connectionRequestSchema=new mongoose.Schema({
fromUserId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true,
},
toUserId:{
    type:mongoose.Schema.Types.ObjectId,
     ref:"User",
    required:true,
},
status:{
    type:String,
    required:true,
    enum:{
values:["ignored","interested","accepted","rejected"],
message:`{VALUE} is incorrect status type`
    },
},
},
{
    timestamps:true,
}
);

connectionRequestSchema.index({fromUserId:1,toUserId:1});

connectionRequestSchema.pre("save", function () {
  if (this.fromUserId.equals(this.toUserId)) {
    return next(new Error("you cannot send request to yourself"));
  }
  
});

const connectionRequestModel=new mongoose.model("ConnectionRequest",connectionRequestSchema);
module.exports=connectionRequestModel;