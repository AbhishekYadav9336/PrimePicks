//for the address of user 
import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema({
   //everry user have their own 
   userId:{
      type:mongoose.Schema.Types.ObjectId,//---id of the user
      ref:"User",//--- document type
      require:true
   },
   fullName:{type:String,require:true},
   address:{type:String,require:true},
   state:{type:String,require:true},
   city:{type:String,require:true},
   country:{type:String,require:true},
   pincode:{type:String,require:true},
   phoneNumber:{type:String,require:true},
   createdAt:{type:Date,default:Date.now},
   
})

export const Address = mongoose.model("Address",AddressSchema)