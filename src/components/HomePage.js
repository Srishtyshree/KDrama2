import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {getCuratedKdramas, getAllGenres, getKdramasByYear} from '../services/api';
import {motion} from 'framer-motion';
import './HomePage.css';
import DramaCard from './DramaCard';

const HomePage = () => {
  const [popularDramas, setPopularDramas] = useState([]);
  const [genres, setGenres] = useState([]);
  const [dramas2016ByGenre, setDramas2016ByGenre] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [dramasData, genresData, dramas2016Data] = await Promise.all([
          getCuratedKdramas(),
          getAllGenres(),
          getKdramasByYear(2016)
        ]);

        setPopularDramas(dramasData);
        setGenres(genresData);

        // Group 2016 dramas by genre and limit to 5 each
        const grouped = dramas2016Data.reduce((acc, drama) => {
          drama.genres.forEach(genre => {
            if (!acc[genre]) acc[genre] = [];
            if (acc[genre].length < 5) {
              acc[genre].push(drama);
            }
          });
          return acc;
        }, {});
        setDramas2016ByGenre(grouped);

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
        <motion.section
          className="hero-section"
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.8}}
        >
          <video
            className="hero-video"
            autoPlay
            loop
            muted
            playsInline
            poster="https://images.unsplash.com/photo-1514565131-fce0801e5785?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-city-lights-at-night-viewed-from-above-4481-large.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <motion.div
            className="hero-content"
            initial={{opacity: 0, x: -50}}
            animate={{opacity: 1, x: 0}}
            transition={{duration: 0.8, delay: 0.2}}
          >
            <h1 className="hero-title">Discover Your Next K-Drama Obsession</h1>
            <p className="hero-description">
              Explore the best Korean dramas across various genres, from heart-fluttering romances to thrilling mysteries.
            </p>
          </motion.div>
        </motion.section>

        <motion.section
          className="section"
          initial={{opacity: 0}}
          whileInView={{opacity: 1}}
          viewport={{once: true}}
          transition={{duration: 0.8}}
        >
          <h2 className="section-title">Must-Watch K-Dramas</h2>
          {popularDramas.length > 0 ? (
            <div className="drama-grid">
              {popularDramas.map((drama, index) => (
                <motion.div
                  key={drama.id}
                  initial={{opacity: 0, y: 20}}
                  whileInView={{opacity: 1, y: 0}}
                  viewport={{once: true}}
                  transition={{duration: 0.5, delay: index * 0.1}}
                >
                  <DramaCard drama={drama} />
                </motion.div>
              ))}
            </div>
          ) : (
            <p>No dramas found. Please try again later.</p>
          )}
        </motion.section>

        {/* 2016 Classics Section */}
        <motion.section
          className="section"
          initial={{opacity: 0}}
          whileInView={{opacity: 1}}
          viewport={{once: true}}
          transition={{duration: 0.8}}
        >
          <h2 className="section-title">2016 Classics by Genre</h2>
          {Object.keys(dramas2016ByGenre).length > 0 ? (
            Object.entries(dramas2016ByGenre).map(([genre, dramas], gIndex) => (
              <div key={genre} className="genre-section">
                <h3 className="genre-subtitle">{genre}</h3>
                <div className="drama-grid">
                  {dramas.map((drama, dIndex) => (
                    <motion.div
                      key={drama.id}
                      initial={{opacity: 0, scale: 0.9}}
                      whileInView={{opacity: 1, scale: 1}}
                      viewport={{once: true}}
                      transition={{duration: 0.4, delay: dIndex * 0.1}}
                    >
                      <DramaCard drama={drama} />
                    </motion.div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p>No 2016 dramas found for the current selection.</p>
          )}
        </motion.section>

        <motion.section
          className="section"
          initial={{opacity: 0}}
          whileInView={{opacity: 1}}
          viewport={{once: true}}
          transition={{duration: 0.8}}
        >
          <h2 className="section-title">Browse by Genre</h2>
          <div className="genre-list">
            {genres.map((genre, index) => (
              <motion.div
                key={genre}
                initial={{opacity: 0, scale: 0.9}}
                whileInView={{opacity: 1, scale: 1}}
                viewport={{once: true}}
                transition={{duration: 0.3, delay: index * 0.05}}
              >
                <Link
                  to={`/genre/${genre}`}
                  className="genre-item"
                >
                  {genre}
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          className="section"
          initial={{opacity: 0}}
          whileInView={{opacity: 1}}
          viewport={{once: true}}
          transition={{duration: 0.8}}
        >
          <h2 className="section-title">Why K-Dramas?</h2>
          <div className="features-grid">
            {[
              {title: "Compelling Storytelling", desc: "K-dramas are known for their well-crafted narratives and character development."},
              {title: "Limited Episodes", desc: "Most K-dramas have a set number of episodes, providing a complete story arc."},
              {title: "Cultural Insights", desc: "Gain insights into Korean culture, traditions, and societal norms."},
              {title: "Genre Diversity", desc: "From romance to thriller, historical to fantasy, there's a K-drama for everyone."}
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="feature-item"
                initial={{opacity: 0, y: 20}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true}}
                transition={{duration: 0.5, delay: index * 0.1}}
                whileHover={{y: -10, borderColor: "#FACC15"}}
              >
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default HomePage;