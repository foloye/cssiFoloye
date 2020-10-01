// Be sure to name any p5.js functions we use in the global so Glitch can recognize them.
// Add to this list as you consult the p5.js documentation for other functions. 
/* global createCanvas, colorMode, HSB, width, height, random, background, fill, color, random,
          rect, ellipse, stroke, image, loadImage, collideCircleCircle, collideRectCircle, text, 
          mouseX, mouseY, strokeWeight, line, mouseIsPressed, windowWidth, windowHeight, noStroke, 
          keyCode, UP_ARROW,triangle, LEFT_ARROW, RIGHT_ARROW, DOWN_ARROW, textSize, sqrt, round */

let backgroundColor, spherePosition, rectPosition, triPo

function setup() {
  // Canvas & color settings
  createCanvas(500, 400);
  colorMode(HSB, 360, 100, 100);
  backgroundColor = 95;
  // This variable contains a JSON object
  spherePosition = {
    "x": 100,
    "y": 100
  };
  rectPosition = {
    "x": 130,
    "y": 140
  };
  triPo = {
    "x1": 160,
    "x2": 180,
    "x3":200,
    "y1":180,
    "y2":200,
    "y3":220
  };
}

function draw() {
  background(backgroundColor);
  ellipse(spherePosition.x, spherePosition.y, 20, 20);
  rect(rectPosition.x, rectPosition.y, 20, 20);
  line(spherePosition.x, spherePosition.y, rectPosition.x, rectPosition.y);
  triangle(triPo.x1,triPo.y1,triPo.x2,triPo.y2,triPo.x3,triPo.y3);
  
  let distance1 = computeDistance(spherePosition, rectPosition);
  text(`The circle and sphere are ${round(distance1)} units apart.`, 20, 20);
  
  let mousePosition = {
    "x": mouseX,
    "y": mouseY
  };

  let distance2 = computeDistance(spherePosition, mousePosition);
  let distanceDescription = computeCategoryOfDistance(spherePosition, mousePosition);
  text(`The circle and your mouse are ${round(distance2)} units apart; you're ${distanceDescription}.`, 20, 40);
}

function mousePressed() {
  spherePosition.x = random(width);
  spherePosition.y = random(height);
}

function computeDistance(point1, point2) {
  let deltaX = point1.x - point2.x;
  let deltaY = point1.y - point2.y;
  let distance = sqrt((deltaX ** 2) + (deltaY ** 2));
  return distance;  // returns a number
}

function computeCategoryOfDistance(point1, point2) {
  let distance = computeDistance(point1, point2);
  if (distance > 200) {
    backgroundColor = color(240, 10, 100);
    return "cold";
  } else if (distance > 50) {
    backgroundColor = color(120, 10, 100);
    return "warmer";
  } else {
    backgroundColor = color(0, 10, 100);
    return "red hot";
  }
}
