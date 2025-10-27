import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ActionButtonProps {
  children: React.ReactNode
  onClick?: () => void
  icon?: LucideIcon
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  disabled?: boolean
  className?: string
}

const variantStyles = {
  primary: 'bg-primary text-white hover:bg-primary-600 active:bg-primary-700',
  secondary: 'bg-slate-700 text-white hover:bg-slate-600 active:bg-slate-500',
  success: 'bg-green-600 text-white hover:bg-green-700 active:bg-green-800',
  danger: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800',
  ghost: 'bg-transparent text-slate-300 hover:text-white hover:bg-slate-700 active:bg-slate-600',
}

const sizeStyles = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
}

export default function ActionButton({
  children,
  onClick,
  icon: Icon,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  className
}: ActionButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'flex items-center justify-center gap-2 rounded-lg transition touch-manipulation font-medium',
        variantStyles[variant],
        sizeStyles[size],
        fullWidth && 'w-full',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      {Icon && <Icon className="w-4 h-4" />}
      <span>{children}</span>
    </button>
  )
}

