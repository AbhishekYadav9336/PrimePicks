import express from 'express'
import mongoose from 'mongoose';
import bodyParser from 'express';//--this is for accepting the request from thunder client
import userRouter from './Routes/user.js';
import productRouter from './Routes/product.js';
import cartRouter from './Routes/cart.js';
import addressRouter from './Routes/address.js';
// import paymentRouter from './Routes/payment.js'
import cors from 'cors';
const app = express();
// ------- this is for accepting the request from thunder client

app.use(bodyParser.json())

//this is writen to prevent CORS error while connecting backend to frontend
app.use(cors({
    origin:true,
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
}))
//home testing route
app.get('/',(req,res)=>res.json({message:'This is home route'}));

// app.get('/Aboutus',(req,res)=>res.json({message:'This is about us page'}));
//user router
app.use('/api/user',userRouter)

//product Router
app.use('/api/product',productRouter);

//cart router
app.use('/api/cart',cartRouter);

//address router
app.use('/api/address',addressRouter);

// payment Router
// app.use('/api/payment',paymentRouter);

// link is from compass string
mongoose.connect("mongodb+srv://rohitabhishekyadav1609:qx2os6KFed2OOIyQ@cluster0.izhzw.mongodb.net/").then(console.log("mongo db connected sucessfully")).catch((err)=>console.log("error is",err));

const port=1000;
app.listen(port,()=>console.log(`Server is running on port ${port}`));