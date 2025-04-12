const express = require('express');
const cors = require('cors');
require('dotenv').config();


const app = express()
app.use(cors())
app.use(express.json())

// ? Auth Router
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes)

// ? Product Router
const productRouter = require('./routes/product');
app.use('/api/products', productRouter)

// ? Cart Router 
const cartRouter = require('./routes/cart');
app.use('/api/cart', cartRouter)

// ? Order Router
const OredrRouter = require('./routes/order');
app.use('/api/order', OredrRouter)

module.exports = app