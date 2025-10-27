'use client'

import { useState } from 'react'
import { MapPin, Plus, Crosshair, Camera, Leaf, Eye, Navigation } from 'lucide-react'

interface MapLocation {
  id: string
  name: string
  type: 'stand' | 'camera' | 'plot' | 'sighting'
  latitude: number
  longitude: number
  color: string
}

const mockLocations: MapLocation[] = [
  { id: '1', name: 'Oak Stand #1', type: 'stand', latitude: 40.7128, longitude: -74.0060, color: 'red' },
  { id: '2', name: 'Creek Camera', type: 'camera', latitude: 40.7138, longitude: -74.0070, color: 'blue' },
  { id: '3', name: 'North Food Plot', type: 'plot', latitude: 40.7118, longitude: -74.0050, color: 'green' },
  { id: '4', name: 'Pine Stand #2', type: 'stand', latitude: 40.7148, longitude: -74.0080, color: 'red' },
]

export default function HuntingMapPage() {
  const [locations] = useState(mockLocations)
  const [selectedType, setSelectedType] = useState('all')

  const stats = {
    stands: locations.filter(l => l.type === 'stand').length,
    cameras: locations.filter(l => l.type === 'camera').length,
    plots: locations.filter(l => l.type === 'plot').length,
    totalHunts: 15,
  }

  const filteredLocations = selectedType === 'all' 
    ? locations 
    : locations.filter(l => l.type === selectedType)

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'stand': return Crosshair
      case 'camera': return Camera
      case 'plot': return Leaf
      case 'sighting': return Eye
      default: return MapPin
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'stand': return 'bg-red-600'
      case 'camera': return 'bg-blue-600'
      case 'plot': return 'bg-green-600'
      case 'sighting': return 'bg-yellow-600'
      default: return 'bg-slate-600'
    }
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">Land Map</h1>
          <p className="text-slate-400 text-sm mt-1">Visualize your hunting property</p>
        </div>
        <button className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-primary text-white px-4 py-3 rounded-lg hover:bg-primary-600 active:bg-primary-700 transition touch-manipulation">
          <Plus className="w-4 h-4" />
          <span>Add Location</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6">
        <div className="bg-red-900/20 p-4 rounded-lg border border-red-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-400 text-sm">Stands</p>
              <p className="text-2xl font-bold text-white">{stats.stands}</p>
            </div>
            <Crosshair className="w-8 h-8 text-red-400" />
          </div>
        </div>
        <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-400 text-sm">Cameras</p>
              <p className="text-2xl font-bold text-white">{stats.cameras}</p>
            </div>
            <Camera className="w-8 h-8 text-blue-400" />
          </div>
        </div>
        <div className="bg-green-900/20 p-4 rounded-lg border border-green-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-400 text-sm">Food Plots</p>
              <p className="text-2xl font-bold text-white">{stats.plots}</p>
            </div>
            <Leaf className="w-8 h-8 text-green-400" />
          </div>
        </div>
        <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-400 text-sm">Total Hunts</p>
              <p className="text-2xl font-bold text-white">{stats.totalHunts}</p>
            </div>
            <Eye className="w-8 h-8 text-purple-400" />
          </div>
        </div>
      </div>

      {/* Map View */}
      <div className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden mb-6">
        <div className="p-4 border-b border-slate-700 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Property Map</h2>
          <button className="text-sm text-primary hover:text-primary-400 flex items-center gap-2">
            <Navigation className="w-4 h-4" />
            Center Map
          </button>
        </div>
        
        {/* Map Placeholder */}
        <div className="h-96 md:h-[500px] bg-slate-900/50 relative flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-400 mb-2">Interactive map coming soon</p>
            <p className="text-sm text-slate-500">Will integrate with Mapbox for GPS mapping</p>
          </div>
          
          {/* Mock location markers */}
          {locations.map((loc, idx) => (
            <div
              key={loc.id}
              className="absolute"
              style={{
                left: `${20 + idx * 20}%`,
                top: `${30 + idx * 15}%`
              }}
            >
              <div className={`${getTypeColor(loc.type)} w-10 h-10 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition active:scale-95`}>
                {(() => {
                  const Icon = getTypeIcon(loc.type)
                  return <Icon className="w-5 h-5 text-white" />
                })()}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Legend & Filters */}
      <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-4 mb-6">
        <p className="text-slate-400 text-sm mb-3">FILTER BY TYPE</p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedType('all')}
            className={`px-4 py-2 rounded-lg text-sm transition touch-manipulation ${
              selectedType === 'all'
                ? 'bg-primary text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600 active:bg-slate-500'
            }`}
          >
            All Locations
          </button>
          <button
            onClick={() => setSelectedType('stand')}
            className={`px-3 py-2 rounded-lg text-sm transition flex items-center gap-2 touch-manipulation ${
              selectedType === 'stand'
                ? 'bg-red-600 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600 active:bg-slate-500'
            }`}
          >
            <Crosshair className="w-4 h-4" />
            <span className="hidden sm:inline">Stands</span>
          </button>
          <button
            onClick={() => setSelectedType('camera')}
            className={`px-3 py-2 rounded-lg text-sm transition flex items-center gap-2 touch-manipulation ${
              selectedType === 'camera'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600 active:bg-slate-500'
            }`}
          >
            <Camera className="w-4 h-4" />
            <span className="hidden sm:inline">Cameras</span>
          </button>
          <button
            onClick={() => setSelectedType('plot')}
            className={`px-3 py-2 rounded-lg text-sm transition flex items-center gap-2 touch-manipulation ${
              selectedType === 'plot'
                ? 'bg-green-600 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600 active:bg-slate-500'
            }`}
          >
            <Leaf className="w-4 h-4" />
            <span className="hidden sm:inline">Food Plots</span>
          </button>
        </div>
      </div>

      {/* Location List */}
      <div className="bg-slate-800/50 rounded-xl border border-slate-700">
        <div className="p-4 border-b border-slate-700">
          <h2 className="text-lg font-semibold text-white">
            Locations ({filteredLocations.length})
          </h2>
        </div>
        <div className="divide-y divide-slate-700">
          {filteredLocations.map((location) => {
            const Icon = getTypeIcon(location.type)
            
            return (
              <div key={location.id} className="p-4 hover:bg-slate-700/30 active:bg-slate-700/50 transition touch-manipulation">
                <div className="flex items-center gap-3 md:gap-4">
                  <div className={`${getTypeColor(location.type)} w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-medium">{location.name}</h3>
                    <p className="text-sm text-slate-400 capitalize">{location.type}</p>
                    <p className="text-xs text-slate-500 mt-1">
                      {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button className="px-3 py-2 text-sm bg-slate-700 text-white rounded hover:bg-slate-600 active:bg-slate-500 transition touch-manipulation">
                      View
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

