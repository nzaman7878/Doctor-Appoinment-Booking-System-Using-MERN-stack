import React from 'react';
import { specialityData } from '../assets/assets_frontend/assets';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const SpcialityMenu = () => {
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
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300, damping: 20 } },
  };

  return (
    <div className='flex flex-col items-center gap-4 py-16 text-slate-800 dark:text-slate-100' id='speciality'>
      <h1 className='text-3xl font-semibold'>Find by Speciality</h1>
      <p className='sm:w-1/3 text-center text-sm text-slate-500 dark:text-slate-400'>
        Easily browse our extensive list of trusted doctors and schedule your appointment hassle-free.
      </p>
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className='flex sm:justify-center gap-6 pt-10 w-full overflow-x-auto scrollbar-hide px-4'
        style={{ scrollbarWidth: 'none' }}
      >
        {specialityData.map((item, index) => (
          <motion.div key={index} variants={itemVariants}>
            <Link
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className='flex flex-col items-center text-xs cursor-pointer flex-shrink-0 group'
              to={`/doctors/${item.speciality}`}
            >
              <div className='w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white dark:bg-[#212424] border border-[var(--border-color)] flex items-center justify-center mb-3 transition-all duration-200 group-hover:border-[var(--color-primary-light)] group-hover:-translate-y-1'>
                <img className='w-12 sm:w-14 object-contain transition-transform duration-300 group-hover:scale-105' src={item.image} alt={item.speciality} />
              </div>
              <p className='font-medium text-[var(--text-main)] group-hover:text-[var(--color-primary)] transition-colors'>{item.speciality}</p>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default SpcialityMenu;