import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';

const Doctors = () => {
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const navigate = useNavigate();
  const { doctors, isLoadingDoctors } = useContext(AppContext);

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter((doc) => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);

  const categories = [
    'General physician',
    'Gynecologist',
    'Dermatologist',
    'Pediatricians',
    'Neurologist',
    'Gastroenterologist',
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="min-h-screen pt-4"
    >
      <div className="flex flex-col sm:flex-row items-start gap-8 sm:gap-10 mt-6">
        
        {/* ---- Left Sidebar (Sticky) ---- */}
        <div className="flex flex-col gap-4 sm:w-72 flex-shrink-0 sm:sticky sm:top-28 z-10 self-start">
          <p className="text-slate-600 dark:text-slate-400 text-lg mb-2">Browse through the doctors specialist</p>
          
          <button 
            className={`py-2 px-4 border rounded-lg text-sm transition-all sm:hidden ${showFilter ? 'bg-primary text-white border-primary shadow-md' : 'border-slate-300 dark:border-slate-700 dark:text-slate-300'}`} 
            onClick={() => setShowFilter((prev) => !prev)}
          >
            Filters
          </button>
          
          <div className={`flex-col gap-3 text-sm text-[var(--text-muted)] ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
            {categories.map((cat) => (
            <motion.p
              whileHover={{ x: 4 }}
              key={cat}
              onClick={() => speciality === cat ? navigate('/doctors') : navigate(`/doctors/${cat}`)}
              className={`pl-4 py-3 pr-10 border rounded-xl transition-all cursor-pointer font-medium ${
                speciality === cat 
                  ? "bg-white text-[var(--color-primary)] border-[var(--color-primary)] shadow-sm dark:bg-[#2A2D2D] dark:border-[var(--color-primary-light)]" 
                  : "border-[var(--border-color)] bg-white dark:bg-[#212424] hover:border-[var(--color-primary-light)]"
              }`}
            >
              {cat}
            </motion.p>
          ))}
          </div>
        </div>

        {/* ---- Doctors List ---- */}
        <div className="w-full">
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 gap-y-8">
            <AnimatePresence>
              {isLoadingDoctors ? (
                Array(6).fill(0).map((_, index) => (
                  <div key={`skeleton-${index}`} className='premium-card overflow-hidden animate-pulse'>
                    <div className='w-full h-56 bg-slate-200 dark:bg-[#2A2D2D]'></div>
                    <div className='p-5'>
                      <div className='w-20 h-4 bg-slate-200 dark:bg-slate-600 rounded mb-3'></div>
                      <div className='w-3/4 h-6 bg-slate-200 dark:bg-slate-600 rounded mb-2'></div>
                      <div className='w-1/2 h-4 bg-slate-200 dark:bg-slate-600 rounded'></div>
                    </div>
                  </div>
                ))
              ) : (
                filterDoc.map((item) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    key={item._id}
                    onClick={() => navigate(`/appointment/${item._id}`)}
                    className="premium-card overflow-hidden cursor-pointer hover:-translate-y-1 transition-all duration-200 group"
                  >
                    <div className="relative bg-gray-50 dark:bg-[#2A2D2D] overflow-hidden">
                      <img className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105" src={item.image} alt={item.name} />
                    </div>
                    
                    <div className="p-5">
                      <div className={`flex items-center gap-2 text-xs font-medium mb-2 ${item.available ? 'text-[var(--color-accent)]' : 'text-[var(--text-muted)]'}`}>
                        <span className="relative flex h-2 w-2">
                          <span className={`relative inline-flex rounded-full h-2 w-2 ${item.available ? 'bg-[var(--color-accent)]' : 'bg-[var(--text-muted)]'}`}></span>
                        </span>
                        <p>{item.available ? 'Available' : 'Not Available'}</p>
                      </div>

                      <p className="text-[var(--text-main)] text-xl font-medium group-hover:text-[var(--color-primary)] transition-colors">{item.name}</p>
                      <p className="text-[var(--text-muted)] text-sm mt-1">{item.speciality}</p>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </motion.div>
          {!isLoadingDoctors && filterDoc.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full py-20 flex flex-col items-center justify-center text-slate-500 dark:text-slate-400"
            >
              <p className="text-xl">No doctors found in this speciality.</p>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Doctors;
