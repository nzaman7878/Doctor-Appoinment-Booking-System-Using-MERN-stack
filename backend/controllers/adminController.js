import bcrypt from "bcryptjs";
import Doctor from "../models/doctorModel.js";
import { v2 as cloudinary } from "cloudinary";
import jwt from "jsonwebtoken"
import appointmentModel from '../models/appointmentModel.js'
import userModel from '../models/userModel.js'
import doctorModel from "../models/doctorModel.js";

// API for adding doctor
const addDoctor = async (req, res) => {
  try {
    const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
    const imageFile = req.file;

    // Validate required fields
    if (!name || !email || !password || !speciality || !degree || !experience || !fees || !address) {
      return res.status(400).json({ success: false, message: "Please fill all required fields" });
    }

    // Check if doctor already exists
    const existingDoctor = await Doctor.findOne({ email });
    if (existingDoctor) {
      return res.status(400).json({ success: false, message: "Doctor already exists with this email" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Upload image to Cloudinary
    let imageUrl = "";
    if (imageFile) {
      const uploadResult = await cloudinary.uploader.upload(imageFile.path, { 
        resource_type: "image",
      });
      imageUrl = uploadResult.secure_url;
    }

    // create and save doctor
    const newDoctor = new Doctor({
      name,
      email,
      image: imageUrl,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      address:JSON.parse(address),
      date:Date.now()
      
    });

    await newDoctor.save();

    // Send success response
    res.status(201).json({
      success: true,
      message: "Doctor added successfully",
      doctor: newDoctor,
    });

  } catch (error) {
    console.error(" Error adding doctor:", error);
    res.status(500).json({
      success: false,
      message: "Server error, please try again later",
    });
  }
};

// API for admin login

const loginAdmin = async (req, res)=> {

  try {
    
    const {email, password} = req.body

    if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
      const token = jwt.sign(email+password,process.env.JWT_SECRET)
      res.json({success:true,token})

    }
    else {
      res.json({success:false,message:"invalid credentials"})
    }

  } catch (error) {
    console.log(error)
    res.json({success:false,message:error.message})
    
  }
}

// API to get all the doctors list for admin panel
const allDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({}).select('-password')
    
    if (!doctors || doctors.length === 0) {
      return res.status(404).json({
        success: false, 
        message: 'No doctors found'
      })
    }
    
    res.status(200).json({
      success: true, 
      doctors,
      count: doctors.length
    })
    
  } catch (error) {
    console.error('Error fetching doctors:', error)
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch doctors'
    })
  }
}

// API to get all appointments list

const appointmentsAdmin = async (req, res)=> {

  try {
    
    const appointments = await appointmentModel.find({})
    res.json({success:true, appointments})

  } catch (error) {
    console.log(error)
    res.json({success:false, message:error.message})
    
  }
}

// API for appointment cancellation

const appointmentCancel = async (req, res) => {
  try {
    const { appointmentId } = req.body
    
    if (!appointmentId) {
      return res.status(400).json({ success: false, message: "Appointment ID required" })
    }
    
    const appointmentData = await appointmentModel.findById(appointmentId)
    
    if (!appointmentData) {
      return res.status(404).json({ success: false, message: "Appointment not found" })
    }

    if (appointmentData.cancelled) {
      return res.status(400).json({ success: false, message: "Appointment already cancelled" })
    }

    await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })

    const { docId, slotDate, slotTime } = appointmentData
    const doctorData = await Doctor.findById(docId) 

    if (!doctorData) {
      return res.status(404).json({ success: false, message: "Doctor not found" })
    }

    let slots_booked = doctorData.slots_booked

    if (slots_booked[slotDate]) {
      slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)
    }

    await Doctor.findByIdAndUpdate(docId, { slots_booked })

    return res.status(200).json({ success: true, message: "Appointment cancelled successfully" })
    
  } catch (error) {
    console.error(error)
    return res.status(500).json({ success: false, message: error.message })
  }
}

//API to get dashboard data for admin

