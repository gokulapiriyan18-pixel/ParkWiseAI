import { useEffect } from 'react'
import { X } from 'lucide-react'

export default function SuccessModal({ visible, title, message, onClose }) {
  useEffect(() => {
    if (!visible) return
    const handler = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [visible, onClose])

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#07130D]/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md rounded-2xl bg-[#0F1F17] p-6 shadow-[0_30px_60px_rgba(2,6,23,0.7)] animate-slide-up border border-[#22C55E]/10">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-xl font-bold text-[#F8FAFC]">{title}</h3>
            <p className="mt-2 text-sm text-[#94A3B8]">{message}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-[#94A3B8] transition hover:bg-[#22C55E]/10 hover:text-[#F8FAFC]"
            aria-label="Close success modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
