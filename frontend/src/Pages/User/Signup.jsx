// import { useState } from "react";

// export default function Signup() {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSignup = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await fetch("http://localhost:5000/api/auth/signup", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(form),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         alert(data.message);
//         return;
//       }

//       alert("Signup successful! Please login.");
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen">
//       <form
//         onSubmit={handleSignup}
//         className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow w-96"
//       >
//         <h2 className="text-2xl font-bold mb-4">User Signup</h2>

//         <input
//           name="name"
//           placeholder="Name"
//           className="w-full p-2 mb-3 border rounded"
//           onChange={handleChange}
//         />

//         <input
//           name="email"
//           placeholder="Email"
//           className="w-full p-2 mb-3 border rounded"
//           onChange={handleChange}
//         />

//         <input
//           name="password"
//           type="password"
//           placeholder="Password"
//           className="w-full p-2 mb-3 border rounded"
//           onChange={handleChange}
//         />

//         <button className="w-full bg-indigo-600 text-white py-2 rounded">
//           Signup
//         </button>
//       </form>
//     </div>
//   );
// }

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate()


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3100/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Invalid credentials");
        return;
      }

       toast.success("Signup successful! Please login.")
      navigate("/Home")

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-600 via-purple-600 to-pink-500 px-4">
      <form
        onSubmit={handleSignup}
        className="w-full max-w-md bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8"
      >
        {/* Heading */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Create Account ✨
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Join us and manage everything smarter
        </p>

        {/* Name */}
        <input
          name="name"
          placeholder="Full Name"
          className="w-full p-3 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          onChange={handleChange}
        />

        {/* Email */}
        <input
          name="email"
          type="email"
          placeholder="Email Address"
          className="w-full p-3 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-6 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          onChange={handleChange}
        />

        <button
          type="submit"
          className="w-full py-3 rounded-lg font-semibold text-white bg-linear-to-r from-indigo-600 to-purple-600 hover:from-purple-600 hover:to-pink-500 transition duration-300 shadow-lg"
        >
          Sign Up 
          
        </button>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <span className="text-indigo-600 font-medium cursor-pointer hover:underline"onClick={() => navigate("/")}>
            Login
          </span>
        </p>
      </form>
    </div>
  );
}

