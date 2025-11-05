import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets_frontend/assets'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const MyProfile = () => {

  const { userData, setUserData, token, backendUrl, loadUserProfileData } = useContext(AppContext)
  const [isEdit, setIsEdit] = useState(false)
  const [image, setImage] = useState(null)

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData()
      formData.append("name", userData.name)
      formData.append("phone", userData.phone)
      formData.append("address", JSON.stringify(userData.address))
      formData.append("gender", userData.gender)
      formData.append("dob", userData.dob)

      if (image) formData.append("image", image)

      const { data } = await axios.post(
        `${backendUrl}/api/user/update-profile`,
        formData,
        {
          headers: {
            token,
            "Content-Type": "multipart/form-data",
          },
        }
      )

      if (data.success) {
        toast.success(data.message)
        await loadUserProfileData()
        setIsEdit(false)
        setImage(null)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error("Profile update failed")
    }
  }

  if (!userData) return null

  return (
    <div className="max-w-lg mx-auto p-6 bg-white">

      {/* ===== Profile Image Section ===== */}
      {isEdit ? (
        <label htmlFor="image">
          <div className="inline-block relative cursor-pointer mx-auto">
            <img
              className="w-36 h-36 rounded-full object-cover border-4 border-blue-200"
              src={image ? URL.createObjectURL(image) : userData.image}
              alt=""
            />

            {!image && (
              <img
                className="w-8 absolute bottom-2 right-2"
                src={assets.upload_icon}
                alt=""
              />
            )}
          </div>

          <input
            type="file"
            id="image"
            hidden
            onChange={(e) => setImage(e.target.files[0])}
          />
        </label>
      ) : (
        <div className="flex justify-center mb-6">
          <img
            className="w-36 h-36 rounded-full object-cover border-4 border-blue-200"
            src={userData.image}
            alt="Profile"
          />
        </div>
      )}

      {/* ===== Name ===== */}
      <div className="text-center mb-6 mt-2">
        {isEdit ? (
          <input
            className="text-2xl font-semibold text-center border-b-2 border-blue-300 focus:outline-none focus:border-blue-500 bg-transparent"
            type="text"
            value={userData.name}
            onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))}  
          />
        ) : (
          <h2 className="text-2xl font-semibold text-gray-800">{userData.name}</h2>
        )}
      </div>

      <hr className="mb-6 border-gray-200" />

      {/* ===== Contact Info ===== */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-700 mb-4">Contact Information</h3>

        <div className="space-y-4">
          
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Email:</label>
            <p className="text-gray-800 bg-gray-50 p-2 rounded">{userData.email}</p>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Phone:</label>
            {isEdit ? (
              <input
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                type="text"
                value={userData.phone}
                onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))}  
              />
            ) : (
              <p className="text-gray-800 bg-gray-50 p-2 rounded">{userData.phone}</p>
            )}
          </div>

          {/* Address */}
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
                    address: { ...prev.address, line1: e.target.value }
                  }))}
                />
                <input
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  type="text"
                  placeholder="Address Line 2"
                  value={userData.address.line2}
                  onChange={(e) => setUserData(prev => ({
                    ...prev,
                    address: { ...prev.address, line2: e.target.value }
                  }))}
                />
              </div>
            ) : (
              <div className="text-gray-800 bg-gray-50 p-2 rounded">
                {userData.address.line1} <br /> {userData.address.line2}
              </div>
            )}
          </div>

        </div>
      </div>

      {/* ===== Basic Info ===== */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-700 mb-4">Basic Information</h3>

        <div className="space-y-4">
          
          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Gender:</label>
            {isEdit ? (
              <select
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                value={userData.gender}
                onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))}  
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              <p className="text-gray-800 bg-gray-50 p-2 rounded">{userData.gender}</p>
            )}
          </div>

          {/* DOB */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Date of Birth:</label>
            {isEdit ? (
              <input
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                type="date"
                value={userData.dob}
                onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))}  
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

      {/* ===== Action Buttons ===== */}
      <div className="text-center">
        {isEdit ? (
          <button
            className="bg-blue-600 text-white px-8 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium"
            onClick={updateUserProfileData}
          >
            Save Information
          </button>
        ) : (
          <button
            className="bg-gray-700 text-white px-8 py-2 rounded-lg hover:bg-gray-800 transition-all duration-200 font-medium"
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
