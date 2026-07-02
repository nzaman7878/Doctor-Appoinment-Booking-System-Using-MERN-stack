import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import { motion, AnimatePresence } from "framer-motion";

const DoctorList = () => {
  const { doctors, aToken, getAllDoctors, changeAvailability } =
    useContext(AdminContext);
    
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken, getAllDoctors]);

  const filteredDoctors = doctors.filter(doc => 
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    doc.speciality.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="m-5 mt-8 pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">All Doctors</h1>
        
        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <input 
            type="text" 
            placeholder="Search by name or speciality..."
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
        layout 
        className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 pt-2"
      >
        <AnimatePresence>
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((item, index) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2, delay: index * 0.03 }}
                className="glass-panel dark:glass-panel-dark border border-slate-200 dark:border-slate-700/50 rounded-2xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-300 shadow-sm hover:shadow-xl group"
                key={item._id}
              >
                <div className="relative overflow-hidden bg-indigo-50/50 dark:bg-slate-700/30">
                  <img
                    className="w-full h-56 object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    src={item.image}
                    alt={item.name}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <div className="p-5">
                  <p className="text-slate-800 dark:text-slate-100 text-lg font-bold truncate">
                    {item.name}
                  </p>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">{item.speciality}</p>
                  
                  <div className="mt-4 flex items-center gap-2 text-sm">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        value="" 
                        className="sr-only peer" 
                        checked={item.available}
                        onChange={(e) => changeAvailability(item._id, e.target.checked)}
                      />
                      <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                      <span className={`ml-3 text-sm font-medium ${item.available ? 'text-green-600 dark:text-green-400' : 'text-slate-500 dark:text-slate-500'}`}>
                        {item.available ? 'Available' : 'Unavailable'}
                      </span>
                    </label>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-slate-500 dark:text-slate-400 col-span-full text-center py-10">No doctors found matching "{searchTerm}"</p>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default DoctorList;
