import express from "express"
import {login,profile,register,users}from '../Controllers/user.js';
import { Authenticated } from "../Middleware/Auth.js";
const router = express.Router();

//register user
router.post('/register',register) //=> /api/user/register

//login user
router.post('/login',login);

// get all users 
router.get('/all',users);

// get user pprofile
router.get('/profile',Authenticated,profile);

export default router;