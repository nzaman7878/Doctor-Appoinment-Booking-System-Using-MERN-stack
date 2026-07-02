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
    <div className='min-h-screen border-r border-slate-200 dark:border-slate-800 glass-panel dark:glass-panel-dark mx-4 mt-2 mb-4 rounded-xl hidden sm:block'>
        {
            aToken && <ul className='text-slate-600 dark:text-slate-300 mt-5 space-y-2 px-2'>
                <NavLink className={({isActive})=>`flex items-center gap-3 py-3 px-3 md:px-9 md:min-w-64 cursor-pointer rounded-lg transition-all duration-300 ${isActive ? 'bg-indigo-50/80 dark:bg-indigo-900/30 border-r-4 border-primary text-primary dark:text-indigo-300 font-medium' : 'hover:bg-slate-100 dark:hover:bg-slate-800/50'}`} to={'/admin-dashboard'}>
                    <motion.div variants={linkVariants} whileHover="hover" whileTap="tap" className="flex items-center gap-3 w-full">
                      <img src={assets.home_icon} alt="" className="dark:invert opacity-70 dark:opacity-100" />
                      <p className='hidden md:block'>Dashboard</p>
                    </motion.div>
                </NavLink>

                 <NavLink className={({isActive})=>`flex items-center gap-3 py-3 px-3 md:px-9 md:min-w-64 cursor-pointer rounded-lg transition-all duration-300 ${isActive ? 'bg-indigo-50/80 dark:bg-indigo-900/30 border-r-4 border-primary text-primary dark:text-indigo-300 font-medium' : 'hover:bg-slate-100 dark:hover:bg-slate-800/50'}`}  to={'/all-appointments'}>
                    <motion.div variants={linkVariants} whileHover="hover" whileTap="tap" className="flex items-center gap-3 w-full">
                      <img src={assets.appointment_icon} alt="" className="dark:invert opacity-70 dark:opacity-100" />
                      <p className='hidden md:block'>Appointments</p>
                    </motion.div>
                </NavLink>

                 <NavLink className={({isActive})=>`flex items-center gap-3 py-3 px-3 md:px-9 md:min-w-64 cursor-pointer rounded-lg transition-all duration-300 ${isActive ? 'bg-indigo-50/80 dark:bg-indigo-900/30 border-r-4 border-primary text-primary dark:text-indigo-300 font-medium' : 'hover:bg-slate-100 dark:hover:bg-slate-800/50'}`} to={'/add-doctor'}>
                    <motion.div variants={linkVariants} whileHover="hover" whileTap="tap" className="flex items-center gap-3 w-full">
                      <img src={assets.add_icon} alt="" className="dark:invert opacity-70 dark:opacity-100" />
                      <p className='hidden md:block'>Add Doctor</p>
                    </motion.div>
                </NavLink>

                 <NavLink className={({isActive})=>`flex items-center gap-3 py-3 px-3 md:px-9 md:min-w-64 cursor-pointer rounded-lg transition-all duration-300 ${isActive ? 'bg-indigo-50/80 dark:bg-indigo-900/30 border-r-4 border-primary text-primary dark:text-indigo-300 font-medium' : 'hover:bg-slate-100 dark:hover:bg-slate-800/50'}`} to={'/doctor-list'}>
                    <motion.div variants={linkVariants} whileHover="hover" whileTap="tap" className="flex items-center gap-3 w-full">
                      <img src={assets.people_icon} alt="" className="dark:invert opacity-70 dark:opacity-100" />
                      <p className='hidden md:block'>Doctor List</p>
                    </motion.div>
                </NavLink>

            </ul>
        }

        {
            dToken && <ul className='text-slate-600 dark:text-slate-300 mt-5 space-y-2 px-2'>
                <NavLink className={({isActive})=>`flex items-center gap-3 py-3 px-3 md:px-9 md:min-w-64 cursor-pointer rounded-lg transition-all duration-300 ${isActive ? 'bg-indigo-50/80 dark:bg-indigo-900/30 border-r-4 border-primary text-primary dark:text-indigo-300 font-medium' : 'hover:bg-slate-100 dark:hover:bg-slate-800/50'}`} to={'/doctor-dashboard'}>
                    <motion.div variants={linkVariants} whileHover="hover" whileTap="tap" className="flex items-center gap-3 w-full">
                      <img src={assets.home_icon} alt="" className="dark:invert opacity-70 dark:opacity-100" />
                      <p className='hidden md:block'>Dashboard</p>
                    </motion.div>
                </NavLink>

                 <NavLink className={({isActive})=>`flex items-center gap-3 py-3 px-3 md:px-9 md:min-w-64 cursor-pointer rounded-lg transition-all duration-300 ${isActive ? 'bg-indigo-50/80 dark:bg-indigo-900/30 border-r-4 border-primary text-primary dark:text-indigo-300 font-medium' : 'hover:bg-slate-100 dark:hover:bg-slate-800/50'}`}  to={'/doctor-appointments'}>
                    <motion.div variants={linkVariants} whileHover="hover" whileTap="tap" className="flex items-center gap-3 w-full">
                      <img src={assets.appointment_icon} alt="" className="dark:invert opacity-70 dark:opacity-100" />
                      <p className='hidden md:block'>Appointments</p>
                    </motion.div>
                </NavLink>

                 <NavLink className={({isActive})=>`flex items-center gap-3 py-3 px-3 md:px-9 md:min-w-64 cursor-pointer rounded-lg transition-all duration-300 ${isActive ? 'bg-indigo-50/80 dark:bg-indigo-900/30 border-r-4 border-primary text-primary dark:text-indigo-300 font-medium' : 'hover:bg-slate-100 dark:hover:bg-slate-800/50'}`} to={'/doctor-profile'}>
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
