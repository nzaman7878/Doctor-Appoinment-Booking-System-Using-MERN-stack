import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'
import { motion } from 'framer-motion'

const DoctorDashboard = () => {

  const {
    dToken,
    dashData,
    setDashData,
    getDashData,
    completeAppointment,
    cancelAppointment
  } = useContext(DoctorContext)

  const { currency, slotDateFormat } = useContext(AppContext)

  useEffect(() => {
    if (dToken) {
      getDashData()
    }
  }, [dToken, getDashData])

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  }

  return dashData && (
    <motion.div 
      initial="hidden"
      animate="show"
      variants={containerVariants}
      className='m-5 mt-8 pb-10'
    >

      {/* Stats Cards */}
      <div className="flex flex-wrap gap-6 mb-8">
        <motion.div variants={itemVariants} className="flex-1 min-w-[250px] flex items-center gap-4 glass-panel dark:glass-panel-dark p-6 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
          <div className="w-16 h-16 rounded-full flex items-center justify-center bg-indigo-50 dark:bg-indigo-500/10">
            <img className="w-8 dark:brightness-200" src={assets.earning_icon} alt="Earnings" />
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">
              {currency}{dashData.earnings}
            </p>
            <p className="text-slate-500 dark:text-slate-400 font-medium">Earnings</p>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="flex-1 min-w-[250px] flex items-center gap-4 glass-panel dark:glass-panel-dark p-6 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
          <div className="w-16 h-16 rounded-full flex items-center justify-center bg-blue-50 dark:bg-blue-500/10">
            <img className="w-8 dark:brightness-200" src={assets.appointments_icon} alt="Appointments" />
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">
              {dashData.appointments}
            </p>
            <p className="text-slate-500 dark:text-slate-400 font-medium">Appointments</p>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="flex-1 min-w-[250px] flex items-center gap-4 glass-panel dark:glass-panel-dark p-6 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
          <div className="w-16 h-16 rounded-full flex items-center justify-center bg-green-50 dark:bg-green-500/10">
            <img className="w-8 dark:brightness-200" src={assets.patients_icon} alt="Patients" />
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">
              {dashData.patients}
            </p>
            <p className="text-slate-500 dark:text-slate-400 font-medium">Patients</p>
          </div>
        </motion.div>
      </div>

      {/* Latest Bookings */}
      <motion.div variants={itemVariants} className="glass-panel dark:glass-panel-dark rounded-2xl overflow-hidden shadow-sm">
        <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50">
          <img className="w-6 dark:invert" src={assets.list_icon} alt="List" />
          <p className="font-bold text-slate-800 dark:text-slate-100 text-lg">Latest Bookings</p>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-700 max-h-[500px] overflow-y-auto">
          {dashData.latestAppointments.map((item, index) => (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center px-6 py-4 gap-4 hover:bg-slate-50/80 dark:hover:bg-slate-800/80 transition-colors"
              key={item._id}
            >
              <img
                className="rounded-full w-12 h-12 object-cover border-2 border-white dark:border-slate-700 shadow-sm"
                src={item.userData.image}
                alt={item.userData.name}
              />
              <div className="flex-1">
                <p className="text-slate-800 dark:text-slate-200 font-semibold">
                  {item.userData.name}
                </p>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">
                  {slotDateFormat(item.slotDate)}
                </p>
              </div>

              <div className="flex gap-2 items-center">
                {item.cancelled ? (
                  <span className="px-3 py-1 bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 rounded-full text-xs font-semibold">Cancelled</span>
                ) : item.isCompleted ? (
                  <span className="px-3 py-1 bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 rounded-full text-xs font-semibold">Completed</span>
                ) : (
                  <>
                    <motion.button 
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => {
                        cancelAppointment(item._id)
                        getDashData()
                      }}
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 text-red-500 transition-colors"
                      title="Cancel"
                    >
                      <img className="w-5 dark:invert" src={assets.cancel_icon} alt="Cancel" />
                    </motion.button>
                    <motion.button 
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => {
                        completeAppointment(item._id)
                        getDashData()
                      }}
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-green-50 dark:bg-green-500/10 hover:bg-green-100 dark:hover:bg-green-500/20 text-green-500 transition-colors"
                      title="Complete"
                    >
                      <img className="w-5 dark:invert" src={assets.tick_icon} alt="Complete" />
                    </motion.button>
                  </>
                )}
              </div>
            </motion.div>
          ))}
          {dashData.latestAppointments.length === 0 && (
             <p className="p-6 text-center text-slate-500 dark:text-slate-400">No recent bookings found.</p>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default DoctorDashboard
