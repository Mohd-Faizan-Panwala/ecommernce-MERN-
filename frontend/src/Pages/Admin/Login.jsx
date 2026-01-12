import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function AdminLogin() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3100/api/auth/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Access denied");
        return;
      }

      // 🔐 Store admin JWT
      localStorage.setItem("adminToken", data.token);

      toast.success("Welcome back, Admin.");
      navigate("/admin/dashboard");

    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-black via-gray-900 to-indigo-950 px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-gray-900/90 backdrop-blur-xl border border-gray-700 rounded-2xl shadow-2xl p-8"
      >
        {/* Crown / Authority */}
        <div className="text-center mb-6">
          <div className="text-4xl mb-2">👑</div>
          <h2 className="text-3xl font-bold text-white tracking-wide">
            Admin Access
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Restricted Control Panel
          </p>
        </div>

        {/* Email */}
        <input
          name="email"
          type="email"
          placeholder="Admin Email"
          className="w-full p-3 mb-4 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          onChange={handleChange}
        />

        {/* Password */}
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-6 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          onChange={handleChange}
        />

        {/* Button */}
        <button
          type="submit"
          className="w-full py-3 rounded-lg font-semibold text-white bg-linear-to-r from-indigo-600 to-purple-700 hover:from-purple-700 hover:to-indigo-600 transition duration-300 shadow-lg"
        >
          Enter Dashboard
        </button>

        {/* Footer */}
        <p className="text-center text-xs text-gray-500 mt-6">
          Authorized personnel only
        </p>
      </form>
    </div>
  );
}
