import React, { useRef, useEffect } from 'react';

const ImageCanvas = ({ width, height, pixel, filter }) => {
  const canvasRef = useRef(null);
  const randomFactor = 80;
  const redFactor = 0.2;
  const blueFactor = 0.12;
  const greenFactor = 0.15;
  const rArray = [];
  const gArray = [];
  const bArray = [];
  const colours = [];
  const hexSet = new Set();

  const breakIntoSteps = (interval = 8, max = 256) => {
    for (let i = interval; i <= max; i += interval) {
      rArray.push(i);
      gArray.push(i);
      bArray.push(i);
    }
  };

  const createRGBArray = () => {
    for (let i = 0; i < rArray.length; i++) {
      for (let j = 0; j < gArray.length; j++) {
        for (let k = 0; k < bArray.length; k++) {
          colours.push({ r: rArray[i], g: gArray[j], b: bArray[k] });
          //hexSet.add(rgbToHex(rArray[i], gArray[i], bArray[i]));
        }
      }
    }
  };

  const createCanvas = (ctx, width, height, pixelSize, filter) => {
    console.log(filter);
    //set canvas size
    ctx.canvas.width = width;
    ctx.canvas.height = height;
    shuffle(filter);

    //check if the container can accomodate exactly the size of all colour components
    if (width * height === colours.length * pixelSize) {
      if (pixelSize === 1) pixelSize = 2; // re-set value if pixelSize is 1

      let count = 0;
      for (let i = 0; i < height / (pixelSize / 2); i++) {
        for (let j = 0; j < width / (pixelSize / 2); j++) {
          let px = (j * pixelSize) / 2;
          let py = (i * pixelSize) / 2;

          randomInt(0, colours.length - 1);

          ctx.fillStyle = `rgb(
            ${colours[count].r}, ${colours[count].g}, ${colours[count].b}
          )`;
          ctx.fillRect(px, py, pixelSize / 2, pixelSize / 2);

          count++;
        }
      }
      console.log(count); // should show 32768
    } else {
      alert('The dimensions of the image requested to generate is invalid.');
    }
  };

  const selectRelevantColor = (color, index) => {
    var relevancies = [];
    var relatedColours = [];
    for (var i = 0; i < colours.length; i++) {
      var c = colours[index];
      var relevancy =
        Math.pow((c.r - color.r) * redFactor, 2) +
        Math.pow((c.b - color.b) * blueFactor, 2) +
        Math.pow((c.g - color.g) * greenFactor, 2);
      relevancies.push(relevancy);
      relatedColours[relevancy] = index;
    }
    return colours[Math.min(relevancies)];
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

  const shuffle = (filter) => {
    switch (filter) {
      case 'redShuffle':
        colours.sort((a, b) => {
          return b.r + b.b - (a.r + a.b);
        });
        break;

      case 'barShuffle':
        colours.sort((a, b) => {
          const rgb = a.r + a.g + a.b;
          const rgbNext = b.r + b.g + b.b;
          if (rgb > rgbNext) return -1;
          if (rgbNext > rgb) return 1;
          return 0;
        });
        break;

      case 'randomShuffle':
        let currentIndex = colours.length;
        let temporaryValue;
        let randomIndex;

        while (0 !== currentIndex) {
          randomIndex = randomInt(0, colours.length - 1);
          currentIndex -= 1;
          temporaryValue = colours[currentIndex];
          colours[currentIndex] = colours[randomIndex];
          colours[randomIndex] = temporaryValue;
        }
        break;

      default:
        return;
    }
  };

  const randomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min));
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    breakIntoSteps();
    createRGBArray();

    //default render on mount
    createCanvas(context, width, height, pixel, filter);
  });

  return <canvas ref={canvasRef} />;
};

export default ImageCanvas;
