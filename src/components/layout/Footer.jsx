import { Car } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-[#22C55E]/20 bg-[#07130D]">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-[#94A3B8]">
          <Car className="h-4 w-4 text-[#4ADE80]" />
          <span className="text-sm">© {new Date().getFullYear()} ParkWise AI. Built for smarter urban parking.</span>
        </div>
        <p className="text-sm text-[#94A3B8]">Hackathon-grade smart parking platform · Chennai Demo Data</p>
      </div>
    </footer>
  )
}
