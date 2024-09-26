import { Cart } from "../Models/Cart.js";

//add To Cart
export const addToCart=async (req,res)=>{
    const {productId,title,price,qty,imgSrc}=req.body;
    // const userId = "66bba74e89a93e048cea4822";
    const userId = req.user;
    // console.log('request body:',req.body); 
    let cart = await Cart.findOne({userId});

    if(!cart){
         cart = new Cart({userId,items:[]});//if user not found then making new instance of Cart
    }

    const itemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId
    );//if item already present then increase its quantity only and if not then it return -1 value
    if(itemIndex >-1){
        cart.items[itemIndex].qty += qty;
        cart.items[itemIndex].price += price*qty;
    }
    else{
        cart.items.push(
            {productId,title,price,qty,imgSrc}
        );
    }
   
    //now pushing elements comming from req.body
    await cart.save();
    res.json({message:'Items Added To Cart',cart});
   
}

//get user Cart
export const userCart = async(req,res)=>{
    // const userId="66bba74e89a93e048cea4822";
    const userId = req.user;
    let cart = await Cart.findOne({userId});
    if(!cart){
       return res.json({message:'Cart not fouond'});
    }
       res.json({mesage:"user cart",cart});
   
}
// remove product from cart
export const removeProductFromCart = async(req,res)=>{
    const productId = req.params.productId;
    // const userId="66bba74e89a93e048cea4822";
    const userId = req.user;
    let cart = await Cart.findOne({userId});
    if(!cart){
       return res.json({message:'Cart not fouond'});
    }
    cart.items = cart.items.filter(
        (item) => item.productId.toString() !== productId)
        await cart.save();
       res.json({message:"product removed sucessfully"});  
};

// clear cart
export const clearCart = async(req,res)=>{
    
    // const userId="66bba74e89a93e048cea4822";
    const userId = req.user;
    let cart = await Cart.findOne({userId});
    if(!cart){
        cart=new cart({items:[]})
    }
    else{
        //user found then clear its cart
        cart.items=[];
    }
        await cart.save();
       res.json({mesage:"cart cleared sucessfully"});  
};

//decrease qty from cart

export const decreaseProductQty=async (req,res)=>{
    const {productId,qty}=req.body;
    // console.log(req.body);
    // if(!productId)
    //     console.log("Product id not found")


    // const userId = "66bba74e89a93e048cea4822";
    const userId = req.user;
    let cart = await Cart.findOne({ userId });
    // console.log(cart)


    if(!cart){
         cart = new Cart({userId,items:[]});//if user not found then making new instance of Cart
    }

    const itemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId
    );
//if item already present then decrease its quantity only and if not then it return -1 value
    if(itemIndex >-1)
    {
        const item = cart.items[itemIndex]
        if(item.qty>qty)
    {
       const pricePerUnit = item.price/item.qty
       item.qty -= qty
       item.price -= pricePerUnit*qty
    }
    else{
        cart.items.splice(itemIndex,1)
    } 
} 
else{
         return res.json({message:'invalid product Id'})
}
//now pushing elements comming from req.body
    await cart.save();
    res.json({message:'Items qty decrease from Cart',cart});
}
