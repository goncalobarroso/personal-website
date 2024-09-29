import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import HomePage from './HomePage';
import AboutPage from './AboutPage';
import PatternPage from './PatternPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} /> {}
        <Route path="/about" element={<AboutPage />} /> {}
        <Route path="/create" element={<PatternPage />} /> {}
      </Routes>
    </Router>
  );
}

export default App;