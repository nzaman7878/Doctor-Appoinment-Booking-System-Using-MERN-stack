import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appoointmentModel.js"

const changeAvailability = async (req, res) => {
  try {
    const { docId } = req.body;

    const doc = await doctorModel.findById(docId);

    if (!doc) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });
    }

    doc.available = !doc.available;
    await doc.save();

    res.json({
      success: true,
      message: "Availability Updated",
      available: doc.available,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const doctorList = async (req, res) => {
  try {
    const doctors = await doctorModel.find().select("-password -email");
    
    res.json({
      success: true,
      doctors
    });
    
  } catch (error) {
    console.error(error); 
    res.status(500).json({ 
      success: false,
      message: error.message
    });
  }
};

// API for doctor login
const loginDoctor = async (req, res) => {  
  try {
    const { email, password } = req.body;
    
   
    if (!email || !password) {
      return res.status(400).json({
        success: false, 
        message: "Email and password are required"
      });
    }

    const doctor = await doctorModel.findOne({ email });

    if (!doctor) {
      return res.status(401).json({
        success: false, 
        message: "Invalid credentials"
      });
    }
    
    // ✅ Compare password
    const isMatch = await bcrypt.compare(password, doctor.password);

    if (isMatch) {
      const token = jwt.sign(
        { id: doctor._id }, 
        process.env.JWT_SECRET,
        { expiresIn: '7d' }  
      );
      
      return res.status(200).json({
        success: true, 
        token
      });
    } else {
      return res.status(401).json({
        success: false, 
        message: "Invalid credentials"
      });
    }

  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({
      success: false,
      message: "Server error, please try again later"
    });
  }
};

// API to get doctor appointments for doctor panel
const appointmentsDoctor = async (req, res) => {  
  try {
    const { docId } = req; 
    
    if (!docId) {
      return res.status(400).json({
        success: false,
        message: "Doctor ID is required"
      });
    }

    const appointments = await appointmentModel.find({ docId });

    res.json({ success: true, appointments });
    
  } catch (error) {
    console.error(error); 
    res.status(500).json({ 
      success: false,
      message: error.message
    });
  }
};

// API to mark appointment completed for doctor panel

const appointmentComplete = async (req, res) => {
  try {
    const { docId } = req;  
    const { appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);

    if (!appointmentData) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    if (appointmentData.docId.toString() !== docId.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized: You can only complete your own appointments'
      });
    }

    
    await appointmentModel.findByIdAndUpdate(appointmentId, {
      isCompleted: true,
      payment: true 
    });

    return res.json({
      success: true, 
      message: 'Appointment Completed'
    });

  } catch (error) {
    console.error(error); 
    res.status(500).json({ 
      success: false,
      message: error.message
    });
  }
};


// API to appointment cancel for doctor panel

const appointmentCancel = async (req, res)=> {

  try {

    const { docId } = req;  
    const { appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId)

    if(appointmentData && appointmentData.docId === docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {cancelled: true})
      return res.json({success:true, message: 'Appointment Cancelled'})
    } else {
      return res.json({success:false, message: 'Cancllation Failed'})
    }


    
  }  catch (error) {
    console.error(error); 
    res.status(500).json({ 
      success: false,
      message: error.message
    });
  }

}


// API to get dashboard data for the doctor panel

const doctorDashboard = async (req, res) => { 
  try {
    const { docId } = req;  

    if (!docId) {
      return res.status(400).json({
        success: false,
        message: 'Doctor ID is required'
      });
    }

    const appointments = await appointmentModel.find({ docId });

   
    let earnings = 0;
    appointments.forEach((item) => {
    
      if (item.isCompleted && item.payment) {
        earnings += item.amount;
      }
    });

   
    const uniquePatients = new Set();
    appointments.forEach((item) => {
      uniquePatients.add(item.userId.toString());
    });

    const dashData = {
      earnings,
      appointments: appointments.length,
      patients: uniquePatients.size,
      latestAppointments: [...appointments].reverse().slice(0, 5)  
    };

    res.json({ success: true, dashData });
    
  } catch (error) {
    console.error(error); 
    res.status(500).json({ 
      success: false,
      message: error.message
    });
  }
};


// API to get doctor profile for doctor panel

const doctorProfile = async (req, res) => {
  try {
    
    const docId = req.docId;

    if (!docId) {
      return res.status(400).json({
        success: false,
        message: 'Doctor ID is required',
      });
    }

    const profileData = await doctorModel
      .findById(docId)
      .select('-password');  // hide password

    if (!profileData) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found',
      });
    }

    res.json({ success: true, profileData });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// API to update doctor profile data from doctor panel 
const updateDoctorProfile = async (req, res) => {
  try {
    const docId = req.docId; 
    const { fees, address, available } = req.body;

    if (!docId) {
      return res.status(400).json({
        success: false,
        message: 'Doctor ID is required',
      });
    }

    
    const updateData = {};
    if (fees !== undefined) updateData.fees = fees;
    if (address !== undefined) updateData.address = address;
    if (available !== undefined) updateData.available = available;

    const updatedDoctor = await doctorModel.findByIdAndUpdate(
      docId,
      updateData,
      { new: true }  
    ).select('-password');

    if (!updatedDoctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found',
      });
    }

    res.json({
      success: true,
      message: 'Profile Updated',
      profileData: updatedDoctor,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export { changeAvailability,
   doctorList, 
   loginDoctor ,
   appointmentsDoctor ,
   appointmentComplete,
   appointmentCancel,
   doctorDashboard,
   doctorProfile,
   updateDoctorProfile};
