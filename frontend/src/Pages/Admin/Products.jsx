import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function AdminProducts() {//for admin side to add products so users can place orders
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    image: null,
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:3100/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("adminToken");
    const formData = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      const res = await fetch("http://localhost:3100/api/products", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
        return;
      }

      toast.success("Product added");
      setForm({ name: "", description: "", price: "", image: null });
      fetchProducts();
    } catch {
      toast.error("Failed to add product");
    }
  };

  const deleteProduct = async (id) => {
    const token = localStorage.getItem("adminToken");

    try {
      await fetch(`http://localhost:3100/api/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Product deleted");
      fetchProducts();
    } catch {
      toast.error("Delete failed");
    }
  };

  const toggleStock = async (id) => {
    const token = localStorage.getItem("adminToken");

    try {
      const res = await fetch(
        `http://localhost:3100/api/products/${id}/stock`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      toast.success(data.message);
      fetchProducts();
    } catch {
      toast.error("Failed to update stock");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-black via-gray-900 to-indigo-950">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-black via-gray-900 to-indigo-950 px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">
          🛍️ Manage Products
        </h1>

        {/* Add Product */}
        <form
          onSubmit={handleAddProduct}
          className="bg-gray-900/90 border border-gray-700 rounded-2xl p-6 mb-10"
        >
          <h2 className="text-white font-semibold mb-4">Add New Product</h2>

          <input
            placeholder="Name"
            className="w-full p-2 mb-3 bg-gray-800 text-white rounded"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            placeholder="Description"
            className="w-full p-2 mb-3 bg-gray-800 text-white rounded"
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          <input
            placeholder="Price"
            type="number"
            className="w-full p-2 mb-3 bg-gray-800 text-white rounded"
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />

          <input
            type="file"
            className="w-full p-2 mb-4 bg-gray-800 text-white rounded"
            onChange={(e) =>
              setForm({ ...form, image: e.target.files[0] })
            }
          />

          <button className="w-full py-2 rounded-lg bg-indigo-600 text-white">
            Add Product
          </button>
        </form>

        {/* Products List */}
        <div className="grid md:grid-cols-2 gap-6">
          {products.map((p) => (
            <div
              key={p._id}
              className="bg-gray-900/90 border border-gray-700 rounded-2xl p-5"
            >
              <h2 className="text-white font-semibold">{p.name}</h2>
              <p className="text-gray-400 text-sm">{p.description}</p>
              <p className="text-indigo-400 font-bold">₹{p.price}</p>

              <div className="flex gap-3 mt-4 flex-wrap">
                <button
                  onClick={() => toggleStock(p._id)}
                  className={`px-4 py-2 rounded text-white cursor-pointer transition
                     ${p.isOutOfStock ? "bg-green-600 hover:bg-green-700" : "bg-yellow-600 hover:bg-yellow-700"}`}>
                  {p.isOutOfStock ? "Mark as In Stock" : "Mark as Out of Stock"}
                </button>


                <button
                  onClick={() => deleteProduct(p._id)}
                  className="px-4 py-2 rounded bg-red-600 text-white cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
