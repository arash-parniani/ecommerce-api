const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    image: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    count: {
        type: Number,
        default: 0
    },
    category: {
        type: String
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true })

module.exports = mongoose.model('Product', productSchema)