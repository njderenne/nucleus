import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface InfoBannerProps {
  icon?: LucideIcon
  title?: string
  children: React.ReactNode
  variant?: 'info' | 'success' | 'warning' | 'danger'
  className?: string
}

const variantStyles = {
  info: 'bg-blue-900/20 border-blue-800 text-blue-300',
  success: 'bg-green-900/20 border-green-800 text-green-300',
  warning: 'bg-yellow-900/20 border-yellow-800 text-yellow-300',
  danger: 'bg-red-900/20 border-red-800 text-red-300',
}

const iconColors = {
  info: 'text-blue-400',
  success: 'text-green-400',
  warning: 'text-yellow-400',
  danger: 'text-red-400',
}

export default function InfoBanner({ 
  icon: Icon, 
  title, 
  children, 
  variant = 'info',
  className 
}: InfoBannerProps) {
  return (
    <div className={cn(
      'rounded-lg border p-4',
      variantStyles[variant],
      className
    )}>
      <div className="flex items-start gap-3">
        {Icon && (
          <Icon className={cn('w-5 h-5 flex-shrink-0 mt-0.5', iconColors[variant])} />
        )}
        <div className="flex-1">
          {title && (
            <p className="font-semibold mb-1">{title}</p>
          )}
          <div className="text-sm">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

