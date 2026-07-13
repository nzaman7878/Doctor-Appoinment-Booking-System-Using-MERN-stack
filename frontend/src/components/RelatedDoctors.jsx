import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const RelatedDoctors = ({ speciality, docId }) => {
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();
  const [relDoc, setRelDocs] = useState([]);

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const doctorsData = doctors.filter((doc) => doc.speciality === speciality && doc._id !== docId);
      setRelDocs(doctorsData);
    }
  }, [doctors, speciality, docId]);

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
    <div className='flex flex-col items-center gap-4 my-16 text-slate-800 dark:text-slate-100 md:mx-10'>
      <h1 className='text-3xl font-medium'>Related Doctors</h1>
      <p className='sm:w-1/3 text-center text-sm text-slate-500 dark:text-slate-400'>
        Simply browse through our extensive list of trusted doctors
      </p>
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className='w-full grid grid-cols-[var(--grid-cols-auto)] gap-6 pt-8 px-3 sm:px-0'
      >
        {relDoc.slice(0, 5).map((item, index) => (
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -4 }}
            onClick={() => { navigate(`/appointment/${item._id}`); window.scrollTo(0, 0); }}
            className='premium-card overflow-hidden cursor-pointer group'
            key={index}
          >
            <div className='relative overflow-hidden bg-gray-50 dark:bg-[#2A2D2D]'>
              <img className='w-full object-cover transition-transform duration-500 group-hover:scale-105' src={item.image} alt={item.name} />
            </div>
            
            <div className='p-5'>
              <div className={`flex items-center gap-2 text-xs font-medium mb-2 ${item.available ? 'text-[var(--color-accent)]' : 'text-[var(--text-muted)]'}`}>
                <span className="relative flex h-2 w-2">
                  <span className={`relative inline-flex rounded-full h-2 w-2 ${item.available ? 'bg-[var(--color-accent)]' : 'bg-[var(--text-muted)]'}`}></span>
                </span>
                <p>{item.available ? 'Available' : 'Not Available'}</p>
              </div>
              
              <p className='text-[var(--text-main)] text-lg font-medium transition-colors group-hover:text-[var(--color-primary)]'>{item.name}</p>
              <p className='text-[var(--text-muted)] text-sm mt-1'>{item.speciality}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
      
      <motion.button 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => { navigate('/doctors'); scrollTo(0, 0); }} 
        className='bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 px-12 py-3 rounded-full mt-10 transition-colors shadow-sm hover:shadow-md'
      >
        View More
      </motion.button>
    </div>
  );
};

export default RelatedDoctors;