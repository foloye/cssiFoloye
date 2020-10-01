// Be sure to name any p5.js functions we use in the global so Glitch can recognize them.
// Add to this list as you consult the p5.js documentation for other functions.
/* global createCanvas, colorMode, HSB, width, height, random, background, fill, color, random,
          rect, ellipse, stroke, image, loadImage, collideCircleCircle, collideRectCircle, text, 
          mouseX, mouseY, strokeWeight, line, mouseIsPressed, windowWidth, windowHeight, noStroke, 
          keyCode, UP_ARROW, LEFT_ARROW, RIGHT_ARROW, DOWN_ARROW, textSize */

let drops;


function setup() {
  createCanvas(500, 500);
  colorMode(HSB, 100);
  // Variables for droplet 1
  let numDots = 25;
  drops = [];
  for (let i = 0; i < numDots; i++){
    drops.push(new RainDrop);
  }
  
}

function draw() {
  background(0, 0, 95);
  for (let i = 0; i < drops.length; i++){
    drops[i].dropAndShow();
  }
  
}
class RainDrop {
  // the constructor will be called wheneeveer you run 'new RainDrop()'
  constructor(x, y, d, fallSpeed) {
    this.x = random(width);
    this.y = 0;
    this.d = random(10,20);
    this.fallSpeed = random(5,15);
  }
// class Grass {
//   constructor ()
// }


  show() {
    noStroke();
    fill(60, 80, 80);
    ellipse(this.x, this.y, this.d);
  }
  grass(){
    
  }

  drip() {
    this.y += this.fallSpeed;
    // If it goes off the screen...
    if (this.y > height) {
      // ...reset it...
      this.y = 0;
      // ...and move it somewhere random.
      this.x = random(width);
    }
  }
    
  dropAndShow(){
    this.drip();
    this.show();
  }
  
}
