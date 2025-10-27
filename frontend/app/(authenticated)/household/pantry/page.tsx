'use client'

import { useState } from 'react'
import { Plus, Package, AlertCircle, TrendingDown } from 'lucide-react'

// This will be replaced with actual data from API
const mockCurrentInventory = [
  { id: '1', name: 'Milk', quantity: 2, unit: 'gallon', category: 'Dairy', location: 'Fridge', expiresIn: 5 },
  { id: '2', name: 'Eggs', quantity: 12, unit: 'count', category: 'Dairy', location: 'Fridge', expiresIn: 10 },
  { id: '3', name: 'Bread', quantity: 1, unit: 'loaf', category: 'Bakery', location: 'Pantry', expiresIn: 3 },
  { id: '4', name: 'Chicken Breast', quantity: 3, unit: 'lbs', category: 'Meat', location: 'Freezer', expiresIn: 30 },
  { id: '5', name: 'Rice', quantity: 0.5, unit: 'lbs', category: 'Grains', location: 'Pantry', expiresIn: 365 },
]

export default function PantryCurrentInventoryPage() {
  const [items] = useState(mockCurrentInventory)

  const stats = {
    totalItems: items.length,
    expiringSoon: items.filter(item => item.expiresIn <= 7).length,
    lowStock: items.filter(item => item.quantity < 1).length,
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-white">Current Inventory</h1>
        <button className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-primary text-white px-4 py-3 rounded-lg hover:bg-primary-600 active:bg-primary-700 transition touch-manipulation">
          <Plus className="w-4 h-4" />
          <span>Add Item</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6">
        <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Total Items</p>
              <p className="text-2xl font-bold text-white">{stats.totalItems}</p>
            </div>
            <Package className="w-8 h-8 text-blue-400" />
          </div>
        </div>

        <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Expiring Soon</p>
              <p className="text-2xl font-bold text-yellow-400">{stats.expiringSoon}</p>
            </div>
            <AlertCircle className="w-8 h-8 text-yellow-400" />
          </div>
        </div>

        <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Low Stock</p>
              <p className="text-2xl font-bold text-red-400">{stats.lowStock}</p>
            </div>
            <TrendingDown className="w-8 h-8 text-red-400" />
          </div>
        </div>

        <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Categories</p>
              <p className="text-2xl font-bold text-white">5</p>
            </div>
            <Package className="w-8 h-8 text-green-400" />
          </div>
        </div>
      </div>

      {/* Items List */}
      <div className="bg-slate-800/50 rounded-xl border border-slate-700">
        <div className="p-4 border-b border-slate-700">
          <h2 className="text-lg font-semibold text-white">Items in Stock</h2>
        </div>
        
        <div className="divide-y divide-slate-700">
          {items.map((item) => (
            <div key={item.id} className="p-4 hover:bg-slate-700/30 transition">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <h3 className="text-white font-medium">{item.name}</h3>
                    <span className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded">
                      {item.category}
                    </span>
                    {item.expiresIn <= 7 && (
                      <span className="text-xs bg-yellow-900/30 text-yellow-400 px-2 py-1 rounded border border-yellow-800">
                        Expires in {item.expiresIn} days
                      </span>
                    )}
                    {item.quantity < 1 && (
                      <span className="text-xs bg-red-900/30 text-red-400 px-2 py-1 rounded border border-red-800">
                        Low stock
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-400 mt-1">
                    {item.location} • {item.quantity} {item.unit}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="px-3 py-1 text-sm text-slate-300 hover:text-white hover:bg-slate-700 rounded transition">
                    Edit
                  </button>
                  <button className="px-3 py-1 text-sm text-slate-300 hover:text-white hover:bg-slate-700 rounded transition">
                    Use
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
