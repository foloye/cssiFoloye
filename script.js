/* global createCanvas, background, ellipse, rect,colorMode,HSB, noFill, strokeWeight, stroke */

var c;
function setup() {
  // Code here runs only once
  createCanvas(800, 600);
  colorMode(HSB, 360,100,100);
  c=0;
}

function draw() {
  // Code here runs continuously
  background(220);
  
  // Brush settings
  noFill();
  strokeWeight(5);
  
  //  blue ring
  stroke(c, 100, 100);
  ellipse(50, 50, 50, 50);
  
  //  yellow ring
  stroke(c, 60, 90);
  ellipse(80, 80, 50, 50);
  
  // first black ring
  stroke(c, 80, 44);
  ellipse(110, 50, 50, 50);

  // green ring
  stroke(c, 30, 100);
  ellipse(140, 80, 50, 50);
  
  // red ring
  stroke(c, 100, 50)
  ellipse(170, 50, 50, 50);
  
  c+=1;
  c = c%360;
}
