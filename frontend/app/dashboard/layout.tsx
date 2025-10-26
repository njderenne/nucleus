'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuthStore } from '@/lib/store'
import { Brain, Home, Calendar, DollarSign, Map, Camera, MessageSquare, LogOut, Menu } from 'lucide-react'
import { useState } from 'react'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const { user, isAuthenticated, clearAuth } = useAuthStore()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login')
    }
  }, [isAuthenticated, router])

  const handleLogout = () => {
    clearAuth()
    router.push('/')
  }

  if (!isAuthenticated()) {
    return null
  }

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Pantry', href: '/dashboard/pantry', icon: Home },
    { name: 'Calendar', href: '/dashboard/calendar', icon: Calendar },
    { name: 'Budget', href: '/dashboard/budget', icon: DollarSign },
    { name: 'Hunting', href: '/dashboard/hunting', icon: Map },
    { name: 'Photos', href: '/dashboard/photos', icon: Camera },
    { name: 'AI Assistant', href: '/dashboard/ai', icon: MessageSquare },
  ]

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-64 bg-slate-800 text-white transition-transform duration-300 ease-in-out`}>
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="p-6 border-b border-slate-700">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">Nucleus</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-slate-700 transition"
              >
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* User & Logout */}
          <div className="p-4 border-t border-slate-700">
            <div className="px-4 py-2 mb-2">
              <p className="text-sm font-medium">{user?.full_name || user?.email}</p>
              <p className="text-xs text-slate-400">{user?.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-slate-700 transition w-full text-left"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-slate-600 hover:text-slate-900"
          >
            <Menu className="w-6 h-6" />
          </button>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}

