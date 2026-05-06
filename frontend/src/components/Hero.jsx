import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';
import takingNotesImg from '../assets/taking-notes.avif';

function Hero() {
  return (
    <section className="hero-container">
      <div className="hero-content">
        <h1 className="hero-title">Notes app</h1>
        <p className="hero-subtitle">
          notesapp is a powerful note-taking application built with the MERN stack. It allows you to create, manage, and organize your notes seamlessly. Whether you're jotting down ideas, making to-do lists, or keeping track of important information, notesapp has got you covered.
        </p>
        <p className="hero-subtitle">
          Get started today and never miss an idea again!
        </p>
        <div className="hero-buttons">
          <Link to="/register" className="btn-primary">Register</Link>
          <Link to="/signin" className="btn-secondary">Sign In</Link>
        </div>
      </div>
      <div className="hero-image">
        <img src={takingNotesImg} alt="Taking Notes" className="hero-illustration" />
      </div>
    </section>
  );
}

export default Hero;