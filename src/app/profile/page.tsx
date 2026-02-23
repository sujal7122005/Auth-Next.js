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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-2xl font-bold mb-4">Profile Page</h1>
      <button 
        onClick={userProfile}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Get User Profile
      </button>
      <div>
        {profileData 
          ? 
          <pre className="bg-gray-800 p-4 rounded text-sm overflow-auto max-w-lg">
            {JSON.stringify(profileData, null, 2)}
          </pre>
          : 
          <p className="text-gray-400">No profile data available</p>}
      </div>

      <button 
        onClick={logoutUser}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Logout
      </button>
    </div>
  )
}

export default ProfilePage