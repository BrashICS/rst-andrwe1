/**
 * ICS4U - Final Project
 *
 * Description:
 *
 * Author: Andrew Leech
 */

'use strict';
// ---------- Event Listeners-----------------------------------------------------------------------------

document.addEventListener('keydown', event => {if (event.key.toLowerCase() == 'w') current_peice.rotate()});
document.addEventListener('keydown', event => {if (event.key.toLowerCase() == 'a') current_peice.left()});
document.addEventListener('keydown', event => {if (event.key.toLowerCase() == 's') current_peice.down()});
document.addEventListener('keydown', event => {if (event.key.toLowerCase() == 'd') current_peice.right()});
document.addEventListener('keydown', event => {if (event.key == ' ') rever()});
document.getElementById('play').addEventListener('click', new_game);
document.getElementById('kill').addEventListener('click', kill);
document.getElementById('how to play').addEventListener('click', instructions);

let points = document.getElementById('score');
let linestml = document.getElementById('lines');

// ----------VARS (Not the place)-------------------------------------------------------------------------
let cvs;
let cvs_x = 400;
let cvs_y = 800;
let grid = [];
let peices = []
let current_peice;
let gameover;
let score = 0;
let lines = 0;

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
  // Each square on the grid gets it's own object, in grid 2d array
  occupied = false;
  colour;
  original;

  constructor(colour) {
    this.colour = colour;
    this.original = colour;
  }

  changeColour(colour) {
    // Changes colour on grid
    this.colour = colour;
  }

  restore() {
    this.colour = this.original;
    this.occupied = false;
  }
}

class Shapes {
  // Class for each shape
  colour;
  bottom = false;
  sq1;
  sq2;
  sq3;
  sq4;
  rotation = 0;

  appear() {
    // Changes the colour of the grid for each piece of the shape
    grid[this.sq1[0]][this.sq1[1]].changeColour(this.colour);
    grid[this.sq2[0]][this.sq2[1]].changeColour(this.colour);
    grid[this.sq3[0]][this.sq3[1]].changeColour(this.colour);
    grid[this.sq4[0]][this.sq4[1]].changeColour(this.colour);
  }

  dissapear() {
    // returns each piece their normal state
    grid[this.sq1[0]][this.sq1[1]].restore();
    grid[this.sq2[0]][this.sq2[1]].restore();
    grid[this.sq3[0]][this.sq3[1]].restore();
    grid[this.sq4[0]][this.sq4[1]].restore();
  }

  down() {
    // Moves the x value of each piece down by 1, unless it does not meet the perameters
    if (this.bottom == true) return;

    //Check if the piece under it is occupied
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


    this.dissapear();

    // Move down by 1
    this.sq1[0] += 1;
    this.sq2[0] += 1;
    this.sq3[0] += 1;
    this.sq4[0] += 1;

   this.appear();

   // If it has hit the bottom, stop
  if (this.sq1[0] == 19 || this.sq2[0] == 19 || this.sq3[0] == 19 || this.sq4[0] == 19 ) this.place();
  }

  left() {
    //Moves x pieces left, as long as parameters are true
    if(this.sq4[1] == 0 || this.sq3[1]== 0 || this.sq2[1]== 0 || this.sq1[1]== 0) return;

    // If the piece is on the far left
    if(this.sq1[1] == 0) return;

    // Checks if the piece under it is occupied
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

    this.dissapear();

    this.sq1[1] -= 1;
    this.sq2[1] -= 1;
    this.sq3[1] -= 1;
    this.sq4[1] -= 1;

    this.appear();
  }

  right() {
    // Checks if the piece is on the far right
    if(this.sq4[1] == 9 || this.sq3[1]== 9 || this.sq2[1]== 9 || this.sq1[1]== 9) return;

    // Checks if the piece under it is occupied
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

    this.dissapear();

    this.sq1[1] += 1;
    this.sq2[1] += 1;
    this.sq3[1] += 1;
    this.sq4[1] += 1;

    this.appear();
  }

