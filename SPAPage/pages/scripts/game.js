const fs = require("fs")
//board

var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var context;

var points = 0;
var gameOver = false;
//snake head
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

//snake body
var snakeBody = [];

var snakeSpeedX = 0;
var snakeSpeedY = 0;

//food
var foodX;
var foodY;

//junk food
var junkFoodX;
var junkFoodY;

  board = document.getElementById("board");
  board.height = rows * blockSize;
  board.width = cols * blockSize;
  context = board.getContext("2d");

  placeFood();
  placeJunkFood();
  document.addEventListener("keyup", changeDirection);
  setInterval(update, 100);

function update() {
  if (gameOver) {
    let ObjData = {
      "usuário": "admin",
      "pontos": points
    }
    let JSONData = JSON.stringify(ObjData)
    fs.writeFileSync('data.json', JSONData, 'utf-8', (err) => {
      if (err) throw err;
      console.log('Data added to file');
    });

  }

  //board
  context.fillStyle = "green";
  context.fillRect(0, 0, board.width, board.height);
  //food
  context.fillStyle = "red";
  context.fillRect(foodX, foodY, blockSize, blockSize);
  //junk food
  context.fillStyle = "darkred";
  context.fillRect(junkFoodX, junkFoodY, blockSize, blockSize);
  //snake
  context.fillStyle = "blue";
  snakeX += snakeSpeedX * blockSize;
  snakeY += snakeSpeedY * blockSize;
  context.fillRect(snakeX, snakeY, blockSize, blockSize);
  for (let i = 0; i < snakeBody.length; i++) {
    context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
  }

  if (snakeX == foodX && snakeY == foodY) {
    points += 30;
    placeFood();
  }
  if (snakeX == junkFoodX && snakeY == junkFoodY) {
    snakeBody.push([foodX, foodY]);
    placeJunkFood();
  }
  

  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }
  if (snakeBody.length) {
    snakeBody[0] = [snakeX, snakeY];
  }

  //points
  document.getElementById("points").innerHTML = `Points: ${points}`;

  //game over
  if (
    snakeX < 0 ||
    snakeX > cols * blockSize - 1 ||
    snakeY < 0 ||
    snakeY > rows * blockSize - 1
  ) {
    gameOver = true;
    alert("Game Over");
  }
  for (let i = snakeBody.length; i > 0; i--) {
    if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
      gameOver = true;
      alert("Game Over");
    }
  }
}

function changeDirection(e) {
  if (e.code == "ArrowUp" && snakeSpeedY != 1) {
    snakeSpeedX = 0;
    snakeSpeedY = -1;
  }
  if (e.code == "ArrowDown" && snakeSpeedY != -1) {
    snakeSpeedX = 0;
    snakeSpeedY = 1;
  }
  if (e.code == "ArrowLeft" && snakeSpeedX != 1) {
    snakeSpeedX = -1;
    snakeSpeedY = 0;
  }
  if (e.code == "ArrowRight" && snakeSpeedX != -1) {
    snakeSpeedX = 1;
    snakeSpeedY = 0;
  }
}

function placeFood() {
  //(0-1) * cols -> (0-19.99999) -> floor: (0-19) * 25
  foodX = Math.floor(Math.random() * cols) * blockSize;
  foodY = Math.floor(Math.random() * rows) * blockSize;

  if (foodX == junkFoodX && foodY == junkFoodY) {
    placeFood()
  }
}

function placeJunkFood() {
  junkFoodX = Math.floor(Math.random() * cols) * blockSize;
  junkFoodY = Math.floor(Math.random() * rows) * blockSize;
  if (junkFoodX == foodX && junkFoodY == foodY) {
    placeJunkFood()
  }
}
