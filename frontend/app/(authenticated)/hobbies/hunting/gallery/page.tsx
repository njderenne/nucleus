'use client'

import { useState } from 'react'
import { Plus, Camera, MapPin, Calendar, Filter, Image, Download, Trash2 } from 'lucide-react'

interface HuntingPhoto {
  id: string
  url: string
  thumbnail: string
  location: string
  locationType: 'Stand' | 'Camera' | 'Plot' | 'General'
  date: string
  time: string
  title?: string
  description?: string
  tags: string[]
  coordinates?: { lat: number; lng: number }
  cameraSettings?: {
    make?: string
    model?: string
    iso?: number
    focalLength?: string
  }
}

const mockPhotos: HuntingPhoto[] = [
  {
    id: '1',
    url: '🦌',
    thumbnail: '🦌',
    location: 'Oak Stand #1',
    locationType: 'Stand',
    date: '2024-01-15',
    time: '08:30',
    title: '8-Point Buck',
    description: 'Nice 8-point buck at 60 yards. Didn\'t present a shot but great to see him.',
    tags: ['Buck', 'Morning', 'Mature'],
    coordinates: { lat: 40.7128, lng: -74.0060 }
  },
  {
    id: '2',
    url: '🦌',
    thumbnail: '🦌',
    location: 'Creek Camera #1',
    locationType: 'Camera',
    date: '2024-01-14',
    time: '06:45',
    title: 'Dawn Activity',
    description: 'Bachelor group of 3 bucks traveling together',
    tags: ['Buck', 'Trail Cam', 'Group'],
    coordinates: { lat: 40.7138, lng: -74.0070 }
  },
  {
    id: '3',
    url: '🌱',
    thumbnail: '🌱',
    location: 'North Food Plot',
    locationType: 'Plot',
    date: '2024-01-10',
    time: '17:00',
    title: 'Food Plot Update',
    description: 'Heavy browsing on winter wheat. Deer are hammering this plot.',
    tags: ['Food Plot', 'Browsing', 'Evening'],
    coordinates: { lat: 40.7118, lng: -74.0050 }
  },
  {
    id: '4',
    url: '🦌',
    thumbnail: '🦌',
    location: 'Creek Camera #1',
    locationType: 'Camera',
    date: '2024-01-12',
    time: '19:30',
    title: 'Does at Dusk',
    description: 'Family group - doe with two fawns',
    tags: ['Doe', 'Fawn', 'Trail Cam', 'Evening'],
  },
  {
    id: '5',
    url: '🦃',
    thumbnail: '🦃',
    location: 'South Field',
    locationType: 'General',
    date: '2024-01-08',
    time: '14:00',
    title: 'Turkey Flock',
    description: 'Large flock of turkeys feeding in the field',
    tags: ['Turkey', 'Flock', 'Afternoon'],
  }
]

