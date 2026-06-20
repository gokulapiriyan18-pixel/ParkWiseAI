import { Routes, Route } from 'react-router-dom'
import { ParkingProvider, useParking } from './context/ParkingContext'
import NotificationToast from './components/ui/Notification'
import LandingPage from './pages/LandingPage'
import SearchPage from './pages/SearchPage'

function AppContent() {
  const { notifications, removeNotification } = useParking()

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
      <NotificationToast notifications={notifications} onDismiss={removeNotification} />
    </>
  )
}

export default function App() {
  return (
    <ParkingProvider>
      <AppContent />
    </ParkingProvider>
  )
}
