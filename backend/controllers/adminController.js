import bcrypt from "bcryptjs";
import Doctor from "../models/doctorModel.js";
import { v2 as cloudinary } from "cloudinary";
import jwt from "jsonwebtoken"

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


export { addDoctor, loginAdmin, allDoctors };