export default function GalleryPage() {
  const [photos] = useState(mockPhotos)
  const [selectedLocation, setSelectedLocation] = useState('All')
  const [selectedTag, setSelectedTag] = useState('All')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const locations = ['All', ...Array.from(new Set(photos.map(p => p.location)))]
  const allTags = ['All', ...Array.from(new Set(photos.flatMap(p => p.tags)))]

  const filteredPhotos = photos.filter(photo => {
    const matchesLocation = selectedLocation === 'All' || photo.location === selectedLocation
    const matchesTag = selectedTag === 'All' || photo.tags.includes(selectedTag)
    return matchesLocation && matchesTag
  })

  const getLocationColor = (type: string) => {
    switch (type) {
      case 'Stand': return 'bg-red-900/20 border-red-800 text-red-400'
      case 'Camera': return 'bg-blue-900/20 border-blue-800 text-blue-400'
      case 'Plot': return 'bg-green-900/20 border-green-800 text-green-400'
      default: return 'bg-slate-700 text-slate-300'
    }
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">Photo Gallery</h1>
          <p className="text-slate-400 text-sm mt-1">{photos.length} photos organized by location & date</p>
        </div>
        <button className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-primary text-white px-4 py-3 rounded-lg hover:bg-primary-600 active:bg-primary-700 transition touch-manipulation">
          <Plus className="w-4 h-4" />
          <span>Upload Photos</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6">
        <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-800">
          <p className="text-purple-400 text-sm">Total Photos</p>
          <p className="text-2xl font-bold text-white">{photos.length}</p>
        </div>
        <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-800">
          <p className="text-blue-400 text-sm">Trail Cam</p>
          <p className="text-2xl font-bold text-white">
            {photos.filter(p => p.locationType === 'Camera').length}
          </p>
        </div>
        <div className="bg-red-900/20 p-4 rounded-lg border border-red-800">
          <p className="text-red-400 text-sm">From Stands</p>
          <p className="text-2xl font-bold text-white">
            {photos.filter(p => p.locationType === 'Stand').length}
          </p>
        </div>
        <div className="bg-green-900/20 p-4 rounded-lg border border-green-800">
          <p className="text-green-400 text-sm">Food Plots</p>
          <p className="text-2xl font-bold text-white">
            {photos.filter(p => p.locationType === 'Plot').length}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-4 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="text-sm text-slate-400">FILTERS</span>
        </div>

        <div className="space-y-3">
          {/* Location Filter */}
          <div>
            <p className="text-xs text-slate-500 mb-2">Location</p>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {locations.map(loc => (
                <button
                  key={loc}
                  onClick={() => setSelectedLocation(loc)}
                  className={`px-3 py-1.5 rounded-lg text-sm whitespace-nowrap transition ${
                    selectedLocation === loc
                      ? 'bg-primary text-white'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  {loc}
                </button>
              ))}
            </div>
          </div>

          {/* Tag Filter */}
          <div>
            <p className="text-xs text-slate-500 mb-2">Tags</p>
            <div className="flex gap-2 flex-wrap">
              {allTags.slice(0, 8).map(tag => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-3 py-1.5 rounded-lg text-sm whitespace-nowrap transition ${
                    selectedTag === tag
                      ? 'bg-primary text-white'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* View Mode Toggle */}
      <div className="mb-4 flex justify-end">
        <div className="flex gap-1 bg-slate-800/50 p-1 rounded-lg border border-slate-700">
          <button
            onClick={() => setViewMode('grid')}
            className={`px-3 py-1.5 rounded text-sm transition ${
              viewMode === 'grid'
                ? 'bg-slate-700 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Grid
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`px-3 py-1.5 rounded text-sm transition ${
              viewMode === 'list'
                ? 'bg-slate-700 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            List
          </button>
        </div>
      </div>

      {/* Photo Grid */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {filteredPhotos.map((photo) => (
            <div key={photo.id} className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden hover:border-slate-600 transition group cursor-pointer">
              {/* Image */}
              <div className="aspect-square bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center text-6xl relative">
                {photo.thumbnail}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition">
                    <Image className="w-8 h-8 text-white" />
                  </div>
                </div>
                <span className={`absolute top-2 right-2 text-xs px-2 py-1 rounded border ${getLocationColor(photo.locationType)}`}>
                  {photo.locationType}
                </span>
              </div>

              {/* Info */}
              <div className="p-3">
                <h3 className="text-white font-medium text-sm mb-1 truncate">
                  {photo.title || 'Untitled'}
                </h3>
                <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                  <Calendar className="w-3 h-3" />
                  <span>{new Date(photo.date).toLocaleDateString()}</span>
                  <span>{photo.time}</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-slate-500">
                  <MapPin className="w-3 h-3" />
                  <span className="truncate">{photo.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* List View */
        <div className="space-y-3">
          {filteredPhotos.map((photo) => (
            <div key={photo.id} className="bg-slate-800/50 rounded-xl border border-slate-700 p-4 hover:border-slate-600 transition">
              <div className="flex gap-4">
                {/* Thumbnail */}
                <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-slate-700 to-slate-800 rounded-lg flex items-center justify-center text-4xl flex-shrink-0">
                  {photo.thumbnail}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-semibold mb-1">{photo.title || 'Untitled'}</h3>
                      <div className="flex items-center gap-3 text-sm text-slate-400 flex-wrap">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(photo.date).toLocaleDateString()} at {photo.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {photo.location}
                        </span>
                      </div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded border whitespace-nowrap ${getLocationColor(photo.locationType)}`}>
                      {photo.locationType}
                    </span>
                  </div>

                  {photo.description && (
                    <p className="text-sm text-slate-300 mb-2">{photo.description}</p>
                  )}

                  {/* Tags */}
                  <div className="flex items-center gap-2 flex-wrap mb-3">
                    {photo.tags.map(tag => (
                      <span key={tag} className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button className="px-3 py-1.5 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 transition">
                      View Full
                    </button>
                    <button className="px-3 py-1.5 bg-slate-700 text-white rounded text-xs hover:bg-slate-600 transition flex items-center gap-1">
                      <Download className="w-3 h-3" />
                      Save
                    </button>
                    <button className="px-3 py-1.5 text-slate-400 hover:text-red-400 text-xs">
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredPhotos.length === 0 && (
        <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-12 text-center">
          <Camera className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <p className="text-slate-400">No photos found</p>
        </div>
      )}

      {/* Upload Instructions */}
      <div className="mt-6 bg-blue-900/10 border border-blue-800 rounded-xl p-6">
        <h3 className="text-blue-400 font-semibold mb-3 flex items-center gap-2">
          <Camera className="w-5 h-5" />
          Photo Organization Tips
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-300">
          <div>
            <p className="font-semibold mb-2">📸 Best Practices:</p>
            <ul className="space-y-1 text-xs">
              <li>• Tag photos with location immediately</li>
              <li>• Add date/time for trail cam photos</li>
              <li>• Use descriptive titles (buck size, doe count, etc.)</li>
              <li>• Note weather and behavior observations</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold mb-2">🏷️ Useful Tags:</p>
            <ul className="space-y-1 text-xs">
              <li>• Buck, Doe, Fawn for deer</li>
              <li>• Morning, Evening, Night for time of day</li>
              <li>• Mature, Young for age estimation</li>
              <li>• Rut, Feeding, Bedding for activity</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

