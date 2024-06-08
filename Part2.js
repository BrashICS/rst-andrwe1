/**
 * ICS4U - Final Project
 *
 * Description:
 *
 * Author: Andrew Leech
 */

'use strict';
// ---------- Event Listeners-----------------------------------------------------------------------------

document.addEventListener('keydown', event => {if (event.key.toLowerCase() == 'w') alert('not working yet')});
document.addEventListener('keydown', event => {if (event.key.toLowerCase() == 'a') current_peice.left()});
document.addEventListener('keydown', event => {if (event.key.toLowerCase() == 's') move1()});
document.addEventListener('keydown', event => {if (event.key.toLowerCase() == 'd') current_peice.right()});
document.addEventListener('keydown', event => {if (event.key == ' ') alert("ok")});
document.getElementById('play').addEventListener('click', new_piece);
document.getElementById('pause').addEventListener('click', pause);

let points = document.getElementById('score');

// ----------VARS (Not the place)-------------------------------------------------------------------------

let cvs;
let cvs_x = 400;
let cvs_y = 800;
let grid = [];
let peices = []
let current_peice;
let temp;
let gameover = false;
let score = 0;

// colours
let grey = [245, 245, 245];
let black = [235, 235, 235];
let yellow = [255 ,255, 0];
let blue = [0, 0, 255];
let red = [255, 0, 0];
let orange = [255, 165, 0];
let purple = [128, 0, 128];
let green = [34,139,34];
let brown = [165, 42, 42];
// ----------Classes--------------------------------------------------------------------------------------

class Square {
  occupied = false;
  colour;
  original;

  constructor(colour) {
    this.colour = colour;
    this.original = colour;
  }

  changeColour(colour) {
    this.colour = colour;
  }

  restore() {
    this.colour = this.original;
    this.occupied = false;
  }

  drop(colour, occupied) {
    if(occupied) {
      this.restore();
    } else {
      this.colour = colour;
      this.occupied == true;
    }
  }
}

class Shapes {
  colour;
  bottom = false;
  sq1;
  sq2;
  sq3;
  sq4;

  appear() {
    grid[this.sq1[0]][this.sq1[1]].changeColour(this.colour);
    grid[this.sq2[0]][this.sq2[1]].changeColour(this.colour);
    grid[this.sq3[0]][this.sq3[1]].changeColour(this.colour);
    grid[this.sq4[0]][this.sq4[1]].changeColour(this.colour);
  }

  down() {
    if (grid[this.sq1[0] + 1][this.sq1[1]].occupied == true) {
      this.place();
      return;
    }
    else if (grid[this.sq2[0] + 1][this.sq2[1]].occupied == true) {
      this.place();
      return;
    }
    else if (grid[this.sq3[0] + 1][this.sq3[1]].occupied == true) {
      this.place();
      return;
    }
    else if (grid[this.sq4[0] + 1][this.sq4[1]].occupied == true) {
      this.place();
      return;
    }


    grid[this.sq1[0]][this.sq1[1]].changeColour(grid[this.sq1[0]][this.sq1[1]].original);
    grid[this.sq2[0]][this.sq2[1]].changeColour(grid[this.sq2[0]][this.sq2[1]].original);
    grid[this.sq3[0]][this.sq3[1]].changeColour(grid[this.sq3[0]][this.sq3[1]].original);
    grid[this.sq4[0]][this.sq4[1]].changeColour(grid[this.sq4[0]][this.sq4[1]].original);

    this.sq1[0] += 1;
    this.sq2[0] += 1;
    this.sq3[0] += 1;
    this.sq4[0] += 1;

  this.appear();

  if (this.sq4[0] == 19) this.place();
  }

  left() {

    if(this.sq1[1] == 0 || this.sq1[1] == 0) return;

    else if (grid[this.sq1[0]][this.sq1[1] - 1].occupied == true) {
      return;
    }
    else if (grid[this.sq2[0] ][this.sq2[1] - 1].occupied == true) {
      return;
    }
    else if (grid[this.sq3[0]][this.sq3[1] - 1].occupied == true) {
      return;
    }
    else if (grid[this.sq4[0]][this.sq4[1] - 1].occupied == true) {
      return;
    }

    grid[this.sq1[0]][this.sq1[1]].changeColour(grid[this.sq1[0]][this.sq1[1]].original);
    grid[this.sq2[0]][this.sq2[1]].changeColour(grid[this.sq2[0]][this.sq2[1]].original);
    grid[this.sq3[0]][this.sq3[1]].changeColour(grid[this.sq3[0]][this.sq3[1]].original);
    grid[this.sq4[0]][this.sq4[1]].changeColour(grid[this.sq4[0]][this.sq4[1]].original);

    this.sq1[1] -= 1;
    this.sq2[1] -= 1;
    this.sq3[1] -= 1;
    this.sq4[1] -= 1;
    this.appear();
  }

