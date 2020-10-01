/* global createCanvas, colorMode, HSB, noStroke, color, background, fill, ellipse, text, stroke, line, width, height, mouseX, mouseY */

let backgroundColor, color1, color2, textColor, globalS, globalB;

function setup() {
  globalS = 100;
  globalB = 50;
  
  // Canvas & color settings
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100);
  noStroke();

  // When used with only one argument, the color mode is greyscale.
  // 0 is black and 100 is white.
  backgroundColor = color(95);
  textColor = color(20);
  // When used with three arguments, the function takes, in this order:
  // HUE - 0 to 360 degrees on a color wheel - 0 is red, 120 is green and 240
  //       is blue.
  // SATURATION - 0 is no color (greyscale), and 100 is as bold as possible.
  // BRIGHTNESS - 0 is no light (black), and 100 is as bright as possible.
  color1 = color(0, globalS, globalB);
  color2 = color(200, globalS, globalB);
}

function draw() {
  background(backgroundColor);
  // Call the drawCenterLine function here to run the three lines of code
  // contained in that function.
  drawCenterLine();
  if (mouseX > width / 2) {
    nightMode();
  } else {
    dayMode();
  }

  // The red and blue circles:
  fill(color1);
  ellipse(width * 1 / 4, height / 2, 50);
  fill(color2);
  ellipse(width * 3 / 4, height / 2, 50);

  // The grey circle and the text:
  fill(textColor);
  ellipse(mouseX, mouseY, 50);
  text("Flip the switch (" + mouseX + ", " + mouseY + ")", 20, 20);
}

function drawCenterLine() {
  // This function will turn stroke on, draw the line, and then turn stroke
  // back off.
  // Remember a line segment in p5.js has four arguments: x1, y1, x2, y2
  stroke(textColor);
  line(width / 2, 0, width / 2, height);
  noStroke();
}

function nightMode() {
  backgroundColor = color(20);
  color1 = color(200, globalS, globalB);
  color2 = color(0, globalS, globalB);
  textColor = color(95);
}

function dayMode() {
  backgroundColor = color(95);
  color1 = color(0, globalS, globalB);
  color2 = color(200, globalS, globalB);
  textColor = color(20);
}
