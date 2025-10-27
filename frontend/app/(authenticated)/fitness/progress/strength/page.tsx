'use client'

import { useState } from 'react'
import { Plus, TrendingUp, Award, Filter } from 'lucide-react'

interface ExerciseProgress {
  exercise: string
  category: 'Chest' | 'Back' | 'Legs' | 'Shoulders' | 'Arms' | 'Core'
  currentMax: number
  previousMax: number
  unit: 'lbs' | 'kg'
  lastTested: string
  allTimeRecord: number
  totalSessions: number
  history: { date: string; weight: number; reps: number; sets: number }[]
}

const mockStrengthData: ExerciseProgress[] = [
  {
    exercise: 'Bench Press',
    category: 'Chest',
    currentMax: 225,
    previousMax: 215,
    unit: 'lbs',
    lastTested: '2024-01-14',
    allTimeRecord: 230,
    totalSessions: 45,
    history: [
      { date: '2024-01-14', weight: 225, reps: 5, sets: 3 },
      { date: '2024-01-10', weight: 215, reps: 5, sets: 3 },
      { date: '2024-01-05', weight: 215, reps: 4, sets: 3 },
    ]
  },
  {
    exercise: 'Squat',
    category: 'Legs',
    currentMax: 315,
    previousMax: 295,
    unit: 'lbs',
    lastTested: '2024-01-12',
    allTimeRecord: 315,
    totalSessions: 38,
    history: [
      { date: '2024-01-12', weight: 315, reps: 5, sets: 3 },
      { date: '2024-01-08', weight: 295, reps: 5, sets: 3 },
      { date: '2024-01-03', weight: 285, reps: 6, sets: 3 },
    ]
  },
  {
    exercise: 'Deadlift',
    category: 'Back',
    currentMax: 405,
    previousMax: 385,
    unit: 'lbs',
    lastTested: '2024-01-15',
    allTimeRecord: 405,
    totalSessions: 32,
    history: [
      { date: '2024-01-15', weight: 405, reps: 3, sets: 2 },
      { date: '2024-01-11', weight: 385, reps: 5, sets: 3 },
      { date: '2024-01-06', weight: 385, reps: 4, sets: 3 },
    ]
  },
  {
    exercise: 'Overhead Press',
    category: 'Shoulders',
    currentMax: 135,
    previousMax: 130,
    unit: 'lbs',
    lastTested: '2024-01-13',
    allTimeRecord: 140,
    totalSessions: 40,
    history: [
      { date: '2024-01-13', weight: 135, reps: 5, sets: 3 },
      { date: '2024-01-09', weight: 130, reps: 6, sets: 3 },
    ]
  },
]

export default function StrengthProgressPage() {
  const [exercises] = useState(mockStrengthData)
  const [selectedCategory, setSelectedCategory] = useState('All')

  const categories = ['All', 'Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Core']
  
  const filteredExercises = selectedCategory === 'All' 
    ? exercises 
    : exercises.filter(e => e.category === selectedCategory)

  const totalImprovement = exercises.reduce((sum, ex) => sum + (ex.currentMax - ex.previousMax), 0)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Strength Progress</h1>
          <p className="text-slate-400 text-sm mt-1">Track your lifting progression over time</p>
        </div>
        <button className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition">
          <Plus className="w-4 h-4" />
          <span>Log Workout</span>
        </button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-green-900/20 p-4 rounded-lg border border-green-800">
          <p className="text-green-400 text-sm">Total Improvement</p>
          <p className="text-2xl font-bold text-white">+{totalImprovement} lbs</p>
          <p className="text-xs text-green-400 mt-1">Since last test</p>
        </div>
        <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
          <p className="text-slate-400 text-sm">Exercises Tracked</p>
          <p className="text-2xl font-bold text-white">{exercises.length}</p>
        </div>
        <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-800">
          <p className="text-blue-400 text-sm">Total Sessions</p>
          <p className="text-2xl font-bold text-white">
            {exercises.reduce((sum, ex) => sum + ex.totalSessions, 0)}
          </p>
        </div>
        <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-800">
          <p className="text-purple-400 text-sm">New PRs This Month</p>
          <p className="text-2xl font-bold text-white">3</p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-4 mb-6">
        <div className="flex items-center gap-3">
          <Filter className="w-4 h-4 text-slate-400" />
          <div className="flex gap-2 flex-wrap">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-sm transition ${
                  selectedCategory === cat
                    ? 'bg-primary text-white'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Exercise Progress Cards */}
      <div className="space-y-4">
        {filteredExercises.map((exercise) => {
          const improvement = exercise.currentMax - exercise.previousMax
          const improvementPercent = ((improvement / exercise.previousMax) * 100).toFixed(1)
          const isNewPR = exercise.currentMax === exercise.allTimeRecord

          return (
            <div key={exercise.exercise} className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden">
              <div className="p-4 border-b border-slate-700 bg-slate-800/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-bold text-white">{exercise.exercise}</h3>
                    <span className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded">
                      {exercise.category}
                    </span>
                    {isNewPR && (
                      <span className="text-xs bg-yellow-600 text-white px-2 py-1 rounded flex items-center gap-1">
                        <Award className="w-3 h-3" />
                        All-Time PR!
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm text-slate-400">Current Max</p>
                      <p className="text-2xl font-bold text-white">{exercise.currentMax} {exercise.unit}</p>
                    </div>
                    {improvement > 0 && (
                      <div className="bg-green-900/30 border border-green-800 px-3 py-2 rounded-lg">
                        <div className="flex items-center gap-1">
                          <TrendingUp className="w-4 h-4 text-green-400" />
                          <span className="text-green-400 font-bold">+{improvement} {exercise.unit}</span>
                        </div>
                        <p className="text-xs text-green-400 mt-1">+{improvementPercent}%</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Recent History */}
                  <div>
                    <h4 className="text-sm font-semibold text-slate-400 mb-3">Recent Sessions</h4>
                    <div className="space-y-2">
                      {exercise.history.slice(0, 3).map((session, idx) => (
                        <div key={idx} className="bg-slate-900/50 p-3 rounded-lg border border-slate-700">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-white font-medium">
                              {session.weight} {exercise.unit} × {session.reps}
                            </span>
                            <span className="text-xs text-slate-500">
                              {new Date(session.date).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400">{session.sets} sets</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Stats */}
                  <div>
                    <h4 className="text-sm font-semibold text-slate-400 mb-3">Statistics</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400 text-sm">All-Time Record</span>
                        <span className="text-yellow-400 font-bold">{exercise.allTimeRecord} {exercise.unit}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400 text-sm">Total Sessions</span>
                        <span className="text-white font-bold">{exercise.totalSessions}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400 text-sm">Last Tested</span>
                        <span className="text-white font-bold">
                          {new Date(exercise.lastTested).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400 text-sm">Progress</span>
                        <span className={improvement > 0 ? 'text-green-400' : 'text-slate-400'}>
                          {improvement > 0 ? '+' : ''}{improvement} {exercise.unit}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress Chart Placeholder */}
                <div className="mt-4 pt-4 border-t border-slate-700">
                  <div className="h-32 bg-slate-900/50 rounded-lg border border-slate-700 flex items-center justify-center">
                    <p className="text-slate-500 text-sm">Progress chart coming soon</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-4 flex gap-2">
                  <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-600 transition text-sm">
                    View Full History
                  </button>
                  <button className="px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition text-sm">
                    Test 1RM
                  </button>
                  <button className="px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition text-sm">
                    Add Note
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

