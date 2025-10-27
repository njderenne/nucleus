'use client'

import { useMemo } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { Calendar, Clock, MapPin, Eye, Wind, Thermometer, CloudRain, Sun } from 'lucide-react'
import { PageHeader, StatCard, ResponsiveTable, Badge, Card, InfoBanner } from '@/components/ui'
import { formatDate } from '@/lib/utils'

interface Hunt {
  id: string
  date: string
  startTime: string
  endTime: string
  location: string
  locationType: 'Stand' | 'Ground' | 'Stalk'
  weather: {
    condition: 'Clear' | 'Cloudy' | 'Rain' | 'Snow'
    temp: number
    windDirection: string
    windSpeed: number
  }
  sightings: number
  harvest: boolean
  notes: string
}

const mockHunts: Hunt[] = [
  {
    id: '1',
    date: '2024-01-15',
    startTime: '06:00',
    endTime: '10:30',
    location: 'Oak Stand #1',
    locationType: 'Stand',
    weather: { condition: 'Clear', temp: 28, windDirection: 'NW', windSpeed: 5 },
    sightings: 4,
    harvest: false,
    notes: 'Perfect conditions. Deer very active.'
  },
  {
    id: '2',
    date: '2024-01-12',
    startTime: '15:30',
    endTime: '18:45',
    location: 'Ground Hunt - South Field',
    locationType: 'Ground',
    weather: { condition: 'Cloudy', temp: 35, windDirection: 'E', windSpeed: 8 },
    sightings: 2,
    harvest: false,
    notes: 'Wind was tricky. Deer spooked.'
  },
  {
    id: '3',
    date: '2024-01-08',
    startTime: '06:30',
    endTime: '11:00',
    location: 'Creek Bottom Blind',
    locationType: 'Stand',
    weather: { condition: 'Rain', temp: 42, windDirection: 'NE', windSpeed: 12 },
    sightings: 0,
    harvest: false,
    notes: 'No sightings due to rain.'
  },
  {
    id: '4',
    date: '2024-01-05',
    startTime: '07:00',
    endTime: '12:00',
    location: 'Oak Stand #1',
    locationType: 'Stand',
    weather: { condition: 'Clear', temp: 32, windDirection: 'W', windSpeed: 6 },
    sightings: 6,
    harvest: true,
    notes: 'Harvested 8-point buck at 08:15. Great hunt!'
  },
]

