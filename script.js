/* global createCanvas,snakeImage, snakeY, background, loadImage, image, width, height, translate, rect, ellipse, fill, noStroke, mouseX, mouseY, text, color */
let x,
  y,
  yVelocity,
  obstacleH,
  obstacleW,
  snakeX,
  snakeY,
  snakeImage,
  gameOn,
  x2;

function setup() {
  createCanvas(720, 400);
  noStroke();
  snakeX = 40;
  snakeY = height / 4;
  snakeImage = loadImage("https://i.ibb.co/yFS6Pz4/images.png");
  x = 0;
  x2 = 20;
  y = 0;
  obstacleH = 50;
  obstacleW = 50;
  gameOn = true;
  yVelocity = 1;
}

function draw() {
  background(102);
  // snake avatar
  fill(150, 250, 150);
  ellipse(snakeX, snakeY, 40, 40);
  // image(snakeImage, snakeX, snakeY);
  // Obstacle 1


  // Animate by increasing our x value
  x = x + 0.8;
  // If the shape goes off the canvas, reset the position
  if (x > width) {
    x = -obstacleW;
  }

  translate(x, 0);
  // upper
  fill(0);
  rect(0, 0, obstacleW, obstacleH);
  // lower
  fill(255);
  rect(0, height - obstacleW, obstacleW, 2*obstacleH);
  fill(255);
  

  if (snakeY < height) {
    snakeY += yVelocity;
  }
  if (snakeY >= height || snakeX >= width){
    background(0);
  }


}

function keyPressed() {
  snakeY -= 10;
  snakeX += 20;
  yVelocity = 0;
}
function keyReleased() {
  yVelocity = 1;
}
// function mouseReleased(){
//    snakeY-= 5;
// }
function mousePressed() {
  snakeY -= 10;
  snakeX += 20;
  yVelocity = 0;
}
function mouseReleased() {
  yVelocity = 1;
}
//image(snakeImage, snakeX, snakeY, 50,50)
