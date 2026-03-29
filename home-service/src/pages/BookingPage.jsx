import React from 'react';
import { Calendar, CheckCircle, DollarSign } from 'lucide-react';
import BookingCard from '../components/BookingCard';
import { parsePriceToAmount } from '../utils/serviceIcons';

const BookingsPage = ({ bookings, loading, onRefresh }) => {
  const totalSpent = (bookings || []).reduce(
    (sum, b) => sum + (b.amount != null ? b.amount : parsePriceToAmount(b.price)),
    0
  );
  const completedCount = (bookings || []).filter((b) => b.status === 'completed').length;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <h2 className="text-4xl font-bold text-gray-800">My Bookings</h2>
        {onRefresh && (
          <button
            type="button"
            onClick={onRefresh}
            className="text-blue-600 font-semibold hover:underline self-start sm:self-auto"
          >
            Refresh
          </button>
        )}
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl p-6 text-white">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-blue-100 mb-1">Total Bookings</p>
              <p className="text-4xl font-bold">{bookings?.length ?? 0}</p>
            </div>
            <Calendar className="opacity-50" size={40} />
          </div>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-700 rounded-2xl p-6 text-white">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-green-100 mb-1">Completed</p>
              <p className="text-4xl font-bold">{completedCount}</p>
            </div>
            <CheckCircle className="opacity-50" size={40} />
          </div>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl p-6 text-white">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-purple-100 mb-1">Estimated spend</p>
              <p className="text-4xl font-bold">₹{totalSpent}</p>
            </div>
            <DollarSign className="opacity-50" size={40} />
          </div>
        </div>
      </div>

      {loading ? (
        <p className="text-gray-600">Loading bookings…</p>
      ) : !bookings || bookings.length === 0 ? (
        <div className="text-center py-16">
          <Calendar size={64} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-2xl font-bold text-gray-400 mb-2">No bookings yet</h3>
          <p className="text-gray-500">Book a service to see it here.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingsPage;
