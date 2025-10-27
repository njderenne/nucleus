'use client'

import { useState } from 'react'
import { Brain, Sparkles, RefreshCw, ThumbsUp, ThumbsDown } from 'lucide-react'

interface RecipeSuggestion {
  id: string
  name: string
  image: string
  reason: string
  calories: number
  protein: number
  carbs: number
  fat: number
  prepTime: number
  difficulty: string
  confidence: number
}

const mockSuggestions: RecipeSuggestion[] = [
  {
    id: '1',
    name: 'Mediterranean Chicken Bowl',
    image: '🥙',
    reason: 'Based on your high protein preference and available chicken in pantry',
    calories: 485,
    protein: 48,
    carbs: 42,
    fat: 14,
    prepTime: 30,
    difficulty: 'Easy',
    confidence: 95
  },
  {
    id: '2',
    name: 'Overnight Oats with Berries',
    image: '🥣',
    reason: 'Perfect for busy mornings, matches your breakfast calorie goals',
    calories: 340,
    protein: 18,
    carbs: 52,
    fat: 8,
    prepTime: 5,
    difficulty: 'Easy',
    confidence: 88
  },
  {
    id: '3',
    name: 'Thai Peanut Noodles',
    image: '🍜',
    reason: 'New cuisine to try! Similar to recipes you favorited before',
    calories: 520,
    protein: 22,
    carbs: 68,
    fat: 18,
    prepTime: 25,
    difficulty: 'Medium',
    confidence: 82
  }
]

export default function AIRecipeSuggestionsPage() {
  const [suggestions, setSuggestions] = useState(mockSuggestions)
  const [generating, setGenerating] = useState(false)

  const handleRegenerate = () => {
    setGenerating(true)
    setTimeout(() => setGenerating(false), 2000) // Simulate AI generation
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">AI Recipe Suggestions</h1>
          <p className="text-slate-400">Personalized recommendations just for you</p>
        </div>
        <button 
          onClick={handleRegenerate}
          disabled={generating}
          className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${generating ? 'animate-spin' : ''}`} />
          <span>{generating ? 'Generating...' : 'Refresh Ideas'}</span>
        </button>
      </div>

      {/* AI Context Info */}
      <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-800/50 rounded-xl p-6 mb-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-white font-semibold mb-2 flex items-center">
              <Sparkles className="w-4 h-4 mr-2 text-yellow-400" />
              How AI Chooses Your Recipes
            </h3>
            <p className="text-slate-300 text-sm mb-3">
              Our AI analyzes multiple factors to suggest the perfect meals for you:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                <span className="text-slate-300">Your pantry inventory</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                <span className="text-slate-300">Dietary preferences</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                <span className="text-slate-300">Calorie & macro goals</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                <span className="text-slate-300">Previous favorites</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                <span className="text-slate-300">Cooking skill level</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                <span className="text-slate-300">Workout schedule</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Suggestions */}
      <div className="space-y-6">
        {suggestions.map((recipe, index) => (
          <div key={recipe.id} className="bg-slate-800/50 rounded-xl border border-slate-700 p-6 hover:border-slate-600 transition">
            <div className="flex gap-6">
              {/* Image & Badge */}
              <div className="relative">
                <div className="w-32 h-32 bg-gradient-to-br from-slate-700 to-slate-800 rounded-lg flex items-center justify-center text-5xl">
                  {recipe.image}
                </div>
                <div className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                  #{index + 1}
                </div>
              </div>

              {/* Details */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">{recipe.name}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-purple-900/30 text-purple-400 px-2 py-1 rounded border border-purple-800">
                        AI Suggested
                      </span>
                      <span className="text-xs text-slate-400">
                        {recipe.confidence}% match
                      </span>
                    </div>
                  </div>
                </div>

                {/* AI Reasoning */}
                <div className="bg-slate-900/50 rounded-lg p-3 mb-3 border border-slate-700">
                  <p className="text-sm text-slate-300 italic">
                    💡 &quot;{recipe.reason}&quot;
                  </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-4 gap-3 mb-3">
                  <div className="text-center">
                    <p className="text-xs text-slate-400">Calories</p>
                    <p className="text-lg font-bold text-white">{recipe.calories}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-blue-400">Protein</p>
                    <p className="text-lg font-bold text-white">{recipe.protein}g</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-yellow-400">Carbs</p>
                    <p className="text-lg font-bold text-white">{recipe.carbs}g</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-green-400">Fat</p>
                    <p className="text-lg font-bold text-white">{recipe.fat}g</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs text-slate-400 mb-4">
                  <span>⏱️ {recipe.prepTime} min</span>
                  <span>•</span>
                  <span>📊 {recipe.difficulty}</span>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-600 transition">
                    View Full Recipe
                  </button>
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                    Add to Planner
                  </button>
                  <button className="px-3 py-2 hover:bg-slate-700 rounded-lg transition">
                    <ThumbsUp className="w-4 h-4 text-slate-400 hover:text-green-400" />
                  </button>
                  <button className="px-3 py-2 hover:bg-slate-700 rounded-lg transition">
                    <ThumbsDown className="w-4 h-4 text-slate-400 hover:text-red-400" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Customize Preferences */}
      <div className="mt-8 bg-slate-800/50 rounded-xl border border-slate-700 p-6">
        <h3 className="text-white font-semibold mb-4">Customize AI Preferences</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-slate-400 mb-2 block">Dietary Restrictions</label>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-600 bg-slate-700 text-primary" />
                <span className="text-slate-300 text-sm">Vegetarian</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-600 bg-slate-700 text-primary" />
                <span className="text-slate-300 text-sm">Gluten Free</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-600 bg-slate-700 text-primary" />
                <span className="text-slate-300 text-sm">Dairy Free</span>
              </label>
            </div>
          </div>
          <div>
            <label className="text-sm text-slate-400 mb-2 block">Preferences</label>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-600 bg-slate-700 text-primary" defaultChecked />
                <span className="text-slate-300 text-sm">High Protein</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-600 bg-slate-700 text-primary" />
                <span className="text-slate-300 text-sm">Low Carb</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-600 bg-slate-700 text-primary" />
                <span className="text-slate-300 text-sm">Quick Meals (&lt;30 min)</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

