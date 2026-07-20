import { useEffect, useState } from "react";
import {
  getAllOrders,
  updateOrderStatus,
} from "../services/orderService";

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  const loadOrders = async () => {
    try {
      const data = await getAllOrders();
      setOrders(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const changeStatus = async (id, status) => {
    try {
      await updateOrderStatus(id, status);
      alert("✅ Order Status Updated");
      loadOrders();
    } catch (err) {
      console.log(err);
      alert("Failed to Update Status");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">

      <div className="bg-slate-900 text-white p-5">
        <h1 className="text-3xl font-bold">
          Admin Order Management
        </h1>
      </div>

      <div className="max-w-7xl mx-auto py-10">

        {orders.map((order) => (

          <div
            key={order.id}
            className="bg-white rounded-xl shadow-lg p-6 mb-6"
          >

            <div className="grid md:grid-cols-5 gap-5 items-center">

              <div>
                <h2 className="font-bold">
                  Order #{order.id}
                </h2>

                <p>{order.full_name}</p>
                <p>{order.email}</p>
              </div>

              <div>
                <p>
                  ₹ {order.total_amount}
                </p>
              </div>

              <div>
                {new Date(order.created_at).toLocaleDateString()}
              </div>

              <div>

               <select
  value={order.status}
  onChange={async (e) => {
    try {
      await updateOrderStatus(
        order.id,
        e.target.value
      );

      loadOrders();

      alert("Status Updated");

    } catch (err) {
      console.log(err);
    }
  }}
  className="border rounded-lg p-2"
>
  <option value="Pending">Pending</option>
  <option value="Packed">Packed</option>
  <option value="Shipped">Shipped</option>
  <option value="Delivered">Delivered</option>
</select>

              </div>

              <div>
                <span className="font-semibold">
                  {order.status}
                </span>
              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default AdminOrders;