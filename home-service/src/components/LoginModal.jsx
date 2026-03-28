import React, { useState } from 'react';
import { X } from 'lucide-react';

const LoginModal = ({ onClose, onLogin, setShowSignup }) => {
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
    type: 'consumer'
  });

  const handleSubmit = () => {
    if (!loginForm.email || !loginForm.password) {
      alert('Please fill in all fields');
      return;
    }
    onLogin(loginForm.type);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
            Login
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={28} />
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Account Type</label>
            <select
              value={loginForm.type}
              onChange={(e) => setLoginForm({...loginForm, type: e.target.value})}
              className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500"
            >
              <option value="consumer">Customer</option>
              <option value="provider">Service Provider</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Email</label>
            <input
              type="email"
              value={loginForm.email}
              onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
              className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Password</label>
            <input
              type="password"
              value={loginForm.password}
              onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
              className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500"
              placeholder="••••••••"
            />
          </div>
          <button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-xl hover:from-blue-600 hover:to-purple-700 transition font-bold text-lg shadow-lg"
          >
            Login
          </button>
          <p className="text-center text-gray-600">
            Don't have an account?{' '}
            <button 
              onClick={() => { onClose(); setShowSignup(true); }} 
              className="text-blue-600 font-semibold hover:underline"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;