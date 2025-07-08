import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name : String,
    username: String,
    email : {
        type: String,
        unique : true,
    },
    password : String,
    products : [
        {type: mongoose.Schema.Types.ObjectId, ref : "products"}
    ]
}, {timestamps : true})

export default mongoose.model("user", userSchema);