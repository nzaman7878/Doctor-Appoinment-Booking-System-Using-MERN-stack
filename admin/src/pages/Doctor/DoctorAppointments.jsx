import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { assets } from "../../assets/assets.js"
import { motion, AnimatePresence } from 'framer-motion'

const DoctorAppointments = () => {

  const { dToken, appointments, getAppointments , completeAppointment, cancelAppointment } = useContext(DoctorContext)
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext)
  
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    if (dToken) {
      getAppointments()
    }
  }, [dToken, getAppointments])

  const filteredAppointments = appointments.filter(app => 
    app.userData.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="w-full max-w-6xl m-5 mt-8 pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <p className="text-2xl font-bold text-[var(--text-main)]">All Appointments</p>
        
        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <input 
            type="text" 
            placeholder="Search patients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-[var(--border-color)] bg-white dark:bg-[#212424] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-light)] focus:border-[var(--color-primary-light)] text-[var(--text-main)] transition-all shadow-sm"
          />
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 absolute left-3 top-2.5 text-[var(--text-muted)]">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
        </div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="premium-card rounded-2xl overflow-hidden shadow-sm"
      >
        <div className='max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-4 px-6 border-b border-[var(--border-color)] bg-gray-50 dark:bg-[#2A2D2D] text-[var(--text-main)] font-semibold text-sm'>
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>
        
        <div className='divide-y divide-[var(--border-color)] max-h-[70vh] overflow-y-auto'>
          <AnimatePresence>
            {filteredAppointments.length > 0 ? (
              [...filteredAppointments].reverse().map((item, index) => (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className='flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center text-[var(--text-muted)] py-4 px-6 hover:bg-gray-50 dark:hover:bg-[#2A2D2D] transition-colors duration-200' 
                  key={item._id}
                >
                  <p className='max-sm:hidden font-medium'>{index + 1}</p>

                  <div className='flex items-center gap-3'>
                    <img className='w-10 h-10 object-cover rounded-xl shadow-sm border-2 border-[var(--border-color)]' src={item.userData.image} alt="" />
                    <p className='font-medium text-[var(--text-main)]'>{item.userData.name}</p>
                  </div>

                  <div>
                    <p className='text-xs font-semibold inline border border-[var(--color-primary)] px-3 py-1 rounded-xl text-[var(--color-primary)] bg-[var(--color-primary)]/10'>
                      {item.payment ? 'ONLINE' : 'CASH'}
                    </p>
                  </div>

                  <p className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>

                  <div className="text-sm">
                    <p className="font-medium text-[var(--text-main)]">{slotDateFormat(item.slotDate)}</p>
                    <p className="text-[var(--text-muted)]">{item.slotTime}</p>
                  </div>

                  <p className='font-medium'>{currency}{item.amount}</p>
                  
                  {item.cancelled ? (
                    <span className="px-3 py-1 bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 rounded-xl text-xs font-semibold max-w-fit">Cancelled</span>
                  ) : item.isCompleted ? (
                    <span className="px-3 py-1 bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 rounded-xl text-xs font-semibold max-w-fit">Completed</span>
                  ) : (
                    <div className='flex gap-2'>
                      <motion.button 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => cancelAppointment(item._id)} 
                        className="w-10 h-10 flex items-center justify-center rounded-xl bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 text-red-500 transition-colors"
                        title="Cancel"
                      >
                        <img className="w-5 dark:invert" src={assets.cancel_icon} alt="Cancel" />
                      </motion.button>
                      <motion.button 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => completeAppointment(item._id)} 
                        className="w-10 h-10 flex items-center justify-center rounded-xl bg-green-50 dark:bg-green-500/10 hover:bg-green-100 dark:hover:bg-green-500/20 text-green-500 transition-colors"
                        title="Complete"
                      >
                        <img className="w-5 dark:invert" src={assets.tick_icon} alt="Complete" />
                      </motion.button>
                    </div>
                  )}
                </motion.div>
              ))
            ) : (
              <p className="p-6 text-center text-[var(--text-muted)]">No appointments found matching "{searchTerm}"</p>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}

export default DoctorAppointments
