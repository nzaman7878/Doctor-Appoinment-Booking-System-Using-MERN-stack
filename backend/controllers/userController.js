import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import {v2 as cloudinary} from 'cloudinary'
import appointmentModel from '../models/appoointmentModel.js'
import doctorModel from '../models/doctorModel.js'
import razorpay from 'razorpay'

// API to register user

const registerUser = async (req, res) => {
    try {
        
        const {name , email, password } = req.body

        if(!name || !password || !email) {

            return res.json({success:false, message:"Missing details"})

        }

        //Validating email

        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Enter a valid email"})
            
        } 
        //validating strong password

        if (password.length < 8){
            return res.json({success:false, messsage:"Enter a strong a password"})
            
        }

        // Hashing user password

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const userData = {
            name,
            email,
            password : hashedPassword
        }

        const newUser = new userModel(userData)
        const user = await newUser.save()

        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)

        res.json({success:true,token})

    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
        
    }
} 
//API for user login

const loginUser = async (req,res) => {
    try {
        const {email,password} = req.body
        const user = await userModel.findOne({email})

        if(!user) {
            res.json({success:false,message:'User does not exist'})
        }
        const isMatch = await bcrypt.compare(password,user.password)

        if(isMatch){
            const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)
            res.json({success:true,token})
        } else {
            res.json({success:false,message:"Invalid credentials"})
        }
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

// API to get user profile data

const getProfile = async (req, res) => {
    try {
        
        const { userId } = req
        const userData = await userModel.findById(userId).select('-password')
        res.json({ success: true, userData })
        
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//API to update profile

const updateProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const { name, phone, dob, gender, address } = req.body;
    const imageFile = req.file;

    if (!name || !phone || !dob || !gender) {
      return res.json({ success: false, message: "Data Missing" });
    }

   
    const updateData = {
      name,
      phone,
      dob,
      gender,

      address: typeof address === "string" ? JSON.parse(address) : address
    };

    // If the user uploaded image
    if (imageFile) {
      const upload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image"
      });
      updateData.image = upload.secure_url;
    }

    await userModel.findByIdAndUpdate(userId, { $set: updateData });

    res.json({ success: true, message: "Profile Updated" });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


// API to book appointment

const bookAppointment = async (req, res) => {
    try {
        const { docId, slotDate, slotTime } = req.body
        const userId = req.userId  
        
        // Validate required fields
        if (!userId || !docId || !slotDate || !slotTime) {
            return res.json({ success: false, message: 'Missing required fields' })
        }

        const docData = await doctorModel.findById(docId).select('-password')

        if (!docData) {
            return res.json({ success: false, message: 'Doctor not found' })
        }

        if (!docData.available) {
            return res.json({ success: false, message: 'Doctor not available' })
        }

        let slots_booked = docData.slots_booked

        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.json({ success: false, message: 'Slot not available' })
            } else {
                slots_booked[slotDate].push(slotTime)
            }
        } else {
            slots_booked[slotDate] = []
            slots_booked[slotDate].push(slotTime)
        }

        const userData = await userModel.findById(userId).select('-password')

        if (!userData) {
            return res.json({ success: false, message: 'User not found' })
        }

        delete docData.slots_booked

        const appointmentData = {
            userId,
            docId,
            userData,
            docData,
            amount: docData.fees,
            slotTime,
            slotDate,
            date: Date.now()
        }

        const newAppointment = new appointmentModel(appointmentData)
        await newAppointment.save()

        await doctorModel.findByIdAndUpdate(docId, { slots_booked })

        res.json({ success: true, message: 'Appointment Booked' })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// API to get user appointments for frontend my-appointment page
const listAppointment = async (req, res) => {
    try {
        const userId = req.userId  
        
        const appointments = await appointmentModel.find({userId})

        res.json({ success: true, appointments})
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// API to cancel apoointment

const cancelAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.body  
    const userId = req.userId  

    // Validate required fields
    if (!appointmentId || !userId) {
      return res.json({ success: false, message: "Missing required fields" })
    }

    const appointmentData = await appointmentModel.findById(appointmentId)

    // Check if appointment exists
    if (!appointmentData) {
      return res.json({ success: false, message: "Appointment not found" })
    }

    // Verify appointment belongs to user
    if (appointmentData.userId !== userId) {
      return res.json({ success: false, message: "Unauthorized action" })
    }

    // Check if appointment is already cancelled
    if (appointmentData.cancelled) {
      return res.json({ success: false, message: "Appointment already cancelled" })
    }

    // Cancel the appointment
    await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })

    // Release doctor slot
    const { docId, slotDate, slotTime } = appointmentData

    const doctorData = await doctorModel.findById(docId)

    if (!doctorData) {
      return res.json({ success: false, message: "Doctor not found" })
    }

    let slots_booked = doctorData.slots_booked

    if (slots_booked[slotDate]) {
      slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)
    }

    await doctorModel.findByIdAndUpdate(docId, { slots_booked })

    res.json({ success: true, message: "Appointment Cancelled" })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

const razorpayInstance = new razorpay({
  key_id:process.env.RAZORPAY_KEY_ID,
  key_secret:process.env.RAZORPAY_KEY_SECRET
})

// API to make payment of appointment using razorpay

const paymentRazorpay = async (req, res) => {
  try {
    const { appointmentId } = req.body
    const userId = req.userId 

    // Validate required fields
    if (!appointmentId) {
      return res.json({ success: false, message: "Appointment ID required" })
    }

    const appointmentData = await appointmentModel.findById(appointmentId)

    // Check if appointment exists
    if (!appointmentData) {
      return res.json({ success: false, message: "Appointment not found" })
    }

    // Check if appointment is cancelled
    if (appointmentData.cancelled) {
      return res.json({ success: false, message: "Appointment cancelled" })
    }

    // Verify appointment belongs to user
    if (appointmentData.userId !== userId) {
      return res.json({ success: false, message: "Unauthorized action" })
    }

    // Check if already paid
    if (appointmentData.payment) {
      return res.json({ success: false, message: "Already paid" })
    }

    // Creating options for razorpay payment
    const options = {
      amount: appointmentData.amount * 100,  
      currency: process.env.CURRENCY,
      receipt: appointmentId,
    }

    // Creation of an order
    const order = await razorpayInstance.orders.create(options)
    
    res.json({ success: true, order })

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// API to verify payment of razorpay

const verifyRazorpay = async (req, res) => {

  try {
    const {razorpay_order_id} = req.body
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
    
    if (orderInfo.status === 'paid'){
      await appointmentModel.findByIdAndUpdate(orderInfo.receipt,{payment:true})
      res.json({success:true, message:"Payment Successful"})

    } else {

      res.json({success: false, message:"Payment Failed"})

    }


  }  catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

  
export {registerUser, loginUser, getProfile, updateProfile , bookAppointment , listAppointment , cancelAppointment ,paymentRazorpay ,verifyRazorpay } 