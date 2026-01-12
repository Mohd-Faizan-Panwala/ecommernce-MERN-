import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";

export default function PlaceOrder() {
  const { state } = useLocation(); // product data
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");

  const product = state?.product;

  if (!product) {
    return <p className="text-center mt-10">No product selected</p>;
  }

  const handlePlaceOrder = async () => {
    if (!address || !mobile) {
      toast.error("Please fill all details");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:3100/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          address,
          mobile,
          items: [
            {
              product: product._id,
              quantity,
            },
          ],
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
        return;
      }

      toast.success("Order placed successfully 🚀");
      navigate("/myorders");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-600 via-purple-600 to-pink-500 px-6 py-10 flex justify-center items-center">
      <div className="max-w-md w-full bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          🛒 Place Order
        </h2>

        <img
          src={`http://localhost:3100/uploads/${product.image}`}
          alt={product.name}
          className="h-40 w-full object-cover rounded-xl mb-4"
        />

        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-indigo-600 font-bold mb-4">
          ₹{product.price}
        </p>

        {/* Quantity */}
        <label className="block mb-2 font-medium">Quantity</label>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="w-full p-2 mb-4 border rounded"
        />

        {/* Address */}
        <label className="block mb-2 font-medium">Delivery Address</label>
        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />

        {/* Mobile */}
        <label className="block mb-2 font-medium">Mobile Number</label>
        <input
          type="text"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          className="w-full p-2 mb-6 border rounded"
        />

        <button
          onClick={handlePlaceOrder}
          className="w-full py-3 rounded-lg font-semibold text-white bg-linear-to-r from-indigo-600 to-purple-600 hover:from-purple-600 hover:to-pink-500 transition"
        >
          Confirm Order 🚀
        </button>
      </div>
    </div>
  );
}
