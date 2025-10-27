'use client'

import { useState } from 'react'
import { Plus, TrendingUp, TrendingDown, Award, MapPin } from 'lucide-react'

interface CardioSession {
  id: string
  type: 'Run' | 'Bike' | 'Swim' | 'Row' | 'Walk'
  date: string
  distance: number
  duration: number // minutes
  pace: string
  avgHeartRate?: number
  maxHeartRate?: number
  calories: number
  elevation?: number
  route?: string
}

const mockCardioData: CardioSession[] = [
  {
    id: '1',
    type: 'Run',
    date: '2024-01-16',
    distance: 5.2,
    duration: 38,
    pace: '7:18',
    avgHeartRate: 155,
    maxHeartRate: 175,
    calories: 520,
    route: 'Park Loop'
  },
  {
    id: '2',
    type: 'Run',
    date: '2024-01-14',
    distance: 3.1,
    duration: 22,
    pace: '7:05',
    avgHeartRate: 162,
    maxHeartRate: 180,
    calories: 310,
    route: '5K Course'
  },
  {
    id: '3',
    type: 'Bike',
    date: '2024-01-13',
    distance: 15.5,
    duration: 45,
    pace: '20.7',
    avgHeartRate: 140,
    calories: 450,
  },
  {
    id: '4',
    type: 'Run',
    date: '2024-01-11',
    distance: 6.5,
    duration: 50,
    pace: '7:41',
    avgHeartRate: 150,
    maxHeartRate: 170,
    calories: 650,
    elevation: 250,
    route: 'Hill Route'
  },
]

