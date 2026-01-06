import React from 'react';
import {Routes, Route} from 'react-router-dom';
import './App.css';

// Components
import Header from './components/Header';
import Footer from './components/Footer';

// Pages
import HomePage from './components/HomePage';
import DramaDetails from './components/DramaDetails';
import SearchResults from './components/SearchResults';
import GenrePage from './components/GenrePage';
import NotFound from './components/NotFound';

function App() {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/drama/:id" element={<DramaDetails />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/genre/:genre" element={<GenrePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;