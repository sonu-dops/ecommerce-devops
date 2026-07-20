const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

// Database
const pool = require("./config/db");

// Routes
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const profileRoutes = require("./routes/profileRoutes");
const orderRoutes = require("./routes/orderRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

// ========================================
// Middlewares
// ========================================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("dev"));

// ========================================
// Database Connection
// ========================================
if (process.env.NODE_ENV !== "test") {
  (async () => {
    try {
      const client = await pool.connect();
      console.log("✅ PostgreSQL Connected Successfully");
      client.release();
    } catch (err) {
      console.error("❌ Database Connection Failed");
      console.error(err.message);
    }
  })();
}

// ========================================
// Health Check
// ========================================
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🚀 DevOps E-Commerce Backend Running",
  });
});

// ========================================
// API Routes
// ========================================
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/upload", uploadRoutes);

// ========================================
// 404 Handler
// ========================================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

// ========================================
// Global Error Handler
// ========================================
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// ========================================
// Start Server
// ========================================
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;