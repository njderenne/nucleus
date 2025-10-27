import { cn } from '@/lib/utils'

interface CardProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'bordered' | 'elevated'
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

const variantStyles = {
  default: 'bg-slate-800/50 border border-slate-700',
  bordered: 'bg-slate-800/50 border-2 border-slate-600',
  elevated: 'bg-slate-800/50 border border-slate-700 shadow-lg',
}

const paddingStyles = {
  none: '',
  sm: 'p-4',
  md: 'p-5 md:p-6',
  lg: 'p-6 md:p-8',
}

export default function Card({ 
  children, 
  className,
  variant = 'default',
  padding = 'md'
}: CardProps) {
  return (
    <div className={cn(
      'rounded-xl',
      variantStyles[variant],
      paddingStyles[padding],
      className
    )}>
      {children}
    </div>
  )
}

interface CardHeaderProps {
  children: React.ReactNode
  className?: string
}

export function CardHeader({ children, className }: CardHeaderProps) {
  return (
    <div className={cn('p-4 border-b border-slate-700', className)}>
      {children}
    </div>
  )
}

interface CardContentProps {
  children: React.ReactNode
  className?: string
}

export function CardContent({ children, className }: CardContentProps) {
  return (
    <div className={cn('p-4 md:p-5', className)}>
      {children}
    </div>
  )
}

