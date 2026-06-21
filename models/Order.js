const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
{
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },

      quantity: {
        type: Number,
        required: true,
      },
    },
  ],

  totalPrice: {
    type: Number,
    required: true,
  },

  status: {
    type: String,
    default: "Pending",
    enum: [
      "Pending",
      "Packed",
      "Shipped",
      "Out for Delivery",
      "Delivered",
      "Cancelled",
      "Returned",
    ],
  },

  trackingId: {
    type: String,
    default: () =>
      "TRK" + Math.floor(100000 + Math.random() * 900000),
  },

  estimatedDelivery: {
    type: Date,
    default: () => {
      const date = new Date();
      date.setDate(date.getDate() + 5);
      return date;
    },
  },

  shippingAddress: {
    address: {
      type: String,
      default: "",
    },

    city: {
      type: String,
      default: "",
    },

    postalCode: {
      type: String,
      default: "",
    },

    country: {
      type: String,
      default: "",
    },
  },

  isCancelled: {
    type: Boolean,
    default: false,
  },

  isReturned: {
    type: Boolean,
    default: false,
  },
},
{
  timestamps: true,
}
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;