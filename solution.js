// Be sure to name any p5.js functions we use in the global so Glitch can recognize them.
// Add to this list as you consult the p5.js documentation for other functions.
/* global createCanvas, colorMode, HSB, width, height, random, background, fill, color, random,
          rect, ellipse, stroke, image, loadImage, collideCircleCircle, collideRectCircle, text, 
          mouseX, mouseY, strokeWeight, line, mouseIsPressed, windowWidth, windowHeight, noStroke, 
          keyCode, UP_ARROW, LEFT_ARROW, RIGHT_ARROW, DOWN_ARROW, textSize */

let backgroundColor;
let motherInfo = "The mother cats are named ";
let kittenInfo = "The kittens are named ";
let toyInfo = "Toys: ";

function setup() {
  // Canvas & color settings
  createCanvas(400, 400);
  colorMode(HSB, 360, 100, 100);
  backgroundColor = 95;

  fetch("cats.json")
    .then(response => response.text())
    .then(text => parseCatInfo(text));
}

function draw() {
  background(backgroundColor);
  text(motherInfo, 20, 20);
  text(kittenInfo, 20, 40);
  text(toyInfo, 20, 60);
}

function parseCatInfo(catString) {
  let motherNames = [];
  let kittenNames = [];
  let kittens = [];
  let toys = {};
  let catJSON = JSON.parse(catString);
  for (let i = 0; i < catJSON.length; i++) {
    let cat = catJSON[i];
    motherNames.push(cat.name);
    for (const kitten of cat.kittens) {
      kittens.push(kitten);
    }
  }
  for (const kitten of kittens) {
    kittenNames.push(kitten.name);
    if (toys[kitten.toy] === undefined) {
      toys[kitten.toy] = 1;
    } else {
      toys[kitten.toy]++;
    }
  }
  for (const [key, value] of Object.entries(toys)) {
    toyInfo += `${value} kittens like ${key}, `;
  }
  motherInfo += motherNames.join(", ");
  kittenInfo += kittenNames.join(", ");
}