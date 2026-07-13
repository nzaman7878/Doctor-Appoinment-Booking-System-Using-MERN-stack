import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets_frontend/assets';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { motion } from 'framer-motion';

const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(null);

  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("address", JSON.stringify(userData.address));
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);

      if (image) formData.append("image", image);

      const { data } = await axios.post(
        `${backendUrl}/api/user/update-profile`,
        formData,
        {
          headers: {
            token,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Profile update failed");
    }
  };

  if (!userData) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, type: "spring" }}
      className="max-w-2xl mx-auto my-10 p-8 premium-card relative overflow-hidden"
    >
      {/* ===== Profile Image Section ===== */}
      <div className="relative z-10 flex flex-col items-center mt-8 mb-8">
        {isEdit ? (
          <label htmlFor="image">
            <motion.div whileHover={{ scale: 1.02 }} className="inline-block relative cursor-pointer">
              <img
                className="w-40 h-40 rounded-full object-cover border-4 border-white dark:border-[#212424] shadow-sm"
                src={image ? URL.createObjectURL(image) : userData.image}
                alt="Profile"
              />
              {!image && (
                <div className="absolute bottom-2 right-2 bg-white rounded-full p-2 shadow-md border border-[var(--border-color)]">
                  <img className="w-6" src={assets.upload_icon} alt="Upload" />
                </div>
              )}
            </motion.div>
            <input
              type="file"
              id="image"
              hidden
              onChange={(e) => setImage(e.target.files[0])}
            />
          </label>
        ) : (
          <motion.div whileHover={{ scale: 1.02 }} className="inline-block">
            <img
              className="w-40 h-40 rounded-full object-cover border-4 border-white dark:border-[#212424] shadow-sm"
              src={userData.image}
              alt="Profile"
            />
          </motion.div>
        )}

        {/* ===== Name ===== */}
        <div className="mt-6 w-full text-center">
          {isEdit ? (
            <input
              className="text-3xl font-medium text-center bg-transparent border-b border-[var(--color-primary)] outline-none text-[var(--text-main)] transition-colors pb-1 px-4 w-full sm:w-auto"
              type="text"
              value={userData.name || ''}
              onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))}  
            />
          ) : (
            <h2 className="text-3xl font-medium text-[var(--text-main)]">{userData.name}</h2>
          )}
        </div>
      </div>

      <hr className="my-8 border-slate-200 dark:border-slate-700" />

      {/* ===== Contact Info ===== */}
      <div className="mb-10">
        <h3 className="text-sm tracking-wider font-medium text-[var(--color-primary)] uppercase mb-6">Contact Information</h3>

        <div className="space-y-5">
          {/* Email */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
            <label className="text-sm font-medium text-[var(--text-muted)] sm:w-24">Email</label>
            <p className="flex-1 text-[var(--text-main)] bg-gray-50 dark:bg-[#2A2D2D] p-3 rounded-xl border border-[var(--border-color)] font-medium">{userData.email}</p>
          </div>

          {/* Phone */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
            <label className="text-sm font-medium text-[var(--text-muted)] sm:w-24">Phone</label>
            {isEdit ? (
              <input
                className="flex-1 p-3 border border-[var(--border-color)] bg-white dark:bg-[#2A2D2D] rounded-xl focus:outline-none focus:border-[var(--color-primary-light)] text-[var(--text-main)] transition-all"
                type="text"
                value={userData.phone || ''}
                onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))}  
              />
            ) : (
              <p className="flex-1 text-[var(--text-main)] bg-gray-50 dark:bg-[#2A2D2D] p-3 rounded-xl border border-[var(--border-color)] font-medium">{userData.phone}</p>
            )}
          </div>

          {/* Address */}
          <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6">
            <label className="text-sm font-medium text-[var(--text-muted)] sm:w-24 sm:mt-3">Address</label>
            {isEdit ? (
              <div className="flex-1 space-y-3">
                <input
                  className="w-full p-3 border border-[var(--border-color)] bg-white dark:bg-[#2A2D2D] rounded-xl focus:outline-none focus:border-[var(--color-primary-light)] text-[var(--text-main)] transition-all"
                  type="text"
                  placeholder="Address Line 1"
                  value={userData.address?.line1 || ''}
                  onChange={(e) => setUserData(prev => ({
                    ...prev,
                    address: { ...prev.address, line1: e.target.value }
                  }))}
                />
                <input
                  className="w-full p-3 border border-[var(--border-color)] bg-white dark:bg-[#2A2D2D] rounded-xl focus:outline-none focus:border-[var(--color-primary-light)] text-[var(--text-main)] transition-all"
                  type="text"
                  placeholder="Address Line 2"
                  value={userData.address?.line2 || ''}
                  onChange={(e) => setUserData(prev => ({
                    ...prev,
                    address: { ...prev.address, line2: e.target.value }
                  }))}
                />
              </div>
            ) : (
              <div className="flex-1 text-[var(--text-main)] bg-gray-50 dark:bg-[#2A2D2D] p-3 rounded-xl border border-[var(--border-color)] font-medium">
                {userData.address?.line1 || ''} {userData.address?.line2 && <br />} {userData.address?.line2 || ''}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ===== Basic Info ===== */}
      <div className="mb-10">
        <h3 className="text-sm tracking-wider font-medium text-[var(--color-primary)] uppercase mb-6">Basic Information</h3>

        <div className="space-y-5">
          {/* Gender */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
            <label className="text-sm font-medium text-[var(--text-muted)] sm:w-24">Gender</label>
            {isEdit ? (
              <select
                className="flex-1 p-3 border border-[var(--border-color)] bg-white dark:bg-[#2A2D2D] rounded-xl focus:outline-none focus:border-[var(--color-primary-light)] text-[var(--text-main)] transition-all"
                value={userData.gender || 'Male'}
                onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))}  
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              <p className="flex-1 text-[var(--text-main)] bg-gray-50 dark:bg-[#2A2D2D] p-3 rounded-xl border border-[var(--border-color)] font-medium">{userData.gender || 'Not specified'}</p>
            )}
          </div>

          {/* DOB */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
            <label className="text-sm font-medium text-[var(--text-muted)] sm:w-24">Birthday</label>
            {isEdit ? (
              <input
                className="flex-1 p-3 border border-[var(--border-color)] bg-white dark:bg-[#2A2D2D] rounded-xl focus:outline-none focus:border-[var(--color-primary-light)] text-[var(--text-main)] transition-all [&::-webkit-calendar-picker-indicator]:dark:invert"
                type="date"
                value={formatDateForInput(userData.dob)}
                onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))}  
              />
            ) : (
              <p className="flex-1 text-[var(--text-main)] bg-gray-50 dark:bg-[#2A2D2D] p-3 rounded-xl border border-[var(--border-color)] font-medium">
                {userData.dob ? new Date(userData.dob).toLocaleDateString('en-IN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                }) : 'Not specified'}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ===== Action Buttons ===== */}
      <div className="flex justify-center mt-12">
        {isEdit ? (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-[var(--color-primary)] text-white px-12 py-3 rounded-xl shadow-sm hover:bg-[var(--color-primary-light)] transition-all font-medium border border-[var(--color-primary)]"
            onClick={updateUserProfileData}
          >
            Save Information
          </motion.button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="border border-[var(--color-primary)] text-[var(--color-primary)] px-12 py-3 rounded-xl hover:bg-[var(--color-primary)] hover:text-white transition-all font-medium shadow-sm"
            onClick={() => setIsEdit(true)}
          >
            Edit Profile
          </motion.button>
        )}
      </div>

    </motion.div>
  );
};

export default MyProfile;
