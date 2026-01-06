import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()

  useEffect(() => {
    fetchMyOrders();
  }, []);

  const fetchMyOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Please login again");
        return;
      }

      const res = await fetch("http://localhost:3100/api/orders/userorders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
        return;
      }

      setOrders(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-600 via-purple-600 to-pink-500">
        <p className="text-white text-xl">Loading your orders...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-600 via-purple-600 to-pink-500 px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">
          📦 My Orders
        </h1>
         <button
          onClick={()=> navigate("/products")}
          className="px-5 py-2 mr-96 rounded-lg bg-white/20 text-white backdrop-blur-md hover:bg-white/30 transition"
        >
          View Products
        </button>
        <button
          onClick={()=> navigate("/home")}
          className="px-5 ml-[300px] h-10 rounded-lg bg-white/20 text-white backdrop-blur-md hover:bg-white/30 transition"
        > Home
        </button >
         

        {orders.length === 0 ? (
          <p className="text-gray-200/80 text-6xl pt-28 flex justify-center select-none">
            You haven't placed any orders yet.
          </p>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-6"
              >
                {/* Order Header */}
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-semibold text-gray-800">
                    Order #{order._id.slice(-6)}
                  </h2>

                  <span className="px-4 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-600">
                    {order.status}
                  </span>
                </div>

                {/* Order Details */}
                <p className="text-gray-600 mb-2">
                  📍 <strong>Address:</strong> {order.address}
                </p>

                <p className="text-gray-600 mb-2">
                  📞 <strong>Mobile:</strong> {order.mobile}
                </p>

                <p className="text-gray-800 font-bold text-lg">
                  💰 Total: ₹{order.totalAmount}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
