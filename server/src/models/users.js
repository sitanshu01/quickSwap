import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name : String,
    username: String,
    email : {
        type: String,
        unique : true,
        match:[
            /^\d{2}[a-z]{3}\d{3}@nith\.ac\.in$/,
            "Only NITH mails are valid.."
        ]
    },
    password : String,
    products : [
        {type: mongoose.Schema.Types.ObjectId, ref : "products"}
    ],
    wishlist : [
        {type: mongoose.Schema.Types.ObjectId , ref : "products"}
    ]
}, {timestamps : true})

export default mongoose.model("user", userSchema);