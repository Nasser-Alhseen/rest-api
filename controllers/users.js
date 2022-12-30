const mongoose=require("mongoose");
const User=require("../models/user");
const jwt=require('jsonwebtoken');
const bcrypt=require("bcrypt");
const user = require("../models/user");
const { token } = require("morgan");
require('dotenv').config()

module.exports.signup_post=async(req,res,next)=>{
    
    const {email,password}=req.body;

    const cryptedPassword=await bcrypt.hash(password,10);
    const user=await User({email:email,password:cryptedPassword})
    try{
       const result= await user.save()
       res.status(200).json({
        message:"User Signed Up",
        user:{user}
       })
    }catch(err){
        res.status(500).json({
            err:err
           })
    }

}
module.exports.login_post=async(req,res,next)=>{
    try{
        const user=await User.findOne({email:req.body.email});
       if(!user)return res.status(404).json({message:"user not found"});
       bcrypt.compare(req.body.password,user.password,(err,result)=>{
        if(err)return  res.status(500).json({message:"Auth Failed"});

      const  token=jwt.sign({email:user.email},process.env.tokenKey,{expiresIn:"2h"})
        res.status(200).json({message:"Auth Successful",token:token})
       })     
            
        
       
    }catch(err){
       res.status(500).json({
        route:"Login",error:err
       })
    }
   
}