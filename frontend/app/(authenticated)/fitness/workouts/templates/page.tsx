'use client'

import { useState } from 'react'
import { Play, Copy, Edit } from 'lucide-react'

interface WorkoutTemplate {
  id: string
  name: string
  type: 'Strength' | 'Cardio' | 'HIIT' | 'Full Body'
  duration: number
  exercises: { name: string; sets: number; reps: string }[]
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  timesUsed: number
}

const mockTemplates: WorkoutTemplate[] = [
  {
    id: '1',
    name: 'Push Day',
    type: 'Strength',
    duration: 60,
    difficulty: 'Intermediate',
    timesUsed: 12,
    exercises: [
      { name: 'Bench Press', sets: 4, reps: '8-10' },
      { name: 'Incline Dumbbell Press', sets: 3, reps: '10-12' },
      { name: 'Cable Flyes', sets: 3, reps: '12-15' },
      { name: 'Overhead Press', sets: 4, reps: '8-10' },
      { name: 'Tricep Dips', sets: 3, reps: '10-12' },
    ]
  },
  {
    id: '2',
    name: 'Pull Day',
    type: 'Strength',
    duration: 60,
    difficulty: 'Intermediate',
    timesUsed: 11,
    exercises: [
      { name: 'Deadlift', sets: 4, reps: '5-8' },
      { name: 'Pull-ups', sets: 4, reps: '8-10' },
      { name: 'Barbell Rows', sets: 3, reps: '8-10' },
      { name: 'Face Pulls', sets: 3, reps: '15-20' },
      { name: 'Bicep Curls', sets: 3, reps: '10-12' },
    ]
  },
  {
    id: '3',
    name: 'Leg Day',
    type: 'Strength',
    duration: 70,
    difficulty: 'Advanced',
    timesUsed: 10,
    exercises: [
      { name: 'Squat', sets: 5, reps: '5-8' },
      { name: 'Romanian Deadlift', sets: 3, reps: '8-10' },
      { name: 'Leg Press', sets: 3, reps: '10-12' },
      { name: 'Leg Curls', sets: 3, reps: '12-15' },
      { name: 'Calf Raises', sets: 4, reps: '15-20' },
    ]
  },
  {
    id: '4',
    name: 'HIIT Circuit',
    type: 'HIIT',
    duration: 30,
    difficulty: 'Intermediate',
    timesUsed: 8,
    exercises: [
      { name: 'Burpees', sets: 4, reps: '30 sec' },
      { name: 'Jump Squats', sets: 4, reps: '30 sec' },
      { name: 'Mountain Climbers', sets: 4, reps: '30 sec' },
      { name: 'Push-ups', sets: 4, reps: '30 sec' },
      { name: 'Rest', sets: 4, reps: '30 sec' },
    ]
  }
]

export default function WorkoutTemplatesPage() {
  const [templates] = useState(mockTemplates)

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-600 text-white'
      case 'Intermediate': return 'bg-yellow-600 text-white'
      case 'Advanced': return 'bg-red-600 text-white'
      default: return 'bg-slate-600 text-white'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Strength': return 'bg-red-900/20 border-red-800 text-red-400'
      case 'Cardio': return 'bg-blue-900/20 border-blue-800 text-blue-400'
      case 'HIIT': return 'bg-orange-900/20 border-orange-800 text-orange-400'
      case 'Full Body': return 'bg-purple-900/20 border-purple-800 text-purple-400'
      default: return 'bg-slate-800/50 border-slate-700 text-slate-400'
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Workout Templates</h1>
          <p className="text-slate-400 text-sm mt-1">Pre-built workouts you can start instantly</p>
        </div>
        <button className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition">
          <Play className="w-4 h-4" />
          <span>Create Template</span>
        </button>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {templates.map((template) => (
          <div key={template.id} className={`rounded-xl border p-6 ${getTypeColor(template.type)}`}>
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">{template.name}</h3>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-xs px-2 py-1 rounded ${getDifficultyColor(template.difficulty)}`}>
                    {template.difficulty}
                  </span>
                  <span className="text-xs bg-slate-900/50 text-slate-300 px-2 py-1 rounded">
                    {template.duration} min
                  </span>
                  <span className="text-xs bg-slate-900/50 text-slate-300 px-2 py-1 rounded">
                    Used {template.timesUsed}x
                  </span>
                </div>
              </div>
            </div>

            {/* Exercise List */}
            <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700 mb-4">
              <p className="text-xs text-slate-400 mb-3">{template.exercises.length} EXERCISES</p>
              <div className="space-y-2">
                {template.exercises.map((exercise, idx) => (
                  <div key={idx} className="flex items-center justify-between text-sm">
                    <span className="text-white">{idx + 1}. {exercise.name}</span>
                    <span className="text-slate-400">
                      {exercise.sets} × {exercise.reps}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm flex items-center justify-center gap-2">
                <Play className="w-4 h-4" />
                Start Workout
              </button>
              <button className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition text-sm">
                <Copy className="w-4 h-4" />
              </button>
              <button className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition text-sm">
                <Edit className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

