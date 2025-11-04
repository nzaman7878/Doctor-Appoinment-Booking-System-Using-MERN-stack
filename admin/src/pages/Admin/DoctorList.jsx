import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

const DoctorList = () => {
  const { doctors, aToken, getAllDoctors, changeAvailability } =
    useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken, getAllDoctors]);

  return (
    <div className="m-5 max-h-[90vh] overflow-y-scroll">
      <h1 className="text-lg font-medium">All Doctors</h1>
      <div className="w-full flex flex-wrap gap-4 pt-5 gap-y-6">
        {doctors.length > 0 ? (
          doctors.map((item) => (
            <div
              className="border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
              key={item._id}
            >
              <img
                className="bg-indigo-50 hover:bg-primary transition-all duration-500"
                src={item.image}
                alt={item.name}
              />
              <div className="p-4">
                <p className="text-neutral-800 text-lg font-medium">
                  {item.name}
                </p>
                <p className="text-zinc-600 text-sm">{item.speciality}</p>
                <div className="mt-2 flex items-center gap-1 text-sm">
                  <input
                    type="checkbox"
                    checked={item.available}
                    onChange={(e) =>
                      changeAvailability(item._id, e.target.checked)
                    }
                    className="cursor-pointer"
                  />
                  <p>Available</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No doctors found</p>
        )}
      </div>
    </div>
  );
};

export default DoctorList;
