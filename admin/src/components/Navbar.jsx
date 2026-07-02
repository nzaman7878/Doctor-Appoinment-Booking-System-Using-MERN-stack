import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { DoctorContext } from '../context/DoctorContext'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext)
  const { dToken, setDToken } = useContext(DoctorContext)
  const { theme, toggleTheme } = useContext(AppContext)
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
    <div className='sticky top-0 z-50 px-4 sm:px-10 py-3 mb-2'>
      <div className='flex justify-between items-center px-6 py-3 rounded-full glass-panel dark:glass-panel-dark transition-all duration-300'>
        <div className='flex items-center gap-4 text-xs'>
          <img 
            className='w-36 sm:w-40 cursor-pointer dark:invert transition-all duration-300' 
            src={assets.admin_logo} 
            alt="Logo"
            onClick={() => navigate('/')}  
          />
          <p className='border px-3 py-1 rounded-full border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 font-medium'>
            {aToken ? 'Admin' : dToken ? 'Doctor' : 'Guest'}
          </p>
        </div>
        
        <div className='flex items-center gap-4'>
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className='w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-all shadow-sm'
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
              </svg>
            )}
          </button>

          <button 
            onClick={logout} 
            className='premium-gradient-bg text-white text-sm px-8 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300 font-medium'
            disabled={!aToken && !dToken}  
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}

export default Navbar
