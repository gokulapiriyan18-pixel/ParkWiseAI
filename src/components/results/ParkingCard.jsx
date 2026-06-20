import {
  MapPin,
  ParkingCircle,
  IndianRupee,
  Car,
  Star,
  CheckCircle,
  XCircle,
  Users,
  Ban,
} from 'lucide-react'
import { formatDistance, getAvailabilityStatus } from '../../data/models'
import { useParking } from '../../context/ParkingContext'
import Button from '../ui/Button'
import Card from '../ui/Card'

function StatusBadge({ status }) {
  const config = {
    available: { label: 'Available', className: 'bg-[#22C55E]/20 text-[#4ADE80]' },
    limited: { label: 'Limited', className: 'bg-amber-500/20 text-amber-400' },
    full: { label: 'Full', className: 'bg-red-500/20 text-red-400' },
  }
  const { label, className } = config[status]
  return <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${className}`}>{label}</span>
}

export default function ParkingCard({
  location,
  isRecommended = false,
  aiScore = 0,
  showAiScore = false,
}) {
  const { markParkedHere, markFull, searchState } = useParking()
  const availability = getAvailabilityStatus(location)
  const isCompatible = location.compatible ?? location.vehicleSupport.includes(searchState.vehicleType)

  return (
    <Card
      highlight={isRecommended}
      className={`animate-slide-up ${!isCompatible ? 'opacity-60' : ''}`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            {isRecommended && (
              <span className="inline-flex items-center gap-1 rounded-full bg-[#4ADE80]/20 px-2.5 py-0.5 text-xs font-bold text-[#4ADE80]">
                <Star className="h-3 w-3 fill-current" />
                AI Pick
              </span>
            )}
            <StatusBadge status={availability} />
            <span
              className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                location.status === 'free'
                  ? 'bg-[#22C55E]/20 text-[#4ADE80]'
                  : 'bg-[#15803D]/30 text-[#22C55E]'
              }`}
            >
              {location.status === 'free' ? 'Free' : 'Paid'}
            </span>
          </div>
          <h3 className="mt-2 font-display text-lg font-bold text-[#F8FAFC]">{location.name}</h3>
          <p className="text-sm text-[#94A3B8]">{location.area}</p>
        </div>

        {showAiScore && (
          <div className="text-right">
            <p className="font-display text-2xl font-bold text-[#4ADE80]">{aiScore}</p>
            <p className="text-xs text-[#94A3B8]">AI Score</p>
          </div>
        )}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="flex items-center gap-2 text-sm text-[#94A3B8]">
          <MapPin className="h-4 w-4 text-[#4ADE80]" />
          {location.distance != null ? formatDistance(location.distance) : '—'}
        </div>
        <div className="flex items-center gap-2 text-sm text-[#94A3B8]">
          <ParkingCircle className="h-4 w-4 text-[#22C55E]" />
          {location.availableSlots}/{location.totalSlots} slots
        </div>
        <div className="flex items-center gap-2 text-sm text-[#94A3B8]">
          <IndianRupee className="h-4 w-4 text-[#15803D]" />
          {location.status === 'free' ? 'Free parking' : 'Paid parking'}
        </div>
        <div className="flex items-center gap-2 text-sm">
          {isCompatible ? (
            <>
              <CheckCircle className="h-4 w-4 text-[#4ADE80]" />
              <span className="text-[#4ADE80]">Compatible</span>
            </>
          ) : (
            <>
              <XCircle className="h-4 w-4 text-red-400" />
              <span className="text-red-400">Incompatible</span>
            </>
          )}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <Button
          variant="success"
          size="sm"
          icon={Users}
          onClick={() => markParkedHere(location.id)}
          disabled={location.availableSlots === 0 || !isCompatible}
        >
          I Parked Here
        </Button>
        <Button
          variant="danger"
          size="sm"
          icon={Ban}
          onClick={() => markFull(location.id)}
          disabled={location.availableSlots === 0}
        >
          Mark Full
        </Button>
      </div>
    </Card>
  )
}
