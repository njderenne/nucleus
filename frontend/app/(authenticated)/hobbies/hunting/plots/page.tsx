'use client'

import { useState } from 'react'
import { Plus, Leaf, MapPin, Calendar, Shield, Activity, AlertTriangle } from 'lucide-react'

interface FoodPlot {
  id: string
  name: string
  size: number // acres
  latitude: number
  longitude: number
  plantingHistory: {
    year: number
    crop: string
    plantedDate: string
    notes: string
  }[]
  currentCrop?: string
  currentYear: number
  activities: {
    id: string
    date: string
    type: 'Planted' | 'Fenced' | 'Unfenced' | 'Mowed' | 'Fertilized' | 'Browsed' | 'Other'
    description: string
  }[]
  fenceStatus: 'None' | 'Fenced' | 'Removed'
  fencedDate?: string
  unfencedDate?: string
  lastMaintenance?: string
  notes: string
}

const mockPlots: FoodPlot[] = [
  {
    id: '1',
    name: 'North Food Plot',
    size: 1.5,
    latitude: 40.7118,
    longitude: -74.0050,
    currentCrop: 'Winter Wheat & Clover',
    currentYear: 2024,
    plantingHistory: [
      { year: 2024, crop: 'Winter Wheat & Clover', plantedDate: '2023-09-20', notes: 'Mixed with chicory for variety' },
      { year: 2023, crop: 'Soybeans', plantedDate: '2023-05-15', notes: 'Excellent growth, heavy browsing' }
    ],
    activities: [
      {
        id: 'a1',
        date: '2024-01-10',
        type: 'Browsed',
        description: 'Heavy deer activity - wheat browsed down significantly'
      },
      {
        id: 'a2',
        date: '2023-12-15',
        type: 'Unfenced',
        description: 'Removed fence to allow deer access for winter'
      },
      {
        id: 'a3',
        date: '2023-10-01',
        type: 'Fenced',
        description: 'Electric fence installed to protect young growth'
      },
      {
        id: 'a4',
        date: '2023-09-20',
        type: 'Planted',
        description: 'Planted winter wheat and clover mix. Spread 100 lbs seed.'
      }
    ],
    fenceStatus: 'Removed',
    fencedDate: '2023-10-01',
    unfencedDate: '2023-12-15',
    lastMaintenance: '2024-01-05',
    notes: 'Best producing plot. Deer love the clover mix.'
  },
  {
    id: '2',
    name: 'South Field Plot',
    size: 0.75,
    latitude: 40.7108,
    longitude: -74.0045,
    currentCrop: 'Turnips & Radish',
    currentYear: 2024,
    plantingHistory: [
      { year: 2024, crop: 'Turnips & Radish', plantedDate: '2023-08-15', notes: 'Late season plot' }
    ],
    activities: [
      {
        id: 'b1',
        date: '2024-01-12',
        type: 'Browsed',
        description: 'Deer completely cleaned out the plot - nothing left!'
      },
      {
        id: 'b2',
        date: '2023-11-20',
        type: 'Unfenced',
        description: 'Removed fence after frost to allow browsing'
      },
      {
        id: 'b3',
        date: '2023-08-15',
        type: 'Planted',
        description: 'Brassica mix for late season attraction'
      }
    ],
    fenceStatus: 'Removed',
    unfencedDate: '2023-11-20',
    notes: 'Small but effective. Turnips were a huge hit!'
  }
]

