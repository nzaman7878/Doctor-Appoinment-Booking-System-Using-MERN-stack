<div align="center">
  <img src="https://cdn-icons-png.flaticon.com/512/3063/3063057.png" alt="DocConnect Logo" width="80" height="80">

  <h1>🩺 DocConnect — Doctor Appointment Booking System</h1>

  <p>
    A full-stack, production-ready healthcare scheduling platform built with the <strong>MERN stack</strong>.<br />
    Three distinct portals — <strong>Patient</strong>, <strong>Doctor</strong>, and <strong>Admin</strong> — secured via <strong>JWT-based RBAC</strong>,<br />
    with integrated <strong>Razorpay payments</strong>, <strong>Cloudinary media management</strong>, and <strong>email notifications</strong>.
  </p>

  <br />

  <a href="#-project-overview"><strong>Overview</strong></a> ·
  <a href="#-key-features"><strong>Features</strong></a> ·
  <a href="#-api-documentation"><strong>API Docs</strong></a> ·
  <a href="#-installation--setup"><strong>Setup</strong></a> ·
  <a href="#-high-level-design-hld"><strong>HLD</strong></a> ·
  <a href="#-low-level-design-lld"><strong>LLD</strong></a>
</div>

<br />

<!-- BADGES -->
<div align="center">
  <img src="https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Vite_7-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express_5-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Tailwind_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Razorpay-02042B?style=for-the-badge&logo=razorpay&logoColor=3395FF" alt="Razorpay" />
  <img src="https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white" alt="Cloudinary" />
</div>

---

<details open>
  <summary><strong>📑 Table of Contents</strong></summary>
  <ol>
    <li><a href="#-project-overview">Project Overview</a></li>
    <li><a href="#-key-features">Key Features</a></li>
    <li><a href="#-technology-stack">Technology Stack</a></li>
    <li><a href="#-high-level-design-hld">High-Level Design (HLD)</a></li>
    <li><a href="#-low-level-design-lld">Low-Level Design (LLD)</a></li>
    <li><a href="#-data-flow">Data Flow</a></li>
    <li><a href="#-project-structure">Project Structure</a></li>
    <li><a href="#-database-architecture">Database Architecture</a></li>
    <li><a href="#-api-documentation">API Documentation</a></li>
    <li><a href="#-authentication--authorization">Authentication & Authorization</a></li>
    <li><a href="#-installation--setup">Installation & Setup</a></li>
    <li><a href="#-environment-variables">Environment Variables</a></li>
    <li><a href="#-development-workflow">Development Workflow</a></li>
    <li><a href="#-deployment">Deployment</a></li>
    <li><a href="#-technical-decisions">Technical Decisions</a></li>
    <li><a href="#-future-improvements">Future Improvements</a></li>
    <li><a href="#-contributing">Contributing</a></li>
    <li><a href="#-license">License</a></li>
  </ol>
</details>

---

## 📖 Project Overview

**DocConnect** is a comprehensive healthcare appointment management platform built on the **MERN stack** (MongoDB, Express.js, React, Node.js). It provides three separate, role-secured web applications:

| Portal | Purpose | Users |
| :--- | :--- | :--- |
| **Patient Portal** (`frontend/`) | Browse doctors, book appointments, make online payments, manage profile | Patients |
| **Doctor Portal** (`admin/` — Doctor login) | View assigned appointments, mark completions, update profile & availability | Doctors |
| **Admin Portal** (`admin/` — Admin login) | Manage doctors (CRUD), oversee all appointments (cancel/edit/delete), view dashboard analytics, configure site settings | Hospital administrators |

The admin and doctor portals share a single React application (`admin/`), which conditionally renders different navigation and views based on the authenticated role.

---

## ✨ Key Features

### Patient Portal
- 🔍 **Doctor Discovery** — Browse and filter doctors by speciality with paginated listings
- 📅 **Smart Scheduling** — Real-time slot-based booking with `slots_booked` matrix preventing double-booking
- 💳 **Razorpay Payments** — Secure online fee payment with cryptographic signature verification (HMAC-SHA256)
- 👤 **Profile Management** — Update personal info (name, phone, DOB, gender, address) with Cloudinary image uploads
- 📋 **Appointment History** — View, paginate, and cancel bookings with automatic slot release
- 📧 **Email Notifications** — Receive booking confirmations and cancellation alerts via Nodemailer (Gmail SMTP)
- 🌗 **Dark/Light Theme** — Toggle between themes with persistence via `localStorage`

### Doctor Portal
- 📊 **Dashboard Analytics** — View earnings, appointment count, unique patient count, and latest 5 appointments
- 📋 **Appointment Management** — View all assigned appointments, mark as completed, or cancel
- ⚙️ **Profile & Availability** — Update consultation fees, clinic address, and toggle availability status
- 🔐 **Secure Login** — JWT-authenticated with 7-day token expiry

### Admin Portal
- 👨‍⚕️ **Doctor Management** — Add new doctors (with image upload), view all doctors, toggle availability, delete doctors
- 📋 **Full Appointment Control** — View all system appointments, cancel, edit (reschedule to different doctor/slot), or permanently delete
- 📊 **System Dashboard** — KPI cards for total doctors, patients, appointments, plus latest 5 appointments
- 🖼️ **Site Settings** — Upload and manage site-wide image assets via Cloudinary (key-value configuration)
- 🔐 **Rate-Limited Login** — 5 attempts per 15-minute window via `express-rate-limit`

