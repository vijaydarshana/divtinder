const express=require("express");
const app=express();//application of express

const adminauth = require("./middlewares/auth");



app.use("/admin",adminauth);

app.get("/admin/getalldata",(req,res)=>{
res.send("Hello all data");
});
app.put("/admin/putalldata",(req,res)=>{
res.send("Hello from put data");
});

app.use("/user",(req,res,next)=>{
res.send("Hello from route handler");
console.log("hello from console");
next();
});



app.get("/trigger-error", (req, res, next) => {
    next(new Error("test error"));
});



app.listen(3000,()=>{
    console.log("server is succesfully");
});

