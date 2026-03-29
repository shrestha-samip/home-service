import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import BookingsPage from './pages/BookingPage';
import ProvidersPage from './pages/ProvidersPage';
import ProviderDashboard from './pages/ProviderDashboard';
import LoginModal from './components/LoginModal';
import SignupModal from './components/SignupModal';
import { api } from './api/client';

const STORAGE_KEY = 'houseServiceUser';

function loadStoredUser() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const u = JSON.parse(raw);
    if (u?.userId && u?.role) return u;
  } catch {
    /* ignore */
  }
  return null;
}

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [user, setUser] = useState(() => loadStoredUser());
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [stats, setStats] = useState({
    total_bookings: 0,
    completed_services: 0,
    active_providers: 0,
    revenue: 0,
  });
  const [customerBookings, setCustomerBookings] = useState([]);
  const [providerBookings, setProviderBookings] = useState([]);
  const [bookingsLoading, setBookingsLoading] = useState(false);

  const isLoggedIn = Boolean(user);
  const userType =
    user?.role === 'customer' ? 'consumer' : user?.role === 'provider' ? 'provider' : null;

  const refreshStats = useCallback(async () => {
    try {
      const s = await api.getStats();
      setStats(s);
    } catch {
      /* non-fatal */
    }
  }, []);

  const refreshCustomerBookings = useCallback(async () => {
    if (!user || user.role !== 'customer') return;
    setBookingsLoading(true);
    try {
      const list = await api.getCustomerBookings(user.userId);
      setCustomerBookings(Array.isArray(list) ? list : []);
    } catch {
      setCustomerBookings([]);
    } finally {
      setBookingsLoading(false);
    }
  }, [user]);

  const refreshProviderBookings = useCallback(async () => {
    if (!user || user.role !== 'provider') return;
    setBookingsLoading(true);
    try {
      const list = await api.getProviderBookings(user.userId);
      setProviderBookings(Array.isArray(list) ? list : []);
    } catch {
      setProviderBookings([]);
    } finally {
      setBookingsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    refreshStats();
  }, [refreshStats]);

  useEffect(() => {
    if (user?.role === 'customer' && currentView === 'bookings') {
      refreshCustomerBookings();
    }
  }, [user, currentView, refreshCustomerBookings]);

  useEffect(() => {
    if (user?.role === 'provider' && currentView === 'provider-dashboard') {
      refreshProviderBookings();
    }
  }, [user, currentView, refreshProviderBookings]);

  useEffect(() => {
    if (currentView === 'home') {
      refreshStats();
    }
  }, [currentView, refreshStats]);

  const persistUser = (u) => {
    setUser(u);
    if (u) localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    else localStorage.removeItem(STORAGE_KEY);
  };

  const handleLoginSuccess = (payload) => {
    const u = {
      userId: payload.user_id,
      name: payload.name,
      role: payload.role,
    };
    persistUser(u);
    setShowLogin(false);
    setCurrentView(u.role === 'customer' ? 'services' : 'provider-dashboard');
  };

  const handleSignupSuccess = (payload) => {
    const u = {
      userId: payload.user_id,
      name: payload.name,
      role: payload.role,
    };
    persistUser(u);
    setShowSignup(false);
    setCurrentView(u.role === 'customer' ? 'services' : 'provider-dashboard');
  };

  const handleLogout = () => {
    persistUser(null);
    setCurrentView('home');
    setCustomerBookings([]);
    setProviderBookings([]);
  };

  const handleBookService = async (bookingData) => {
    if (!user || user.role !== 'customer') {
      alert('Please log in as a customer to book.');
      return;
    }
    const provider = bookingData.provider;
    if (!provider?.id) {
      alert('Please select a provider.');
      return;
    }
    try {
      const addr = bookingData.formData.description?.trim()
        ? `${bookingData.formData.address}\n\nNote: ${bookingData.formData.description.trim()}`
        : bookingData.formData.address;
      await api.createBooking({
        customer_id: user.userId,
        provider_id: provider.id,
        service_id: bookingData.service.id,
        date: bookingData.formData.date,
        time: bookingData.formData.time,
        address: addr,
        phone: bookingData.formData.phone,
      });
      await refreshCustomerBookings();
      await refreshStats();
      setCurrentView('bookings');
      alert('Booking created successfully.');
    } catch (e) {
      alert(e.message || 'Could not create booking');
    }
  };

  const handleProviderStatus = async (bookingId, action) => {
    try {
      if (action === 'accepted') {
        await api.updateBookingStatus(bookingId, 'accepted');
      } else if (action === 'rejected') {
        await api.deleteBooking(bookingId);
      }
      await refreshProviderBookings();
      await refreshStats();
    } catch (e) {
      alert(e.message || 'Action failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        isLoggedIn={isLoggedIn}
        userType={userType}
        currentView={currentView}
        setCurrentView={setCurrentView}
        setShowLogin={setShowLogin}
        setShowSignup={setShowSignup}
        handleLogout={handleLogout}
      />

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
        <ServicesPage onBookService={handleBookService} />
      )}

      {currentView === 'bookings' && (
        <BookingsPage
          bookings={customerBookings}
          loading={bookingsLoading}
          onRefresh={refreshCustomerBookings}
        />
      )}

      {currentView === 'providers' && <ProvidersPage />}

      {currentView === 'provider-dashboard' && (
        <ProviderDashboard
          bookings={providerBookings}
          loading={bookingsLoading}
          onRequestAction={handleProviderStatus}
          onRefresh={refreshProviderBookings}
        />
      )}

      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onLoginSuccess={handleLoginSuccess}
          setShowSignup={setShowSignup}
        />
      )}

      {showSignup && (
        <SignupModal
          onClose={() => setShowSignup(false)}
          onSignupSuccess={handleSignupSuccess}
          setShowLogin={setShowLogin}
        />
      )}
    </div>
  );
}

export default App;
