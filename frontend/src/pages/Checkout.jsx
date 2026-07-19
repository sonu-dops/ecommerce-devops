import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useCart } from "../context/CartContext";
import { placeOrder } from "../services/orderService";

function Checkout() {
  const navigate = useNavigate();

  const { cart, clearCart } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    payment: "COD",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handlePlaceOrder = async () => {
    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    try {
      await placeOrder({
        full_name: form.fullName,
        email: form.email,
        phone: form.phone,
        address: form.address,
        city: form.city,
        pincode: form.pincode,
        payment_method: form.payment,
        total_amount: total,
        items: cart,
      });

      alert("✅ Order placed successfully!");

      clearCart();

      navigate("/");

    } catch (err) {
      console.error(err);
      alert("❌ Failed to place order");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">

      <Navbar />

      <div className="max-w-6xl mx-auto py-10 px-6 grid md:grid-cols-2 gap-10">

        <div className="bg-white rounded-xl shadow-lg p-8">

          <h2 className="text-3xl font-bold mb-6">
            Shipping Details
          </h2>

          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={form.fullName}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mb-4"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mb-4"
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mb-4"
          />

          <textarea
            name="address"
            placeholder="Shipping Address"
            value={form.address}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mb-4"
          />

          <input
            type="text"
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mb-4"
          />

          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            value={form.pincode}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mb-4"
          />

          <select
            name="payment"
            value={form.payment}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          >
            <option value="COD">Cash on Delivery</option>
            <option value="Card">Credit / Debit Card</option>
          </select>

        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">

          <h2 className="text-3xl font-bold mb-6">
            Order Summary
          </h2>

          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between border-b py-3"
            >
              <div>

                <h3 className="font-semibold">
                  {item.name}
                </h3>

                <p className="text-gray-500">
                  Qty : {item.quantity}
                </p>

              </div>

              <h3 className="font-bold">
                ₹ {item.price * item.quantity}
              </h3>

            </div>
          ))}

          <div className="flex justify-between mt-8 text-2xl font-bold">

            <span>Total</span>

            <span>₹ {total}</span>

          </div>

          <button
            onClick={handlePlaceOrder}
            className="mt-8 w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-lg text-xl"
          >
            Place Order
          </button>

        </div>

      </div>

    </div>
  );
}

export default Checkout;