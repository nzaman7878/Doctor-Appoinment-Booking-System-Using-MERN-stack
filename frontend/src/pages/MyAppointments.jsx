import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext);
  const [appointments, setAppointment] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");
    return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2];
  };

  const getUserAppointments = async () => {
    try {
      setLoading(true);
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
    } finally {
      setLoading(false);
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
      <h2 className="pb-4 text-2xl font-medium text-[var(--text-main)] border-b border-[var(--border-color)]">
        My Appointments
      </h2>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mt-8 space-y-6"
      >
        <AnimatePresence>
          {loading ? (
            Array(3).fill(0).map((_, index) => (
              <div key={`skeleton-${index}`} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-6 premium-card animate-pulse">
                <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
                  <div className="flex-shrink-0 w-32 h-32 rounded-xl bg-slate-200 dark:bg-slate-700"></div>
                  <div className="flex-1 flex flex-col justify-center gap-3">
                    <div className="w-48 h-6 bg-slate-200 dark:bg-slate-700 rounded"></div>
                    <div className="w-32 h-4 bg-slate-200 dark:bg-slate-700 rounded"></div>
                    <div className="w-40 h-16 bg-slate-200 dark:bg-slate-700 rounded mt-1"></div>
                    <div className="w-48 h-8 bg-slate-200 dark:bg-slate-700 rounded mt-2"></div>
                  </div>
                </div>
                <div className="flex flex-col gap-3 w-full sm:w-48 pt-4 sm:pt-0 border-t sm:border-t-0 sm:border-l border-[var(--border-color)] sm:pl-6">
                  <div className="w-full h-10 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
                  <div className="w-full h-10 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
                </div>
              </div>
            ))
          ) : appointments.length > 0 ? (
            appointments.slice(0, 20).map((item) => (
              <motion.div
                layout
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                key={item._id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-6 premium-card"
              >
                {/* Doctor Info Section */}
                <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
                  <div className="flex-shrink-0 w-32 h-32 rounded-xl overflow-hidden bg-gray-50 dark:bg-[#2A2D2D] border border-[var(--border-color)]">
                    <img
                      src={item.docData?.image}
                      alt={item.docData?.name}
                      className="object-cover w-full h-full"
                    />
                  </div>

                  <div className="flex-1 text-sm text-[var(--text-muted)] flex flex-col justify-center">
                    <p className="text-xl font-medium text-[var(--text-main)]">
                      {item.docData?.name}
                    </p>
                    <p className="text-[var(--color-primary)] font-medium mt-1">{item.docData?.speciality}</p>

                    <div className="mt-3 space-y-1 bg-gray-50 dark:bg-[#2A2D2D] p-3 rounded-lg border border-[var(--border-color)]">
                      <p className="font-medium text-[var(--text-main)]">Address:</p>
                      <p className="text-xs">{item.docData?.address?.line1}</p>
                      <p className="text-xs">{item.docData?.address?.line2}</p>
                    </div>

                    <div className="mt-4 flex items-center gap-2 text-xs font-medium text-[var(--text-main)] bg-[var(--color-primary)]/10 p-2.5 rounded-lg w-max">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[var(--color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {slotDateFormat(item.slotDate)} | {item.slotTime}
                    </div>
                  </div>
                </div>

                {/* Actions Section */}
                <div className="flex flex-col gap-3 w-full sm:w-48 pt-4 sm:pt-0 border-t sm:border-t-0 sm:border-l border-[var(--border-color)] sm:pl-6">
                  {!item.cancelled && item.payment && !item.isCompleted && (
                    <div className="text-center text-sm font-medium bg-[var(--color-accent)]/10 text-[var(--color-accent)] border border-[var(--color-accent)]/20 rounded-lg py-2.5 px-4">
                      Paid Successfully
                    </div>
                  )}
                  
                  {!item.cancelled && !item.payment && !item.isCompleted && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => appointmentRazorpay(item._id)}
                      className="text-sm font-medium bg-[var(--color-primary)] text-white rounded-lg py-2.5 px-4 hover:bg-[var(--color-primary-light)] transition-all border border-[var(--color-primary)]"
                    >
                      Pay Online
                    </motion.button>
                  )}
                  
                  {!item.cancelled && !item.payment && !item.isCompleted && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => cancelAppointments(item._id)}
                      className="text-sm font-medium text-[var(--text-main)] border border-[var(--border-color)] rounded-lg py-2.5 px-4 transition-all hover:bg-red-50 hover:text-red-600 hover:border-red-200"
                    >
                      Cancel Appointment
                    </motion.button>
                  )}
                  
                  {item.cancelled && !item.isCompleted && (
                    <div className="text-center text-sm font-medium bg-red-50 text-red-600 border border-red-100 rounded-lg py-2.5 px-4">
                      Cancelled
                    </div>
                  )}

                  {item.isCompleted && (
                    <div className="text-center text-sm font-medium bg-[var(--color-accent)]/10 text-[var(--color-accent)] border border-[var(--color-accent)]/20 rounded-lg py-2.5 px-4">
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
              className="flex flex-col items-center justify-center py-20 text-[var(--text-muted)] premium-card"
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
