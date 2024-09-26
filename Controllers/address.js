import { Address } from "../Models/Address.js";

export const addAddress= async (req,res)=>{
    console.log('addAddress route hit');
    let {fullName,address,city,state,country,pincode,phoneNumber}= req.body
    let userId=req.user;
    let userAddress = await Address.create({
        userId,
        fullName,
        address,
        city,
        state,
        country,
        pincode,
        phoneNumber
});
    res.json({message:"Address added",userAddress,success: true});
};

// ----- to get specific address

export const getAddress =async(req,res)=>{
    console.log('getAddress route hit');
     let address = await Address.find({userId:req.user}).sort({createdAt:-1})// sort is to get latest user address
     res.json({message:'address',userAddress:address[0]})
}
