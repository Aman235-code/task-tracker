
# 📝 Task Tracker

A full-stack Task Tracker application to manage projects and tasks efficiently. Built using **React (Vite)** for the frontend and **Node.js + Express + MongoDB** for the backend.

---

## 🔗 Repository

[https://github.com/Aman235-code/task-tracker.git]

---

## 📁 Project Structure

```
task-tracker/
│
├── backend/               # Backend code (Express.js + MongoDB)
│   ├── server.js          # Entry point
│   └── ...
│
├── frontend/
│   └── client/            # Frontend Vite + React project
│       └── ...
│
└── README.md              # This file
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Aman235-code/task-tracker.git
cd task-tracker
```

---

## ⚙️ Backend Setup

```bash
cd backend
npm install
```

### Create a `.env` file in the `backend` folder with the following content:

```
MONGO_URI=your_mongodb_connection_uri
JWT_SECRET=your_jwt_secret_key
```

> 🔒 **Note:** Never share your `.env` file or secrets in version control.

### Start the backend server with nodemon

```bash
nodemon server.js
```

---

## 🎨 Frontend Setup

```bash
cd frontend/client
npm install
```

### Run the frontend using Vite

```bash
npm run dev
```

By default, it runs on: [http://localhost:5173](http://localhost:5173)

---

## 🌐 Accessing the App

- **Frontend**: `http://localhost:5173`
- **Backend**: `http://localhost:3000`

---

## 🛠️ Tech Stack

- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: JSON Web Tokens (JWT)

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙋‍♂️ Author

Created by: **Aman**
