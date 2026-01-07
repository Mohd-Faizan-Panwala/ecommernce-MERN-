import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function AdminDashboard() {//admin dashboard to view total orders 
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("adminToken");

      const res = await fetch("http://localhost:3100/api/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Unauthorized");
        return;
      }

      setOrders(data.orders);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  // 📊 Calculations
  const today = new Date().toDateString();
  const currentMonth = new Date().getMonth();

  const ordersToday = orders.filter(
    (o) => new Date(o.createdAt).toDateString() === today
  );

  const ordersThisMonth = orders.filter(
    (o) => new Date(o.createdAt).getMonth() === currentMonth
  );

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    toast.success("Logged out successfully");
    navigate("/admin/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-black via-gray-900 to-indigo-950">
        <p className="text-white text-xl">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-black via-gray-900 to-indigo-950 px-6 py-10">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold text-white tracking-wide">
            📊 Admin Dashboard
          </h1>

          <button
            onClick={handleLogout}
            className="px-5 py-2 rounded-lg bg-red-600/80 text-white hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          <div className="bg-gray-900/90 border border-gray-700 rounded-2xl p-6 shadow-xl">
            <h2 className="text-gray-400 text-sm uppercase mb-2">
              Total Orders
            </h2>
            <p className="text-4xl font-bold text-white">
              {orders.length}
            </p>
          </div>

          <div className="bg-gray-900/90 border border-gray-700 rounded-2xl p-6 shadow-xl">
            <h2 className="text-gray-400 text-sm uppercase mb-2">
              Orders Today
            </h2>
            <p className="text-4xl font-bold text-indigo-400">
              {ordersToday.length}
            </p>
          </div>

          <div className="bg-gray-900/90 border border-gray-700 rounded-2xl p-6 shadow-xl">
            <h2 className="text-gray-400 text-sm uppercase mb-2">
              Orders This Month
            </h2>
            <p className="text-4xl font-bold text-purple-400">
              {ordersThisMonth.length}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          
          <button
            onClick={() => navigate("/admin/orders")}
            className="py-4 rounded-xl text-lg font-semibold text-white bg-linear-to-r from-indigo-600 to-purple-700 hover:from-purple-700 hover:to-indigo-600 transition shadow-xl"
          >
            📦 Manage Orders
          </button>

          <button
            onClick={() => navigate("/admin/products")}
            className="py-4 rounded-xl text-lg font-semibold text-white bg-linear-to-r from-emerald-600 to-teal-700 hover:from-teal-700 hover:to-emerald-600 transition shadow-xl"
          >
            🛍️ Manage Products
          </button>
        </div>

        {/* Authority Footer */}
        <div className="bg-gray-900/80 border border-gray-700 rounded-2xl p-8 shadow-2xl text-center">
          <h2 className="text-2xl font-bold text-white mb-2">
            👑 Control. Monitor. Deliver.
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            You are in charge of operations. Every order, every product — under your control.
          </p>
        </div>
      </div>
    </div>
  );
}
