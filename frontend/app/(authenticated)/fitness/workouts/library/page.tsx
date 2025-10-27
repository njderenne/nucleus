'use client'

import { useState } from 'react'
import { Search, Info, Target, AlertCircle } from 'lucide-react'

interface Exercise {
  id: string
  name: string
  category: 'Chest' | 'Back' | 'Legs' | 'Shoulders' | 'Arms' | 'Core' | 'Full Body' | 'Cardio'
  primaryMuscles: string[]
  secondaryMuscles: string[]
  equipment: string[]
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  type: 'Compound' | 'Isolation' | 'Cardio'
  formNotes: string[]
  tips: string[]
  commonMistakes: string[]
}

const exerciseLibrary: Exercise[] = [
  // Chest
  {
    id: '1',
    name: 'Bench Press',
    category: 'Chest',
    primaryMuscles: ['Pectorals', 'Triceps'],
    secondaryMuscles: ['Anterior Deltoids'],
    equipment: ['Barbell', 'Bench'],
    difficulty: 'Intermediate',
    type: 'Compound',
    formNotes: [
      'Lie flat on bench with feet planted firmly on ground',
      'Grip bar slightly wider than shoulder width',
      'Lower bar to mid-chest with elbows at 45° angle',
      'Press up explosively while keeping shoulder blades retracted',
      'Maintain natural arch in lower back'
    ],
    tips: [
      'Warm up with lighter sets first',
      'Use spotter for heavy weights',
      'Focus on controlled descent (2-3 seconds)',
      'Drive through your heels for more power'
    ],
    commonMistakes: [
      'Bouncing bar off chest',
      'Flaring elbows out too wide (90°)',
      'Lifting hips off bench',
      'Not maintaining scapular retraction'
    ]
  },
  {
    id: '2',
    name: 'Squat',
    category: 'Legs',
    primaryMuscles: ['Quadriceps', 'Glutes', 'Hamstrings'],
    secondaryMuscles: ['Core', 'Lower Back', 'Calves'],
    equipment: ['Barbell', 'Squat Rack'],
    difficulty: 'Intermediate',
    type: 'Compound',
    formNotes: [
      'Stand with feet shoulder-width apart, toes slightly pointed out',
      'Bar should rest on upper traps (high bar) or rear delts (low bar)',
      'Initiate movement by pushing hips back',
      'Descend until thighs are parallel or below',
      'Drive through heels to stand, keeping chest up',
      'Keep knees tracking over toes throughout movement'
    ],
    tips: [
      'Focus on depth over weight',
      'Brace core before each rep',
      'Keep weight on mid-foot to heels',
      'Film yourself to check form'
    ],
    commonMistakes: [
      'Knees caving inward',
      'Rising with hips first (good morning squat)',
      'Not achieving proper depth',
      'Rounding lower back at bottom'
    ]
  },
  {
    id: '3',
    name: 'Deadlift',
    category: 'Back',
    primaryMuscles: ['Erector Spinae', 'Glutes', 'Hamstrings'],
    secondaryMuscles: ['Lats', 'Traps', 'Forearms', 'Core'],
    equipment: ['Barbell'],
    difficulty: 'Advanced',
    type: 'Compound',
    formNotes: [
      'Stand with feet hip-width apart, bar over mid-foot',
      'Bend down and grip bar just outside legs',
      'Lower hips until shins touch bar',
      'Chest up, shoulders back, neutral spine',
      'Push through heels and pull bar up close to body',
      'Lock out at top by driving hips forward'
    ],
    tips: [
      'Use mixed grip or straps for heavy sets',
      'Perfect form is more important than weight',
      'Reset each rep for consistent technique',
      'Strengthen grip with farmer carries'
    ],
    commonMistakes: [
      'Rounding lower back',
      'Bar drifting away from body',
      'Looking up (hyperextending neck)',
      'Starting with hips too high or too low'
    ]
  },
  {
    id: '4',
    name: 'Pull-ups',
    category: 'Back',
    primaryMuscles: ['Lats', 'Upper Back'],
    secondaryMuscles: ['Biceps', 'Forearms', 'Core'],
    equipment: ['Pull-up Bar'],
    difficulty: 'Intermediate',
    type: 'Compound',
    formNotes: [
      'Grip bar slightly wider than shoulder width',
      'Start from dead hang with arms fully extended',
      'Pull shoulder blades down and back first',
      'Pull chin over bar while keeping core tight',
      'Lower under control to full extension'
    ],
    tips: [
      'Use resistance bands for assistance if needed',
      'Focus on pulling with elbows, not hands',
      'Avoid swinging or kipping unless training for it',
      'Add weight when you can do 10+ clean reps'
    ],
    commonMistakes: [
      'Not achieving full range of motion',
      'Using momentum/kipping',
      'Shrugging shoulders up',
      'Not engaging lats properly'
    ]
  },
  {
    id: '5',
    name: 'Overhead Press',
    category: 'Shoulders',
    primaryMuscles: ['Deltoids'],
    secondaryMuscles: ['Triceps', 'Upper Chest', 'Core'],
    equipment: ['Barbell'],
    difficulty: 'Intermediate',
    type: 'Compound',
    formNotes: [
      'Start with bar at shoulder height, hands just outside shoulders',
      'Elbows slightly in front of bar',
      'Brace core and squeeze glutes',
      'Press bar straight up, moving head back slightly',
      'Lock out overhead with biceps near ears',
      'Lower under control to starting position'
    ],
    tips: [
      'Keep core extremely tight to protect lower back',
      'Drive from legs slightly (not too much)',
      'Shrug shoulders at top for full contraction',
      'Use spotter for PR attempts'
    ],
    commonMistakes: [
      'Excessive lower back arch',
      'Pressing at an angle (not vertical)',
      'Not achieving full lockout',
      'Flaring elbows out too wide'
    ]
  },
  {
    id: '6',
    name: 'Dumbbell Bicep Curls',
    category: 'Arms',
    primaryMuscles: ['Biceps'],
    secondaryMuscles: ['Forearms'],
    equipment: ['Dumbbells'],
    difficulty: 'Beginner',
    type: 'Isolation',
    formNotes: [
      'Stand with feet shoulder-width apart',
      'Hold dumbbells at sides with palms facing forward',
      'Keep elbows pinned at sides throughout movement',
      'Curl weights up while squeezing biceps',
      'Lower under control, fully extending arms'
    ],
    tips: [
      'Focus on the squeeze at the top',
      'Use lighter weight for perfect form',
      'Slow eccentric (3-4 seconds down)',
      'Avoid swinging or using momentum'
    ],
    commonMistakes: [
      'Swinging weights up',
      'Moving elbows forward/backward',
      'Not fully extending at bottom',
      'Using too much weight'
    ]
  },
  {
    id: '7',
    name: 'Plank',
    category: 'Core',
    primaryMuscles: ['Rectus Abdominis', 'Transverse Abdominis'],
    secondaryMuscles: ['Obliques', 'Lower Back', 'Shoulders'],
    equipment: ['None'],
    difficulty: 'Beginner',
    type: 'Isolation',
    formNotes: [
      'Start in push-up position on forearms',
      'Elbows directly under shoulders',
      'Body in straight line from head to heels',
      'Engage core by pulling belly button to spine',
      'Squeeze glutes to prevent lower back sag',
      'Look at ground, keeping neck neutral'
    ],
    tips: [
      'Start with 30 seconds and build up',
      'Focus on quality over duration',
      'Breathe normally, don\'t hold breath',
      'Add variations when standard becomes easy'
    ],
    commonMistakes: [
      'Hips sagging or piking up',
      'Looking forward (straining neck)',
      'Not engaging core properly',
      'Holding breath'
    ]
  },
  {
    id: '8',
    name: 'Running',
    category: 'Cardio',
    primaryMuscles: ['Legs', 'Cardiovascular System'],
    secondaryMuscles: ['Core', 'Glutes'],
    equipment: ['Running Shoes'],
    difficulty: 'Beginner',
    type: 'Cardio',
    formNotes: [
      'Land on mid-foot, not heel',
      'Keep shoulders relaxed and back',
      'Arms bent at 90°, swinging front to back',
      'Lean slightly forward from ankles',
      'Cadence around 170-180 steps per minute',
      'Breathe rhythmically (2 steps in, 2 steps out)'
    ],
    tips: [
      'Start slow and build mileage gradually (10% per week)',
      'Invest in proper running shoes',
      'Warm up with 5-10 min easy pace',
      'Include rest days for recovery'
    ],
    commonMistakes: [
      'Overstriding (heel striking)',
      'Tensing shoulders/arms',
      'Running too fast too soon',
      'Ignoring pain signals'
    ]
  }
]

