import React, { useEffect, useRef } from 'react';
import '../App.css';

const CustomPatternGenerator = ({ imageArray }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
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

    // Generate the grid of squares with random rotations and images
    const numberOfFolders = 4; //UPDATE THE NUMBER OF FOLDERS HERE TODO: MAKE MORE PATTERNS
    const folderNumber = Math.floor(Math.random() * numberOfFolders) + 1;
    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
        const x = col * squareSize + squareSize / 2;
        const y = row * squareSize + squareSize / 2;
        const rotation = Math.floor(Math.random() * 4) * 90; // Random rotation in 90-degree increments
        const randomValue = Math.random(); // Random value between 0 and 1

        // Use the provided imageArray if available, otherwise use default images
        const imageUrl = imageArray && imageArray.length >= 1
          ? imageArray[Math.floor(randomValue * imageArray.length)]
          : getDefaultImageUrl(randomValue, folderNumber);

        drawSquareImage(x, y, squareSize, rotation, imageUrl);
      }
    }
  }, [imageArray]);

  // Function to get a default image URL based on random value
  function getDefaultImageUrl(randomValue, folderNumber) {
    const defaultImageUrls = [
      `${process.env.PUBLIC_URL}/patterns/pattern${folderNumber}/pattern1.png`,
      `${process.env.PUBLIC_URL}/patterns/pattern${folderNumber}/pattern2.png`,
      `${process.env.PUBLIC_URL}/patterns/pattern${folderNumber}/pattern3.png`,
      `${process.env.PUBLIC_URL}/patterns/pattern${folderNumber}/pattern4.png`,
    ];

    if (randomValue < 0.25) {
      return defaultImageUrls[0];
    } else if (randomValue < 0.50) {
      return defaultImageUrls[1];
    } else if (randomValue < 0.75) {
      return defaultImageUrls[2];
    } else {
      return defaultImageUrls[3];
    }
  }

  return <canvas ref={canvasRef} className='background'></canvas>;
};

export default CustomPatternGenerator;
