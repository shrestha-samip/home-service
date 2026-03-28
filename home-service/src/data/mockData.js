export const initialBookings = [
  { 
    id: 1, 
    service: 'Plumbing', 
    provider: 'Raj Kumar', 
    date: '2026-01-20', 
    time: '10:00 AM', 
    status: 'confirmed',
    amount: 650,
    address: 'Balaju, Kathmandu',
    customerName: 'Your Name',
    phone: '+977 98765 00000'
  },
  { 
    id: 2, 
    service: 'House Cleaning', 
    provider: 'Priya Sharma', 
    date: '2026-01-22', 
    time: '2:00 PM', 
    status: 'pending',
    amount: 800,
    address: 'Gongabu, Kathmandu',
    customerName: 'Your Name',
    phone: '+977 98765 00000'
  },
  { 
    id: 3, 
    service: 'Electrical Work', 
    provider: 'Amit Patel', 
    date: '2026-01-18', 
    time: '11:00 AM', 
    status: 'completed',
    amount: 950,
    address: 'Baluwatar, Kathmandu',
    customerName: 'Your Name',
    phone: '+977 98765 00000'
  }
];

export const initialServiceRequests = [
  { 
    id: 1, 
    customer: 'Hari Prasad', 
    service: 'Plumbing', 
    date: '2026-01-20', 
    time: '10:00 AM', 
    address: 'Balaju, Kathmandu', 
    status: 'accepted',
    amount: 650,
    phone: '+977 98765 00001',
    description: 'Kitchen sink leakage repair needed'
  },
  { 
    id: 2, 
    customer: 'Ujjwal Roka', 
    service: 'Electrical Work', 
    date: '2026-01-21', 
    time: '3:00 PM', 
    address: 'Gongabu, Kathmandu', 
    status: 'pending',
    amount: 950,
    phone: '+977 98765 00002',
    description: 'Fan installation in living room'
  },
  { 
    id: 3, 
    customer: 'Nirdesh Thapa', 
    service: 'House Cleaning', 
    date: '2026-01-23', 
    time: '9:00 AM', 
    address: 'Baluwatar, Kathmandu', 
    status: 'pending',
    amount: 700,
    phone: '+977 98765 00003',
    description: 'Full house deep cleaning required'
  }
];

export const initialStats = {
  totalBookings: 156,
  activeProviders: 48,
  completedServices: 142,
  revenue: 45600
};