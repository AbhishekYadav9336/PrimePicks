// this folder is for structure of database
import mongoose from "mongoose"; 
const userSchema=new mongoose.Schema({
    name:{type:String,require:true},
    email:{type:String,require:true},
    password:{type:String,require:true},
    createdAt:{type:Date,default:Date.now},
})
// Model name is always capital
export const User=mongoose.model("User",userSchema)