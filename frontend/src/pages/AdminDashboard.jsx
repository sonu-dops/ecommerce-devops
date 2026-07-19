function AdminDashboard() {
  return (
    <div className="min-h-screen bg-slate-100">

      <div className="bg-slate-900 text-white p-5 text-3xl font-bold">
        Admin Dashboard
      </div>

      <div className="max-w-7xl mx-auto py-10 grid md:grid-cols-4 gap-6">

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-xl font-bold">Products</h2>
          <p className="text-4xl mt-4">0</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-xl font-bold">Orders</h2>
          <p className="text-4xl mt-4">0</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-xl font-bold">Users</h2>
          <p className="text-4xl mt-4">0</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-xl font-bold">Revenue</h2>
          <p className="text-4xl mt-4">₹0</p>
        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;