const pool = require("../config/db");

const getDashboardStats = async (req, res) => {
  try {
    const productResult = await pool.query(
      "SELECT COUNT(*) FROM products"
    );

    const userResult = await pool.query(
      "SELECT COUNT(*) FROM users"
    );

    const orderResult = await pool.query(
      "SELECT COUNT(*) FROM orders"
    );

    const revenueResult = await pool.query(
      "SELECT COALESCE(SUM(total_amount),0) AS revenue FROM orders"
    );

    res.json({
      success: true,
      stats: {
        totalProducts: Number(productResult.rows[0].count),
        totalUsers: Number(userResult.rows[0].count),
        totalOrders: Number(orderResult.rows[0].count),
        totalRevenue: Number(revenueResult.rows[0].revenue),
      },
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
  getDashboardStats,
};