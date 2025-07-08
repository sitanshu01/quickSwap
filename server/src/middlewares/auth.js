import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import users from '../models/users.js';

const isLoggedIn = async(req,res,next)=>{
    if(req.cookies.token == ""){
        res.send("user must be logged in");
        res.redirect('/login');
    }else{
        try {
            let userData =  jwt.verify(req.cookies.token, process.env.JWT_SECRETKEY);
            req.user = await users.findById(userData.userid).select('-password');
            next();
        } catch (error) {
            console.error(error);
            res.redirect('/login');
        }
    }
    
}

export default isLoggedIn;