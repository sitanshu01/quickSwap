import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
    name : String,
    category : String,
    price : Number,
    user: {
        type: mongoose.Schema.Types.ObjectId, ref : "user"
    },
}, {timestamps : true})

export default mongoose.model("products", productSchema);