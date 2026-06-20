import { MapPin, ParkingCircle, Percent, Users } from 'lucide-react'
import { useParking } from '../../context/ParkingContext'
import StatCard from '../ui/StatCard'

export default function DashboardStats() {
  const { dashboardStats } = useParking()
  const { totalLocations, totalAvailable, occupancyRate, communityUpdates } = dashboardStats

  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 text-center sm:text-left">
          <h2 className="font-display text-2xl font-bold text-[#F8FAFC] sm:text-3xl">Live Dashboard</h2>
          <p className="mt-2 text-[#94A3B8]">Real-time parking statistics across Chennai demo locations</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            icon={MapPin}
            label="Total Parking Locations"
            value={totalLocations}
            color="brand"
            trend="Chennai demo"
          />
          <StatCard
            icon={ParkingCircle}
            label="Available Slots"
            value={totalAvailable}
            suffix="slots"
            color="accent"
            trend="Live count"
          />
          <StatCard
            icon={Percent}
            label="Occupancy Rate"
            value={occupancyRate}
            suffix="%"
            color="amber"
            trend="City-wide"
          />
          <StatCard
            icon={Users}
            label="Community Updates"
            value={communityUpdates}
            color="purple"
            trend="This session"
          />
        </div>
      </div>
    </section>
  )
}