   rotate() {

    let tempsq1 = [];
    let tempsq2 = [];
    let tempsq3 = [];
    let tempsq4 = [];
    // Cubes don't rotate
    if (this.type == 'cube') return;


    // Creates new array of each square coordinate

    for (let i = 0; i != 2; i++) {
      tempsq1.push(this.sq1[i]);
      tempsq2.push(this.sq2[i]);
      tempsq3.push(this.sq3[i]);
      tempsq4.push(this.sq4[i]);
    }

    let blocks = [tempsq1, tempsq2, tempsq3, tempsq4];

    // Relocates each piece relative to sq2 being (0,0) on a cartesian plane
    let x_buffer = this.sq2[1];
    let y_buffer = this.sq2[0];

    for (let i = 0; i != 4; i++) {
      blocks[i][0] -= y_buffer;
      blocks[i][1] -= x_buffer;
    }

    // To rotate a point on a grid 90 degrees, switch x and y and change the sign on the y-coordinate
    for (let x = 0; x != 4; x++) {
      blocks[x].reverse();
      blocks[x][0] *= - 1;
    }

    // Remove the buffer to rotated points back on the grid
    for (let i = 0; i != 4; i++) {
      blocks[i][0] += y_buffer;
      blocks[i][1] += x_buffer;
    }

    for (let i = 0; i != 4; i++) {
      // This code checks if the piece would be rotating into another object, and while doing that, will make the if statement scream if the shape rotates off the grid, therefore also making the piece stay in the grid
      try {
        if (grid[blocks[i][0]][blocks[i][1]].occupied == true) {
          return;
        }
      }
      catch(err) {
        return;
      }

  }
    this.dissapear();

    this.sq1 = blocks[0];
    this.sq2 = blocks[1];
    this.sq3 = blocks[2];
    this.sq4 = blocks[3];

    this.appear();
  }

  place() {
    // Give each peice a permenant spot on the grid
    grid[this.sq1[0]][this.sq1[1]].occupied = true;
    grid[this.sq2[0]][this.sq2[1]].occupied = true;
    grid[this.sq3[0]][this.sq3[1]].occupied = true;
    grid[this.sq4[0]][this.sq4[1]].occupied = true;

    this.bottom = true;

    this.appear();

    line_check();

    // Points for each piece placed
    score += 10;
    points.innerText = 'Score: ' + score;
  }
}

// General names refer to what they look like and the actual names used in the tetris game
// Each piece is refered to as a Tetromino, Hense the name of my game!
class Cube extends Shapes {
  type = 'cube'
  colour = yellow;
  sq1 = [0, 5];
  sq2 = [0, 4];
  sq3 = [1, 4];
  sq4 = [1, 5];
}

class Bar extends Shapes {
  type = 'bar'
  colour = blue;
  sq1 = [0, 3];
  sq2 = [0, 4];
  sq3 = [0, 5];
  sq4 = [0, 6];
}

class J extends Shapes {
  type = 'j'
  colour = red;
  sq1 = [0, 3];
  sq2 = [0, 4];
  sq3 = [0, 5];
  sq4 = [1, 5];
}

class L extends Shapes {
  type = 'l'
  colour = orange;
  sq1 = [0, 3];
  sq2 = [0, 4];
  sq3 = [0, 5];
  sq4 = [1, 3];
}

class T extends Shapes {
  type = 't'
  colour = purple;
  sq1 = [0, 3];
  sq2 = [0, 4];
  sq3 = [0, 5];
  sq4 = [1, 4];
}

class S extends Shapes {
  type = 's'
  colour = green;
  sq1 = [1, 3];
  sq2 = [0, 4];
  sq3 = [0, 5];
  sq4 = [1, 4];
}

class Z extends Shapes {
  type = 'z'
  colour = brown;
  sq1 = [0, 3];
  sq2 = [0, 4];
  sq3 = [1, 4];
  sq4 = [1, 5];
}
// ----------Functions -----------------------------------------------------------------------------------

