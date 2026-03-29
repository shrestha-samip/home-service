import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import ServiceCard from '../components/serviceCard';
import { api } from '../api/client';

const ServicesPage = ({ onBookService }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [bookingForm, setBookingForm] = useState({
    date: '',
    time: '',
    address: '',
    description: '',
    phone: '',
  });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const svc = await api.getServices();
        if (!cancelled) setServices(Array.isArray(svc) ? svc : []);
      } catch (e) {
        if (!cancelled) {
          setError(e.message || 'Failed to load services');
          setServices([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const filteredServices = services.filter((service) =>
    (service.name || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBooking = () => {
    if (!bookingForm.date || !bookingForm.time || !bookingForm.address || !bookingForm.phone) {
      alert('Please fill date, time, address, and phone.');
      return;
    }
    onBookService({
      service: selectedService,
      formData: bookingForm,
    });
    setBookingForm({ date: '', time: '', address: '', description: '', phone: '' });
    setSelectedService(null);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center text-gray-600">
        Loading services…
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-red-600 font-semibold mb-2">{error}</p>
        <p className="text-gray-600 text-sm">
          Is the API running at {import.meta.env.VITE_API_URL ?? 'http://localhost:8000'}?
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-4xl font-bold mb-2 text-gray-800">Explore Services</h2>
        <p className="text-gray-600 mb-6">
          Request a booking without choosing a provider — any available professional can accept it from their dashboard.
        </p>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition"
            />
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <ServiceCard key={service.id} service={service} onBook={setSelectedService} />
        ))}
      </div>

      {selectedService && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-screen overflow-y-auto shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
                Book {selectedService.name}
              </h3>
              <button
                type="button"
                onClick={() => setSelectedService(null)}
                className="text-gray-500 hover:text-gray-700 transition"
              >
                <X size={28} />
              </button>
            </div>

            <p className="text-gray-600 text-sm mb-6">
              Your request will be visible to all service providers until one accepts it.
            </p>

            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Date *</label>
                  <input
                    type="date"
                    value={bookingForm.date}
                    onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                    className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Time *</label>
                  <input
                    type="time"
                    value={bookingForm.time}
                    onChange={(e) => setBookingForm({ ...bookingForm, time: e.target.value })}
                    className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition"
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Phone Number *</label>
                <input
                  type="tel"
                  value={bookingForm.phone}
                  onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Address *</label>
                <textarea
                  value={bookingForm.address}
                  onChange={(e) => setBookingForm({ ...bookingForm, address: e.target.value })}
                  className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition"
                  rows="3"
                  placeholder="Enter your complete address..."
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Additional Details</label>
                <textarea
                  value={bookingForm.description}
                  onChange={(e) => setBookingForm({ ...bookingForm, description: e.target.value })}
                  className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition"
                  rows="2"
                  placeholder="Optional notes for the provider..."
                />
              </div>
              <button
                type="button"
                onClick={handleBooking}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-xl hover:from-blue-600 hover:to-purple-700 transition font-bold text-lg shadow-lg"
              >
                Submit booking request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicesPage;
