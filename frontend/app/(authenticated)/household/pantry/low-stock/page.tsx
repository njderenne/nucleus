'use client'

import { useState } from 'react'
import { AlertTriangle, ShoppingCart } from 'lucide-react'

const mockLowStockItems = [
  { id: '1', name: 'Rice', currentQty: 0.5, minQty: 2, unit: 'lbs', category: 'Grains', autoReorder: true },
  { id: '2', name: 'Olive Oil', currentQty: 0.2, minQty: 1, unit: 'bottle', category: 'Oils', autoReorder: false },
  { id: '3', name: 'Coffee', currentQty: 0, minQty: 1, unit: 'bag', category: 'Beverages', autoReorder: true },
]

export default function PantryLowStockPage() {
  const [items] = useState(mockLowStockItems)

  const criticalItems = items.filter(item => item.currentQty === 0)
  const lowItems = items.filter(item => item.currentQty > 0 && item.currentQty < item.minQty)

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-6">Low Stock Alerts</h1>

      <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6 mb-6">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-white font-medium mb-1">Stock Level Monitoring</p>
            <p className="text-slate-400 text-sm">
              Set minimum quantity thresholds for each item. We'll alert you when items run low and can automatically add them to your grocery list.
            </p>
          </div>
        </div>
      </div>

      {/* Critical - Out of Stock */}
      {criticalItems.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
            <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
            Out of Stock ({criticalItems.length})
          </h2>
          <div className="bg-red-900/20 border border-red-800 rounded-xl divide-y divide-red-800/50">
            {criticalItems.map((item) => (
              <div key={item.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-white font-medium">{item.name}</h3>
                      <span className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded">
                        {item.category}
                      </span>
                      {item.autoReorder && (
                        <span className="text-xs bg-green-900/30 text-green-400 px-2 py-1 rounded border border-green-800">
                          Auto-added to grocery list
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-red-400 mt-1">
                      Out of stock • Need {item.minQty} {item.unit}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-2 text-sm bg-primary text-white rounded hover:bg-primary-600 transition">
                      <ShoppingCart className="w-4 h-4" />
                    </button>
                    <button className="px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-700 rounded transition">
                      Update Stock
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Low Stock */}
      {lowItems.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
            <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
            Running Low ({lowItems.length})
          </h2>
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl divide-y divide-slate-700">
            {lowItems.map((item) => (
              <div key={item.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-white font-medium">{item.name}</h3>
                      <span className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded">
                        {item.category}
                      </span>
                    </div>
                    <div className="mt-2">
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-slate-400">
                          Current: <span className="text-yellow-400 font-medium">{item.currentQty}</span> {item.unit}
                        </span>
                        <span className="text-slate-600">•</span>
                        <span className="text-slate-400">
                          Min: {item.minQty} {item.unit}
                        </span>
                      </div>
                      {/* Progress Bar */}
                      <div className="w-48 h-2 bg-slate-700 rounded-full mt-2 overflow-hidden">
                        <div 
                          className="h-full bg-yellow-500 rounded-full"
                          style={{ width: `${(item.currentQty / item.minQty) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-2 text-sm bg-primary text-white rounded hover:bg-primary-600 transition flex items-center gap-2">
                      <ShoppingCart className="w-4 h-4" />
                      Add to List
                    </button>
                    <button className="px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-700 rounded transition">
                      Adjust Threshold
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {criticalItems.length === 0 && lowItems.length === 0 && (
        <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-12 text-center">
          <div className="w-16 h-16 bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-8 h-8 text-green-400" />
          </div>
          <h3 className="text-white font-semibold mb-2">All Stocked Up!</h3>
          <p className="text-slate-400">No items are running low at the moment.</p>
        </div>
      )}

      {/* Settings */}
      <div className="mt-6 bg-slate-800/50 rounded-xl border border-slate-700 p-6">
        <h3 className="text-white font-semibold mb-3">Low Stock Settings</h3>
        <div className="space-y-3">
          <label className="flex items-center space-x-3">
            <input type="checkbox" className="w-4 h-4 rounded border-slate-600 bg-slate-700 text-primary focus:ring-primary" defaultChecked />
            <span className="text-slate-300 text-sm">Automatically add out-of-stock items to grocery list</span>
          </label>
          <label className="flex items-center space-x-3">
            <input type="checkbox" className="w-4 h-4 rounded border-slate-600 bg-slate-700 text-primary focus:ring-primary" />
            <span className="text-slate-300 text-sm">Send email notifications for critical items</span>
          </label>
          <label className="flex items-center space-x-3">
            <input type="checkbox" className="w-4 h-4 rounded border-slate-600 bg-slate-700 text-primary focus:ring-primary" defaultChecked />
            <span className="text-slate-300 text-sm">Show dashboard widget for low stock alerts</span>
          </label>
        </div>
      </div>
    </div>
  )
}

