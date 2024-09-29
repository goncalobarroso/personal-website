import React, { useState, useEffect } from 'react';

import './App.css';
import PatternDraw from './Component/PatternDraw';
import Logo from './Component/Logo';
import TopLink from './Component/TopLink';
import Footer from './Component/Footer';

export default function PatternPage() {
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
    <div className='criar'>
        <div className={`fade-in ${elementsVisible ? 'visible' : ''}`}>
            <div className="custom-pattern">
                <PatternDraw
                  width={500}
                  height={500}
                />
            </div>
            <Logo />
            <TopLink/>
            <Footer />
        </div>
    </div>
  );
}