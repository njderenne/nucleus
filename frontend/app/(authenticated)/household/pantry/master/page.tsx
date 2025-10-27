'use client'

import { useState } from 'react'
import { Plus, Search } from 'lucide-react'

// Master list includes ALL items ever purchased
const mockMasterList = [
  { id: '1', name: 'Milk', category: 'Dairy', lastPurchased: '2024-01-15', purchaseCount: 24 },
  { id: '2', name: 'Eggs', category: 'Dairy', lastPurchased: '2024-01-14', purchaseCount: 18 },
  { id: '3', name: 'Bread', category: 'Bakery', lastPurchased: '2024-01-16', purchaseCount: 30 },
  { id: '4', name: 'Chicken Breast', category: 'Meat', lastPurchased: '2024-01-10', purchaseCount: 15 },
  { id: '5', name: 'Rice', category: 'Grains', lastPurchased: '2024-01-05', purchaseCount: 6 },
  { id: '6', name: 'Pasta', category: 'Grains', lastPurchased: '2024-01-12', purchaseCount: 12 },
  { id: '7', name: 'Tomato Sauce', category: 'Canned', lastPurchased: '2024-01-08', purchaseCount: 20 },
  { id: '8', name: 'Olive Oil', category: 'Oils', lastPurchased: '2023-12-20', purchaseCount: 4 },
]

export default function PantryMasterListPage() {
  const [items] = useState(mockMasterList)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const categories = ['All', ...Array.from(new Set(items.map(item => item.category)))]
  
  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-white">Master Item List</h1>
        <button className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition">
          <Plus className="w-4 h-4" />
          <span>Add New Item</span>
        </button>
      </div>

      <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6 mb-6">
        <p className="text-slate-300 text-sm mb-4">
          Your master list contains all items you've ever purchased. Use this to quickly add items to your inventory or grocery list.
        </p>
        
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search items..."
              className="w-full pl-10 pr-4 py-2 bg-slate-900/50 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent placeholder:text-slate-500"
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 bg-slate-900/50 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map((item) => (
          <div key={item.id} className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 hover:border-slate-600 transition">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-white font-medium">{item.name}</h3>
                <span className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded inline-block mt-1">
                  {item.category}
                </span>
              </div>
            </div>
            
            <div className="text-sm text-slate-400 space-y-1">
              <p>Purchased {item.purchaseCount}x</p>
              <p>Last: {new Date(item.lastPurchased).toLocaleDateString()}</p>
            </div>

            <div className="flex gap-2 mt-4">
              <button className="flex-1 px-3 py-2 text-sm bg-primary text-white rounded hover:bg-primary-600 transition">
                Add to Inventory
              </button>
              <button className="px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-700 rounded transition">
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12 bg-slate-800/50 rounded-xl border border-slate-700">
          <p className="text-slate-400">No items found</p>
        </div>
      )}
    </div>
  )
}

