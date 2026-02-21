'use client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import Link from 'next/link'

import React from 'react'

function SignUpPage() {
  const router = useRouter()

  const [loading, setLoading] = React.useState(false)

  const [buttenDisabled, setButtonDisabled] = React.useState(true)

  const [user, setUser] = React.useState({
    username : "",
    email : "",
    password : ""
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await axios.post('/api/users/signup', user)
      toast.success("User created successfully")
      console.log(response.data)
      router.push('/login')
    } catch (error) {
      toast.error("Error creating user")
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    if(user.username && user.email && user.password){
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  }, [user])


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-500">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          {loading ? "Loading..." : "Sign Up"}
        </h1>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <label 
          className='text-gray-950'
          htmlFor="username">Username</label>
          <input 
            type="text" 
            id="username"
            placeholder="Username" 
            value={user.username} 
            onChange={(e) => setUser({...user, username: e.target.value})}
            className="text-gray-950 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
          />
          <label className='text-gray-950' htmlFor="email">Email</label>
          <input 
            type="email" 
            id="email"
            placeholder="Email" 
            value={user.email} 
            onChange={(e) => setUser({...user, email: e.target.value})}
            className="text-gray-950 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
          />
          <label className='text-gray-950' htmlFor="password">Password</label>
          <input 
            type="password" 
            id="password"
            placeholder="Password" 
            value={user.password} 
            onChange={(e) => setUser({...user, password: e.target.value})}
            className="text-gray-950 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
          />
          <button 
            type="submit" 
            disabled={buttenDisabled}
            className="w-full py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-purple-600 hover:text-purple-800 font-medium hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SignUpPage