import React from 'react';
import { User, Calendar, Clock, MapPin, CheckCircle, Award } from 'lucide-react';
import { parsePriceToAmount } from '../utils/serviceIcons';

const BookingCard = ({ booking }) => {
  const serviceLabel = booking.service_name || booking.service || 'Service';
  const providerLabel = booking.provider_name || booking.provider || '—';
  const amount =
    booking.amount != null ? booking.amount : parsePriceToAmount(booking.price);
  const status = booking.status || 'pending';

  const getStatusStyle = (s) => {
    switch (s) {
      case 'accepted':
        return 'bg-gradient-to-r from-green-500 to-emerald-500';
      case 'pending':
        return 'bg-gradient-to-r from-yellow-500 to-orange-500';
      case 'completed':
        return 'bg-gradient-to-r from-blue-500 to-purple-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusIcon = (s) => {
    switch (s) {
      case 'accepted':
        return <CheckCircle size={20} className="mr-2" />;
      case 'pending':
        return <Clock size={20} className="mr-2" />;
      case 'completed':
        return <Award size={20} className="mr-2" />;
      default:
        return null;
    }
  };

  const label =
    status === 'accepted'
      ? 'Accepted'
      : status.charAt(0).toUpperCase() + status.slice(1);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition border border-gray-100">
      <div className="flex flex-col lg:flex-row justify-between">
        <div className="mb-4 lg:mb-0 flex-1">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="font-bold text-2xl text-gray-800 mb-1">{serviceLabel}</h3>
              <p className="text-gray-600 flex items-center">
                <User size={16} className="mr-2" />
                {providerLabel}
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-blue-600">₹{amount}</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-3 text-gray-600">
            <p className="flex items-center">
              <Calendar size={16} className="mr-2 text-blue-500" />
              {booking.date}
            </p>
            <p className="flex items-center">
              <Clock size={16} className="mr-2 text-blue-500" />
              {booking.time}
            </p>
            <p className="flex items-center md:col-span-2">
              <MapPin size={16} className="mr-2 text-blue-500" />
              {booking.address}
            </p>
          </div>
        </div>
        <div className="flex items-center lg:ml-6">
          <span
            className={`${getStatusStyle(status)} text-white px-6 py-3 rounded-full font-bold flex items-center shadow-lg`}
          >
            {getStatusIcon(status)}
            {label}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
