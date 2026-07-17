import express from "express";
import rateLimit from "express-rate-limit";
import { addDoctor,loginAdmin , allDoctors ,appointmentsAdmin, appointmentCancel, adminDashboard, deleteDoctor, deleteAppointment, updateAppointment} from "../controllers/adminController.js";
import upload from '../middlewares/multer.js'
import authAdmin from '../middlewares/authAdmin.js'
import { changeAvailability } from "../controllers/doctorController.js";
import { uploadSettingImage } from "../controllers/siteController.js";
const adminRouter = express.Router()

// Rate limiter for admin login route
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 login requests per windowMs
  message: { success: false, message: "Too many login attempts, please try again after 15 minutes." }
});

adminRouter.post('/add-doctor',authAdmin, upload.single('image'),addDoctor)
adminRouter.post('/login', authLimiter, loginAdmin)
adminRouter.post('/all-doctors',authAdmin, allDoctors)
adminRouter.post('/change-availability',authAdmin, changeAvailability)
adminRouter.get('/appointments',authAdmin, appointmentsAdmin)
adminRouter.post('/cancel-appointment',authAdmin, appointmentCancel)
adminRouter.get('/dashboard',authAdmin, adminDashboard)
adminRouter.post('/delete-doctor', authAdmin, deleteDoctor)
adminRouter.post('/delete-appointment', authAdmin, deleteAppointment)
adminRouter.post('/update-appointment', authAdmin, updateAppointment)
adminRouter.post('/upload-setting-image', authAdmin, upload.single('image'), uploadSettingImage)

export default adminRouter