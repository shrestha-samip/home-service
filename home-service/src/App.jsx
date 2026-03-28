import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import BookingsPage from './pages/BookingPage';
import ProvidersPage from './pages/ProvidersPage';
import ProviderDashboard from './pages/ProviderDashboard';
import LoginModal from './components/LoginModal';
import SignupModal from './components/SignupModal';
import { services } from './data/services';
import { providers } from './data/provider';
import { initialBookings, initialServiceRequests, initialStats } from './data/mockData';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [userType, setUserType] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [bookings, setBookings] = useState(initialBookings);
  const [serviceRequests, setServiceRequests] = useState(initialServiceRequests);
  const [stats, setStats] = useState(initialStats);

  // Animate stats on mount
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        totalBookings: prev.totalBookings + Math.floor(Math.random() * 2),
        activeProviders: prev.activeProviders,
        completedServices: prev.completedServices + Math.floor(Math.random() * 2),
        revenue: prev.revenue + Math.floor(Math.random() * 500)
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Handle Login
  const handleLogin = (type) => {
    setIsLoggedIn(true);
    setUserType(type);
    setShowLogin(false);
    setCurrentView(type === 'consumer' ? 'services' : 'provider-dashboard');
  };

  // Handle Signup
  const handleSignup = (type) => {
    setIsLoggedIn(true);
    setUserType(type);
    setShowSignup(false);
    setCurrentView(type === 'consumer' ? 'services' : 'provider-dashboard');
  };

  // Handle Logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserType(null);
    setCurrentView('home');
  };

  // Handle Service Booking
  const handleBookService = (bookingData) => {
    const newBooking = {
      id: bookings.length + 1,
      service: bookingData.service.name,
      provider: bookingData.provider ? bookingData.provider.name : 'To be assigned',
      date: bookingData.formData.date,
      time: bookingData.formData.time,
      status: 'pending',
      amount: parseInt(bookingData.service.price.split('-')[1].replace('₹', '')),
      address: bookingData.formData.address,
      customerName: 'Your Name',
      phone: bookingData.formData.phone
    };
    
    setBookings([...bookings, newBooking]);
    setCurrentView('bookings');
    
    // Show success message
    alert('Booking created successfully! Check your bookings page.');
  };

  // Handle Provider Request Action
  const handleRequestAction = (requestId, action) => {
    setServiceRequests(serviceRequests.map(req => 
      req.id === requestId ? { ...req, status: action } : req
    ));
    
    // Show success message
    const actionText = action === 'accepted' ? 'accepted' : 'rejected';
    alert(`Request has been ${actionText} successfully!`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <Navbar 
        isLoggedIn={isLoggedIn}
        userType={userType}
        currentView={currentView}
        setCurrentView={setCurrentView}
        setShowLogin={setShowLogin}
        setShowSignup={setShowSignup}
        handleLogout={handleLogout}
      />

      {/* Main Content - Render pages based on currentView */}
      {currentView === 'home' && (
        <HomePage 
          stats={stats}
          isLoggedIn={isLoggedIn}
          userType={userType}
          setShowSignup={setShowSignup}
          setCurrentView={setCurrentView}
        />
      )}
      
      {currentView === 'services' && (
        <ServicesPage 
          services={services}
          providers={providers}
          onBookService={handleBookService}
        />
      )}
      
      {currentView === 'bookings' && (
        <BookingsPage bookings={bookings} />
      )}
      
      {currentView === 'providers' && (
        <ProvidersPage providers={providers} />
      )}
      
      {currentView === 'provider-dashboard' && (
        <ProviderDashboard 
          serviceRequests={serviceRequests}
          onRequestAction={handleRequestAction}
        />
      )}

      {/* Modals */}
      {showLogin && (
        <LoginModal 
          onClose={() => setShowLogin(false)} 
          onLogin={handleLogin}
          setShowSignup={setShowSignup}
        />
      )}
      
      {showSignup && (
        <SignupModal 
          onClose={() => setShowSignup(false)} 
          onSignup={handleSignup}
          setShowLogin={setShowLogin}
        />
      )}
    </div>
  );
}

export default App;