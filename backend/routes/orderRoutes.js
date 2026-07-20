const express = require("express");

const router = express.Router();

const {
  createOrder,
  getOrders,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/orderController");

// ===============================
// Customer Routes
// ===============================

// Place a new order
router.post("/", createOrder);

// Get customer orders
router.get("/", getOrders);

// ===============================
// Admin Routes
// ===============================

// Get all orders
router.get("/admin", getAllOrders);

// Update order status
router.patch("/:id/status", updateOrderStatus);

// ===============================
// Export Router
// ===============================
module.exports = router;