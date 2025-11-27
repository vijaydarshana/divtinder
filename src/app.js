const express=require("express");
const app=express();//application of express



app.use("/user",(req,res,next)=>{
res.send("Hello from route handler");
console.log("hello from console");
next();
},(req,res)=>{res.send("Hello from route handler2");
console.log("hello from console");});

app.listen(3000,()=>{
    console.log("server is succesfully");
});

