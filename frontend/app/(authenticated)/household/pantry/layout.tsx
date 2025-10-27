'use client'

import { useEffect } from 'react'
import { useHeader } from '@/contexts/HeaderContext'
import { usePathname } from 'next/navigation'

export default function PantryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { setTabs, setActiveTab, setSearchPlaceholder, setOnSearch } = useHeader()
  const pathname = usePathname()

  // Set up header tabs for all pantry pages
  useEffect(() => {
    setTabs([
      { id: 'current', label: 'Current Inventory', href: '/household/pantry' },
      { id: 'master', label: 'Master List', href: '/household/pantry/master' },
      { id: 'grocery', label: 'Grocery List', href: '/household/pantry/grocery' },
      { id: 'expiring', label: 'Expiring Soon', href: '/household/pantry/expiring' },
      { id: 'low-stock', label: 'Low Stock', href: '/household/pantry/low-stock' },
    ])

    // Set active tab based on current route
    if (pathname === '/household/pantry') {
      setActiveTab('current')
    } else if (pathname?.includes('/master')) {
      setActiveTab('master')
    } else if (pathname?.includes('/grocery')) {
      setActiveTab('grocery')
    } else if (pathname?.includes('/expiring')) {
      setActiveTab('expiring')
    } else if (pathname?.includes('/low-stock')) {
      setActiveTab('low-stock')
    }

    setSearchPlaceholder('Search pantry items...')
    setOnSearch(() => (query: string) => {
      console.log('Searching pantry for:', query)
      // Implement pantry search logic here
    })

    // Cleanup on unmount
    return () => {
      setTabs([])
      setActiveTab(undefined)
      setSearchPlaceholder('Search...')
      setOnSearch(undefined)
    }
  }, [pathname, setTabs, setActiveTab, setSearchPlaceholder, setOnSearch])

  return <>{children}</>
}

