import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData, updateProfile } = useContext(DoctorContext);
  const { currency } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken, getProfileData]);

  const handleSave = async () => {
   try {
    await updateProfile({
      fees: profileData.fees,
      address: profileData.address,
      available: profileData.available
    });
    setIsEdit(false);
  } catch (error) {
      toast.error(error.response?.data?.message || 'Update failed');
      console.error(error);
    }
  };

  return (
    profileData && (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="m-5 mt-8 pb-10 max-w-5xl"
      >
        <p className="mb-6 text-2xl font-bold text-slate-800 dark:text-slate-100">Profile</p>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/3 xl:w-1/4 rounded-2xl overflow-hidden glass-panel dark:glass-panel-dark border-none shadow-sm relative group">
            <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <img 
              src={profileData.image} 
              alt={profileData.name} 
              className="w-full h-80 md:h-auto object-cover object-top" 
            />
          </div>
          
          <div className="flex-1 glass-panel dark:glass-panel-dark border-none rounded-2xl p-8 shadow-sm relative overflow-hidden">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-10 -mt-10"></div>
            
            <div className="relative z-10">
              {/* Doctor Info - Non-editable */}
              <p className="flex items-center gap-2 text-3xl font-bold text-slate-800 dark:text-slate-100">
                {profileData.name}
              </p>
              <div className="flex flex-wrap items-center gap-2 mt-2 text-slate-600 dark:text-slate-300">
                <p className="font-medium">{profileData.degree} - {profileData.speciality}</p>
                <span className="py-1 px-3 border border-slate-200 dark:border-slate-700 text-xs rounded-full bg-white/50 dark:bg-slate-800/50 font-semibold shadow-sm">
                  {profileData.experience}
                </span>
              </div>

              {/* About */}
              <div className="mt-6">
                <p className="flex items-center gap-1 text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">About</p>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-[700px]">{profileData.about}</p>
              </div>

              {/* Editable Fields */}
              {isEdit ? (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-6 space-y-5"
                >
                  <div>
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">Appointment Fee</label>
                    <div className="relative max-w-[200px]">
                      <span className="absolute left-3 top-2.5 text-slate-500 font-medium">{currency}</span>
                      <input 
                        type="number" 
                        className="w-full pl-8 pr-4 py-2.5 bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-primary/50 text-slate-800 dark:text-slate-100"
                        value={profileData.fees || ''}
                        onChange={(e) => setProfileData(prev => ({
                          ...prev, 
                          fees: Number(e.target.value) || 0
                        }))}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">Address</label>
                    <div className="space-y-2 max-w-md">
                      <input 
                        type="text" 
                        className="w-full px-4 py-2.5 bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-primary/50 text-slate-800 dark:text-slate-100"
                        placeholder="Line 1"
                        value={profileData.address?.line1 || ''}
                        onChange={(e) => setProfileData(prev => ({
                          ...prev, 
                          address: {...(prev.address || {}), line1: e.target.value}
                        }))}
                      />
                      <input 
                        type="text" 
                        className="w-full px-4 py-2.5 bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-primary/50 text-slate-800 dark:text-slate-100"
                        placeholder="Line 2"
                        value={profileData.address?.line2 || ''}
                        onChange={(e) => setProfileData(prev => ({
                          ...prev, 
                          address: {...(prev.address || {}), line2: e.target.value}
                        }))}
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-slate-50/50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 max-w-md">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={!!profileData.available}
                        onChange={(e) => setProfileData(prev => ({
                          ...prev, 
                          available: e.target.checked
                        }))}
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                      <span className="ml-3 text-sm font-semibold text-slate-700 dark:text-slate-300">
                        Available for bookings
                      </span>
                    </label>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleSave}
                      className="px-8 py-2.5 premium-gradient-bg text-white font-semibold rounded-full shadow-md hover:shadow-lg transition-all"
                    >
                      Save Changes
                    </motion.button>
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsEdit(false)}
                      className="px-8 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                    >
                      Cancel
                    </motion.button>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-6 space-y-4"
                >
                  <p className="text-slate-600 dark:text-slate-400 font-medium flex items-center gap-2">
                    Appointment fee:{' '}
                    <span className="text-slate-800 dark:text-slate-100 font-bold text-xl">
                      {currency}{profileData.fees}
                    </span>
                  </p>

                  <div className="flex gap-2 py-2">
                    <p className="font-semibold text-slate-700 dark:text-slate-300">Address:</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {profileData.address?.line1}
                      {profileData.address?.line2 && <><br />{profileData.address.line2}</>}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 py-2">
                    <div className={`w-3 h-3 rounded-full ${profileData.available ? 'bg-green-500' : 'bg-slate-400'}`}></div>
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                      {profileData.available ? 'Currently Available' : 'Currently Unavailable'}
                    </span>
                  </div>

                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsEdit(true)}
                    className="px-8 py-2.5 mt-4 border-2 border-primary text-primary dark:border-indigo-400 dark:text-indigo-400 font-semibold rounded-full hover:bg-primary hover:text-white dark:hover:bg-indigo-500 dark:hover:text-white transition-all shadow-sm"
                  >
                    Edit Profile
                  </motion.button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    )
  );
};

export default DoctorProfile;
