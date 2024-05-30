/**
 * ICS4U - Final Project
 *
 * Description:
 *
 * Author: Andrew Leech
 */

'use strict';
// ---------- Event Listeners-----------------------------------------------------------------------------

document.addEventListener('keydown', event => {if (event.key.toLowerCase() == 'w') snart()});
document.addEventListener('keydown', event => {if (event.key.toLowerCase() == 'a') alert("ok")});
document.addEventListener('keydown', event => {if (event.key.toLowerCase() == 's') alert("ok")});
document.addEventListener('keydown', event => {if (event.key.toLowerCase() == 'd') alert("ok")});
document.addEventListener('keydown', event => {if (event.key == ' ') alert("ok")});

// ----------VARS (Not the place)-------------------------------------------------------------------------

let cvs;
let cvs_x = 400;
let cvs_y = 800;
let grid = [];

// colours
let grey = [245, 245, 245];
let black = [235, 235, 235];
let yellow = [255 ,255, 0];

// ----------Classes--------------------------------------------------------------------------------------

class Square {
  occupied = false;
  colour = [255, 0, 0];

  constructor(colour) {
    this.colour = colour;
  }

  changeColour(colour) {
    this.colour = colour;
  }
}

class Shapes {
  colour;
  bottom;
}

class Cube extends Shapes {
  sq1 = [0, 4];
  sq2 = [0, 5];
  sq3 = [1, 4];
  sq4 = [1, 5];

  appear() {
    console.log(grid[this.sq1[0]][this.sq1[1]]);
    grid[this.sq1[0]][this.sq1[1]].changeColour(yellow);
    grid[this.sq2[0]][this.sq2[1]].changeColour(yellow);
    grid[this.sq3[0]][this.sq3[1]].changeColour(yellow);
    grid[this.sq4[0]][this.sq4[1]].changeColour(yellow);
  }
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

function snart() {
  let a = new Cube();
  a.appear();
}

function wait() {
  setTimeout(move, 5000);
  console.log('done');
}

function move() {
  console.log('start');
}
