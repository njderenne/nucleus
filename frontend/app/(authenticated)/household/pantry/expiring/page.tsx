'use client'

import { useState } from 'react'
import { AlertCircle, Calendar, Trash2 } from 'lucide-react'

const mockExpiringItems = [
  { id: '1', name: 'Bread', expiresIn: 2, expiryDate: '2024-01-18', quantity: 1, unit: 'loaf', category: 'Bakery', location: 'Pantry' },
  { id: '2', name: 'Milk', expiresIn: 5, expiryDate: '2024-01-21', quantity: 1, unit: 'gallon', category: 'Dairy', location: 'Fridge' },
  { id: '3', name: 'Yogurt', expiresIn: 7, expiryDate: '2024-01-23', quantity: 4, unit: 'cups', category: 'Dairy', location: 'Fridge' },
  { id: '4', name: 'Strawberries', expiresIn: 3, expiryDate: '2024-01-19', quantity: 1, unit: 'container', category: 'Produce', location: 'Fridge' },
]

export default function PantryExpiringPage() {
  const [items] = useState(mockExpiringItems)

  const criticalItems = items.filter(item => item.expiresIn <= 3)
  const soonItems = items.filter(item => item.expiresIn > 3 && item.expiresIn <= 7)

  const getExpiryColor = (days: number) => {
    if (days <= 2) return 'text-red-400 bg-red-900/20 border-red-800'
    if (days <= 5) return 'text-yellow-400 bg-yellow-900/20 border-yellow-800'
    return 'text-orange-400 bg-orange-900/20 border-orange-800'
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-6">Expiring Soon</h1>

      {/* Info Banner */}
      <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6 mb-6">
        <div className="flex items-start space-x-3">
          <Calendar className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-white font-medium mb-1">Reduce Food Waste</p>
            <p className="text-slate-400 text-sm">
              Use items approaching their expiration date first. We'll send you reminders and suggest recipes to help you use them up!
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-red-900/20 border border-red-800 p-4 rounded-lg">
          <p className="text-red-400 text-sm mb-1">Expires in 1-3 days</p>
          <p className="text-3xl font-bold text-white">{criticalItems.length}</p>
        </div>
        <div className="bg-yellow-900/20 border border-yellow-800 p-4 rounded-lg">
          <p className="text-yellow-400 text-sm mb-1">Expires in 4-7 days</p>
          <p className="text-3xl font-bold text-white">{soonItems.length}</p>
        </div>
        <div className="bg-green-900/20 border border-green-800 p-4 rounded-lg">
          <p className="text-green-400 text-sm mb-1">Total savings</p>
          <p className="text-3xl font-bold text-white">$0</p>
          <p className="text-xs text-green-400 mt-1">From preventing waste</p>
        </div>
      </div>

      {/* Critical Items (1-3 days) */}
      {criticalItems.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white flex items-center">
              <AlertCircle className="w-5 h-5 text-red-400 mr-2" />
              Use Immediately ({criticalItems.length})
            </h2>
            <button className="text-sm text-primary hover:text-primary-400">
              Get Recipe Ideas
            </button>
          </div>
          <div className="space-y-3">
            {criticalItems.map((item) => (
              <div key={item.id} className={`p-4 rounded-lg border ${getExpiryColor(item.expiresIn)}`}>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-white font-medium">{item.name}</h3>
                      <span className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded">
                        {item.category}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded font-medium ${
                        item.expiresIn === 1 ? 'bg-red-600 text-white' : ''
                      }`}>
                        {item.expiresIn === 1 ? 'Expires tomorrow!' : `${item.expiresIn} days left`}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-sm">
                      <span className="text-slate-300">
                        {item.quantity} {item.unit}
                      </span>
                      <span className="text-slate-500">•</span>
                      <span className="text-slate-300">{item.location}</span>
                      <span className="text-slate-500">•</span>
                      <span className="text-slate-300">
                        Expires {new Date(item.expiryDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-2 text-sm bg-white/10 text-white rounded hover:bg-white/20 transition">
                      Mark as Used
                    </button>
                    <button className="px-3 py-2 text-sm text-slate-400 hover:text-white hover:bg-slate-700 rounded transition">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Soon Items (4-7 days) */}
      {soonItems.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
            <Calendar className="w-5 h-5 text-yellow-400 mr-2" />
            Coming Up ({soonItems.length})
          </h2>
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl divide-y divide-slate-700">
            {soonItems.map((item) => (
              <div key={item.id} className="p-4 hover:bg-slate-700/30 transition">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-white font-medium">{item.name}</h3>
                      <span className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded">
                        {item.category}
                      </span>
                      <span className="text-xs text-yellow-400">
                        {item.expiresIn} days
                      </span>
                    </div>
                    <p className="text-sm text-slate-400 mt-1">
                      {item.quantity} {item.unit} • {item.location} • {new Date(item.expiryDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-700 rounded transition">
                      Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {criticalItems.length === 0 && soonItems.length === 0 && (
        <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-12 text-center">
          <div className="w-16 h-16 bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-8 h-8 text-green-400" />
          </div>
          <h3 className="text-white font-semibold mb-2">Nothing Expiring Soon!</h3>
          <p className="text-slate-400">Your pantry is looking fresh. Keep up the good work!</p>
        </div>
      )}

      {/* Tips */}
      <div className="mt-6 bg-blue-900/20 border border-blue-800 rounded-lg p-6">
        <h3 className="text-white font-semibold mb-3 flex items-center">
          <span className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-2 text-sm">💡</span>
          Pro Tips
        </h3>
        <ul className="space-y-2 text-sm text-blue-300">
          <li>• First In, First Out (FIFO): Always use older items before newer ones</li>
          <li>• Freeze items that are close to expiring if you can't use them immediately</li>
          <li>• Plan meals around items that expire soon</li>
          <li>• Check expiration dates when adding items to your pantry</li>
        </ul>
      </div>
    </div>
  )
}
