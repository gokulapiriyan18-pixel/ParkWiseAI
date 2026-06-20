import { Bot } from 'lucide-react'
import Button from '../ui/Button'

export default function ParkeyPromptDialog({ visible, onAskParkey, onDismiss }) {
  if (!visible) return null

  return (
    <div className="fixed inset-0 z-[9998] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-[#07130D]/80 backdrop-blur-sm animate-fade-in"
        onClick={onDismiss}
        aria-hidden="true"
      />
      <div
        className="relative w-full max-w-md animate-slide-up rounded-2xl border border-[#22C55E]/30 bg-[#0F1F17] p-6 shadow-[0_0_40px_rgba(34,197,94,0.2)]"
        role="dialog"
        aria-labelledby="parkey-prompt-title"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#22C55E] to-[#15803D] shadow-[0_0_20px_rgba(34,197,94,0.3)]">
            <Bot className="h-6 w-6 text-[#F8FAFC]" />
          </div>
          <h2 id="parkey-prompt-title" className="font-display text-xl font-bold text-[#F8FAFC]">
            🤖 Parkey
          </h2>
        </div>

        <p className="mt-4 text-base leading-relaxed text-[#94A3B8]">
          Too many choices?
          <br />
          Let Parkey find the best parking spot for you.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button type="button" className="flex-1" onClick={onAskParkey}>
            Ask Parkey
          </Button>
          <Button type="button" variant="secondary" className="flex-1" onClick={onDismiss}>
            Maybe Later
          </Button>
        </div>
      </div>
    </div>
  )
}
