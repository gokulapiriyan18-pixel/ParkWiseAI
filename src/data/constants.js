export const VEHICLE_TYPES = [
  { id: 'two-wheeler', label: 'Two Wheeler', size: 'small' },
  { id: 'hatchback', label: 'Hatchback', size: 'compact' },
  { id: 'sedan', label: 'Sedan', size: 'medium' },
  { id: 'suv', label: 'SUV', size: 'large' },
  { id: 'minivan', label: 'Minivan', size: 'xlarge' },
  { id: 'commercial', label: 'Commercial Vehicle', size: 'commercial' },
]

export const VEHICLE_SIZE_ORDER = ['small', 'compact', 'medium', 'large', 'xlarge', 'commercial']

export {
  CHENNAI_DESTINATIONS,
  DEFAULT_DESTINATION_ID,
  getDestinationById,
  findDestination,
} from './destinations'
