import React from 'react';
import { Users, Award, CheckCircle, DollarSign, Shield, Star, Clock, MapPin, MessageSquare } from 'lucide-react';
import StatCard from '../components/StatCard';

const HomePage = ({ stats, isLoggedIn, userType, setShowSignup, setCurrentView }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            Your Home, <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-yellow-400">Our Priority</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto">
            Connect with verified professionals for all your household needs. Fast, reliable, and affordable.
          </p>
          
          {!isLoggedIn ? (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setShowSignup(true)}
                className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-10 py-4 rounded-full hover:from-blue-600 hover:to-blue-800 transition transform hover:scale-105 text-lg font-bold shadow-2xl"
              >
                Get Started as Customer
              </button>
              <button
                onClick={() => setShowSignup(true)}
                className="bg-gradient-to-r from-green-500 to-green-700 text-white px-10 py-4 rounded-full hover:from-green-600 hover:to-green-800 transition transform hover:scale-105 text-lg font-bold shadow-2xl"
              >
                Join as Provider
              </button>
            </div>
          ) : (
            <button
              onClick={() => setCurrentView(userType === 'consumer' ? 'services' : 'provider-dashboard')}
              className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-10 py-4 rounded-full hover:from-purple-600 hover:to-pink-700 transition transform hover:scale-105 text-lg font-bold shadow-2xl"
            >
              Go to Dashboard
            </button>
          )}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-20">
          <StatCard 
            icon={Users} 
            label="Total Bookings" 
            value={stats.total_bookings ?? 0} 
            color="from-blue-400 to-blue-600" 
          />
          <StatCard 
            icon={Award} 
            label="Active Providers" 
            value={stats.active_providers ?? 0} 
            color="from-green-400 to-green-600" 
          />
          <StatCard 
            icon={CheckCircle} 
            label="Completed" 
            value={stats.completed_services ?? 0} 
            color="from-purple-400 to-purple-600" 
          />
          <StatCard 
            icon={DollarSign} 
            label="Revenue" 
            value={stats.revenue ?? 0} 
            prefix="₹" 
            color="from-pink-400 to-pink-600" 
          />
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            { 
              icon: Shield, 
              title: 'Verified Professionals', 
              desc: 'All service providers are background verified and trusted', 
              color: 'from-blue-400 to-cyan-400' 
            },
            { 
              icon: Star, 
              title: 'Quality Guaranteed', 
              desc: 'Rated services with genuine customer reviews and feedback', 
              color: 'from-purple-400 to-pink-400' 
            },
            { 
              icon: Clock, 
              title: '24/7 Support', 
              desc: 'Round the clock customer assistance for any queries', 
              color: 'from-orange-400 to-red-400' 
            },
            { 
              icon: DollarSign, 
              title: 'Best Prices', 
              desc: 'Competitive pricing with transparent and no hidden charges', 
              color: 'from-green-400 to-emerald-400' 
            },
            { 
              icon: MapPin, 
              title: 'Local Services', 
              desc: 'Connect with verified providers in your local area', 
              color: 'from-indigo-400 to-blue-400' 
            },
            { 
              icon: MessageSquare, 
              title: 'Easy Communication', 
              desc: 'Direct messaging and calling with service providers', 
              color: 'from-pink-400 to-rose-400' 
            }
          ].map((feature, index) => (
            <div 
              key={index} 
              className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-8 hover:bg-opacity-20 transition transform hover:scale-105 border border-white border-opacity-20"
            >
              <div className={`bg-gradient-to-r ${feature.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-4`}>
                <feature.icon className="text-white" size={28} />
              </div>
              <h3 className="font-bold text-2xl mb-3 text-white">{feature.title}</h3>
              <p className="text-gray-300">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;