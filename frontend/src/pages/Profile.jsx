import { useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { useNavigate } from 'react-router-dom';

export function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({ name: '', age: '', contact: '', email: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-blue-100 min-h-screen flex flex-col items-center p-8">
    
      
      <div className="bg-blue-200 p-6 rounded-lg shadow-md w-3/4 text-center">
        <div className="flex justify-center">
          <img src="/images/profile-placeholder.png" alt="Profile" className="w-32 h-32 rounded-full border-4 border-white" />
        </div>
        
        <div className="bg-white p-6 mt-6 rounded-lg shadow-md text-left">
          <p className="text-lg font-semibold text-gray-700">Name: <span className="ml-2 font-normal">{user.name}</span></p>
          <p className="text-lg font-semibold text-gray-700">Age: <span className="ml-2 font-normal">{user.age}</span></p>
          <p className="text-lg font-semibold text-gray-700">Contact: <span className="ml-2 font-normal">{user.contact}</span></p>
          <p className="text-lg font-semibold text-gray-700">Email: <span className="ml-2 font-normal">{user.email}</span></p>
        </div>
        
        <div className="flex justify-center space-x-4 mt-6">
          <button onClick={() => setIsEditing(true)} className="px-6 py-2 bg-blue-500 text-white rounded-lg">Edit</button>
          <button onClick={() => navigate('/progress')} className="px-6 py-2 bg-gray-500 text-white rounded-lg">Progress</button>
        </div>
      </div>
      
    </div>
  );
}
