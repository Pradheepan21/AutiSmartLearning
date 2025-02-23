import { useState } from 'react';
import { notification } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/fa';

export function SignUp() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      notification.error({ message: 'Error', description: 'Passwords do not match!' });
      return;
    }

    setLoading(true);
    
    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        notification.success({ message: 'Success', description: 'Account created successfully!' });
        navigate('/signin'); // Redirect to login page
      } else {
        notification.error({ message: 'Signup Failed', description: data.message || 'Something went wrong!' });
      }
    } catch (error) {
      setLoading(false);
      notification.error({ message: 'Error', description: 'Server error, please try again later.' });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md text-blue-800">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-blue-600 mt-4">Autism Learning Tool</h1>
          <p className="mt-2 text-gray-600">Create an account to start learning!</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="flex items-center border border-blue-400 rounded p-3">
            <FaUser className="text-blue-600 mr-3" />
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="bg-transparent outline-none w-full text-blue-900 placeholder-blue-500"
              required
            />
          </div>
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
          <div className="flex items-center border border-blue-400 rounded p-3">
            <FaLock className="text-blue-600 mr-3" />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
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
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>
        
        <p className="text-center mt-4">
          Already have an account? <Link to="/signin" className="text-blue-600">Sign In</Link>
        </p>
      </div>
    </div>
  );
}
