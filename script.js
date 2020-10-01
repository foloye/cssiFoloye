// Name any p5.js functions we use in the global so Glitch can recognize them.
/* global createCanvas,key, width, height, colorMode, HSB, mouseX, mouseY, pmouseX, pmouseY, mouseIsPressed, random, background, fill, color, rect, ellipse, line, stroke, noStroke, noFill, strokeWeight, abs */

let brushHue;

function setup() {
  // Canvas & color settings
  createCanvas(400, 400);
  colorMode(HSB, 360, 100, 100);
  brushHue = 0;
  strokeWeight(6);
  background(95);
}

function draw() {
  chooseColors();
  //keyTyped();
  if (mouseIsPressed) {
    //ellipse(mouseX, mouseY, abs(pmouseX-mouseX),abs(pmouseY-mouseY));

    //strokeWeight(abs(pmouseX-mouseX) + abs(pmouseY-mouseY));
    stroke(brushHue, 50, 80);
    fill(brushHue, 50, 80);
    line(pmouseX, pmouseY, mouseX, mouseY);
  }
  // if (mouseX > width || mouseY > height) {
  //   background(95);
  // }
  //rect(mouseX, mouseY, 15, 15);
}

function chooseColors() {
  brushHue = brushHue + 1;
  if (brushHue >= 360) {
    brushHue = 0;
  }
  stroke(brushHue, 20, 100);
  fill(brushHue, 20, 100);
}
function keyTyped() {
  if (key == "b") {
    brushHue = 200;
  } else if (key == "p") {
    brushHue = 275;
  } else if (key == "r") {
    brushHue = 360;
  } else if (key == "o") {
    brushHue = 35;
  } else if (key == "y") {
    brushHue = 60;

  } else if (key == 'g'){
    brushHue = 130;
  }
  else if (key == "c"){
    ellipse(mouseX, mouseY, 6,6);
  }

}

// function keyPressed(){
//   background(95);
// }

// function mousePressed(){
//   ellipse(random(width), random(height), 30, 30);
// }
function doubleClicked(){
  background(95);
}