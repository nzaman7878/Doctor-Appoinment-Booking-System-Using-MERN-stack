import { useContext } from "react";
import Login from "./pages/Login"
import { ToastContainer, toast } from 'react-toastify';
import { AdminContext } from "./context/AdminContext";
import { DoctorContext } from "./context/DoctorContext";
import { AppContext } from "./context/AppContext";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Admin/Dashboard";
import AllAppointments from "./pages/Admin/AllAppointments";
import DoctorList from "./pages/Admin/DoctorList";
import AddDoctor from "./pages/Admin/AddDoctor";
import DoctorDashboard from "./pages/Doctor/DoctorDashboard"
import DoctorAppointments from "./pages/Doctor/DoctorAppointments";
import DoctorProfile from "./pages/Doctor/DoctorProfile";

function App() {

  const {aToken} = useContext(AdminContext)
  const { dToken } = useContext(DoctorContext)
  const { theme } = useContext(AppContext)

  return aToken || dToken ? (
    <div className={`min-h-screen relative transition-colors duration-300 ${theme === 'dark' ? 'bg-slate-900 text-slate-200' : 'bg-slate-50 text-slate-800'}`}>
      {/* Decorative background blobs */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px] pointer-events-none"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-secondary/10 blur-[120px] pointer-events-none"></div>

      <ToastContainer theme={theme} />
      <Navbar />
      <div className="flex items-start">
        <Sidebar />
        <div className="flex-1 max-h-[calc(100vh-80px)] overflow-y-auto">
          <Routes>
            {/* Admin Route */}
            <Route path="/" element={<Dashboard/>} />
            <Route path="/admin-dashboard" element={<Dashboard/>} />
            <Route path="/all-appointments" element={<AllAppointments/>} />
            <Route path="/add-doctor" element={<AddDoctor/>} />
            <Route path="/doctor-list" element={<DoctorList/>} />

            {/* Doctor Route */}
            <Route path="/doctor-dashboard" element={<DoctorDashboard/>} />
            <Route path="/doctor-appointments" element={<DoctorAppointments/>} />
            <Route path="/doctor-profile" element={<DoctorProfile/>} />
          </Routes>
        </div>
      </div>
    </div>
  ) : (
    <div className={`min-h-screen relative transition-colors duration-300 ${theme === 'dark' ? 'bg-slate-900 text-slate-200' : 'bg-slate-50 text-slate-800'}`}>
      <Login />
      <ToastContainer theme={theme} />
    </div>
  )
}

export default App
