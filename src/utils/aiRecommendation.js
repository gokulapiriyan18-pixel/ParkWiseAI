import { isVehicleCompatible } from '../data/models'
import { attachDistances } from './geoUtils'

const WEIGHTS = {
  destinationMatch: 0.50,
  distance: 0.40,
  availability: 0.03,
  vehicleMatch: 0.05,
  freeBonus: 0.02,
}


/**
 * @param {string} value
 * @returns {string}
 */
function normalizeText(value) {
  return value
    .toString()
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * @param {import('../data/models').ParkingLocation} location
 * @param {{ name?: string }} destination
 * @returns {number} 0-1 score
 */
function computeDestinationMatchScore(location, destination) {
  if (!destination?.name) return 0

  const destinationText = normalizeText(destination.name)
  const locationText = normalizeText(`${location.name} ${location.area || ''}`)

  if (!destinationText || !locationText) return 0

  if (locationText.includes(destinationText)) {
    return 1
  }

  const destinationTokens = destinationText.split(' ').filter(Boolean)
  const locationTokens = new Set(locationText.split(' ').filter(Boolean))

  if (destinationTokens.every((token) => locationTokens.has(token))) {
    return 0.95
  }

  const strongTokens = destinationTokens.filter((token) => token.length >= 3)
  const matchingTokens = strongTokens.filter((token) => locationText.includes(token))

  if (matchingTokens.length > 0) {
    return Math.min(0.85, 0.4 + 0.15 * matchingTokens.length)
  }

  return 0
}

/**
 * @param {number} distanceKm
 * @param {number} maxDistanceKm - farthest parking in current result set
 * @returns {number} 0-1 score, closer = higher
 */
function computeDistanceScore(distanceKm, maxDistanceKm) {
  const max = Math.max(maxDistanceKm, 0.1)
  return 1 - Math.min(distanceKm, max) / max
}

/**
 * @param {import('../data/models').ParkingLocation} location
 * @returns {number} 0-1 score
 */
function computeAvailabilityScore(location) {
  if (location.totalSlots === 0) return 0
  return location.availableSlots / location.totalSlots
}

/**
 * @param {import('../data/models').ParkingLocation} location
 * @param {string} vehicleTypeId
 * @returns {number} 0 or 1
 */
function computeVehicleMatchScore(location, vehicleTypeId) {
  return isVehicleCompatible(location, vehicleTypeId) ? 1 : 0
}

/**
 * @param {import('../data/models').ParkingLocation} location
 * @returns {number}
 */
function computeFreeBonus(location) {
  return location.status === 'free' ? 1 : 0
}

/**
 * @param {import('../data/models').ParkingLocation & { distance: number }} location
 * @param {string} vehicleTypeId
 * @param {number} maxDistanceKm
 * @returns {{ score: number, breakdown: object, compatible: boolean }}
 */
export function scoreParkingLocation(location, vehicleTypeId, maxDistanceKm, destination) {
  const compatible = isVehicleCompatible(location, vehicleTypeId)

  if (!compatible || location.availableSlots === 0) {
    return {
      score: 0,
      compatible,
      breakdown: {
        destinationMatchScore: 0,
        distanceScore: 0,
        availabilityScore: 0,
        vehicleMatchScore: 0,
        freeBonus: 0,
      },
    }
  }

  const destinationMatchScore = computeDestinationMatchScore(location, destination)
  const distanceScore = computeDistanceScore(location.distance, maxDistanceKm)
  const availabilityScore = computeAvailabilityScore(location)
  const vehicleMatchScore = computeVehicleMatchScore(location, vehicleTypeId)
  const freeBonus = computeFreeBonus(location)
  // Strong destination match override
if (destinationMatchScore >= 0.9) {
  return {
    score: 100,
    compatible,
    breakdown: {
      destinationMatchScore: 100,
      distanceScore: Math.round(distanceScore * 100),
      availabilityScore: Math.round(availabilityScore * 100),
      vehicleMatchScore: 100,
      freeBonus: freeBonus ? 100 : 0,
    },
  }
}

  const score =
    destinationMatchScore * WEIGHTS.destinationMatch +
    vehicleMatchScore * WEIGHTS.vehicleMatch +
    availabilityScore * WEIGHTS.availability +
    freeBonus * WEIGHTS.freeBonus +
    distanceScore * WEIGHTS.distance

  return {
    score: Math.round(score * 100),
    compatible,
    breakdown: {
      destinationMatchScore: Math.round(destinationMatchScore * 100),
      distanceScore: Math.round(distanceScore * 100),
      availabilityScore: Math.round(availabilityScore * 100),
      vehicleMatchScore: Math.round(vehicleMatchScore * 100),
      freeBonus: Math.round(freeBonus * 100),
    },
  }
}

/**
 * @param {import('../data/models').ParkingLocation[]} locations
 * @param {string} vehicleTypeId
 * @param {{ latitude: number, longitude: number, name?: string }} destination
 * @returns {Array<import('../data/models').ParkingLocation & { distance: number, aiScore: number, breakdown: object, compatible: boolean }>}
 */
export function rankParkingLocations(locations, vehicleTypeId, destination) {
  const withDistances = attachDistances(locations, destination)
  const maxDistance = Math.max(...withDistances.map((loc) => loc.distance), 0.1)

  const scored = withDistances.map((location) => {
    const { score, breakdown, compatible } = scoreParkingLocation(
      location,
      vehicleTypeId,
      maxDistance,
      destination
    )

    return {
      ...location,
      aiScore: score,
      breakdown,
      compatible,
    }
  })

  return scored.sort((a, b) => {
    if (b.aiScore !== a.aiScore) return b.aiScore - a.aiScore
    return a.distance - b.distance
  })
}

/**
 * @param {ReturnType<typeof rankParkingLocations>[0]} topPick
 * @param {string} [destinationName]
 * @returns {string}
 */
export function generateRecommendationExplanation(topPick, destinationName = '') {
  if (!topPick || topPick.aiScore === 0) {
    return 'No compatible parking found for your vehicle type. Try a different vehicle or destination.'
  }

  const reasons = []
  const destPhrase = destinationName ? ` near ${destinationName}` : ''

  if (topPick.breakdown.distanceScore >= 70) {
    reasons.push(`it is the closest option${destPhrase}`)
  } else if (topPick.breakdown.distanceScore >= 40) {
    reasons.push(`it is reasonably close${destPhrase}`)
  }

  if (topPick.breakdown.availabilityScore >= 50) {
    reasons.push('has high availability')
  } else if (topPick.breakdown.availabilityScore >= 20) {
    reasons.push('has moderate availability')
  }

  if (topPick.breakdown.vehicleMatchScore === 100) {
    reasons.push('matches your vehicle type')
  }

  if (topPick.status === 'free') {
    reasons.push('offers free parking')
  }

  if (reasons.length === 0) {
    return `Recommended based on overall AI scoring for your destination${destPhrase}.`
  }

  const joined =
    reasons.length === 1
      ? reasons[0]
      : `${reasons.slice(0, -1).join(', ')} and ${reasons[reasons.length - 1]}`

  return `Recommended because ${joined}.`
}

/**
 * Parking results for manual exploration — sorted by distance.
 */
export function getParkingResultsForDisplay(locations, destination, vehicleTypeId) {
  const withDistances = attachDistances(locations, destination)

  return withDistances
    .map((location) => ({
      ...location,
      compatible: isVehicleCompatible(location, vehicleTypeId),
    }))
    .sort((a, b) => a.distance - b.distance)
}

/**
 * @param {ReturnType<typeof rankParkingLocations>[0]} topPick
 * @returns {string[]}
 */
export function getRecommendationReasons(topPick) {
  if (!topPick || topPick.aiScore === 0) {
    return ['No compatible parking found for your current search criteria.']
  }

  const reasons = []

  if (topPick.breakdown.distanceScore >= 40) {
    reasons.push('Closest to destination')
  }

  if (topPick.breakdown.availabilityScore >= 30) {
    reasons.push('High slot availability')
  }

  if (topPick.breakdown.vehicleMatchScore === 100) {
    reasons.push('Compatible with your vehicle')
  }

  if (topPick.aiScore >= 50) {
    reasons.push('Better overall AI score')
  }

  if (topPick.status === 'free') {
    reasons.push('Free parking available')
  }

  if (reasons.length === 0) {
    reasons.push('Best match from overall AI analysis')
  }

  return reasons
}

/**
 * @param {import('../data/models').ParkingLocation[]} locations
 * @param {{ latitude: number, longitude: number, name?: string }} destination
 * @param {string} vehicleTypeId
 * @returns {{ ranked: ReturnType<typeof rankParkingLocations>, topPick: ReturnType<typeof rankParkingLocations>[0] | null, explanation: string, reasons: string[] }}
 */
export function getAIRecommendation(locations, destination, vehicleTypeId) {
  const ranked = rankParkingLocations(locations, vehicleTypeId, destination)
  const topPick = ranked.find((loc) => loc.aiScore > 0) || null
  const explanation = generateRecommendationExplanation(topPick, destination.name)
  const reasons = getRecommendationReasons(topPick)

  return { ranked, topPick, explanation, reasons }
}
