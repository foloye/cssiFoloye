/* global createCanvas, background, loadImage, image, width, height */

let dvdImage, x, xVelocity, y, yVelocity, logoWidth, logoHeight;

function setup(){
  createCanvas(800, 600);
  // We only want to load the logo once.
  dvdImage = loadImage("https://cdn.glitch.com/eaea72a4-ac6d-4777-b76e-f37d75959aa5%2Fdvd.jpeg?1515761833387");
  x = 50;
  xVelocity = 1;
  y = 50;
  yVelocity = 1;
  logoWidth = 200;
  logoHeight = 150;
}

function draw(){
  background(220);

  // if the logo hits border, change directions.
  // if (x >= (width - logoWidth) || x <= 0){
  //   xVelocity = xVelocity * -1;
  //   // xVelocity = -xVelocity;
  // }
  // // if the logo hits border, change directions.
  // if (y >= (height - logoHeight) || y<= 0){
  //   yVelocity = yVelocity * -1;
  // }
  if (y < height){
    y += yVelocity;
  }

  
  x = x + xVelocity;
  y = y + yVelocity;
  // Draw the logo at the new position.
  image(dvdImage, x, y, logoWidth, logoHeight);
}
function keyPressed(){
   y-= 10; 
   yVelocity = 0;
}
function keyReleased(){ 
   yVelocity = 1;
}