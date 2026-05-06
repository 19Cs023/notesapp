import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layout
import Navigation from './layout/Navigation';
import Footer from './layout/Footer';

// Components
import Hero from './components/Hero';
import SignIn from './components/SignIn';
import Register from './components/Register';
import SignOut from './components/SignOut';
import SearchResults from './components/SearchResults';
import AddNotes from './components/AddNotes';

// Pages
import DashBoard from './pages/DashBoard';
import NotesCard from './pages/NotesCard';


import './App.css';

function App() {
  return (
    <Router>
      <div className="App" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navigation />

        <main className="main-content" style={{ flex: 1 }}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Hero />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/register" element={<Register />} />
            <Route path="/signout" element={<SignOut />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/add-note" element={<AddNotes />} />
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="/note/:id" element={<NotesCard />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
