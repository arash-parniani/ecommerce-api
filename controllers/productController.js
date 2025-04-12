const Product = require('../models/Product');

// * CreateProduct 🥷
const createProduct = async (req, res) => {
    try {
        const product = await Product.create({
            ...req.body,
            createdBy: req.user.userId
        })
        res.status(201).json(product)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
}

// * Get All Products 🥷
const getAllProduct = async (req, res) => {
    try {
        const products = await Product.find().sort({createdAt: -1})
        res.json(products)
    } catch (err) {
        res.status(500).json({ message: 'مشکلی در دریافت محصولات پیش امده' })
    }
}

// * Get One Products 🥷
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if(!product) return res.status(404).json({ message: 'محصول مورد نظر پیدا نشد' })
        res.json(product)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

// ? Update Product 🥷
const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            {$set: req.body},
            {new: true}
        )
        if(!product) return res.status(404).json({message: 'محصول مورد نظر یافت نشده است'})
        res.json(product)
        
    } catch (err) {
        res.status(500).json({message: err.message})
    }
}

// ! Delete Product 🥷
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id)
        res.status(200).json(product)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

module.exports = {
    createProduct,
    getAllProduct,
    getProductById,
    updateProduct,
    deleteProduct
}