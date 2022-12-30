const jwt =require("jsonwebtoken");
require("dotenv").config()
module.exports=(req,res,next)=>{
    try{
        const decoded=jwt.verify(req.headers.authorization.split(" ")[1],process.env.tokenKey)
            if(!decoded)return res.status(500).json({message:"not authorized"})
            next()
    }catch(err){
       return res.status(500).json({error:err})

    }
    
}