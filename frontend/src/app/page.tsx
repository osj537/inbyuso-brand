'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import LoginForm from '@/components/auth/LoginForm'
import SignupForm from '@/components/auth/SignupForm'

type View = 'login' | 'signup'

export default function HomePage() {
  const [view, setView] = useState<View>('login')
  const router = useRouter()

  const handleSuccess = () => {
    router.push('/main')
  }

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      {view === 'login' ? (
        <LoginForm
          onSuccess={handleSuccess}
          onSwitchToSignup={() => setView('signup')}
        />
      ) : (
        <SignupForm
          onSuccess={handleSuccess}
          onSwitchToLogin={() => setView('login')}
        />
      )}
    </main>
  )
}
