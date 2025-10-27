import { LucideIcon, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PageHeaderProps {
  title: string
  description?: string
  actionLabel?: string
  actionIcon?: LucideIcon
  onAction?: () => void
  children?: React.ReactNode
  className?: string
}

export default function PageHeader({
  title,
  description,
  actionLabel,
  actionIcon: ActionIcon = Plus,
  onAction,
  children,
  className
}: PageHeaderProps) {
  return (
    <div className={cn('mb-6', className)}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex-1">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">{title}</h1>
          {description && (
            <p className="text-slate-400 text-sm">{description}</p>
          )}
        </div>
        {(actionLabel || children) && (
          <div className="w-full sm:w-auto">
            {children || (
              <button
                onClick={onAction}
                className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-primary text-white px-4 py-3 rounded-lg hover:bg-primary-600 active:bg-primary-700 transition touch-manipulation"
              >
                <ActionIcon className="w-4 h-4" />
                <span>{actionLabel}</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

