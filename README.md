<div align="center">
  <img src="https://cdn-icons-png.flaticon.com/512/3063/3063057.png" alt="Logo" width="80" height="80">

  <h3 align="center">🩺 Doctor Appointment Booking System</h3>

  <p align="center">
    A comprehensive, production-ready MERN-stack web application designed to streamline healthcare scheduling.
    <br />
    <a href="#-project-overview"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="#-installation--setup">View Demo</a>
    ·
    <a href="#-api-documentation">Report Bug</a>
    ·
    <a href="#-installation--setup">Request Feature</a>
  </p>
</div>

<!-- BADGES -->
<div align="center">
  <img src="https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Tailwind_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Razorpay-02042B?style=for-the-badge&logo=razorpay&logoColor=3395FF" alt="Razorpay" />
</div>

---

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#-project-overview">Project Overview</a></li>
    <li><a href="#-key-features">Key Features</a></li>
    <li><a href="#-technology-stack">Technology Stack</a></li>
    <li><a href="#-system-architecture">System Architecture</a></li>
    <li><a href="#-data-flow-sequence">Data Flow Sequence</a></li>
    <li><a href="#-project-structure">Project Structure</a></li>
    <li><a href="#-database-schema">Database Schema</a></li>
    <li><a href="#-api-documentation">API Documentation</a></li>
    <li><a href="#-installation--setup">Installation & Setup</a></li>
    <li><a href="#-environment-variables">Environment Variables</a></li>
    <li><a href="#-deployment-workflow">Deployment Workflow</a></li>
    <li><a href="#-contributing">Contributing</a></li>
    <li><a href="#-license">License</a></li>
  </ol>
</details>

---

## 📖 Project Overview
The **Doctor Appointment Booking System** is an enterprise-grade healthcare scheduling platform built using the modern MERN stack. It offers three distinct, secure portals:
1. **Patient Portal (Frontend)**: For patients to discover doctors, book appointments, and pay online.
2. **Doctor Portal (Admin/Staff)**: For healthcare professionals to manage their availability and upcoming appointments.
3. **Administrator Portal (Admin)**: For hospital administrators to manage personnel, view system-wide analytics, and update site configurations.

## ✨ Key Features
- **Role-Based Access Control (RBAC)**: Secure, distinct portals for Admins, Doctors, and Users utilizing JWT.
- **Dynamic Scheduling**: Real-time availability tracking (`slots_booked` matrix) preventing double-booking.
- **Payment Gateway Integration**: Secure online consultation fee processing via **Razorpay**.
- **Media Management**: Optimized profile picture and document uploads handled natively by **Cloudinary**.
- **Responsive UI/UX**: State-of-the-art interface built with **Tailwind CSS v4** and animated using **Framer Motion**.
- **Automated Notifications**: NodeMailer integration for sending status updates to patients and doctors.

---

## 🛠 Technology Stack

### Frontend (Patient Panel & Admin/Doctor Panel)
| Category | Technology |
| :--- | :--- |
| **Framework** | React.js (v19) via Vite |
| **Styling** | Tailwind CSS v4, Framer Motion |
| **Routing** | React Router v7 |
| **State/API** | Axios, Context API |
| **Alerts/Icons**| React Toastify, Lucide React |

### Backend (REST API)
| Category | Technology |
| :--- | :--- |
| **Runtime / Core** | Node.js, Express.js |
| **Database** | MongoDB, Mongoose ODM |
| **Security** | JWT, Bcryptjs, Helmet, Express-Rate-Limit, CORS |
| **File Storage** | Cloudinary, Multer (Middleware) |
| **Services** | Razorpay (Payments), Nodemailer (Emails) |

---

## 🏗 System Architecture

### High-Level Design (HLD)
```mermaid
graph TD
    Client_Patient[Patient Frontend UI] -->|HTTPS/REST| API_Gateway[Express Backend API]
    Client_Admin[Admin/Doctor UI] -->|HTTPS/REST| API_Gateway
    
    subgraph Backend Infrastructure
    API_Gateway --> AuthMiddleware{JWT Verification}
    AuthMiddleware --> Controllers[Logic Controllers]
    Controllers -->|Mongoose| Database[(MongoDB Atlas)]
    end
    
    subgraph Third-Party Integrations
    Controllers -->|Media Uploads| Cloudinary[Cloudinary CDN]
    Controllers -->|Transactions| Razorpay[Razorpay Gateway]
    Controllers -->|SMTP| Nodemailer[Email Server]
    end
```

### 🔄 Data Flow Sequence: Booking an Appointment
```mermaid
sequenceDiagram
    actor Patient
    participant Frontend
    participant Backend
    participant MongoDB
    participant Razorpay

    Patient->>Frontend: Selects Doctor & Time Slot
    Frontend->>Backend: POST /api/user/book-appointment (Token)
    Backend->>MongoDB: Check Slot Availability
    alt Slot Available
        MongoDB-->>Backend: Confirmed
        Backend->>Razorpay: Initialize Order (Amount)
        Razorpay-->>Backend: Order ID
        Backend->>MongoDB: Create Appointment (Status: Pending)
        Backend-->>Frontend: Success + Razorpay Checkout Details
        Patient->>Razorpay: Completes Payment
        Razorpay->>Backend: Webhook / Verification
        Backend->>MongoDB: Update Appointment (Status: Paid)
        Backend-->>Frontend: Booking Confirmed
    else Slot Unavailable
        MongoDB-->>Backend: Error: Slot Booked
        Backend-->>Frontend: Error Response
    end
```

---

