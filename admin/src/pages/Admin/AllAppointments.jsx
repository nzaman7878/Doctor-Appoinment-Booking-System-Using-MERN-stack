import { useContext, useEffect, useState } from "react"
import { AdminContext } from "../../context/AdminContext"
import { assets } from "../../assets/assets"
import { AppContext } from "../../context/AppContext"
import { motion, AnimatePresence } from "framer-motion"

const AllAppointments = () => {
  const { aToken, appointments, getAllAppointments, cancelAppointment, deleteAppointment, currency } = useContext(AdminContext)
  const { calculateAge , slotDateFormat } = useContext(AppContext)
  
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    if (aToken) {
      getAllAppointments()
    }
  }, [aToken, getAllAppointments])

  const filteredAppointments = appointments.filter(app => 
    app.userData.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    app.docData.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="w-full max-w-6xl m-5 mt-8 pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">All Appointments</p>
        
        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <input 
            type="text" 
            placeholder="Search patients or doctors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-full border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 glass-panel dark:glass-panel-dark focus:outline-none focus:ring-2 focus:ring-primary/50 text-slate-700 dark:text-slate-200 transition-all shadow-sm"
          />
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 absolute left-3 top-2.5 text-slate-400">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
        </div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel dark:glass-panel-dark rounded-2xl overflow-hidden shadow-sm"
      >
        {/* Header */}
        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] gap-1 py-4 px-6 border-b border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 font-semibold text-sm">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        {/* Appointment Rows */}
        <div className="divide-y divide-slate-100 dark:divide-slate-700 max-h-[70vh] overflow-y-auto">
          <AnimatePresence>
            {filteredAppointments.length > 0 ? (
              [...filteredAppointments].reverse().map((item, index) => (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] gap-1 items-center text-slate-600 dark:text-slate-400 py-4 px-6 hover:bg-slate-50/80 dark:hover:bg-slate-800/80 transition-colors duration-200"
                  key={item._id}
                >
                  <p className="max-sm:hidden font-medium">{index + 1}</p>
                  
                  {/* Patient Info */}
                  <div className="flex items-center gap-3">
                    <img 
                      className="w-10 h-10 object-cover rounded-full shadow-sm border-2 border-white dark:border-slate-700" 
                      src={item.userData.image} 
                      alt={item.userData.name} 
                    />
                    <p className="font-medium text-slate-800 dark:text-slate-200">{item.userData.name}</p>
                  </div>

                  {/* Age */}
                  <p className="max-sm:hidden">{calculateAge(item.userData.dob)}</p>

                  {/* Date & Time */}
                  <div className="text-sm">
                    <p className="font-medium text-slate-700 dark:text-slate-300">{slotDateFormat(item.slotDate)}</p>
                    <p className="text-slate-500 dark:text-slate-400">{item.slotTime}</p>
                  </div>

                  {/* Doctor Info */}
                  <div className="flex items-center gap-3">
                    <img 
                      className="w-10 h-10 object-cover rounded-full shadow-sm border-2 border-white dark:border-slate-700 bg-slate-100 dark:bg-slate-600" 
                      src={item.docData.image} 
                      alt={item.docData.name} 
                    />
                    <p className="font-medium text-slate-800 dark:text-slate-200">{item.docData.name}</p>
                  </div>

                  {/* Fees */}
                  <p className="font-medium">{currency}{item.amount}</p>

                  {/* Action */}
                  <div className="flex items-center gap-2">
                    {item.cancelled ? (
                      <span className="px-3 py-1 bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 rounded-full text-xs font-semibold max-w-fit">Cancelled</span>
                    ) : item.isCompleted ? (
                      <span className="px-3 py-1 bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 rounded-full text-xs font-semibold max-w-fit">Completed</span>
                    ) : (
                      <motion.button 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => cancelAppointment(item._id)} 
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 text-red-500 transition-colors"
                        title="Cancel Appointment"
                      >
                        <img className="w-5 dark:invert" src={assets.cancel_icon} alt="Cancel" />
                      </motion.button>
                    )}
                    
                    {/* Delete Appointment Button */}
                    <motion.button 
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => {
                        if (window.confirm("Are you sure you want to permanently delete this appointment?")) {
                          deleteAppointment(item._id)
                        }
                      }} 
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-700/50 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-500 transition-colors"
                      title="Delete Appointment"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-red-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                      </svg>
                    </motion.button>
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="p-6 text-center text-slate-500 dark:text-slate-400">No appointments found matching "{searchTerm}"</p>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}

export default AllAppointments
