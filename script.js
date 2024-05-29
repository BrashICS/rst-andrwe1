/**
 * ICS4U - Final Project
 *
 * Description:
 *
 * Author: Andrew Leech
 */

'use strict';

// ----------VARS (Not the place)-------------------------------------------------------------------------

let cvs;
let grid = [];

// colours
let grey = [128, 128, 128];
let black = [0, 0, 0];

// ----------Classes--------------------------------------------------------------------------------------

class Square {
  occupied = false;
  colour;

  constructor(colour) {
    this.colour = colour;
  }
}



// ----------Functions -----------------------------------------------------------------------------------

function setup() {
  cvs = createCanvas(1000, 2000);

  // grid array
  for(let y = 0; y < 20; y++) {
    grid[y] = [];
    for (let x = 0; x < 10; x++) {
      if ((x + y) % 2 == 0) {
        grid[y].push(new Square(grey));
      } else {
        grid[y].push(new Square(black));
      }
    }
  }

  // HTML Grid
  
}

