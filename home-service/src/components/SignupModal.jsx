import React, { useState } from 'react';
import { X } from 'lucide-react';

const SignupModal = ({ onClose, onSignup, setShowLogin }) => {
  const [signupForm, setSignupForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    type: 'consumer'
  });

  const handleSubmit = () => {
    if (!signupForm.name || !signupForm.email || !signupForm.password || !signupForm.phone) {
      alert('Please fill in all fields');
      return;
    }
    onSignup(signupForm.type);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl max-h-screen overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
            Sign Up
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={28} />
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Account Type</label>
            <select
              value={signupForm.type}
              onChange={(e) => setSignupForm({...signupForm, type: e.target.value})}
              className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500"
            >
              <option value="consumer">Customer</option>
              <option value="

Continue
5:43 PM

provider">Service Provider</option> </select> </div> <div> <label className="block text-gray-700 font-semibold mb-2">Full Name</label> <input type="text" value={signupForm.name} onChange={(e) => setSignupForm({...signupForm, name: e.target.value})} className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500" placeholder="John Doe" /> </div> <div> <label className="block text-gray-700 font-semibold mb-2">Email</label> <input type="email" value={signupForm.email} onChange={(e) => setSignupForm({...signupForm, email: e.target.value})} className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500" placeholder="your@email.com" /> </div> <div> <label className="block text-gray-700 font-semibold mb-2">Phone</label> <input type="tel" value={signupForm.phone} onChange={(e) => setSignupForm({...signupForm, phone: e.target.value})} className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500" placeholder="+91 98765 43210" /> </div> <div> <label className="block text-gray-700 font-semibold mb-2">Password</label> <input type="password" value={signupForm.password} onChange={(e) => setSignupForm({...signupForm, password: e.target.value})} className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500" placeholder="••••••••" /> </div> <button onClick={handleSubmit} className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-xl hover:from-blue-600 hover:to-purple-700 transition font-bold text-lg shadow-lg" > Create Account </button> <p className="text-center text-gray-600"> Already have an account?{' '} <button onClick={() => { onClose(); setShowLogin(true); }} className="text-blue-600 font-semibold hover:underline" > Login </button> </p> </div> </div> </div> ); };

export default SignupModal;