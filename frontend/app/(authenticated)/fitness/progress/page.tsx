'use client'

import { TrendingUp, TrendingDown, Award, Calendar, Dumbbell, Activity } from 'lucide-react'

export default function ProgressOverviewPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-6">Progress Overview</h1>

      {/* Key Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Current Weight</p>
              <p className="text-2xl font-bold text-white">185 lbs</p>
              <div className="flex items-center gap-1 mt-1">
                <TrendingDown className="w-3 h-3 text-green-400" />
                <p className="text-xs text-green-400">-3 lbs this month</p>
              </div>
            </div>
            <Activity className="w-8 h-8 text-green-400" />
          </div>
        </div>

        <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-800">
          <p className="text-blue-400 text-sm">Workouts This Month</p>
          <p className="text-2xl font-bold text-white">18</p>
          <div className="flex items-center gap-1 mt-1">
            <TrendingUp className="w-3 h-3 text-blue-400" />
            <p className="text-xs text-blue-400">+5 from last month</p>
          </div>
        </div>

        <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-800">
          <p className="text-purple-400 text-sm">Total Volume</p>
          <p className="text-2xl font-bold text-white">125,450</p>
          <p className="text-xs text-purple-400 mt-1">lbs lifted this month</p>
        </div>

        <div className="bg-orange-900/20 p-4 rounded-lg border border-orange-800">
          <p className="text-orange-400 text-sm">Running Distance</p>
          <p className="text-2xl font-bold text-white">42.3 mi</p>
          <p className="text-xs text-orange-400 mt-1">This month</p>
        </div>
      </div>

      {/* Recent Progress */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Strength Progress */}
        <div className="bg-slate-800/50 rounded-xl border border-slate-700">
          <div className="p-4 border-b border-slate-700">
            <h2 className="text-lg font-semibold text-white">Recent Strength PRs</h2>
          </div>
          <div className="divide-y divide-slate-700">
            {[
              { exercise: 'Bench Press', weight: 225, unit: 'lbs', date: '2 days ago', improvement: '+10 lbs' },
              { exercise: 'Squat', weight: 315, unit: 'lbs', date: '5 days ago', improvement: '+15 lbs' },
              { exercise: 'Deadlift', weight: 405, unit: 'lbs', date: '1 week ago', improvement: '+20 lbs' },
            ].map((pr, idx) => (
              <div key={idx} className="p-4 hover:bg-slate-700/30 transition">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">{pr.exercise}</p>
                    <p className="text-sm text-slate-400 mt-1">
                      {pr.weight} {pr.unit} • {pr.date}
                    </p>
                  </div>
                  <div className="text-right">
                    <Award className="w-5 h-5 text-yellow-400 mb-1 ml-auto" />
                    <p className="text-xs text-green-400">{pr.improvement}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cardio Progress */}
        <div className="bg-slate-800/50 rounded-xl border border-slate-700">
          <div className="p-4 border-b border-slate-700">
            <h2 className="text-lg font-semibold text-white">Recent Cardio Bests</h2>
          </div>
          <div className="divide-y divide-slate-700">
            {[
              { activity: '5K Run', time: '22:15', metric: 'Best Time', date: '3 days ago', improvement: '-0:45' },
              { activity: '10K Run', distance: 10, metric: 'Distance', date: '1 week ago', improvement: 'New!' },
              { activity: 'Mile Pace', pace: '7:10', metric: 'Avg Pace', date: '4 days ago', improvement: '-0:15/mi' },
            ].map((best, idx) => (
              <div key={idx} className="p-4 hover:bg-slate-700/30 transition">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">{best.activity}</p>
                    <p className="text-sm text-slate-400 mt-1">
                      {best.time || best.distance} • {best.date}
                    </p>
                  </div>
                  <div className="text-right">
                    <Award className="w-5 h-5 text-blue-400 mb-1 ml-auto" />
                    <p className="text-xs text-green-400">{best.improvement}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Weight Trend Chart Placeholder */}
      <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6 mb-6">
        <h2 className="text-lg font-semibold text-white mb-4">Body Weight Trend (Last 90 Days)</h2>
        <div className="h-64 bg-slate-900/50 rounded-lg border border-slate-700 flex items-center justify-center">
          <div className="text-center">
            <TrendingDown className="w-12 h-12 text-green-400 mx-auto mb-2" />
            <p className="text-slate-400">Chart visualization coming soon</p>
            <p className="text-sm text-slate-500 mt-1">Will show weight trend over time</p>
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6">
          <h3 className="text-white font-semibold mb-4 flex items-center">
            <Dumbbell className="w-5 h-5 mr-2 text-red-400" />
            Strength Progress
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-slate-400 text-sm">Total Volume (Month)</span>
              <span className="text-white font-bold">125,450 lbs</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400 text-sm">Personal Records</span>
              <span className="text-white font-bold">12</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400 text-sm">Avg Session</span>
              <span className="text-white font-bold">58 min</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6">
          <h3 className="text-white font-semibold mb-4 flex items-center">
            <Activity className="w-5 h-5 mr-2 text-blue-400" />
            Cardio Performance
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-slate-400 text-sm">Total Distance</span>
              <span className="text-white font-bold">42.3 mi</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400 text-sm">Avg Pace</span>
              <span className="text-white font-bold">7:45 /mi</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400 text-sm">Best 5K</span>
              <span className="text-white font-bold">22:15</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6">
          <h3 className="text-white font-semibold mb-4 flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-purple-400" />
            Consistency
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-slate-400 text-sm">Current Streak</span>
              <span className="text-white font-bold">21 days</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400 text-sm">Monthly Goal</span>
              <span className="text-white font-bold">18/20</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400 text-sm">Completion Rate</span>
              <span className="text-white font-bold">90%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
