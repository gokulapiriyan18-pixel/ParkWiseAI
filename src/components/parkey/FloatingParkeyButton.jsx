import { Car } from 'lucide-react'
import { useParking } from '../../context/ParkingContext'

export default function FloatingParkeyButton({ onClick }) {
  const { searchState } = useParking()

  if (!searchState.hasSearched) return null

  return (
    <button
      type="button"
      onClick={onClick}
      className="group fixed right-4 top-20 z-[9990] flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#FFD700] to-[#FFC107] text-[#07130B] transition-all duration-300 hover:scale-105 active:scale-95 animate-parkey-float"
      aria-label="Ask Parkey"
    >
      {/* Warm golden blur overlay for strong glow */}
      <span className="pointer-events-none absolute inset-0 rounded-full bg-[#FFD700]/35 blur-xl opacity-70 transition-all duration-300 group-hover:opacity-95" />

      {/* Soft pulse layer */}
      <span className="pointer-events-none absolute inset-0 rounded-full bg-[#FFD700]/30 animate-parkey-pulse" />

      {/* Subtle border to give a premium edge */}
      <span className="pointer-events-none absolute inset-0 rounded-full border border-[#FFD700]/40" />

      <Car className="relative h-6 w-6 drop-shadow-[0_8px_18px_rgba(255,215,0,0.35)]" />

      <span
        className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg border border-[#FFD700]/30 bg-[#07130B] px-2 py-1 text-xs font-medium text-[#FFD700] opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100"
      >
        Ask Parkey
      </span>
    </button>
  )
}
