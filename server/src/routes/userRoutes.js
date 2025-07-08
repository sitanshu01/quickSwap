import express from 'express';
const router = express.Router();
import isLoggedIn from '../middlewares/auth.js';
import {register, postProduct, login, logout, allUsers, deleteUser} from '../controllers/userController.js'

router.get('/profile/', isLoggedIn, (req,res)=>{
    res.json({message : "hello"});
})

router.get('/', allUsers)

router.post('/postProduct', isLoggedIn ,postProduct)
router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/deleteUser/:id',isLoggedIn ,deleteUser);



export default router;