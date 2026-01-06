import React, {useState, useEffect} from 'react';
import {useLocation, Link} from 'react-router-dom';
import {motion} from 'framer-motion';
import {searchKdramas} from '../services/api';
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

  const containerVariants = {
    hidden: {opacity: 0},
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: {y: 20, opacity: 0},
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="search-results">
      <div className="container">
        <motion.div
          className="search-header"
          initial={{opacity: 0, y: -20}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.5}}
        >
          <h1 className="search-title">
            {results.length > 0
              ? `Search Results for "${query}"`
              : `No results found for "${query}"`}
          </h1>
          <p className="results-count">
            {results.length} {results.length === 1 ? 'result' : 'results'} found
          </p>
        </motion.div>

        {results.length > 0 ? (
          <motion.div
            className="drama-grid"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {results.map(drama => (
              <motion.div key={drama.id} variants={itemVariants}>
                <DramaCard drama={drama} />
              </motion.div>
            ))}
          </motion.div>
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