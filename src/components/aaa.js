// RGB
// R 255
// G 255
// B 255

// 32 steps
// R 8 | 16 | 32 | 48 | .... | 256
// G 8 | 16 | 32 | 48 | .... | 256
// B 8 | 16 | 32 | 48 | .... | 256

// Total 32768 colors

// image should be interesting

//

/*
 * Steps 0 number of steps in 8
 */
import React, { useRef } from 'react';
const rArray = [];
const gArray = [];
const bArray = [];
//const hexArray = [];
const hexSet = new Set();

// initializing
export function breakIntoSteps(interval = 8, max = 256) {
  for (let i = interval; i <= max; i += interval) {
    rArray.push(i);
    gArray.push(i);
    bArray.push(i);
  }
  createHex();
}

function createHex() {
  for (let i = 0; i < rArray.length; i++) {
    for (let j = 0; j < gArray.length; j++) {
      for (let k = 0; k < bArray.length; k++) {
        //hexArray.push(rgbToHex(rArray[i], gArray[i], bArray[i]));
        hexSet.add(rgbToHex(rArray[i], gArray[j], bArray[k]));
      }
    }
  }
  console.log(hexSet.size);
}

function rgbToHex(r, g, b) {
  return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length === 1 ? '0' + hex : hex;
}

export const CanvasImage = () => <canvas width="200" height="200"></canvas>;

// function rgbToHex(r, g, b) {
//   return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
// }

// // HEX TO RGB
// function hexToRgb(hex) {
//   var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
//   return result
//     ? {
//         r: parseInt(result[1], 16),
//         g: parseInt(result[2], 16),
//         b: parseInt(result[3], 16),
//       }
//     : null;
// }

// RGB to HEX
// function componentToHex(c) {
//   var hex = c.toString(16);
//   return hex.length == 1 ? '0' + hex : hex;
// }

// function generateUniqueRandomNumberWithinRange(range) {
//   // generate a random number witin the range

//   // check uinqueness

//   // return unique random RGB with strps * steps * steps range
//   return;
// }

// function generateUniqueRandomRGB(steps) {
//   const R = generateUniqueRandomNumberWithinRange(steps);
//   const G = generateUniqueRandomNumberWithinRange(steps);
//   const B = generateUniqueRandomNumberWithinRange(steps);

//   return { R, G, B };
// }

// //canvas, base64,
// var id = myContext.createImageData(1, 1); // only do this once per page
// var d = id.data; // only do this once per page
// d[0] = r;
// d[1] = g;
// d[2] = b;
// d[3] = a;
// myContext.putImageData(id, x, y);
