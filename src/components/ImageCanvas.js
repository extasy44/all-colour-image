import React, { useRef, useEffect } from 'react';

const ImageCanvas = ({ width, height, filter }) => {
  const canvasRef = useRef(null);
  let canvas = null;
  let ctx = null;

  const palette = [];
  const grid = [];
  const prevPositions = [];
  let currentGrid = {};
  let imageData = null;
  const steps = 32;
  const step = 8;

  const init = () => {
    canvas = canvasRef.current;
    ctx = canvas.getContext('2d');
    imageData = ctx.createImageData(width, height);
    currentGrid = {
      x: randomInt(0, width),
      y: randomInt(0, height),
    };

    //set canvas size
    ctx.canvas.width = width;
    ctx.canvas.height = height;
    createPalette();
    createGrid();
  };

  const createPalette = () => {
    for (let r = 0; r < steps; r++) {
      for (let g = 0; g < steps; g++) {
        for (let b = 0; b < steps; b++) {
          palette.push({
            r: Math.ceil((r * 255) / steps + step) - 1,
            g: Math.ceil((g * 255) / steps + step) - 1,
            b: Math.ceil((b * 255) / steps + step) - 1,
          });
        }
      }
    }
  };

  const createGrid = () => {
    for (let x = 0; x < width; x++) {
      grid.push([]);
      for (let y = 0; y < height; y++) {
        grid[x].push(0); //0: empty, 1: filled
      }
    }
  };

  const drawRandomImage = (draw = true) => {
    shuffle(filter);
    clearCanvase();
    if (width * height === palette.length) {
      if (draw) {
        do {
          let notMoved = true;
          while (notMoved) {
            let emptyGrids = checkEmptyGrids();

            if (emptyGrids.length > 0) {
              let test = emptyGrids[randomInt(0, emptyGrids.length)];
              prevPositions.push(currentGrid);
              currentGrid = test;
              grid[currentGrid.x][currentGrid.y] = 1;
              changePixelColour(palette.pop(), currentGrid.x, currentGrid.y);
              notMoved = false;
            } else {
              if (prevPositions.length !== 0) {
                currentGrid = prevPositions.pop();
              } else {
                break;
              }
            }
          }
        } while (prevPositions.length > 0);
        ctx.putImageData(imageData, 0, 0);
      }
    }
  };

  const clearCanvase = () => {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  };

  const checkEmptyGrids = () => {
    var emptyGrid = [];

    if (currentGrid.x > 0 && grid[currentGrid.x - 1][currentGrid.y] === 0) {
      emptyGrid.push({ x: currentGrid.x - 1, y: currentGrid.y });
    }

    if (
      currentGrid.x < width - 1 &&
      grid[currentGrid.x + 1][currentGrid.y] === 0
    ) {
      emptyGrid.push({ x: currentGrid.x + 1, y: currentGrid.y });
    }

    if (currentGrid.y > 0 && grid[currentGrid.x][currentGrid.y - 1] === 0) {
      emptyGrid.push({ x: currentGrid.x, y: currentGrid.y - 1 });
    }

    if (
      currentGrid.y < height - 1 &&
      grid[currentGrid.x][currentGrid.y + 1] === 0
    ) {
      emptyGrid.push({ x: currentGrid.x, y: currentGrid.y + 1 });
    }

    return emptyGrid;
  };

  const changePixelColour = (colour, x, y) => {
    imageData.data[(x + y * width) * 4 + 0] = colour.r;
    imageData.data[(x + y * width) * 4 + 1] = colour.g;
    imageData.data[(x + y * width) * 4 + 2] = colour.b;
    imageData.data[(x + y * width) * 4 + 3] = 255;
  };

  const randomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min));
  };

  const shuffle = (filter) => {
    switch (filter) {
      case 'redShuffle':
        palette.sort((a, b) => {
          return b.r + b.b - (a.r + a.b);
        });
        break;

      case 'barShuffle':
        palette.sort((a, b) => {
          const rgb = a.r + a.g + a.b;
          const rgbNext = b.r + b.g + b.b;
          if (rgb > rgbNext) return -1;
          if (rgbNext > rgb) return 1;
          return 0;
        });
        break;

      case 'randomShuffle':
        let currentIndex = palette.length;
        let temporaryValue;
        let randomIndex;

        while (0 !== currentIndex) {
          randomIndex = randomInt(0, palette.length - 1);
          currentIndex -= 1;
          temporaryValue = palette[currentIndex];
          palette[currentIndex] = palette[randomIndex];
          palette[randomIndex] = temporaryValue;
        }
        break;

      default:
        return;
    }
  };

  useEffect(() => {
    init();
    drawRandomImage();
  });

  return <canvas ref={canvasRef} />;
};

export default ImageCanvas;
