/* global createCanvas, background, ellipse, rect, noFill, strokeWeight, stroke */

function setup() {
  // Code here runs only once
  createCanvas(800, 600);
}

function draw() {
  // Code here runs continuously
  background(220);
  
  // Brush settings
  noFill();
  strokeWeight(5);
  
  //  blue ring
  stroke(0, 133, 199);
  ellipse(50, 50, 50, 50);
  
  //  yellow ring
  stroke(244, 195, 0);
  ellipse(80, 80, 50, 50);
  
  // first black ring
  stroke(0, 0, 0);
  ellipse(110, 50, 50, 50);

  // green ring
  stroke(0, 159, 61);
  ellipse(140, 80, 50, 50);
  
  // red ring
  stroke(223, 0, 36)
  ellipse(170, 50, 50, 50);
}
