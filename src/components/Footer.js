import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-section">
          <h3 className="footer-title">K-Drama Finder</h3>
          <p className="footer-description">
            Discover your next favorite Korean drama with our curated recommendations.
          </p>
        </div>
        
        <div className="footer-section">
          <h3 className="footer-title">Quick Links</h3>
          <ul className="footer-links">
            <li><a href="/">Home</a></li>
            <li><a href="/genre/Romance">Romance</a></li>
            <li><a href="/genre/Drama">Drama</a></li>
            <li><a href="/genre/Comedy">Comedy</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3 className="footer-title">About</h3>
          <p className="footer-description">
            K-Drama Finder is a platform for Korean drama enthusiasts to discover
            and explore the best K-dramas across various genres.
          </p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="container">
          <p className="copyright">
            &copy; {new Date().getFullYear()} K-Drama Finder. All rights reserved.
          </p>
          <p className="attribution">
            Data provided by <a href="https://www.tvmaze.com/api" target="_blank" rel="noopener noreferrer">TVMaze API</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;