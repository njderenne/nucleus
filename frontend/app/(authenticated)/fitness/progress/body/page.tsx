'use client'

import { useState } from 'react'
import { Plus, TrendingUp, TrendingDown, Calendar, Camera } from 'lucide-react'

interface BodyMetric {
  date: string
  weight: number
  bodyFat?: number
  muscleMass?: number
  measurements: {
    chest?: number
    waist?: number
    hips?: number
    arms?: number
    thighs?: number
    calves?: number
  }
  notes?: string
}

const mockBodyData: BodyMetric[] = [
  {
    date: '2024-01-16',
    weight: 185,
    bodyFat: 15.2,
    muscleMass: 157,
    measurements: {
      chest: 42,
      waist: 32,
      arms: 15.5,
      thighs: 24,
    }
  },
  {
    date: '2024-01-09',
    weight: 186.5,
    bodyFat: 15.8,
    muscleMass: 156,
    measurements: {
      chest: 42,
      waist: 32.5,
      arms: 15.5,
      thighs: 24,
    }
  },
  {
    date: '2024-01-02',
    weight: 188,
    bodyFat: 16.5,
    muscleMass: 155,
    measurements: {
      chest: 41.5,
      waist: 33,
      arms: 15,
      thighs: 23.5,
    }
  },
]

