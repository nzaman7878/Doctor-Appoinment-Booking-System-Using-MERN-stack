import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { DoctorContext } from '../context/DoctorContext'  
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext)
  const { dToken, setDToken } = useContext(DoctorContext)  
  const navigate = useNavigate()

  const logout = () => {
    // ✅ Logout Admin if logged in
    if (aToken) {
      setAToken('')
      localStorage.removeItem('aToken')
    }
    
    // ✅ Logout Doctor if logged in
    if (dToken) {
      setDToken('')
      localStorage.removeItem('dToken')
    }
    
    navigate('/')
  }

  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white'>
      <div className='flex items-center gap-2 text-xs'>
        <img 
          className='w-36 sm:w-40 cursor-pointer' 
          src={assets.admin_logo} 
          alt="Logo"
          onClick={() => navigate('/')}  
        />
        <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600'>
          {aToken ? 'Admin' : dToken ? 'Doctor' : 'Guest'}
        </p>
      </div>
      <button 
        onClick={logout} 
        className='bg-primary text-white text-sm px-10 py-2 rounded-full hover:bg-primary/90 transition-all'
        disabled={!aToken && !dToken}  
      >
        Logout
      </button>
    </div>
  )
}

export default Navbar
