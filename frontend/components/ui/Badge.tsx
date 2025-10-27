import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const variantStyles = {
  default: 'bg-slate-700 text-slate-300',
  primary: 'bg-primary/20 text-primary border border-primary/30',
  success: 'bg-green-900/30 text-green-400 border border-green-800',
  warning: 'bg-yellow-900/30 text-yellow-400 border border-yellow-800',
  danger: 'bg-red-900/30 text-red-400 border border-red-800',
  info: 'bg-blue-900/30 text-blue-400 border border-blue-800',
}

const sizeStyles = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2 py-1 text-xs',
  lg: 'px-3 py-1.5 text-sm',
}

export default function Badge({ 
  children, 
  variant = 'default', 
  size = 'md',
  className 
}: BadgeProps) {
  return (
    <span className={cn(
      'inline-flex items-center rounded font-medium',
      variantStyles[variant],
      sizeStyles[size],
      className
    )}>
      {children}
    </span>
  )
}

