// Name any p5.js functions we use in the global so Glitch can recognize them.
// Add to this list as you consult the p5.js documentation for other functions.
/* global createCanvas,keyCode, floor, colorMode, HSB, width, height, random, background, fill, color, random,
          rect, ellipse, stroke, text, mouseX, mouseY, 
          strokeWeight,clear, createSlider, line,removeItem,  mouseIsPressed, windowWidth, windowHeight, noStroke, keyIsDown, CONTROL, textSize, loadImage, image, pmouseX, pmouseY, createAudio */

//modified from kmarventano@ for Google CSSI

let brushHue,
  priorX,
  priorY,
  color1,
  globalS,
  globalB,
  backgroundColor,
  textColor,
  playersWord,
  jars,
  painter,
  eraser,
  slider,
  music;

let randomWords = [
  "fries",
  "book",
  "dog",
  "cat",
  "phone",
  "apple",
  "banana",
  "butterfly",
  "pig",
  "cactus"
];

function setup() {
  // Canvas & color settings
  resetCanvas();
  
  playersWord = getWord();
  
  jars = [new paintJar(50, color1), new paintJar(110, color(240, 100, 100)), new paintJar(170, color(60, 100, 100)), 
          new paintJar(230, color(200, 0, 75))];
}

function draw() {
  printInstructions();

  writeWord(playersWord);
  //painting = image(painter,mouseX - 30, mouseY - 20, 50, 50);

  //creates a redJar object for the red "paint jar",
  //shows the new object, use the getColor() method for the new object
  for (let i = 0; i < jars.length; i++) {
    jars[i].show();
    jars[i].getColor();
  }

  image(eraser, 205, 20, 60, 60);

  //TODO 3: create two more jars of color

  if (mouseIsPressed) {
    //TODO 4: can you think of a way to use line() instead of ellipse()?
    strokeWeight(slider.value())
    line(pmouseX, pmouseY, mouseX, mouseY); 
  }
  strokeWeight(1)

  priorX = mouseX;
  priorY = mouseY;
  
 //music = createAudio(`https://cdn.glitch.com/aad08a6d-d68f-4b3c-bef9-8a64a6db3909%2F1%20Minute%20Timer%20with%20Music%20for%20Kids!%20One%20Minute%20Calming%20Meditation%20Relaxing%20Music!.mp3?v=1595012339676`);
 //music.autoplay(true);
  //music is distorted no matter what
}

function printInstructions() {  
  //TODO 5: printInstructions should display instructions for how to hide the word
  //and anything else users might need to know
  fill(0);
  textSize(20);
  //strokeWeight(0);
  text("1. Use mouse to paint", 80, height - 50);
  text("2. Press any key to restart", 70, height - 30);
  text("3. Press the spacebar for a new word.", 30, height-10);
}

function getWord() {
  //TODO 1: getWord should return a single random word from an array of words
  // let randomWords = ["fries", "book", "dog", "cat", "phone","apple", "banana","butterfly","pig", "cactus"];

  return randomWords[floor(random(randomWords.length))];
}

function writeWord(word) {
  noStroke();
  textSize(13);
  fill(textColor);
  text("Your word: " + word, 290, 25);
}

class paintJar {
  constructor(xPos, color) {
    this.xPos = xPos;
    this.HSBColor = color;
    this.yPos = 50;
    this.radius = 50;
  }

  getColor() {
    if (
      mouseX > this.xPos - this.radius / 2 &&
      mouseX < this.xPos + this.radius / 2 &&
      mouseY > this.yPos - this.radius / 2 &&
      mouseY < this.yPos + this.radius / 2 &&
      mouseIsPressed
    ) {
      brushHue = this.HSBColor;
    }

    stroke(brushHue, 50, 80);
    fill(brushHue, 50, 80);
  }

  show() {
    stroke(this.HSBColor);
    fill(this.HSBColor);
    ellipse(this.xPos, this.yPos, this.radius);
  }
}

function keyPressed() {
  //TODO 2: if a key is pressed, playersWord should be assigned to an empty string ""
  //and the canvas should be cleared
  
  playersWord = "";
  
  clear();
  resetCanvas();
  if (keyCode == 32){
    playersWord = getWord();
  }
  //setup();
  //draw();
  //color(200, 0, 75)
  
}
function resetCanvas(){
  createCanvas(400, 400);
  colorMode(HSB, 360, 100, 100); //using HSB colors
  brushHue = 0;
  priorX = 0;
  priorY = 0;
  background(95);
  strokeWeight(6);
  painter = loadImage(
    "https://cdn.glitch.com/aad08a6d-d68f-4b3c-bef9-8a64a6db3909%2Fpaintbrush.png?v=1595006895262"
  );
  eraser = loadImage("https://cdn.glitch.com/aad08a6d-d68f-4b3c-bef9-8a64a6db3909%2Fimageedit_1_4453802937.png?v=1595008636089");

  globalS = 90;
  globalB = 90;
  backgroundColor = color(200, 0, 75);
  color1 = color(0, globalS, globalB); //red
  textColor = color(300, globalS, globalB);
  background(backgroundColor);
  
  slider = createSlider(1, 50, 1);
  slider.position(0, 0, 100, height);
  slider.style('width', '80px');
}