import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getKdramasByGenre } from '../services/api';
import DramaCard from './DramaCard';
import './GenrePage.css';

const GenrePage = () => {
  const { genre } = useParams();
  const [dramas, setDramas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDramas = async () => {
      try {
        setLoading(true);
        const data = await getKdramasByGenre(genre);
        setDramas(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch dramas. Please try again later.');
        setLoading(false);
      }
    };

    fetchDramas();
  }, [genre]);

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
    <div className="genre-page">
      <div className="container">
        <div className="genre-header">
          <h1 className="genre-title">{genre} K-Dramas</h1>
          <p className="genre-description">
            Explore the best Korean dramas in the {genre} genre
          </p>
        </div>

        {dramas.length > 0 ? (
          <div className="drama-grid">
            {dramas.map(drama => (
              <DramaCard key={drama.id} drama={drama} />
            ))}
          </div>
        ) : (
          <div className="no-dramas">
            <p>No K-dramas found in the {genre} genre.</p>
            <Link to="/" className="back-to-home">
              Back to Home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default GenrePage;