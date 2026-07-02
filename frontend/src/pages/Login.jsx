import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Login = () => {
  const { backendUrl, token, setToken } = useContext(AppContext);
  const navigate = useNavigate();

  const [state, setState] = useState("Sign Up");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (state === 'Sign Up') {
        const { data } = await axios.post(backendUrl + '/api/user/register', { name, password, email });
        if (data.success) {
          localStorage.setItem('token', data.token);
          setToken(data.token);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/user/login', { password, email });
        if (data.success) {
          localStorage.setItem('token', data.token);
          setToken(data.token);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center relative">
      {/* Decorative background blobs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-secondary/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

      <motion.form 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        onSubmit={onSubmitHandler} 
        className="flex flex-col gap-5 items-start p-8 min-w-[340px] sm:min-w-96 glass-panel dark:glass-panel-dark rounded-2xl text-slate-600 dark:text-slate-300 w-full sm:w-auto"
      >
        <div className="w-full mb-2">
          <p className="text-3xl font-bold text-slate-800 dark:text-slate-100">
            {state === "Sign Up" ? "Create Account" : "Login"}
          </p>
          <p className="text-sm mt-2 text-slate-500 dark:text-slate-400">
            Please {state === "Sign Up" ? "sign up" : "log in"} to book an appointment
          </p>
        </div>

        {state === "Sign Up" && (
          <div className="w-full group">
            <p className="text-sm font-medium mb-1">Full Name</p>
            <input
              className="border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 rounded-lg w-full p-2.5 outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all dark:text-white"
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          </div>
        )}

        <div className="w-full group">
          <p className="text-sm font-medium mb-1">Email</p>
          <input
            className="border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 rounded-lg w-full p-2.5 outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all dark:text-white"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>

        <div className="w-full group">
          <p className="text-sm font-medium mb-1">Password</p>
          <input
            className="border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 rounded-lg w-full p-2.5 outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all dark:text-white"
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
          className="premium-gradient-bg text-white w-full py-3 rounded-lg text-base font-medium shadow-md hover:shadow-lg transition-all mt-2"
        >
          {state === "Sign Up" ? "Create Account" : "Login"}
        </motion.button>

        {state === "Sign Up" ? (
          <p className="text-sm text-center w-full mt-2">
            Already have an account?{" "}
            <span
              onClick={() => setState("Login")}
              className="text-primary font-medium hover:underline cursor-pointer"
            >
              Login here
            </span>
          </p>
        ) : (
          <p className="text-sm text-center w-full mt-2">
            Create a new account?{" "}
            <span
              onClick={() => setState("Sign Up")}
              className="text-primary font-medium hover:underline cursor-pointer"
            >
              Click here
            </span>
          </p>
        )}
      </motion.form>
    </div>
  );
};

export default Login;
