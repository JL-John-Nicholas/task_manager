# 📝 Task Manager App

A clean, full-stack task management web application built with **Node.js**, **Express**, **MongoDB**, and a **Vanilla JS frontend**.  
Manage tasks across a Kanban board with features like user authentication, task priorities, comments, activity logs, and due dates.

---

## 🌐 Live Demo

- **App:** [task-manager-caw.netlify.app](https://task-manager-caw.netlify.app)
- **Demo Video:** [Watch on Loom](#) <!-- Replace # with actual Loom video link -->

---

## 🚀 Features

- 🔐 **JWT Authentication** – Register and login securely
- 📝 **Task Management** – Add tasks with title, description, priority, and due date
- 🧭 **Status Tracking** – Move tasks across “To Do”, “In Progress”, and “Done”
- 💬 **Comment System** – Add comments on individual tasks
- 📜 **Activity Logs** – Track updates and deletions per task
- 🎨 **Responsive UI** – Clean design using plain HTML, CSS, and Tailwind (optional)
- ⚙️ **RESTful API** – Fully functional backend using Express + MongoDB

---

## 🛠️ Tech Stack

| Layer     | Technology                          |
|-----------|-------------------------------------|
| Frontend  | HTML, CSS, JavaScript, Tailwind (CDN)|
| Backend   | Node.js, Express.js                 |
| Database  | MongoDB (Mongoose ODM)              |
| Auth      | JSON Web Tokens (JWT)               |

---

## 📁 Folder Structure

.
├── backend
│ ├── models/
│ ├── routes/
│ ├── middleware/
│ ├── controllers/ # (optional)
│ ├── server.js
│ └── .env # Environment variables
├── frontend
│ ├── index.html
│ ├── dashboard.html
│ ├── js/
│ ├── styles/
│ └── _redirects
├── README.md


---

## ⚙️ Local Setup Instructions

### 🔧 Backend Setup (Node.js + MongoDB)

1. **Navigate to the backend folder and install dependencies:**
    ```
    cd backend
    npm install
    ```

2. **Create a `.env` file in the backend folder and add the following:**
    ```
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    PORT=5000
    ```

3. **Start the backend server:**
    ```
    node server.js
    # or
    npx nodemon server.js
    ```

---

### 💻 Frontend Setup

1. **Open the `frontend/` folder**
2. **Run `index.html` directly in your browser** (or use Live Server if needed)
3. **Ensure `api.js` and `auth.js` point to your backend:**
    ```
    const API_BASE = 'http://localhost:5000'; // or your Render URL
    ```

---

## 🤝 Author

**JL JOHN NICHOLAS** – [GitHub](https://github.com/your-github-username) <!-- Replace with actual GitHub link -->

---

