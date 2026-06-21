import { Star, MapPin, ParkingCircle, IndianRupee, Car, Gauge, CheckCircle } from 'lucide-react'
import { formatDistance } from '../../data/models'
import Card from '../ui/Card'

export default function AIRecommendation({ topPick, explanation, reasons = [] }) {
  if (!topPick) {
    return (
      <Card className="border-amber-500/30 bg-amber-500/5">
        <p className="text-sm text-amber-300">
          No AI recommendation available. Adjust your vehicle type or search a different area.
        </p>
      </Card>
    )
  }

  return (
    <Card highlight className="animate-slide-up relative overflow-hidden">
      <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[#22C55E]/10 blur-2xl" />

      <div className="relative flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-center gap-2">
          <Star className="h-6 w-6 fill-[#4ADE80] text-[#4ADE80]" />
          <h3 className="font-display text-xl font-bold text-[#F8FAFC]">⭐ AI Recommended Parking</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-[#22C55E]/20 px-3 py-1 text-sm font-bold text-[#4ADE80]">
            AI Score: {topPick.aiScore}/100
          </span>
        </div>
      </div>

      <h4 className="mt-4 font-display text-2xl font-bold text-[#F8FAFC]">{topPick.name}</h4>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-xl bg-[#07130D]/50 p-3">
          <div className="flex items-center gap-2 text-[#94A3B8]">
            <MapPin className="h-4 w-4" />
            <span className="text-xs">Distance</span>
          </div>
          <p className="mt-1 font-semibold text-[#F8FAFC]">{formatDistance(topPick.distance)}</p>
        </div>
        <div className="rounded-xl bg-[#07130D]/50 p-3">
          <div className="flex items-center gap-2 text-[#94A3B8]">
            <ParkingCircle className="h-4 w-4" />
            <span className="text-xs">Available Slots</span>
          </div>
          <p className="mt-1 font-semibold text-[#F8FAFC]">
            {topPick.availableSlots}/{topPick.totalSlots}
          </p>
        </div>
        <div className="rounded-xl bg-[#07130D]/50 p-3">
          <div className="flex items-center gap-2 text-[#94A3B8]">
            <IndianRupee className="h-4 w-4" />
            <span className="text-xs">Paid/Free</span>
          </div>
          <p className="mt-1 font-semibold capitalize text-[#F8FAFC]">{topPick.status}</p>
        </div>
        <div className="rounded-xl bg-[#07130D]/50 p-3">
          <div className="flex items-center gap-2 text-[#94A3B8]">
            <Gauge className="h-4 w-4" />
            <span className="text-xs">AI Breakdown</span>
          </div>
          <p className="mt-1 text-xs font-medium text-[#F8FAFC]">
            D:{topPick.breakdown.distanceScore} A:{topPick.breakdown.availabilityScore} V:
            {topPick.breakdown.vehicleMatchScore}
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 text-sm text-[#4ADE80]">
        <Car className="h-4 w-4" />
        <span>Vehicle compatible · {topPick.area}</span>
      </div>

      <div className="mt-6 rounded-xl border border-[#22C55E]/20 bg-[#07130D]/40 p-4">
        <p className="text-sm font-semibold text-[#F8FAFC]">Recommended because:</p>
        <ul className="mt-3 space-y-2">
          {reasons.map((reason) => (
            <li key={reason} className="flex items-start gap-2 text-sm text-[#94A3B8]">
              <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#4ADE80]" />
              {reason}
            </li>
          ))}
        </ul>
        {explanation && (
          <p className="mt-3 text-xs leading-relaxed text-[#94A3B8]">{explanation}</p>
        )}
      </div>
    </Card>
  )
}
