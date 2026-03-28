import { Home, Droplets, Zap, Paintbrush, Wrench } from 'lucide-react';

export const services = [
  { 
    id: 1, 
    name: 'House Cleaning', 
    icon: Home, 
    price: '₹500-1000', 
    duration: '2-4 hours', 
    category: 'cleaning',
    description: 'Professional cleaning services for your home with experienced staff' 
  },
  { 
    id: 2, 
    name: 'Plumbing', 
    icon: Droplets, 
    price: '₹300-800', 
    duration: '1-3 hours', 
    category: 'repair',
    description: 'Expert plumbing solutions for all your water and drainage issues' 
  },
  { 
    id: 3, 
    name: 'Electrical Work', 
    icon: Zap, 
    price: '₹400-1200', 
    duration: '1-2 hours', 
    category: 'repair',
    description: 'Licensed electricians for safe and reliable electrical work' 
  },
  { 
    id: 4, 
    name: 'Painting', 
    icon: Paintbrush, 
    price: '₹800-2000', 
    duration: '4-8 hours', 
    category: 'renovation',
    description: 'Quality painting services for interiors and exteriors' 
  },
  { 
    id: 5, 
    name: 'General Repairs', 
    icon: Wrench, 
    price: '₹250-600', 
    duration: '1-2 hours', 
    category: 'repair',
    description: 'Fix anything from furniture to appliances with skilled technicians' 
  }
];

export const serviceCategories = [
  { id: 'all', name: 'All Services' },
  { id: 'cleaning', name: 'Cleaning' },
  { id: 'repair', name: 'Repair' },
  { id: 'renovation', name: 'Renovation' }
];