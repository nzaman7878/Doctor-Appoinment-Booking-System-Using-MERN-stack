import React from 'react';
import { assets } from '../assets/assets_frontend/assets';
import { motion } from 'framer-motion';

const Contact = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, type: "spring" } }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-[80vh] pt-10"
    >
      <motion.div variants={itemVariants} className='text-center text-3xl font-medium text-slate-500 dark:text-slate-400 mb-12'>
        <p>CONTACT <span className='text-slate-800 dark:text-slate-100 font-bold'>US</span></p>
      </motion.div>
      
      <div className='flex flex-col md:flex-row justify-center gap-12 lg:gap-20 mb-28'>
        <motion.div variants={itemVariants} className="w-full md:w-1/2 lg:max-w-[450px] relative rounded-3xl overflow-hidden shadow-2xl">
          <div className="absolute inset-0 premium-gradient-bg opacity-10"></div>
          <img className='w-full object-cover relative z-10' src={assets.contact_image} alt="Contact us" />
        </motion.div>
        
        <motion.div variants={itemVariants} className='flex flex-col justify-center items-start gap-8'>
          <div>
            <p className='font-bold text-xl text-slate-800 dark:text-slate-100 mb-3'>Our Office</p>
            <p className='text-slate-500 dark:text-slate-400 leading-relaxed'>
              A-42, Sector 16, Noida <br />
              Uttar Pradesh 201301, India
            </p>
          </div>
          
          <div>
            <p className='font-bold text-xl text-slate-800 dark:text-slate-100 mb-3'>Contact Info</p>
            <p className='text-slate-500 dark:text-slate-400 leading-relaxed'>
              Tel: +91 9876543210 <br />
              Email: contact@docconnect.in
            </p>
          </div>
          
          <div>
            <p className='font-bold text-xl text-slate-800 dark:text-slate-100 mb-3'>Careers at DocConnect</p>
            <p className='text-slate-500 dark:text-slate-400 leading-relaxed'>
              Learn more about our teams and job openings.
            </p>
          </div>
          
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className='mt-2 border-2 border-primary text-primary dark:text-primary-light px-8 py-3 rounded-full font-medium hover:bg-primary hover:text-white transition-colors duration-300 shadow-sm'
          >
            Explore Jobs
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Contact;
