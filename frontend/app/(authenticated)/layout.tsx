'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuthStore } from '@/lib/store'
import { Brain, Home, Calendar, DollarSign, Map, Camera, MessageSquare, LogOut, Menu, ChevronLeft, ChevronRight, ChevronDown, Palette, LayoutDashboard } from 'lucide-react'
import { useState } from 'react'

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const { user, isAuthenticated, clearAuth } = useAuthStore()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [expandedSections, setExpandedSections] = useState<string[]>([])

  // Temporarily disabled for development without backend
  // useEffect(() => {
  //   if (!isAuthenticated()) {
  //     router.push('/login')
  //   }
  // }, [isAuthenticated, router])

  const handleLogout = () => {
    clearAuth()
    router.push('/')
  }

  // Temporarily disabled for development without backend
  // if (!isAuthenticated()) {
  //   return null
  // }

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? [] // Close if already open
        : [sectionId] // Open only this one (accordion behavior)
    )
  }

  const navigationStructure = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: LayoutDashboard,
      standalone: true
    },
    {
      id: 'household',
      name: 'Household',
      icon: Home,
      subItems: [
        { name: 'Pantry', href: '/household/pantry', icon: Home },
        { name: 'Meals', href: '/household/meals', icon: Calendar },
      ]
    },
    {
      id: 'finance',
      name: 'Finance',
      icon: DollarSign,
      subItems: [
        { name: 'Budget', href: '/finance/budget', icon: DollarSign },
      ]
    },
    {
      id: 'hobbies',
      name: 'Hobbies',
      icon: Palette,
      subItems: [
        { name: 'Hunting', href: '/hobbies/hunting', icon: Map },
        { name: 'Photography', href: '/hobbies/photos', icon: Camera },
      ]
    },
    {
      name: 'Calendar',
      href: '/calendar',
      icon: Calendar,
      standalone: true
    },
    {
      name: 'AI Assistant',
      href: '/ai',
      icon: MessageSquare,
      standalone: true
    },
  ]

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className={`${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 ${
        sidebarCollapsed ? 'w-20' : 'w-64'
      } bg-slate-800 text-white transition-all duration-300 ease-in-out`}>
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="p-6 border-b border-slate-700 flex items-center justify-between">
            <div className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'space-x-2'}`}>
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                <Brain className="w-6 h-6 text-white" />
              </div>
              {!sidebarCollapsed && <span className="text-xl font-bold">Nucleus</span>}
            </div>
            
            {/* Collapse Button (Desktop only) */}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="hidden lg:flex items-center justify-center p-2 rounded-lg hover:bg-slate-700 transition text-slate-400 hover:text-white"
              title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {sidebarCollapsed ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <ChevronLeft className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navigationStructure.map((item) => {
              // Standalone menu items (no sub-items)
              if (item.standalone) {
                return (
                  <Link
                    key={item.name}
                    href={item.href!}
                    className={`flex items-center ${
                      sidebarCollapsed ? 'justify-center' : 'space-x-3'
                    } px-4 py-3 rounded-lg hover:bg-slate-700 transition group relative`}
                    title={sidebarCollapsed ? item.name : ''}
                  >
                    <item.icon className="w-5 h-5 flex-shrink-0" />
                    {!sidebarCollapsed && <span>{item.name}</span>}
                    
                    {/* Tooltip for collapsed state */}
                    {sidebarCollapsed && (
                      <div className="absolute left-full ml-2 px-3 py-2 bg-slate-700 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
                        {item.name}
                      </div>
                    )}
                  </Link>
                )
              }

              // Category with sub-items
              const isExpanded = expandedSections.includes(item.id!)
              
              return (
                <div key={item.id}>
                  {/* Category Header */}
                  <button
                    onClick={() => !sidebarCollapsed && toggleSection(item.id!)}
                    className={`w-full flex items-center ${
                      sidebarCollapsed ? 'justify-center' : 'justify-between'
                    } px-4 py-3 rounded-lg hover:bg-slate-700 transition group relative`}
                    title={sidebarCollapsed ? item.name : ''}
                  >
                    <div className={`flex items-center ${sidebarCollapsed ? '' : 'space-x-3'}`}>
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      {!sidebarCollapsed && <span className="font-medium">{item.name}</span>}
                    </div>
                    
                    {!sidebarCollapsed && (
                      <ChevronDown 
                        className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                      />
                    )}
                    
                    {/* Tooltip for collapsed state */}
                    {sidebarCollapsed && (
                      <div className="absolute left-full ml-2 px-3 py-2 bg-slate-700 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
                        {item.name}
                        <div className="text-xs text-slate-400 mt-1">
                          {item.subItems?.map(sub => sub.name).join(', ')}
                        </div>
                      </div>
                    )}
                  </button>

                  {/* Sub-items */}
                  {!sidebarCollapsed && isExpanded && (
                    <div className="ml-4 mt-1 space-y-1">
                      {item.subItems?.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-slate-700/50 transition text-slate-300 hover:text-white text-sm"
                        >
                          <subItem.icon className="w-4 h-4 flex-shrink-0" />
                          <span>{subItem.name}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </nav>

          {/* User & Logout */}
          <div className="p-4 border-t border-slate-700">
            {!sidebarCollapsed && (
              <div className="px-4 py-2 mb-2">
                <p className="text-sm font-medium truncate">{user?.full_name || user?.email || 'User'}</p>
                <p className="text-xs text-slate-400 truncate">{user?.email || 'guest@nucleus.app'}</p>
              </div>
            )}
            <button
              onClick={handleLogout}
              className={`flex items-center ${
                sidebarCollapsed ? 'justify-center' : 'space-x-3'
              } px-4 py-3 rounded-lg hover:bg-slate-700 transition w-full text-left group relative`}
              title={sidebarCollapsed ? 'Logout' : ''}
            >
              <LogOut className="w-5 h-5 flex-shrink-0" />
              {!sidebarCollapsed && <span>Logout</span>}
              
              {/* Tooltip for collapsed state */}
              {sidebarCollapsed && (
                <div className="absolute left-full ml-2 px-3 py-2 bg-slate-700 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
                  Logout
                </div>
              )}
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
      <div className="flex-1 flex flex-col min-h-screen bg-slate-900">
        {/* Top bar */}
        <header className="bg-slate-800 border-b border-slate-700 px-6 py-4 lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-slate-300 hover:text-white"
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

