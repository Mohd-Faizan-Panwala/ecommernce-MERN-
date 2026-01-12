import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-600 via-purple-600 to-pink-500 px-6 py-10">
      
      {/* Header */}
      <div className="max-w-6xl mx-auto flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold text-white">
          👋 Welcome to Your Dashboard
        </h1>

        <button
          onClick={handleLogout}
          className="px-5 py-2 rounded-lg bg-white/20 text-white backdrop-blur-md hover:bg-white/30 transition"
        >
          Logout
        </button>
      </div>

      {/* Main Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Profile Card */}
        <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-6 hover:scale-[1.02] transition">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            👤 My Account
          </h2>
          <p className="text-gray-600 text-sm mb-4">
            View and manage your account details
          </p>
          <button
            onClick={() => toast("Profile page coming soon 🚀")}
            className="text-indigo-600 font-medium hover:underline"
          >
            View Profile →
          </button>
        </div>

        {/* Orders Card */}
        <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-6 hover:scale-[1.02] transition">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            📦 My Orders
          </h2>
          <p className="text-gray-600 text-sm mb-4">
            Track your orders and delivery status
          </p>
          <button
            onClick={() => navigate("/myorders")}
            className="text-indigo-600 font-medium hover:underline"
          >
            View Orders →
          </button>
        </div>

        {/* Shop Card */}
        <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-6 hover:scale-[1.02] transition">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            🛒 Shop Products
          </h2>
          <p className="text-gray-600 text-sm mb-4">
            Explore products added by admin
          </p>
          <button
            onClick={() => navigate("/products")}
            className="text-indigo-600 font-medium hover:underline"
          >
            Go to Shop →
          </button>
        </div>
      </div>

      {/* Attention Grabbing Section */}
      <div className="max-w-6xl mx-auto mt-16 bg-white/20 backdrop-blur-lg rounded-2xl p-8 text-center shadow-2xl">
        <h2 className="text-3xl font-bold text-white mb-3">
          ✨ Smart Shopping Starts Here
        </h2>
        <p className="text-white/80 max-w-2xl mx-auto mb-6">
          Seamless ordering, real-time tracking, and a secure experience — 
          everything designed just for you.
        </p>
        <button
          onClick={() => navigate("/products")}
          className="px-8 py-3 rounded-xl font-semibold text-white bg-linear-to-r from-indigo-600 to-purple-600 hover:from-purple-600 hover:to-pink-500 transition duration-300 shadow-xl"
        >
          Start Shopping 🚀
        </button>
      </div>
    </div>
  );
}
