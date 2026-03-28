import React, { useState } from 'react';
import { Home, Menu, X, LogOut } from 'lucide-react';

const Navbar = ({ 
  isLoggedIn, 
  userType, 
  currentView,
  setCurrentView, 
  setShowLogin, 
  setShowSignup, 
  handleLogout 
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer" 
            onClick={() => setCurrentView('home')}
          >
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-xl mr-3">
              <Home className="text-white" size={28} />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
              ServiceHub Pro
            </span>
          </div>
          
          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-6">
            {isLoggedIn && userType === 'consumer' && (
              <>
                <button 
                  onClick={() => setCurrentView('services')} 
                  className={`font-semibold transition ${
                    currentView === 'services' 
                      ? 'text-blue-600' 
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  Services
                </button>
                <button 
                  onClick={() => setCurrentView('providers')} 
                  className={`font-semibold transition ${
                    currentView === 'providers' 
                      ? 'text-blue-600' 
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  Providers
                </button>
                <button 
                  onClick={() => setCurrentView('bookings')} 
                  className={`font-semibold transition ${
                    currentView === 'bookings' 
                      ? 'text-blue-600' 
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  Bookings
                </button>
              </>
            )}
            {isLoggedIn && userType === 'provider' && (
              <button 
                onClick={() => setCurrentView('provider-dashboard')} 
                className={`font-semibold transition ${
                  currentView === 'provider-dashboard' 
                    ? 'text-blue-600' 
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                Dashboard
              </button>
            )}
            {!isLoggedIn ? (
              <>
                <button 
                  onClick={() => setShowLogin(true)} 
                  className="text-gray-700 hover:text-blue-600 transition font-semibold"
                >
                  Login
                </button>
                <button 
                  onClick={() => setShowSignup(true)} 
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full hover:from-blue-600 hover:to-purple-700 transition font-semibold"
                >
                  Sign Up
                </button>
              </>
            ) : (
              <button 
                onClick={handleLogout} 
                className="flex items-center text-gray-700 hover:text-red-600 transition font-semibold"
              >
                <LogOut size={20} className="mr-2" />
                Logout
              </button>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-2">
            {isLoggedIn && userType === 'consumer' && (
              <>
                <button 
                  onClick={() => { setCurrentView('services'); setIsMenuOpen(false); }} 
                  className="block w-full text-left text-gray-700 hover:text-blue-600 transition font-semibold py-2"
                >
                  Services
                </button>
                <button 
                  onClick={() => { setCurrentView('providers'); setIsMenuOpen(false); }} 
                  className="block w-full text-left text-gray-700 hover:text-blue-600 transition font-semibold py-2"
                >
                  Providers
                </button>
                <button 
                  onClick={() => { setCurrentView('bookings'); setIsMenuOpen(false); }} 
                  className="block w-full text-left text-gray-700 hover:text-blue-600 transition font-semibold py-2"
                >
                  Bookings
                </button>
              </>
            )}
            {isLoggedIn && userType === 'provider' && (
              <button 
                onClick={() => { setCurrentView('provider-dashboard'); setIsMenuOpen(false); }} 
                className="block w-full text-left text-gray-700 hover:text-blue-600 transition font-semibold py-2"
              >
                Dashboard
              </button>
            )}
            {!isLoggedIn ? (
              <>
                <button 
                  onClick={() => { setShowLogin(true); setIsMenuOpen(false); }} 
                  className="block w-full text-left text-gray-700 hover:text-blue-600 transition font-semibold py-2"
                >
                  Login
                </button>
                <button 
                  onClick={() => { setShowSignup(true); setIsMenuOpen(false); }} 
                  className="block w-full text-left bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full mt-2"
                >
                  Sign Up
                </button>
              </>
            ) : (
              <button 
                onClick={() => { handleLogout(); setIsMenuOpen(false); }} 
                className="block w-full text-left text-red-600 hover:text-red-700 transition font-semibold py-2"
              >
                Logout
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;