export default function BodyMetricsPage() {
  const [metrics] = useState(mockBodyData)

  const latestMetric = metrics[0]
  const previousMetric = metrics[1]

  const weightChange = latestMetric.weight - previousMetric.weight
  const bodyFatChange = latestMetric.bodyFat! - previousMetric.bodyFat!
  const muscleMassChange = latestMetric.muscleMass! - previousMetric.muscleMass!

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Body Metrics</h1>
          <p className="text-slate-400 text-sm mt-1">Track weight, body composition, and measurements</p>
        </div>
        <button className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition">
          <Plus className="w-4 h-4" />
          <span>Log Metrics</span>
        </button>
      </div>

      {/* Current Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-slate-800/50 p-5 rounded-lg border border-slate-700">
          <div className="flex items-center justify-between mb-2">
            <p className="text-slate-400 text-sm">Weight</p>
            {weightChange < 0 ? (
              <TrendingDown className="w-4 h-4 text-green-400" />
            ) : (
              <TrendingUp className="w-4 h-4 text-red-400" />
            )}
          </div>
          <p className="text-3xl font-bold text-white">{latestMetric.weight} lbs</p>
          <p className={`text-xs mt-1 ${weightChange < 0 ? 'text-green-400' : 'text-red-400'}`}>
            {weightChange > 0 ? '+' : ''}{weightChange.toFixed(1)} lbs this week
          </p>
        </div>

        <div className="bg-blue-900/20 p-5 rounded-lg border border-blue-800">
          <p className="text-blue-400 text-sm mb-2">Body Fat %</p>
          <p className="text-3xl font-bold text-white">{latestMetric.bodyFat}%</p>
          <p className={`text-xs mt-1 ${bodyFatChange < 0 ? 'text-green-400' : 'text-red-400'}`}>
            {bodyFatChange > 0 ? '+' : ''}{bodyFatChange.toFixed(1)}% this week
          </p>
        </div>

        <div className="bg-green-900/20 p-5 rounded-lg border border-green-800">
          <p className="text-green-400 text-sm mb-2">Muscle Mass</p>
          <p className="text-3xl font-bold text-white">{latestMetric.muscleMass} lbs</p>
          <p className={`text-xs mt-1 ${muscleMassChange > 0 ? 'text-green-400' : 'text-red-400'}`}>
            {muscleMassChange > 0 ? '+' : ''}{muscleMassChange.toFixed(1)} lbs this week
          </p>
        </div>

        <div className="bg-purple-900/20 p-5 rounded-lg border border-purple-800">
          <p className="text-purple-400 text-sm mb-2">Total Entries</p>
          <p className="text-3xl font-bold text-white">{metrics.length}</p>
          <p className="text-xs text-purple-400 mt-1">Tracking points</p>
        </div>
      </div>

      {/* Weight Chart Placeholder */}
      <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6 mb-6">
        <h2 className="text-lg font-semibold text-white mb-4">Weight Trend (Last 90 Days)</h2>
        <div className="h-64 bg-slate-900/50 rounded-lg border border-slate-700 flex items-center justify-center">
          <div className="text-center">
            <TrendingDown className="w-12 h-12 text-green-400 mx-auto mb-2" />
            <p className="text-slate-400">Interactive chart coming soon</p>
            <p className="text-sm text-slate-500 mt-1">Will show weight, body fat, and muscle mass trends</p>
          </div>
        </div>
      </div>

      {/* Current Measurements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6">
          <h3 className="text-white font-semibold mb-4">Current Measurements</h3>
          <div className="space-y-3">
            {Object.entries(latestMetric.measurements).map(([part, value]) => {
              if (!value) return null
              const prevValue = previousMetric.measurements[part as keyof typeof previousMetric.measurements]
              const change = prevValue ? value - prevValue : 0

              return (
                <div key={part} className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
                  <span className="text-slate-300 capitalize">{part}</span>
                  <div className="text-right">
                    <span className="text-white font-bold">{value} in</span>
                    {change !== 0 && (
                      <p className={`text-xs mt-0.5 ${change < 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {change > 0 ? '+' : ''}{change.toFixed(1)} in
                      </p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Measurement History */}
        <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6">
          <h3 className="text-white font-semibold mb-4">Recent Entries</h3>
          <div className="space-y-3">
            {metrics.slice(0, 5).map((metric, idx) => (
              <div key={idx} className="p-3 bg-slate-900/50 rounded-lg border border-slate-700">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-medium">{metric.weight} lbs</span>
                  <span className="text-xs text-slate-500">
                    {new Date(metric.date).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex gap-4 text-xs text-slate-400">
                  {metric.bodyFat && <span>BF: {metric.bodyFat}%</span>}
                  {metric.muscleMass && <span>MM: {metric.muscleMass} lbs</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Progress Photos */}
      <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold flex items-center">
            <Camera className="w-5 h-5 mr-2 text-purple-400" />
            Progress Photos
          </h3>
          <button className="flex items-center space-x-2 bg-purple-600 text-white px-3 py-2 rounded-lg hover:bg-purple-700 transition text-sm">
            <Camera className="w-4 h-4" />
            <span>Upload Photo</span>
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Front', 'Side', 'Back', 'Flex'].map((angle) => (
            <div key={angle} className="bg-slate-900/50 border-2 border-dashed border-slate-700 rounded-lg h-48 flex flex-col items-center justify-center hover:border-primary transition cursor-pointer">
              <Camera className="w-8 h-8 text-slate-600 mb-2" />
              <p className="text-slate-500 text-sm">{angle} View</p>
              <p className="text-xs text-slate-600 mt-1">Click to upload</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-500 mt-4">
          💡 Take photos in the same lighting and pose for accurate comparisons
        </p>
      </div>

      {/* Goals */}
      <div className="mt-6 bg-slate-800/50 rounded-xl border border-slate-700 p-6">
        <h3 className="text-white font-semibold mb-4">Body Composition Goals</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm text-slate-400 mb-2 block">Target Weight</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                defaultValue="180"
                className="flex-1 px-3 py-2 bg-slate-900/50 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-primary"
              />
              <span className="text-slate-400 text-sm">lbs</span>
            </div>
          </div>
          <div>
            <label className="text-sm text-slate-400 mb-2 block">Target Body Fat %</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                step="0.1"
                defaultValue="12.0"
                className="flex-1 px-3 py-2 bg-slate-900/50 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-primary"
              />
              <span className="text-slate-400 text-sm">%</span>
            </div>
          </div>
          <div>
            <label className="text-sm text-slate-400 mb-2 block">Target Date</label>
            <input
              type="date"
              className="w-full px-3 py-2 bg-slate-900/50 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

