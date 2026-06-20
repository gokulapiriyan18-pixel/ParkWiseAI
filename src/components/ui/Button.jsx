const variants = {
  primary:
    'bg-gradient-to-r from-[#22C55E] to-[#16A34A] text-[#F8FAFC] shadow-lg shadow-[0_0_20px_rgba(34,197,94,0.25)] hover:from-[#4ADE80] hover:to-[#22C55E]',
  secondary:
    'bg-[#0F1F17] text-[#22C55E] border border-[#22C55E]/30 hover:bg-[#22C55E]/10 backdrop-blur-sm',
  success:
    'bg-gradient-to-r from-[#22C55E] to-[#16A34A] text-[#F8FAFC] shadow-lg shadow-[0_0_20px_rgba(34,197,94,0.2)] hover:from-[#4ADE80] hover:to-[#22C55E]',
  outline:
    'border-2 border-[#22C55E] text-[#4ADE80] hover:bg-[#22C55E]/10',
  ghost: 'text-[#94A3B8] hover:bg-[#22C55E]/5 hover:text-[#F8FAFC]',
  danger: 'bg-red-500/90 text-[#F8FAFC] hover:bg-red-500',
}

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  icon: Icon,
  ...props
}) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {Icon && <Icon className="h-4 w-4" />}
      {children}
    </button>
  )
}