export default function ExerciseLibraryPage() {
  const [exercises] = useState(exerciseLibrary)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null)

  const categories = ['All', 'Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Core', 'Full Body', 'Cardio']
  
  const filteredExercises = exercises.filter(exercise => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         exercise.primaryMuscles.some(m => m.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = selectedCategory === 'All' || exercise.category === selectedCategory
    return matchesSearch && matchesCategory
  })

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
      case 'Compound': return 'text-purple-400 bg-purple-900/20 border-purple-800'
      case 'Isolation': return 'text-blue-400 bg-blue-900/20 border-blue-800'
      case 'Cardio': return 'text-orange-400 bg-orange-900/20 border-orange-800'
      default: return 'text-slate-400 bg-slate-800/50 border-slate-700'
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Exercise Library</h1>
          <p className="text-slate-400 text-sm mt-1">{exercises.length} exercises with detailed form guides</p>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search exercises or muscle groups..."
              className="w-full pl-10 pr-4 py-2 bg-slate-900/50 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent placeholder:text-slate-500"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition ${
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

      {/* Exercise Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredExercises.map((exercise) => (
          <div
            key={exercise.id}
            className="bg-slate-800/50 rounded-xl border border-slate-700 hover:border-slate-600 transition cursor-pointer"
            onClick={() => setSelectedExercise(exercise)}
          >
            <div className="p-5">
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">{exercise.name}</h3>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded">
                      {exercise.category}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded ${getDifficultyColor(exercise.difficulty)}`}>
                      {exercise.difficulty}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded border ${getTypeColor(exercise.type)}`}>
                      {exercise.type}
                    </span>
                  </div>
                </div>
              </div>

              {/* Muscles */}
              <div className="mb-4">
                <div className="mb-2">
                  <p className="text-xs text-slate-500 mb-1">PRIMARY MUSCLES</p>
                  <div className="flex gap-2 flex-wrap">
                    {exercise.primaryMuscles.map(muscle => (
                      <span key={muscle} className="text-xs bg-primary/20 text-primary px-2 py-1 rounded border border-primary/30">
                        {muscle}
                      </span>
                    ))}
                  </div>
                </div>
                {exercise.secondaryMuscles.length > 0 && (
                  <div>
                    <p className="text-xs text-slate-500 mb-1">SECONDARY MUSCLES</p>
                    <div className="flex gap-2 flex-wrap">
                      {exercise.secondaryMuscles.map(muscle => (
                        <span key={muscle} className="text-xs bg-slate-700 text-slate-400 px-2 py-1 rounded">
                          {muscle}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Equipment */}
              <div className="mb-4">
                <p className="text-xs text-slate-500 mb-1">EQUIPMENT NEEDED</p>
                <div className="flex gap-2 flex-wrap">
                  {exercise.equipment.map(item => (
                    <span key={item} className="text-xs bg-slate-900/50 text-slate-300 px-2 py-1 rounded border border-slate-700">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Form Notes Preview */}
              <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-700">
                <p className="text-xs text-slate-400 mb-2 flex items-center gap-1">
                  <Info className="w-3 h-3" />
                  FORM GUIDE ({exercise.formNotes.length} steps)
                </p>
                <p className="text-sm text-slate-300">
                  {exercise.formNotes[0]}
                </p>
                <button className="text-xs text-primary hover:text-primary-400 mt-2">
                  Click to see full guide →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredExercises.length === 0 && (
        <div className="text-center py-12 bg-slate-800/50 rounded-xl border border-slate-700">
          <p className="text-slate-400">No exercises found</p>
        </div>
      )}

      {/* Exercise Detail Modal */}
      {selectedExercise && (
        <div
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedExercise(null)}
        >
          <div
            className="bg-slate-800 rounded-2xl border border-slate-700 max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-slate-800 border-b border-slate-700 p-6 z-10">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">{selectedExercise.name}</h2>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded">
                      {selectedExercise.category}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded ${getDifficultyColor(selectedExercise.difficulty)}`}>
                      {selectedExercise.difficulty}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded border ${getTypeColor(selectedExercise.type)}`}>
                      {selectedExercise.type}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedExercise(null)}
                  className="text-slate-400 hover:text-white text-2xl leading-none"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Muscles Targeted */}
              <div>
                <h3 className="text-white font-semibold mb-3 flex items-center">
                  <Target className="w-5 h-5 mr-2 text-primary" />
                  Muscles Targeted
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                    <p className="text-xs text-slate-400 mb-2">PRIMARY</p>
                    <div className="space-y-1">
                      {selectedExercise.primaryMuscles.map(muscle => (
                        <div key={muscle} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          <span className="text-white text-sm">{muscle}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                    <p className="text-xs text-slate-400 mb-2">SECONDARY</p>
                    <div className="space-y-1">
                      {selectedExercise.secondaryMuscles.map(muscle => (
                        <div key={muscle} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-slate-500 rounded-full"></div>
                          <span className="text-slate-300 text-sm">{muscle}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Notes */}
              <div>
                <h3 className="text-white font-semibold mb-3 flex items-center">
                  <Info className="w-5 h-5 mr-2 text-blue-400" />
                  Proper Form
                </h3>
                <div className="bg-blue-900/10 border border-blue-800 rounded-lg p-4">
                  <ol className="space-y-2">
                    {selectedExercise.formNotes.map((note, idx) => (
                      <li key={idx} className="flex gap-3 text-sm text-slate-300">
                        <span className="text-blue-400 font-bold flex-shrink-0">{idx + 1}.</span>
                        <span>{note}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              {/* Tips */}
              <div>
                <h3 className="text-white font-semibold mb-3 flex items-center">
                  💡 Pro Tips
                </h3>
                <div className="bg-green-900/10 border border-green-800 rounded-lg p-4">
                  <ul className="space-y-2">
                    {selectedExercise.tips.map((tip, idx) => (
                      <li key={idx} className="flex gap-3 text-sm text-green-300">
                        <span className="text-green-400">✓</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Common Mistakes */}
              <div>
                <h3 className="text-white font-semibold mb-3 flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2 text-red-400" />
                  Common Mistakes to Avoid
                </h3>
                <div className="bg-red-900/10 border border-red-800 rounded-lg p-4">
                  <ul className="space-y-2">
                    {selectedExercise.commonMistakes.map((mistake, idx) => (
                      <li key={idx} className="flex gap-3 text-sm text-red-300">
                        <span className="text-red-400">✗</span>
                        <span>{mistake}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Equipment */}
              <div>
                <h3 className="text-white font-semibold mb-3">Equipment Needed</h3>
                <div className="flex gap-2 flex-wrap">
                  {selectedExercise.equipment.map(item => (
                    <span key={item} className="bg-slate-700 text-white px-3 py-2 rounded-lg text-sm">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-slate-700">
                <button className="flex-1 px-4 py-3 bg-primary text-white rounded-lg hover:bg-primary-600 transition">
                  Add to Today's Workout
                </button>
                <button className="px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition">
                  Save to Favorites
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Reference */}
      <div className="mt-6 bg-slate-800/50 rounded-xl border border-slate-700 p-6">
        <h3 className="text-white font-semibold mb-4">Exercise Type Guide</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="bg-purple-900/20 border border-purple-800 rounded-lg p-4">
            <p className="text-purple-400 font-semibold mb-2">Compound Exercises</p>
            <p className="text-slate-300 text-xs">
              Multi-joint movements that work multiple muscle groups. Best for building overall strength and mass.
            </p>
            <p className="text-purple-400 text-xs mt-2">Examples: Squat, Deadlift, Bench Press</p>
          </div>
          <div className="bg-blue-900/20 border border-blue-800 rounded-lg p-4">
            <p className="text-blue-400 font-semibold mb-2">Isolation Exercises</p>
            <p className="text-slate-300 text-xs">
              Single-joint movements targeting specific muscles. Great for addressing weaknesses and muscle definition.
            </p>
            <p className="text-blue-400 text-xs mt-2">Examples: Bicep Curls, Leg Extensions</p>
          </div>
          <div className="bg-orange-900/20 border border-orange-800 rounded-lg p-4">
            <p className="text-orange-400 font-semibold mb-2">Cardio Activities</p>
            <p className="text-slate-300 text-xs">
              Aerobic exercises that improve cardiovascular health, endurance, and burn calories.
            </p>
            <p className="text-orange-400 text-xs mt-2">Examples: Running, Cycling, Swimming</p>
          </div>
        </div>
      </div>
    </div>
  )
}

