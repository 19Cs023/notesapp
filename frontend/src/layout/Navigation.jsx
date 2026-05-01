import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import './Navigation.css';

const Navigation = () => {
  const token = useAuthStore((state) => state.token);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    try {
      const encodedQuery = encodeURIComponent(searchQuery.trim());
      navigate(`/search?q=${encodedQuery}`);
    } catch (err) {
      console.error('Error during search navigation:', err);
    }
  };

  return (
    <header className="header-container">
      <div className="logo">
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <h2>MERN Skeleton</h2>
        </Link>
      </div>

      <form className="search-bar" onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center', margin: '0 20px', flex: 1, justifyContent: 'center' }}>
        <input 
          type="text" 
          placeholder="Search..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ padding: '8px 12px', borderRadius: '4px', border: '1px solid #ccc', width: '100%', maxWidth: '400px' }}
        />
        <button type="submit" style={{ padding: '8px 15px', marginLeft: '8px', borderRadius: '4px', border: 'none', backgroundColor: '#007bff', color: 'white', cursor: 'pointer' }}>
          Search
        </button>
      </form>

      <div className="auth-buttons">
        {token ? (
          <>
            <Link to="/dashboard" className="btn log-in">Dashboard</Link>
            <Link to="/profile" className="btn log-in">Profile</Link>
            <Link to="/signout" className="btn sign-in">Sign Out</Link>
          </>
        ) : (
          <>
            <Link to="/signin" className="btn log-in">Sign In</Link>
            <Link to="/register" className="btn sign-in">Sign Up</Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Navigation;
