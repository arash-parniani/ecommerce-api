const express = require('express');
const router = express.Router()
const { createOrder,getOrder,getOrders } = require('../controllers/orderController');
const verifyToken = require('../middlewares/verifyToken');

router.post('/',verifyToken, createOrder)
router.post('/:id', verifyToken, getOrder)
router.get('/panel',verifyToken, getOrders)

module.exports = router