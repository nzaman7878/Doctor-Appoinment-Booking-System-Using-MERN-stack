import bcrypt from "bcryptjs";
import Doctor from "../models/doctorModel.js";
import { v2 as cloudinary } from "cloudinary";

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

export { addDoctor };
