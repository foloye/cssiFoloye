/* global createCanvas, background, loadImage, image, width, height, circle */

let dvdImage,dkImage,kingImage, y2, x1,y1, x, xVelocity, y, yVelocity, logoWidth, logoHeight;

function setup(){
  createCanvas(800, 600);
  // We only want to load the logo once.
  dvdImage = loadImage("https://lh3.googleusercontent.com/Sk-WH6XpG8hgyEvzut6BCfOT6K4_tIOV0ZF9vHS0oWWSB0uvayJT9cPkz50hTCNKP48Jgx-nRiYkn3I82bfXUYqe1slAzArmnw=w1600-rj-nu-e365");
  //dkImage = loadImage("https://qph.fs.quoracdn.net/main-qimg-c6156b58f7d46fc4e9ee478c8b01fd15");
  //kingImage = loadImage("https://qph.fs.quoracdn.net/main-qimg-c6156b58f7d46fc4e9ee478c8b01fd15");
  x = 50;
  xVelocity = 2;
  y = 50;
  yVelocity = 2;
  logoWidth = 25;
  logoHeight = 100;
  x1 = 300;
  y1 = 250;
  
  y2 = 300;
  
}

function draw(){
  background(95);

  // if the logo hits border, change directions.
  if (x >= (width - logoWidth) || x <= 0){
    xVelocity = xVelocity * -1;
    // xVelocity = -xVelocity;
  }
  // if the logo hits border, change directions.
  if (y >= (height - logoHeight) || y<= 0){
    yVelocity = yVelocity * -1;
  }

  
  x = x + xVelocity;
  y = y + yVelocity;
  
  x1= x1+ xVelocity;
  y1 = y1 + yVelocity;
  y2 = y2 + yVelocity;
  
  // Draw the logo at the new position.
  image(dvdImage, x, y, logoWidth, logoHeight);
 // image(dkImage, x1, y1, logoWidth, logoHeight);
  
}

function mousePressed(){
  xVelocity = 0;
  yVelocity = 0;
}