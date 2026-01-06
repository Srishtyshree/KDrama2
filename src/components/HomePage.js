import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {motion} from 'framer-motion';
import {getPopularKdramas, getAllGenres} from '../services/api';
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
    <div className="home-page">
      <div className="container">
        <motion.section
          className="hero-section"
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          transition={{duration: 1}}
        >
          <div className="hero-content">
            <motion.h1
              className="hero-title"
              initial={{y: 30, opacity: 0}}
              animate={{y: 0, opacity: 1}}
              transition={{delay: 0.2, duration: 0.8}}
            >
              Discover Your Next K-Drama Obsession
            </motion.h1>
            <motion.p
              className="hero-description"
              initial={{y: 30, opacity: 0}}
              animate={{y: 0, opacity: 1}}
              transition={{delay: 0.4, duration: 0.8}}
            >
              Explore the best Korean dramas across various genres, from heart-fluttering romances to thrilling mysteries.
            </motion.p>
          </div>
        </motion.section>

        <motion.section
          className="section"
          initial={{opacity: 0, y: 40}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true}}
          transition={{duration: 0.8}}
        >
          <h2 className="section-title">Popular K-Dramas</h2>
          {popularDramas.length > 0 ? (
            <motion.div
              className="drama-grid"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{once: true}}
            >
              {popularDramas.slice(0, 10).map(drama => (
                <motion.div key={drama.id} variants={itemVariants}>
                  <DramaCard drama={drama} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <p>No dramas found. Please try again later.</p>
          )}
        </motion.section>

        <motion.section
          className="section"
          initial={{opacity: 0, y: 40}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true}}
          transition={{duration: 0.8}}
        >
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
        </motion.section>

        <motion.section
          className="section"
          initial={{opacity: 0, y: 40}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true}}
          transition={{duration: 0.8}}
        >
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
        </motion.section>
      </div>
    </div>
  );
};

export default HomePage;