import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles, MapPin } from 'lucide-react'
import Button from '../ui/Button'

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pb-20 pt-16 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(#22C55E 1px, transparent 1px), linear-gradient(90deg, #22C55E 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-[#22C55E]/20 blur-3xl" />
        <div className="absolute -right-32 top-20 h-96 w-96 rounded-full bg-[#4ADE80]/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-64 w-[600px] -translate-x-1/2 rounded-full bg-[#15803D]/15 blur-3xl" />
        <div
          className="absolute left-1/2 top-1/3 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.12)_0%,transparent_70%)]"
        />
        {/* Decorative large parking symbol (purely visual). */}
        <div
          aria-hidden="true"
          className="absolute -right-44 top-8 hidden sm:block pointer-events-none select-none z-0"
          style={{ WebkitTransform: 'translateZ(0)' }}
        >
          <span
            className="text-[400px] sm:text-[500px] md:text-[600px] leading-none opacity-[0.06] bg-gradient-to-r from-[#16a34a] to-[#b8860b] bg-clip-text text-transparent blur-sm"
            style={{ display: 'block', lineHeight: 0 }}
          >
            🅿
          </span>
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto max-w-4xl text-center">
          <div className="animate-fade-in mb-6 inline-flex items-center gap-2 rounded-full border border-[#22C55E]/30 bg-[#22C55E]/10 px-4 py-1.5 text-sm font-medium text-[#4ADE80]">
            <Sparkles className="h-4 w-4" />
            AI-Powered Urban Parking Intelligence
          </div>

          <h1 className="animate-slide-up font-display text-5xl font-extrabold tracking-tight text-[#F8FAFC] sm:text-6xl lg:text-7xl">
            ParkWise{' '}
            <span className="bg-gradient-to-r from-[#4ADE80] via-[#22C55E] to-[#15803D] bg-clip-text text-transparent">
              AI
            </span>
          </h1>

          <p className="animate-slide-up mt-6 text-xl font-medium text-[#94A3B8] sm:text-2xl" style={{ animationDelay: '0.1s' }}>
            Find Smart. Park Smart. Drive Green.
          </p>

          <p className="animate-slide-up mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[#94A3B8]" style={{ animationDelay: '0.2s' }}>
            Discover the most suitable parking spaces in Chennai with AI recommendations, vehicle-size
            compatibility, community-driven updates, and real-time map visualization.
          </p>

          <div className="animate-slide-up mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row" style={{ animationDelay: '0.3s' }}>
            <Link to="/search">
              <Button size="lg" icon={MapPin} className="min-w-[200px]">
                Find Parking
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <a href="#features">
              <Button variant="secondary" size="lg">
                Explore Features
              </Button>
            </a>
          </div>
        </div>

        <div className="animate-slide-up mx-auto mt-16 grid max-w-3xl grid-cols-3 gap-4 sm:gap-8" style={{ animationDelay: '0.4s' }}>
          {[
            { value: '10+', label: 'Parking Locations' },
            { value: 'AI', label: 'Smart Scoring' },
            { value: 'Live', label: 'Community Updates' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-[#22C55E]/20 bg-[#0F1F17] p-4 text-center shadow-[0_0_30px_rgba(34,197,94,0.08)] backdrop-blur-sm"
            >
              <p className="font-display text-2xl font-bold text-[#F8FAFC] sm:text-3xl">{stat.value}</p>
              <p className="mt-1 text-xs text-[#94A3B8] sm:text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
