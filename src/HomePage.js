import React, { useState, useEffect } from 'react';
import CustomPatternGenerator from './Component/CustomPatternGenerator';
import './App.css';
import Logo from './Component/Logo';
import TopLink from './Component/TopLink';
import Footer from './Component/Footer';

export default function HomePage() {
  const [elementsVisible, setElementsVisible] = useState(false);
  const savedDrawings = JSON.parse(localStorage.getItem('drawings')) || [];

  useEffect(() => {

    const delay = setTimeout(() => {
      setElementsVisible(true);
    }, 500); // Adjust ms it takes to load

    return () => {
      clearTimeout(delay);
    };
  }, []);

  return (
    <div className='home'>
      <div className={`fade-in ${elementsVisible ? 'visible' : ''}`}>
        <CustomPatternGenerator imageArray={savedDrawings} />
        <Logo />
        <TopLink />
        <Footer />
      </div>
      <div className='background-home'></div>
    </div>
  );
}
