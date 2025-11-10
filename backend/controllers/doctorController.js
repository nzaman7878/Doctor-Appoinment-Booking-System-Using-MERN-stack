import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

export { changeAvailability, doctorList, loginDoctor };
