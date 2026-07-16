import React, { useContext, useState, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { toast } from 'react-toastify'
import axios from 'axios'
import { motion } from 'framer-motion'
import { assets } from '../../assets/assets'

const SiteSettings = () => {
  const { aToken, backendUrl } = useContext(AdminContext)
  const [settings, setSettings] = useState({})
  const [loading, setLoading] = useState(false)

  const imageKeys = [
    { key: 'logo_image', label: 'Site Logo', fallback: assets.admin_logo },
    { key: 'hero_image', label: 'Hero Section Background', fallback: '' },
    { key: 'hero_doctor_image', label: 'Hero Doctor Image', fallback: '' },
    { key: 'banner_image', label: 'Banner Image', fallback: '' },
    { key: 'about_image', label: 'About Us Image', fallback: '' },
    { key: 'contact_image', label: 'Contact Us Image', fallback: '' },
  ]

  const fetchSettings = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/site/settings')
      if (data.success) {
        setSettings(data.settings)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchSettings()
  }, [])

  const handleImageUpload = async (key, e) => {
    const file = e.target.files[0]
    if (!file) return

    const formData = new FormData()
    formData.append('key', key)
    formData.append('image', file)

    setLoading(true)
    try {
      const { data } = await axios.post(backendUrl + '/api/admin/upload-setting-image', formData, {
        headers: { aToken }
      })
      if (data.success) {
        toast.success(data.message)
        setSettings(prev => ({ ...prev, [key]: data.imageUrl }))
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
    setLoading(false)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <motion.div 
      initial="hidden"
      animate="show"
      variants={containerVariants}
      className='m-5 mt-8 pb-10 max-w-5xl'
    >
      <p className='mb-6 text-2xl font-bold text-[var(--text-main)]'>Dynamic Image Management</p>
      <p className='mb-8 text-[var(--text-muted)]'>Upload images here to dynamically replace the static assets on the user frontend.</p>
      
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        {imageKeys.map((item) => (
          <motion.div key={item.key} variants={itemVariants} className='premium-card p-6 flex flex-col gap-4'>
            <p className='font-bold text-[var(--text-main)] text-lg'>{item.label}</p>
            
            <div className='relative w-full h-48 bg-gray-50 dark:bg-[#2A2D2D] border-2 border-dashed border-[var(--border-color)] rounded-xl flex items-center justify-center overflow-hidden'>
              {settings[item.key] ? (
                <img src={settings[item.key]} alt={item.label} className='w-full h-full object-contain' />
              ) : item.fallback ? (
                <img src={item.fallback} alt="Fallback" className='w-full h-full object-contain opacity-50' />
              ) : (
                <p className='text-[var(--text-muted)]'>No image set (using static fallback)</p>
              )}
            </div>

            <div className='flex items-center justify-between mt-2'>
              <label htmlFor={`upload-${item.key}`} className='cursor-pointer bg-[var(--color-primary)] text-white px-6 py-2 rounded-xl font-medium hover:bg-[var(--color-primary-light)] transition-colors'>
                {loading ? 'Uploading...' : 'Upload/Replace'}
                <input 
                  type="file" 
                  id={`upload-${item.key}`} 
                  hidden 
                  accept="image/*" 
                  onChange={(e) => handleImageUpload(item.key, e)}
                  disabled={loading}
                />
              </label>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default SiteSettings
