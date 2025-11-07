import React, { createContext, useCallback, useMemo, useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

export const AppContext = createContext()

const AppContextProvider = ({ children }) => {
  const currencySymbol = '$'
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const [doctors, setDoctors] = useState([])
  const [token, setToken] = useState(
    localStorage.getItem('token') ? localStorage.getItem('token') : ''
  )
  const [userData, setUserData] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Get doctors list
  const getDoctorsData = useCallback(async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/doctor/list")
      if (data.success) {
        setDoctors(data.doctors)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.error(error)
      toast.error(error.response?.data?.message || error.message)
    }
  }, [backendUrl])

  // Load user profile data
  const loadUserProfileData = useCallback(async () => {
    try {
      setIsLoading(true)
      const { data } = await axios.get(
        backendUrl + '/api/user/get-profile',
        { headers: { token } }
      )

      if (data.success) {
        setUserData(data.userData)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.error(error)
      if (error.response?.status === 401) {
        toast.error('Session expired. Please login again.')
        setToken('')
        localStorage.removeItem('token')
      } else {
        toast.error(error.response?.data?.message || error.message)
      }
    } finally {
      setIsLoading(false)
    }
  }, [backendUrl, token])

  // Update user profile data
  const updateUserProfile = useCallback(async (updatedData) => {
    try {
      setIsLoading(true)
      const { data } = await axios.put(
        backendUrl + '/api/user/update-profile',
        updatedData,
        { headers: { token } }
      )

      if (data.success) {
        setUserData(data.userData)
        toast.success('Profile updated successfully')
        return data
      } else {
        toast.error(data.message)
        return null
      }
    } catch (error) {
      console.error(error)
      if (error.response?.status === 401) {
        toast.error('Session expired. Please login again.')
        setToken('')
        localStorage.removeItem('token')
      } else {
        toast.error(error.response?.data?.message || error.message)
      }
      return null
    } finally {
      setIsLoading(false)
    }
  }, [backendUrl, token])

  // Memoized context value
  const value = useMemo(() => ({
    doctors,
    getDoctorsData,
    currencySymbol,
    token,
    setToken,
    backendUrl,
    userData,
    setUserData,
    loadUserProfileData,
    updateUserProfile,
    isLoading,
  }), [doctors, token, userData, loadUserProfileData, updateUserProfile, isLoading])

  // Handle token changes
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token)
    } else {
      localStorage.removeItem('token')
    }
  }, [token])

  // Fetch doctors on mount
  useEffect(() => {
    getDoctorsData()
  }, [getDoctorsData])

  // Load user profile when token changes
  useEffect(() => {
    if (token) {
      loadUserProfileData()
    } else {
      setUserData(false)
    }
  }, [token, loadUserProfileData])

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

export default AppContextProvider