const adminDashboard = async (req,res) => {

  try {
    const doctors = await doctorModel.find({})
    const users = await userModel.find({})
    const appointments = await appointmentModel.find({})

    const dashData = {
      doctors: doctors.length,
      appointments: appointments.length,
      patients: users.length,
      latestAppointments: appointments.reverse().slice(0,5)

    }

    res.json({success:true, dashData})
  
}  catch (error) {
    console.error(error)
    return res.status(500).json({ success: false, message: error.message })
  }

  
}
// API to delete an appointment completely
const deleteAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    if (!appointmentId) {
      return res.status(400).json({ success: false, message: "Appointment ID required" });
    }

    const appointmentData = await appointmentModel.findById(appointmentId);

    if (!appointmentData) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }

    // Free up doctor's slot if appointment is not cancelled or completed yet
    if (!appointmentData.cancelled && !appointmentData.isCompleted) {
      const { docId, slotDate, slotTime } = appointmentData;
      const doctorData = await Doctor.findById(docId);

      if (doctorData) {
        let slots_booked = doctorData.slots_booked;
        if (slots_booked[slotDate]) {
          slots_booked[slotDate] = slots_booked[slotDate].filter((e) => e !== slotTime);
          await Doctor.findByIdAndUpdate(docId, { slots_booked });
        }
      }
    }

    // Delete the appointment record
    await appointmentModel.findByIdAndDelete(appointmentId);

    return res.status(200).json({ success: true, message: "Appointment deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// API to delete a doctor completely
const deleteDoctor = async (req, res) => {
  try {
    const { docId } = req.body;

    if (!docId) {
      return res.status(400).json({ success: false, message: "Doctor ID required" });
    }

    const doctorData = await Doctor.findById(docId);

    if (!doctorData) {
      return res.status(404).json({ success: false, message: "Doctor not found" });
    }

    // Delete the doctor record
    await Doctor.findByIdAndDelete(docId);

    // Note: We might want to handle existing appointments for this doctor. 
    // Usually, we can either delete them or let them remain (but without doctor details). 
    // For now, we just delete the doctor.

    return res.status(200).json({ success: true, message: "Doctor deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// API to update an appointment
const updateAppointment = async (req, res) => {
  try {
    const { appointmentId, newDocId, newSlotDate, newSlotTime } = req.body;

    if (!appointmentId || !newDocId || !newSlotDate || !newSlotTime) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const appointmentData = await appointmentModel.findById(appointmentId);

    if (!appointmentData) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }

    if (appointmentData.cancelled || appointmentData.isCompleted) {
      return res.status(400).json({ success: false, message: "Cannot edit cancelled or completed appointments" });
    }

    // Check if new doctor exists
    const newDoctorData = await Doctor.findById(newDocId);
    if (!newDoctorData) {
      return res.status(404).json({ success: false, message: "New doctor not found" });
    }

    // Check if new slot is available (unless it's the same doctor and same slot)
    const isSameDoctorAndSlot = (appointmentData.docId.toString() === newDocId.toString()) && 
                                (appointmentData.slotDate === newSlotDate) && 
                                (appointmentData.slotTime === newSlotTime);

    if (!isSameDoctorAndSlot) {
      let new_slots_booked = newDoctorData.slots_booked || {};
      if (new_slots_booked[newSlotDate] && new_slots_booked[newSlotDate].includes(newSlotTime)) {
        return res.status(400).json({ success: false, message: "Selected slot is no longer available" });
      }

      // Free up old slot
      const oldDoctorData = await Doctor.findById(appointmentData.docId);
      if (oldDoctorData) {
        let old_slots_booked = oldDoctorData.slots_booked;
        if (old_slots_booked[appointmentData.slotDate]) {
          old_slots_booked[appointmentData.slotDate] = old_slots_booked[appointmentData.slotDate].filter((e) => e !== appointmentData.slotTime);
          await Doctor.findByIdAndUpdate(appointmentData.docId, { slots_booked: old_slots_booked });
        }
      }

      // Book new slot
      if (new_slots_booked[newSlotDate]) {
        new_slots_booked[newSlotDate].push(newSlotTime);
      } else {
        new_slots_booked[newSlotDate] = [newSlotTime];
      }
      await Doctor.findByIdAndUpdate(newDocId, { slots_booked: new_slots_booked });
    }

    // Prepare updated doctor info
    let docInfo = newDoctorData.toObject();
    delete docInfo.slots_booked;
    delete docInfo.password;

    // Update appointment record
    await appointmentModel.findByIdAndUpdate(appointmentId, {
      docId: newDocId,
      docData: docInfo,
      slotDate: newSlotDate,
      slotTime: newSlotTime,
      amount: newDoctorData.fees,
    });

    return res.status(200).json({ success: true, message: "Appointment updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export { addDoctor, loginAdmin, allDoctors, appointmentsAdmin, appointmentCancel, adminDashboard, deleteAppointment, deleteDoctor, updateAppointment };
