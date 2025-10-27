'use client'

import { useState } from 'react'
import { Plus, Search, Clock, Users, Flame, Heart } from 'lucide-react'

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
  tags: string[]
  difficulty: 'Easy' | 'Medium' | 'Hard'
  favorite: boolean
}

const mockRecipes: Recipe[] = [
  {
    id: '1',
    name: 'Grilled Chicken with Quinoa',
    image: '🍗',
    prepTime: 15,
    cookTime: 25,
    servings: 4,
    calories: 420,
    protein: 45,
    carbs: 35,
    fat: 12,
    tags: ['High Protein', 'Gluten Free', 'Healthy'],
    difficulty: 'Easy',
    favorite: true
  },
  {
    id: '2',
    name: 'Salmon with Roasted Vegetables',
    image: '🐟',
    prepTime: 10,
    cookTime: 20,
    servings: 2,
    calories: 520,
    protein: 42,
    carbs: 28,
    fat: 26,
    tags: ['Keto', 'High Protein', 'Omega-3'],
    difficulty: 'Medium',
    favorite: false
  },
  {
    id: '3',
    name: 'Greek Yogurt Parfait',
    image: '🥣',
    prepTime: 5,
    cookTime: 0,
    servings: 1,
    calories: 320,
    protein: 20,
    carbs: 45,
    fat: 6,
    tags: ['Breakfast', 'Quick', 'High Protein'],
    difficulty: 'Easy',
    favorite: true
  },
  {
    id: '4',
    name: 'Beef Stir Fry',
    image: '🥘',
    prepTime: 20,
    cookTime: 15,
    servings: 4,
    calories: 380,
    protein: 32,
    carbs: 30,
    fat: 15,
    tags: ['Asian', 'Quick', 'Dinner'],
    difficulty: 'Medium',
    favorite: false
  }
]

export default function AllRecipesPage() {
  const [recipes] = useState(mockRecipes)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterTag, setFilterTag] = useState('All')

  const allTags = ['All', ...Array.from(new Set(recipes.flatMap(r => r.tags)))]
  
  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTag = filterTag === 'All' || recipe.tags.includes(filterTag)
    return matchesSearch && matchesTag
  })

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white">All Recipes</h1>
          <p className="text-slate-400 text-sm mt-1">{recipes.length} recipes in your collection</p>
        </div>
        <button className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition">
          <Plus className="w-4 h-4" />
          <span>Add Recipe</span>
        </button>
      </div>

      {/* Search & Filters */}
      <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search recipes..."
              className="w-full pl-10 pr-4 py-2 bg-slate-900/50 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent placeholder:text-slate-500"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setFilterTag(tag)}
                className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition ${
                  filterTag === tag
                    ? 'bg-primary text-white'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Recipe Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecipes.map((recipe) => (
          <div key={recipe.id} className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden hover:border-slate-600 transition cursor-pointer group">
            {/* Image */}
            <div className="h-48 bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center text-6xl relative">
              {recipe.image}
              <button className="absolute top-3 right-3 w-8 h-8 bg-slate-900/80 rounded-full flex items-center justify-center hover:scale-110 transition">
                <Heart className={`w-4 h-4 ${recipe.favorite ? 'fill-red-500 text-red-500' : 'text-white'}`} />
              </button>
              <span className={`absolute top-3 left-3 px-2 py-1 rounded text-xs font-medium ${
                recipe.difficulty === 'Easy' ? 'bg-green-600 text-white' :
                recipe.difficulty === 'Medium' ? 'bg-yellow-600 text-white' :
                'bg-red-600 text-white'
              }`}>
                {recipe.difficulty}
              </span>
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="text-white font-semibold mb-2 group-hover:text-primary transition">{recipe.name}</h3>
              
              {/* Meta Info */}
              <div className="flex items-center gap-4 text-xs text-slate-400 mb-3">
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

              {/* Macros */}
              <div className="grid grid-cols-3 gap-2 mb-3">
                <div className="bg-blue-900/20 border border-blue-800 rounded p-2 text-center">
                  <p className="text-xs text-blue-400">Protein</p>
                  <p className="text-sm font-bold text-white">{recipe.protein}g</p>
                </div>
                <div className="bg-yellow-900/20 border border-yellow-800 rounded p-2 text-center">
                  <p className="text-xs text-yellow-400">Carbs</p>
                  <p className="text-sm font-bold text-white">{recipe.carbs}g</p>
                </div>
                <div className="bg-green-900/20 border border-green-800 rounded p-2 text-center">
                  <p className="text-xs text-green-400">Fat</p>
                  <p className="text-sm font-bold text-white">{recipe.fat}g</p>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-3">
                {recipe.tags.slice(0, 3).map(tag => (
                  <span key={tag} className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button className="flex-1 px-3 py-2 bg-primary text-white text-sm rounded hover:bg-primary-600 transition">
                  View Recipe
                </button>
                <button className="px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-700 rounded transition">
                  Add to Plan
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredRecipes.length === 0 && (
        <div className="text-center py-12 bg-slate-800/50 rounded-xl border border-slate-700">
          <p className="text-slate-400">No recipes found</p>
        </div>
      )}
    </div>
  )
}
