
const Order = require("../models/Order");

// Place Order
const placeOrder = async (req, res) => {
  try {
    const {
      products,
      totalPrice,
      shippingAddress,
    } = req.body;

    const order = await Order.create({
      user: req.user._id,
      products,
      totalPrice,
      shippingAddress,
    });

    res.status(201).json(order);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// Get Orders
const getOrders = async (req, res) => {
  try {

    const orders = await Order.find({
      user: req.user._id,
    })
      .populate("user", "name email")
      .populate("products.product");

    res.status(200).json(orders);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// Update Status
const updateOrderStatus = async (req, res) => {
  try {

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    order.status = req.body.status || order.status;

    const updatedOrder = await order.save();

    res.status(200).json(updatedOrder);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// Cancel Order
const cancelOrder = async (req, res) => {
  try {

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    order.status = "Cancelled";
    order.isCancelled = true;

    await order.save();

    res.json(order);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// Return Order
const returnOrder = async (req, res) => {
  try {

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    order.status = "Returned";
    order.isReturned = true;

    await order.save();

    res.json(order);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

module.exports = {
  placeOrder,
  getOrders,
  updateOrderStatus,
  cancelOrder,
  returnOrder,
};