// ------ Canvas Stuff ------------------------------
function setup() {
  // Creates canvas
  cvs = createCanvas(cvs_x, cvs_y);
   background(0)

  // grid array
  new_grid();
}

function draw() {
  background(220);

  draw_grid(cvs_x, cvs_y);
}

function draw_grid(cvs_x, cvs_y) {
  stroke("black");
  // Creates array
  for (let row = 0; row < 20; row++) {
    for (let col = 0; col < 10; col++) {

      fill(grid[row][col].colour);
      rect(col* (cvs_x / 10), row * (cvs_y / 20), 100, 100);

    }
  }
}

// -- Other things ------------------------------------------------

function new_game() {
  if(gameover == false) return;
  gameover = false;


  // Resetting
  score = 0;
  lines = 0;
  points.innerText = 'Score: ' +  score;
  linestml.innerText = 'Lines:' + lines;
  document.getElementById('gameover').hidden = true


  new_grid();
  score = 0;
  new_piece();
}


function move1() {
  // Drops each piece by one square after certain time delay
  if(current_peice.bottom == true) {
    new_piece();
    return;
  }
  else{
  setTimeout(move2, 300);
  }
}

function move2() {
  // After each delay, peice moves down, restarts loop by calling move1()
  current_peice.down();
  move1();
}

function new_piece() {
  // if top of the grid is occupied gameover is true
  for(let i = 0; i != 3; i++) {
    if (grid[0][3 + i].occupied == true) {gameover = true;
    document.getElementById('gameover').hidden = false;
    }
  }

  if (gameover == true) return;


  // Randomly chooses next piece
  let choice = randInt(0, 6);
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

function line_check() {
  // Removes lines when they are full
  let num_lines = 0;
  // Four empty lines (RIP Bryan and Brett), to prevent array referencing
  let empty_line1 = [new Square(black), new Square(grey), new Square(black), new Square(grey), new Square(black), new Square(grey), new Square(black), new Square(grey), new Square(black), new Square(grey)];

  let empty_line2 = [new Square(grey), new Square(black), new Square(grey), new Square(black), new Square(grey), new Square(black), new Square(grey), new Square(black), new Square(grey), new Square(black)];

  let empty_line3 = [new Square(black), new Square(grey), new Square(black), new Square(grey), new Square(black), new Square(grey), new Square(black), new Square(grey), new Square(black), new Square(grey)];

  let empty_line4 = [new Square(grey), new Square(black), new Square(grey), new Square(black), new Square(grey), new Square(black), new Square(grey), new Square(black), new Square(grey), new Square(black)];

  // Checks if any lines are formed
  for (let i = 0; i != 20; i++) {
    let line = true;
    for (let x = 0; x != 10; x++) {
      if (grid[i][x].occupied == false) {
        line = false;
       }
      }
      // Removes line from grid and adds new one to the top
      if (line == true) {
          num_lines++;
          grid.splice(i, 1);
          if (grid[0][0].colour == black) {
            if (num_lines > 2) {
              grid.unshift(empty_line4);
            } else {
             grid.unshift(empty_line2);
            }
          } else {
            if (num_lines > 2) {
              grid.unshift(empty_line1);
            } else {
              grid.unshift(empty_line3);
            }
          }
        }
      }

      // Points for consecutive ammounts of lines
      if(num_lines == 1) {
        score += 100;
      } else if(num_lines == 2) {
        score += 300;
      } else if(num_lines == 3) {
        score += 500;
      } else if (num_lines == 4) {
        score += 800;
      }

      lines += num_lines;

      linestml.innerText = 'Lines:' + lines;
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

function kill() {
  gameover = true;
  current_peice.bottom = true;
}

function new_grid() {
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

function instructions() {
  let x = document.getElementById('instructions');
  if (x.hidden == true) {
    x.hidden = false;
  } else {
    x.hidden = true;
  }
}
