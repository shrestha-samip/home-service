import React from 'react';
import { Calendar, CheckCircle, Clock, DollarSign, User, MapPin, Phone, XCircle } from 'lucide-react';
import { parsePriceToAmount } from '../utils/serviceIcons';

const ProviderDashboard = ({ bookings, loading, onRequestAction, onRefresh }) => {
  const list = bookings || [];
  const stats = {
    totalRequests: list.length,
    accepted: list.filter((r) => r.status === 'accepted').length,
    pending: list.filter((r) => r.status === 'pending').length,
    earnings: list
      .filter((r) => r.status === 'accepted' || r.status === 'completed')
      .reduce((sum, r) => sum + parsePriceToAmount(r.price), 0),
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <h2 className="text-4xl font-bold text-gray-800">Provider Dashboard</h2>
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

      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <p className="text-blue-100">Total Requests</p>
            <Calendar className="opacity-50" size={32} />
          </div>
          <p className="text-4xl font-bold">{stats.totalRequests}</p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-700 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <p className="text-green-100">Accepted</p>
            <CheckCircle className="opacity-50" size={32} />
          </div>
          <p className="text-4xl font-bold">{stats.accepted}</p>
        </div>
        <div className="bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <p className="text-yellow-100">Pending</p>
            <Clock className="opacity-50" size={32} />
          </div>
          <p className="text-4xl font-bold">{stats.pending}</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <p className="text-purple-100">Est. earnings</p>
            <DollarSign className="opacity-50" size={32} />
          </div>
          <p className="text-4xl font-bold">₹{stats.earnings}</p>
        </div>
      </div>

      <h3 className="text-2xl font-bold mb-6 text-gray-800">Incoming bookings</h3>
      {loading ? (
        <p className="text-gray-600">Loading…</p>
      ) : list.length === 0 ? (
        <div className="text-center py-16">
          <Calendar size={64} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-2xl font-bold text-gray-400 mb-2">No requests yet</h3>
          <p className="text-gray-500">New customer bookings will appear here.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {list.map((request) => (
            <div
              key={request.id}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition border border-gray-100"
            >
              <div className="flex flex-col lg:flex-row justify-between">
                <div className="mb-4 lg:mb-0 flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-2xl text-gray-800 mb-1">
                        {request.service_name || 'Service'}
                      </h3>
                      <p className="text-gray-600 flex items-center">
                        <User size={16} className="mr-2" />
                        {request.customer_name || 'Customer'}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-600">
                        ₹{parsePriceToAmount(request.price)}
                      </p>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-3 text-gray-600">
                    <p className="flex items-center">
                      <Calendar size={16} className="mr-2 text-blue-500" />
                      {request.date}
                    </p>
                    <p className="flex items-center">
                      <Clock size={16} className="mr-2 text-blue-500" />
                      {request.time}
                    </p>
                    <p className="flex items-center">
                      <Phone size={16} className="mr-2 text-purple-500" />
                      {request.phone}
                    </p>
                    <p className="flex items-center">
                      <MapPin size={16} className="mr-2 text-red-500" />
                      {request.address}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-3 lg:ml-6">
                  {request.status === 'pending' ? (
                    <>
                      <button
                        type="button"
                        onClick={() => onRequestAction(request.id, 'accepted')}
                        className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-xl hover:from-green-600 hover:to-emerald-600 transition flex items-center justify-center font-bold shadow-lg"
                      >
                        <CheckCircle size={20} className="mr-2" />
                        Accept
                      </button>
                      <button
                        type="button"
                        onClick={() => onRequestAction(request.id, 'rejected')}
                        className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-3 rounded-xl hover:from-red-600 hover:to-pink-600 transition flex items-center justify-center font-bold shadow-lg"
                      >
                        <XCircle size={20} className="mr-2" />
                        Reject
                      </button>
                    </>
                  ) : (
                    <span
                      className={`px-6 py-3 rounded-xl font-bold text-center ${
                        request.status === 'accepted'
                          ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                          : request.status === 'completed'
                            ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                            : 'bg-gray-200 text-gray-800'
                      }`}
                    >
                      {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProviderDashboard;
