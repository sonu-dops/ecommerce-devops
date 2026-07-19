import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getOrders } from "../services/orderService";

function Orders() {
  const [orders, setOrders] = useState([]);

  const loadOrders = async () => {
    try {
      const data = await getOrders();
      setOrders(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      <div className="max-w-6xl mx-auto py-10 px-6">

        <h1 className="text-4xl font-bold mb-8">
          My Orders
        </h1>

        {orders.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-10 text-center">
            <h2 className="text-2xl text-gray-500">
              No Orders Found
            </h2>
          </div>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-xl shadow-lg p-6 mb-6"
            >
              <div className="flex justify-between items-center">

                <div>

                  <h2 className="text-2xl font-bold">
                    Order #{order.id}
                  </h2>

                  <p className="text-gray-500 mt-2">
                    {new Date(order.created_at).toLocaleString()}
                  </p>

                </div>

                <div className="text-right">

                  <h3 className="text-2xl font-bold text-green-600">
                    ₹ {order.total_amount}
                  </h3>

                  <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full">
                    {order.status}
                  </span>

                </div>

              </div>

              <hr className="my-5" />

              <div className="grid md:grid-cols-2 gap-5">

                <div>
                  <h3 className="font-semibold">
                    Customer
                  </h3>

                  <p>{order.full_name}</p>
                  <p>{order.email}</p>
                  <p>{order.phone}</p>
                </div>

                <div>
                  <h3 className="font-semibold">
                    Shipping Address
                  </h3>

                  <p>{order.address}</p>
                  <p>{order.city}</p>
                  <p>{order.pincode}</p>
                </div>

              </div>

            </div>
          ))
        )}

      </div>
    </div>
  );
}

export default Orders;