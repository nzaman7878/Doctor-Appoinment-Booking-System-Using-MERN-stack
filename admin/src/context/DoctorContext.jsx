import { createContext, useState } from "react";

export const DoctorContext = createContext();

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const DoctorContextProvider = (props) => {

  const [dToken, setDToken] = useState(
    localStorage.getItem("dToken") || ""
  );


  const value = {
    dToken,
    setDToken,
    backendUrl,
  };

  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
