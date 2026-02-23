'use client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import Link from 'next/link'

import React from 'react'

function LoginPage() {
  const router = useRouter()

  const [loading, setLoading] = React.useState(false)

  const [buttenDisabled, setButtonDisabled] = React.useState(true)

  const [user, setUser] = React.useState({
    email : "",
    password : ""
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await axios.post('/api/users/login', user)
      toast.success("User logged in successfully", {duration: 3000})
      console.log(response.data)
      router.push('/profile')
    } catch (error) {
      toast.error("Error logging in user", {duration: 3000})
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    if(user.email && user.password){
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  }, [user])


  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gray-950">
      {/* Ambient background blobs */}
      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" style={{ animation: 'float 8s ease-in-out infinite' }} />
      <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl" style={{ animation: 'float 8s ease-in-out infinite 4s' }} />

      <div className="relative z-10 w-full max-w-md rounded-2xl border border-gray-800 bg-gray-900/60 p-8 shadow-2xl backdrop-blur-sm" style={{ animation: 'fadeInUp 0.8s cubic-bezier(0.16,1,0.3,1) both' }}>
        {/* Icon */}
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 text-2xl backdrop-blur-sm" style={{ animation: 'scaleIn 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s both' }}>
          🔓
        </div>

        <h1 className="mb-8 text-center text-3xl font-bold tracking-tight text-white">
          {loading ? "Loading..." : "Login"}
        </h1>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-300" htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email"
              placeholder="Email" 
              value={user.email} 
              onChange={(e) => setUser({...user, email: e.target.value})}
              className="w-full rounded-lg border border-gray-700 bg-gray-800/50 px-4 py-3 text-white placeholder-gray-500 transition duration-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-300" htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password"
              placeholder="Password" 
              value={user.password} 
              onChange={(e) => setUser({...user, password: e.target.value})}
              className="w-full rounded-lg border border-gray-700 bg-gray-800/50 px-4 py-3 text-white placeholder-gray-500 transition duration-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button 
            type="submit" 
            disabled={buttenDisabled}
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white shadow-lg shadow-blue-500/25 transition duration-200 hover:bg-blue-500 hover:shadow-blue-500/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Login
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-400">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="font-medium text-blue-400 transition-colors hover:text-blue-300">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default LoginPage