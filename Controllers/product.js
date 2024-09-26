import {Products} from "../Models/Product.js";
import { Cart } from "../Models/Cart.js";
//add product
export const addProduct=async(req,res)=>{
    const {title,description,price,category,qty,imgSrc,createdAt}=req.body
    try {
        let product=await Products.create({
            title,description,price,category,qty,imgSrc,createdAt
        });
        res.json({message:'product added sucessfully...!',product})
    } catch (error) {
        res.json(error.message);
    }
}

//get product
export const getProducts=async(req,res)=>{
    let products= await Products.find().sort({creadtedAt:-1})
    res.json({message:'All Products',products});
}

//find product by id
export const getProductById=async(req,res)=>{
    const id=req.params.id;
    let product= await Products.findById(id)
    if(!product) return res.json({message:'Invalid Id'})
    res.json({message:`Product with id ${id} is`,product});
}

//update product by id
export const updateProductById=async(req,res)=>{
    const id=req.params.id;
    let product= await Products.findByIdAndUpdate(id,req.body,{new:true});//--new:true-- for adding any new details of products
    if(!product) return res.json({message:'Invalid Id'})
    res.json({message:`Product update with id ${id} successfully`,product});
}
//delete product by id
export const deleteProductById=async(req,res)=>{
    const id=req.params.id;
    let product= await Products.findByIdAndDelete(id);//--new:true-- for adding any new details of products
    if(!product) return res.json({message:'Invalid Id'})
    res.json({message:`Product update with id ${id} is deleted successfully`,product});
}

