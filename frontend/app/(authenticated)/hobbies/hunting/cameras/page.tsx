'use client'

import { useMemo } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { Camera, Battery, Image, Download, MapPin } from 'lucide-react'
import { PageHeader, StatCard, ResponsiveTable, Badge, Card, InfoBanner } from '@/components/ui'
import { formatDate } from '@/lib/utils'

interface TrailCamera {
  id: string
  name: string
  location: string
  latitude: number
  longitude: number
  lastChecked: string
  batteryLevel: number
  sdCardSpace: number
  photoCount: number
  active: boolean
}

const mockCameras: TrailCamera[] = [
  {
    id: '1',
    name: 'Creek Camera #1',
    location: 'Creek Crossing',
    latitude: 40.7138,
    longitude: -74.0070,
    lastChecked: '2024-01-10',
    batteryLevel: 75,
    sdCardSpace: 45,
    photoCount: 1250,
    active: true
  },
  {
    id: '2',
    name: 'North Plot Camera',
    location: 'North Food Plot',
    latitude: 40.7118,
    longitude: -74.0050,
    lastChecked: '2024-01-08',
    batteryLevel: 40,
    sdCardSpace: 85,
    photoCount: 2340,
    active: true
  },
  {
    id: '3',
    name: 'Oak Ridge Camera',
    location: 'Oak Stand Trail',
    latitude: 40.7125,
    longitude: -74.0058,
    lastChecked: '2024-01-05',
    batteryLevel: 15,
    sdCardSpace: 95,
    photoCount: 890,
    active: true
  }
]

export default function CamerasPage() {
  const cameras = mockCameras

  const stats = {
    activeCameras: cameras.filter(c => c.active).length,
    totalPhotos: cameras.reduce((sum, c) => sum + c.photoCount, 0),
    needsAttention: cameras.filter(c => c.batteryLevel < 25 || c.sdCardSpace > 80).length,
    avgBattery: Math.round(cameras.reduce((sum, c) => sum + c.batteryLevel, 0) / cameras.length)
  }

  const getBatteryVariant = (level: number) => {
    if (level > 50) return 'success'
    if (level > 25) return 'warning'
    return 'danger'
  }

  const getStorageVariant = (used: number) => {
    if (used < 50) return 'success'
    if (used < 80) return 'warning'
    return 'danger'
  }

  // Desktop table columns
  const columns = useMemo<ColumnDef<TrailCamera>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Camera',
        cell: ({ row }) => (
          <div>
            <p className="text-white font-medium">{row.original.name}</p>
            <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
              <MapPin className="w-3 h-3" />
              {row.original.location}
            </p>
          </div>
        ),
      },
      {
        accessorKey: 'batteryLevel',
        header: 'Battery',
        cell: ({ getValue, row }) => {
          const level = getValue() as number
          return (
            <div className="flex items-center gap-2">
              <Battery className={`w-4 h-4 ${
                level > 50 ? 'text-green-400' : level > 25 ? 'text-yellow-400' : 'text-red-400'
              }`} />
              <Badge variant={getBatteryVariant(level)}>{level}%</Badge>
            </div>
          )
        },
      },
      {
        accessorKey: 'sdCardSpace',
        header: 'Storage',
        cell: ({ getValue }) => {
          const used = getValue() as number
          return <Badge variant={getStorageVariant(used)}>{used}% used</Badge>
        },
      },
      {
        accessorKey: 'photoCount',
        header: 'Photos',
        cell: ({ getValue }) => (
          <span className="text-white font-medium">{(getValue() as number).toLocaleString()}</span>
        ),
      },
      {
        accessorKey: 'lastChecked',
        header: 'Last Checked',
        cell: ({ getValue }) => (
          <span className="text-slate-300 text-sm">{formatDate(getValue() as string)}</span>
        ),
      },
      {
        id: 'actions',
        header: '',
        cell: ({ row }) => (
          <div className="flex gap-2">
            <button className="px-3 py-1 text-xs bg-purple-600 text-white rounded hover:bg-purple-700 transition">
              Photos
            </button>
            <button className="px-3 py-1 text-xs text-slate-400 hover:text-white hover:bg-slate-700 rounded transition">
              Edit
            </button>
          </div>
        ),
      },
    ],
    []
  )

  // Mobile card renderer
  const renderMobileCard = (camera: TrailCamera) => {
    const needsAttention = camera.batteryLevel < 25 || camera.sdCardSpace > 80

    return (
      <Card className={needsAttention ? 'border-red-800 bg-red-900/10' : undefined}>
        <div className="flex items-start gap-4">
          <div className="bg-blue-600 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
            <Camera className="w-6 h-6 text-white" />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-white font-semibold mb-1">{camera.name}</h3>
            <p className="text-sm text-slate-400 mb-3 flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {camera.location}
            </p>

            <div className="grid grid-cols-2 gap-2 mb-3">
              <div className="bg-slate-900/50 p-2 rounded border border-slate-700">
                <p className="text-xs text-slate-500">Battery</p>
                <Badge variant={getBatteryVariant(camera.batteryLevel)} size="sm">
                  {camera.batteryLevel}%
                </Badge>
              </div>
              <div className="bg-slate-900/50 p-2 rounded border border-slate-700">
                <p className="text-xs text-slate-500">Storage</p>
                <Badge variant={getStorageVariant(camera.sdCardSpace)} size="sm">
                  {camera.sdCardSpace}%
                </Badge>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm mb-3">
              <span className="text-slate-400">Photos</span>
              <span className="text-white font-bold">{camera.photoCount.toLocaleString()}</span>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 px-3 py-2 bg-purple-600 text-white text-sm rounded hover:bg-purple-700 transition">
                View Photos
              </button>
              <button className="px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-700 rounded transition">
                Edit
              </button>
            </div>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <div>
      <PageHeader
        title="Trail Cameras"
        description="Monitor and manage your trail cameras"
        actionLabel="Add Camera"
      />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6">
        <StatCard 
          label="Active Cameras" 
          value={stats.activeCameras}
          variant="info"
          icon={Camera}
        />
        <StatCard 
          label="Total Photos" 
          value={stats.totalPhotos.toLocaleString()}
          variant="default"
          icon={Image}
        />
        <StatCard 
          label="Needs Attention" 
          value={stats.needsAttention}
          variant={stats.needsAttention > 0 ? 'danger' : 'success'}
        />
        <StatCard 
          label="Avg Battery" 
          value={`${stats.avgBattery}%`}
          variant="success"
          icon={Battery}
        />
      </div>

      {/* Info Banner */}
      {stats.needsAttention > 0 && (
        <InfoBanner variant="warning" className="mb-6">
          {stats.needsAttention} camera{stats.needsAttention > 1 ? 's' : ''} need{stats.needsAttention === 1 ? 's' : ''} attention (low battery or full SD card)
        </InfoBanner>
      )}

      {/* Responsive Table */}
      <ResponsiveTable
        data={cameras}
        columns={columns}
        mobileCard={renderMobileCard}
        searchable={true}
        pagination={false}
      />
    </div>
  )
}
