import React, { useContext } from 'react';
import { assets } from '../assets/assets_frontend/assets';
import { motion } from 'framer-motion';
import { AppContext } from '../context/AppContext';

const About = () => {
  const { siteSettings } = useContext(AppContext);
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
      className="min-h-screen pt-10"
    >
      <motion.div variants={itemVariants} className='text-center text-3xl font-medium text-slate-500 dark:text-slate-400 mb-12'>
        <p>ABOUT <span className='text-slate-800 dark:text-slate-100 font-bold'>US</span></p>
      </motion.div>
      
      <div className='flex flex-col md:flex-row gap-12 lg:gap-20 items-center md:items-start'>
        <motion.div variants={itemVariants} className="w-full md:w-1/2 lg:max-w-[450px] relative rounded-3xl overflow-hidden shadow-lg border border-[var(--border-color)]">
          <img className='w-full object-cover relative z-10' src={siteSettings?.about_image || assets.about_image} alt="About us" />
        </motion.div>
        
        <motion.div variants={itemVariants} className='flex flex-col justify-center gap-6 md:w-1/2 text-[var(--text-muted)] text-base leading-relaxed'>
          <p>Welcome to DocConnect, your trusted partner in managing your healthcare needs conveniently and efficiently. At DocConnect, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.</p>
          <p>DocConnect is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, DocConnect is here to support you every step of the way.</p>
          <b className='text-[var(--text-main)] text-lg mt-2 font-medium'>Our Vision</b>
          <p>Our vision at DocConnect is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.</p>
        </motion.div>
      </div>

      <motion.div variants={itemVariants} className='text-2xl mt-24 mb-10 text-[var(--text-muted)] text-center md:text-left'>
        <p>WHY <span className='text-[var(--text-main)] font-semibold'>CHOOSE US</span></p>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-20'
      >
        {[
          { title: 'Efficiency', desc: 'Streamlined appointment scheduling that fits into your busy lifestyle.' },
          { title: 'Convenience', desc: 'Access to a network of trusted healthcare professionals in your area.' },
          { title: 'Personalization', desc: 'Tailored recommendations and reminders to help you stay on top of your health.' }
        ].map((feature, idx) => (
          <motion.div 
            key={idx}
            variants={itemVariants}
            whileHover={{ y: -4 }}
            className='premium-card px-8 py-12 flex flex-col gap-4 text-[15px] group cursor-pointer'
          >
            <b className="text-xl text-[var(--text-main)] font-medium group-hover:text-[var(--color-primary)] transition-colors">{feature.title}:</b>
            <p className="text-[var(--text-muted)] leading-relaxed">{feature.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default About;
