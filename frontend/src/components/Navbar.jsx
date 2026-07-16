import React, { useContext, useState } from 'react';
import { assets } from "../assets/assets_frontend/assets";
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);
  const { token, setToken, userData, theme, toggleTheme } = useContext(AppContext);

  const logout = () => {
    setToken(false);
    localStorage.removeItem('token');
  };

  const navItems = [
    { name: 'HOME', path: '/' },
    { name: 'ALL DOCTORS', path: '/doctors' },
    { name: 'ABOUT', path: '/about' },
    { name: 'CONTACT', path: '/contact' },
  ];

  return (
    <div className='sticky top-4 z-50 bg-[var(--card-bg)] border border-[var(--border-color)] flex items-center justify-between text-sm py-4 px-6 mb-8 rounded-2xl shadow-sm transition-all'>
      <img
        onClick={() => navigate('/')}
        className='w-36 sm:w-44 cursor-pointer hover:opacity-80 transition-opacity dark:invert'
        src={assets.logo}
        alt="Logo"
      />
      
      <ul className='hidden md:flex items-center gap-2 font-medium'>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
          return (
            <NavLink key={item.name} to={item.path} className="relative px-4 py-2 rounded-xl transition-colors hover:text-primary">
              <span className="relative z-10">{item.name}</span>
              {isActive && (
                <motion.div
                  layoutId="navbar-indicator"
                  className="absolute inset-0 bg-primary/10 rounded-xl z-0"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </NavLink>
          );
        })}
      </ul>

      <div className='flex items-center gap-4'>
        {token && userData ? (
          <div className='flex items-center gap-2 cursor-pointer group relative'>
            <img className='w-9 h-9 rounded-full object-cover border-2 border-primary/20' src={userData.image} alt="User" />
            <img className='w-2.5 transition-transform group-hover:rotate-180 duration-200' src={assets.dropdown_icon} alt="" />

            <div className='absolute top-full right-0 pt-4 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
              <div className='min-w-48 bg-[var(--card-bg)] rounded-xl flex flex-col gap-2 p-3 shadow-md border border-[var(--border-color)]'>
                <button onClick={() => navigate('my-profile')} className='w-full text-left hover:bg-primary/5 hover:text-primary px-4 py-2 rounded-lg cursor-pointer transition-colors dark:text-slate-300 dark:hover:bg-slate-800'>My Profile</button>
                <button onClick={() => navigate('my-appointments')} className='w-full text-left hover:bg-primary/5 hover:text-primary px-4 py-2 rounded-lg cursor-pointer transition-colors dark:text-slate-300 dark:hover:bg-slate-800'>My Appointments</button>
                <div className="h-px bg-gray-200 dark:bg-slate-700 my-1"></div>
                <button onClick={logout} className='w-full text-left hover:bg-red-50 hover:text-red-500 px-4 py-2 rounded-lg cursor-pointer transition-colors dark:text-slate-300 dark:hover:bg-red-900/30'>Logout</button>
              </div>
            </div>
          </div>
        ) : (
          <button onClick={() => navigate('/login')} className='bg-[var(--color-primary)] text-white px-8 py-3 rounded-xl font-medium hidden md:block hover:bg-[var(--color-primary-light)] transition-all duration-200'>
            Create Account
          </button>
        )}
        
        <button 
          onClick={toggleTheme} 
          className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-700 dark:text-slate-300"
          aria-label="Toggle Dark Mode"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <img onClick={() => setShowMenu(true)} className='w-6 md:hidden cursor-pointer dark:invert' src={assets.menu_icon} alt="Menu" />

        {/* -------- Mobile Menu --------- */}
        <AnimatePresence>
          {showMenu && (
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
              className='fixed inset-0 z-50 bg-white md:hidden flex flex-col'
            >
              <div className='flex items-center justify-between px-6 py-6 border-b border-gray-100'>
                <img className='w-36' src={assets.logo} alt="Logo" />
                <button onClick={() => setShowMenu(false)} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                  <img className='w-6' src={assets.cross_icon} alt="Close" />
                </button>
              </div>
              <ul className='flex flex-col items-center gap-4 mt-10 px-5 text-xl font-medium'>
                {navItems.map((item) => (
                  <NavLink
                    key={item.name}
                    onClick={() => setShowMenu(false)}
                    to={item.path}
                    className={({ isActive }) => `px-6 py-3 rounded-2xl w-full text-center transition-all ${isActive ? 'bg-primary/10 text-primary' : 'hover:bg-gray-50'}`}
                  >
                    {item.name}
                  </NavLink>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Navbar;