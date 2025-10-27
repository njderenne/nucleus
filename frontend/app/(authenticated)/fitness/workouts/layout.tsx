'use client'

import { useEffect } from 'react'
import { useHeader } from '@/contexts/HeaderContext'
import { usePathname } from 'next/navigation'

export default function WorkoutsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { setTabs, setActiveTab, setSearchPlaceholder, setOnSearch } = useHeader()
  const pathname = usePathname()

  useEffect(() => {
    setTabs([
      { id: 'schedule', label: 'Schedule', href: '/fitness/workouts' },
      { id: 'library', label: 'Exercise Library', href: '/fitness/workouts/library' },
      { id: 'templates', label: 'Templates', href: '/fitness/workouts/templates' },
    ])

    if (pathname === '/fitness/workouts') {
      setActiveTab('schedule')
    } else if (pathname?.includes('/library')) {
      setActiveTab('library')
    } else if (pathname?.includes('/templates')) {
      setActiveTab('templates')
    }

    setSearchPlaceholder('Search workouts...')
    setOnSearch(() => (query: string) => {
      console.log('Searching workouts for:', query)
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

