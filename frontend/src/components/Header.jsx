import React from 'react';
import { assets } from '../assets/assets_frontend/assets';
import { motion } from 'framer-motion';

const Header = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, type: 'spring' } },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className='flex flex-col md:flex-row flex-wrap premium-gradient-bg rounded-3xl px-6 md:px-10 lg:px-20 relative overflow-hidden shadow-2xl'
    >
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-white/5 blur-[100px]"></div>
        <div className="absolute bottom-[10%] right-[10%] w-[30%] h-[40%] rounded-full bg-white/5 blur-[80px]"></div>
      </div>

      {/* ---------- Left Side ------------- */}
      <div className='md:w-1/2 flex flex-col items-start justify-center gap-6 py-10 m-auto md:py-[10vw] md:mb-[-30px] z-10'>
        <motion.p
          variants={itemVariants}
          className='text-3xl md:text-4xl lg:text-5xl text-white font-bold leading-tight md:leading-tight lg:leading-tight drop-shadow-sm'
        >
          Book Appointment <br /> With Trusted Doctors
        </motion.p>
        
        <motion.div variants={itemVariants} className='flex flex-col md:flex-row items-center gap-4 text-white/90 text-sm md:text-base font-light'>
          <img className='w-28 drop-shadow-md' src={assets.group_profiles} alt="Profiles" />
          <p>
            Browse our trusted doctors and book your appointment <br className='hidden sm:block' />
            instantly—fast, simple, and secure.
          </p>
        </motion.div>
        
        <motion.a
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href="#speciality"
          className='flex items-center gap-2 bg-white px-8 py-3.5 rounded-full text-primary font-medium text-sm m-auto md:m-0 shadow-[0_4px_14px_0_rgba(0,0,0,0.1)] hover:shadow-[0_6px_20px_rgba(255,255,255,0.23)] transition-shadow duration-300'
        >
          Book Appointment
          <motion.img 
            initial={{ x: 0 }}
            animate={{ x: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className='w-3' 
            src={assets.arrow_icon} 
            alt="Arrow" 
          />
        </motion.a>
      </div>

      {/* ------------ Right Side ---------- */}
      <motion.div 
        variants={itemVariants}
        className='md:w-1/2 relative z-10'
      >
        <motion.img
          animate={{ y: [-10, 10, -10] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className='w-full md:absolute bottom-0 h-auto rounded-lg drop-shadow-2xl'
          src={assets.header_img}
          alt="Header Image"
        />
      </motion.div>
    </motion.div>
  );
};

export default Header;