'use client'

import { useState, useRef, useEffect } from 'react'
import { Search, User, Settings, LogOut, ChevronDown } from 'lucide-react'
import { useAuthStore } from '@/lib/store'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useHeader } from '@/contexts/HeaderContext'

export default function Header() {
  const { tabs, activeTab, onSearch, searchPlaceholder } = useHeader()
  const router = useRouter()
  const { user, clearAuth } = useAuthStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery)
    }
  }

  const handleLogout = () => {
    clearAuth()
    router.push('/')
  }

  // Get user initials for avatar
  const getUserInitials = () => {
    if (user?.full_name) {
      return user.full_name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    }
    return user?.email?.[0]?.toUpperCase() || 'U'
  }

  return (
    <header className="bg-slate-800 border-b border-slate-700 sticky top-0 z-30">
      <div className="px-4 md:px-6 py-3 md:py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Tabs Section (Left) - Horizontal scroll on mobile */}
          <div className="flex-1 overflow-x-auto">
            <div className="flex items-center space-x-1 min-w-max">
              {tabs.length > 0 ? (
                tabs.map((tab) => (
                  <Link
                    key={tab.id}
                    href={tab.href}
                    className={`px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-medium transition whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'bg-slate-700 text-white'
                        : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                    }`}
                  >
                    {tab.label}
                  </Link>
                ))
              ) : (
                <div className="h-10" /> // Spacer when no tabs
              )}
            </div>
          </div>

          {/* Search Bar & Profile Section (Right) */}
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Search Bar - Hidden on small mobile, visible on tablet+ */}
            <form onSubmit={handleSearch} className="relative hidden md:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={searchPlaceholder}
                  className="w-48 lg:w-64 pl-10 pr-4 py-2 bg-slate-900/50 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent placeholder:text-slate-500 text-sm"
                />
              </div>
            </form>

            {/* Search Icon Button (Mobile only) */}
            <button className="md:hidden p-2 text-slate-400 hover:text-white">
              <Search className="w-5 h-5" />
            </button>

            {/* Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-9 h-9 md:w-10 md:h-10 bg-primary rounded-full flex items-center justify-center text-white text-xs md:text-sm font-medium hover:bg-primary-600 transition active:scale-95"
                title={user?.full_name || user?.email || 'Profile'}
              >
                {getUserInitials()}
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-slate-800 border border-slate-700 rounded-lg shadow-2xl py-2 z-50">
                  {/* User Info */}
                  <div className="px-4 py-3 border-b border-slate-700">
                    <p className="text-sm font-medium text-white">
                      {user?.full_name || 'User'}
                    </p>
                    <p className="text-xs text-slate-400">
                      {user?.email || 'guest@nucleus.app'}
                    </p>
                  </div>

                  {/* Menu Items */}
                  <Link
                    href="/profile"
                    className="flex items-center space-x-3 px-4 py-3 hover:bg-slate-700 transition text-slate-300 hover:text-white"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <User className="w-4 h-4" />
                    <span className="text-sm">Profile</span>
                  </Link>

                  <Link
                    href="/settings"
                    className="flex items-center space-x-3 px-4 py-3 hover:bg-slate-700 transition text-slate-300 hover:text-white"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <Settings className="w-4 h-4" />
                    <span className="text-sm">Settings</span>
                  </Link>

                  <div className="border-t border-slate-700 my-2"></div>

                  <button
                    onClick={() => {
                      setDropdownOpen(false)
                      handleLogout()
                    }}
                    className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-slate-700 transition text-slate-300 hover:text-red-400"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm">Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

