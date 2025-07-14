import users from '../models/users.js';
import products from '../models/products.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const register = async(req,res)=>{
    let {name, username, email, password} = req.body;
    const emailPattern = /^\d{2}[a-z]{3}\d{3}@nith\.ac\.in$/;
    if(!emailPattern.test(email)){
        res.status(400).json({message: "Invalid email type."})
        return;
    }
    let user = await  users.findOne({email});
    if(user) {
        console.log("user already exists");
        res.status(500).json({message: "user already exists"});
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

const addProduct = async(req,res)=>{
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
    res.status(201).json({message : "product saved successfully", newProduct})
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

const allProduct = async(req,res)=>{
    let product = await products.find();
    res.json(product);
}

const userProfile = async (req,res)=>{
    let user = req.user;
    // if(user) console.log("found user ", user);
    try{
        let userProfile = await users.findById(user._id).populate('products');
        // console.log("new request by:", userProfile);
        res.status(201).json(userProfile);
    } catch(err){
        console.error(err);
        res.status(500).json({message : "some error occured", errorMsg : err.message});
    }
}


const deleteUser = async(req,res)=>{
    try {
        await users.findByIdAndDelete(req.params.id);
        res.cookie("token", "");
        res.status(201).json({message: "user deleted successfully"});
    } catch (error) {
        console.error(err);
        res.status(500).json({message : "some error occured", errorMsg : err.message});
    }

}

const item = async(req,res)=>{
    const id = req.params.id;
    try {
        const product = await products.findById(id).populate('user');
        res.status(201).json(product);
    } catch (err) {
        console.error(err);
        res.status(500).json({message : "item not found", errorMsg : err.message});
    }
}

const addWishlist = async(req,res)=>{
    const user = req.user;
    const productId = req.params.id;
    try {
        if(user.products.includes(productId)){
            return res.status(400).json({message: "Users can't add their own products"});
        }else if(user.wishlist.includes(productId)){
            return res.status(401).json({message: "Product already in the wishlist"})
        }
        user.wishlist.push(productId);
        await user.save();
        res.status(201).json({message: "added successfully"});
    } catch (error) {
        res.status(501).json({message: error.message})
        console.log(error);
    }
}

const wishlist = async(req,res)=>{
    const user = req.user;
    try {
        const wishlist = await users.findById(user._id).populate('wishlist');
        res.status(201).json(wishlist);
    } catch (error) {
        res.status(500).json({message: "wishlist already added"});
        console.error(error)
    }
}

const deleteWishlist = async(req,res)=>{
    const user = req.user;
    const productId = req.params.id;
    try {
       await users.updateOne(
        { _id: user._id },
        { $pull: { wishlist: productId } }
    );
        res.status(200).json({message : "Removed Successfully"});
    } catch (error) {
        res.status(500).json({message:"something went wrong"});
    }
}

const deleteProduct = async(req,res)=>{
    const user = req.user;
    const productId = req.params.id;
    try {
        await users.updateOne(
            {id: user._id},
            {$pull : {products: productId}},
        )
        res.status(200).json({message: "Deleted Successfully!"});
    } catch (error) {
        console.log(error);
    }
}

export {register, addProduct, login, logout, allProduct, deleteUser,userProfile,item, addWishlist, wishlist, deleteWishlist, deleteProduct};