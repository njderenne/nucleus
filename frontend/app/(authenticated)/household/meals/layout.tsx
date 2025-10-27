'use client'

import { useEffect } from 'react'
import { useHeader } from '@/contexts/HeaderContext'
import { usePathname } from 'next/navigation'

export default function MealsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { setTabs, setActiveTab, setSearchPlaceholder, setOnSearch } = useHeader()
  const pathname = usePathname()

  useEffect(() => {
    setTabs([
      { id: 'planner', label: 'Weekly Planner', href: '/household/meals' },
      { id: 'recipes', label: 'All Recipes', href: '/household/meals/recipes' },
      { id: 'make-now', label: 'Make Now', href: '/household/meals/make-now' },
      { id: 'ai', label: 'AI Suggestions', href: '/household/meals/ai' },
      { id: 'macro', label: 'Macro Planner', href: '/household/meals/macro' },
    ])

    if (pathname === '/household/meals') {
      setActiveTab('planner')
    } else if (pathname?.includes('/recipes')) {
      setActiveTab('recipes')
    } else if (pathname?.includes('/make-now')) {
      setActiveTab('make-now')
    } else if (pathname?.includes('/ai')) {
      setActiveTab('ai')
    } else if (pathname?.includes('/macro')) {
      setActiveTab('macro')
    }

    setSearchPlaceholder('Search meals and recipes...')
    setOnSearch(() => (query: string) => {
      console.log('Searching meals for:', query)
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

