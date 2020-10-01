// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
let gray = 0;
function setup() {
  createCanvas(100, 100);
}
function draw() {
  background(gray);
}
function mousePressed(){
  gray +=20;
}
function mouseReleased() {
  gray -= 20;
}