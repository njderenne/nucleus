'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

export interface WorkoutDay {
  day: string
  date: string
  type: 'Rest' | 'Cardio' | 'Strength' | 'HIIT' | 'Yoga' | 'Sports'
  intensity: 'Low' | 'Medium' | 'High'
  duration: number
  caloriesBurned: number
  name?: string
  notes?: string
}

interface FitnessContextType {
  workoutSchedule: WorkoutDay[]
  setWorkoutSchedule: (schedule: WorkoutDay[]) => void
  getWorkoutForDay: (day: string) => WorkoutDay | undefined
  updateWorkout: (day: string, workout: Partial<WorkoutDay>) => void
}

const FitnessContext = createContext<FitnessContextType | undefined>(undefined)

// Mock default schedule
const defaultSchedule: WorkoutDay[] = [
  { day: 'Monday', date: '2024-01-15', type: 'Strength', intensity: 'High', duration: 60, caloriesBurned: 400, name: 'Upper Body' },
  { day: 'Tuesday', date: '2024-01-16', type: 'Cardio', intensity: 'Medium', duration: 30, caloriesBurned: 250, name: 'Morning Run' },
  { day: 'Wednesday', date: '2024-01-17', type: 'Rest', intensity: 'Low', duration: 0, caloriesBurned: 0 },
  { day: 'Thursday', date: '2024-01-18', type: 'Strength', intensity: 'High', duration: 60, caloriesBurned: 400, name: 'Lower Body' },
  { day: 'Friday', date: '2024-01-19', type: 'HIIT', intensity: 'High', duration: 30, caloriesBurned: 350, name: 'HIIT Circuit' },
  { day: 'Saturday', date: '2024-01-20', type: 'Cardio', intensity: 'Low', duration: 45, caloriesBurned: 200, name: 'Easy Bike Ride' },
  { day: 'Sunday', date: '2024-01-21', type: 'Rest', intensity: 'Low', duration: 0, caloriesBurned: 0 },
]

export function FitnessProvider({ children }: { children: ReactNode }) {
  const [workoutSchedule, setWorkoutSchedule] = useState<WorkoutDay[]>(defaultSchedule)

  const getWorkoutForDay = (day: string) => {
    return workoutSchedule.find(w => w.day === day)
  }

  const updateWorkout = (day: string, updates: Partial<WorkoutDay>) => {
    setWorkoutSchedule(schedule =>
      schedule.map(w => w.day === day ? { ...w, ...updates } : w)
    )
  }

  return (
    <FitnessContext.Provider
      value={{
        workoutSchedule,
        setWorkoutSchedule,
        getWorkoutForDay,
        updateWorkout,
      }}
    >
      {children}
    </FitnessContext.Provider>
  )
}

export function useFitness() {
  const context = useContext(FitnessContext)
  if (context === undefined) {
    throw new Error('useFitness must be used within a FitnessProvider')
  }
  return context
}

// Helper function to calculate adjusted macros based on workout
export function calculateAdjustedMacros(
  baseMacros: { calories: number; protein: number; carbs: number; fat: number },
  workout: WorkoutDay
) {
  const calorieBonus = workout.caloriesBurned * 0.5
  const proteinBonus = workout.type === 'Strength' ? 20 : 0
  const carbBonus = workout.intensity === 'High' ? 30 : 0

  return {
    calories: Math.round(baseMacros.calories + calorieBonus),
    protein: Math.round(baseMacros.protein + proteinBonus),
    carbs: Math.round(baseMacros.carbs + carbBonus),
    fat: baseMacros.fat
  }
}

