# Notes App

A full-stack note-taking application built with the MERN stack (MongoDB, Express, React, Node.js). It provides a secure and intuitive platform to capture, organize, and search your thoughts and ideas.

## Features

- **User Authentication:** Secure registration, login, and logout.
- **Note Management:** Create, view, update, and delete personal notes.
- **Organized Dashboard:** A clean interface to manage all your notes in one place.
- **Search Functionality:** Easily search through your notes to quickly find what you're looking for.
- **Responsive Design:** Optimized for both desktop and mobile views.

## Tech Stack

- **Frontend:** React 19, Vite, Zustand, React Router DOM, React Hook Form, Zod, React Hot Toast
- **Backend:** Node.js, Express, Mongoose, JSONWebToken, Lodash, Cors, Dotenv

## Project Structure

- `frontend/` - React frontend application providing the user interface.
- `backend/` - Node.js/Express backend API connected to MongoDB.

## Getting Started

### Prerequisites
- Node.js installed on your local machine.
- MongoDB running locally or a MongoDB Atlas connection string.

### Backend Setup
1. Navigate to the `backend/` directory: 
   ```bash
   cd backend
   ```
2. Install dependencies: 
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend/` directory and configure your environment variables (e.g., `MONGO_URI`, `JWT_SECRET`).
4. Start the backend development server: 
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the `frontend/` directory: 
   ```bash
   cd frontend
   ```
2. Install dependencies: 
   ```bash
   npm install
   ```
3. Start the Vite development server: 
   ```bash
   npm run dev
   ```

You are now ready to take notes! Open the frontend URL (usually `http://localhost:5173`) in your browser.