## 🗂 Project Structure
A modular, scalable monorepo-style structure separates the patient client, staff client, and server logic.

```text
Doctor-Appointment-System/
├── admin/                     # 🛡️ React Application for Admins & Doctors
│   ├── src/
│   │   ├── context/           # AppContext, AdminContext, DoctorContext
│   │   ├── pages/Admin/       # Admin views (AddDoctor, Dashboard, etc.)
│   │   └── pages/Doctor/      # Doctor views (DoctorDashboard, etc.)
├── backend/                   # ⚙️ Express.js REST API
│   ├── config/                # MongoDB, Cloudinary, Razorpay init
│   ├── controllers/           # adminController, userController, etc.
│   ├── middlewares/           # authUser, authAdmin, authDoctor, multer
│   ├── models/                # User, Doctor, Appointment schemas
│   └── routes/                # Express router endpoints
└── frontend/                  # 🧑‍⚕️ React Application for Patients
    ├── src/
    │   ├── components/        # Reusable UI components (Navbar, Banner)
    │   ├── context/           # Global state
    │   └── pages/             # Route pages (Home, Doctors, Profile, etc.)
```

---

## 🗃 Database Schema

| Collection | Description | Key Fields |
| :--- | :--- | :--- |
| **`Users`** | Patient profiles | `name`, `email`, `password`, `image`, `address`, `dob` |
| **`Doctors`** | Medical professionals | `name`, `email`, `speciality`, `degree`, `fees`, `slots_booked`, `available` |
| **`Appointments`** | Booking ledgers | `userId`, `docId`, `slotDate`, `slotTime`, `amount`, `payment`, `status` |
| **`SiteSettings`** | Global configurations | `currency`, `hospitalName`, `contactInfo` |

---

## 🔌 API Documentation
*Note: All endpoints require appropriate JWT Bearer tokens.*

### 👨‍💼 Admin Routes (`/api/admin`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/add-doctor` | Add a new doctor (Requires `authAdmin` + `multer` form-data) |
| `POST` | `/login` | Authenticate administrator |
| `GET`  | `/appointments` | Fetch all system appointments |
| `GET`  | `/dashboard` | Fetch KPI data (users, docs, total earnings) |

### 🩺 Doctor Routes (`/api/doctor`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/login` | Authenticate doctor |
| `GET`  | `/appointments` | Get appointments assigned to the logged-in doctor |
| `POST` | `/update-profile` | Update personal details & availability |

### 🧑‍⚕️ User Routes (`/api/user`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/register` | Create a new patient account |
| `POST` | `/login` | Authenticate user |
| `POST` | `/book-appointment`| Book a doctor's slot & initialize Razorpay |
| `GET`  | `/appointments` | Fetch user's booking history |

---

## ⚙️ Installation & Setup

### Prerequisites
- Node.js (v18.x or higher)
- MongoDB (Atlas URI or Local Instance)
- Cloudinary Account (API Key & Secret)
- Razorpay Account (Key ID & Secret)

### 1. Clone the repository
```bash
git clone https://github.com/your-username/Doctor-Appointment-Booking-System.git
cd Doctor-Appointment-Booking-System
```

### 2. Setup Backend Server
```bash
cd backend
npm install
npm run dev
```

### 3. Setup Frontend (Patient App)
Open a new terminal window:
```bash
cd frontend
npm install
npm run dev
```

### 4. Setup Admin/Doctor Panel
Open a third terminal window:
```bash
cd admin
npm install
npm run dev
```

---

## 🔐 Environment Variables
Create a `.env` file in your `backend` directory and add the following configurations:

| Variable | Description | Example / Note |
| :--- | :--- | :--- |
| `PORT` | API Server Port | `4000` |
| `MONGODB_URI` | Connection string | `mongodb+srv://user:pass@cluster...` |
| `JWT_SECRET` | Token signature key | `your_super_secret_key` |
| `ADMIN_EMAIL` | Super admin email | `admin@hospital.com` |
| `ADMIN_PASSWORD` | Super admin password | `securepass123` |
| `CLOUDINARY_NAME` | Cloudinary cloud name | `dyxxxxx` |
| `CLOUDINARY_API_KEY`| Cloudinary key | `1234567890` |
| `CLOUDINARY_SECRET_KEY`| Cloudinary secret | `_abcxyz123...` |
| `RAZORPAY_KEY_ID` | Razorpay pub key | `rzp_test_123...` |
| `RAZORPAY_KEY_SECRET`| Razorpay secret | `abcxyz...` |
| `FRONTEND_URL` | CORS Allowed Origin | `http://localhost:5173` |
| `ADMIN_URL` | CORS Allowed Origin | `http://localhost:5174` |

---

## 🚀 Deployment Workflow

For production, follow these steps:
1. **Backend Deployment**: Host the Node.js server on **Render**, **Railway**, or **AWS EC2**. Ensure you add the production URLs of your frontends to the `allowedOrigins` array in `server.js` (or via `.env`).
2. **Frontend Deployment**: Host the `frontend` and `admin` React apps separately on **Vercel** or **Netlify**.
3. **Build Commands**: Ensure you set the Root Directory correctly in Vercel for both apps, and use `npm run build`. 
4. Add the deployed Backend URL to your frontend's environment variable (e.g., `VITE_BACKEND_URL`).

---

## 🤝 Contributing
Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📜 License
Distributed under the MIT License. See `LICENSE` for more information.

---
<p align="center">
  <i>Developed with ❤️ by <a href="https://github.com/your-username">NURUZZAMAN</a></i>
</p>
