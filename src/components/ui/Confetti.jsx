import { useEffect } from 'react'

export default function Confetti({ active = false }) {
  useEffect(() => {
    // visibility and lifecycle are controlled by parent (auto-hide)
  }, [active])

  if (!active) return null

  const colors = ['#FF3B30', '#FF8A00', '#FFD700', '#FFC107', '#7CFC00', '#1E90FF']

  // Create more pieces to cover full viewport
  const pieces = Array.from({ length: 60 }).map((_, i) => {
    const left = Math.random() * 100
    const delay = (Math.random() * 0.4).toFixed(2) // small stagger
    // duration between 2.6 and 3.0 seconds
    const duration = (2.6 + Math.random() * 0.4).toFixed(2)
    const bg = colors[i % colors.length]
    const rotate = Math.round(Math.random() * 360)
    const size = 6 + Math.round(Math.random() * 12)

    return (
      <div
        key={i}
        className="confetti-piece"
        style={{
          left: `${left}vw`,
          background: bg,
          width: `${size}px`,
          height: `${Math.round(size * 0.6)}px`,
          transform: `rotate(${rotate}deg)`,
          animationDelay: `${delay}s`,
          animationDuration: `${duration}s`,
        }}
      />
    )
  })

  return <div className="confetti-root">{pieces}</div>
}
