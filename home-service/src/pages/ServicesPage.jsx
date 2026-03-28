import React, { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import ServiceCard from '../components/serviceCard';
import { serviceCategories } from '../data/services';

const ServicesPage = ({ services, providers, onBookService }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [selectedService, setSelectedService] = useState(null);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [bookingForm, setBookingForm] = useState({
    date: '',
    time: '',
    address: '',
    description: '',
    phone: ''
  });

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterCategory === 'all' || service.category === filterCategory;
    return matchesSearch && matchesFilter;
  });

  // const handleBooking = () => {
  //   if (!bookingForm.date || !bookingForm.time || !bookingForm.address || !bookingForm.phone) {
  //     alert('Please fill all required fields');
  //     return;
  //   }
    
  //   const bookingData = {
  //     service: selectedService,
  //     provider: selectedProvider,
  //     formData: bookingForm
  //   };
    
  //   onBookService(bookingData);
  //   setBookingForm({ date: '', time: '', address: '', description: '', phone: '' });
  //   setSelectedService(null);
  //   setSelectedProvider(null);
  // };
  const handleBooking = () => {
  if (!bookingForm.date || !selectedProvider) {
    alert('Please select a provider and a date');
    return;
  }
  
  onBookService({
    service: selectedService,
    provider: selectedProvider, // This links the two!
    formData: bookingForm
  });
};

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-4xl font-bold mb-6 text-gray-800">Explore Services</h2>
        
        {/* Search and Filter */}
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
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="pl-12 pr-8 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition appearance-none bg-white"
            >
              {serviceCategories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map(service => (
          <ServiceCard 
            key={service.id} 
            service={service} 
            onBook={setSelectedService} 
          />
        ))}
      </div>

      {/* Booking Modal */}
      {selectedService && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-screen overflow-y-auto shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
                Book {selectedService.name}
              </h3>
              <button 
                onClick={() => { setSelectedService(null); setSelectedProvider(null); }} 
                className="text-gray-500 hover:text-gray-700 transition"
              >
                <X size={28} />
              </button>
            </div>

            {/* Provider Selection */}
            <div className="mb-6">
              <h4 className="font-semibold text-lg mb-3 text-gray-800">Select a Provider (Optional)</h4>
              <div className="grid md:grid-cols-2 gap-3">
                {providers
                  .filter(p => p.service === selectedService.name)
                  .map(provider => (
                    <div
                      key={provider.id}
                      onClick={() => provider.available && setSelectedProvider(provider)}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition ${
                        selectedProvider?.id === provider.id 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-blue-300'
                      } ${!provider.available ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <div className="flex items-center mb-2">
                        <div className="bg-gray-200 w-12 h-12 rounded-full flex items-center justify-center mr-3">
                          <span className="text-lg font-bold text-gray-600">
                            {provider.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <h5 className="font-bold text-gray-800">{provider.name}</h5>
                          <div className="flex items-center text-sm">
                            <span className="text-yellow-500">★</span>
                            <span className="ml-1 font-semibold">{provider.rating}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-sm text-gray-600">
                        {provider.available ? (
                          <span className="text-green-600 font-semibold">✓ Available</span>
                        ) : (
                          <span className="text-red-600 font-semibold">Busy</span>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Date *</label>
                  <input
                    type="date"
                    value={bookingForm.date}
                    onChange={(e) => setBookingForm({...bookingForm, date: e.target.value})}
                    className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Time *</label>
                  <input
                    type="time"
                    value={bookingForm.time}
                    onChange={(e) => setBookingForm({...bookingForm, time: e.target.value})}
                    className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition"
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Phone Number *</label>
                <input
                  type="tel"
                  value={bookingForm.phone}
                  onChange={(e) => setBookingForm({...bookingForm, phone: e.target.value})}
                  placeholder="+91 98765 43210"
                  className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Address *</label>
                <textarea
                  value={bookingForm.address}
                  onChange={(e) => setBookingForm({...bookingForm, address: e.target.value})}
                  className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition"
                  rows="3"
                  placeholder="Enter your complete address..."
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Additional Details</label>
                <textarea
                  value={bookingForm.description}
                  onChange={(e) => setBookingForm({...bookingForm, description: e.target.value})}
                  className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition"
                  rows="3"
                  placeholder="Describe your requirements in detail..."
                />
              </div>
              <button 
                onClick={handleBooking} 
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-xl hover:from-blue-600 hover:to-purple-700 transition font-bold text-lg shadow-lg"
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicesPage;