import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import SearchForm from '../components/search/SearchForm'
import ParkeyRecommendationPanel from '../components/parkey/ParkeyRecommendationPanel'
import ParkeyPromptDialog from '../components/parkey/ParkeyPromptDialog'
import ParkeyPromptTimer from '../components/parkey/ParkeyPromptTimer'
import FloatingParkeyButton from '../components/parkey/FloatingParkeyButton'
import ParkingResults from '../components/results/ParkingResults'
import ParkingMap from '../components/map/ParkingMap'
import DashboardStats from '../components/dashboard/DashboardStats'
import { useParking } from '../context/ParkingContext'

export default function SearchPage() {
  const {
    searchState,
    parkeyPromptVisible,
    askParkey,
    dismissParkeyPrompt,
    openParkeyPanel,
  } = useParking()

  return (
    <div className="min-h-screen bg-[#07130D]">
      <Navbar />
      <ParkeyPromptTimer />
      <ParkeyPromptDialog
        visible={parkeyPromptVisible}
        onAskParkey={askParkey}
        onDismiss={dismissParkeyPrompt}
      />
      <FloatingParkeyButton onClick={openParkeyPanel} />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {!searchState.hasSearched ? (
          <div className="mx-auto max-w-2xl">
            <div className="mb-8 text-center">
              <h1 className="font-display text-3xl font-bold text-[#F8FAFC] sm:text-4xl">
                Find Your Perfect Spot
              </h1>
              <p className="mt-2 text-[#94A3B8]">
                Enter your vehicle and destination to explore parking options across Chennai
              </p>
            </div>
            <SearchForm />
          </div>
        ) : (
          <>
            <div className="mb-8">
              <h1 className="font-display text-3xl font-bold text-[#F8FAFC] sm:text-4xl">
                Find Your Perfect Spot
              </h1>
              <p className="mt-2 text-[#94A3B8]">
                Explore parking on the map — ask Parkey when you want an AI recommendation
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-12">
              <div className="space-y-6 lg:col-span-4">
                <SearchForm compact />
                <ParkeyRecommendationPanel />
              </div>

              <div className="space-y-6 lg:col-span-8">
                <ParkingMap />
                <ParkingResults />
              </div>
            </div>

            <div className="mt-12">
              <DashboardStats />
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  )
}
