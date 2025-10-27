'use client'

import { useState } from 'react'
import { Check, X, Clock, Users, Flame, AlertCircle } from 'lucide-react'

interface Recipe {
  id: string
  name: string
  image: string
  prepTime: number
  cookTime: number
  servings: number
  calories: number
  protein: number
  carbs: number
  fat: number
  matchPercentage: number
  missingIngredients: string[]
  availableIngredients: string[]
}

const mockRecipes: Recipe[] = [
  {
    id: '1',
    name: 'Scrambled Eggs with Toast',
    image: '🍳',
    prepTime: 5,
    cookTime: 10,
    servings: 2,
    calories: 380,
    protein: 24,
    carbs: 32,
    fat: 18,
    matchPercentage: 100,
    missingIngredients: [],
    availableIngredients: ['Eggs', 'Bread', 'Butter', 'Milk']
  },
  {
    id: '2',
    name: 'Chicken Rice Bowl',
    image: '🍚',
    prepTime: 10,
    cookTime: 20,
    servings: 3,
    calories: 520,
    protein: 42,
    carbs: 55,
    fat: 12,
    matchPercentage: 100,
    missingIngredients: [],
    availableIngredients: ['Chicken Breast', 'Rice', 'Broccoli', 'Soy Sauce']
  },
  {
    id: '3',
    name: 'Greek Salad',
    image: '🥗',
    prepTime: 15,
    cookTime: 0,
    servings: 2,
    calories: 280,
    protein: 12,
    carbs: 18,
    fat: 18,
    matchPercentage: 80,
    missingIngredients: ['Feta Cheese', 'Olives'],
    availableIngredients: ['Cucumber', 'Tomatoes', 'Olive Oil', 'Lettuce']
  },
  {
    id: '4',
    name: 'Pasta Carbonara',
    image: '🍝',
    prepTime: 10,
    cookTime: 15,
    servings: 4,
    calories: 650,
    protein: 28,
    carbs: 72,
    fat: 26,
    matchPercentage: 75,
    missingIngredients: ['Bacon', 'Parmesan'],
    availableIngredients: ['Pasta', 'Eggs', 'Olive Oil']
  }
]

export default function MakeNowPage() {
  const [recipes] = useState(mockRecipes.sort((a, b) => b.matchPercentage - a.matchPercentage))

  const perfectMatches = recipes.filter(r => r.matchPercentage === 100)
  const nearMatches = recipes.filter(r => r.matchPercentage >= 70 && r.matchPercentage < 100)

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">What Can I Make Now?</h1>
        <p className="text-slate-400">Recipes you can make with your current pantry inventory</p>
      </div>

      {/* Info Banner */}
      <div className="bg-blue-900/20 border border-blue-800 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-blue-300 text-sm">
              Based on your <span className="font-semibold">current pantry inventory</span>, here are meals you can make right now without going to the store!
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-green-900/20 border border-green-800 p-4 rounded-lg">
          <p className="text-green-400 text-sm">Ready to Make</p>
          <p className="text-3xl font-bold text-white">{perfectMatches.length}</p>
          <p className="text-xs text-green-400 mt-1">100% ingredients available</p>
        </div>
        <div className="bg-yellow-900/20 border border-yellow-800 p-4 rounded-lg">
          <p className="text-yellow-400 text-sm">Almost There</p>
          <p className="text-3xl font-bold text-white">{nearMatches.length}</p>
          <p className="text-xs text-yellow-400 mt-1">1-2 items missing</p>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 p-4 rounded-lg">
          <p className="text-slate-400 text-sm">Last Synced</p>
          <p className="text-lg font-bold text-white">Just now</p>
          <button className="text-xs text-primary hover:text-primary-400 mt-1">Refresh Inventory</button>
        </div>
      </div>

      {/* Perfect Matches */}
      {perfectMatches.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
            <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
            Ready to Cook ({perfectMatches.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {perfectMatches.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </div>
      )}

      {/* Near Matches */}
      {nearMatches.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
            <span className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>
            Missing a Few Items ({nearMatches.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {nearMatches.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {recipes.length === 0 && (
        <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-12 text-center">
          <p className="text-slate-400">Add items to your pantry to see recipe suggestions!</p>
        </div>
      )}
    </div>
  )
}

function RecipeCard({ recipe }: { recipe: Recipe }) {
  const isComplete = recipe.matchPercentage === 100

  return (
    <div className={`bg-slate-800/50 rounded-lg border p-4 ${
      isComplete ? 'border-green-800 bg-green-900/10' : 'border-slate-700'
    }`}>
      <div className="flex gap-4">
        {/* Image */}
        <div className="w-20 h-20 bg-slate-700 rounded-lg flex items-center justify-center text-3xl flex-shrink-0">
          {recipe.image}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-white font-semibold">{recipe.name}</h3>
            <span className={`text-xs font-bold px-2 py-1 rounded ${
              isComplete ? 'bg-green-600 text-white' : 'bg-yellow-600 text-white'
            }`}>
              {recipe.matchPercentage}%
            </span>
          </div>

          {/* Meta */}
          <div className="flex items-center gap-3 text-xs text-slate-400 mb-2">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {recipe.prepTime + recipe.cookTime}m
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              {recipe.servings}
            </span>
            <span className="flex items-center gap-1">
              <Flame className="w-3 h-3" />
              {recipe.calories} cal
            </span>
          </div>

          {/* Ingredients Status */}
          <div className="mb-3">
            <div className="flex items-center gap-2 text-xs mb-1">
              <Check className="w-3 h-3 text-green-400" />
              <span className="text-green-400">{recipe.availableIngredients.length} available</span>
            </div>
            {recipe.missingIngredients.length > 0 && (
              <div className="flex items-center gap-2 text-xs">
                <X className="w-3 h-3 text-yellow-400" />
                <span className="text-yellow-400">
                  Missing: {recipe.missingIngredients.join(', ')}
                </span>
              </div>
            )}
          </div>

          {/* Macros Mini */}
          <div className="flex gap-2 text-xs mb-3">
            <span className="text-blue-400">P: {recipe.protein}g</span>
            <span className="text-slate-600">•</span>
            <span className="text-yellow-400">C: {recipe.carbs}g</span>
            <span className="text-slate-600">•</span>
            <span className="text-green-400">F: {recipe.fat}g</span>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            {isComplete ? (
              <button className="flex-1 px-3 py-2 bg-green-600 text-white text-xs rounded hover:bg-green-700 transition">
                Start Cooking
              </button>
            ) : (
              <button className="flex-1 px-3 py-2 bg-primary text-white text-xs rounded hover:bg-primary-600 transition">
                Add Missing to Grocery
              </button>
            )}
            <button className="px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-slate-700 rounded transition">
              View
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

