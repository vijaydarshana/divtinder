const express=require("express");
const connectDB=require("../src/config/database");
const app=express();//application of express
const User=require("../src/models/user");
const { Error } = require("mongoose");
// const adminauth = require("./middlewares/auth");



// app.use("/admin",adminauth);

// app.get("/admin/getalldata",(req,res)=>{
// res.send("Hello all data");
// });
// app.put("/admin/putalldata",(req,res)=>{
// res.send("Hello from put data");
// });

// app.use("/user",(req,res,next)=>{
// res.send("Hello from route handler");
// console.log("hello from console");
// next();
// });



// app.get("/trigger-error", (req, res, next) => {
//     next(new Error("test error"));
// });

app.use(express.json());
app.post("/signup",async (req,res)=>{
   
    const userObj={
        firstName:"virat",
        lastName:"kohli",
        emailId:"virat@kohli.com",
        password:"virat@123"
    }

    try{
    //creating a new instance of the user model
//const user=new User(userObj);
const user=new User(req.body);
await user.save(); //save at db
    }catch(err){
        res.status(400).send("Error"+err.message);
    }
res.send("user added");
});

//findinf one user
app.get("/user",async (req,res)=>{
    const email=req.body.emailId;
    try{
     const user= await User.find({emailId:email});
   if(user.length===0){
    res.status(404).send("user not found");
   }else{

     res.send(user);
   }
   
    }
    catch(err){
res.status(400).send("something went wrong");
    }
   
})


app.get("/feed",async(req,res)=>{
    try{
        const users=await User.find({});
        res.send(users);
    }catch(err){
        res.send("wrong");
    }

})

app.delete("/user/",async (req,res)=>{
    const userId=req.body.userId;
    try{
        const user=await User.findByIdAndDelete(userId);
        res.send("user deleted sucessfully");
    }catch(err){
        res.status(400).send("something went wrong");
    }
})

app.patch("/user/:userid",async(req,res)=>{
    const userId = req.params.userid;  
   const data=req.body;


try{
    
const ALLOWED_UPDATES=[
   "gender","age"
];

const isUpdateAllowed=Object.keys(data).every(k=>ALLOWED_UPDATES.includes(k));

if(!isUpdateAllowed){
    throw new Error("update not allow");
}

const user=await User.findByIdAndUpdate({_id:userId},data,{
   new: true, 
    returnDocument:"after",
    runValidators:true
});
res.send("user update successfully");
}
catch(err){
        res.status(400).send("something went wrong");
    }
});




connectDB().then(()=>{
    console.log("Database connection established.");
    app.listen(3000,()=>{
    console.log("server is succesfully");
});
})
.catch(err=>{console.log("database not connected")});



