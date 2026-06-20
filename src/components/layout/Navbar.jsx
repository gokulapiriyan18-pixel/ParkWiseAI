import { Link } from 'react-router-dom'
import { Car, MapPin } from 'lucide-react'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#22C55E]/20 bg-[#07130D]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="group flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#22C55E] to-[#15803D] shadow-[0_0_30px_rgba(34,197,94,0.25)] transition-transform group-hover:scale-105">
            <Car className="h-5 w-5 text-[#F8FAFC]" />
          </div>
          <div>
            <span className="font-display text-lg font-bold text-[#F8FAFC]">ParkWise AI</span>
            <p className="hidden text-xs text-[#94A3B8] sm:block">Find Smart. Park Smart. Drive Green.</p>
          </div>
        </Link>

        <nav className="flex items-center gap-2 sm:gap-4">
          <Link
            to="/"
            className="rounded-lg px-3 py-2 text-sm font-medium text-[#94A3B8] transition hover:bg-[#22C55E]/5 hover:text-[#F8FAFC]"
          >
            Home
          </Link>
          <Link
            to="/search"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#22C55E] to-[#16A34A] px-4 py-2.5 text-sm font-semibold text-[#F8FAFC] shadow-lg shadow-[0_0_20px_rgba(34,197,94,0.25)] transition hover:from-[#4ADE80] hover:to-[#22C55E]"
          >
            <MapPin className="h-4 w-4" />
            Find Parking
          </Link>
        </nav>
      </div>
    </header>
  )
}
