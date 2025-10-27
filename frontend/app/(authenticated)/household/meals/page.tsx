'use client'

import { useState } from 'react'
import { Plus, ChevronLeft, ChevronRight, Copy, Dumbbell } from 'lucide-react'
import { useFitness } from '@/contexts/FitnessContext'

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snacks']

interface Meal {
  id: string
  name: string
  calories: number
  protein: number
  carbs: number
  fat: number
}

const mockMeals: { [key: string]: Meal | null } = {
  'Monday-Breakfast': { id: '1', name: 'Oatmeal with Berries', calories: 350, protein: 12, carbs: 58, fat: 8 },
  'Monday-Lunch': { id: '2', name: 'Grilled Chicken Salad', calories: 450, protein: 35, carbs: 25, fat: 22 },
  'Monday-Dinner': { id: '3', name: 'Salmon with Rice & Broccoli', calories: 580, protein: 42, carbs: 55, fat: 18 },
  'Tuesday-Breakfast': { id: '4', name: 'Greek Yogurt Parfait', calories: 320, protein: 20, carbs: 45, fat: 6 },
}

export default function MealPlannerPage() {
  const [currentWeek, setCurrentWeek] = useState(new Date())
  const [meals, setMeals] = useState(mockMeals)
  const { workoutSchedule, getWorkoutForDay } = useFitness()

  const getDailyTotals = (day: string) => {
    const dayMeals = mealTypes.map(type => meals[`${day}-${type}`]).filter(Boolean) as Meal[]
    return {
      calories: dayMeals.reduce((sum, meal) => sum + meal.calories, 0),
      protein: dayMeals.reduce((sum, meal) => sum + meal.protein, 0),
      carbs: dayMeals.reduce((sum, meal) => sum + meal.carbs, 0),
      fat: dayMeals.reduce((sum, meal) => sum + meal.fat, 0),
    }
  }

  const getWeeklyTotals = () => {
    const weekTotals = daysOfWeek.map(day => getDailyTotals(day))
    return {
      calories: weekTotals.reduce((sum, day) => sum + day.calories, 0),
      protein: weekTotals.reduce((sum, day) => sum + day.protein, 0),
      carbs: weekTotals.reduce((sum, day) => sum + day.carbs, 0),
      fat: weekTotals.reduce((sum, day) => sum + day.fat, 0),
    }
  }

  const weekTotals = getWeeklyTotals()

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <div className="mb-4">
          <h1 className="text-2xl md:text-3xl font-bold text-white">Weekly Meal Planner</h1>
          <p className="text-slate-400 text-sm mt-1">Plan your meals for the week ahead</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
          <button className="flex-1 sm:flex-none px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-800 active:bg-slate-700 rounded-lg transition flex items-center justify-center gap-2 touch-manipulation">
            <Copy className="w-4 h-4" />
            <span className="text-sm">Copy Last Week</span>
          </button>
          <button className="flex-1 sm:flex-none px-4 py-3 bg-primary text-white rounded-lg hover:bg-primary-600 active:bg-primary-700 transition touch-manipulation">
            Generate with AI
          </button>
        </div>
      </div>

      {/* Week Navigation */}
      <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-4 mb-6">
        <div className="flex items-center justify-between">
          <button className="p-2 hover:bg-slate-700 rounded transition">
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <div className="text-center">
            <p className="text-white font-semibold">Week of January 15 - 21, 2024</p>
            <p className="text-slate-400 text-sm">Current Week</p>
          </div>
          <button className="p-2 hover:bg-slate-700 rounded transition">
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Weekly Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
          <p className="text-slate-400 text-sm">Weekly Calories</p>
          <p className="text-2xl font-bold text-white">{weekTotals.calories}</p>
          <p className="text-xs text-slate-500 mt-1">Avg: {Math.round(weekTotals.calories / 7)}/day</p>
        </div>
        <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-800">
          <p className="text-blue-400 text-sm">Protein</p>
          <p className="text-2xl font-bold text-white">{weekTotals.protein}g</p>
          <p className="text-xs text-blue-400 mt-1">Avg: {Math.round(weekTotals.protein / 7)}g/day</p>
        </div>
        <div className="bg-yellow-900/20 p-4 rounded-lg border border-yellow-800">
          <p className="text-yellow-400 text-sm">Carbs</p>
          <p className="text-2xl font-bold text-white">{weekTotals.carbs}g</p>
          <p className="text-xs text-yellow-400 mt-1">Avg: {Math.round(weekTotals.carbs / 7)}g/day</p>
        </div>
        <div className="bg-green-900/20 p-4 rounded-lg border border-green-800">
          <p className="text-green-400 text-sm">Fat</p>
          <p className="text-2xl font-bold text-white">{weekTotals.fat}g</p>
          <p className="text-xs text-green-400 mt-1">Avg: {Math.round(weekTotals.fat / 7)}g/day</p>
        </div>
      </div>

      {/* Meal Grid */}
      <div className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden">
        {/* Mobile: Stack view, Tablet+: Table view */}
        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="p-4 text-left text-slate-400 font-medium w-32">Meal</th>
                {daysOfWeek.map(day => {
                  const workout = getWorkoutForDay(day)
                  const workoutColor = workout?.type === 'Strength' ? 'text-red-400' :
                                      workout?.type === 'Cardio' ? 'text-blue-400' :
                                      workout?.type === 'HIIT' ? 'text-orange-400' :
                                      workout?.type === 'Yoga' ? 'text-purple-400' :
                                      'text-slate-500'
                  
                  return (
                    <th key={day} className="p-4 text-center text-slate-400 font-medium min-w-[200px]">
                      <div className="font-semibold">{day}</div>
                      <div className="text-xs text-slate-500 font-normal mt-1">
                        {getDailyTotals(day).calories} cal
                      </div>
                      {workout && (
                        <div className={`text-xs font-normal mt-1 flex items-center justify-center gap-1 ${workoutColor}`}>
                          <Dumbbell className="w-3 h-3" />
                          <span>{workout.type}</span>
                          {workout.name && <span className="text-slate-600">• {workout.name}</span>}
                        </div>
                      )}
                    </th>
                  )
                })}
              </tr>
            </thead>
            <tbody>
              {mealTypes.map((mealType) => (
                <tr key={mealType} className="border-b border-slate-700">
                  <td className="p-4 font-medium text-white">{mealType}</td>
                  {daysOfWeek.map(day => {
                    const meal = meals[`${day}-${mealType}`]
                    return (
                      <td key={`${day}-${mealType}`} className="p-2">
                        {meal ? (
                          <div className="bg-slate-700/50 p-3 rounded-lg hover:bg-slate-700 transition cursor-pointer group">
                            <p className="text-white text-sm font-medium mb-1">{meal.name}</p>
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-slate-400">{meal.calories} cal</span>
                              <div className="opacity-0 group-hover:opacity-100 transition">
                                <button className="text-slate-400 hover:text-white">Edit</button>
                              </div>
                            </div>
                            <div className="mt-1 text-xs text-slate-500">
                              P: {meal.protein}g • C: {meal.carbs}g • F: {meal.fat}g
                            </div>
                          </div>
                        ) : (
                          <button className="w-full h-24 border-2 border-dashed border-slate-700 rounded-lg hover:border-primary hover:bg-slate-700/30 transition flex items-center justify-center group">
                            <Plus className="w-5 h-5 text-slate-600 group-hover:text-primary" />
                          </button>
                        )}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 flex gap-3">
        <button className="px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition">
          Export to PDF
        </button>
        <button className="px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition">
          Share Week
        </button>
        <button className="px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition">
          Generate Shopping List
        </button>
      </div>
    </div>
  )
}
