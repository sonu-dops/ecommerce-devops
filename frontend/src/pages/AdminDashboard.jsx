import { useEffect, useState } from "react";
import { getDashboardStats } from "../services/analyticsService";

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await getDashboardStats();
      setStats(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">

      <div className="bg-slate-900 text-white p-5">
        <h1 className="text-3xl font-bold">
          Admin Dashboard
        </h1>
      </div>

      <div className="max-w-7xl mx-auto py-10 grid md:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-xl font-bold">Products</h2>
          <p className="text-4xl mt-4 text-blue-600">
            {stats.totalProducts}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-xl font-bold">Users</h2>
          <p className="text-4xl mt-4 text-green-600">
            {stats.totalUsers}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-xl font-bold">Orders</h2>
          <p className="text-4xl mt-4 text-purple-600">
            {stats.totalOrders}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-xl font-bold">Revenue</h2>
          <p className="text-3xl mt-4 text-red-600">
            ₹ {stats.totalRevenue}
          </p>
        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;