import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import ProductDetails from "./pages/ProductDetails";
import Orders from "./pages/Orders";

import AdminDashboard from "./pages/AdminDashboard";
import AdminProducts from "./pages/AdminProducts";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import AdminOrders from "./pages/AdminOrders";

import ProtectedAdminRoute from "./components/ProtectedAdminRoute";

function App() {
  return (
    <Routes>

      {/* Customer Routes */}

      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/cart" element={<Cart />} />

      <Route path="/checkout" element={<Checkout />} />

      <Route path="/orders" element={<Orders />} />

      <Route
        path="/product/:id"
        element={<ProductDetails />}
      />

      {/* Admin Routes */}

      <Route
        path="/admin"
        element={
          <ProtectedAdminRoute>
            <AdminDashboard />
          </ProtectedAdminRoute>
        }
      />

      <Route
        path="/admin/products"
        element={
          <ProtectedAdminRoute>
            <AdminProducts />
          </ProtectedAdminRoute>
        }
      />

      <Route
        path="/admin/add-product"
        element={
          <ProtectedAdminRoute>
            <AddProduct />
          </ProtectedAdminRoute>
        }
      />

      <Route
        path="/admin/edit-product/:id"
        element={
          <ProtectedAdminRoute>
            <EditProduct />
          </ProtectedAdminRoute>
        }
      />

      <Route
        path="/admin/orders"
        element={
          <ProtectedAdminRoute>
            <AdminOrders />
          </ProtectedAdminRoute>
        }
      />

    </Routes>
  );
}

export default App;