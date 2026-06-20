export default function StatCard({ icon: Icon, label, value, suffix = '', trend, color = 'brand' }) {
  const colorClasses = {
    brand: 'from-[#22C55E]/20 to-[#15803D]/10 text-[#4ADE80]',
    accent: 'from-[#4ADE80]/20 to-[#22C55E]/10 text-[#4ADE80]',
    amber: 'from-amber-500/20 to-amber-600/5 text-amber-400',
    purple: 'from-[#15803D]/20 to-[#22C55E]/10 text-[#22C55E]',
  }

  return (
    <div className="group animate-fade-in rounded-2xl bg-slate-900/50 backdrop-blur-sm p-5 border border-emerald-500/20 transition-all hover:border-emerald-500/40 hover:shadow-[0_0_20px_rgba(34,197,94,0.12)]">
      <div className="flex items-start justify-between">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${colorClasses[color]}`}
        >
          <Icon className="h-5 w-5" />
        </div>
        {trend && <span className="text-xs font-medium text-[#4ADE80]">{trend}</span>}
      </div>
      <p className="mt-4 text-sm font-medium text-[#94A3B8]">{label}</p>
      <p className="mt-1 font-display text-3xl font-bold text-[#F8FAFC]">
        {value}
        {suffix && <span className="ml-1 text-lg font-semibold text-[#94A3B8]">{suffix}</span>}
      </p>
    </div>
  )
}
