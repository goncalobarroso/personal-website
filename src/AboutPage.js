import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './App.css';
import Logo from './Component/Logo';
import TopLink from './Component/TopLink';
import Footer from './Component/Footer';

export default function AboutPage() {
  const [elementsVisible, setElementsVisible] = useState(false);

  useEffect(() => {
    const delay = setTimeout(() => {
      setElementsVisible(true); // After 3 seconds, set elements to be visible
    }, 500);

    return () => {
      clearTimeout(delay); // Clear the timeout if the component unmounts
    };
  }, []);

  return (
    <div className='about'>
      <div className={`fade-in ${elementsVisible ? 'visible' : ''}`}>
        <Logo />
        <TopLink/>
        <Footer />
        <div className="centered-text-container">
          <div className="centered-text-content">
            <p>This website was designed and developed by me, <a href="https://www.linkedin.com/in/gon%C3%A7alo-barroso-156aa5246/" target="_blank" rel="noopener noreferrer">Gonçalo Marinho Barroso</a>!</p>
            <p>See more of my work <a href="https://github.com/goncalobarroso" target="_blank" rel="noopener noreferrer">here</a>.</p>
            <p>
              This is a place where you're invited to play with patterns :) go to {' '}
              <Link to="/create">create pattern</Link> to see more.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
