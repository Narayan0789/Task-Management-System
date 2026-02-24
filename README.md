# 🚀 Task Management System (MERN Stack)

A full-stack role-based Task Management System built using the MERN stack with authentication, authorization, and real-time task tracking.

---

## 📌 Project Overview

This application allows Admins to assign tasks to Employees and track their progress in real time.

Employees can update task status (Pending → In Progress → Completed), and updates are reflected instantly in the Admin dashboard.

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Axios
- React Router
- CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

---

## 🔐 Authentication & Authorization

- JWT-based login system
- Role-based access control
- Admin and Employee dashboards
- Protected API routes

---

## 👨‍💼 Admin Features

- Create tasks
- Assign tasks to employees
- View all tasks
- Monitor employee progress
- View dashboard statistics:
  - Total Tasks
  - Completed
  - Pending
  - Total Employees
- Delete tasks

---

## 👨‍💻 Employee Features

- View assigned tasks
- Update task status
- Real-time progress updates

---

## 📊 Dashboard Functionality

Admin dashboard dynamically shows:
- Total tasks
- Completed tasks
- Pending tasks
- Total employees

All values update automatically when task status changes.

---

## 📂 Project Structure

### Task-Management-System/
    │
    ├── backend/
    │ ├── controllers/
    │ ├── models/
    │ ├── routes/
    │ ├── middleware/
    │ └── server.js
    │
    ├── frontend/
    │ ├── components/
    │ ├── pages/
    │ ├── services/
    │ └── styles/
    │
    └── README.md

    
---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/Narayan0789/task-management-system.git

### 2️⃣ Backend Setup

cd backend
npm install

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

Run backend:
npm run dev

npm run dev
cd frontend
npm install
npm run dev

🔄 API Endpoints
Auth

POST /api/auth/login

POST /api/auth/register

Tasks

GET /api/tasks

GET /api/tasks/my

POST /api/tasks

PUT /api/tasks/:id

DELETE /api/tasks/:id


🚀 Future Improvements

Task filtering & search

Deadline alerts

Performance analytics

Graphical charts

Deployment on Vercel & Render

📌 Key Learning Outcomes

Role-based authentication

Secure REST API design

Real-time dashboard updates

MERN full-stack integration

Clean UI & conditional rendering

👤 Author

Narayan Kumar
Full Stack Developer
