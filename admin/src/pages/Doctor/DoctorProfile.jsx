import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";


const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData, updateProfile } = useContext(DoctorContext);
  const { currency } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken]);

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
      <div>
        <div className="flex flex-col gap-4 m-5 ">
          <div className="bg-primary/80 w-full sm:max-w-64 rounded-lg overflow-hidden">
            <img 
              src={profileData.image} 
              alt={profileData.name} 
              className="w-full h-64 object-cover" 
            />
          </div>
          
          <div className="flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white">
            {/* Doctor Info - Non-editable */}
            <p className="flex items-center gap-2 text-3xl font-medium text-gray-700">
              {profileData.name}
            </p>
            <div className="flex items-center gap-2 mt-1 text-gray-600">
              <p>{profileData.degree} - {profileData.speciality}</p>
              <span className="py-0.5 px-2 border text-xs rounded-full bg-gray-100">
                {profileData.experience}
              </span>
            </div>

            {/* About */}
            <div className="mt-4">
              <p className="flex items-center gap-1 text-sm font-medium text-neutral-800">About:</p>
              <p className="text-sm text-gray-600 max-w-[700px] mt-1">{profileData.about}</p>
            </div>

            {/* Editable Fields */}
            {isEdit ? (
              <>
                <div className="mt-4">
                  <label className="text-gray-600 font-medium block mb-1">Appointment Fee</label>
                  <input 
                    type="number" 
                    className="w-full max-w-[200px] p-2 border rounded-lg"
                    value={profileData.fees || ''}
                    onChange={(e) => setProfileData(prev => ({
                      ...prev, 
                      fees: Number(e.target.value) || 0
                    }))}
                  />
                </div>

                <div className="mt-4">
                  <label className="text-gray-600 font-medium block mb-1">Address</label>
                  <input 
                    type="text" 
                    className="w-full p-2 border rounded-lg mb-2"
                    placeholder="Line 1"
                    value={profileData.address?.line1 || ''}
                    onChange={(e) => setProfileData(prev => ({
                      ...prev, 
                      address: {...(prev.address || {}), line1: e.target.value}
                    }))}
                  />
                  <input 
                    type="text" 
                    className="w-full p-2 border rounded-lg"
                    placeholder="Line 2"
                    value={profileData.address?.line2 || ''}
                    onChange={(e) => setProfileData(prev => ({
                      ...prev, 
                      address: {...(prev.address || {}), line2: e.target.value}
                    }))}
                  />
                </div>

                <div className="flex items-center gap-2 mt-4 p-3 bg-gray-50 rounded-lg">
                  <input 
                    type="checkbox"
                    id="available"
                    className="w-4 h-4"
                    checked={!!profileData.available}
                    onChange={(e) => setProfileData(prev => ({
                      ...prev, 
                      available: e.target.checked
                    }))}
                  />
                  <label htmlFor="available" className="text-sm font-medium">
                    Available for bookings
                  </label>
                </div>

                <div className="flex gap-3 mt-6">
                  <button 
                    onClick={handleSave}
                    className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
                  >
                    Save Changes
                  </button>
                  <button 
                    onClick={() => setIsEdit(false)}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* View Mode */}
                <p className="text-gray-600 font-medium mt-4">
                  Appointment fee:{' '}
                  <span className="text-gray-800 font-bold text-xl">
                    {currency}{profileData.fees}
                  </span>
                </p>

                <div className="flex gap-2 py-4">
                  <p className="font-medium text-gray-700">Address:</p>
                  <p className="text-sm text-gray-600">
                    {profileData.address?.line1}
                    {profileData.address?.line2 && `, ${profileData.address.line2}`}
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input 
                    type="checkbox" 
                    id="available" 
                    checked={!!profileData.available}
                    className="w-4 h-4"
                    readOnly 
                  />
                  <label htmlFor="available" className="text-sm font-medium">
                    {profileData.available ? 'Available' : 'Not Available'}
                  </label>
                </div>

                <button 
                  onClick={() => setIsEdit(true)}
                  className="px-6 py-2 border border-primary text-primary text-sm rounded-full mt-6 hover:bg-primary hover:text-white transition-all"
                >
                  Edit Profile
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorProfile;
