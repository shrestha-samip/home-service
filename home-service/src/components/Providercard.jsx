import React from 'react';
import { User, Award, Mail, Phone } from 'lucide-react';

const ProviderCard = ({ provider }) => {
  const exp =
    provider.experience != null ? `${provider.experience} years experience` : 'Experience not set';

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 overflow-hidden border border-gray-100">
      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-6">
        <div className="flex items-center mb-4">
          <div className="bg-white bg-opacity-20 backdrop-blur-lg w-16 h-16 rounded-full flex items-center justify-center mr-4">
            <User size={32} className="text-white" />
          </div>
          <div>
            <h3 className="font-bold text-xl text-white">{provider.name}</h3>
            <p className="text-indigo-100 text-sm line-clamp-2">{provider.specialization || '—'}</p>
          </div>
        </div>
      </div>
      <div className="p-6 space-y-3">
        <div className="flex items-center text-gray-600">
          <Award size={16} className="mr-2 text-blue-500" />
          <span>{exp}</span>
        </div>
        {provider.email && (
          <div className="flex items-center text-gray-600">
            <Mail size={16} className="mr-2 text-indigo-500" />
            <span className="text-sm break-all">{provider.email}</span>
          </div>
        )}
        {provider.phone && (
          <div className="flex items-center text-gray-600">
            <Phone size={16} className="mr-2 text-purple-500" />
            <span className="text-sm">{provider.phone}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProviderCard;
