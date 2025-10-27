'use client'

import { useAuthStore } from '@/lib/store'

export default function ProfilePage() {
  const user = useAuthStore((state) => state.user)

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-6">Profile</h1>
      <div className="bg-slate-800/50 rounded-xl p-8 shadow-sm border border-slate-700">
        <div className="space-y-4">
          <div>
            <label className="text-sm text-slate-400">Full Name</label>
            <p className="text-white text-lg">{user?.full_name || 'Not set'}</p>
          </div>
          <div>
            <label className="text-sm text-slate-400">Email</label>
            <p className="text-white text-lg">{user?.email || 'guest@nucleus.app'}</p>
          </div>
        </div>
        <p className="text-slate-400 mt-6">Profile editing coming soon...</p>
      </div>
    </div>
  )
}

