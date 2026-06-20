import { Brain, Camera, Building2, BarChart3 } from 'lucide-react'
import Card from '../ui/Card'

const futureItems = [
  {
    icon: Brain,
    title: 'Demand Prediction using Machine Learning',
    description: 'Forecast parking demand by time, events, and weather patterns across the city.',
  },
  {
    icon: Camera,
    title: 'Computer Vision Occupancy Detection',
    description: 'Camera-based slot detection for automated, real-time occupancy without manual updates.',
  },
  {
    icon: Building2,
    title: 'Smart City Integration',
    description: 'Connect with municipal APIs, traffic signals, and civic dashboards for unified mobility.',
  },
  {
    icon: BarChart3,
    title: 'Urban Mobility Analytics',
    description: 'Heatmaps and insights for planners to optimize parking infrastructure and reduce congestion.',
  },
]

export default function FutureScope() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 text-center">
          <span className="rounded-full border border-[#22C55E]/30 bg-[#22C55E]/10 px-4 py-1.5 text-sm font-medium text-[#4ADE80]">
            Future Scope
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold text-[#F8FAFC] sm:text-4xl">
            What&apos;s next for ParkWise AI
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-[#94A3B8]">
            Our roadmap extends beyond recommendations into predictive, vision-powered smart city parking.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {futureItems.map((item, index) => (
            <Card key={item.title} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#22C55E]/20 to-[#15803D]/20 text-[#4ADE80]">
                  <item.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-[#F8FAFC]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#94A3B8]">{item.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
