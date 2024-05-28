/**
 * ICS4U - Final Project
 *
 * Description:
 *
 * Author: Andrew Leech
 */

'use strict';


// let c = document.getElementById('myCanvas');
// let canvas = c.getContext("2d");

// // canvas.moveTo(0, 0);
// // canvas.lineTo(200, 0);
// // canvas.stroke();

//  canvas.fillStyle = "#000";

// for(let i = 0; i != 20; i++) {
// for (let x = 0; x != 8; x++) {
//     canvas.strokeRect(x * 500/ 8 ,i * 750/20,500/8, 500/8)
//   }
// }

function setup() {
  createCanvas(100, 100, 'myCanvas');

  background(200);

  // Draw a diagonal line.
  line(0, 0, 10, 10);

  describe('A diagonal line drawn from top-left to bottom');
}
