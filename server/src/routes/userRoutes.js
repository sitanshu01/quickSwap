import express from 'express';
const router = express.Router();
import isLoggedIn from '../middlewares/auth.js';
import {register, addProduct, login, logout, allProduct, deleteUser, userProfile, item} from '../controllers/userController.js'


router.get('/products', allProduct);
router.get('/product/:id', item)
router.post('/addProduct', isLoggedIn ,addProduct);
router.get('/profile', isLoggedIn, userProfile);
router.post('/register', register);
router.post('/login', login);
router.get('/logout', isLoggedIn, logout);
router.get('/deleteUser/:id',isLoggedIn ,deleteUser);

export default router;