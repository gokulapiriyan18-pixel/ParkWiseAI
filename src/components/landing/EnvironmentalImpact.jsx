import { Fuel, Cloud, Clock } from 'lucide-react'
import Card from '../ui/Card'

const impactStats = [
  {
    icon: Fuel,
    label: 'Fuel Saved',
    value: '1,240',
    suffix: 'L',
    description: 'Reduced idle search driving across Chennai sessions',
  },
  {
    icon: Cloud,
    label: 'CO₂ Reduced',
    value: '2.8',
    suffix: 'tons',
    description: 'Lower emissions from optimized parking routes',
  },
  {
    icon: Clock,
    label: 'Time Saved',
    value: '890',
    suffix: 'hrs',
    description: 'Less circling — faster spot discovery with AI',
  },
]

export default function EnvironmentalImpact() {
  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 text-center">
          <span className="rounded-full border border-[#22C55E]/30 bg-[#22C55E]/10 px-4 py-1.5 text-sm font-medium text-[#4ADE80]">
            Environmental Impact
          </span>
          <h2 className="mt-4 font-display text-2xl font-bold text-[#F8FAFC] sm:text-3xl">
            Smarter parking. Cleaner cities.
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-[#94A3B8]">
            AI-directed parking cuts unnecessary driving, fuel waste, and urban emissions.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {impactStats.map((stat, index) => (
            <Card
              key={stat.label}
              className="animate-slide-up text-center"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#22C55E]/20 to-[#15803D]/10 text-[#4ADE80]">
                <stat.icon className="h-6 w-6" />
              </div>
              <p className="mt-4 text-sm font-medium text-[#94A3B8]">{stat.label}</p>
              <p className="mt-1 font-display text-3xl font-bold text-[#F8FAFC]">
                {stat.value}
                <span className="ml-1 text-lg font-semibold text-[#94A3B8]">{stat.suffix}</span>
              </p>
              <p className="mt-2 text-xs leading-relaxed text-[#94A3B8]">{stat.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
