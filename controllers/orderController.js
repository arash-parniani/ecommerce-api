const Order = require('../models/Order');


const createOrder = async (req, res) => {
    try {
        const { products, address } = req.body

        let totalAmount = 0
        for(let product of products) {
            totalAmount += product.price * product.quantity
        }
        
        const newOrder = Order({
            userId: req.user.userId,
            products,
            totalAmount,
            address
        })
        await newOrder.save()
        res.status(201).json({ messgae: 'با موفقیت سفارش ساخته شد' })
    } catch (err) {
        res.status(500).json({message: err.message})
    }
}

const getOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
        if(!order) return res.status(404).json({ message: 'سفارشی که دنبالش میگردی وجود نداره' })

        res.json(order)
        
    } catch(err) {
        res.status(500).json({ message: err.message })
    }
}

const getOrders = async (req, res) => {
    try {
        const orders = await Order.find()
        if(!orders) return res.status(404).json({ message: 'سفارشی وجود نداره' })
        
        res.json(orders)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}



module.exports = {
    createOrder,
    getOrder,
    getOrders,

}