  right() {
    if(this.sq4[1] == 9 || this.sq4[0] == 19) return;

    else if (grid[this.sq1[0]][this.sq1[1] + 1].occupied == true) {
      return;
    }
    else if (grid[this.sq2[0] ][this.sq2[1] + 1].occupied == true) {
      return;
    }
    else if (grid[this.sq3[0]][this.sq3[1] + 1].occupied == true) {
      return;
    }
    else if (grid[this.sq4[0]][this.sq4[1] + 1].occupied == true) {
      return;
    }
    grid[this.sq1[0]][this.sq1[1]].changeColour(grid[this.sq1[0]][this.sq1[1]].original);
    grid[this.sq2[0]][this.sq2[1]].changeColour(grid[this.sq2[0]][this.sq2[1]].original);
    grid[this.sq3[0]][this.sq3[1]].changeColour(grid[this.sq3[0]][this.sq3[1]].original);
    grid[this.sq4[0]][this.sq4[1]].changeColour(grid[this.sq4[0]][this.sq4[1]].original);

    this.sq1[1] += 1;
    this.sq2[1] += 1;
    this.sq3[1] += 1;
    this.sq4[1] += 1;
    this.appear();
  }

  place() {

    grid[this.sq1[0]][this.sq1[1]].occupied = true;
    grid[this.sq2[0]][this.sq2[1]].occupied = true;
    grid[this.sq3[0]][this.sq3[1]].occupied = true;
    grid[this.sq4[0]][this.sq4[1]].occupied = true;

    this.bottom = true;
    this.appear();

    poop();

    score += 10;
    points.innerText = 'Score: ' + score;
    // new_piece();
  }
}

// I, O, T, S, Z, J, and L.

class Cube extends Shapes {
  colour = yellow;
  sq1 = [0, 4];
  sq2 = [0, 5];
  sq3 = [1, 4];
  sq4 = [1, 5];
}

class Bar extends Shapes {
  colour = blue;
  sq1 = [0, 3];
  sq2 = [0, 4];
  sq3 = [0, 5];
  sq4 = [0, 6];
}

class J extends Shapes {
  colour = red;
  sq1 = [0, 3];
  sq2 = [0, 4];
  sq3 = [0, 5];
  sq4 = [1, 5];
}

class L extends Shapes {
  colour = orange;
  sq1 = [0, 3];
  sq2 = [0, 4];
  sq3 = [0, 5];
  sq4 = [1, 3];
}

class T extends Shapes {
  colour = purple;
  sq1 = [0, 3];
  sq2 = [0, 4];
  sq3 = [0, 5];
  sq4 = [1, 4];
}

class S extends Shapes {
  colour = green;
  sq1 = [1, 3];
  sq2 = [0, 5];
  sq3 = [0, 4];
  sq4 = [1, 4];
}

class Z extends Shapes {
  colour = brown;
  sq1 = [0, 3];
  sq2 = [0, 4];
  sq3 = [1, 4];
  sq4 = [1, 5];
}
// ----------Functions -----------------------------------------------------------------------------------

// ------ Canvas Stuff ------------------------------
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

// -- Other things ------------------

function move1() {
  if(current_peice.bottom == true) {
    console.log('working')
    new_piece();
    return;
  }
  else{
  setTimeout(move2, 300);
  }
}

function move2() {
  current_peice.down();
  move1();
}

function new_piece() {
  if (gameover == true) return;
  for(let i = 0; i != 3; i++) {
    if (grid[0][3 + i].occupied == true) gameover = true;;
  }

  if (gameover == true) return;


  let choice = randInt(0, 1);
  if (choice == 0) current_peice = new Bar();
  if (choice == 1) current_peice = new Cube();
  if (choice == 2) current_peice = new J();
  if (choice == 3) current_peice = new L();
  if (choice == 4) current_peice = new T();
  if (choice == 5) current_peice = new S();
  if (choice == 6) current_peice = new Z();

  current_peice.appear();
  move1();
}

function poop() {
  console.log('line')
  for (let i = 0; i != 20; i++) {
    let line = true;
    for (let x = 0; x != 10; x++) {
      if (grid[i][x].occupied == false) {
        line = false;
      }
        }
        if (line == true) {
          for (let x = 0; x != 10; x++) {
            grid[i][x].occupied = false;
            grid[i][x].colour = grid[i][x].original;

        for (let x = i - 1; x != 0; x--) {
            for(let y = 0; y != 10; y++) {

              grid[x][y].drop(grid[x-1][y].colour, grid[x - 1][y].occupied)
            }
        }
      }
    }
  }
}

// ---------- Key functions --------------------------------------------------

function left() {
  current_peice.left();
}

function right() {
  current_peice.right();
}

// --------------- Wack ---------------------------------
function randInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function pause() {
  gameover = true;
  current_peice.bottom = true;
}
