import React, { useState } from 'react'
import { assets } from '../assets/assets_frontend/assets'

const MyProfile = () => {
  const [userData, setUserData] = useState({
    name: "John Cena",
    image: assets.profile_pic,
    email: "johncena@gmail.com",
    phone: "+91799546872",
    address: {
      line1: "68nh",
      line2: "Assam, India"
    },
    gender: "Male",
    dob: "1998-06-31"
  })

  const [isEdit, setIsEdit] = useState(false)

  return (
    <div className="max-w-lg mx-auto p-6 bg-white">
      
      {/* Profile Image */}
      <div className="flex justify-center mb-6">
        <img 
          className="w-32 h-32 rounded-full object-cover border-4 border-blue-100" 
          src={userData.image} 
          alt="Profile" 
        />
      </div>

      {/* Name Section */}
      <div className="text-center mb-6">
        {isEdit ? (
          <input
            className="text-2xl font-semibold text-center border-b-2 border-blue-300 focus:outline-none focus:border-blue-500 bg-transparent"
            type="text"
            value={userData.name}
            onChange={(e) => setUserData(prev => ({...prev, name: e.target.value}))}
          />
        ) : (
          <h2 className="text-2xl font-semibold text-gray-800">{userData.name}</h2>
        )}
      </div>

      <hr className="mb-6 border-gray-200" />

      {/* Contact Information */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-700 mb-4">Contact Information</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Email:</label>
            <p className="text-gray-800 bg-gray-50 p-2 rounded">{userData.email}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Phone:</label>
            {isEdit ? (
              <input
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                type="text"
                value={userData.phone}
                onChange={(e) => setUserData(prev => ({...prev, phone: e.target.value}))}
              />
            ) : (
              <p className="text-gray-800 bg-gray-50 p-2 rounded">{userData.phone}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Address:</label>
            {isEdit ? (
              <div className="space-y-2">
                <input
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  type="text"
                  placeholder="Address Line 1"
                  value={userData.address.line1}
                  onChange={(e) => setUserData(prev => ({
                    ...prev,
                    address: {...prev.address, line1: e.target.value}
                  }))}
                />
                <input
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  type="text"
                  placeholder="Address Line 2"
                  value={userData.address.line2}
                  onChange={(e) => setUserData(prev => ({
                    ...prev,
                    address: {...prev.address, line2: e.target.value}
                  }))}
                />
              </div>
            ) : (
              <div className="text-gray-800 bg-gray-50 p-2 rounded">
                {userData.address.line1}
                <br />
                {userData.address.line2}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Basic Information */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-700 mb-4">Basic Information</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Gender:</label>
            {isEdit ? (
              <select
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                value={userData.gender}
                onChange={(e) => setUserData(prev => ({...prev, gender: e.target.value}))}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              <p className="text-gray-800 bg-gray-50 p-2 rounded">{userData.gender}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Date of Birth:</label>
            {isEdit ? (
              <input
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                type="date"
                value={userData.dob}
                onChange={(e) => setUserData(prev => ({...prev, dob: e.target.value}))}
              />
            ) : (
              <p className="text-gray-800 bg-gray-50 p-2 rounded">
                {new Date(userData.dob).toLocaleDateString('en-IN', {
                  year: 'numeric',
                  month: 'long', 
                  day: 'numeric'
                })}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="text-center">
        {isEdit ? (
          <button
            className="bg-blue-600 text-white px-8 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium"
            onClick={() => setIsEdit(false)}
          >
            Save Information
          </button>
        ) : (
          <button
            className="bg-gray-600 text-white px-8 py-2 rounded-lg hover:bg-gray-700 transition-all duration-200 font-medium"
            onClick={() => setIsEdit(true)}
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  )
}

export default MyProfile
