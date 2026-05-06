import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import './Navigation.css';

const Navigation = () => {
  const token = useAuthStore((state) => state.token);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    try {
      const encodedQuery = encodeURIComponent(searchQuery.trim());
      navigate(`/search?q=${encodedQuery}`);
      setIsMobileMenuOpen(false);
    } catch (err) {
      console.error('Error during search navigation:', err);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="header-container">
      <div className="logo">
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }} onClick={closeMobileMenu}>
          <h2>notesapp</h2>
        </Link>
      </div>

      <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
        <span className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}></span>
        <span className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}></span>
        <span className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}></span>
      </button>

      <div className={`nav-elements ${isMobileMenuOpen ? 'active' : ''}`}>
        <form className="search-bar" onSubmit={handleSearch}>
          <input 
            type="text" 
            placeholder="Search..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="search-btn">
            Search
          </button>
        </form>

        <div className="auth-buttons">
          {token ? (
            <>
              <Link to="/dashboard" className="btn log-in" onClick={closeMobileMenu}>Dashboard</Link>
              <Link to="/add-note" className="btn sign-in" onClick={closeMobileMenu}>Add Note</Link>
              <Link to="/signout" className="btn sign-in" onClick={closeMobileMenu}>Sign Out</Link>
            </>
          ) : (
            <>
              <Link to="/signin" className="btn log-in" onClick={closeMobileMenu}>Sign In</Link>
              <Link to="/register" className="btn sign-in" onClick={closeMobileMenu}>Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navigation;
