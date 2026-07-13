import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import { motion, AnimatePresence } from "framer-motion";

const DoctorList = () => {
  const { doctors, aToken, getAllDoctors, changeAvailability, deleteDoctor } =
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
        <h1 className="text-2xl font-bold text-[var(--text-main)]">All Doctors</h1>
        
        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <input 
            type="text" 
            placeholder="Search by name or speciality..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-full border border-[var(--border-color)] bg-white dark:bg-[#212424] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-light)] focus:border-[var(--color-primary-light)] text-[var(--text-main)] transition-all shadow-sm"
          />
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 absolute left-3 top-2.5 text-[var(--text-muted)]">
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
                className="premium-card border-none rounded-2xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-300 shadow-sm hover:shadow-xl group"
                key={item._id}
              >
                <div className="relative overflow-hidden bg-[var(--color-primary)]/5">
                  <img
                    className="w-full h-56 object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    src={item.image}
                    alt={item.name}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <div className="p-5">
                  <p className="text-[var(--text-main)] text-lg font-bold truncate">
                    {item.name}
                  </p>
                  <p className="text-[var(--text-muted)] text-sm mt-1">{item.speciality}</p>
                  
                  <div className="mt-4 flex items-center justify-between gap-2 text-sm">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        value="" 
                        className="sr-only peer" 
                        checked={item.available}
                        onChange={(e) => changeAvailability(item._id, e.target.checked)}
                      />
                      <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-[#313434] peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-[var(--color-primary)]"></div>
                      <span className={`ml-3 text-sm font-medium ${item.available ? 'text-green-600 dark:text-green-400' : 'text-[var(--text-muted)]'}`}>
                        {item.available ? 'Available' : 'Unavailable'}
                      </span>
                    </label>

                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        if (window.confirm(`Are you sure you want to completely remove Dr. ${item.name} from the system?`)) {
                          deleteDoctor(item._id);
                        }
                      }}
                      className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-full transition-colors"
                      title="Delete Doctor"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                      </svg>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-[var(--text-muted)] col-span-full text-center py-10">No doctors found matching "{searchTerm}"</p>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default DoctorList;
