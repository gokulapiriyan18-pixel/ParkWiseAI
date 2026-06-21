import { useEffect } from 'react'
import { Bot, X, Sparkles } from 'lucide-react'
import { useParking } from '../../context/ParkingContext'
import AIRecommendation from '../results/AIRecommendation'
import Card from '../ui/Card'

export default function ParkeyRecommendationPanel() {
  const { parkeyPanelOpen, closeParkeyPanel, aiResult } = useParking()

  useEffect(() => {
    if (!parkeyPanelOpen) return

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeParkeyPanel()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [parkeyPanelOpen, closeParkeyPanel])

  if (!parkeyPanelOpen) return null

  const { topPick, explanation, reasons } = aiResult

  return (
    <div className="fixed inset-0 z-[9999] flex items-start justify-center p-4 pt-6 sm:items-center">
      <div
        className="absolute inset-0 bg-[#07130D]/85 backdrop-blur-sm transition-opacity"
        onClick={closeParkeyPanel}
        aria-hidden="true"
      />
      <Card className="relative z-10 w-full max-w-3xl animate-slide-up overflow-hidden rounded-[2rem] border border-[#22C55E]/20 bg-[#0B1F16]/95 shadow-[0_40px_80px_rgba(0,0,0,0.45)] max-h-[85vh] overflow-y-auto overscroll-contain">
        <div className="flex h-full min-h-0 flex-col gap-6 p-6 sm:p-8">
          <div className="flex flex-col gap-4 items-start sm:flex-row sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="relative flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br from-[#22C55E] to-[#15803D] shadow-[0_0_35px_rgba(34,197,94,0.25)]">
                <Bot className="h-7 w-7 text-[#F8FAFC]" />
                <Sparkles className="absolute -right-1 -top-1 h-4 w-4 text-[#FACC15] animate-pulse-soft" />
              </div>
              <div>
                <h2 className="font-display text-2xl font-bold text-[#F8FAFC]">Parkey Recommendation</h2>
                <p className="mt-1 text-sm text-[#CBD5E1]">Your AI-selected best parking spot delivered in a premium modal.</p>
              </div>
            </div>
            <button
              type="button"
              onClick={closeParkeyPanel}
              className="flex-shrink-0 inline-flex h-12 w-12 items-center justify-center rounded-3xl border border-[#94A3B8]/20 bg-[#0F1F17] text-[#E2E8F0] transition hover:bg-[#22C55E]/10 hover:text-[#F8FAFC]"
              aria-label="Close Parkey modal"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="min-h-0 flex-1 pr-1">
            <AIRecommendation topPick={topPick} explanation={explanation} reasons={reasons} />
          </div>
        </div>
      </Card>
    </div>
  )
}
