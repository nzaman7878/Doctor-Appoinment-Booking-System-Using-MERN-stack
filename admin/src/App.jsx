import { useContext } from "react";
import Login from "./pages/login"
import { ToastContainer, toast } from 'react-toastify';
import { AdminContext } from "./context/AdminContext";

function App() {

  const {aToken} = useContext(AdminContext)

  return aToken ? (
    <>
    
    <ToastContainer />
    </>
  ) : (
    <>
    <Login />
    <ToastContainer />
    </>
  )
}

export default App
