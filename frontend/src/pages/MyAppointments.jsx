import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext);
  const [appointments, setAppointment] = useState([]);
  const navigate = useNavigate();

  const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");
    return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2];
  };

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + '/api/user/appointments',
        { headers: { token } }
      );

      if (data.success) {
        setAppointment(data.appointments.reverse());
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const cancelAppointments = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + '/api/user/cancel-appointment',
        { appointmentId },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
        getDoctorsData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Appointment Payment",
      description: "Appointment Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const { data } = await axios.post(
            backendUrl + '/api/user/verifyRazorpay',
            response,
            { headers: { token } }
          );
          
          if (data.success) {
            toast.success(data.message);
            getUserAppointments();
            navigate('/my-appointments');
          } else {
            toast.error(data.message);
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message);
        }
      }
    };
    
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const appointmentRazorpay = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + '/api/user/payment-razorpay',
        { appointmentId },
        { headers: { token } }
      );
      
      if (data.success) {
        initPay(data.order);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 200, damping: 20 } },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } }
  };

  return (
    <div className="mt-12 min-h-screen">
      <h2 className="pb-4 text-2xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800">
        My Appointments
      </h2>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mt-8 space-y-6"
      >
        <AnimatePresence>
          {appointments.length > 0 ? (
            appointments.slice(0, 20).map((item) => (
              <motion.div
                layout
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                key={item._id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-6 glass-panel dark:glass-panel-dark rounded-2xl shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Doctor Info Section */}
                <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
                  <div className="flex-shrink-0 w-32 h-32 rounded-xl overflow-hidden bg-sky-50 dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700">
                    <img
                      src={item.docData?.image}
                      alt={item.docData?.name}
                      className="object-cover w-full h-full"
                    />
                  </div>

                  <div className="flex-1 text-sm text-slate-600 dark:text-slate-400 flex flex-col justify-center">
                    <p className="text-xl font-bold text-slate-800 dark:text-slate-100">
                      {item.docData?.name}
                    </p>
                    <p className="text-primary dark:text-primary-light font-medium mt-1">{item.docData?.speciality}</p>

                    <div className="mt-3 space-y-1 bg-white/50 dark:bg-slate-800/50 p-3 rounded-lg border border-slate-100 dark:border-slate-700">
                      <p className="font-semibold text-slate-700 dark:text-slate-300">Address:</p>
                      <p className="text-xs">{item.docData?.address?.line1}</p>
                      <p className="text-xs">{item.docData?.address?.line2}</p>
                    </div>

                    <div className="mt-4 flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300 bg-indigo-50 dark:bg-indigo-900/30 p-2.5 rounded-lg border border-indigo-100 dark:border-indigo-800 w-max">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {slotDateFormat(item.slotDate)} | {item.slotTime}
                    </div>
                  </div>
                </div>

                {/* Actions Section */}
                <div className="flex flex-col gap-3 w-full sm:w-48 pt-4 sm:pt-0 border-t sm:border-t-0 sm:border-l border-slate-200 dark:border-slate-700 sm:pl-6">
                  {!item.cancelled && item.payment && !item.isCompleted && (
                    <div className="text-center text-sm font-semibold bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 rounded-lg py-2.5 px-4">
                      Paid Successfully
                    </div>
                  )}
                  
                  {!item.cancelled && !item.payment && !item.isCompleted && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => appointmentRazorpay(item._id)}
                      className="text-sm font-semibold premium-gradient-bg text-white rounded-lg py-2.5 px-4 shadow-md hover:shadow-lg transition-all"
                    >
                      Pay Online
                    </motion.button>
                  )}
                  
                  {!item.cancelled && !item.payment && !item.isCompleted && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => cancelAppointments(item._id)}
                      className="text-sm font-medium text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-600 rounded-lg py-2.5 px-4 transition-all hover:bg-red-50 hover:text-red-600 hover:border-red-200 dark:hover:bg-red-900/20 dark:hover:text-red-400 dark:hover:border-red-800"
                    >
                      Cancel Appointment
                    </motion.button>
                  )}
                  
                  {item.cancelled && !item.isCompleted && (
                    <div className="text-center text-sm font-medium bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 border border-red-100 dark:border-red-800/50 rounded-lg py-2.5 px-4">
                      Cancelled
                    </div>
                  )}

                  {item.isCompleted && (
                    <div className="text-center text-sm font-medium bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-800/50 rounded-lg py-2.5 px-4">
                      Completed
                    </div>
                  )}
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-20 text-slate-500 dark:text-slate-400 glass-panel dark:glass-panel-dark rounded-2xl"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-lg font-medium">No appointments booked yet.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default MyAppointments;
