import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem("adminToken");

      const res = await fetch(
        `http://localhost:3100/api/orders/${orderId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
        return;
      }

      toast.success("Order status updated");
      fetchOrders(); // refresh list
    } catch (error) {
      console.error(error);
      toast.error("Failed to update status");
    }
  };

  const getNextStatusOptions = (currentStatus) => {
    const flow = {
      pending: ["confirmed"],
      confirmed: ["shipped"],
      shipped: ["out_for_delivery"],
      out_for_delivery: ["delivered"],
      delivered: [],
    };
    return flow[currentStatus] || [];
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-black via-gray-900 to-indigo-950">
        <p className="text-white text-xl">Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-black via-gray-900 to-indigo-950 px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">
          📦 Manage Orders
        </h1>

        {orders.length === 0 ? (
          <p className="text-gray-400">No orders received yet.</p>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-gray-900/90 border border-gray-700 rounded-2xl p-6 shadow-xl"
              >
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-white font-semibold">
                    Order #{order._id.slice(-6)}
                  </h2>
                  <span className="px-4 py-1 rounded-full text-sm font-medium bg-indigo-900 text-indigo-300">
                    {order.status}
                  </span>
                </div>

                {/* Details */}
                <p className="text-gray-400 text-sm mb-1">
                  👤 {order.user?.email}
                </p>
                <p className="text-gray-400 text-sm mb-1">
                  📍 {order.address}
                </p>
                <p className="text-white font-bold mb-4">
                  💰 ₹{order.totalAmount}
                </p>

                {/* Status Actions */}
                {getNextStatusOptions(order.status).length > 0 && (
                  <div className="flex gap-3 flex-wrap">
                    {getNextStatusOptions(order.status).map((status) => (
                      <button
                        key={status}
                        onClick={() =>
                          handleStatusChange(order._id, status)
                        }
                        className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-linear-to-r from-indigo-600 to-purple-700 hover:from-purple-700 hover:to-indigo-600 transition"
                      >
                        Mark as {status.replaceAll("_", " ")}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
