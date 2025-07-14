import express from 'express';
const router = express.Router();
import isLoggedIn from '../middlewares/auth.js';
import {register, addProduct, login, logout, allProduct, deleteUser, userProfile, item, addWishlist, wishlist, deleteWishlist, deleteProduct} from '../controllers/userController.js'


router.get('/products', allProduct);
router.get('/product/:id', item);
router.delete('/product/:id',isLoggedIn ,deleteProduct);
router.post('/addProduct', isLoggedIn ,addProduct);
router.post('/addWishlist/:id', isLoggedIn ,addWishlist);
router.get('/wishlist', isLoggedIn, wishlist);
router.delete('/wishlist/:id', isLoggedIn, deleteWishlist)
router.get('/profile', isLoggedIn, userProfile);
router.post('/register', register);
router.post('/login', login);
router.get('/logout', isLoggedIn, logout);
router.delete('/deleteUser/:id',isLoggedIn ,deleteUser);

export default router;