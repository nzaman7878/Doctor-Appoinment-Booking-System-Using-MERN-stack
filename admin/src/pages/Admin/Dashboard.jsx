import { useContext, useEffect } from "react"
import { AdminContext } from "../../context/AdminContext"
import { assets } from '../../assets/assets'
import { AppContext } from "../../context/AppContext"
import { motion } from 'framer-motion'

const Dashboard = () => {
  const { aToken, getDashData, cancelAppointment, dashData } = useContext(AdminContext)
  const { slotDateFormat } = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getDashData()
    }
  }, [aToken, getDashData]) 

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    hover: { scale: 1.05, transition: { type: "spring", stiffness: 300 } }
  }

  return dashData && (
    <div className="m-5 mt-8 space-y-8 pb-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Stats Cards */}
        <motion.div variants={cardVariants} initial="hidden" animate="visible" whileHover="hover" className="flex items-center gap-4 premium-card p-6 cursor-pointer transition-colors duration-300">
          <div className="w-16 h-16 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center p-3">
            <img className="w-full h-full object-contain dark:invert opacity-80" src={assets.doctor_icon} alt="Doctors" />
          </div>
          <div>
            <p className="text-3xl font-medium text-[var(--text-main)]">{dashData.doctors}</p>
            <p className="text-[var(--text-muted)] font-medium mt-1">Doctors</p>
          </div>
        </motion.div>

        <motion.div variants={cardVariants} initial="hidden" animate="visible" whileHover="hover" transition={{ delay: 0.1 }} className="flex items-center gap-4 premium-card p-6 cursor-pointer transition-colors duration-300">
          <div className="w-16 h-16 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center p-3">
            <img className="w-full h-full object-contain dark:invert opacity-80" src={assets.appointments_icon} alt="Appointments" />
          </div>
          <div>
            <p className="text-3xl font-medium text-[var(--text-main)]">{dashData.appointments}</p>
            <p className="text-[var(--text-muted)] font-medium mt-1">Appointments</p>
          </div>
        </motion.div>

        <motion.div variants={cardVariants} initial="hidden" animate="visible" whileHover="hover" transition={{ delay: 0.2 }} className="flex items-center gap-4 premium-card p-6 cursor-pointer transition-colors duration-300">
          <div className="w-16 h-16 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center p-3">
            <img className="w-full h-full object-contain dark:invert opacity-80" src={assets.patients_icon} alt="Patients" />
          </div>
          <div>
            <p className="text-3xl font-medium text-[var(--text-main)]">{dashData.patients}</p>
            <p className="text-[var(--text-muted)] font-medium mt-1">Patients</p>
          </div>
        </motion.div>
      </div>

      {/* Latest Bookings */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="premium-card">
        <div className="flex items-center gap-3 px-6 py-5 border-b border-[var(--border-color)] bg-gray-50 dark:bg-[#2A2D2D] rounded-t-2xl">
          <img src={assets.list_icon} alt="" className="dark:invert opacity-70" />
          <p className="font-medium text-lg text-[var(--text-main)]">Latest Bookings</p>
        </div>

        <div className="divide-y divide-[var(--border-color)]">
          {dashData.latestAppointments.map((item, index) => (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + (index * 0.05) }}
              className="flex items-center px-6 py-4 gap-4 hover:bg-slate-50/80 dark:hover:bg-slate-800/80 transition-colors duration-200" 
              key={index}
            >
              <img className="rounded-full w-12 h-12 object-cover border-2 border-white dark:border-slate-700 shadow-sm" src={item.docData.image} alt="" />
              <div className="flex-1 text-sm">
                <p className="text-[var(--text-main)] font-medium text-base">{item.docData.name}</p>
                <p className="text-[var(--text-muted)] mt-0.5">{slotDateFormat(item.slotDate)}</p>
              </div>
              {item.cancelled ? (
                <span className="px-3 py-1 bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 rounded-full text-xs font-semibold">Cancelled</span>
              ) : item.isCompleted ? (
                <span className="px-3 py-1 bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 rounded-full text-xs font-semibold">Completed</span>
              ) : (
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    cancelAppointment(item._id)
                    getDashData()
                  }} 
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 text-red-500 transition-colors"
                  title="Cancel Appointment"
                >
                  <img className="w-5 dark:invert" src={assets.cancel_icon} alt="Cancel" />
                </motion.button>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default Dashboard
