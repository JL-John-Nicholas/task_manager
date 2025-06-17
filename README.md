# 📝 Task Manager App

A full-stack web application for managing personal or team tasks with user authentication, Kanban-style status tracking (To Do, In Progress, Done), due dates, priorities, comments, and activity logs.

---

🌐 **Live Demo:** [task-manager-caw.netlify.app](https://task-manager-caw.netlify.app)

## 🚀 Features

- 🔐 User registration and login (JWT authentication)
- 📝 Create tasks with priority and due date
- 🧭 Track task status (To Do, In Progress, Done)
- 💬 Add and view comments on tasks
- 🕓 View activity logs for task changes
- 🎨 Responsive, clean UI with Vanilla JS and CSS
- ⚙️ RESTful API using Node.js, Express, and MongoDB

---

## 🛠️ Tech Stack

| Frontend       | Backend             | Database   |
|----------------|----------------------|------------|
| HTML, CSS, JS  | Node.js, Express.js  | MongoDB    |
| Fetch API      | JWT, Mongoose        | Mongoose ODM |

---

## ⚙️ Setup Instructions

### 🔧 Backend Setup (Node.js + MongoDB)

```bash
cd backend
npm install



Create a .env file in the backend folder:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000


Then start the backend server:

node server.js
# or
npx nodemon server.js
