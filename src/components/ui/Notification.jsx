import { CheckCircle, AlertTriangle, X } from 'lucide-react'

const styles = {
  success: 'border-[#22C55E]/30 bg-[#22C55E]/10 text-[#4ADE80]',
  warning: 'border-amber-500/30 bg-amber-500/10 text-amber-400',
  error: 'border-red-500/30 bg-red-500/10 text-red-400',
}

const icons = {
  success: CheckCircle,
  warning: AlertTriangle,
  error: AlertTriangle,
}

export default function NotificationToast({ notifications, onDismiss }) {
  if (notifications.length === 0) return null

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3">
      {notifications.map((notification) => {
        const Icon = icons[notification.type] || CheckCircle
        return (
          <div
            key={notification.id}
            className={`animate-slide-up flex max-w-sm items-start gap-3 rounded-xl border px-4 py-3 shadow-xl backdrop-blur-xl ${styles[notification.type] || styles.success}`}
          >
            <Icon className="mt-0.5 h-5 w-5 shrink-0" />
            <p className="flex-1 text-sm font-medium text-[#F8FAFC]">{notification.message}</p>
            <button
              onClick={() => onDismiss(notification.id)}
              className="shrink-0 rounded-lg p-1 transition hover:bg-[#22C55E]/10"
              aria-label="Dismiss notification"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )
      })}
    </div>
  )
}
