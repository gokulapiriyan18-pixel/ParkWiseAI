import { createContext, useContext, useState, useCallback, useMemo, useEffect } from 'react'
import { getInitialParkingLocations, computeDashboardStats } from '../data/models'
import { DEFAULT_DESTINATION_ID, getDestinationById } from '../data/constants'
import { getAIRecommendation, getParkingResultsForDisplay } from '../utils/aiRecommendation'
import Confetti from '../components/ui/Confetti'
import SuccessModal from '../components/ui/SuccessModal'

const ParkingContext = createContext(null)

const emptyAiResult = {
  ranked: [],
  topPick: null,
  explanation: '',
  reasons: [],
}

export function ParkingProvider({ children }) {
  const [locations, setLocations] = useState(() => getInitialParkingLocations())
  const [communityUpdates, setCommunityUpdates] = useState(0)
  const [notifications, setNotifications] = useState([])
  const [searchState, setSearchState] = useState({
    vehicleNumber: '',
    vehicleType: 'sedan',
    destination: DEFAULT_DESTINATION_ID,
    hasSearched: false,
  })
  const [aiResult, setAiResult] = useState(emptyAiResult)
  const [parkeyPanelOpen, setParkeyPanelOpen] = useState(false)
  const [parkeyPromptVisible, setParkeyPromptVisible] = useState(false)
  const [parkeyPromptDismissed, setParkeyPromptDismissed] = useState(false)
  const [confettiActive, setConfettiActive] = useState(false)
  const [successModal, setSuccessModal] = useState({ visible: false, title: '', message: '' })

  const parkingResults = useMemo(() => {
    if (!searchState.hasSearched) return []
    const destination = getDestinationById(searchState.destination)
    return getParkingResultsForDisplay(locations, destination, searchState.vehicleType)
  }, [locations, searchState.hasSearched, searchState.destination, searchState.vehicleType])

  const addNotification = useCallback((message, type = 'success') => {
    const id = Date.now()
    setNotifications((prev) => [...prev, { id, message, type }])
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id))
    }, 3500)
  }, [])

  const removeNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }, [])

  const updateSearchField = useCallback((field, value) => {
    setSearchState((prev) => ({ ...prev, [field]: value }))
  }, [])

  const findParking = useCallback(() => {
    setParkeyPanelOpen(false)
    setParkeyPromptVisible(false)
    setParkeyPromptDismissed(false)
    setAiResult(emptyAiResult)
    setSearchState((prev) => ({ ...prev, hasSearched: true }))
  }, [])

  useEffect(() => {
    if (!searchState.hasSearched) return
    setParkeyPanelOpen(false)
    setAiResult(emptyAiResult)
    setParkeyPromptDismissed(false)
    setParkeyPromptVisible(false)
  }, [searchState.destination, searchState.vehicleType])

  useEffect(() => {
    if (!searchState.hasSearched || !parkeyPanelOpen) return
    const destination = getDestinationById(searchState.destination)
    const result = getAIRecommendation(locations, destination, searchState.vehicleType)
    setAiResult(result)
  }, [locations, searchState.hasSearched, parkeyPanelOpen, searchState.destination, searchState.vehicleType])

  const askParkey = useCallback(() => {
    const destination = getDestinationById(searchState.destination)
    const result = getAIRecommendation(locations, destination, searchState.vehicleType)
    setAiResult(result)
    setParkeyPanelOpen(true)
    setParkeyPromptVisible(false)
    setParkeyPromptDismissed(true)
  }, [locations, searchState.destination, searchState.vehicleType])

  const dismissParkeyPrompt = useCallback(() => {
    setParkeyPromptVisible(false)
    setParkeyPromptDismissed(true)
  }, [])

  const showParkeyPrompt = useCallback(() => {
    if (!parkeyPromptDismissed && !parkeyPanelOpen) {
      setParkeyPromptVisible(true)
    }
  }, [parkeyPromptDismissed, parkeyPanelOpen])

  const openParkeyPanel = useCallback(() => {
    askParkey()
  }, [askParkey])

  const closeParkeyPanel = useCallback(() => {
    setParkeyPanelOpen(false)
  }, [])

  const selectedDestination = useMemo(
    () => getDestinationById(searchState.destination),
    [searchState.destination]
  )

  const markParkedHere = useCallback(
    (locationId) => {
      setLocations((prev) =>
        prev.map((loc) => {
          if (loc.id !== locationId) return loc
          if (loc.availableSlots <= 0) return loc
          return { ...loc, availableSlots: loc.availableSlots - 1 }
        })
      )
      setCommunityUpdates((count) => count + 1)
      addNotification('Thanks! Available slots updated. Community data refreshed.')
      // celebration + thank-you modal (UI-only, logic unchanged)
      setConfettiActive(true)
      setSuccessModal({
        visible: true,
        title: '🎉 Thank You!',
        message:
          "Your parking update helps other drivers find available parking faster.\nTogether we're building a smarter city.",
      })
      setTimeout(() => setConfettiActive(false), 3500)
    },
    [addNotification]
  )

  const markFull = useCallback(
    (locationId) => {
      setLocations((prev) =>
        prev.map((loc) => {
          if (loc.id !== locationId) return loc
          return { ...loc, availableSlots: 0 }
        })
      )
      setCommunityUpdates((count) => count + 1)
      addNotification('Parking marked as full. Other drivers will see this update.', 'warning')
      // show professional success modal (UI-only)
      setSuccessModal({
        visible: true,
        title: '✅ Update Recorded',
        message: 'This parking location has been marked as full.\nThank you for helping keep parking information accurate.',
      })
    },
    [addNotification]
  )

  const dashboardStats = useMemo(
    () => ({
      ...computeDashboardStats(locations),
      communityUpdates,
    }),
    [locations, communityUpdates]
  )

  const value = useMemo(
    () => ({
      locations,
      searchState,
      parkingResults,
      aiResult,
      parkeyPanelOpen,
      parkeyPromptVisible,
      parkeyPromptDismissed,
      notifications,
      confettiActive,
      successModal,
      dashboardStats,
      selectedDestination,
      updateSearchField,
      findParking,
      askParkey,
      dismissParkeyPrompt,
      showParkeyPrompt,
      openParkeyPanel,
      closeParkeyPanel,
      markParkedHere,
      markFull,
      closeSuccessModal: () => setSuccessModal({ visible: false, title: '', message: '' }),
      removeNotification,
    }),
    [
      locations,
      searchState,
      parkingResults,
      aiResult,
      parkeyPanelOpen,
      parkeyPromptVisible,
      parkeyPromptDismissed,
      notifications,
      confettiActive,
      successModal,
      dashboardStats,
      selectedDestination,
      updateSearchField,
      findParking,
      askParkey,
      dismissParkeyPrompt,
      showParkeyPrompt,
      openParkeyPanel,
      closeParkeyPanel,
      markParkedHere,
      markFull,
      removeNotification,
    ]
  )

  return (
    <ParkingContext.Provider value={value}>
      {children}
      <Confetti active={confettiActive} />
      <SuccessModal
        visible={successModal.visible}
        title={successModal.title}
        message={successModal.message}
        onClose={() => setSuccessModal({ visible: false, title: '', message: '' })}
      />
    </ParkingContext.Provider>
  )
}

export function useParking() {
  const context = useContext(ParkingContext)
  if (!context) {
    throw new Error('useParking must be used within ParkingProvider')
  }
  return context
}
