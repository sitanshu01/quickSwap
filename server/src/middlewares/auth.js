import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import users from '../models/users.js';

const isLoggedIn = async(req,res,next)=>{
    if(!req.cookies.token || req.cookies.token == ""){
        res.status(401).json({message: "user must be logged in"});
        
    }else{
        try {
            let userData =  jwt.verify(req.cookies.token, process.env.JWT_SECRETKEY);
            req.user = await users.findById(userData.userid).select('-password');
            if (!req.user) {
                return res.status(401).json({ message: "User not found" });
            }
            next();
        } catch (error) {
            console.error(error);
            res.redirect('/login');
        }
    }
    
}

export default isLoggedIn;