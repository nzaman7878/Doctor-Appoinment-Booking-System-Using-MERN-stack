import React from 'react';
import { assets } from '../assets/assets_frontend/assets';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AppContext } from '../context/AppContext';
import { useContext } from 'react';

const Banner = () => {
  const navigate = useNavigate();
  const { siteSettings } = useContext(AppContext);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, type: "spring" }}
      className='flex bg-[var(--color-primary)] rounded-[24px] px-6 sm:px-14 md:px-14 lg:px-12 my-20 md:mx-10 relative overflow-hidden'
    >
      {/* ------ Left Side -------- */}
      <div className='flex-1 py-8 sm:py-16 md:py-16 lg:py-24 lg:pl-5 z-10'>
        <div className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-white'>
          <p>Book Appointment</p>
          <p className='mt-4 font-medium text-white/90'>With 100+ Trusted Doctors</p>
        </div>
        
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => { navigate('/login'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
          className='bg-white text-sm sm:text-base text-[var(--color-primary)] font-medium px-8 py-3.5 rounded-xl mt-8 hover:bg-gray-50 transition-all duration-200 border border-gray-100'
        >
          Create account
        </motion.button>
      </div>

      {/* ---------- Right Side -------- */}
      <div className='hidden md:block md:w-1/2 lg:w-[370px] relative z-10'>
        <motion.img 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className='w-full absolute bottom-0 right-0 max-w-md drop-shadow-2xl'
          src={siteSettings?.banner_image || assets.appointment_img} 
          alt="Appointment" 
        />
      </div>

    </motion.div>
  );
};

export default Banner;