/* global createCanvas, background, loadImage, image */

let dvdImage, x, xVelocity, y, yVelocity, canvasWidth, canvasHeight, logoWidth, logoHeight;

function setup(){
  canvasWidth = 800;
  canvasHeight = 600;
  logoWidth = 200;
  logoHeight = 150;
  
  createCanvas(canvasWidth, canvasHeight);
  // We only want to load the logo once.
  dvdImage = loadImage("https://cdn.glitch.com/eaea72a4-ac6d-4777-b76e-f37d75959aa5%2Fdvd.jpeg?1515761833387");
  
  // Set up starting values.
  x = 50;
  xVelocity = 5;
  y = 50;
  yVelocity = 5;
}

function draw(){
  background(220);

  x += xVelocity;
  y += yVelocity;
  
  // If it hits a canvas border, switch direction.
  if (x < 0 || x > canvasWidth - logoWidth) {
    xVelocity = -1 * xVelocity;
  }
  
  // If it hits a canvas border, switch direction.
  if (y < 0 || y > canvasHeight - logoHeight) {
    yVelocity = -1 * yVelocity;
  }
  
  // Draw the logo at the new position.
  image(dvdImage, x, y, logoWidth, logoHeight);
}