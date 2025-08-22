const express = require('express');

const router = express.Router();

// Mocked store locations
const stores = [
  { id: 1, name: 'Central Store', latitude: 40.4168, longitude: -3.7038 },
  { id: 2, name: 'North Store', latitude: 41.3874, longitude: 2.1686 },
  { id: 3, name: 'South Store', latitude: 37.3891, longitude: -5.9845 },
];

function toRadians(degrees) {
  return (degrees * Math.PI) / 180;
}

function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth radius in kilometers
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

router.post('/', async (req, res) => {
  try {
    const { latitude, longitude } = req.body;

    // Query geocoding API (OpenStreetMap Nominatim)
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
      {
        headers: { 'User-Agent': 'delivery-app/1.0' },
      }
    );
    const data = await response.json();

    // Determine nearest store using Haversine distance
    let nearest = null;
    let minDistance = Infinity;
    for (const store of stores) {
      const distance = haversine(latitude, longitude, store.latitude, store.longitude);
      if (distance < minDistance) {
        minDistance = distance;
        nearest = { ...store, distance };
      }
    }

    res.json({ address: data.display_name, nearestStore: nearest });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
