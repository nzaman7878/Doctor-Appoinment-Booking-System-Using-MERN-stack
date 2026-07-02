import React from 'react';
import { assets } from '../assets/assets_frontend/assets';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Banner = () => {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, type: "spring" }}
      className='flex premium-gradient-bg rounded-3xl px-6 sm:px-14 md:px-14 lg:px-12 my-20 md:mx-10 relative overflow-hidden shadow-xl'
    >
      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 pointer-events-none"></div>

      {/* ------ Left Side -------- */}
      <div className='flex-1 py-8 sm:py-16 md:py-16 lg:py-24 lg:pl-5 z-10'>
        <div className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white drop-shadow-sm'>
          <p>Book Appointment</p>
          <p className='mt-4 font-semibold text-white/90'>With 100+ Trusted Doctors</p>
        </div>
        
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => { navigate('/login'); scrollTo(0,0); }} 
          className='bg-white text-sm sm:text-base text-primary font-medium px-8 py-3.5 rounded-full mt-8 shadow-[0_4px_14px_0_rgba(0,0,0,0.1)] hover:shadow-[0_6px_20px_rgba(255,255,255,0.2)] transition-shadow'
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
          src={assets.appointment_img} 
          alt="Appointment" 
        />
      </div>

    </motion.div>
  );
};

export default Banner;