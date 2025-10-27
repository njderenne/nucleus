'use client'

import { useFitness } from '@/contexts/FitnessContext'
import { Dumbbell, Plus, TrendingUp, Zap, Calendar, ChevronLeft, ChevronRight } from 'lucide-react'

export default function WorkoutsPage() {
  const { workoutSchedule } = useFitness()

  const weekStats = {
    totalWorkouts: workoutSchedule.filter(w => w.type !== 'Rest').length,
    totalMinutes: workoutSchedule.reduce((sum, w) => sum + w.duration, 0),
    totalCalories: workoutSchedule.reduce((sum, w) => sum + w.caloriesBurned, 0),
  }

  const getWorkoutColor = (type: string) => {
    switch (type) {
      case 'Strength': return 'bg-red-600'
      case 'Cardio': return 'bg-blue-600'
      case 'HIIT': return 'bg-orange-600'
      case 'Yoga': return 'bg-purple-600'
      case 'Sports': return 'bg-green-600'
      default: return 'bg-slate-600'
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Workout Schedule</h1>
          <p className="text-slate-400 text-sm mt-1">Plan and track your training sessions</p>
        </div>
        <button className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition">
          <Plus className="w-4 h-4" />
          <span>Add Workout</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">This Week</p>
              <p className="text-2xl font-bold text-white">{weekStats.totalWorkouts}</p>
              <p className="text-xs text-slate-500">Workouts</p>
            </div>
            <Dumbbell className="w-8 h-8 text-primary" />
          </div>
        </div>
        <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-800">
          <p className="text-blue-400 text-sm">Total Time</p>
          <p className="text-2xl font-bold text-white">{weekStats.totalMinutes}</p>
          <p className="text-xs text-blue-400">Minutes</p>
        </div>
        <div className="bg-orange-900/20 p-4 rounded-lg border border-orange-800">
          <p className="text-orange-400 text-sm">Calories Burned</p>
          <p className="text-2xl font-bold text-white">{weekStats.totalCalories}</p>
          <p className="text-xs text-orange-400">This week</p>
        </div>
        <div className="bg-green-900/20 p-4 rounded-lg border border-green-800">
          <p className="text-green-400 text-sm">Streak</p>
          <p className="text-2xl font-bold text-white">3</p>
          <p className="text-xs text-green-400">Weeks</p>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-primary/10 border border-primary/30 rounded-lg p-4 mb-6">
        <p className="text-primary text-sm">
          💡 Your workout schedule automatically adjusts your meal plans and macro targets. Changes here will reflect in the Meals module.
        </p>
      </div>

      {/* Weekly Schedule */}
      <div className="bg-slate-800/50 rounded-xl border border-slate-700">
        <div className="p-4 border-b border-slate-700">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Week of January 15 - 21, 2024</h2>
            <div className="flex gap-2">
              <button className="p-2 hover:bg-slate-700 rounded transition">
                <ChevronLeft className="w-4 h-4 text-white" />
              </button>
              <button className="p-2 hover:bg-slate-700 rounded transition">
                <ChevronRight className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>

        <div className="divide-y divide-slate-700">
          {workoutSchedule.map((workout) => {
            const isRestDay = workout.type === 'Rest'
            
            return (
              <div key={workout.day} className="p-4 hover:bg-slate-700/30 transition">
                <div className="flex items-center gap-4">
                  <div className="w-24">
                    <p className="text-white font-semibold">{workout.day}</p>
                    <p className="text-xs text-slate-500">{workout.date}</p>
                  </div>

                  {isRestDay ? (
                    <div className="flex-1">
                      <p className="text-slate-500 italic">Rest & Recovery Day</p>
                    </div>
                  ) : (
                    <>
                      <div className={`${getWorkoutColor(workout.type)} px-3 py-1 rounded text-white text-sm font-medium`}>
                        {workout.type}
                      </div>

                      <div className="flex-1">
                        <p className="text-white font-medium">{workout.name || workout.type}</p>
                        <div className="flex items-center gap-4 text-sm text-slate-400 mt-1">
                          <span>⏱️ {workout.duration} min</span>
                          <span>•</span>
                          <span className={
                            workout.intensity === 'High' ? 'text-red-400' :
                            workout.intensity === 'Medium' ? 'text-yellow-400' :
                            'text-green-400'
                          }>
                            {workout.intensity} Intensity
                          </span>
                          <span>•</span>
                          <span className="text-orange-400">🔥 {workout.caloriesBurned} cal</span>
                        </div>
                      </div>
                    </>
                  )}

                  <div className="flex gap-2">
                    <button className="px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-700 rounded transition">
                      Edit
                    </button>
                    <button className="px-3 py-2 text-sm bg-primary text-white rounded hover:bg-primary-600 transition">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Quick Add Templates */}
      <div className="mt-6 bg-slate-800/50 rounded-xl border border-slate-700 p-6">
        <h3 className="text-white font-semibold mb-4">Quick Add Workout Templates</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { name: 'Upper Body', type: 'Strength', icon: '💪' },
            { name: 'Lower Body', type: 'Strength', icon: '🦵' },
            { name: 'Cardio Run', type: 'Cardio', icon: '🏃' },
            { name: 'HIIT Circuit', type: 'HIIT', icon: '⚡' },
          ].map((template) => (
            <button
              key={template.name}
              className="p-3 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition text-left border border-slate-600 hover:border-primary"
            >
              <div className="text-2xl mb-1">{template.icon}</div>
              <p className="text-white text-sm font-medium">{template.name}</p>
              <p className="text-xs text-slate-400">{template.type}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

