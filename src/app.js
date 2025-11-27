const express=require("express");
const app=express();//application of express

app.use("/",(req,res)=>{
    res.send("hello from dashboard");
})

app.use("/test",(req,res)=>{
    res.send("hello from server");
})

app.listen(3000,()=>{
    console.log("server is succesfully");
});

