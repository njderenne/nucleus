'use client'

import { useState } from 'react'
import { Plus, Check, Trash2, Send } from 'lucide-react'

interface GroceryItem {
  id: string
  name: string
  quantity: number
  unit: string
  category: string
  checked: boolean
  addedBy: 'manual' | 'auto'
}

const mockGroceryList: GroceryItem[] = [
  { id: '1', name: 'Milk', quantity: 2, unit: 'gallon', category: 'Dairy', checked: false, addedBy: 'auto' },
  { id: '2', name: 'Bread', quantity: 1, unit: 'loaf', category: 'Bakery', checked: false, addedBy: 'manual' },
  { id: '3', name: 'Bananas', quantity: 6, unit: 'count', category: 'Produce', checked: true, addedBy: 'manual' },
  { id: '4', name: 'Chicken Breast', quantity: 2, unit: 'lbs', category: 'Meat', checked: false, addedBy: 'auto' },
]

export default function PantryGroceryListPage() {
  const [items, setItems] = useState<GroceryItem[]>(mockGroceryList)
  const [newItemName, setNewItemName] = useState('')

  const toggleItem = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ))
  }

  const deleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id))
  }

  const addItem = () => {
    if (!newItemName.trim()) return
    
    const newItem: GroceryItem = {
      id: Date.now().toString(),
      name: newItemName,
      quantity: 1,
      unit: 'count',
      category: 'Other',
      checked: false,
      addedBy: 'manual'
    }
    
    setItems([...items, newItem])
    setNewItemName('')
  }

  const uncheckedItems = items.filter(item => !item.checked)
  const checkedItems = items.filter(item => item.checked)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white">This Week's Grocery List</h1>
          <p className="text-slate-400 text-sm mt-1">
            {uncheckedItems.length} items to buy • {checkedItems.length} checked off
          </p>
        </div>
        <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
          <Send className="w-4 h-4" />
          <span>Share List</span>
        </button>
      </div>

      {/* Add Item */}
      <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-4 mb-6">
        <div className="flex gap-3">
          <input
            type="text"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addItem()}
            placeholder="Add an item to your list..."
            className="flex-1 px-4 py-2 bg-slate-900/50 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent placeholder:text-slate-500"
          />
          <button
            onClick={addItem}
            className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition"
          >
            <Plus className="w-4 h-4" />
            <span>Add</span>
          </button>
        </div>

        <div className="mt-4 flex gap-2">
          <button className="text-sm text-blue-400 hover:text-blue-300">
            + Add from Master List
          </button>
          <span className="text-slate-600">•</span>
          <button className="text-sm text-purple-400 hover:text-purple-300">
            + AI Suggest Items
          </button>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-blue-900/20 border border-blue-800 rounded-lg p-4 mb-6">
        <p className="text-blue-300 text-sm">
          💡 Items marked with "Auto" were automatically added based on your low stock and usage patterns.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* To Buy */}
        <div className="bg-slate-800/50 rounded-xl border border-slate-700">
          <div className="p-4 border-b border-slate-700">
            <h2 className="text-lg font-semibold text-white">To Buy ({uncheckedItems.length})</h2>
          </div>
          <div className="divide-y divide-slate-700">
            {uncheckedItems.map((item) => (
              <div key={item.id} className="p-4 hover:bg-slate-700/30 transition group">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleItem(item.id)}
                    className="w-5 h-5 rounded border-2 border-slate-600 hover:border-primary transition flex items-center justify-center"
                  >
                  </button>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-white font-medium">{item.name}</h3>
                      {item.addedBy === 'auto' && (
                        <span className="text-xs bg-purple-900/30 text-purple-400 px-2 py-0.5 rounded">
                          Auto
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-slate-400">
                      {item.quantity} {item.unit} • {item.category}
                    </p>
                  </div>

                  <button
                    onClick={() => deleteItem(item.id)}
                    className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}

            {uncheckedItems.length === 0 && (
              <div className="p-8 text-center text-slate-400">
                <Check className="w-12 h-12 mx-auto mb-2 text-green-400" />
                <p>All done! Nothing left to buy.</p>
              </div>
            )}
          </div>
        </div>

        {/* Checked Off */}
        <div className="bg-slate-800/50 rounded-xl border border-slate-700">
          <div className="p-4 border-b border-slate-700">
            <h2 className="text-lg font-semibold text-white">In Cart ({checkedItems.length})</h2>
          </div>
          <div className="divide-y divide-slate-700">
            {checkedItems.map((item) => (
              <div key={item.id} className="p-4 hover:bg-slate-700/30 transition group">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleItem(item.id)}
                    className="w-5 h-5 rounded border-2 border-green-600 bg-green-600 transition flex items-center justify-center"
                  >
                    <Check className="w-3 h-3 text-white" />
                  </button>
                  
                  <div className="flex-1">
                    <h3 className="text-slate-400 font-medium line-through">{item.name}</h3>
                    <p className="text-sm text-slate-500">
                      {item.quantity} {item.unit}
                    </p>
                  </div>

                  <button
                    onClick={() => deleteItem(item.id)}
                    className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}

            {checkedItems.length === 0 && (
              <div className="p-8 text-center text-slate-400">
                <p>Items you check off will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      {checkedItems.length > 0 && (
        <div className="mt-6 flex justify-end gap-3">
          <button className="px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition">
            Clear Checked Items
          </button>
          <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-600 transition">
            Add Checked Items to Inventory
          </button>
        </div>
      )}
    </div>
  )
}

