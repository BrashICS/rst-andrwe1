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
let cvs_x = 400;
let cvs_y = 800;
let grid = [];

// colours
let grey = [245, 245, 245];
let black = [235, 235, 235];

// ----------Classes--------------------------------------------------------------------------------------

class Square {
  occupied = false;
  colour = [255, 0, 0];

  constructor(colour) {
    this.colour = colour;
  }
}

class Shapes {
  colour;
}

class cube extends Shapes {

}

// ----------Functions -----------------------------------------------------------------------------------

function setup() {
  cvs = createCanvas(cvs_x, cvs_y);
   background(0)

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
  grid[0][0].colour = [255, 0, 0]
}

function draw() {
  background(220);

  draw_grid(cvs_x, cvs_y);
}

function draw_grid(cvs_x, cvs_y) {
  stroke("black");
  for (let row = 0; row < 20; row++) {
    for (let col = 0; col < 10; col++) {

      fill(grid[row][col].colour);
      rect(col* (cvs_x / 10), row * (cvs_y / 20), 100, 100);

    }
  }
}


