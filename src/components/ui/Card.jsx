export default function Card({ children, className = '', highlight = false, ...props }) {
  return (
    <div
      className={`rounded-2xl border bg-[#0F1F17] p-5 backdrop-blur-sm transition-all duration-300 ${
        highlight
          ? 'border-[#22C55E]/50 shadow-[0_0_30px_rgba(34,197,94,0.15)] ring-1 ring-[#22C55E]/30'
          : 'border-[#22C55E]/20 hover:border-[#22C55E]/30 hover:shadow-[0_0_30px_rgba(34,197,94,0.12)]'
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
