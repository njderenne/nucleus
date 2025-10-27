'use client'

import { useEffect } from 'react'
import { useHeader } from '@/contexts/HeaderContext'
import { usePathname } from 'next/navigation'

export default function HuntingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { setTabs, setActiveTab, setSearchPlaceholder, setOnSearch } = useHeader()
  const pathname = usePathname()

  useEffect(() => {
    setTabs([
      { id: 'map', label: 'Land Map', href: '/hobbies/hunting' },
      { id: 'stands', label: 'Stands', href: '/hobbies/hunting/stands' },
      { id: 'hunts', label: 'Hunt Logs', href: '/hobbies/hunting/hunts' },
      { id: 'cameras', label: 'Cameras', href: '/hobbies/hunting/cameras' },
      { id: 'plots', label: 'Food Plots', href: '/hobbies/hunting/plots' },
      { id: 'gallery', label: 'Gallery', href: '/hobbies/hunting/gallery' },
    ])

    if (pathname === '/hobbies/hunting') {
      setActiveTab('map')
    } else if (pathname?.includes('/stands')) {
      setActiveTab('stands')
    } else if (pathname?.includes('/hunts')) {
      setActiveTab('hunts')
    } else if (pathname?.includes('/cameras')) {
      setActiveTab('cameras')
    } else if (pathname?.includes('/plots')) {
      setActiveTab('plots')
    } else if (pathname?.includes('/gallery')) {
      setActiveTab('gallery')
    }

    setSearchPlaceholder('Search hunting data...')
    setOnSearch(() => (query: string) => {
      console.log('Searching hunting data for:', query)
    })

    return () => {
      setTabs([])
      setActiveTab(undefined)
      setSearchPlaceholder('Search...')
      setOnSearch(undefined)
    }
  }, [pathname, setTabs, setActiveTab, setSearchPlaceholder, setOnSearch])

  return <>{children}</>
}

