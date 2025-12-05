const mongoose=require("mongoose");
const connectDB=async()=>{
mongoose.connect("mongodb+srv://DarshanaVijay:Mongodb@cluster0.0s63fjl.mongodb.net/devtinder");
}
module.exports=connectDB;
