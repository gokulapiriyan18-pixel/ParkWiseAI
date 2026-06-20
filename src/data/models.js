import parkingData from './parkingLocations.json'
import noParkingData from './noParkingZones.json'

/**
 * @typedef {Object} ParkingLocation
 * @property {string} id
 * @property {string} name
 * @property {number} [distance] - computed at runtime from user destination (km)
 * @property {number} availableSlots
 * @property {number} totalSlots
 * @property {string[]} vehicleSupport
 * @property {'free'|'paid'} status
 * @property {number} latitude
 * @property {number} longitude
 * @property {string} area
 */

/**
 * @typedef {Object} NoParkingZone
 * @property {string} id
 * @property {string} name
 * @property {string} description
 * @property {number[][]} coordinates - [lat, lng] pairs
 */

/** @returns {ParkingLocation[]} */
export function getInitialParkingLocations() {
  return parkingData.map((location) => ({ ...location }))
}

/** @returns {NoParkingZone[]} */
export function getNoParkingZones() {
  return noParkingData.map((zone) => ({ ...zone }))
}

/**
 * @param {ParkingLocation} location
 * @returns {'available'|'limited'|'full'}
 */
export function getAvailabilityStatus(location) {
  if (location.availableSlots === 0) return 'full'
  const ratio = location.availableSlots / location.totalSlots
  if (ratio <= 0.15) return 'limited'
  return 'available'
}

/**
 * @param {ParkingLocation} location
 * @param {string} vehicleTypeId
 * @returns {boolean}
 */
export function isVehicleCompatible(location, vehicleTypeId) {
  return location.vehicleSupport.includes(vehicleTypeId)
}

/**
 * @param {number} distanceKm
 * @returns {string}
 */
export function formatDistance(distanceKm) {
  if (distanceKm < 1) {
    return `${Math.round(distanceKm * 1000)} m`
  }
  return `${distanceKm.toFixed(1)} km`
}

/**
 * @param {ParkingLocation} location
 * @returns {number}
 */
export function getOccupancyRate(location) {
  if (location.totalSlots === 0) return 100
  const occupied = location.totalSlots - location.availableSlots
  return Math.round((occupied / location.totalSlots) * 100)
}

/**
 * @param {ParkingLocation[]} locations
 * @returns {{ totalLocations: number, totalAvailable: number, totalCapacity: number, occupancyRate: number }}
 */
export function computeDashboardStats(locations) {
  const totalLocations = locations.length
  const totalAvailable = locations.reduce((sum, loc) => sum + loc.availableSlots, 0)
  const totalCapacity = locations.reduce((sum, loc) => sum + loc.totalSlots, 0)
  const occupied = totalCapacity - totalAvailable
  const occupancyRate = totalCapacity > 0 ? Math.round((occupied / totalCapacity) * 100) : 0

  return {
    totalLocations,
    totalAvailable,
    totalCapacity,
    occupancyRate,
  }
}
