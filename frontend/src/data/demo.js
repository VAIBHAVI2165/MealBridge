export const demoListings = [
  { id: 1, name: 'Fresh vegetable meals', provider: 'Green Bowl Cafe', veg: true, plates: 28, distance: '2.4 km', time: '1h 40m left', lat: 28.474, lng: 77.504, pickup: '12:30–14:00', status: 'Available' },
  { id: 2, name: 'Packed lunch boxes', provider: 'Campus Kitchen', veg: false, plates: 42, distance: '4.1 km', time: '2h 10m left', lat: 28.468, lng: 77.514, pickup: '13:00–14:30', status: 'Available' },
  { id: 3, name: 'Bread & bakery items', provider: 'Daily Crust', veg: true, plates: 16, distance: '1.8 km', time: '55m left', lat: 28.486, lng: 77.497, pickup: '12:00–13:00', status: 'Available' }
]
export const demoClaims = [
  { id: 'CL-2041', food: 'Fresh vegetable meals', provider: 'Green Bowl Cafe', plates: 20, claimed: 'Today, 11:25 AM', status: 'In delivery', partner: 'Ravi Kumar' },
  { id: 'CL-2038', food: 'Bread & bakery items', provider: 'Daily Crust', plates: 12, claimed: 'Today, 10:10 AM', status: 'Delivered', partner: 'Meena Singh' },
  { id: 'CL-2035', food: 'Packed lunch boxes', provider: 'Campus Kitchen', plates: 15, claimed: 'Yesterday, 2:40 PM', status: 'Approved', partner: 'Awaiting assignment' }
]
export const demoDeliveries = [
  { id: 'DL-881', claim: 'CL-2041', food: 'Fresh vegetable meals', provider: 'Green Bowl Cafe', recipient: 'Hope Community NGO', plates: 20, pickup: 'Sector 18, Greater Noida', drop: 'Knowledge Park II, Greater Noida', pickupLat: 28.474, pickupLng: 77.504, dropLat: 28.468, dropLng: 77.514, status: 'assigned', eta: '25 min' },
  { id: 'DL-879', claim: 'CL-2035', food: 'Packed lunch boxes', provider: 'Campus Kitchen', recipient: 'Hope Community NGO', plates: 15, pickup: 'Alpha 1, Greater Noida', drop: 'Sector 36, Greater Noida', pickupLat: 28.468, pickupLng: 77.514, dropLat: 28.486, dropLng: 77.497, status: 'picked_up', eta: '12 min' }
]
export const demoMapPoints = [
  { id: 'p1', label: 'Green Bowl Cafe', kind: 'provider', lat: 28.474, lng: 77.504, note: '28 plates available' },
  { id: 'p2', label: 'Daily Crust', kind: 'provider', lat: 28.486, lng: 77.497, note: '16 plates available' },
  { id: 'n1', label: 'Hope Community NGO', kind: 'ngo', lat: 28.468, lng: 77.514, note: 'Recipient organization' },
  { id: 'd1', label: 'Ravi Kumar', kind: 'partner', lat: 28.480, lng: 77.508, note: 'Available delivery partner' }
]