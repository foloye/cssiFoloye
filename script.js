/* global createCanvas, background, ellipse, rect, noFill, strokeWeight, stroke */
// Name any p5.js functions we use in the global so Glitch can recognize them.
// Add to this list as you consult the p5.js documentation for other functions. 
/* global createCanvas, colorMode, HSB, width, height, random, background, fill, color, random,
          rect, ellipse, stroke, image, loadImage, collideCircleCircle, text, mouseX, mouseY, 
          strokeWeight, line, mouseIsPressed, windowWidth, windowHeight, noStroke, noFill,
          triangle, quad,square, circle */



function setup() {
  // Code here runs only once
  createCanvas(800, 600);
}

function draw() {
  // Code here runs continuously
  background(255,255,255);
  
  stroke('red');
  strokeWeight(20);
  circle(80,80,50,50);
  
  circle(80,80, 10);
  
  stroke(242, 81, 34);
  square(50, 200, 12);
  
  stroke(93, 188, 210);
  square(50, 234, 12);
  
  stroke(126, 187, 0);
  square(84, 200, 12);
  
  stroke(255, 185, 1);
  square(84, 234, 12);

}
