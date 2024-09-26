import express from 'express';
import { addProduct, getProducts,getProductById, updateProductById, deleteProductById } from '../Controllers/product.js';

const router =express.Router();

//add product
router.post('/add',addProduct);

//get products
router.get('/all',getProducts);

//get product by id
router.get('/:id',getProductById);

//update product by Id -- (for update we use put method)
router.put('/:id',updateProductById);

//delted the product with id
router.delete('/:id',deleteProductById);

export default router;
