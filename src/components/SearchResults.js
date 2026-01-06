import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { searchKdramas } from '../services/api';
import DramaCard from './DramaCard';
import './SearchResults.css';

const SearchResults = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q');
  
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) {
        setResults([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await searchKdramas(query);
        setResults(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch search results. Please try again later.');
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="search-results">
      <div className="container">
        <div className="search-header">
          <h1 className="search-title">
            {results.length > 0 
              ? `Search Results for "${query}"` 
              : `No results found for "${query}"`}
          </h1>
          <p className="results-count">
            {results.length} {results.length === 1 ? 'result' : 'results'} found
          </p>
        </div>

        {results.length > 0 ? (
          <div className="drama-grid">
            {results.map(drama => (
              <DramaCard key={drama.id} drama={drama} />
            ))}
          </div>
        ) : (
          <div className="no-results">
            <p>No K-dramas found matching your search.</p>
            <p>Try different keywords or browse our recommendations.</p>
            <Link to="/" className="back-to-home">
              Back to Home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;