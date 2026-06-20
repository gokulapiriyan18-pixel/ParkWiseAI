import { useParking } from '../../context/ParkingContext'
import ParkingCard from './ParkingCard'

export default function ParkingResults() {
  const { searchState, parkingResults, parkeyPanelOpen, aiResult } = useParking()

  if (!searchState.hasSearched) {
    return null
  }

  const recommendedId = parkeyPanelOpen ? aiResult.topPick?.id : null

  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-4 font-display text-lg font-semibold text-[#F8FAFC]">
          Parking Locations ({parkingResults.length})
        </h3>
        <div className="grid gap-4 lg:grid-cols-2">
          {parkingResults.map((location) => (
            <ParkingCard
              key={location.id}
              location={location}
              isRecommended={recommendedId === location.id}
              showAiScore={parkeyPanelOpen}
              aiScore={
                parkeyPanelOpen
                  ? aiResult.ranked.find((r) => r.id === location.id)?.aiScore ?? 0
                  : 0
              }
            />
          ))}
        </div>
      </div>
    </div>
  )
}
