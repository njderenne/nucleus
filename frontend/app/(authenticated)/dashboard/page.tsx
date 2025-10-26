'use client'

import { useAuthStore } from '@/lib/store'
import { Home, Calendar, DollarSign, Map, Camera, Brain } from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  const user = useAuthStore((state) => state.user)

  const modules = [
    {
      name: 'Pantry',
      description: 'Track your food inventory and expiration dates',
      icon: Home,
      href: '/household/pantry',
      color: 'bg-green-500',
    },
    {
      name: 'Meals',
      description: 'Plan meals and get recipe suggestions',
      icon: Calendar,
      href: '/household/meals',
      color: 'bg-emerald-500',
    },
    {
      name: 'Calendar',
      description: 'View and manage your schedule',
      icon: Calendar,
      href: '/calendar',
      color: 'bg-blue-500',
    },
    {
      name: 'Budget',
      description: 'Track expenses and manage finances',
      icon: DollarSign,
      href: '/finance/budget',
      color: 'bg-teal-500',
    },
    {
      name: 'Hunting',
      description: 'Track locations and sightings',
      icon: Map,
      href: '/hobbies/hunting',
      color: 'bg-orange-500',
    },
    {
      name: 'Photos',
      description: 'Organize and view your photo gallery',
      icon: Camera,
      href: '/hobbies/photos',
      color: 'bg-purple-500',
    },
    {
      name: 'AI Assistant',
      description: 'Chat with your intelligent assistant',
      icon: Brain,
      href: '/ai',
      color: 'bg-indigo-500',
    },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Welcome back, {user?.full_name || 'User'}!
        </h1>
        <p className="text-slate-300">
          Your life&apos;s operating system is ready. Choose a module to get started.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-slate-800/50 rounded-xl p-6 shadow-sm border border-slate-700">
          <p className="text-slate-300 text-sm font-medium mb-1">Pantry Items</p>
          <p className="text-3xl font-bold text-white">0</p>
        </div>
        <div className="bg-slate-800/50 rounded-xl p-6 shadow-sm border border-slate-700">
          <p className="text-slate-300 text-sm font-medium mb-1">This Month&apos;s Spending</p>
          <p className="text-3xl font-bold text-white">$0</p>
        </div>
        <div className="bg-slate-800/50 rounded-xl p-6 shadow-sm border border-slate-700">
          <p className="text-slate-300 text-sm font-medium mb-1">Total Photos</p>
          <p className="text-3xl font-bold text-white">0</p>
        </div>
      </div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module) => (
          <Link
            key={module.name}
            href={module.href}
            className="bg-slate-800/50 rounded-xl p-6 shadow-sm border border-slate-700 hover:border-slate-600 hover:shadow-md transition group"
          >
            <div className={`${module.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition`}>
              <module.icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">{module.name}</h3>
            <p className="text-slate-300 text-sm">{module.description}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

