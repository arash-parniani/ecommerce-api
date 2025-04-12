const { get } = require("mongoose");
const Cart = require("../models/Cart");

const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.userId;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        products: [{ productId, quantity }],
      });
    } else {
      const existing = cart.products.find(
        (p) => p.productId.toString() === productId
      );
      if (existing) {
        existing.quantity += quantity;
      } else {
        cart.products.push({ productId, quantity });
      }
    }
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    const cart = await Cart.find({ userId }).populate("products.productId");

    if (!cart) return res.status(404).json({ message: "سبد یافت نشد" });

    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { productId, quantity } = req.body;

    let cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "پیدا نشده" });

    const item = cart.products.find(
      (p) => p.productId.toString() === productId
    );
    if (!cart) return res.status(404).json({ message: "ایتم یافت نشده" });

    item.quantity = quantity;
    await cart.save();

    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    const {productId} = req.body

    let cart =  await Cart.findOne({ userId })
    if(!cart) return res.status(404).json({ message: 'پیدا نشده است' }) 
    
    cart.products = cart.products.filter(p => p.productId.toString() !== productId)
    if(!cart.products.length) return res.json({ message: 'سبد خرید خالی است' })

    cart.save()
    res.json(cart)

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  addToCart,
  getCart,
  updateCart,
  deleteCart
};
