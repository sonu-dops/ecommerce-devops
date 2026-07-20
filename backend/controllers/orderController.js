const pool = require("../config/db");

// ===========================
// Create Order
// ===========================
const createOrder = async (req, res) => {
  const client = await pool.connect();

  try {
    const {
      full_name,
      email,
      phone,
      address,
      city,
      pincode,
      payment_method,
      total_amount,
      items,
    } = req.body;

    await client.query("BEGIN");

    const orderResult = await client.query(
      `INSERT INTO orders
      (
        full_name,
        email,
        phone,
        address,
        city,
        pincode,
        payment_method,
        total_amount
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
      RETURNING id`,
      [
        full_name,
        email,
        phone,
        address,
        city,
        pincode,
        payment_method,
        total_amount,
      ]
    );

    const orderId = orderResult.rows[0].id;

    for (const item of items) {
      await client.query(
        `INSERT INTO order_items
        (
          order_id,
          product_id,
          quantity,
          price
        )
        VALUES ($1,$2,$3,$4)`,
        [
          orderId,
          item.id,
          item.quantity,
          item.price,
        ]
      );
    }

    await client.query("COMMIT");

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      orderId,
    });

  } catch (err) {

    await client.query("ROLLBACK");

    console.error(err);

    res.status(500).json({
      success: false,
      message: "Failed to place order",
    });

  } finally {
    client.release();
  }
};

// ===========================
// Get All Orders
// ===========================
const getOrders = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM orders ORDER BY created_at DESC"
    );

    res.json({
      success: true,
      orders: result.rows,
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};

// ===============================
// Get All Orders
// ===============================
const getAllOrders = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT *
       FROM orders
       ORDER BY created_at DESC`
    );

    res.json({
      success: true,
      orders: result.rows,
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};

// ===============================
// Update Order Status
// ===============================
const updateOrderStatus = async (req, res) => {

  try {

    const { id } = req.params;

    const { status } = req.body;

    const result = await pool.query(
      `UPDATE orders
       SET status=$1
       WHERE id=$2
       RETURNING *`,
      [status, id]
    );

    res.json({
      success: true,
      order: result.rows[0],
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }

};

module.exports = {
  createOrder,
  getOrders,
  getAllOrders,
  updateOrderStatus,
};