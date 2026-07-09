const pool = require("../config/db");

const createProduct = async (req, res) => {
  try {
    const { name, description, price, image, stock } = req.body;

    const result = await pool.query(
      `INSERT INTO products
      (name, description, price, image, stock)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *`,
      [name, description, price, image, stock]
    );

    res.status(201).json({
      success: true,
      product: result.rows[0],
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getProducts = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM products ORDER BY id DESC"
    );

    res.json({
      success: true,
      products: result.rows,
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
  createProduct,
  getProducts,
};