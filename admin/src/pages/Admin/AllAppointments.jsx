import { useContext, useEffect } from "react"
import { AdminContext } from "../../context/AdminContext"
import { assets } from "../../assets/assets"
import { AppContext } from "../../context/AppContext"

const AllAppointments = () => {
  const { aToken, appointments, getAllAppointments, cancelAppointment, currency } = useContext(AdminContext)
  const {calculateAge , slotDateFormat} = useContext(AppContext)
  useEffect(() => {
    if (aToken) {
      getAllAppointments()
    }
  }, [aToken])

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Appointments</p>
      
      <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll">
        {/* Header */}
        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        {/* Appointment Rows */}
        {appointments.reverse().map((item, index) => (
          <div 
            className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50"
            key={index}
          >
            <p className="max-sm:hidden">{index + 1}</p>
            
            {/* Patient Info */}
            <div className="flex items-center gap-2">
              <img 
                className="w-8 rounded-full" 
                src={item.userData.image} 
                alt={item.userData.name} 
              />
              <p>{item.userData.name}</p>
            </div>

            {/* Age */}
            <p className="max-sm:hidden">{calculateAge(item.userData.dob)}</p>

            {/* Date & Time */}
            <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>

            {/* Doctor Info */}
            <div className="flex items-center gap-2">
              <img 
                className="w-8 rounded-full bg-gray-200" 
                src={item.docData.image} 
                alt={item.docData.name} 
              />
              <p>{item.docData.name}</p>
            </div>

            {/* Fees */}
            <p>{currency}{item.amount}</p>

            {/* Action */}
            {item.cancelled ? (
              <p className="text-red-400 text-xs font-medium">Cancelled</p>
            ) : item.isCompleted ? (
              <p className="text-green-500 text-xs font-medium">Completed</p>
            ) : (
              <img 
                onClick={() => cancelAppointment(item._id)} 
                className="w-10 cursor-pointer" 
                src={assets.cancel_icon} 
                alt="Cancel" 
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}



export default AllAppointments
