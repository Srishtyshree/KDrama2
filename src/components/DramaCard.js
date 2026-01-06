import React from 'react';
import {Link} from 'react-router-dom';
import {motion} from 'framer-motion';
import './DramaCard.css';

const DramaCard = ({drama}) => {
  // Default image if none is available
  const imageUrl = drama.image
    ? drama.image.medium || drama.image.original
    : 'https://via.placeholder.com/210x295?text=No+Image';

  // Format the rating to show only one decimal place if needed
  const rating = drama.rating && drama.rating.average
    ? Number(drama.rating.average).toFixed(1)
    : 'N/A';

  // Get the year from the premiere date if available
  const year = drama.premiered
    ? new Date(drama.premiered).getFullYear()
    : '';

  return (
    <motion.div
      whileHover={{scale: 1.05, y: -5}}
      transition={{type: "spring", stiffness: 300}}
    >
      <Link to={`/drama/${drama.id}`} className="drama-card">
        <div className="drama-card-image-container">
          <img
            src={imageUrl}
            alt={drama.name}
            className="drama-card-image"
          />
          {rating !== 'N/A' && (
            <div className="drama-card-rating">
              <span>★ {rating}</span>
            </div>
          )}
        </div>
        <div className="drama-card-content">
          <h3 className="drama-card-title">{drama.name}</h3>
          <div className="drama-card-info">
            {year && <span className="drama-card-year">{year}</span>}
            {drama.genres && drama.genres.length > 0 && (
              <span className="drama-card-genre">{drama.genres[0]}</span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default DramaCard;