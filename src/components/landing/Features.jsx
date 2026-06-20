import { Brain, Car, Users, AlertTriangle } from 'lucide-react'
import Card from '../ui/Card'

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Recommendations',
    description:
      'Our Parkey AI engine scores parking spots using distance, availability, vehicle match, and free parking bonuses.',
    gradient: 'from-[#22C55E] to-[#15803D]',
  },
  {
    icon: Car,
    title: 'Vehicle-Aware Parking',
    description:
      'From two-wheelers to commercial vehicles — only see parking that fits your vehicle size and type.',
    gradient: 'from-[#4ADE80] to-[#16A34A]',
  },
  {
    icon: Users,
    title: 'Community Updates',
    description:
      'Drivers update slot availability in real time with "I Parked Here" and "Mark Full" actions.',
    gradient: 'from-[#15803D] to-[#22C55E]',
  },
  {
    icon: AlertTriangle,
    title: 'No-Parking Zone Awareness',
    description:
      'Red-highlighted restricted zones on the map help you avoid fines and emergency access areas.',
    gradient: 'from-red-500 to-orange-600',
  },
]

export default function Features() {
  return (
    <section id="features" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold text-[#F8FAFC] sm:text-4xl">
            Everything you need to park smarter
          </h2>
          <p className="mt-4 text-lg text-[#94A3B8]">
            Built for hackathon-grade demos with real-world urban parking scenarios in mind.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Card
              key={feature.title}
              className="animate-slide-up group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div
                className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.gradient} shadow-lg transition-transform group-hover:scale-110`}
              >
                <feature.icon className="h-6 w-6 text-[#F8FAFC]" />
              </div>
              <h3 className="font-display text-lg font-semibold text-[#F8FAFC]">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#94A3B8]">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
