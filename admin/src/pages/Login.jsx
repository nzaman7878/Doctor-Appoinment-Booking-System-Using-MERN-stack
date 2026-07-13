import { useState,useContext } from 'react'
import {assets} from '../assets/assets.js'
import { AdminContext } from '../context/AdminContext.jsx'
import axios  from 'axios'
import { toast } from 'react-toastify'
import { DoctorContext } from '../context/DoctorContext.jsx'
import { motion } from 'framer-motion'

const Login = () => {
    const [state,setState] = useState('Admin')

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const {setAToken, backendUrl} = useContext(AdminContext)
    const {setDToken} = useContext(DoctorContext)
    

    const onSubmitHandler = async (event) => {
        event.preventDefault()

        try {
            
            if(state === 'Admin'){
                const {data} = await axios.post(backendUrl + '/api/admin/login',{email,password})
                if (data.success){
                    localStorage.setItem('aToken', data.token)
                    setAToken(data.token)

                } else {
                    toast.error(data.message)
                }
            } else {
                const {data} = await axios.post(backendUrl + '/api/doctor/login',{email,password})
                if(data.success){
                    localStorage.setItem('dToken',data.token)
                    setDToken(data.token)
                    console.log(data.token)
                }
                else {
                    toast.error(data.message)
                }
            }
        } catch (error) {
            
        }
    }

  return (
    <div className="min-h-screen flex items-center justify-center relative">
      <motion.form 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        onSubmit={onSubmitHandler} 
        className="flex flex-col gap-5 items-start p-8 min-w-[340px] sm:min-w-96 premium-card rounded-2xl w-full sm:w-auto z-10"
      >
        <div className="w-full mb-2">
          <p className="text-3xl font-medium text-[var(--text-main)]">
            <span className='text-[var(--color-primary)]'> {state} </span> Login
          </p>
          <p className="text-sm mt-2 text-[var(--text-muted)]">
            Securely access the dashboard
          </p>
        </div>

        <div className="w-full group">
          <p className="text-sm font-medium mb-1 text-[var(--text-main)]">Email</p>
          <input
            className="border border-[var(--border-color)] bg-white dark:bg-[#2A2D2D] text-[var(--text-main)] rounded-xl w-full p-3 outline-none focus:border-[var(--color-primary-light)] transition-all"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>

        <div className="w-full group">
          <p className="text-sm font-medium mb-1 text-[var(--text-main)]">Password</p>
          <input
            className="border border-[var(--border-color)] bg-white dark:bg-[#2A2D2D] text-[var(--text-main)] rounded-xl w-full p-3 outline-none focus:border-[var(--color-primary-light)] transition-all"
            type="password"
            onChange={(e) => setPassword(e.target.value)}  
            value={password}  
            required
          />
        </div>
        
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit" 
          className="bg-[var(--color-primary)] text-white w-full py-3 rounded-xl text-base font-medium shadow-sm hover:bg-[var(--color-primary-light)] border border-[var(--color-primary)] transition-all mt-2"
        >
          Login
        </motion.button>

        {state === "Admin" ? (
          <p className="text-sm text-[var(--text-muted)] text-center w-full mt-2">
            Doctor Login?{" "}
            <span
              onClick={() => setState("Doctor")}
              className="text-[var(--color-primary)] font-medium hover:underline cursor-pointer"
            >
              Click here
            </span>
          </p>
        ) : (
          <p className="text-sm text-[var(--text-muted)] text-center w-full mt-2">
            Admin Login?{" "}
            <span
              onClick={() => setState("Admin")}
              className="text-[var(--color-primary)] font-medium hover:underline cursor-pointer"
            >
              Click here
            </span>
          </p>
        )}
      </motion.form>
    </div>
  )
}

export default Login