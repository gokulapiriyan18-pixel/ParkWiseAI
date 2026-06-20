/**
 * Major Chennai destinations with realistic coordinates.
 * Used for distance calculation and map destination marker.
 */
export const CHENNAI_DESTINATIONS = [
  { id: 'anna-nagar', name: 'Anna Nagar', latitude: 13.085, longitude: 80.2101 },
  { id: 't-nagar', name: 'T Nagar', latitude: 13.0418, longitude: 80.2341 },
  { id: 'marina-beach', name: 'Marina Beach', latitude: 13.05, longitude: 80.2824 },
  { id: 'velachery', name: 'Velachery', latitude: 12.9815, longitude: 80.218 },
  { id: 'guindy', name: 'Guindy', latitude: 13.0067, longitude: 80.2206 },
  { id: 'porur', name: 'Porur', latitude: 13.0358, longitude: 80.1569 },
  { id: 'tambaram', name: 'Tambaram', latitude: 12.9249, longitude: 80.1 },
  { id: 'vadapalani', name: 'Vadapalani', latitude: 13.0478, longitude: 80.212 },
  { id: 'nungambakkam', name: 'Nungambakkam', latitude: 13.0604, longitude: 80.2426 },
  { id: 'mylapore', name: 'Mylapore', latitude: 13.0339, longitude: 80.2696 },
  { id: 'adyar', name: 'Adyar', latitude: 13.0067, longitude: 80.2573 },
  { id: 'besant-nagar', name: 'Besant Nagar', latitude: 13.006, longitude: 80.2699 },
  { id: 'thiruvanmiyur', name: 'Thiruvanmiyur', latitude: 12.985, longitude: 80.2514 },
  { id: 'omr-sholinganallur', name: 'OMR / Sholinganallur', latitude: 12.901, longitude: 80.2279 },
  { id: 'egmore', name: 'Egmore', latitude: 13.0732, longitude: 80.2609 },
  { id: 'kilpauk', name: 'Kilpauk', latitude: 13.0777, longitude: 80.2437 },
  { id: 'royapettah', name: 'Royapettah', latitude: 13.0588, longitude: 80.2647 },
  { id: 'chromepet', name: 'Chromepet', latitude: 12.9516, longitude: 80.1392 },
  { id: 'pallavaram', name: 'Pallavaram', latitude: 12.9675, longitude: 80.1536 },
  { id: 'avadi', name: 'Avadi', latitude: 13.1143, longitude: 80.0994 },
  { id: 'ambattur', name: 'Ambattur', latitude: 13.1143, longitude: 80.148 },
  { id: 'perambur', name: 'Perambur', latitude: 13.1149, longitude: 80.234 },
  { id: 'medavakkam', name: 'Medavakkam', latitude: 12.9174, longitude: 80.192 },
  { id: 'koyambedu', name: 'Koyambedu (CMBT)', latitude: 13.0694, longitude: 80.1948 },
  { id: 'chennai-central', name: 'Chennai Central', latitude: 13.0827, longitude: 80.275 },
  { id: 'chennai-airport', name: 'Chennai Airport', latitude: 12.9941, longitude: 80.1709 },
  { id: 'phoenix-mall', name: 'Phoenix Mall (Velachery)', latitude: 13.0144, longitude: 80.2036 },
  { id: 'vr-mall', name: 'VR Mall (Anna Nagar)', latitude: 13.0827, longitude: 80.2707 },
  { id: 'express-avenue', name: 'Express Avenue', latitude: 13.0588, longitude: 80.2647 },
  { id: 'mount-road', name: 'Mount Road', latitude: 13.068, longitude: 80.262 },
  { id: 'alwarpet', name: 'Alwarpet', latitude: 13.033, longitude: 80.256 },
  { id: 'porur-junction', name: 'Porur Junction', latitude: 13.038, longitude: 80.158 },
  { id: 'siruseri', name: 'Siruseri (SIPCOT)', latitude: 12.836, longitude: 80.226 },
  { id: 'ecr', name: 'ECR (East Coast Road)', latitude: 12.948, longitude: 80.256 },
]

export const DEFAULT_DESTINATION_ID = 't-nagar'

/**
 * @param {string} destinationId
 * @returns {{ id: string, name: string, latitude: number, longitude: number }}
 */
export function getDestinationById(destinationId) {
  return (
    CHENNAI_DESTINATIONS.find((d) => d.id === destinationId) ||
    CHENNAI_DESTINATIONS.find((d) => d.id === DEFAULT_DESTINATION_ID)
  )
}

/**
 * @param {string} query - destination id or partial name match
 * @returns {{ id: string, name: string, latitude: number, longitude: number } | undefined}
 */
export function findDestination(query) {
  const normalized = query.trim().toLowerCase()
  if (!normalized) return undefined

  const byId = CHENNAI_DESTINATIONS.find((d) => d.id === normalized)
  if (byId) return byId

  return CHENNAI_DESTINATIONS.find(
    (d) =>
      d.name.toLowerCase() === normalized ||
      d.name.toLowerCase().includes(normalized) ||
      normalized.includes(d.name.toLowerCase())
  )
}
