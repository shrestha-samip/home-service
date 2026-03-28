import React, { useState, useEffect } from 'react';

const AnimatedCounter = ({ value, prefix = '', suffix = '' }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const increment = value / 50;
    const timer = setInterval(() => {
      setCount(prev => {
        const next = prev + increment;
        if (next >= value) {
          clearInterval(timer);
          return value;
        }
        return next;
      });
    }, 20);
    return () => clearInterval(timer);
  }, [value]);

  return <span>{prefix}{Math.floor(count)}{suffix}</span>;
};

const StatCard = ({ icon: Icon, label, value, color, prefix = '', suffix = '' }) => {
  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-6 text-center transform hover:scale-105 transition">
      <div className={`bg-gradient-to-r ${color} w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3`}>
        <Icon className="text-white" size={24} />
      </div>
      <div className="text-3xl font-bold text-white mb-1">
        <AnimatedCounter value={value} prefix={prefix} suffix={suffix} />
      </div>
      <div className="text-gray-300 text-sm">{label}</div>
    </div>
  );
};

export default StatCard;