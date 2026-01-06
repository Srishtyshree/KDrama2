import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <header className="header">
      <div className="container header-container">
        <div className="header-left">
          <Link to="/" className="logo">
            <h1>K-Drama Finder</h1>
          </Link>
        </div>

        <div className="header-center">
          <nav className="main-nav">
            <ul className="nav-list">
              <li className="nav-item">
                <Link to="/" className="nav-link">Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/genre/Romance" className="nav-link">Romance</Link>
              </li>
              <li className="nav-item">
                <Link to="/genre/Drama" className="nav-link">Drama</Link>
              </li>
              <li className="nav-item">
                <Link to="/genre/Comedy" className="nav-link">Comedy</Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="header-right">
          <form className="search-form" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-button">
              Search
            </button>
          </form>
        </div>
      </div>
    </header>
  );
};

export default Header;