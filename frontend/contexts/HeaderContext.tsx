'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface Tab {
  id: string
  label: string
  href: string
}

interface HeaderContextType {
  tabs: Tab[]
  activeTab: string | undefined
  searchPlaceholder: string
  setTabs: (tabs: Tab[]) => void
  setActiveTab: (tabId: string | undefined) => void
  setSearchPlaceholder: (placeholder: string) => void
  onSearch: ((query: string) => void) | undefined
  setOnSearch: (handler: ((query: string) => void) | undefined) => void
}

const HeaderContext = createContext<HeaderContextType | undefined>(undefined)

export function HeaderProvider({ children }: { children: ReactNode }) {
  const [tabs, setTabs] = useState<Tab[]>([])
  const [activeTab, setActiveTab] = useState<string | undefined>()
  const [searchPlaceholder, setSearchPlaceholder] = useState('Search...')
  const [onSearch, setOnSearch] = useState<((query: string) => void) | undefined>()

  return (
    <HeaderContext.Provider
      value={{
        tabs,
        activeTab,
        searchPlaceholder,
        setTabs,
        setActiveTab,
        setSearchPlaceholder,
        onSearch,
        setOnSearch,
      }}
    >
      {children}
    </HeaderContext.Provider>
  )
}

export function useHeader() {
  const context = useContext(HeaderContext)
  if (context === undefined) {
    throw new Error('useHeader must be used within a HeaderProvider')
  }
  return context
}

