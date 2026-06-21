
const express = require("express");

const router = express.Router();

const {
  placeOrder,
  getOrders,
  updateOrderStatus,
  cancelOrder,
  returnOrder,
} = require("../controllers/orderController");

const { protect } = require("../Middleware/authMiddleware");

// Place Order
router.post("/", protect, placeOrder);

// Get Orders
router.get("/", protect, getOrders);

// Update Status (Admin)
router.put("/:id", protect, updateOrderStatus);

// Cancel Order
router.put("/:id/cancel", protect, cancelOrder);

// Return Order
router.put("/:id/return", protect, returnOrder);

module.exports = router;

