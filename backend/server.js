import express from "express"
import cors from 'cors'
import helmet from 'helmet'
import 'dotenv/config'
import connectDB from "./config/mongodb.js"
import connectCloudinary from "./config/cloudinary.js"
import adminRouter from "./routes/adminRoute.js"
import doctorRouter from "./routes/doctorRoute.js"
import userRouter from "./routes/userRoute.js"
import siteRouter from "./routes/siteRoute.js"

const app = express()
const port = process.env.PORT || 4000



connectDB()
connectCloudinary()

// middlewares
app.use(helmet()) // Security headers
app.use(express.json())

// Configure CORS for specific origins (Frontend and Admin URLs)
const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:5173',
  process.env.ADMIN_URL || 'http://localhost:5174'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}))

// api endpoints
app.use('/api/admin', adminRouter)
app.use('/api/doctor/', doctorRouter)
app.use('/api/user', userRouter)
app.use('/api/site', siteRouter)

app.get('/',(req,res)=>{
    res.send('API WORKING')
})

// Global Error Handler Middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  })
})

app.listen(port, ()=> console.log("Server Started on port", port))

