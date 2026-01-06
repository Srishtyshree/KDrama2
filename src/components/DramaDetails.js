import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getDramaDetails } from '../services/api';
import './DramaDetails.css';

const DramaDetails = () => {
  const { id } = useParams();
  const [drama, setDrama] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDramaDetails = async () => {
      try {
        setLoading(true);
        const data = await getDramaDetails(id);
        setDrama(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch drama details. Please try again later.');
        setLoading(false);
      }
    };

    fetchDramaDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error || !drama) {
    return (
      <div className="container">
        <div className="error-message">
          {error || 'Drama not found.'}
          <Link to="/" className="back-link">Back to Home</Link>
        </div>
      </div>
    );
  }

  // Remove HTML tags from summary
  const cleanSummary = drama.summary 
    ? drama.summary.replace(/<[^>]*>/g, '') 
    : 'No summary available.';

  return (
    <div className="drama-details">
      <div className="container">
        <div className="drama-details-header">
          <div className="drama-poster">
            {drama.image ? (
              <img 
                src={drama.image.original || drama.image.medium} 
                alt={drama.name} 
              />
            ) : (
              <div className="no-poster">No Image Available</div>
            )}
          </div>
          
          <div className="drama-info">
            <h1 className="drama-title">{drama.name}</h1>
            
            {drama.premiered && (
              <div className="drama-year">
                {new Date(drama.premiered).getFullYear()}
              </div>
            )}
            
            {drama.rating && drama.rating.average && (
              <div className="drama-rating">
                <span className="rating-star">★</span> 
                {Number(drama.rating.average).toFixed(1)}/10
              </div>
            )}
            
            {drama.genres && drama.genres.length > 0 && (
              <div className="drama-genres">
                {drama.genres.map(genre => (
                  <Link 
                    key={genre} 
                    to={`/genre/${genre}`} 
                    className="genre-tag"
                  >
                    {genre}
                  </Link>
                ))}
              </div>
            )}
            
            {drama.network && (
              <div className="drama-network">
                <span className="info-label">Network:</span> {drama.network.name}
              </div>
            )}
            
            {drama.status && (
              <div className="drama-status">
                <span className="info-label">Status:</span> {drama.status}
              </div>
            )}
            
            <div className="drama-summary">
              <h3>Summary</h3>
              <p>{cleanSummary}</p>
            </div>
            
            {drama.officialSite && (
              <div className="drama-links">
                <a 
                  href={drama.officialSite} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="official-site-link"
                >
                  Official Website
                </a>
              </div>
            )}
          </div>
        </div>
        
        {drama.cast && drama.cast.length > 0 && (
          <div className="drama-cast">
            <h2 className="section-title">Cast</h2>
            <div className="cast-list">
              {drama.cast.slice(0, 6).map(castMember => (
                <div key={castMember.person.id} className="cast-item">
                  <div className="cast-image">
                    {castMember.person.image ? (
                      <img 
                        src={castMember.person.image.medium} 
                        alt={castMember.person.name} 
                      />
                    ) : (
                      <div className="no-image">No Image</div>
                    )}
                  </div>
                  <div className="cast-info">
                    <div className="cast-name">{castMember.person.name}</div>
                    {castMember.character && (
                      <div className="cast-character">as {castMember.character.name}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="back-navigation">
          <Link to="/" className="back-button">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DramaDetails;