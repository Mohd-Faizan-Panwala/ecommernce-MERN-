import { useEffect, useState } from "react";
import {useNavigate}  from "react-router-dom";
import toast from "react-hot-toast";

export default function UserProducts() {
   const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchProducts();
  }, []);
  
  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:3100/api/products");
      const data = await res.json();
      
      
      if (!res.ok) {
        toast.error("Failed to load products");
        return;
      }
      
      setProducts(data);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-600 via-purple-600 to-pink-500">
        <p className="text-white text-xl">Loading products...</p>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-600 via-purple-600 to-pink-500 px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">
          🛍️ Explore Products
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (           
            <div
            key={product._id}
            className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-5 hover:scale-[1.03] transition"
            >
              <img
                src={`http://localhost:3100/uploads/${product.image}`}
                alt={product.name}
                className="h-40 w-full object-cover rounded-xl mb-4"
                />

              <h2 className="text-lg font-semibold text-gray-800">
                {product.name}
              </h2>

              <p className="text-gray-600 text-sm mb-2">
                {product.description}
              </p>

              <p className="text-xl font-bold text-indigo-600 mb-4">
                ₹{product.price}
              </p>

              <button
                disabled={product.isOutOfStock}
                  onClick={() => navigate("/orders", { state: { product } })}
                  className="w-full py-2 rounded-lg text-white font-semibold bg-linear-to-r from-indigo-600 to-purple-600 hover:from-purple-600 hover:to-pink-500 transition"
                  >
                      {product.isOutOfStock ? "Out of Stock" : "Order Now"}

                {/* const navigate = useNavigate(); */}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
