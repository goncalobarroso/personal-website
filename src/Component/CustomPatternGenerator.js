import React, { useEffect, useRef } from 'react';
import '../App.css';
// Importing the pattern images from different folders
import pattern1_1 from './patterns/pattern1/pattern1.png';
import pattern1_2 from './patterns/pattern1/pattern2.png';
import pattern1_3 from './patterns/pattern1/pattern3.png';
import pattern1_4 from './patterns/pattern1/pattern4.png';

import pattern2_1 from './patterns/pattern2/pattern1.png';
import pattern2_2 from './patterns/pattern2/pattern2.png';
import pattern2_3 from './patterns/pattern2/pattern3.png';
import pattern2_4 from './patterns/pattern2/pattern4.png';

import pattern3_1 from './patterns/pattern3/pattern1.png';
import pattern3_2 from './patterns/pattern3/pattern2.png';
import pattern3_3 from './patterns/pattern3/pattern3.png';
import pattern3_4 from './patterns/pattern3/pattern4.png';

import pattern4_1 from './patterns/pattern4/pattern1.png';
import pattern4_2 from './patterns/pattern4/pattern2.png';
import pattern4_3 from './patterns/pattern4/pattern3.png';
import pattern4_4 from './patterns/pattern4/pattern4.png';

const CustomPatternGenerator = ({ imageArray }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    let folderNumber = 0;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const numRows = 15; // Number of rows
    const numCols = 30; // Number of columns
    const squareSize = 75; // Size of each square

    canvas.width = numCols * squareSize;
    canvas.height = numRows * squareSize;

    // Function to draw a square image with a specific rotation
    function drawSquareImage(x, y, size, rotation, imageUrl) {
      const img = new Image();
      img.src = imageUrl;
      img.onload = () => {
        context.save();
        context.translate(x, y);
        context.rotate((rotation * Math.PI) / 180); // Convert degrees to radians
        context.drawImage(img, -size / 2, -size / 2, size, size);
        context.restore();
      };
    }

    // Function to save a number to localStorage
    function saveNumberToLocalStorage(number) {
      localStorage.setItem('myNumber', number);  // Storing the number (it will be converted to a string)
    }

    // Function to get the number from localStorage
    function getNumberFromLocalStorage() {
      const savedNumber = localStorage.getItem('myNumber');
      if (savedNumber !== null) {  // Check if the number exists in localStorage
          const parsedNumber = parseInt(savedNumber, 10);  // Convert the stored string back to a number
          return parsedNumber;
      } else {
          return null;  // Return null if nothing is found
      }
    }

    // Define arrays of patterns (images) for each folder
    const patternFolders = [
      [pattern1_1, pattern1_2, pattern1_3, pattern1_4],
      [pattern2_1, pattern2_2, pattern2_3, pattern2_4],
      [pattern3_1, pattern3_2, pattern3_3, pattern3_4],
      [pattern4_1, pattern4_2, pattern4_3, pattern4_4],
    ];

    const previousFolderNumber = getNumberFromLocalStorage();
    if(previousFolderNumber !== null){
      folderNumber = (previousFolderNumber+1)%4;
    }
    saveNumberToLocalStorage(folderNumber);

    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
        const x = col * squareSize + squareSize / 2;
        const y = row * squareSize + squareSize / 2;
        const rotation = Math.floor(Math.random() * 4) * 90; // Random rotation in 90-degree increments
        const randomValue = Math.random(); // Random value between 0 and 1

        // Use the provided imageArray if available, otherwise use the default images from the selected folder
        const imageUrl = imageArray && imageArray.length >= 1
          ? imageArray[Math.floor(randomValue * imageArray.length)]
          : getRandomPatternFromFolder(randomValue, patternFolders[folderNumber]);

        drawSquareImage(x, y, squareSize, rotation, imageUrl);
      }
    }
  }, [imageArray]);

  // Function to get a random image URL from the selected folder based on the random value
  function getRandomPatternFromFolder(randomValue, folder) {
    if (randomValue < 0.25) {
      return folder[0];
    } else if (randomValue < 0.50) {
      return folder[1];
    } else if (randomValue < 0.75) {
      return folder[2];
    } else {
      return folder[3];
    }
  }

  return <canvas ref={canvasRef} className='background'></canvas>;
};

export default CustomPatternGenerator;