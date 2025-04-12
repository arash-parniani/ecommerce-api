const express = require('express');
const router = express.Router();

const { createProduct, getAllProduct, getProductById, updateProduct, deleteProduct } = require('../controllers/productController');
const verifyToken = require('../middlewares/verifyToken');


router.get('/', getAllProduct)
router.get('/:id', getProductById)
router.post('/', verifyToken,  createProduct)
router.put('/:id', verifyToken,  updateProduct)
router.delete('/:id',   deleteProduct)


module.exports = router