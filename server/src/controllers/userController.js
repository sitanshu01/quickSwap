import users from '../models/users.js';
import products from '../models/products.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const register = async(req,res)=>{
    let {name, username, email, password} = req.body;
    let user = await  users.findOne({email});
    if(user) {
        console.log("user already exists");
    }else{
        bcrypt.genSalt(10, (err,salt)=>{
            bcrypt.hash(password, salt, async(err, hash)=>{
                if(err) console.error(err);
                try {
                    let user = await users.create({
                        name,
                        username,
                        email,
                        password :hash,
                    })
                    let token = jwt.sign({username, userid : user._id} , process.env.JWT_SECRETKEY);
                    res.cookie("token", token);
                    console.log("new user register : ", user);
                    res.status(201).json({message: "user registered succesfully"});
                } catch (error) {
                    console.error(error);
                    res.status(500).json({message: "Error creating user"});

                }
            })
        })
    }
}

const postProduct = async(req,res)=>{
    let {name, category, price} = req.body;
    let user = req.user;
    let newProduct  = await products.create({
        name,
        category,
        price,
        user : user._id,
    });
    user.products.push(newProduct._id);
    await user.save();
    res.status(201).json({message : "product saved successfully"})
}

const login = async(req,res)=>{
    let {username, password} = req.body;
    let user = await users.findOne({username});
    if(!user){
        console.log("user not found");
        res.status(500).json({message:"user not found"})
    }
    bcrypt.compare(password, user.password, (err,result)=>{
        if(result){
            let token = jwt.sign({username, userid: user._id}, process.env.JWT_SECRETKEY);
            res.cookie("token", token);
            console.log("user logged in", user);
            res.status(201).json({message:"logged in"});
        }
    })
}

const logout = (req,res)=>{
    res.cookie("token" ,"");
    res.redirect('/');
}

const allUsers = async(req,res)=>{
    let user = await users.find();
    res.json(user);
}

const deleteUser = async(req,res)=>{
    try {
        await users.findByIdAndDelete(req.params.id);
        res.cookie("token", "")
    } catch (error) {
        
    }

}

export {register, postProduct, login, logout, allUsers, deleteUser};