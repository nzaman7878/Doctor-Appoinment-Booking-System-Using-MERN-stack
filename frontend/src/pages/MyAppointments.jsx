import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const MyAppointments = () => {
  const { backendUrl, token } = useContext(AppContext)
  const [appointments, setAppointment] = useState([])


  const months = [" ", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]


  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_")
    return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
  }

  const getUserAppointments = async () => {
    try {
 
      const { data } = await axios.get(
        backendUrl + '/api/user/appointments',
        {headers: {token}}
      )

      if (data.success) {
        setAppointment(data.appointments.reverse())
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (token) {
      getUserAppointments()
    }
  }, [token])

  return (
    <div className="mt-12">
      <h2 className="pb-3 text-lg font-semibold text-gray-800 border-b">
        My Appointments
      </h2>

      <div className="mt-4">
        {appointments.length > 0 ? (
          appointments.slice(0, 20).map((item, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-4 border-b"
            >
              {/* Doctor Image */}
              <div className="flex-shrink-0 w-28 h-28 rounded-lg overflow-hidden bg-gray-100 shadow-sm">
                <img
                  src={item.docData?.image}
                  alt={item.docData?.name}
                  className="object-cover w-full h-full"
                />
              </div>

              {/* Doctor Details */}
              <div className="flex-1 text-sm text-gray-600">
                <p className="text-base font-semibold text-gray-800">
                  {item.docData?.name}
                </p>
                <p className="text-gray-500">{item.docData?.speciality}</p>

                <div className="mt-2 space-y-1">
                  <p className="font-medium text-gray-700">Address:</p>
                  <p className="text-xs">{item.docData?.address?.line1}</p>
                  <p className="text-xs">{item.docData?.address?.line2}</p>
                </div>

                <p className="mt-2 text-xs text-gray-700">
                  <span className="font-medium">Date & Time:</span>{" "}
                  {slotDateFormat(item.slotDate)} | {item.slotTime}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2 w-full sm:w-48">
                <button className="text-sm font-medium text-gray-700 border border-gray-300 rounded-lg py-2 px-4 transition-all duration-300 hover:bg-indigo-600 hover:text-white hover:border-indigo-600">
                  Pay Online
                </button>
                <button className="text-sm font-medium text-gray-700 border border-gray-300 rounded-lg py-2 px-4 transition-all duration-300 hover:bg-red-600 hover:text-white hover:border-red-600">
                  Cancel Appointment
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 py-6 text-sm">
            No appointments booked yet.
          </p>
        )}
      </div>
    </div>
  )
}

export default MyAppointments
