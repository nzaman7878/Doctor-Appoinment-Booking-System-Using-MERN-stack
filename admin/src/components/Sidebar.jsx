import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets.js'
import { DoctorContext } from '../context/DoctorContext.jsx'
import { motion } from 'framer-motion'

const Sidebar = () => {
    const {aToken} = useContext(AdminContext)
    const {dToken} = useContext(DoctorContext)

    const linkVariants = {
      hover: { scale: 1.02, x: 5, transition: { type: 'spring', stiffness: 300 } },
      tap: { scale: 0.98 }
    }

  return (
    <div className='min-h-screen border-r border-[var(--border-color)] bg-white dark:bg-[#212424] mx-4 mt-2 mb-4 rounded-xl hidden sm:block'>
        {
            aToken && <ul className='text-[var(--text-muted)] mt-5 space-y-2 px-2'>
                <NavLink className={({isActive})=>`flex items-center gap-3 py-3 px-3 md:px-9 md:min-w-64 cursor-pointer rounded-lg transition-all duration-300 ${isActive ? 'bg-[var(--color-primary)]/10 border-r-4 border-[var(--color-primary)] text-[var(--color-primary)] font-medium' : 'hover:bg-gray-50 dark:hover:bg-[#2A2D2D]'}`} to={'/admin-dashboard'}>
                    <motion.div variants={linkVariants} whileHover="hover" whileTap="tap" className="flex items-center gap-3 w-full">
                      <img src={assets.home_icon} alt="" className="dark:invert opacity-70 dark:opacity-100" />
                      <p className='hidden md:block'>Dashboard</p>
                    </motion.div>
                </NavLink>

                 <NavLink className={({isActive})=>`flex items-center gap-3 py-3 px-3 md:px-9 md:min-w-64 cursor-pointer rounded-lg transition-all duration-300 ${isActive ? 'bg-[var(--color-primary)]/10 border-r-4 border-[var(--color-primary)] text-[var(--color-primary)] font-medium' : 'hover:bg-gray-50 dark:hover:bg-[#2A2D2D]'}`}  to={'/all-appointments'}>
                    <motion.div variants={linkVariants} whileHover="hover" whileTap="tap" className="flex items-center gap-3 w-full">
                      <img src={assets.appointment_icon} alt="" className="dark:invert opacity-70 dark:opacity-100" />
                      <p className='hidden md:block'>Appointments</p>
                    </motion.div>
                </NavLink>

                 <NavLink className={({isActive})=>`flex items-center gap-3 py-3 px-3 md:px-9 md:min-w-64 cursor-pointer rounded-lg transition-all duration-300 ${isActive ? 'bg-[var(--color-primary)]/10 border-r-4 border-[var(--color-primary)] text-[var(--color-primary)] font-medium' : 'hover:bg-gray-50 dark:hover:bg-[#2A2D2D]'}`} to={'/add-doctor'}>
                    <motion.div variants={linkVariants} whileHover="hover" whileTap="tap" className="flex items-center gap-3 w-full">
                      <img src={assets.add_icon} alt="" className="dark:invert opacity-70 dark:opacity-100" />
                      <p className='hidden md:block'>Add Doctor</p>
                    </motion.div>
                </NavLink>

                 <NavLink className={({isActive})=>`flex items-center gap-3 py-3 px-3 md:px-9 md:min-w-64 cursor-pointer rounded-lg transition-all duration-300 ${isActive ? 'bg-[var(--color-primary)]/10 border-r-4 border-[var(--color-primary)] text-[var(--color-primary)] font-medium' : 'hover:bg-gray-50 dark:hover:bg-[#2A2D2D]'}`} to={'/doctor-list'}>
                    <motion.div variants={linkVariants} whileHover="hover" whileTap="tap" className="flex items-center gap-3 w-full">
                      <img src={assets.people_icon} alt="" className="dark:invert opacity-70 dark:opacity-100" />
                      <p className='hidden md:block'>Doctor List</p>
                    </motion.div>
                </NavLink>

            </ul>
        }

        {
            dToken && <ul className='text-[var(--text-muted)] mt-5 space-y-2 px-2'>
                <NavLink className={({isActive})=>`flex items-center gap-3 py-3 px-3 md:px-9 md:min-w-64 cursor-pointer rounded-lg transition-all duration-300 ${isActive ? 'bg-[var(--color-primary)]/10 border-r-4 border-[var(--color-primary)] text-[var(--color-primary)] font-medium' : 'hover:bg-gray-50 dark:hover:bg-[#2A2D2D]'}`} to={'/doctor-dashboard'}>
                    <motion.div variants={linkVariants} whileHover="hover" whileTap="tap" className="flex items-center gap-3 w-full">
                      <img src={assets.home_icon} alt="" className="dark:invert opacity-70 dark:opacity-100" />
                      <p className='hidden md:block'>Dashboard</p>
                    </motion.div>
                </NavLink>

                 <NavLink className={({isActive})=>`flex items-center gap-3 py-3 px-3 md:px-9 md:min-w-64 cursor-pointer rounded-lg transition-all duration-300 ${isActive ? 'bg-[var(--color-primary)]/10 border-r-4 border-[var(--color-primary)] text-[var(--color-primary)] font-medium' : 'hover:bg-gray-50 dark:hover:bg-[#2A2D2D]'}`}  to={'/doctor-appointments'}>
                    <motion.div variants={linkVariants} whileHover="hover" whileTap="tap" className="flex items-center gap-3 w-full">
                      <img src={assets.appointment_icon} alt="" className="dark:invert opacity-70 dark:opacity-100" />
                      <p className='hidden md:block'>Appointments</p>
                    </motion.div>
                </NavLink>

                 <NavLink className={({isActive})=>`flex items-center gap-3 py-3 px-3 md:px-9 md:min-w-64 cursor-pointer rounded-lg transition-all duration-300 ${isActive ? 'bg-[var(--color-primary)]/10 border-r-4 border-[var(--color-primary)] text-[var(--color-primary)] font-medium' : 'hover:bg-gray-50 dark:hover:bg-[#2A2D2D]'}`} to={'/doctor-profile'}>
                    <motion.div variants={linkVariants} whileHover="hover" whileTap="tap" className="flex items-center gap-3 w-full">
                      <img src={assets.people_icon} alt="" className="dark:invert opacity-70 dark:opacity-100" />
                      <p className='hidden md:block'>Profile</p>
                    </motion.div>
                </NavLink>

            </ul>
        }
    </div>
  )
}

export default Sidebar