export default function FoodPlotsPage() {
  const [plots] = useState(mockPlots)

  const totalAcres = plots.reduce((sum, p) => sum + p.size, 0)
  const totalActivities = plots.reduce((sum, p) => sum + p.activities.length, 0)

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'Planted': return '🌱'
      case 'Fenced': return '🚧'
      case 'Unfenced': return '✂️'
      case 'Mowed': return '🚜'
      case 'Fertilized': return '💧'
      case 'Browsed': return '🦌'
      default: return '📝'
    }
  }

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'Planted': return 'bg-green-900/20 border-green-800 text-green-400'
      case 'Fenced': return 'bg-yellow-900/20 border-yellow-800 text-yellow-400'
      case 'Unfenced': return 'bg-blue-900/20 border-blue-800 text-blue-400'
      case 'Browsed': return 'bg-purple-900/20 border-purple-800 text-purple-400'
      default: return 'bg-slate-800/50 border-slate-700 text-slate-400'
    }
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">Food Plots</h1>
          <p className="text-slate-400 text-sm mt-1">Track plantings and deer activity</p>
        </div>
        <button className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-primary text-white px-4 py-3 rounded-lg hover:bg-primary-600 active:bg-primary-700 transition touch-manipulation">
          <Plus className="w-4 h-4" />
          <span>Add Food Plot</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6">
        <div className="bg-green-900/20 p-4 rounded-lg border border-green-800">
          <p className="text-green-400 text-sm">Total Plots</p>
          <p className="text-2xl font-bold text-white">{plots.length}</p>
        </div>
        <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-800">
          <p className="text-blue-400 text-sm">Total Acres</p>
          <p className="text-2xl font-bold text-white">{totalAcres.toFixed(1)}</p>
        </div>
        <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-800">
          <p className="text-purple-400 text-sm">Activities Logged</p>
          <p className="text-2xl font-bold text-white">{totalActivities}</p>
        </div>
        <div className="bg-yellow-900/20 p-4 rounded-lg border border-yellow-800">
          <p className="text-yellow-400 text-sm">Current Season</p>
          <p className="text-2xl font-bold text-white">2023-24</p>
        </div>
      </div>

      {/* Food Plots */}
      <div className="space-y-6">
        {plots.map((plot) => (
          <div key={plot.id} className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden">
            {/* Header */}
            <div className="p-5 bg-slate-800/30 border-b border-slate-700">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="bg-green-600 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Leaf className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">{plot.name}</h3>
                    <div className="flex items-center gap-3 text-sm text-slate-400 flex-wrap">
                      <span>{plot.size} acres</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {plot.latitude.toFixed(4)}, {plot.longitude.toFixed(4)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Fence Status */}
                <div className={`px-3 py-2 rounded-lg border text-sm font-medium ${
                  plot.fenceStatus === 'Fenced'
                    ? 'bg-yellow-900/20 border-yellow-800 text-yellow-400'
                    : plot.fenceStatus === 'Removed'
                    ? 'bg-green-900/20 border-green-800 text-green-400'
                    : 'bg-slate-700 text-slate-300'
                }`}>
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    <span>{plot.fenceStatus}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5">
              {/* Current Crop */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-green-900/10 border border-green-800 rounded-lg p-4">
                  <p className="text-xs text-green-400 mb-2">CURRENT CROP (2024)</p>
                  <p className="text-lg font-bold text-white mb-2">{plot.currentCrop}</p>
                  {plot.plantingHistory[0] && (
                    <div className="text-sm text-slate-300 space-y-1">
                      <p className="flex items-center gap-2">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        Planted: {new Date(plot.plantingHistory[0].plantedDate).toLocaleDateString()}
                      </p>
                      {plot.plantingHistory[0].notes && (
                        <p className="text-xs text-slate-400 italic">{plot.plantingHistory[0].notes}</p>
                      )}
                    </div>
                  )}
                </div>

                <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4">
                  <p className="text-xs text-slate-400 mb-2">FENCE TIMELINE</p>
                  <div className="space-y-2 text-sm">
                    {plot.fencedDate && (
                      <div className="flex items-center gap-2">
                        <span className="text-yellow-400">🚧</span>
                        <span className="text-slate-300">
                          Fenced: {new Date(plot.fencedDate).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                    {plot.unfencedDate && (
                      <div className="flex items-center gap-2">
                        <span className="text-green-400">✂️</span>
                        <span className="text-slate-300">
                          Opened: {new Date(plot.unfencedDate).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                    {!plot.fencedDate && !plot.unfencedDate && (
                      <p className="text-slate-500 italic">No fence activity</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Activity Timeline */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-white font-semibold flex items-center gap-2">
                    <Activity className="w-4 h-4 text-blue-400" />
                    Activity Timeline ({plot.activities.length})
                  </h4>
                  <button className="text-sm text-primary hover:text-primary-400">
                    + Add Activity
                  </button>
                </div>

                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {plot.activities.map((activity) => (
                    <div key={activity.id} className={`p-3 rounded-lg border ${getActivityColor(activity.type)}`}>
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">{getActivityIcon(activity.type)}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium text-sm">{activity.type}</span>
                            <span className="text-xs text-slate-500">
                              {new Date(activity.date).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-sm text-slate-300">{activity.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Planting History */}
              <div className="mb-4">
                <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-green-400" />
                  Planting History
                </h4>
                <div className="bg-slate-900/50 border border-slate-700 rounded-lg overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-800/50 border-b border-slate-700">
                      <tr>
                        <th className="p-3 text-left text-slate-400 font-medium">Year</th>
                        <th className="p-3 text-left text-slate-400 font-medium">Crop</th>
                        <th className="p-3 text-left text-slate-400 font-medium hidden sm:table-cell">Planted</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700">
                      {plot.plantingHistory.map((history) => (
                        <tr key={history.year} className="hover:bg-slate-700/30">
                          <td className="p-3 text-white">{history.year}</td>
                          <td className="p-3 text-slate-300">{history.crop}</td>
                          <td className="p-3 text-slate-400 hidden sm:table-cell">
                            {new Date(history.plantedDate).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Notes */}
              {plot.notes && (
                <div className="bg-blue-900/10 border border-blue-800 rounded-lg p-4 mb-4">
                  <p className="text-xs text-blue-400 mb-2">PLOT NOTES</p>
                  <p className="text-sm text-slate-300">{plot.notes}</p>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-wrap gap-2">
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm">
                  Log Activity
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm">
                  View on Map
                </button>
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition text-sm">
                  View Photos
                </button>
                <button className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition text-sm">
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Planning Tips */}
      <div className="mt-6 bg-green-900/10 border border-green-800 rounded-xl p-6">
        <h3 className="text-green-400 font-semibold mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          Food Plot Tips
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-green-300">
          <div>
            <p className="font-semibold mb-2">🌾 Planting Schedule:</p>
            <ul className="space-y-1 text-xs">
              <li>• Spring: Clover, chicory (April-May)</li>
              <li>• Summer: Soybeans, cowpeas (May-June)</li>
              <li>• Fall: Brassicas, wheat, oats (Aug-Sept)</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold mb-2">🚧 Fencing Strategy:</p>
            <ul className="space-y-1 text-xs">
              <li>• Fence plots until 4-6 weeks before season</li>
              <li>• Remove fence to create attraction</li>
              <li>• Monitor browsing pressure</li>
              <li>• Document fence dates for next year</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

