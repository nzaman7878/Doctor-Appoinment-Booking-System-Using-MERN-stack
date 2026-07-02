import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';

const Doctors = () => {
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

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
          
          <div className={`flex-col gap-3 text-sm text-slate-600 dark:text-slate-400 ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
            {categories.map((cat) => (
            <motion.p
              whileHover={{ x: 4 }}
              key={cat}
              onClick={() => speciality === cat ? navigate('/doctors') : navigate(`/doctors/${cat}`)}
              className={`pl-4 py-3 pr-10 border rounded-xl transition-all cursor-pointer font-medium ${
                speciality === cat 
                  ? "bg-primary/10 text-primary border-primary/30 shadow-sm dark:bg-primary/20 dark:border-primary/50" 
                  : "border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
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
              {filterDoc.map((item) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  key={item._id}
                  onClick={() => navigate(`/appointment/${item._id}`)}
                  className="glass-panel dark:glass-panel-dark rounded-2xl overflow-hidden cursor-pointer hover:-translate-y-2 hover:shadow-xl dark:hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-300 group"
                >
                  <div className="relative bg-sky-50 dark:bg-slate-800 overflow-hidden">
                    <img className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105" src={item.image} alt={item.name} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  
                  <div className="p-5">
                    <div className={`flex items-center gap-2 text-xs font-medium mb-2 ${item.available ? 'text-emerald-500' : 'text-slate-400 dark:text-slate-500'}`}>
                      <span className="relative flex h-2.5 w-2.5">
                        {item.available && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>}
                        <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${item.available ? 'bg-emerald-500' : 'bg-slate-400 dark:bg-slate-500'}`}></span>
                      </span>
                      <p>{item.available ? 'Available' : 'Not Available'}</p>
                    </div>

                    <p className="text-slate-900 dark:text-slate-100 text-xl font-semibold group-hover:text-primary transition-colors">{item.name}</p>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">{item.speciality}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          {filterDoc.length === 0 && (
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
