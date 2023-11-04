const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: { type: String },
    description: { type: String },
    brand: { type: String },
    category: { type: String },
    gender: { type: String },
    weight: { type: String },
    quantity: { type: Number },
    image: { type: String },
    rating: { type: Number },
    price: { type: Number },
    newPrice: { type: Number },
    trending: {
        type: Boolean,
        default: true
    }
},{timestamps : true})

module.exports = mongoose.model('product' , productSchema)