import { useOnDraw } from './Hooks';
import { useState, useEffect } from 'react';


const PatternDraw = ({ width, height }) => {
    const { setCanvasRef, onCanvasMouseDown } = useOnDraw(onDraw);
    const [currentColor, setCurrentColor] = useState('#ff312e');
    const [drawings, setDrawings] = useState([]); // State to store drawings

    useEffect(() => {
        // Load saved drawings from localStorage when the component mounts
        const savedDrawings = JSON.parse(localStorage.getItem('drawings'));
        if (savedDrawings) {
            setDrawings(savedDrawings);
        }

        clearCanvas();
    }, []);

    function onDraw(ctx, point, prevPoint) {
        drawLine(prevPoint, point, ctx, currentColor, 30);
    }

    function drawLine(start, end, ctx, color, width) {
        start = start ?? end;
        ctx.beginPath();
        ctx.lineWidth = width;
        ctx.strokeStyle = color;
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.stroke();

        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(start.x, start.y, 2, 0, 2 * Math.PI);
        ctx.fill();
    }

    function clearCanvas() {
        const canvas = document.querySelector('canvas');
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#fffffc'; // Set to white
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    function changeColor(newColor) {
        setCurrentColor(newColor);
    }

    function deleteDrawing(index) {
        // Remove the drawing at the specified index from the array
        const updatedDrawings = [...drawings];
        updatedDrawings.splice(index, 1);
        setDrawings(updatedDrawings);

        // Update localStorage to reflect the changes
        localStorage.setItem('drawings', JSON.stringify(updatedDrawings));
    }

    function saveDrawing() {
        const canvas = document.querySelector('canvas'); // Get the canvas element

        if (canvas) {
            const svgData = canvas.toDataURL('image/svg+xml');
            const updatedDrawings = [...drawings, svgData];

            if (updatedDrawings.length > 4) {
                // If there are more than 2 drawings, remove the oldest one
                updatedDrawings.shift();
            }

            setDrawings(updatedDrawings);

            // Save the updated drawings to localStorage
            localStorage.setItem('drawings', JSON.stringify(updatedDrawings));

            clearCanvas();
        }
    }

    function isCanvasBlank(canvas) {
        const context = canvas.getContext('2d');
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height).data;
      
        // Check if every pixel is equal to the color #fffffc
        for (let i = 0; i < imageData.length; i += 4) {
          const red = imageData[i];
          const green = imageData[i + 1];
          const blue = imageData[i + 2];
          const alpha = imageData[i + 3];
      
          if (red !== 255 || green !== 255 || blue !== 252 || alpha !== 255) {
            return false;
          }
        }
      
        return true;
    }

    function clearArray(){
        setDrawings([]);
        localStorage.setItem('drawings', JSON.stringify([]));
    }

    function done(){
        const canvas = document.querySelector('canvas'); // Get the canvas element
        if(!isCanvasBlank(canvas)){
            saveDrawing();
            console.log("is blank!");
        } 
        window.location.href = 'https://goncalobarroso.github.io/personal-website/';
    }

    return (
        <div style={{ display: 'flex'}}> 
            <div>
                <canvas
                    width={width}
                    height={height}
                    onMouseDown={onCanvasMouseDown}
                    ref={setCanvasRef}
                />
                <div className='canvas-button-container'>
                <button className="canvas-button" onClick={saveDrawing}>
                        add pattern
                    </button>
                    <button className="canvas-button" onClick={clearCanvas}>
                        clear canvas
                    </button>               
                </div>
                <div className='canvas-button-container'>
                    <button className="canvas-button" style={{color: currentColor === '#ff312e' ?  '#fffffc' : '#111111', backgroundColor: currentColor === '#ff312e' ?  '#ff312e' : '#fffffc'}} onClick={() => changeColor('#ff312e')}>
                        red
                    </button>
                    <button className="canvas-button" style={{color: currentColor === '#688e26' ?  '#fffffc' : '#111111', backgroundColor: currentColor === '#688e26' ?  '#688e26' : '#fffffc'}} onClick={() => changeColor('#688e26')}>
                        green
                    </button>
                    <button className="canvas-button" style={{color: currentColor === '#008dd5' ?  '#fffffc' : '#111111', backgroundColor: currentColor === '#008dd5' ?  '#008dd5' : '#fffffc'}} onClick={() => changeColor('#008dd5')}>
                        blue
                    </button>
                    <button className="canvas-button" style={{color: currentColor === '#111111' ?  '#fffffc' : '#111111', backgroundColor: currentColor === '#111111' ?  '#111111' : '#fffffc'}} onClick={() => changeColor('#111111')}>
                        black
                    </button>
                    <button className="canvas-button" style={{color: currentColor === '#fffffc' ?  '#fffffc' : '#111111', backgroundColor: currentColor === '#fffffc' ?  '#111111' : '#fffffc'}} onClick={() => changeColor('#fffffc')}>
                        eraser
                    </button>
                </div>
                <div className='canvas-button-container'>
                    <button className="canvas-button" onClick={clearArray}>
                        reset
                    </button>
                    <button className="canvas-button" onClick={done}>
                        apply
                    </button>
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {drawings.slice(0, 2).map((drawing, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                    <img
                    className='saved-patterns'
                    src={drawing}
                    alt={`Saved Drawing ${index}`}
                    onClick={() => deleteDrawing(index)}
                    />
                </div>
                ))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {drawings.slice(2).map((drawing, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                    <img
                    className='saved-patterns'
                    src={drawing}
                    alt={`Saved Drawing ${index + 2}`}
                    onClick={() => deleteDrawing(index + 2)}
                    />
                </div>
                ))}
            </div>
        </div>

    </div>
    );
}

export default PatternDraw;
