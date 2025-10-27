'use client'

import { useEffect } from 'react'
import { useHeader } from '@/contexts/HeaderContext'
import { usePathname } from 'next/navigation'

export default function ProgressLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { setTabs, setActiveTab, setSearchPlaceholder, setOnSearch } = useHeader()
  const pathname = usePathname()

  useEffect(() => {
    setTabs([
      { id: 'overview', label: 'Overview', href: '/fitness/progress' },
      { id: 'strength', label: 'Strength', href: '/fitness/progress/strength' },
      { id: 'cardio', label: 'Cardio', href: '/fitness/progress/cardio' },
      { id: 'body', label: 'Body Metrics', href: '/fitness/progress/body' },
      { id: 'records', label: 'Personal Records', href: '/fitness/progress/records' },
    ])

    if (pathname === '/fitness/progress') {
      setActiveTab('overview')
    } else if (pathname?.includes('/strength')) {
      setActiveTab('strength')
    } else if (pathname?.includes('/cardio')) {
      setActiveTab('cardio')
    } else if (pathname?.includes('/body')) {
      setActiveTab('body')
    } else if (pathname?.includes('/records')) {
      setActiveTab('records')
    }

    setSearchPlaceholder('Search progress logs...')
    setOnSearch(() => (query: string) => {
      console.log('Searching progress for:', query)
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

