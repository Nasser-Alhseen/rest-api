const mongoose=require("mongoose");
const Note = require("../models/notes");

module.exports.get_notes=async(req,res,next)=>{
 try{
    const notes=await Note.find({},{__v:0});
    if(notes.length==0) return res.staus(200).json({message:"no notes"});
    res.status(200).json({
        notes:notes
    })

 }catch(err){
    res.status(500).json({
        error:err
    })
 }
 
}
module.exports.create_note=async(req,res,next)=>{
 try{
    const note=new Note({title:req.body.title,content:req.body.content})
    const savedNote=await note.save();
    if(!savedNote) return res.staus(500).json({message:"note was not saved"});
    delete savedNote.__v
    res.status(200).json({
       message:"note saved",
       note:savedNote
    })

 }catch(err){
    res.status(500).json({
        error:err
    })
 }
 
}
module.exports.get_note=async(req,res,next)=>{
 try{
    const note=await Note.findById(req.params.noteId);
    if(!note)return res.json(404).json({message:"Not Found"});
    res.status(200).json({
      _id:note._id,
      title:note.title,
      content:note.content
    })
    


 }catch(err){
    res.status(500).json({
        error:err
    })
 }
 
}
module.exports.update_note=async(req,res,next)=>{
 try{
    const note=await Note.findById(req.params.noteId);
    console.log(note)
    if(!note) return res.staus(500).json({message:"note was not found"});
   const updatedNote=await Note.updateOne({_id:req.params.noteId},{$set:{title:req.body.title,content:req.body.content}});
   delete updatedNote.__v;
   res.status(200).json({
      message:"note updated",note:updatedNote
   })
   
   

 }catch(err){
    res.status(500).json({
        error:err
    })
 }
 
}
module.exports.delete_note=async(req,res,next)=>{
 try{
    const note=await Note.findById(req.params.noteId);
   if(!note)res.staus(500).json({message:"note not found"});
   const result=await Note.deleteOne({_id:req.params.noteId});
   res.status(200).json({message:"note deleted",result})
    


 }catch(err){
    res.status(500).json({
        error:err
    })
 }
 
}