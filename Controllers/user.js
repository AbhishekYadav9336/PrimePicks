import {User} from "../Models/User.js";
// it is function for the registration of user
import bcrypt from "bcryptjs";//---for the password encryption into hass value
import jwt from "jsonwebtoken";
//----now making function for registration of new user
export const register= async(req,res)=>{
    const {name,email,password}=req.body
    try{
        let user =await User.findOne({email});//--for check if user already exist
        if(user) return res.json({message:"User Alredy exist",sucessfully:false})
            const hashPass=await bcrypt.hash(password,10);//---password encryption--
         user=await User.create({name,email,password:hashPass});
        res.json({message:"User register sucessfully...!",user,success:true})
    }catch(error){
            res.json({message:error.message})
    }
}
//---now function for the login
export const login = async(req,res) =>{
    const {email,password}=req.body
    try {
          let user=await User.findOne({email})
          if(!user) return res.json({message:"User not foun",success:false})
            const validPassword = await bcrypt.compare(password,user.password);
        if(!validPassword) return res.json({message:'invalid Credential',success:false});
        //now we are creating the token for not just entering userid manualy
        const token = jwt.sign({userId:user._id},"!@#$%^&*()",{ // --------- !@#$%^&*() this is called seacete
            expiresIn:'365d'
        })
        res.json({message:`Welcome ${user.name}`,token,success: true});
    } catch (error) {
        res.json({message:error.message});
        
    }
}

//--get user details
export const users = async (req,res)=>{
    try {
        let users = await User.find().sort({createdAt:-1});
        res.json(users);
    } catch (error) {
        res.json(error.message);
    }
}

// get profile
export const profile = async(req,res)=>{
   res.json({user:req.user})
} 