### Cross-Cutting Concerns
- 🛡️ **Security** — Helmet HTTP headers, CORS origin whitelisting, bcrypt password hashing, JWT authentication
- ⚡ **Rate Limiting** — Brute-force protection on authentication endpoints
- 🌐 **Global Error Handler** — Centralized error handling middleware with stack traces in development mode
- 📱 **Responsive UI** — Mobile-first design with Tailwind CSS v4 and Framer Motion animations

---

## 🛠 Technology Stack

### Frontend — Patient Portal & Admin/Doctor Portal

| Category | Technology | Version |
| :--- | :--- | :--- |
| **UI Library** | React | v19.1 |
| **Build Tool** | Vite | v7.x |
| **Styling** | Tailwind CSS | v4.1 |
| **Animations** | Framer Motion | v12.x |
| **Routing** | React Router DOM | v7.9 |
| **HTTP Client** | Axios | v1.x |
| **Notifications** | React Toastify | v11.x |
| **Icons** | Lucide React | v1.23 (Patient portal only) |

### Backend — REST API Server

| Category | Technology | Version |
| :--- | :--- | :--- |
| **Runtime** | Node.js | v18+ |
| **Framework** | Express.js | v5.1 |
| **Database** | MongoDB Atlas + Mongoose ODM | v8.19 |
| **Authentication** | JSON Web Tokens (jsonwebtoken) | v9.0 |
| **Password Hashing** | bcrypt + bcryptjs | v6.0 / v3.0 |
| **Input Validation** | validator.js | v13.x |
| **File Upload** | Multer (disk storage) → Cloudinary | v2.0 |
| **Media CDN** | Cloudinary | v2.7 |
| **Payments** | Razorpay | v2.9 |
| **Email** | Nodemailer (Gmail SMTP) | v9.0 |
| **Security** | Helmet, express-rate-limit, CORS | Latest |
| **Dev Server** | Nodemon | v3.1 |

---

## 🏗 High-Level Design (HLD)

### System Architecture

```mermaid
graph TB
    subgraph "Client Layer"
        FE["Patient Portal<br/>(React + Vite)<br/>:5173"]
        AD["Admin/Doctor Portal<br/>(React + Vite)<br/>:5174"]
    end

    subgraph "API Layer"
        GW["Express.js API Server<br/>:4000"]
    end

    subgraph "Middleware Pipeline"
        HE[Helmet<br/>Security Headers]
        CO[CORS<br/>Origin Whitelist]
        RL[Rate Limiter<br/>Auth Endpoints]
        AU["JWT Auth<br/>(authUser / authAdmin / authDoctor)"]
        MU[Multer<br/>File Upload]
    end

    subgraph "Business Logic"
        UC[User Controller]
        DC[Doctor Controller]
        AC[Admin Controller]
        SC[Site Controller]
    end

    subgraph "Data Layer"
        DB[(MongoDB Atlas)]
    end

    subgraph "External Services"
        CL[Cloudinary CDN<br/>Image Storage]
        RP[Razorpay<br/>Payment Gateway]
        NM[Nodemailer<br/>Gmail SMTP]
    end

    FE -->|HTTPS / REST| GW
    AD -->|HTTPS / REST| GW
    GW --> HE --> CO --> RL
    GW --> AU --> MU
    AU --> UC & DC & AC & SC
    UC & DC & AC --> DB
    SC --> DB
    AC -->|Upload Doctor Image| CL
    UC -->|Upload Profile Image| CL
    SC -->|Upload Setting Image| CL
    UC -->|Create Order + Verify| RP
    UC -->|Booking/Cancellation Emails| NM
```

### Architecture Patterns & Principles

| Pattern | Implementation |
| :--- | :--- |
| **Monorepo Structure** | Three independent apps (`frontend/`, `admin/`, `backend/`) in one repository |
| **MVC-like** | Models (Mongoose schemas) → Controllers (business logic) → Routes (Express endpoints) |
| **Role-Based Access** | Three separate JWT middleware functions enforce distinct access per role |
| **Context API State** | React Context providers manage global state; no external state library (e.g., Redux) |
| **Optimistic UI** | Admin availability toggle updates UI immediately, reverts on server error |

---

## 📐 Low-Level Design (LLD)

### Component Interaction Diagram

