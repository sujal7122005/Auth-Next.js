'use client'

import React from 'react'
import axios from 'axios';
import toast, { Toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface ProfileData {
  username: string;
  email: string;
}

function ProfilePage() {
  const [profileData, setProfileData] = React.useState<ProfileData | null>(null);
  const router = useRouter();

  const userProfile = async () => {
    try {
      const response = await axios.post('/api/users/profile')
      setProfileData(response.data);
      console.log("User Profile Response:", response.data);
      toast.success("User profile fetched successfully!", { duration: 3000 });
    } catch (error) {
      console.log("Something went wrong in fetching user profile:", error);
      toast.error("Failed to fetch user profile. Please try again.", { duration: 3000 });
    }
  }

  const logoutUser = async () => {
    try {
      const response = await axios.get('/api/users/logout')
      console.log("Logout Response:", response.data);
      toast.success("Logged out successfully!", { duration: 3000 });
      setProfileData(null); // Clear profile data on logout
      router.push('/login'); // Redirect to login page after logout

    } catch (error) {
      console.log("Something went wrong in logging out user:", error);
      toast.error("Failed to log out. Please try again.", { duration: 3000 });
    }
  }


  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gray-950">
      {/* Ambient background blobs */}
      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" style={{ animation: 'float 8s ease-in-out infinite' }} />
      <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl" style={{ animation: 'float 8s ease-in-out infinite 4s' }} />

      <div className="relative z-10 flex w-full max-w-md flex-col items-center rounded-2xl border border-gray-800 bg-gray-900/60 p-8 shadow-2xl backdrop-blur-sm" style={{ animation: 'fadeInUp 0.8s cubic-bezier(0.16,1,0.3,1) both' }}>
        {/* Icon */}
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 text-2xl backdrop-blur-sm" style={{ animation: 'scaleIn 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s both' }}>
          👤
        </div>

        <h1 className="mb-6 text-3xl font-bold tracking-tight text-white">Profile</h1>

        <button 
          onClick={userProfile}
          className="mb-6 w-full rounded-lg bg-blue-600 py-3 font-semibold text-white shadow-lg shadow-blue-500/25 transition duration-200 hover:bg-blue-500 hover:shadow-blue-500/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
        >
          Get User Profile
        </button>

        <div className="mb-6 w-full">
          {profileData 
            ? 
            <pre className="w-full overflow-auto rounded-lg border border-gray-700 bg-gray-800/50 p-4 text-sm text-gray-300">
              {JSON.stringify(profileData, null, 2)}
            </pre>
            : 
            <p className="text-center text-sm text-gray-500">No profile data available</p>}
        </div>

        <button 
          onClick={logoutUser}
          className="w-full rounded-lg bg-red-600 py-3 font-semibold text-white shadow-lg shadow-red-500/25 transition duration-200 hover:bg-red-500 hover:shadow-red-500/40 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900"
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default ProfilePage