import React, { useRef, useEffect } from 'react';

const ImageCanvas = ({ width, height, pixel }) => {
  const canvasRef = useRef(null);

  const rArray = [];
  const gArray = [];
  const bArray = [];
  const hexColours = [];
  const hexSet = new Set();

  const breakIntoSteps = (interval = 8, max = 256) => {
    for (let i = interval; i <= max; i += interval) {
      rArray.push(i);
      gArray.push(i);
      bArray.push(i);
    }
  };

  // Convert RGB to Hex, so that we can use it as a key
  const createHexArray = () => {
    for (let i = 0; i < rArray.length; i++) {
      for (let j = 0; j < gArray.length; j++) {
        for (let k = 0; k < bArray.length; k++) {
          hexColours.push(
            rgbToHex(rArray[i] - 1, gArray[j] - 1, bArray[k] - 1)
          );
        }
      }
    }
  };

  const rgbToHex = (r, g, b) => {
    r = r.toString(16);
    g = g.toString(16);
    b = b.toString(16);

    if (r.length === 1) r = '0' + r;
    if (g.length === 1) g = '0' + g;
    if (b.length === 1) b = '0' + b;

    return '#' + r + g + b;
  };

  const createCanvas = (ctx, width, height, pixelSize) => {
    //set canvas size
    ctx.canvas.width = width;
    ctx.canvas.height = height;
    hexColours.sort();

    //check if the container can accomodate exactly the size of all colour components
    if (width * height === hexColours.length * pixelSize) {
      if (pixelSize === 1) pixelSize = 2; // re-set value if pixelSize is 1

      let idx = 0;
      for (let i = 0; i < height / (pixelSize / 2); i++) {
        for (let j = 0; j < width / (pixelSize / 2); j++) {
          ctx.fillStyle = hexColours[idx];
          ctx.fillRect(
            (j * pixelSize) / 2, //x
            (i * pixelSize) / 2, //y
            pixelSize / 2, //width
            pixelSize / 2 //height
          );
          idx++;

          //check if this color is already used
          if (!hexSet.has(hexColours[idx])) {
            hexSet.add(hexColours[idx]);
          }
        }
      }

      if (hexSet.size !== hexColours.length) {
        alert('all colours are not fully rendered');
      }
    } else {
      alert('The dimensions of the image requested to generate is invalid.');
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    breakIntoSteps();
    createHexArray();

    //initial draw on mount
    createCanvas(context, width, height, pixel);
  });

  return <canvas ref={canvasRef} />;
};

export default ImageCanvas;
