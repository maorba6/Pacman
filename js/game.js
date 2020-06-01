'use strict';
const WALL = '#';
const FOOD = '.';
const EMPTY = ' ';
const SUPER_FOOD = '🍒';
const TEN_POINTS = '🔟';
var gEmptyCells = [];

var elBtn = document.querySelector('.hidden');
var gFoodCount = 0;
var gBoard;
var gGame = {
  score: -1,
  isOn: false
};


function init() {
  updateScore(-gGame.score)
  elBtn.classList.add('hidden');
  gBoard = buildBoard();
  createPacman(gBoard);
  createGhosts(gBoard);
  
  printMat(gBoard, '.board-container');
  // console.table(gBoard);
  gGame.isOn = true;
  setInterval(spawnTENPOINT,5000);
}

function buildBoard() {
  var SIZE = 10;
  var board = [];
  for (var i = 0; i < SIZE; i++) {
    board.push([]);
    for (var j = 0; j < SIZE; j++) {
      board[i][j] = FOOD;
      if (i === 0 || i === SIZE - 1 ||
        j === 0 || j === SIZE - 1 ||
        (j === 3 && i > 4 && i < SIZE - 2)) {

        board[i][j] = WALL;
      }
      if (board[i][j] === FOOD) {
        gFoodCount++
      }
    }
  }

  board[1][1] = SUPER_FOOD;
  board[1][board.length - 2] = SUPER_FOOD;
  board[board.length - 2][board.length - 2] = SUPER_FOOD;
  board[board.length - 2][1] = SUPER_FOOD;
  return board;
}

function updateScore(value) {
  // Update both the model and the dom for the score
  gGame.score += value;
  if (gFoodCount === gGame.score) {
    gameOver();
    console.log('You Won ! ');
  }
  document.querySelector('header h3 span').innerText = gGame.score;
}


var gInterval;
// setInterval(spawnTENPOINT, 1000)


function gameOver() {
  console.log('Game Over');
  elBtn.classList.remove('hidden');
  gGame.isOn = false;
  gFoodCount = -1;
  clearInterval(gIntervalGhosts);
  gIntervalGhosts = null;
}



function getEmptyCells() {
  var emptyCells = [];
  for (var i = 1; i < gBoard.length; i++) {
    for (var j = 1; j < gBoard.length; j++) {
      if (gBoard[i][j] === EMPTY) {
        var cellLocation = { i: i, j: j }
        emptyCells.push(cellLocation)
      }
    }
  }
  return emptyCells;
}


function spawnTENPOINT() {

  var emptyCells = getEmptyCells();
  if(!emptyCells) return;
  var random = getRandomIntInclusive(0, emptyCells.length-1);
  
  var randCell = emptyCells[random];  
  gBoard[randCell.i][randCell.j]= TEN_POINTS ;
  renderCell(randCell,TEN_POINTS);
}