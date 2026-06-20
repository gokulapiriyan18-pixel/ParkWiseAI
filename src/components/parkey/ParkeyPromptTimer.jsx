import { useEffect } from 'react'
import { useParking } from '../../context/ParkingContext'

const PROMPT_DELAY_MS = 10000

export default function ParkeyPromptTimer() {
  const { searchState, parkeyPromptDismissed, parkeyPanelOpen, showParkeyPrompt } = useParking()

  useEffect(() => {
    if (!searchState.hasSearched || parkeyPromptDismissed || parkeyPanelOpen) return

    const timer = setTimeout(() => {
      showParkeyPrompt()
    }, PROMPT_DELAY_MS)

    return () => clearTimeout(timer)
  }, [searchState.hasSearched, parkeyPromptDismissed, parkeyPanelOpen, showParkeyPrompt])

  return null
}
