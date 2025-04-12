const express = require('express');
const router = express.Router();

const { addToCart, getCart, updateCart, deleteCart } = require('../controllers/cartController');
const verifyToken = require('../middlewares/verifyToken');


router.post('/', verifyToken, addToCart)
router.get('/', verifyToken, getCart)
router.put('/', verifyToken, updateCart)
router.delete('/:deleteId', verifyToken, deleteCart)



module.exports = router
