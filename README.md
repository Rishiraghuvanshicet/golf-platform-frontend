# ⛳ Golf Charity Subscription Platform

A full-stack MERN application that combines **golf performance tracking**, **monthly prize draws**, and **charity contributions** into one engaging platform.

---

## 🚀 Features

### 👤 Authentication

* User Signup & Login (JWT आधारित authentication)
* Role-based access (User / Admin)

### ⛳ Score Management

* Users can enter golf scores (1–45)
* Only last 5 scores are stored (rolling logic)
* Scores displayed in reverse chronological order

### 🎲 Draw System

* Monthly draw with 5 random numbers
* Match logic:

  * 5 match → Jackpot (40%)
  * 4 match → Medium prize (35%)
  * 3 match → Small prize (25%)
* Prize distribution handled automatically

### 🏆 Winner System

* Winners stored in database
* Proof upload support
* Admin approval system
* Payment status tracking (Pending → Paid)

### ❤️ Charity System

* Users can select a charity
* Minimum 10% contribution
* Charity listing and management

### 💳 Subscription System

* Monthly / Yearly plans
* Active subscription required for participation
* Middleware-based access control

### 🧑‍💻 Admin Features

* Run draw
* Manage users
* Verify winners
* Manage charities

---

## 🛠️ Tech Stack

### Frontend

* React.js
* React Router DOM
* Axios
* React Toastify
* React Icons
* CSS (Custom Styling)

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication
* bcrypt.js

---

## 📁 Project Structure

```
golf-platform/
│
├── client/          # React Frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── api/
│   │   └── styles/
│
├── server/          # Node Backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── config/
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
create folder golf-platform
cd golf-platform

git clone https://github.com/Rishiraghuvanshicet/golf-platform-frontend
cd golf-platform-frontend

git clone https://github.com/Rishiraghuvanshicet/golf-platform-server
cd golf-platform-server
```

---

### 2️⃣ Backend Setup

```bash
cd server
npm install
```

Create `.env` file:

```
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret_key
PORT='XXXX'
PRIZE_POOL_CONTRIBUTION_PER_SUB= "100"
```

Run backend:

```bash
npm run dev
```

---

### 3️⃣ Frontend Setup

```bash
cd client
npm install
npm start
```
Create `.env` file:

```

REACT_APP_API_BASE_URL=" "
---

## 🔐 API Routes

### Auth

* `POST /api/auth/register`
* `POST /api/auth/login`

### Score

* `POST /api/score` (Protected + Subscription Required)

### Draw

* `POST /api/draw/run` (Admin)
* `GET /api/draw`

### Winner

* `GET /api/winner/my`
* `POST /api/winner/upload-proof`
* `PUT /api/winner/approve/:id` (Admin)

### Subscription

* `POST /api/subscription`
* `GET /api/subscription/me`

### Charity

* `GET /api/charity`
* `POST /api/charity` (Admin)

---

## 🔥 Key Highlights

* Full-stack MERN project
* Real-world business logic (subscriptions + prize pools)
* Secure authentication with JWT
* Scalable architecture
* Clean UI with responsive design

---

## 🚀 Future Improvements

* Stripe payment integration
* Cloudinary for image upload
* Email notifications (Nodemailer)
* Admin analytics dashboard
* Mobile app (React Native)

---

## 👨‍💻 Author

**Rishi Raghuvanshi**

---

## 📌 Note

This project was built as a **full-stack development assignment** and demonstrates real-world SaaS architecture and logic.

---
