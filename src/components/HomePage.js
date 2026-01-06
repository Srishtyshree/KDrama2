import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPopularKdramas, getAllGenres } from '../services/api';
import './HomePage.css';
import DramaCard from './DramaCard';

const HomePage = () => {
  const [popularDramas, setPopularDramas] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [dramasData, genresData] = await Promise.all([
          getPopularKdramas(),
          getAllGenres()
        ]);
        
        setPopularDramas(dramasData);
        setGenres(genresData);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch data. Please try again later.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
    <div className="home-page">
      <div className="container">
        <section className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">Discover Your Next K-Drama Obsession</h1>
            <p className="hero-description">
              Explore the best Korean dramas across various genres, from heart-fluttering romances to thrilling mysteries.
            </p>
          </div>
        </section>

        <section className="section">
          <h2 className="section-title">Popular K-Dramas</h2>
          {popularDramas.length > 0 ? (
            <div className="drama-grid">
              {popularDramas.slice(0, 10).map(drama => (
                <DramaCard key={drama.id} drama={drama} />
              ))}
            </div>
          ) : (
            <p>No dramas found. Please try again later.</p>
          )}
        </section>

        <section className="section">
          <h2 className="section-title">Browse by Genre</h2>
          <div className="genre-list">
            {genres.map(genre => (
              <Link 
                to={`/genre/${genre}`} 
                key={genre} 
                className="genre-item"
              >
                {genre}
              </Link>
            ))}
          </div>
        </section>

        <section className="section">
          <h2 className="section-title">Why K-Dramas?</h2>
          <div className="features-grid">
            <div className="feature-item">
              <h3>Compelling Storytelling</h3>
              <p>K-dramas are known for their well-crafted narratives and character development.</p>
            </div>
            <div className="feature-item">
              <h3>Limited Episodes</h3>
              <p>Most K-dramas have a set number of episodes, providing a complete story arc.</p>
            </div>
            <div className="feature-item">
              <h3>Cultural Insights</h3>
              <p>Gain insights into Korean culture, traditions, and societal norms.</p>
            </div>
            <div className="feature-item">
              <h3>Genre Diversity</h3>
              <p>From romance to thriller, historical to fantasy, there's a K-drama for everyone.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;