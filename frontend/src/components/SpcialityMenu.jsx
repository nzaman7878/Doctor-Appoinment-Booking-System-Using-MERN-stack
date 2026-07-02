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
      <h1 className='text-3xl font-medium'>Find by Speciality</h1>
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
              onClick={() => scrollTo(0, 0)}
              className='flex flex-col items-center text-xs cursor-pointer flex-shrink-0 group'
              to={`/doctors/${item.speciality}`}
            >
              <div className='w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-center mb-3 shadow-sm group-hover:shadow-md group-hover:border-primary/30 transition-all duration-300 group-hover:-translate-y-2'>
                <img className='w-12 sm:w-14 object-contain transition-transform duration-300 group-hover:scale-110' src={item.image} alt={item.speciality} />
              </div>
              <p className='font-medium text-slate-600 dark:text-slate-300 group-hover:text-primary transition-colors'>{item.speciality}</p>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default SpcialityMenu;