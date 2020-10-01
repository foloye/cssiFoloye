// Be sure to name any p5.js functions we use in the global so Glitch can recognize them.
// Add to this list as you consult the p5.js documentation for other functions.
/* global createCanvas, colorMode, HSB, width, height, random, background, fill, color, random,
          rect, ellipse, stroke, image, loadImage, collideCircleCircle, collideRectCircle, text, 
          mouseX, mouseY, strokeWeight, line, mouseIsPressed, windowWidth, windowHeight, noStroke, 
          keyCode, UP_ARROW, LEFT_ARROW, RIGHT_ARROW, DOWN_ARROW, textSize */

let brushHue,addTimeC,aTCX,aTCY, backgroundColor,coinW, coin2X,coin2Y,coinW2, coinX, coinY, score, time, gameIsOver, hit, hit2;

function setup() {
  // Canvas & color settings
  createCanvas(400, 400);
  colorMode(HSB, 360, 100, 100);
  brushHue = 0;
  backgroundColor = 95;
  coinX = random(width);
  coinY = random(height);
  coin2X = random(width);
  coin2Y = random(height);
  time = 500;
  gameIsOver = false;
  score = 0;
  coinW2 = 20;
  coinW = 20;
  addTimeC = 20;
  aTCX = width/2;
  aTCY = height/2;
}

function draw() {
  background(backgroundColor);
  fill('white');
  ellipse(coinX, coinY, 20);
  fill('white')
  ellipse(mouseX, mouseY, 20);
  fill("black");
  text(`Time remaining: ${time}`, 20, 40);
  text(`Your score: ${score}`, 20, 20);
  fill(330, 180, 222);
  ellipse(coin2X, coin2Y, coinW2);
  handleTime();
  hit = collideCircleCircle(mouseX, mouseY, coinW, coinX, coinY, coinW);
  hit2 = collideCircleCircle(mouseX, mouseY, coinW, coin2X, coin2Y, coinW2)
  if (hit && !gameIsOver) {
    handleCollision();
  }
  if(hit2 && !gameIsOver){
    handleCollisionTwo();
  }

}

function handleCollision() {
  // We'll write code for what happens if your character hits a coin.
  console.log(`You got a hit at ${mouseX}, ${mouseY}!`);

  score++;
  coinX = random(width);
  coinY = random(height);
}
function handleCollisionTwo(){
  console.log(`You got a hit at ${mouseX}, ${mouseY}!`);

  score+= 5;
  coin2X = random(width);
  coin2Y = random(height);
  if(coinW2> 0){
    coinW2 -= 3;
  }
    
}

function handleTime() {
  // We'll write code to handle the time.
  if (time > 0) {
    time--;
  } else {
    gameIsOver();
  }
}