```mermaid
graph LR
    subgraph "Patient Frontend (React)"
        AppCtx["AppContext<br/>(doctors, token, userData,<br/>theme, siteSettings)"]
        Pages["Pages<br/>Home | Doctors | Appointment<br/>MyProfile | MyAppointments<br/>Login | About | Contact"]
        Comps["Components<br/>Navbar | Footer | Header<br/>Banner | TopDoctors<br/>SpecialityMenu | RelatedDoctors"]
        Pages --> AppCtx
        Comps --> AppCtx
    end

    subgraph "Admin/Doctor Frontend (React)"
        ACtx["AdminContext<br/>(aToken, doctors,<br/>appointments, dashData)"]
        DCtx["DoctorContext<br/>(dToken, appointments,<br/>dashData, profileData)"]
        ApCtx["AppContext<br/>(theme, sidebar,<br/>slotDateFormat, calculateAge)"]
        APages["Admin Pages<br/>Dashboard | AllAppointments<br/>AddDoctor | DoctorList<br/>SiteSettings"]
        DPages["Doctor Pages<br/>DoctorDashboard<br/>DoctorAppointments<br/>DoctorProfile"]
        AComps["Components<br/>Navbar | Sidebar<br/>EditAppointmentModal"]
        APages --> ACtx & ApCtx
        DPages --> DCtx & ApCtx
        AComps --> ACtx & DCtx & ApCtx
    end

    subgraph "Backend (Express.js)"
        MW["Middleware Stack<br/>helmet → cors → json<br/>→ rateLimiter → auth → multer"]
        Routes["Route Layer<br/>/api/user | /api/doctor<br/>/api/admin | /api/site"]
        Ctrl["Controller Layer<br/>userController | doctorController<br/>adminController | siteController"]
        Models["Model Layer<br/>User | Doctor<br/>Appointment | SiteSetting"]
        Config["Config Layer<br/>MongoDB | Cloudinary | Nodemailer"]
        Routes --> MW --> Ctrl --> Models --> Config
    end
```

### Slot Booking Algorithm (LLD)

The slot availability system uses a `slots_booked` object on each Doctor document, structured as a date-to-time-array map:

```json
{
  "slots_booked": {
    "15_8_2026": ["10:00 am", "10:30 am", "2:00 pm"],
    "16_8_2026": ["9:00 am"]
  }
}
```

