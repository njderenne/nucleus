import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface EmptyStateProps {
  icon?: LucideIcon
  title: string
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
  className?: string
}

export default function EmptyState({ 
  icon: Icon, 
  title, 
  description, 
  action,
  className 
}: EmptyStateProps) {
  return (
    <div className={cn(
      'bg-slate-800/50 rounded-xl border border-slate-700 p-8 md:p-12 text-center',
      className
    )}>
      {Icon && (
        <div className="w-16 h-16 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon className="w-8 h-8 text-slate-500" />
        </div>
      )}
      <h3 className="text-white font-semibold mb-2">{title}</h3>
      {description && (
        <p className="text-slate-400 text-sm mb-4">{description}</p>
      )}
      {action && (
        <button
          onClick={action.onClick}
          className="mt-4 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-600 transition"
        >
          {action.label}
        </button>
      )}
    </div>
  )
}

