import mongoose from "mongoose";
//here every user have seprate cart there we make two schema one is for the user and inside which we call the cartitem schema
const cratItemSchema=new mongoose.Schema({
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"product",
        require:true,
     },
     title:{type:String,require:true},
     price:{type:Number,require:true},
     qty:{type:Number,require:true},
     imgSrc:{type:String,require:true},
})
const cartSchema=new mongoose.Schema({
     userId:{
        type:mongoose.Schema.Types.ObjectId,//---id of the user
        ref:"User",//--- document type
        require:true
     },
     items:[cratItemSchema],// calling the item schema
});
export const Cart=mongoose.model("Cart",cartSchema);