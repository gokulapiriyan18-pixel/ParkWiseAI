const EARTH_RADIUS_KM = 6371

/**
 * Haversine formula — great-circle distance between two coordinates.
 * @param {number} lat1
 * @param {number} lon1
 * @param {number} lat2
 * @param {number} lon2
 * @returns {number} distance in kilometres
 */
export function calculateDistanceKm(lat1, lon1, lat2, lon2) {
  const toRad = (deg) => (deg * Math.PI) / 180

  const dLat = toRad(lat2 - lat1)
  const dLon = toRad(lon2 - lon1)

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return EARTH_RADIUS_KM * c
}

/**
 * Attach computed distance (km) from destination to each parking location.
 * @param {import('../data/models').ParkingLocation[]} locations
 * @param {{ latitude: number, longitude: number }} destination
 * @returns {Array<import('../data/models').ParkingLocation & { distance: number }>}
 */
export function attachDistances(locations, destination) {
  return locations.map((location) => ({
    ...location,
    distance: calculateDistanceKm(
      destination.latitude,
      destination.longitude,
      location.latitude,
      location.longitude
    ),
  }))
}
