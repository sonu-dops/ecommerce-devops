import Navbar from "../components/Navbar";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();

  const {
    cart,
    removeFromCart,
    increaseQty,
    decreaseQty,
  } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      <div className="max-w-6xl mx-auto py-10 px-6">
        <h1 className="text-4xl font-bold mb-10">
          Shopping Cart
        </h1>

        {cart.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-10 text-center">
            <h2 className="text-3xl font-bold">
              Your Cart is Empty
            </h2>

            <p className="text-gray-500 mt-4">
              Add some products from the Home page.
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-6">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl shadow-lg p-5 flex justify-between items-center"
                >
                  <div className="flex gap-5 items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-28 h-28 object-cover rounded-lg"
                    />

                    <div>
                      <h2 className="text-2xl font-bold">
                        {item.name}
                      </h2>

                      <p className="text-gray-600 mt-2">
                        {item.description}
                      </p>

                      <h3 className="text-blue-700 text-xl font-bold mt-3">
                        ₹ {item.price}
                      </h3>
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="flex items-center justify-center gap-3 mb-4">

                      <button
                        onClick={() => decreaseQty(item.id)}
                        className="bg-red-500 hover:bg-red-600 text-white w-10 h-10 rounded-lg"
                      >
                        -
                      </button>

                      <span className="text-2xl font-bold">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => increaseQty(item.id)}
                        className="bg-green-600 hover:bg-green-700 text-white w-10 h-10 rounded-lg"
                      >
                        +
                      </button>

                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="bg-black hover:bg-gray-800 text-white px-5 py-2 rounded-lg"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl shadow-lg mt-10 p-8">

              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold">
                  Total
                </h2>

                <h2 className="text-3xl font-bold text-blue-700">
                  ₹ {total}
                </h2>
              </div>

              <button
                onClick={() => navigate("/checkout")}
                className="mt-8 w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-lg text-xl font-bold"
              >
                Proceed to Checkout
              </button>

            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;