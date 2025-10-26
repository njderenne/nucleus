import Link from 'next/link'
import { ArrowRight, Brain, Calendar, DollarSign, Home, Camera, Map } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-slate-800">Nucleus</span>
          </div>
          <div className="space-x-4">
            <Link href="/login" className="text-slate-600 hover:text-slate-900 font-medium">
              Login
            </Link>
            <Link href="/register" className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-600 font-medium">
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-6xl font-bold text-slate-900 mb-6">
          Your Life&apos;s <span className="text-primary">Operating System</span>
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10">
          Nucleus brings AI-powered intelligence to manage every aspect of your personal life. 
          One hub for your home, schedule, finances, hobbies, and more.
        </p>
        <Link 
          href="/register" 
          className="inline-flex items-center space-x-2 bg-primary text-white px-8 py-4 rounded-xl hover:bg-primary-600 font-semibold text-lg shadow-lg transition"
        >
          <span>Start Your Journey</span>
          <ArrowRight className="w-5 h-5" />
        </Link>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center text-slate-900 mb-12">
          Everything You Need, One Platform
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Home className="w-8 h-8" />}
            title="Pantry & Meals"
            description="Track ingredients, get recipe suggestions, and never waste food again."
            color="bg-green-500"
          />
          <FeatureCard
            icon={<Calendar className="w-8 h-8" />}
            title="Smart Scheduling"
            description="Sync with Google Calendar and get AI-powered daily summaries."
            color="bg-blue-500"
          />
          <FeatureCard
            icon={<DollarSign className="w-8 h-8" />}
            title="Budget Tracking"
            description="Monitor expenses, set budgets, and get financial insights."
            color="bg-emerald-500"
          />
          <FeatureCard
            icon={<Map className="w-8 h-8" />}
            title="Hunting Management"
            description="Track stands, sightings, and patterns with GPS mapping."
            color="bg-orange-500"
          />
          <FeatureCard
            icon={<Camera className="w-8 h-8" />}
            title="Photo Gallery"
            description="Organize photos by location with AI-powered tagging."
            color="bg-purple-500"
          />
          <FeatureCard
            icon={<Brain className="w-8 h-8" />}
            title="AI Assistant"
            description="Chat with your intelligent assistant for summaries and insights."
            color="bg-indigo-500"
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white/80 backdrop-blur-sm mt-20">
        <div className="container mx-auto px-4 py-8 text-center text-slate-600">
          <p>&copy; 2025 Nucleus. Your life&apos;s operating system.</p>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description, color }: {
  icon: React.ReactNode
  title: string
  description: string
  color: string
}) {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition border border-slate-200">
      <div className={`${color} w-16 h-16 rounded-xl flex items-center justify-center text-white mb-4`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-600">{description}</p>
    </div>
  )
}

