import { useState } from "react";
import { notification } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";

export function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, password: formData.password }),
      });
      
      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        notification.success({ message: "Success", description: data.message });
        localStorage.setItem("token", data.token);
        navigate("/profile"); // Redirect to Profile page
      } else {
        notification.error({ message: "Login Failed", description: data.error || "Invalid credentials" });
      }
    } catch (error) {
      setLoading(false);
      notification.error({ message: "Error", description: "Server error, please try again later." });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md text-blue-800">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-blue-600 mt-4">Autism Learning Tool</h1>
          <p className="mt-2 text-gray-600">Sign in to continue learning!</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="flex items-center border border-blue-400 rounded p-3">
            <FaUser className="text-blue-600 mr-3" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="bg-transparent outline-none w-full text-blue-900 placeholder-blue-500"
              required
            />
          </div>
          <div className="flex items-center border border-blue-400 rounded p-3">
            <FaLock className="text-blue-600 mr-3" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="bg-transparent outline-none w-full text-blue-900 placeholder-blue-500"
              required
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-blue-500 text-white font-bold py-2 rounded disabled:bg-blue-300" 
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
        
        <p className="text-center mt-4">
          Don’t have an account? <Link to="/signup" className="text-blue-600">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