export default function HuntLogsPage() {
  const hunts = mockHunts

  // Stats
  const stats = {
    totalHunts: hunts.length,
    totalSightings: hunts.reduce((sum, h) => sum + h.sightings, 0),
    totalHarvest: hunts.filter(h => h.harvest).length,
    avgDuration: Math.round(hunts.reduce((sum, h) => {
      const start = new Date(`2000-01-01T${h.startTime}`)
      const end = new Date(`2000-01-01T${h.endTime}`)
      return sum + (end.getTime() - start.getTime()) / (1000 * 60)
    }, 0) / hunts.length)
  }

  // Table columns for desktop
  const columns = useMemo<ColumnDef<Hunt>[]>(
    () => [
      {
        accessorKey: 'date',
        header: 'Date',
        cell: ({ getValue }) => (
          <div>
            <p className="text-white font-medium">{formatDate(getValue() as string)}</p>
            <p className="text-xs text-slate-500">
              {hunts.find(h => h.date === getValue())?.startTime} - {hunts.find(h => h.date === getValue())?.endTime}
            </p>
          </div>
        ),
      },
      {
        accessorKey: 'location',
        header: 'Location',
        cell: ({ row }) => (
          <div>
            <p className="text-white">{row.original.location}</p>
            <Badge variant="default" size="sm">{row.original.locationType}</Badge>
          </div>
        ),
      },
      {
        accessorKey: 'weather',
        header: 'Weather',
        cell: ({ row }) => (
          <div className="text-sm">
            <p className="text-white">{row.original.weather.condition}</p>
            <p className="text-xs text-slate-400">
              {row.original.weather.temp}°F • {row.original.weather.windDirection} {row.original.weather.windSpeed}mph
            </p>
          </div>
        ),
      },
      {
        accessorKey: 'sightings',
        header: 'Sightings',
        cell: ({ getValue }) => (
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-yellow-400" />
            <span className="text-white font-bold">{getValue() as number}</span>
          </div>
        ),
      },
      {
        accessorKey: 'harvest',
        header: 'Harvest',
        cell: ({ getValue }) => (
          getValue() ? (
            <Badge variant="success">✓ Yes</Badge>
          ) : (
            <span className="text-slate-500 text-sm">-</span>
          )
        ),
      },
      {
        id: 'actions',
        header: '',
        cell: ({ row }) => (
          <button className="px-3 py-1 text-sm text-slate-400 hover:text-white hover:bg-slate-700 rounded transition">
            Details
          </button>
        ),
      },
    ],
    [hunts]
  )

  // Mobile card renderer
  const renderMobileCard = (hunt: Hunt) => {
    const getWeatherIcon = (condition: string) => {
      return condition === 'Clear' ? Sun : CloudRain
    }
    const WeatherIcon = getWeatherIcon(hunt.weather.condition)

    return (
      <Card>
        {/* Header */}
        <div className="p-4 bg-slate-800/30 border-b border-slate-700">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-white font-semibold">
                {formatDate(hunt.date)}
              </h3>
              <div className="flex items-center gap-2 text-sm text-slate-400 mt-1">
                <Clock className="w-3 h-3" />
                <span>{hunt.startTime} - {hunt.endTime}</span>
              </div>
            </div>
            {hunt.harvest && <Badge variant="success">✓ HARVEST</Badge>}
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <MapPin className="w-3 h-3" />
            <span>{hunt.location}</span>
            <Badge size="sm">{hunt.locationType}</Badge>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          {/* Weather */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-sm">
              <WeatherIcon className="w-4 h-4 text-blue-400" />
              <span className="text-white">{hunt.weather.condition}</span>
              <span className="text-slate-400">{hunt.weather.temp}°F</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Wind className="w-4 h-4 text-slate-400" />
              <span className="text-white">{hunt.weather.windDirection} {hunt.weather.windSpeed}mph</span>
            </div>
          </div>

          {/* Sightings */}
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-yellow-400" />
            <span className="text-white font-bold">{hunt.sightings}</span>
            <span className="text-slate-400 text-sm">sightings</span>
          </div>

          {/* Notes */}
          {hunt.notes && (
            <p className="text-sm text-slate-300 italic">{hunt.notes}</p>
          )}

          <button className="w-full px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition text-sm">
            View Details
          </button>
        </div>
      </Card>
    )
  }

  return (
    <div>
      <PageHeader
        title="Hunt Logs"
        description="Track every hunt and sighting"
        actionLabel="Log New Hunt"
      />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6">
        <StatCard label="Total Hunts" value={stats.totalHunts} />
        <StatCard 
          label="Sightings" 
          value={stats.totalSightings}
          variant="success"
          icon={Eye}
        />
        <StatCard 
          label="Harvested" 
          value={stats.totalHarvest}
          variant="warning"
        />
        <StatCard 
          label="Avg Hunt" 
          value={`${stats.avgDuration}m`}
          variant="info"
        />
      </div>

      {/* Info Banner */}
      <InfoBanner 
        icon={Calendar}
        variant="info"
        className="mb-6"
      >
        Log hunts with location, weather, and sightings to track patterns and improve success rate.
      </InfoBanner>

      {/* Responsive Table */}
      <ResponsiveTable
        data={hunts}
        columns={columns}
        mobileCard={renderMobileCard}
        pagination={true}
        pageSize={10}
      />
    </div>
  )
}
