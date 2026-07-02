import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets_frontend/assets";
import RelatedDoctors from "../components/RelatedDoctors";
import { toast } from "react-toastify";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol, backendUrl, token, getDoctorsData } = useContext(AppContext);
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const navigate = useNavigate();
  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');

  const fetchDocInfo = async () => {
    const docInfo = doctors.find(doc => doc._id === docId);
    setDocInfo(docInfo);
  };

  const getAvailableSlots = async () => {
    setDocSlots([]);
    let today = new Date();

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
       
        let day = currentDate.getDate().toString().padStart(2, '0');
        let month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        let year = currentDate.getFullYear();

        const slotDate = day + "_" + month + "_" + year;
        const slotTimeStr = formattedTime;
      
        const isSlotAvailable = docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTimeStr) ? false : true;

        if (isSlotAvailable) {
          timeSlots.push({
            dateTime: new Date(currentDate),
            time: formattedTime
          });
        }
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      setDocSlots(prev => ([...prev, timeSlots]));
    }
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.warn("Login to book appointment");
      return navigate('/login');
    }

    if (!slotTime) {
      toast.warn("Please select a time slot");
      return;
    }

    try {
      const date = docSlots[slotIndex][0].dateTime;

      let day = date.getDate().toString().padStart(2, '0');
      let month = (date.getMonth() + 1).toString().padStart(2, '0');
      let year = date.getFullYear();

      const slotDate = day + "_" + month + "_" + year;

      const { data } = await axios.post(
        backendUrl + '/api/user/book-appointment',
        {
          userId: localStorage.getItem('userId'),
          docId,
          slotDate,
          slotTime
        },
        { headers: { token } } 
      );

      if (data.success) {
        toast.success(data.message);
        getDoctorsData();
        navigate('/my-appointments');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    if (docInfo) {
      getAvailableSlots();
    }
  }, [docInfo]);

  useEffect(() => {
    setSlotTime('');
  }, [slotIndex]);

  if (!docInfo) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.5 }}
      className="pt-4"
    >
      {/* ------Doctor Details ------ */}
      <div className="flex flex-col sm:flex-row gap-6">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="w-full sm:max-w-72 relative rounded-2xl overflow-hidden shadow-lg"
        >
          <div className="absolute inset-0 premium-gradient-bg opacity-20"></div>
          <img
            className="w-full bg-sky-50 dark:bg-slate-800 object-cover relative z-10"
            src={docInfo.image}
            alt={docInfo.name}  
          />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.1 }}
          className="flex-1 glass-panel dark:glass-panel-dark rounded-2xl p-8 py-7 mx-2 sm:mx-0 -mt-20 sm:mt-0 relative z-20 shadow-xl"
        >
          <p className="flex items-center gap-2 text-3xl font-bold text-slate-800 dark:text-slate-100">
            {docInfo.name}
            <img className="w-6" src={assets.verified_icon} alt="verified" />
          </p>

          <div className="flex items-center gap-3 text-sm mt-2 font-medium text-slate-600 dark:text-slate-400">
            <p>
              {docInfo.degree} - {docInfo.speciality}
            </p>
            <span className="py-1 px-3 border border-slate-200 dark:border-slate-700 rounded-full bg-slate-50 dark:bg-slate-800/50">
              {docInfo.experience}
            </span>
          </div>

          <div className="mt-6">
            <p className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-slate-200">
              About <img className="w-4 dark:invert" src={assets.info_icon} alt="info" />
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-[700px] mt-2 leading-relaxed">
              {docInfo.about}
            </p>
          </div>
          <p className="text-slate-500 dark:text-slate-400 font-medium mt-6">
            Appointment fee:{" "}
            <span className="text-slate-800 dark:text-slate-200 font-bold text-lg">
              {currencySymbol}{docInfo.fees}
            </span>
          </p>
        </motion.div>
      </div>

      {/* ----- Booking slots ------ */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="sm:ml-[19.5rem] sm:pl-4 mt-8 font-medium text-slate-700 dark:text-slate-300"
      >
        <p className="text-lg font-semibold text-slate-800 dark:text-slate-200">Booking slots</p>

        <div className="flex gap-4 items-center w-full overflow-x-auto mt-5 scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
          {docSlots.length > 0 && docSlots.map((item, index) => (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSlotIndex(index)}
              className={`flex flex-col items-center justify-center py-4 px-2 min-w-20 rounded-2xl cursor-pointer transition-all ${
                slotIndex === index
                  ? "premium-gradient-bg text-white shadow-lg"
                  : "border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:border-primary/50"
              }`}
              key={index}
            >
              <p className="text-sm">{item[0] && daysOfWeek[item[0].dateTime.getDay()]}</p>
              <p className="text-xl font-bold mt-1">{item[0] && item[0].dateTime.getDate()}</p>
            </motion.div>
          ))}
        </div>

        <div className="flex items-center gap-3 w-full overflow-x-auto mt-6 scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
          <AnimatePresence mode="popLayout">
            {docSlots.length > 0 && docSlots[slotIndex] && docSlots[slotIndex].map((item, index) => (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSlotTime(item.time)}
                className={`text-sm font-medium flex-shrink-0 px-6 py-2.5 rounded-full cursor-pointer transition-all ${
                  item.time === slotTime
                    ? "premium-gradient-bg text-white shadow-md"
                    : "text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-primary/50 hover:text-primary dark:hover:text-primary-light"
                }`}
                key={index}
              >
                {item.time.toLowerCase()}
              </motion.button>
            ))}
          </AnimatePresence>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={bookAppointment}
          className="premium-gradient-bg text-white text-base font-semibold px-14 py-4 rounded-full mt-10 mb-6 shadow-lg hover:shadow-xl transition-all"
        >
          Book an appointment
        </motion.button>
      </motion.div>

      {/* --------- Related Doctors --------- */}
      <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
    </motion.div>
  );
};

export default Appointment;
