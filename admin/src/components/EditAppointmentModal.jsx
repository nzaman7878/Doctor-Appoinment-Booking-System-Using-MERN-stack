import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import { motion, AnimatePresence } from "framer-motion";

const EditAppointmentModal = ({ appointment, onClose }) => {
  const { doctors, getAllDoctors, updateAppointment } = useContext(AdminContext);
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  useEffect(() => {
    if (doctors.length === 0) {
      getAllDoctors();
    }
  }, [doctors.length, getAllDoctors]);
  
  const [selectedDocId, setSelectedDocId] = useState(appointment.docId);
  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (doctors.length > 0) {
      const doc = doctors.find((d) => d._id === selectedDocId);
      setDocInfo(doc);
    }
  }, [selectedDocId, doctors]);

  useEffect(() => {
    if (docInfo) {
      getAvailableSlots();
    }
  }, [docInfo]);

  useEffect(() => {
    setSlotTime(""); // Reset time when date changes
  }, [slotIndex]);

  const getAvailableSlots = () => {
    setDocSlots([]);
    let today = new Date();
    let slotsArray = [];

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
        let formattedTime = currentDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

        let day = currentDate.getDate().toString().padStart(2, "0");
        let month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
        let year = currentDate.getFullYear();
        const slotDate = day + "_" + month + "_" + year;
        
        // Ensure slots_booked exists
        const slotsBooked = docInfo.slots_booked || {};
        
        // A slot is available if it's not in slots_booked OR if it's the exact slot of the CURRENT appointment being edited.
        const isCurrentlyBookedSlot = (appointment.docId === docInfo._id) && 
                                      (appointment.slotDate === slotDate) && 
                                      (appointment.slotTime === formattedTime);
        
        const isSlotBooked = slotsBooked[slotDate] && slotsBooked[slotDate].includes(formattedTime);
        const isSlotAvailable = !isSlotBooked || isCurrentlyBookedSlot;

        if (isSlotAvailable) {
          timeSlots.push({
            dateTime: new Date(currentDate),
            time: formattedTime,
          });
        }
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      slotsArray.push(timeSlots);
    }
    setDocSlots(slotsArray);
  };

  const handleSave = async () => {
    if (!slotTime) {
      alert("Please select a time slot.");
      return;
    }
    
    setIsSaving(true);
    const date = docSlots[slotIndex][0].dateTime;
    let day = date.getDate().toString().padStart(2, "0");
    let month = (date.getMonth() + 1).toString().padStart(2, "0");
    let year = date.getFullYear();
    const slotDate = day + "_" + month + "_" + year;

    const success = await updateAppointment(appointment._id, selectedDocId, slotDate, slotTime);
    setIsSaving(false);
    if (success) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-700"
      >
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-800">
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Edit Appointment</h2>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-full transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6">
          {/* Patient Details (Read Only) */}
          <div className="mb-6 flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
            <img className="w-12 h-12 rounded-full object-cover border-2 border-white dark:border-slate-600 shadow-sm" src={appointment.userData.image} alt={appointment.userData.name} />
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Patient</p>
              <p className="font-semibold text-slate-800 dark:text-slate-100">{appointment.userData.name}</p>
            </div>
            <div className="ml-auto text-right">
               <p className="text-sm text-slate-500 dark:text-slate-400">Current Slot</p>
               <p className="font-semibold text-primary">{appointment.slotDate.replace(/_/g, '/')} | {appointment.slotTime}</p>
            </div>
          </div>

          {/* Doctor Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Select Doctor</label>
            <select
              value={selectedDocId}
              onChange={(e) => setSelectedDocId(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all cursor-pointer"
            >
              {doctors.filter(d => d.available || d._id === appointment.docId).map((doc) => (
                <option key={doc._id} value={doc._id}>
                  Dr. {doc.name} - {doc.speciality} (Fees: {doc.fees})
                </option>
              ))}
            </select>
          </div>

          {/* Booking Slots */}
          {docInfo && (
            <div className="mt-6">
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">Available Dates</p>
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {docSlots.length > 0 && docSlots.map((item, index) => (
                  <div
                    onClick={() => setSlotIndex(index)}
                    className={`flex flex-col items-center justify-center py-3 px-4 min-w-[70px] rounded-xl cursor-pointer transition-all border ${
                      slotIndex === index
                        ? "bg-primary text-white border-primary shadow-md"
                        : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:border-primary/50"
                    }`}
                    key={index}
                  >
                    <p className="text-xs font-medium">{item[0] && daysOfWeek[item[0].dateTime.getDay()]}</p>
                    <p className="text-lg font-bold mt-0.5">{item[0] && item[0].dateTime.getDate()}</p>
                  </div>
                ))}
              </div>

              <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mt-6 mb-3">Available Times</p>
              <div className="flex gap-3 flex-wrap max-h-40 overflow-y-auto">
                <AnimatePresence mode="popLayout">
                  {docSlots.length > 0 && docSlots[slotIndex] && docSlots[slotIndex].length > 0 ? (
                    docSlots[slotIndex].map((item, index) => (
                      <button
                        onClick={() => setSlotTime(item.time)}
                        className={`text-sm font-medium px-4 py-2 rounded-full cursor-pointer transition-all border ${
                          item.time === slotTime
                            ? "bg-primary text-white border-primary shadow-md"
                            : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:border-primary/50 hover:text-primary dark:hover:text-primary-light"
                        }`}
                        key={index}
                      >
                        {item.time.toLowerCase()}
                      </button>
                    ))
                  ) : (
                    <p className="text-sm text-slate-500 dark:text-slate-400 italic">No available slots for this date.</p>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>

        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-6 py-2 rounded-xl text-slate-600 dark:text-slate-300 font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handleSave}
            disabled={!slotTime || isSaving}
            className={`px-6 py-2 rounded-xl font-medium transition-all ${
              !slotTime || isSaving 
                ? "bg-slate-300 dark:bg-slate-700 text-slate-500 cursor-not-allowed" 
                : "bg-primary text-white hover:bg-primary/90 shadow-md hover:shadow-lg"
            }`}
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default EditAppointmentModal;
