const mongoose=require("mongoose");
const notesSchema=mongoose.Schema({
    title:{type:String,required:true,minLength:5},
    content:{type:String,required:true,minLength:5}
},{timestamps:true})
const Note=mongoose.model("Note",notesSchema);
module.exports=Note;