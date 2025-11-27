 const admin=(req,res,next)=>{
    console.log("from auth");
const auth="xyz";
const isauth=auth==="xyz";
if(!isauth){
    res.status(401).send("unauth required");
}else{
    next();
}
}

module.exports=admin;