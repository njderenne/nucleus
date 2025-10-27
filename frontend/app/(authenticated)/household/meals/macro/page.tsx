'use client'

import { useState } from 'react'
import { Target, TrendingUp, Dumbbell, Calendar, Zap } from 'lucide-react'
import { useFitness, calculateAdjustedMacros } from '@/contexts/FitnessContext'

interface MacroGoal {
  calories: number
  protein: number
  carbs: number
  fat: number
}

export default function MacroPlannerPage() {
  const { workoutSchedule } = useFitness()
  const [baseMacros] = useState<MacroGoal>({
    calories: 2200,
    protein: 180,
    carbs: 200,
    fat: 70
  })

  const getWorkoutColor = (type: string) => {
    switch (type) {
      case 'Strength': return 'bg-red-600'
      case 'Cardio': return 'bg-blue-600'
      case 'HIIT': return 'bg-orange-600'
      default: return 'bg-slate-600'
    }
  }

  const weeklyCalories = workoutSchedule.reduce((sum, day) => sum + calculateAdjustedMacros(baseMacros, day).calories, 0)
  const avgDailyCalories = Math.round(weeklyCalories / 7)

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">Macro-Based Meal Planner</h1>
        <p className="text-slate-400">Optimize nutrition based on your workout schedule and goals</p>
      </div>

      {/* Info Banner */}
      <div className="bg-gradient-to-r from-primary/20 to-purple-900/20 border border-primary/30 rounded-xl p-6 mb-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
            <Target className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2">Smart Nutrition Planning</h3>
            <p className="text-slate-300 text-sm">
              Nucleus automatically adjusts your daily calorie and macro targets based on your workout schedule. 
              On training days, you'll get more protein and carbs to fuel recovery and performance.
            </p>
          </div>
        </div>
      </div>

      {/* Weekly Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
          <p className="text-slate-400 text-sm">Avg Daily Calories</p>
          <p className="text-3xl font-bold text-white">{avgDailyCalories}</p>
          <p className="text-xs text-slate-500 mt-1">Weekly: {weeklyCalories.toLocaleString()}</p>
        </div>
        <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-800">
          <p className="text-blue-400 text-sm">Workout Days</p>
          <p className="text-3xl font-bold text-white">{workoutSchedule.filter(w => w.type !== 'Rest').length}</p>
          <p className="text-xs text-blue-400 mt-1">This week</p>
        </div>
        <div className="bg-green-900/20 p-4 rounded-lg border border-green-800">
          <p className="text-green-400 text-sm">Total Burned</p>
          <p className="text-3xl font-bold text-white">
            {workoutSchedule.reduce((sum, w) => sum + w.caloriesBurned, 0)}
          </p>
          <p className="text-xs text-green-400 mt-1">Calories</p>
        </div>
        <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-800">
          <p className="text-purple-400 text-sm">Meals Planned</p>
          <p className="text-3xl font-bold text-white">8</p>
          <p className="text-xs text-purple-400 mt-1">Out of 21</p>
        </div>
      </div>

      {/* Base Macros Settings */}
      <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6 mb-6">
        <h3 className="text-white font-semibold mb-4">Base Daily Macros (Rest Days)</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="text-sm text-slate-400 mb-2 block">Calories</label>
            <input
              type="number"
              value={baseMacros.calories}
              className="w-full px-3 py-2 bg-slate-900/50 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="text-sm text-slate-400 mb-2 block">Protein (g)</label>
            <input
              type="number"
              value={baseMacros.protein}
              className="w-full px-3 py-2 bg-slate-900/50 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="text-sm text-slate-400 mb-2 block">Carbs (g)</label>
            <input
              type="number"
              value={baseMacros.carbs}
              className="w-full px-3 py-2 bg-slate-900/50 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="text-sm text-slate-400 mb-2 block">Fat (g)</label>
            <input
              type="number"
              value={baseMacros.fat}
              className="w-full px-3 py-2 bg-slate-900/50 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </div>

      {/* Weekly Schedule with Workout Integration */}
      <div className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden">
        <div className="p-4 border-b border-slate-700 flex items-center justify-between">
          <h3 className="text-white font-semibold">Weekly Schedule & Macro Targets</h3>
          <button className="text-sm text-primary hover:text-primary-400 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Sync with Workout Calendar
          </button>
        </div>

        <div className="divide-y divide-slate-700">
          {workoutSchedule.map((workout) => {
            const macros = calculateAdjustedMacros(baseMacros, workout)
            const isWorkoutDay = workout.type !== 'Rest'

            return (
              <div key={workout.day} className="p-4 hover:bg-slate-700/30 transition">
                <div className="flex items-center gap-4">
                  {/* Day */}
                  <div className="w-32">
                    <p className="text-white font-semibold">{workout.day}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`w-2 h-2 rounded-full ${getWorkoutColor(workout.type)}`}></span>
                      <span className="text-xs text-slate-400">{workout.type}</span>
                    </div>
                  </div>

                  {/* Workout Details */}
                  <div className="flex-1">
                    {isWorkoutDay ? (
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Dumbbell className="w-4 h-4 text-slate-400" />
                          <span className="text-slate-300">{workout.duration} min</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Zap className="w-4 h-4 text-orange-400" />
                          <span className="text-orange-400">{workout.caloriesBurned} cal burned</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-green-400" />
                          <span className="text-green-400">{workout.intensity} intensity</span>
                        </div>
                      </div>
                    ) : (
                      <p className="text-slate-500 text-sm">Rest & Recovery Day</p>
                    )}
                  </div>

                  {/* Macro Targets */}
                  <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-700">
                    <p className="text-xs text-slate-400 mb-2">Daily Targets</p>
                    <div className="flex gap-3 text-sm">
                      <div>
                        <p className="text-white font-bold">{macros.calories}</p>
                        <p className="text-xs text-slate-500">cal</p>
                      </div>
                      <div className="border-l border-slate-700 pl-3">
                        <p className="text-blue-400 font-bold">{macros.protein}g</p>
                        <p className="text-xs text-slate-500">protein</p>
                      </div>
                      <div className="border-l border-slate-700 pl-3">
                        <p className="text-yellow-400 font-bold">{macros.carbs}g</p>
                        <p className="text-xs text-slate-500">carbs</p>
                      </div>
                      <div className="border-l border-slate-700 pl-3">
                        <p className="text-green-400 font-bold">{macros.fat}g</p>
                        <p className="text-xs text-slate-500">fat</p>
                      </div>
                    </div>
                    {isWorkoutDay && (
                      <p className="text-xs text-primary mt-2">
                        ↑ Adjusted for {workout.type.toLowerCase()} workout
                      </p>
                    )}
                  </div>

                  {/* Generate Meals */}
                  <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-600 transition text-sm whitespace-nowrap">
                    Generate Meals
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Workout Integration Settings */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6">
          <h3 className="text-white font-semibold mb-4 flex items-center">
            <Dumbbell className="w-5 h-5 mr-2 text-primary" />
            Workout Adjustments
          </h3>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-slate-400 mb-2 block">Eat back % of burned calories</label>
              <input
                type="range"
                min="0"
                max="100"
                defaultValue="50"
                className="w-full"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>0%</span>
                <span className="text-primary font-medium">50%</span>
                <span>100%</span>
              </div>
            </div>
            <div>
              <label className="text-sm text-slate-400 mb-2 block">Extra protein on strength days (g)</label>
              <input
                type="number"
                defaultValue="20"
                className="w-full px-3 py-2 bg-slate-900/50 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="text-sm text-slate-400 mb-2 block">Extra carbs on high intensity days (g)</label>
              <input
                type="number"
                defaultValue="30"
                className="w-full px-3 py-2 bg-slate-900/50 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </div>

        <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6">
          <h3 className="text-white font-semibold mb-4 flex items-center">
            <Target className="w-5 h-5 mr-2 text-green-400" />
            Goal Tracking
          </h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-slate-400 mb-2 block">Primary Goal</label>
              <select className="w-full px-3 py-2 bg-slate-900/50 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-primary">
                <option>Muscle Gain</option>
                <option>Fat Loss</option>
                <option>Maintenance</option>
                <option>Performance</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-slate-400 mb-2 block">Activity Level</label>
              <select className="w-full px-3 py-2 bg-slate-900/50 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-primary">
                <option>Sedentary</option>
                <option>Lightly Active</option>
                <option>Moderately Active</option>
                <option>Very Active</option>
                <option>Extremely Active</option>
              </select>
            </div>
            <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
              Recalculate Macros
            </button>
          </div>
        </div>
      </div>

      {/* Pre/Post Workout Meal Timing */}
      <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6">
        <h3 className="text-white font-semibold mb-4">Pre/Post Workout Nutrition</h3>
        <div className="space-y-3">
          <label className="flex items-center space-x-3">
            <input type="checkbox" className="w-4 h-4 rounded border-slate-600 bg-slate-700 text-primary" defaultChecked />
            <span className="text-slate-300 text-sm">Suggest high-carb meals before cardio days</span>
          </label>
          <label className="flex items-center space-x-3">
            <input type="checkbox" className="w-4 h-4 rounded border-slate-600 bg-slate-700 text-primary" defaultChecked />
            <span className="text-slate-300 text-sm">Suggest high-protein meals after strength training</span>
          </label>
          <label className="flex items-center space-x-3">
            <input type="checkbox" className="w-4 h-4 rounded border-slate-600 bg-slate-700 text-primary" />
            <span className="text-slate-300 text-sm">Reduce calories on rest days</span>
          </label>
          <label className="flex items-center space-x-3">
            <input type="checkbox" className="w-4 h-4 rounded border-slate-600 bg-slate-700 text-primary" defaultChecked />
            <span className="text-slate-300 text-sm">Time meals 2-3 hours before workouts</span>
          </label>
        </div>
      </div>

      {/* Quick Action */}
      <div className="mt-6 flex gap-3">
        <button className="flex-1 px-6 py-3 bg-gradient-to-r from-primary to-purple-600 text-white rounded-lg hover:from-primary-600 hover:to-purple-700 transition font-semibold">
          Generate Full Week Based on Macros & Workouts
        </button>
      </div>

      {/* Tips */}
      <div className="mt-6 bg-blue-900/20 border border-blue-800 rounded-lg p-6">
        <h4 className="text-white font-semibold mb-3">💡 Pro Tips</h4>
        <ul className="space-y-2 text-sm text-blue-300">
          <li>• Eat more protein (1.6-2.2g per kg body weight) on strength training days for muscle recovery</li>
          <li>• Increase carbs on high-intensity days to fuel performance and replenish glycogen</li>
          <li>• Keep fat intake consistent for hormone regulation</li>
          <li>• Time your largest meal 2-3 hours before your workout for optimal energy</li>
          <li>• Post-workout meals should be rich in protein and carbs within 30-60 minutes</li>
        </ul>
      </div>
    </div>
  )
}

