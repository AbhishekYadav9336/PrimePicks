import mongoose from 'mongoose';
const paymentSchema = new mongoose.Schema({
    orderDate:{type:Date,default:Date.now},
    payStatus:{type:String}
},{strict:false})
// strict false is used to make volatile schema entries
export const Payment = mongoose.model('Payment',paymentSchema);