import { MapPin, ParkingCircle, Search } from 'lucide-react'
import { VEHICLE_TYPES, CHENNAI_DESTINATIONS } from '../../data/constants'
import { useParking } from '../../context/ParkingContext'
import Button from '../ui/Button'
import Card from '../ui/Card'

export default function SearchForm({ compact = false }) {
  const { searchState, updateSearchField, findParking } = useParking()

  const handleSubmit = (e) => {
    e.preventDefault()
    findParking()
  }

  return (
    <Card className={`animate-slide-up ${compact ? '' : 'mx-auto max-w-xl'}`}>
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#22C55E]/20 text-[#4ADE80]">
          <Search className="h-5 w-5" />
        </div>
        <div>
          <h2 className="font-display text-xl font-bold text-[#F8FAFC]">Parking Search</h2>
          <p className="text-sm text-[#94A3B8]">
            {compact ? 'Update your search' : 'Enter your details to find parking near your destination'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="vehicleNumber" className="mb-2 block text-sm font-medium text-[#94A3B8]">
            Vehicle Number
          </label>
          <div className="relative">
            <ParkingCircle className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#94A3B8]" />
            <input
              id="vehicleNumber"
              type="text"
              placeholder="e.g. TN 01 AB 1234"
              value={searchState.vehicleNumber}
              onChange={(e) => updateSearchField('vehicleNumber', e.target.value.toUpperCase())}
              className="w-full rounded-xl border border-[#22C55E]/20 bg-[#07130D]/50 py-3 pl-11 pr-4 text-[#F8FAFC] placeholder:text-[#94A3B8] focus:border-[#22C55E] focus:outline-none focus:ring-2 focus:ring-[#22C55E]/30"
            />
          </div>
        </div>

        <div>
          <label htmlFor="destination" className="mb-2 block text-sm font-medium text-[#94A3B8]">
            Destination
          </label>
          <div className="relative">
            <MapPin className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#94A3B8]" />
            <select
              id="destination"
              value={searchState.destination}
              onChange={(e) => updateSearchField('destination', e.target.value)}
              className="w-full appearance-none rounded-xl border border-[#22C55E]/20 bg-[#07130D]/50 py-3 pl-11 pr-4 text-[#F8FAFC] focus:border-[#22C55E] focus:outline-none focus:ring-2 focus:ring-[#22C55E]/30"
            >
              {CHENNAI_DESTINATIONS.map((place) => (
                <option key={place.id} value={place.id} className="bg-[#0F1F17]">
                  {place.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="vehicleType" className="mb-2 block text-sm font-medium text-[#94A3B8]">
            Vehicle Type
          </label>
          <select
            id="vehicleType"
            value={searchState.vehicleType}
            onChange={(e) => updateSearchField('vehicleType', e.target.value)}
            className="w-full rounded-xl border border-[#22C55E]/20 bg-[#07130D]/50 py-3 px-4 text-[#F8FAFC] focus:border-[#22C55E] focus:outline-none focus:ring-2 focus:ring-[#22C55E]/30"
          >
            {VEHICLE_TYPES.map((type) => (
              <option key={type.id} value={type.id} className="bg-[#0F1F17]">
                {type.label}
              </option>
            ))}
          </select>
        </div>

        <Button type="submit" size="lg" className="w-full" icon={MapPin}>
          Find Parking
        </Button>
      </form>
    </Card>
  )
}
