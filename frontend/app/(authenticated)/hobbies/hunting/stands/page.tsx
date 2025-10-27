'use client'

import { useState } from 'react'
import { Plus, Crosshair, MapPin, Calendar, Wind, Trees, Edit, Trash2 } from 'lucide-react'

interface Stand {
  id: string
  name: string
  type: 'Tree Stand' | 'Ground Blind' | 'Ladder Stand' | 'Box Blind'
  latitude: number
  longitude: number
  elevation?: number
  installDate: string
  lastHunted?: string
  totalHunts: number
  totalSightings: number
  bestWindDirection: string[]
  coverType: string
  notes: string
  active: boolean
}

const mockStands: Stand[] = [
  {
    id: '1',
    name: 'Oak Stand #1',
    type: 'Tree Stand',
    latitude: 40.7128,
    longitude: -74.0060,
    elevation: 450,
    installDate: '2023-09-15',
    lastHunted: '2024-01-10',
    totalHunts: 12,
    totalSightings: 8,
    bestWindDirection: ['NW', 'W'],
    coverType: 'Oak Ridge',
    notes: 'Great morning spot. Deer trail 30 yards to the east. Watch wind!',
    active: true
  },
  {
    id: '2',
    name: 'Creek Bottom Blind',
    type: 'Ground Blind',
    latitude: 40.7138,
    longitude: -74.0070,
    installDate: '2023-08-20',
    lastHunted: '2024-01-08',
    totalHunts: 18,
    totalSightings: 15,
    bestWindDirection: ['N', 'NE', 'E'],
    coverType: 'Creek Bottom',
    notes: 'Near water source. Excellent evening spot. Multiple trails converge here.',
    active: true
  },
  {
    id: '3',
    name: 'Old Pine Stand',
    type: 'Ladder Stand',
    latitude: 40.7148,
    longitude: -74.0080,
    elevation: 480,
    installDate: '2022-10-01',
    lastHunted: '2023-11-15',
    totalHunts: 8,
    totalSightings: 3,
    bestWindDirection: ['S', 'SW'],
    coverType: 'Pine Forest',
    notes: 'Needs brush trimming. Low activity this season.',
    active: false
  }
]

export default function StandsPage() {
  const [stands] = useState(mockStands)
  const [showInactive, setShowInactive] = useState(false)

  const displayStands = showInactive ? stands : stands.filter(s => s.active)
  const activeStands = stands.filter(s => s.active).length

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">Tree Stands & Blinds</h1>
          <p className="text-slate-400 text-sm mt-1">{activeStands} active locations</p>
        </div>
        <button className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-primary text-white px-4 py-3 rounded-lg hover:bg-primary-600 active:bg-primary-700 transition touch-manipulation">
          <Plus className="w-4 h-4" />
          <span>Add Stand</span>
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
        <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
          <p className="text-slate-400 text-sm">Active Stands</p>
          <p className="text-2xl font-bold text-white">{activeStands}</p>
        </div>
        <div className="bg-green-900/20 p-4 rounded-lg border border-green-800">
          <p className="text-green-400 text-sm">Success Rate</p>
          <p className="text-2xl font-bold text-white">67%</p>
        </div>
        <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-800">
          <p className="text-blue-400 text-sm">Total Hunts</p>
          <p className="text-2xl font-bold text-white">
            {stands.reduce((sum, s) => sum + s.totalHunts, 0)}
          </p>
        </div>
        <div className="bg-yellow-900/20 p-4 rounded-lg border border-yellow-800">
          <p className="text-yellow-400 text-sm">Sightings</p>
          <p className="text-2xl font-bold text-white">
            {stands.reduce((sum, s) => sum + s.totalSightings, 0)}
          </p>
        </div>
      </div>

      {/* Filter */}
      <div className="mb-4">
        <label className="flex items-center space-x-2 text-sm text-slate-400 cursor-pointer">
          <input
            type="checkbox"
            checked={showInactive}
            onChange={(e) => setShowInactive(e.target.checked)}
            className="w-4 h-4 rounded border-slate-600 bg-slate-700 text-primary"
          />
          <span>Show inactive stands</span>
        </label>
      </div>

      {/* Stands List */}
      <div className="space-y-4">
        {displayStands.map((stand) => (
          <div key={stand.id} className={`bg-slate-800/50 rounded-xl border p-5 ${
            stand.active ? 'border-slate-700' : 'border-slate-700 opacity-60'
          }`}>
            <div className="flex flex-col md:flex-row md:items-start gap-4">
              {/* Icon & Type */}
              <div className="flex items-start gap-4 flex-1">
                <div className="bg-red-600 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Crosshair className="w-6 h-6 text-white" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">{stand.name}</h3>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded">
                          {stand.type}
                        </span>
                        {!stand.active && (
                          <span className="text-xs bg-red-900/30 text-red-400 px-2 py-1 rounded border border-red-800">
                            Inactive
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                    <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-700">
                      <p className="text-xs text-slate-500 mb-1">LOCATION</p>
                      <p className="text-sm text-white flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        {stand.latitude.toFixed(4)}, {stand.longitude.toFixed(4)}
                      </p>
                      {stand.elevation && (
                        <p className="text-xs text-slate-400 mt-1">Elevation: {stand.elevation} ft</p>
                      )}
                    </div>

                    <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-700">
                      <p className="text-xs text-slate-500 mb-1">ACTIVITY</p>
                      <div className="space-y-1">
                        <p className="text-sm text-white">{stand.totalHunts} hunts, {stand.totalSightings} sightings</p>
                        {stand.lastHunted && (
                          <p className="text-xs text-slate-400">
                            Last: {new Date(stand.lastHunted).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-700">
                      <p className="text-xs text-slate-500 mb-1">BEST WIND</p>
                      <div className="flex items-center gap-1 flex-wrap">
                        <Wind className="w-3 h-3 text-blue-400" />
                        {stand.bestWindDirection.map(dir => (
                          <span key={dir} className="text-sm text-blue-400 font-medium">{dir}</span>
                        )).reduce((prev, curr) => <>{prev}, {curr}</>)}
                      </div>
                    </div>

                    <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-700">
                      <p className="text-xs text-slate-500 mb-1">COVER TYPE</p>
                      <p className="text-sm text-white flex items-center gap-1">
                        <Trees className="w-3 h-3 text-green-400" />
                        {stand.coverType}
                      </p>
                    </div>
                  </div>

                  {/* Notes */}
                  {stand.notes && (
                    <div className="bg-blue-900/10 border border-blue-800 rounded-lg p-3 mb-4">
                      <p className="text-xs text-blue-400 mb-1">NOTES</p>
                      <p className="text-sm text-slate-300">{stand.notes}</p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex flex-wrap gap-2">
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm">
                      Log Hunt Here
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm">
                      View on Map
                    </button>
                    <button className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition text-sm flex items-center gap-2">
                      <Edit className="w-4 h-4" />
                      Edit
                    </button>
                    <button className="px-4 py-2 text-red-400 hover:bg-red-900/20 rounded-lg transition text-sm flex items-center gap-2">
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {displayStands.length === 0 && (
        <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-12 text-center">
          <Crosshair className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <p className="text-slate-400">No stands found</p>
        </div>
      )}
    </div>
  )
}

