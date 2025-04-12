const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", require: true },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: { type: Number, default: 1, required: true },
      price: { type: Number, required: true },
    },
  ],
  status: { type: String, default: 'Pending' },
  totalAmount: { type: Number, default: 1, required: true },
  paymentStatus: { type: String, default: 'Unpaid' },
  address: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema)