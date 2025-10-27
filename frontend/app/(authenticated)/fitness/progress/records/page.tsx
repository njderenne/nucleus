'use client'

import { useState } from 'react'
import { Award, TrendingUp, Zap, Target } from 'lucide-react'

interface PersonalRecord {
  id: string
  category: 'Strength' | 'Cardio' | 'Endurance' | 'Speed'
  exercise: string
  value: string
  unit: string
  date: string
  improvement: string
  isRecent: boolean
}

const mockRecords: PersonalRecord[] = [
  // Strength
  { id: '1', category: 'Strength', exercise: 'Bench Press', value: '230', unit: 'lbs', date: '2024-01-10', improvement: '+15 lbs', isRecent: true },
  { id: '2', category: 'Strength', exercise: 'Squat', value: '315', unit: 'lbs', date: '2024-01-12', improvement: '+20 lbs', isRecent: true },
  { id: '3', category: 'Strength', exercise: 'Deadlift', value: '405', unit: 'lbs', date: '2024-01-15', improvement: '+20 lbs', isRecent: true },
  { id: '4', category: 'Strength', exercise: 'Pull-ups', value: '15', unit: 'reps', date: '2023-12-20', improvement: '+3 reps', isRecent: false },
  
  // Cardio
  { id: '5', category: 'Cardio', exercise: 'Fastest Mile', value: '6:45', unit: '', date: '2023-12-28', improvement: '-0:15', isRecent: false },
  { id: '6', category: 'Cardio', exercise: 'Fastest 5K', value: '22:15', unit: '', date: '2024-01-14', improvement: '-0:45', isRecent: true },
  { id: '7', category: 'Endurance', exercise: 'Longest Run', value: '13.1', unit: 'mi', date: '2024-01-01', improvement: '+3.1 mi', isRecent: false },
  { id: '8', category: 'Speed', exercise: 'Max Sprint', value: '19.5', unit: 'mph', date: '2023-12-15', improvement: '+1.2 mph', isRecent: false },
  
  // Endurance
  { id: '9', category: 'Endurance', exercise: 'Longest Bike Ride', value: '50', unit: 'mi', date: '2023-12-22', improvement: 'New!', isRecent: false },
  { id: '10', category: 'Endurance', exercise: 'Most Calories Burned', value: '1,250', unit: 'cal', date: '2023-12-22', improvement: 'New!', isRecent: false },
]

export default function PersonalRecordsPage() {
  const [records] = useState(mockRecords)
  const [selectedCategory, setSelectedCategory] = useState('All')

  const categories = ['All', 'Strength', 'Cardio', 'Endurance', 'Speed']
  
  const filteredRecords = selectedCategory === 'All'
    ? records
    : records.filter(r => r.category === selectedCategory)

  const recentPRs = records.filter(r => r.isRecent)
  const totalPRs = records.length

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Strength': return 'text-red-400 bg-red-900/20 border-red-800'
      case 'Cardio': return 'text-blue-400 bg-blue-900/20 border-blue-800'
      case 'Endurance': return 'text-green-400 bg-green-900/20 border-green-800'
      case 'Speed': return 'text-orange-400 bg-orange-900/20 border-orange-800'
      default: return 'text-slate-400 bg-slate-800/50 border-slate-700'
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Personal Records</h1>
          <p className="text-slate-400 text-sm mt-1">Your best performances across all activities</p>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-br from-yellow-900/30 to-orange-900/30 border border-yellow-800/50 p-5 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-400 text-sm">Total PRs</p>
              <p className="text-3xl font-bold text-white">{totalPRs}</p>
            </div>
            <Award className="w-10 h-10 text-yellow-400" />
          </div>
        </div>

        <div className="bg-green-900/20 p-5 rounded-lg border border-green-800">
          <p className="text-green-400 text-sm">New This Month</p>
          <p className="text-3xl font-bold text-white">{recentPRs.length}</p>
          <div className="flex items-center gap-1 mt-1">
            <TrendingUp className="w-3 h-3 text-green-400" />
            <p className="text-xs text-green-400">On fire! 🔥</p>
          </div>
        </div>

        <div className="bg-red-900/20 p-5 rounded-lg border border-red-800">
          <p className="text-red-400 text-sm">Strength PRs</p>
          <p className="text-3xl font-bold text-white">
            {records.filter(r => r.category === 'Strength').length}
          </p>
        </div>

        <div className="bg-blue-900/20 p-5 rounded-lg border border-blue-800">
          <p className="text-blue-400 text-sm">Cardio PRs</p>
          <p className="text-3xl font-bold text-white">
            {records.filter(r => r.category === 'Cardio').length}
          </p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="mb-4 flex gap-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-lg text-sm transition ${
              selectedCategory === cat
                ? 'bg-primary text-white'
                : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700 border border-slate-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Records Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredRecords.map((record) => (
          <div 
            key={record.id} 
            className={`rounded-xl border p-5 ${getCategoryColor(record.category)}`}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <span className="text-xs font-medium px-2 py-1 bg-slate-900/50 rounded">
                  {record.category}
                </span>
              </div>
              {record.isRecent && (
                <span className="text-xs bg-yellow-600 text-white px-2 py-1 rounded flex items-center gap-1">
                  <Zap className="w-3 h-3" />
                  New!
                </span>
              )}
            </div>

            <h3 className="text-white font-bold text-lg mb-2">{record.exercise}</h3>
            
            <div className="flex items-baseline gap-2 mb-3">
              <p className="text-3xl font-bold text-white">{record.value}</p>
              {record.unit && <p className="text-slate-400 text-lg">{record.unit}</p>}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Set on</span>
                <span className="text-white">
                  {new Date(record.date).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Improvement</span>
                <span className="text-green-400 font-medium">{record.improvement}</span>
              </div>
            </div>

            <button className="w-full mt-4 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition text-sm">
              View History
            </button>
          </div>
        ))}
      </div>

      {/* Achievements */}
      <div className="mt-8 bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-purple-800/50 rounded-xl p-6">
        <h3 className="text-white font-semibold mb-4 flex items-center">
          <Target className="w-5 h-5 mr-2 text-purple-400" />
          Achievements Unlocked
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { name: '100 Workouts', icon: '💯', unlocked: true },
            { name: '1000 Miles', icon: '🏃', unlocked: false },
            { name: '300lb Squat', icon: '🏋️', unlocked: true },
            { name: 'Sub-20 5K', icon: '⚡', unlocked: false },
          ].map((achievement) => (
            <div
              key={achievement.name}
              className={`p-4 rounded-lg text-center ${
                achievement.unlocked
                  ? 'bg-gradient-to-br from-yellow-900/30 to-orange-900/30 border border-yellow-800/50'
                  : 'bg-slate-900/50 border border-slate-700 opacity-50'
              }`}
            >
              <div className="text-3xl mb-2">{achievement.icon}</div>
              <p className={`text-sm font-medium ${achievement.unlocked ? 'text-yellow-400' : 'text-slate-500'}`}>
                {achievement.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

