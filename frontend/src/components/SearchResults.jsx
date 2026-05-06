import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSearchParams, Link } from 'react-router-dom';
import './SearchResults.css';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) {
        setNotes([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      
      try {
        const response = await axios.get(`http://localhost:5000/api/notes/search?title=${encodeURIComponent(query)}`);
        setNotes(response.data);
      } catch (err) {
        console.error('Error fetching search results:', err);
        setError('Failed to fetch search results.');
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  if (loading) return <div className="search-results-center">Searching...</div>;
  if (error) return <div className="search-results-center error">{error}</div>;

  return (
    <div className="search-results-container">
      <h2>Search Results for "{query}"</h2>
      
      {notes.length === 0 ? (
        <div className="no-search-results">No notes found matching your query.</div>
      ) : (
        <div className="search-notes-list">
          {notes.map(note => (
            <div key={note._id} className="search-note-card">
              <Link to={`/notes/${note._id}`} className="search-note-title-link">
                <h4>{note.title}</h4>
              </Link>
              <span className="search-note-tag">{note.category}</span>
              <p className="search-note-excerpt">
                {(note.content || '').length > 150 ? `${note.content.substring(0, 150)}...` : note.content}
              </p>
              <div className="search-note-meta">
                Published: {new Date(note.created).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;