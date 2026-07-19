import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Navbar() {
  const navigate = useNavigate();
  const { cart } = useCart();

  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-bold text-blue-700"
        >
          E-Commerce
        </Link>

        {/* Center Menu */}
        <div className="hidden md:flex items-center gap-8">

          <Link
            to="/"
            className="hover:text-blue-600 font-medium"
          >
            Home
          </Link>

          <a
            href="#"
            className="hover:text-blue-600 font-medium"
          >
            Categories
          </a>

          <a
            href="#"
            className="hover:text-blue-600 font-medium"
          >
            Deals
          </a>

          <a
            href="#"
            className="hover:text-blue-600 font-medium"
          >
            Contact
          </a>

        </div>

        {/* Right Section */}
        <div className="flex items-center gap-5">

          {/* Search */}
          <button className="text-2xl hover:scale-110 transition">
            🔍
          </button>

          {/* Wishlist */}
          <button className="text-2xl hover:scale-110 transition">
            ❤️
          </button>

          {/* Cart */}
          <Link
            to="/cart"
            className="relative text-2xl"
          >
            🛒

            {totalItems > 0 && (
              <span className="absolute -top-3 -right-3 bg-red-600 text-white text-xs px-2 py-1 rounded-full">
                {totalItems}
              </span>
            )}

          </Link>

          <Link to="/orders">
  Orders
</Link>

<Link to="/orders">
  Orders
</Link>

          {/* Profile */}
          <div className="w-10 h-10 rounded-full bg-blue-700 text-white flex items-center justify-center font-bold">
            S
          </div>

          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
          >
            Logout
          </button>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;