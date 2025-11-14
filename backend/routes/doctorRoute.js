import express from "express";
import { doctorList, loginDoctor, appointmentsDoctor, appointmentComplete } from "../controllers/doctorController.js";
import authDoctor from "../middlewares/authDoctor.js";

const doctorRouter = express.Router();

doctorRouter.get('/list', doctorList);
doctorRouter.post('/login', loginDoctor);
doctorRouter.get('/appointments', authDoctor, appointmentsDoctor); 
doctorRouter.post('/complete-appointment', authDoctor, appointmentComplete); 



export default doctorRouter;