**Booking Logic:**
1. Receive `{ docId, slotDate, slotTime }` from the client
2. Fetch the doctor document and verify `available === true`
3. Check `slots_booked[slotDate]` — if the array includes `slotTime`, reject (slot taken)
4. Append `slotTime` to the array (or create the array if date key doesn't exist)
5. Save the appointment document with denormalized `docData` and `userData` snapshots
6. Update the doctor's `slots_booked` field atomically

**Cancellation Logic:**
1. Mark the appointment as `cancelled: true`
2. Remove the `slotTime` from `slots_booked[slotDate]` via `.filter()`
3. Update the doctor document

**Admin Edit/Reschedule Logic:**
1. Validate the appointment is neither cancelled nor completed
2. If doctor or slot has changed, check new slot availability
3. Free the old slot on the old doctor
4. Book the new slot on the new doctor
5. Update appointment with new `docId`, `docData`, `slotDate`, `slotTime`, and `amount`

---

## 🔄 Data Flow

### Appointment Booking Flow (End-to-End)

```mermaid
sequenceDiagram
    actor Patient
    participant Frontend as Patient Frontend
    participant Backend as Express API
    participant MongoDB as MongoDB Atlas
    participant Razorpay as Razorpay Gateway
    participant Email as Nodemailer (Gmail)

    Patient->>Frontend: Select doctor, date & time slot
    Frontend->>Backend: POST /api/user/book-appointment<br/>{docId, slotDate, slotTime}<br/>Header: token

    Backend->>Backend: authUser middleware<br/>Verify JWT → extract userId

    Backend->>MongoDB: Find Doctor by docId
    alt Doctor unavailable
        MongoDB-->>Backend: available: false
        Backend-->>Frontend: ❌ "Doctor not available"
    end

    Backend->>Backend: Check slots_booked[slotDate]
    alt Slot already booked
        Backend-->>Frontend: ❌ "Slot not available"
    end

    Backend->>MongoDB: Find User by userId
    Backend->>MongoDB: Create Appointment document<br/>(userId, docId, slotDate, slotTime,<br/>amount, userData, docData)
    Backend->>MongoDB: Update Doctor.slots_booked<br/>Push slotTime to date array

    Backend->>Email: Send confirmation email<br/>to patient's email address
    Backend-->>Frontend: ✅ "Appointment Booked"

    Note over Patient, Frontend: Patient views appointment<br/>in My Appointments page

    Patient->>Frontend: Click "Pay Online"
    Frontend->>Backend: POST /api/user/payment-razorpay<br/>{appointmentId}
    Backend->>Razorpay: Create Order<br/>(amount × 100, currency, receipt)
    Razorpay-->>Backend: Order object (order_id)
    Backend-->>Frontend: Order details

    Frontend->>Razorpay: Open Razorpay Checkout modal
    Patient->>Razorpay: Complete payment
    Razorpay-->>Frontend: {razorpay_order_id,<br/>razorpay_payment_id,<br/>razorpay_signature}

    Frontend->>Backend: POST /api/user/verifyRazorpay<br/>{order_id, payment_id, signature}
    Backend->>Backend: HMAC-SHA256 signature<br/>verification
    Backend->>Razorpay: Fetch order status
    alt Payment successful
        Backend->>MongoDB: Update appointment<br/>payment: true
        Backend-->>Frontend: ✅ "Payment Successful"
    else Verification failed
        Backend-->>Frontend: ❌ "Payment Failed"
    end
```

### Authentication Flow

```mermaid
sequenceDiagram
    actor User
    participant Client as React App
    participant API as Express API
    participant DB as MongoDB

    Note over User, DB: User Registration

    User->>Client: Fill name, email, password
    Client->>API: POST /api/user/register
    API->>API: Validate email (validator.js)<br/>Check password length ≥ 8
    API->>API: bcrypt.hash(password, salt=10)
    API->>DB: Save new User document
    API->>API: jwt.sign({id: user._id}, JWT_SECRET)
    API-->>Client: {success: true, token}
    Client->>Client: Store token in localStorage

    Note over User, DB: User Login

    User->>Client: Fill email, password
    Client->>API: POST /api/user/login
    API->>DB: Find user by email
    API->>API: bcrypt.compare(password, hash)
    API->>API: jwt.sign({id: user._id}, JWT_SECRET)
    API-->>Client: {success: true, token}

    Note over User, DB: Admin Login (Static Credentials)

    User->>Client: Fill email, password
    Client->>API: POST /api/admin/login
    API->>API: Compare with env vars<br/>ADMIN_EMAIL + ADMIN_PASSWORD
    API->>API: jwt.sign(email+password, JWT_SECRET)
    API-->>Client: {success: true, token}

    Note over User, DB: Doctor Login

    User->>Client: Fill email, password
    Client->>API: POST /api/doctor/login
    API->>DB: Find doctor by email
    API->>API: bcrypt.compare(password, hash)
    API->>API: jwt.sign({id: doctor._id},<br/>JWT_SECRET, {expiresIn: '7d'})
    API-->>Client: {success: true, token}
```

---

## 🗂 Project Structure

```
Doctor-Appoinment-Booking-System/
│
├── frontend/                          # 🧑‍⚕️ Patient Portal (React + Vite)
│   ├── .env                           # VITE_BACKEND_URL, VITE_RAZORPAY_KEY_ID
│   ├── index.html                     # SPA entry point
│   ├── vite.config.js                 # Vite + Tailwind v4 plugin
│   ├── package.json                   # React 19, Tailwind v4, Framer Motion, Axios
│   └── src/
│       ├── main.jsx                   # React DOM root + BrowserRouter + Context
│       ├── App.jsx                    # Route definitions (8 routes)
│       ├── index.css                  # Tailwind directives + global styles
│       ├── assets/                    # Static images and asset exports
│       ├── context/
│       │   └── AppContext.jsx         # Global state (doctors, token, userData, theme, siteSettings)
│       ├── components/
│       │   ├── Navbar.jsx             # Navigation bar with auth-aware menu
│       │   ├── Footer.jsx             # Site footer
│       │   ├── Header.jsx             # Hero/banner section
│       │   ├── Banner.jsx             # Call-to-action banner
│       │   ├── TopDoctors.jsx         # Featured doctors carousel
│       │   ├── SpcialityMenu.jsx      # Speciality filter navigation
│       │   └── RelatedDoctors.jsx     # Related doctors by speciality
│       └── pages/
│           ├── Home.jsx               # Landing page (Header + SpecialityMenu + TopDoctors + Banner)
│           ├── Doctors.jsx            # Doctor listing with speciality filter
│           ├── Appointment.jsx        # Individual doctor booking with slot picker
│           ├── Login.jsx              # Login / Sign Up toggle form
│           ├── MyProfile.jsx          # User profile edit (with image upload)
│           ├── MyAppointments.jsx     # Appointment list with payment & cancellation
│           ├── About.jsx              # About page
│           └── Contact.jsx            # Contact information page
│
├── admin/                             # 🛡️ Admin + Doctor Portal (React + Vite)
│   ├── .env                           # VITE_BACKEND_URL
│   ├── index.html                     # SPA entry point
│   ├── vite.config.js                 # Vite + Tailwind v4 plugin
│   ├── package.json                   # React 19, Tailwind v4, Framer Motion, Axios
│   └── src/
│       ├── main.jsx                   # React DOM root + BrowserRouter + 3 Context Providers
│       ├── App.jsx                    # Conditional rendering: Login vs Dashboard (aToken/dToken)
│       ├── index.css                  # Tailwind directives + CSS custom properties
│       ├── assets/                    # Icons and image assets
│       ├── context/
│       │   ├── AppContext.jsx         # Shared: theme toggle, sidebar, date formatting, age calc
│       │   ├── AdminContext.jsx       # Admin state: doctors CRUD, appointments CRUD, dashboard
│       │   └── DoctorContext.jsx      # Doctor state: appointments, dashboard, profile
│       ├── components/
│       │   ├── Navbar.jsx             # Top navigation with role indicator + theme toggle + logout
│       │   ├── Sidebar.jsx            # Responsive sidebar with role-based nav links + animations
│       │   └── EditAppointmentModal.jsx # Modal for rescheduling appointments (admin only)
│       └── pages/
│           ├── Login.jsx              # Unified login (Admin/Doctor toggle)
│           ├── Admin/
│           │   ├── Dashboard.jsx      # KPI cards + latest appointments
│           │   ├── AllAppointments.jsx # Full appointment list with cancel/edit/delete
│           │   ├── AddDoctor.jsx      # Multi-field form with image upload
│           │   ├── DoctorList.jsx     # Doctor grid with availability toggle + delete
│           │   └── SiteSettings.jsx   # Site image configuration upload
│           └── Doctor/
│               ├── DoctorDashboard.jsx # Doctor-specific KPIs (earnings, patients, appointments)
│               ├── DoctorAppointments.jsx # Assigned appointment list with complete/cancel
│               └── DoctorProfile.jsx  # Edit fees, address, availability toggle
│
├── backend/                           # ⚙️ Express.js REST API
│   ├── .env                           # All server configuration (see Environment Variables)
│   ├── package.json                   # Express 5, Mongoose 8, Razorpay, Cloudinary, Nodemailer
│   ├── server.js                      # Entry point: middleware pipeline, route mounting, error handler
│   ├── config/
│   │   ├── mongodb.js                 # Mongoose connection to MongoDB Atlas
│   │   ├── cloudinary.js              # Cloudinary SDK configuration
│   │   └── nodemailer.js              # Gmail SMTP transporter + sendEmail utility
│   ├── middlewares/
│   │   ├── authAdmin.js               # JWT verify → match against ADMIN_EMAIL+ADMIN_PASSWORD
│   │   ├── authDoctor.js              # JWT verify → extract doctor ID (req.docId)
│   │   ├── authUser.js                # JWT verify → extract user ID (req.userId)
│   │   └── multer.js                  # Disk storage config (uploads/ directory)
│   ├── models/
│   │   ├── userModel.js               # User schema (name, email, password, image, address, etc.)
│   │   ├── doctorModel.js             # Doctor schema (name, speciality, fees, slots_booked, etc.)
│   │   ├── appointmentModel.js        # Appointment schema (userId, docId, slot, payment, status)
│   │   └── siteSettingModel.js        # Key-value setting schema with timestamps
│   ├── controllers/
│   │   ├── userController.js          # Register, login, profile, booking, payment, cancellation
│   │   ├── doctorController.js        # Login, appointments, complete/cancel, dashboard, profile
│   │   ├── adminController.js         # Login, add/delete doctor, appointments CRUD, dashboard
│   │   └── siteController.js          # Get settings, upload setting image
│   ├── routes/
│   │   ├── userRoute.js               # 9 endpoints with authUser + rateLimiter
│   │   ├── doctorRoute.js             # 8 endpoints with authDoctor
│   │   ├── adminRoute.js              # 10 endpoints with authAdmin + rateLimiter
│   │   └── siteRoute.js               # 1 public endpoint
│   └── uploads/                       # Temporary multer file storage (before Cloudinary upload)
│
├── .gitignore                         # node_modules, dist, .env, editor files
└── README.md                          # This file
```

---

## 🗃 Database Architecture

### Entity-Relationship Diagram

```mermaid
erDiagram
    USER {
        ObjectId _id PK
        String name
        String email UK
        String password
        String image
        Object address
        String gender
        String dob
        String phone
    }

    DOCTOR {
        ObjectId _id PK
        String name
        String email UK
        String password
        String image
        String speciality
        String degree
        String experience
        String about
        Boolean available
        Number fees
        Object address
        Number date
        Object slots_booked
    }

    APPOINTMENT {
        ObjectId _id PK
        String userId FK
        String docId FK
        String slotDate
        String slotTime
        Object userData
        Object docData
        Number amount
        Number date
        Boolean cancelled
        Boolean payment
        Boolean isCompleted
    }

    SITESETTING {
        ObjectId _id PK
        String key UK
        String value
        Date createdAt
        Date updatedAt
    }

    USER ||--o{ APPOINTMENT : "books"
    DOCTOR ||--o{ APPOINTMENT : "receives"
```

### Collection Details

<table>
<tr><th>Collection</th><th>Key Fields</th><th>Notes</th></tr>
<tr>
<td><strong>users</strong></td>
<td>

`name` · `email` (unique) · `password` (bcrypt) · `image` (base64 default) · `address` ({line1, line2}) · `gender` · `dob` · `phone`

</td>
<td>Default avatar is a base64-encoded PNG. Address stored as nested object.</td>
</tr>
<tr>
<td><strong>doctors</strong></td>
<td>

`name` · `email` (unique) · `password` (bcrypt) · `image` (Cloudinary URL) · `speciality` · `degree` · `experience` · `about` · `available` (boolean) · `fees` (number) · `address` (object) · `slots_booked` (object map) · `date` (timestamp)

</td>
<td>

`slots_booked` uses `{minimize: false}` Mongoose option to persist empty objects. Structure: `{ "dd_mm_yyyy": ["time1", "time2"] }`

</td>
</tr>
<tr>
<td><strong>appointments</strong></td>
<td>

`userId` · `docId` · `slotDate` · `slotTime` · `userData` (snapshot) · `docData` (snapshot) · `amount` · `date` (timestamp) · `cancelled` · `payment` · `isCompleted`

</td>
<td>

`userData` and `docData` are denormalized snapshots captured at booking time, ensuring appointment history remains accurate even if profiles change later.

</td>
</tr>
<tr>
<td><strong>sitesettings</strong></td>
<td>

`key` (unique) · `value` · `createdAt` · `updatedAt`

</td>
<td>

Uses upsert pattern — `findOneAndUpdate` with `{upsert: true}` for create-or-update semantics. Stores image URLs uploaded via Cloudinary.

</td>
</tr>
</table>

---

## 🔌 API Documentation

> All endpoints return JSON in the format: `{ success: boolean, message?: string, ...data }`.
> Protected endpoints require the appropriate JWT token in headers.

### 🧑‍⚕️ User Routes (`/api/user`)

| Method | Endpoint | Auth | Middleware | Description |
| :--- | :--- | :---: | :--- | :--- |
| `POST` | `/register` | ❌ | `rateLimiter` | Register new patient (validates email format & password length ≥ 8) |
| `POST` | `/login` | ❌ | `rateLimiter` | Authenticate patient, returns JWT |
| `GET` | `/get-profile` | `token` | `authUser` | Fetch authenticated user's profile (excludes password) |
| `POST` | `/update-profile` | `token` | `authUser` + `multer` | Update profile fields + optional image upload to Cloudinary |
| `POST` | `/book-appointment` | `token` | `authUser` | Book a doctor's slot; sends confirmation email |
| `GET` | `/appointments` | `token` | `authUser` | List user's appointments (paginated: `?page=1&limit=50`) |
| `POST` | `/cancel-appointment` | `token` | `authUser` | Cancel appointment + release slot + send cancellation email |
| `POST` | `/payment-razorpay` | `token` | `authUser` | Create Razorpay order for an appointment |
| `POST` | `/verifyRazorpay` | `token` | `authUser` | Verify Razorpay payment signature (HMAC-SHA256) and mark as paid |

### 👨‍💼 Admin Routes (`/api/admin`)

| Method | Endpoint | Auth | Middleware | Description |
| :--- | :--- | :---: | :--- | :--- |
| `POST` | `/login` | ❌ | `rateLimiter` (5/15min) | Authenticate admin against env credentials |
| `POST` | `/add-doctor` | `atoken` | `authAdmin` + `multer` | Create new doctor with image upload |
| `POST` | `/all-doctors` | `atoken` | `authAdmin` | List all doctors (excludes passwords) |
| `POST` | `/change-availability` | `atoken` | `authAdmin` | Toggle doctor's availability flag |
| `GET` | `/appointments` | `atoken` | `authAdmin` | Fetch all system appointments |
| `POST` | `/cancel-appointment` | `atoken` | `authAdmin` | Cancel appointment + release slot |
| `POST` | `/delete-appointment` | `atoken` | `authAdmin` | Permanently delete appointment + free slot if active |
| `POST` | `/update-appointment` | `atoken` | `authAdmin` | Reschedule: change doctor, date, or time with slot validation |
| `POST` | `/delete-doctor` | `atoken` | `authAdmin` | Permanently delete a doctor record |
| `GET` | `/dashboard` | `atoken` | `authAdmin` | Dashboard KPIs: doctor/patient/appointment counts + latest 5 |
| `POST` | `/upload-setting-image` | `atoken` | `authAdmin` + `multer` | Upload/update a site setting image via Cloudinary (upsert) |

### 🩺 Doctor Routes (`/api/doctor`)

| Method | Endpoint | Auth | Middleware | Description |
| :--- | :--- | :---: | :--- | :--- |
| `GET` | `/list` | ❌ | — | Public: paginated doctor listing (`?page=1&limit=50`), excludes password & email |
| `POST` | `/login` | ❌ | — | Authenticate doctor, returns JWT (7-day expiry) |
| `GET` | `/appointments` | `dtoken` | `authDoctor` | Get appointments assigned to the authenticated doctor |
| `POST` | `/complete-appointment` | `dtoken` | `authDoctor` | Mark appointment as completed (also sets `payment: true`) |
| `POST` | `/cancel-appointment` | `dtoken` | `authDoctor` | Cancel an assigned appointment |
| `GET` | `/dashboard` | `dtoken` | `authDoctor` | Doctor KPIs: earnings, appointment count, unique patients, latest 5 |
| `GET` | `/profile` | `dtoken` | `authDoctor` | Get doctor's own profile (excludes password) |
| `POST` | `/update-profile` | `dtoken` | `authDoctor` | Update fees, address, availability |

### 🌐 Site Routes (`/api/site`)

| Method | Endpoint | Auth | Description |
| :--- | :--- | :---: | :--- |
| `GET` | `/settings` | ❌ | Fetch all site settings as a key-value object (public) |

---

## 🔐 Authentication & Authorization

### Token Architecture

| Role | Header Key | Token Payload | Creation | Verification Middleware |
| :--- | :--- | :--- | :--- | :--- |
| **Patient** | `token` | `{ id: userId }` | `jwt.sign({id: user._id}, JWT_SECRET)` | `authUser.js` → `req.userId` |
| **Doctor** | `dtoken` | `{ id: doctorId }` | `jwt.sign({id: doctor._id}, JWT_SECRET, {expiresIn: '7d'})` | `authDoctor.js` → `req.docId` |
| **Admin** | `atoken` | `email + password` (string) | `jwt.sign(email + password, JWT_SECRET)` | `authAdmin.js` → verifies decoded value matches env vars |

### Security Measures

| Measure | Implementation |
| :--- | :--- |
| **Password Hashing** | bcrypt with salt rounds = 10 |
| **CORS Whitelist** | Only `FRONTEND_URL` and `ADMIN_URL` origins allowed |
| **HTTP Security Headers** | Helmet middleware applied globally |
| **Rate Limiting** | Admin login: 5 req/15min; User login/register: 10 req/15min |
| **Payment Verification** | HMAC-SHA256 signature verification + server-side order status check |
| **Token Expiry Handling** | Frontend auto-clears token and redirects on 401 or "Token expired" |
| **Sensitive Data Exclusion** | `.select('-password')` on all user/doctor queries; `slots_booked` stripped from appointment doc snapshots |

---

## ⚙️ Installation & Setup

### Prerequisites

- **Node.js** v18.x or higher
- **MongoDB** (MongoDB Atlas URI recommended, or local instance)
- **Cloudinary** account ([cloudinary.com](https://cloudinary.com))
- **Razorpay** account ([razorpay.com](https://razorpay.com))
- **Gmail App Password** for Nodemailer (enable 2FA → generate App Password)

### 1. Clone the Repository

```bash
git clone https://github.com/nzaman7878/Doctor-Appoinment-Booking-System-Using-MERN-stack.git
cd Doctor-Appoinment-Booking-System-Using-MERN-stack
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in `backend/` (see [Environment Variables](#-environment-variables) below), then:

```bash
npm run dev       # Starts with nodemon on port 4000
# or
npm start         # Production: node server.js
```

### 3. Patient Portal (Frontend) Setup

Open a **new terminal**:

```bash
cd frontend
npm install
```

Create a `.env` file in `frontend/`:

```env
VITE_BACKEND_URL=http://localhost:4000
VITE_RAZORPAY_KEY_ID=rzp_test_xxxxx
```

```bash
npm run dev       # Starts on http://localhost:5173
```

### 4. Admin/Doctor Portal Setup

Open a **third terminal**:

```bash
cd admin
npm install
```

Create a `.env` file in `admin/`:

```env
VITE_BACKEND_URL=http://localhost:4000
```

```bash
npm run dev       # Starts on http://localhost:5174
```

---

## 🔐 Environment Variables

### Backend (`backend/.env`)

| Variable | Required | Description | Example |
| :--- | :---: | :--- | :--- |
| `MONGODB_URI` | ✅ | MongoDB Atlas connection string | `mongodb+srv://user:pass@cluster.xxx.mongodb.net/dbname` |
| `JWT_SECRET` | ✅ | Secret key for signing JWTs | `your_super_secret_key_here` |
| `ADMIN_EMAIL` | ✅ | Static admin login email | `admin@hospital.com` |
| `ADMIN_PASSWORD` | ✅ | Static admin login password | `SecureAdmin@123` |
| `CLOUDINARY_NAME` | ✅ | Cloudinary cloud name | `dxxxxxxx` |
| `CLOUDINARY_API_KEY` | ✅ | Cloudinary API key | `123456789012345` |
| `CLOUDINARY_SECRET_KEY` | ✅ | Cloudinary API secret | `_abcXYZ123...` |
| `RAZORPAY_KEY_ID` | ✅ | Razorpay public key ID | `rzp_test_xxxxx` |
| `RAZORPAY_KEY_SECRET` | ✅ | Razorpay secret key | `abcxyz123...` |
| `CURRENCY` | ✅ | Payment currency code | `INR` |
| `EMAIL_USER` | ⚠️ | Gmail address for sending emails | `your.email@gmail.com` |
| `EMAIL_PASS` | ⚠️ | Gmail App Password (not regular password) | `abcd efgh ijkl mnop` |
| `PORT` | ❌ | API server port (defaults to `4000`) | `4000` |
| `FRONTEND_URL` | ❌ | CORS: Patient portal origin (defaults to `http://localhost:5173`) | `https://your-frontend.vercel.app` |
| `ADMIN_URL` | ❌ | CORS: Admin portal origin (defaults to `http://localhost:5174`) | `https://your-admin.vercel.app` |

> ⚠️ `EMAIL_USER` and `EMAIL_PASS` are optional. If not set, emails are logged to console instead of being sent (graceful degradation).

### Frontend (`frontend/.env`)

| Variable | Required | Description |
| :--- | :---: | :--- |
| `VITE_BACKEND_URL` | ✅ | Backend API base URL |
| `VITE_RAZORPAY_KEY_ID` | ✅ | Razorpay public key (for checkout widget) |

### Admin (`admin/.env`)

| Variable | Required | Description |
| :--- | :---: | :--- |
| `VITE_BACKEND_URL` | ✅ | Backend API base URL |

---

## 💻 Development Workflow

```bash
# Terminal 1 — Backend (auto-restarts on changes)
cd backend && npm run dev

# Terminal 2 — Patient Frontend (HMR enabled)
cd frontend && npm run dev

# Terminal 3 — Admin/Doctor Panel (HMR enabled)
cd admin && npm run dev
```

| Port | Service |
| :--- | :--- |
| `4000` | Express API server |
| `5173` | Patient portal (Vite dev server) |
| `5174` | Admin/Doctor portal (Vite dev server) |

### Build for Production

```bash
# Frontend
cd frontend && npm run build    # Output: frontend/dist/

# Admin Panel
cd admin && npm run build       # Output: admin/dist/
```

---

## 🚀 Deployment

### Recommended Architecture

```
┌─────────────────────┐     ┌─────────────────────┐
│   Vercel / Netlify   │     │   Vercel / Netlify   │
│   Patient Portal     │     │   Admin Portal        │
│   (frontend/dist)    │     │   (admin/dist)        │
└────────┬────────────┘     └────────┬────────────┘
         │ HTTPS                      │ HTTPS
         └──────────┬─────────────────┘
                    │
         ┌──────────▼──────────┐
         │  Render / Railway   │
         │  Backend API        │
         │  (backend/)         │
         └──────────┬──────────┘
                    │
    ┌───────────────┼───────────────┐
    │               │               │
┌───▼───┐    ┌──────▼──────┐  ┌────▼────┐
│MongoDB│    │ Cloudinary  │  │Razorpay │
│ Atlas │    │    CDN      │  │Gateway  │
└───────┘    └─────────────┘  └─────────┘
```

### Step-by-Step

1. **Backend** → Deploy to **Render**, **Railway**, or **AWS EC2**
   - Set all `backend/.env` variables in the platform's environment settings
   - Set `FRONTEND_URL` and `ADMIN_URL` to your deployed frontend origins
   - Build command: `npm install`
   - Start command: `npm start`

2. **Frontend** → Deploy to **Vercel** or **Netlify**
   - Root directory: `frontend`
   - Build command: `npm run build`
   - Output directory: `dist`
   - Environment variables: `VITE_BACKEND_URL`, `VITE_RAZORPAY_KEY_ID`

3. **Admin Panel** → Deploy to **Vercel** or **Netlify** (separate project)
   - Root directory: `admin`
   - Build command: `npm run build`
   - Output directory: `dist`
   - Environment variables: `VITE_BACKEND_URL`

4. **Post-Deployment** — Update backend `.env` with deployed frontend URLs for CORS whitelisting

---

## 🧠 Technical Decisions

| Decision | Rationale |
| :--- | :--- |
| **Denormalized `userData`/`docData` in Appointments** | Appointment history shows the doctor/patient info at the time of booking, even if profiles are later updated or deleted. Avoids expensive joins on read-heavy queries. |
| **`slots_booked` as a flat object map** | Allows O(1) date lookup and O(n) time lookup within a date. No separate collection needed. The `{minimize: false}` Mongoose option ensures empty objects persist. |
| **Separate auth middleware per role** | Each role uses different token header keys (`token`, `dtoken`, `atoken`), enabling a single API server to serve all three portals without route-level role checks. |
| **Static admin credentials (env vars)** | The admin is a single super-user. No admin registration flow needed. Simplifies the initial setup. |
| **Multer disk storage → Cloudinary** | Files are first saved to `uploads/` on disk, then uploaded to Cloudinary for CDN delivery. This two-step approach avoids memory issues with large images. |
| **No Redux** | React Context API is sufficient for this scale. Three separate Context providers (Admin, Doctor, App) keep state isolated and avoid unnecessary re-renders. |
| **Express 5** | Supports async error handling natively, reducing boilerplate try-catch in route handlers. |
| **Tailwind CSS v4** | Latest version with built-in Vite plugin (`@tailwindcss/vite`), eliminating PostCSS configuration. |
| **Razorpay HMAC Verification** | Server-side cryptographic verification (`crypto.createHmac`) ensures payment authenticity — the client cannot fake payment confirmations. |
| **Nodemailer Graceful Degradation** | If `EMAIL_USER`/`EMAIL_PASS` are not configured, emails are logged to console instead of throwing errors. Development-friendly. |

---

## 🔮 Future Improvements

- [ ] **Stripe Integration** — Add Stripe as an alternative payment gateway for international users
- [ ] **WebSocket Notifications** — Real-time appointment updates without page refresh
- [ ] **Doctor Search** — Full-text search by name, degree, or location
- [ ] **Appointment Reminders** — Automated email/SMS reminders before appointment time
- [ ] **Patient Reviews & Ratings** — Let patients rate and review doctors after visits
- [ ] **Admin User Management** — Manage patient accounts (block/unblock)
- [ ] **Prescription Module** — Allow doctors to upload digital prescriptions after consultation
- [ ] **Test Suite** — Add unit tests (Jest) and integration tests (Supertest) for API endpoints
- [ ] **API Rate Limiting per User** — Token-based rate limiting in addition to IP-based
- [ ] **Password Reset** — Email-based OTP or link for password recovery
- [ ] **Docker Compose** — Containerized local development with MongoDB, backend, and frontend services

---

## 🤝 Contributing

Contributions are welcome! Follow these steps:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/your-feature`
3. **Commit** your changes: `git commit -m "feat: add your feature"`
4. **Push** to the branch: `git push origin feature/your-feature`
5. **Open** a Pull Request

Please ensure your code follows the existing code style and includes meaningful commit messages.

---

## 📜 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

<p align="center">
  Developed with ❤️ by <a href="https://github.com/nzaman7878"><strong>NURUZZAMAN</strong></a>
</p>
