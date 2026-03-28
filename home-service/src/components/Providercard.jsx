import React from 'react';
import { User, Star, Award, CheckCircle, MapPin, Phone } from 'lucide-react';

const ProviderCard = ({ provider }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 overflow-hidden border border-gray-100">
      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-6">
        <div className="flex items-center mb-4">
          <div className="bg-white bg-opacity-20 backdrop-blur-lg w-16 h-16 rounded-full flex items-center justify-center mr-4">
            <User size={32} className="text-white" />
          </div>
          <div>
            <h3 className="font-bold text-xl text-white">{provider.name}</h3>
            <p className="text-indigo-100">{provider.service}</p>
          </div>
        </div>
      </div>
      <div className="p-6 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center text-yellow-500">
            <Star size={18} className="mr-2 fill-current" />
            <span className="font-bold text-lg">{provider.rating}</span>
            <span className="text-gray-500 text-sm ml-1">/ 5.0</span>
          </div>
          {provider.available ? (
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
              Available
            </span>
          ) : (
            <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">
              Busy
            </span>
          )}
        </div>
        <div className="flex items-center text-gray-600">
          <Award size={16} className="mr-2 text-blue-500" />
          <span>{provider.experience} experience</span>
        </div>
        <div className="flex items-center text-gray-600">
          <CheckCircle size={16} className="mr-2 text-green-500" />
          <span>{provider.completedJobs} jobs completed</span>
        </div>
        <div className="flex items-center text-gray-600">
          <MapPin size={16} className="mr-2 text-red-500" />
          <span>{provider.location}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Phone size={16} className="mr-2 text-purple-500" />
          <span className="text-sm">{provider.phone}</span>
        </div>
        {provider.specialization && (
          <div className="pt-3 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Specialization:</span> {provider.specialization}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProviderCard;