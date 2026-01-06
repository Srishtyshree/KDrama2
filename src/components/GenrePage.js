import React, {useState, useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';
import {motion} from 'framer-motion';
import {getKdramasByGenre} from '../services/api';
import DramaCard from './DramaCard';
import './GenrePage.css';

const GenrePage = () => {
  const {genre} = useParams();
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
    <div className="genre-page">
      <div className="container">
        <motion.div
          className="genre-header"
          initial={{opacity: 0, y: -20}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.5}}
        >
          <h1 className="genre-title">{genre} K-Dramas</h1>
          <p className="genre-description">
            Explore the best Korean dramas in the {genre} genre
          </p>
        </motion.div>

        {dramas.length > 0 ? (
          <motion.div
            className="drama-grid"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {dramas.map(drama => (
              <motion.div key={drama.id} variants={itemVariants}>
                <DramaCard drama={drama} />
              </motion.div>
            ))}
          </motion.div>
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