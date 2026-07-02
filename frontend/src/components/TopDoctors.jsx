import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { motion } from 'framer-motion';

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, type: "spring" } },
  };

  return (
    <div className='flex flex-col items-center gap-4 my-16 text-gray-900 dark:text-slate-100 md:mx-10'>
      <h1 className='text-3xl font-medium text-slate-800 dark:text-slate-100'>Top Doctors to Book</h1>
      <p className='sm:w-1/3 text-center text-sm text-slate-500 dark:text-slate-400'>Simply browse through our extensive list of trusted doctors</p>
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className='w-full grid grid-cols-[var(--grid-cols-auto)] gap-6 pt-8 px-3 sm:px-0'
      >
        {doctors.slice(0, 10).map((item, index) => (
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
            onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0); }}
            className='glass-panel dark:glass-panel-dark rounded-2xl overflow-hidden cursor-pointer shadow-sm transition-colors duration-300 hover:border-primary/30 group'
            key={index}
          >
            <div className='relative overflow-hidden bg-sky-50 dark:bg-slate-800'>
              <img className='w-full object-cover transition-transform duration-500 group-hover:scale-105' src={item.image} alt={item.name} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            
            <div className='p-5'>
              <div className={`flex items-center gap-2 text-xs font-medium mb-2 ${item.available ? 'text-emerald-500' : 'text-slate-400 dark:text-slate-500'}`}>
                <span className="relative flex h-2.5 w-2.5">
                  {item.available && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>}
                  <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${item.available ? 'bg-emerald-500' : 'bg-slate-400 dark:bg-slate-500'}`}></span>
                </span>
                <p>{item.available ? 'Available' : 'Not Available'}</p>
              </div>
              
              <p className='text-slate-800 dark:text-slate-100 text-lg font-semibold group-hover:text-primary transition-colors'>{item.name}</p>
              <p className='text-slate-500 dark:text-slate-400 text-sm mt-1'>{item.speciality}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
      
      <motion.button 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => { navigate('/doctors'); scrollTo(0, 0); }} 
        className='bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 px-12 py-3 rounded-full mt-10 transition-colors shadow-sm'
      >
        View More
      </motion.button>
    </div>
  );
};

export default TopDoctors;