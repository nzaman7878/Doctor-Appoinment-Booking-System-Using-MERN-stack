import React from 'react';
import { assets } from '../assets/assets_frontend/assets';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
      className='md:mx-10 mt-40'
    >
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 text-sm'>
        {/* ------------Left Section ---------- */}
        <motion.div variants={itemVariants}>
          <img className='mb-6 w-44 cursor-pointer dark:invert' src={assets.logo} alt="DocConnect Logo" />
          <p className='w-full md:w-2/3 text-[var(--text-muted)] leading-relaxed'>
            “Doctor Appointment System – Your reliable platform for booking medical appointments with trusted doctors anytime, anywhere. Connecting patients and healthcare providers to make healthcare simpler, faster, and more accessible.”
          </p>
        </motion.div>

        {/* ------Center Section --------- */}
        <motion.div variants={itemVariants}>
          <p className='text-lg font-medium mb-5 text-[var(--text-main)]'>COMPANY</p>
          <ul className='flex flex-col items-start gap-3 text-[var(--text-muted)]'>
            <li><button onClick={() => handleNavigation('/')} className="hover:text-[var(--color-primary)] transition-colors cursor-pointer text-left">Home</button></li>
            <li><button onClick={() => handleNavigation('/about')} className="hover:text-[var(--color-primary)] transition-colors cursor-pointer text-left">About us</button></li>
            <li><button onClick={() => handleNavigation('/contact')} className="hover:text-[var(--color-primary)] transition-colors cursor-pointer text-left">Contact us</button></li>
            <li><button onClick={() => handleNavigation('/')} className="hover:text-[var(--color-primary)] transition-colors cursor-pointer text-left">Privacy policy</button></li>
          </ul>
        </motion.div>

        {/* ----------Right Section ---------- */}
        <motion.div variants={itemVariants}>
          <p className='text-lg font-medium mb-5 text-[var(--text-main)]'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-3 text-[var(--text-muted)]'>
            <li className="hover:text-[var(--color-primary)] transition-colors cursor-pointer w-fit">+91-700-235-17345</li>
            <li className="hover:text-[var(--color-primary)] transition-colors cursor-pointer w-fit">docconnect@gmail.com</li>
          </ul>
        </motion.div>
      </div>

      {/* ------------- Copyright Text ------------- */}
      <motion.div variants={itemVariants} className="pt-6 border-t border-[var(--border-color)]">
        <p className='py-4 text-sm text-center text-[var(--text-muted)]'>
          Copyright 2025 © DocConnect -- All Rights Reserved.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default Footer;