export default function CardioProgressPage() {
  const [sessions] = useState(mockCardioData)
  const [selectedType, setSelectedType] = useState('All')

  const types = ['All', 'Run', 'Bike', 'Swim', 'Row', 'Walk']
  
  const filteredSessions = selectedType === 'All'
    ? sessions
    : sessions.filter(s => s.type === selectedType)

  const runSessions = sessions.filter(s => s.type === 'Run')
  const totalDistance = sessions.reduce((sum, s) => sum + s.distance, 0)
  const totalCalories = sessions.reduce((sum, s) => sum + s.calories, 0)
  const avgPace = runSessions.length > 0 
    ? runSessions.reduce((sum, s) => sum + parseFloat(s.pace.split(':')[0]), 0) / runSessions.length
    : 0

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Run': return '🏃'
      case 'Bike': return '🚴'
      case 'Swim': return '🏊'
      case 'Row': return '🚣'
      case 'Walk': return '🚶'
      default: return '💪'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Run': return 'bg-blue-600'
      case 'Bike': return 'bg-green-600'
      case 'Swim': return 'bg-cyan-600'
      case 'Row': return 'bg-orange-600'
      case 'Walk': return 'bg-purple-600'
      default: return 'bg-slate-600'
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Cardio Progress</h1>
          <p className="text-slate-400 text-sm mt-1">Track runs, rides, and endurance activities</p>
        </div>
        <button className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition">
          <Plus className="w-4 h-4" />
          <span>Log Activity</span>
        </button>
      </div>

      {/* Monthly Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
          <p className="text-slate-400 text-sm">Total Distance</p>
          <p className="text-2xl font-bold text-white">{totalDistance.toFixed(1)} mi</p>
          <p className="text-xs text-slate-500 mt-1">This month</p>
        </div>
        <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-800">
          <p className="text-blue-400 text-sm">Avg Pace</p>
          <p className="text-2xl font-bold text-white">{avgPace.toFixed(0)}:00</p>
          <p className="text-xs text-blue-400 mt-1">/mile</p>
        </div>
        <div className="bg-green-900/20 p-4 rounded-lg border border-green-800">
          <p className="text-green-400 text-sm">Best 5K</p>
          <p className="text-2xl font-bold text-white">22:15</p>
          <div className="flex items-center gap-1 mt-1">
            <TrendingDown className="w-3 h-3 text-green-400" />
            <p className="text-xs text-green-400">-0:45 PR!</p>
          </div>
        </div>
        <div className="bg-orange-900/20 p-4 rounded-lg border border-orange-800">
          <p className="text-orange-400 text-sm">Calories Burned</p>
          <p className="text-2xl font-bold text-white">{totalCalories.toLocaleString()}</p>
          <p className="text-xs text-orange-400 mt-1">This month</p>
        </div>
        <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-800">
          <p className="text-purple-400 text-sm">Total Sessions</p>
          <p className="text-2xl font-bold text-white">{sessions.length}</p>
        </div>
      </div>

      {/* Type Filter */}
      <div className="mb-4 flex gap-2">
        {types.map(type => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={`px-4 py-2 rounded-lg text-sm transition ${
              selectedType === type
                ? 'bg-primary text-white'
                : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700 border border-slate-700'
            }`}
          >
            {type !== 'All' && <span className="mr-1">{getTypeIcon(type)}</span>}
            {type}
          </button>
        ))}
      </div>

      {/* Session List */}
      <div className="space-y-3">
        {filteredSessions.map((session) => {
          const paceValue = session.type === 'Bike' 
            ? `${session.pace} mph avg` 
            : `${session.pace} /mi`

          return (
            <div key={session.id} className="bg-slate-800/50 rounded-xl border border-slate-700 p-5 hover:border-slate-600 transition">
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className={`${getTypeColor(session.type)} w-12 h-12 rounded-lg flex items-center justify-center text-2xl flex-shrink-0`}>
                  {getTypeIcon(session.type)}
                </div>

                {/* Main Info */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <h3 className="text-white font-semibold text-lg">{session.type}</h3>
                      {session.route && (
                        <span className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {session.route}
                        </span>
                      )}
                    </div>
                    <span className="text-slate-400 text-sm">
                      {new Date(session.date).toLocaleDateString()}
                    </span>
                  </div>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-3">
                    <div>
                      <p className="text-xs text-slate-500">Distance</p>
                      <p className="text-white font-bold">{session.distance} mi</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Duration</p>
                      <p className="text-white font-bold">{session.duration} min</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Pace</p>
                      <p className="text-white font-bold">{paceValue}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Calories</p>
                      <p className="text-orange-400 font-bold">{session.calories}</p>
                    </div>
                    {session.avgHeartRate && (
                      <div>
                        <p className="text-xs text-slate-500">Avg HR</p>
                        <p className="text-red-400 font-bold">{session.avgHeartRate} bpm</p>
                      </div>
                    )}
                  </div>

                  {/* Additional Details */}
                  <div className="flex items-center gap-4 text-xs text-slate-400">
                    {session.maxHeartRate && <span>Max HR: {session.maxHeartRate} bpm</span>}
                    {session.elevation && <span>⛰️ Elevation: {session.elevation} ft</span>}
                  </div>

                  {/* Actions */}
                  <div className="mt-3 flex gap-2">
                    <button className="px-3 py-1.5 bg-slate-700 text-white text-xs rounded hover:bg-slate-600 transition">
                      View Details
                    </button>
                    <button className="px-3 py-1.5 text-slate-400 hover:text-white text-xs">
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Personal Bests */}
      <div className="mt-8 bg-gradient-to-r from-yellow-900/20 to-orange-900/20 border border-yellow-800/50 rounded-xl p-6">
        <h3 className="text-white font-semibold mb-4 flex items-center">
          <Award className="w-5 h-5 mr-2 text-yellow-400" />
          Personal Records
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-900/50 p-4 rounded-lg">
            <p className="text-yellow-400 text-sm mb-1">Fastest Mile</p>
            <p className="text-2xl font-bold text-white">6:45</p>
            <p className="text-xs text-slate-400 mt-1">Set on Dec 28, 2023</p>
          </div>
          <div className="bg-slate-900/50 p-4 rounded-lg">
            <p className="text-yellow-400 text-sm mb-1">Longest Run</p>
            <p className="text-2xl font-bold text-white">13.1 mi</p>
            <p className="text-xs text-slate-400 mt-1">Half Marathon - Jan 1, 2024</p>
          </div>
          <div className="bg-slate-900/50 p-4 rounded-lg">
            <p className="text-yellow-400 text-sm mb-1">Most Calories</p>
            <p className="text-2xl font-bold text-white">1,250</p>
            <p className="text-xs text-slate-400 mt-1">Long bike ride - Dec 15, 2023</p>
          </div>
        </div>
      </div>
    </div>
  )
}

