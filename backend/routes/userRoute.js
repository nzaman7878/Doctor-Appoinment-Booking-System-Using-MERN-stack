import express from "express";
import rateLimit from "express-rate-limit";
import { registerUser,loginUser, getProfile, updateProfile, bookAppointment , listAppointment , cancelAppointment , paymentRazorpay, verifyRazorpay} from "../controllers/userController.js";
import authUser from "../middlewares/authUser.js";
import upload from '../middlewares/multer.js'

const userRouter = express.Router()

// Rate limiter for authentication routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 login/register requests per windowMs
  message: { success: false, message: "Too many attempts, please try again after 15 minutes." }
});

userRouter.post('/register', authLimiter, registerUser)
userRouter.post('/login', authLimiter, loginUser)
userRouter.get('/get-profile',authUser, getProfile)
userRouter.post('/update-profile', authUser, upload.single('image'), updateProfile)
userRouter.post('/book-appointment',authUser,bookAppointment)
userRouter.get('/appointments', authUser, listAppointment) 
userRouter.post('/cancel-appointment',authUser,cancelAppointment)
userRouter.post('/payment-razorpay',authUser,paymentRazorpay)
userRouter.post('/verifyRazorpay', authUser, verifyRazorpay)


export default userRouter