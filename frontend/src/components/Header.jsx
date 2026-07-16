import React, { useContext } from 'react';
import { assets } from '../assets/assets_frontend/assets';
import { motion } from 'framer-motion';
import { AppContext } from '../context/AppContext';

const Header = () => {
  const { siteSettings } = useContext(AppContext);
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
      className={`flex flex-col md:flex-row flex-wrap rounded-[20px] px-6 md:px-10 lg:px-20 relative overflow-hidden shadow-sm bg-[var(--color-primary)]`}
      style={siteSettings?.hero_image ? {
        backgroundImage: `url(${siteSettings.hero_image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      } : {}}
    >
      {/* Overlay to ensure text remains readable if a background image is set */}
      {siteSettings?.hero_image && <div className="absolute inset-0 bg-black/50 z-0"></div>}

      {/* ---------- Left Side ------------- */}
      <div className='md:w-1/2 flex flex-col items-start justify-center gap-6 py-10 m-auto md:py-[10vw] z-10'>
        <motion.p
          variants={itemVariants}
          className='text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight'
        >
          Book Appointment <br /> With Trusted Doctors
        </motion.p>

        <motion.div variants={itemVariants} className='flex flex-col md:flex-row items-center gap-4 text-white/90 text-sm md:text-base font-light'>
          <img className='w-28' src={assets.group_profiles} alt="Avatars of trusted doctors" />
          <p>
            Browse our trusted doctors and book your appointment <br className='hidden sm:block' />
            instantly—fast, simple, and secure.
          </p>
        </motion.div>

        <motion.a
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          href="#speciality"
          className='flex items-center gap-2 bg-white px-8 py-3.5 rounded-xl text-[var(--color-primary)] font-medium text-sm m-auto md:m-0 hover:bg-gray-50 transition-all duration-200 border border-gray-100'
        >
          Book Appointment
          <img
            className='w-3 ml-2'
            src={assets.arrow_icon}
            alt="Right arrow icon"
          />
        </motion.a>
      </div>

      {/* ------------ Right Side ---------- */}
      {(!siteSettings?.hero_image || siteSettings?.hero_doctor_image) && (
        <motion.div
          variants={itemVariants}
          className='md:w-1/2 relative z-10 flex items-end justify-center pt-10 md:pt-0'
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className='w-full max-w-md lg:max-w-lg relative'
            style={{
              maskImage: 'linear-gradient(to top, transparent 0%, black 15%, black 100%)',
              WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 15%, black 100%)'
            }}
          >
            <img
              className='w-full h-auto drop-shadow-2xl mix-blend-multiply opacity-95'
              src={siteSettings?.hero_doctor_image || assets.indian_female_doctor}
              alt="Trusted Doctor"
            />
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Header;