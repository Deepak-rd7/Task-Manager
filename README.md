
# Task Manager

Task Manager is a web application that helps users manage their tasks efficiently with priorities and deadlines. The application is built using React for the frontend and Node.js with Express for the backend. It also uses MongoDB for data storage.

## Features

- User Registration and Login
- Add, Update, and Delete Tasks
- Set Task Priorities (High, Medium, Low)
- Set Task Due Dates
- User Authentication and Authorization
- Responsive Design

## Technologies Used

### Frontend

- React
- Vite
- Tailwind CSS
- Axios
- React Router
- React Fox Toast
- Lucide React

### Backend

- Node.js
- Express
- MongoDB
- Mongoose
- JWT (JSON Web Token)
- Bcrypt.js
- Cookie Parser
- CORS

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository:

```sh
git clone https://github.com/yourusername/task-manager.git
cd task-manager
```

2. Install dependencies for both client and server:

```sh
cd client
npm install
cd ../server
npm install
```

3. Create a `.env` file in the server directory and add your MongoDB URI and JWT secret key:

```env
MONGO_URI=your_mongodb_uri
JWT_SECRET_KEY=your_jwt_secret_key
PORT=3000
```

### Running the 

Application1. Start the backend server:

```sh
cd server
npm start
```

2. Start the frontend development server:

```sh
cd client
npm run dev
```

