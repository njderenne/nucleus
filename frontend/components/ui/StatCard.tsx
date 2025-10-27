import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StatCardProps {
  label: string
  value: string | number
  subtext?: string
  icon?: LucideIcon
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info'
  className?: string
}

const variantStyles = {
  default: 'bg-slate-800/50 border-slate-700',
  primary: 'bg-primary/10 border-primary/30 text-primary',
  success: 'bg-green-900/20 border-green-800 text-green-400',
  warning: 'bg-yellow-900/20 border-yellow-800 text-yellow-400',
  danger: 'bg-red-900/20 border-red-800 text-red-400',
  info: 'bg-blue-900/20 border-blue-800 text-blue-400',
}

export default function StatCard({ 
  label, 
  value, 
  subtext, 
  icon: Icon, 
  variant = 'default',
  className 
}: StatCardProps) {
  return (
    <div className={cn(
      'p-4 rounded-lg border',
      variantStyles[variant],
      className
    )}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className={cn(
            'text-sm mb-1',
            variant === 'default' ? 'text-slate-400' : ''
          )}>
            {label}
          </p>
          <p className="text-2xl md:text-3xl font-bold text-white">{value}</p>
          {subtext && (
            <p className={cn(
              'text-xs mt-1',
              variant === 'default' ? 'text-slate-500' : 'opacity-80'
            )}>
              {subtext}
            </p>
          )}
        </div>
        {Icon && (
          <Icon className={cn(
            'w-8 h-8',
            variant === 'default' ? 'text-slate-400' : ''
          )} />
        )}
      </div>
    </div>
  )
}

