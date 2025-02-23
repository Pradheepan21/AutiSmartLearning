import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { useState } from 'react';
import { notification } from 'antd';

export function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    notification.success({ message: 'Success', description: 'Your message has been sent!' });
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="bg-blue-100 min-h-screen flex flex-col">
    
      <div className="flex-grow flex flex-col items-center justify-center text-center">
        <h1 className="text-3xl font-bold text-blue-700">Contact Us</h1>
        <p className="text-blue-600 mb-6">We'd love to hear from you!</p>
        <div className="bg-white p-8 rounded-lg shadow-lg w-1/2">
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="text-left">
              <label className="text-gray-700 font-semibold">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border rounded-md bg-gray-100"
                required
              />
            </div>
            <div className="text-left">
              <label className="text-gray-700 font-semibold">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded-md bg-gray-100"
                required
              />
            </div>
            <div className="text-left">
              <label className="text-gray-700 font-semibold">Message</label>
              <textarea
                name="message"
                placeholder="Enter your message"
                value={formData.message}
                onChange={handleChange}
                className="w-full p-2 border rounded-md bg-gray-100 h-32"
                required
              ></textarea>
            </div>
            <button type="submit" className="bg-blue-400 text-white px-6 py-2 rounded-md w-full">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

