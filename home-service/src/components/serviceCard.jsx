import React from 'react';
import { Clock, ChevronRight } from 'lucide-react';
import { iconForServiceName, durationHint } from '../utils/serviceIcons';

const ServiceCard = ({ service, onBook }) => {
  const Icon = iconForServiceName(service.name);
  const duration = durationHint(service.name);
  const priceDisplay = service.price || '—';

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 overflow-hidden border border-gray-100">
      <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-6">
        <div className="bg-white bg-opacity-20 backdrop-blur-lg w-16 h-16 rounded-2xl flex items-center justify-center mb-4">
          <Icon className="text-white" size={32} />
        </div>
        <h3 className="font-bold text-2xl text-white mb-2">{service.name}</h3>
        <p className="text-blue-100">Professional home service booked in a few clicks.</p>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center text-gray-600">
            <Clock size={18} className="mr-2 text-blue-500" />
            <span className="font-medium">{duration}</span>
          </div>
          <div className="text-2xl font-bold text-blue-600">{priceDisplay}</div>
        </div>
        <button
          onClick={() => onBook(service)}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl hover:from-blue-600 hover:to-purple-700 transition font-semibold flex items-center justify-center group"
        >
          Book Now
          <ChevronRight className="ml-2 group-hover:translate-x-1 transition" size={20} />
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;
