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
document.addEventListener('keydown', event => {if (event.key.toLowerCase() == 'a') left()});
document.addEventListener('keydown', event => {if (event.key.toLowerCase() == 's') move1()});
document.addEventListener('keydown', event => {if (event.key.toLowerCase() == 'd') right()});
document.addEventListener('keydown', event => {if (event.key == ' ') alert("ok")});
document.getElementById('play').addEventListener('click', play)

// ----------VARS (Not the place)-------------------------------------------------------------------------

let cvs;
let cvs_x = 400;
let cvs_y = 800;
let grid = [];
let peices = []
let current_peice;
let temp;
let gameover = false;

// colours
let grey = [245, 245, 245];
let black = [235, 235, 235];
let yellow = [255 ,255, 0];
let blue = [0, 0, 255];
let red = [255, 0, 0];

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
}

class Shapes {
  colour;
  bottom = false;
  sq1;
  sq2;
  sq3;
  sq4;

  appear() {
    console.log('APPEAR')
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
    this.bottom = true;
    grid[this.sq1[0]][this.sq1[1]].occupied = true;
    grid[this.sq2[0]][this.sq2[1]].occupied = true;
    grid[this.sq3[0]][this.sq3[1]].occupied = true;
    grid[this.sq4[0]][this.sq4[1]].occupied = true;

    this.appear();
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

class L extends Shapes {
  colour = red;
  sq1 = [0, 3];
  sq2 = [0, 4];
  sq3 = [0, 5];
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

  // if (current_peice.bottom == true) new_piece();
}

// -- Other things ------------------
function move1() {
  setTimeout(move2, 300);

  // if (current_peice.bottom == true) return;
}

function move2() {
  current_peice.down();

}
// ---------------------


function new_piece() {

  console.log('new peice');
   // if (gameover == true) return;


  let choice = randInt(0, 2);
  if (choice == 0) return new Bar();
  if (choice == 1) return new Cube();
  if (choice == 2) return new L();


}

function to_newpiece() {
  new_piece();
}

function game_over() {

}


function play() {

  for(let x =0; x != 5; x++) {
    current_peice = new_piece();
    console.log(10);
    current_peice.appear();

    for (let i = 0; i != 4; i ++) {
      console.log('move 1')

      move1();
    }



    for(let i = 0; i != 3; i++) {
      if (grid[0][3 + i].occupied == true) {
        console.log('check')
        gameover = true;
        i = 3;
      }
    }

  new_piece();
  } // while(gameover == false)

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
