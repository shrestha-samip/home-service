import React from 'react';
import ProviderCard from '../components/Providercard.jsx';

const ProvidersPage = ({ providers }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-4xl font-bold mb-8 text-gray-800">Service Providers</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {providers.map(provider => (
          <ProviderCard key={provider.id} provider={provider} />
        ))}
      </div>
    </div>
  );
};

export default ProvidersPage;