/* global createCanvas, colorMode, HSB, width, height, random, round, background, fill, noFill, color, random,
          rect, ellipse, stroke, image, loadImage, frameRate, text, sound, p5, textAlign, BOTTOM,LEFT,
          mouseX,key, mouseY, strokeWeight, line, mouseIsPressed, windowWidth, windowHeight, noStroke, 
          keyCode,save, textSize, noLoop, loop, createAudio, play, textStyle, BOLD, userStartAudio */

let backgroundImage,
  keys,
  cNote,
  cSharp,
  dNote,
  dSharp,
  eNote,
  fNote,
  fSharp,
  gNote,
  gSharp,
  aNote,
  aSharp,
  bNote,
  highcNote,
  soundList,
  assignSound,
  assignColor,
  sheetMusicOne,
  sheetMusicTwo,
  tutorialTrack,
  tutorialStarted,
  tutorialPicked,
  blackKeyExists;

let mic, recorder, soundFile;
let recordingText = 0;
let ellipseOpacity = 75;
let state = 0;

function setup() {
  // canvas and color settings
  createCanvas(800, 600);
  colorMode(HSB, 360, 100, 100);
  backgroundImage = loadImage(
    `https://cdn.glitch.com/8cfcdbf5-d52d-4f68-9425-525d24565e2a%2Fbackground.jpg?v=1596129602980`
  );
  // arrays for the piano keys, sounds, and notes for twinkle twinkle
  keys = [];
  soundList = [];
  sheetMusicOne = [
    0,
    0,
    4,
    4,
    4,
    5,
    5,
    4,
    3,
    3,
    2,
    2,
    1,
    1,
    1,
    0,
    4,
    4,
    3,
    3,
    2,
    2,
    1,
    4,
    4,
    3,
    3,
    2,
    2,
    1,
    0,
    0,
    4,
    4,
    5,
    5,
    4,
    3,
    3,
    2,
    2,
    1,
    1,
    0
  ];
  sheetMusicTwo = [2, 1, 0, 2, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 1, 0];
  // starter variables for identifying the tutorial
  tutorialTrack = 0;
  tutorialStarted = false;
  // add the keys into the array
  let whiteKeyCount = 0;
  for (let i = 0; i < 8; i++) {
    //appends new white keys to keys array
    keys.push(new PianoKeys(whiteKeyCount, "white"));
    whiteKeyCount += 100;
  }
  let blackKeyCount = 75;
  for (let i = 0; i < 5; i++) {
    //appends black keys to keys array
    keys.push(new PianoKeys(blackKeyCount, "black"));
    if (i == 1) {
      blackKeyCount += 200;
    } else {
      blackKeyCount += 100;
    }
  }
  //creates the sound of each key and adds it to soundList array
  soundList.push(
    createAudio(
      `https://cdn.glitch.com/8cfcdbf5-d52d-4f68-9425-525d24565e2a%2FC.mp3?v=1595874627030`
    )
  );
  soundList.push(
    createAudio(
      `https://cdn.glitch.com/8cfcdbf5-d52d-4f68-9425-525d24565e2a%2FD%20(online-audio-converter.com).mp3?v=1595877615674`
    )
  );
  soundList.push(
    createAudio(
      `https://cdn.glitch.com/8cfcdbf5-d52d-4f68-9425-525d24565e2a%2FE.mp3?v=1595877621734`
    )
  );
  soundList.push(
    createAudio(
      `https://cdn.glitch.com/8cfcdbf5-d52d-4f68-9425-525d24565e2a%2FF.mp3?v=1595877624520`
    )
  );
  soundList.push(
    createAudio(
      `https://cdn.glitch.com/8cfcdbf5-d52d-4f68-9425-525d24565e2a%2FG.mp3?v=1595877630881`
    )
  );
  soundList.push(
    createAudio(
      `https://cdn.glitch.com/8cfcdbf5-d52d-4f68-9425-525d24565e2a%2FA.mp3?v=1595877636191`
    )
  );
  soundList.push(
    createAudio(
      `https://cdn.glitch.com/8cfcdbf5-d52d-4f68-9425-525d24565e2a%2FB.mp3?v=1595877640843`
    )
  );
  soundList.push(
    createAudio(
      `https://cdn.glitch.com/8cfcdbf5-d52d-4f68-9425-525d24565e2a%2FHighc.mp3?v=1595877647695`
    )
  );
  soundList.push(
    createAudio(
      `https://cdn.glitch.com/8cfcdbf5-d52d-4f68-9425-525d24565e2a%2FCsharp.mp3?v=1595877607777`
    )
  );
  soundList.push(
    createAudio(
      `https://cdn.glitch.com/8cfcdbf5-d52d-4f68-9425-525d24565e2a%2FD%20sharp.mp3?v=1595877618487`
    )
  );
  soundList.push(
    createAudio(
      `https://cdn.glitch.com/8cfcdbf5-d52d-4f68-9425-525d24565e2a%2FFsharp.mp3?v=1595877626443`
    )
  );
  soundList.push(
    createAudio(
      `https://cdn.glitch.com/8cfcdbf5-d52d-4f68-9425-525d24565e2a%2FGsharp.mp3?v=1595877633169`
    )
  );
  soundList.push(
    createAudio(
      `https://cdn.glitch.com/8cfcdbf5-d52d-4f68-9425-525d24565e2a%2FAsharp.mp3?v=1595877638158`
    )
  );

  mic = new p5.AudioIn();
  mic.start();
  recorder = new p5.SoundRecorder();

  recorder.setInput(mic);

  soundFile = new p5.SoundFile();
}

function draw() {
  background(backgroundImage);
  //shows the piano keys on the screen
  for (let i = 0; i < keys.length; i++) {
    keys[i].show();
  }
  // tells user which key is which
  fill("gray");
  textSize(40);
  text("C", 35, 400);
  text("D", 135, 400);
  text("E", 235, 400);
  text("F", 335, 400);
  text("G", 435, 400);
  text("A", 535, 400);
  text("B", 635, 400);
  text("C", 735, 400);
  textSize(15);
  text("C#/Db", 80, 250);
  text("D#/Eb", 180, 250);
  text("F#/Gb", 380, 250);
  text("G#/Ab", 480, 250);
  text("A#/Bb", 580, 250);
  // the tutorial buttons
  stroke("SaddleBrown");
  fill("Bisque");
  rect(50, 20, 80, 40);
  rect(500, 20, 80, 40);
  fill("SaddleBrown");
  textSize(20);
  text("Tutorial", 55, 45);
  text("Tutorial", 505, 45);
  fill("white");
  text("(Twinkle Twinkle Little Star)", 140, 45);
  text("(Hot Cross Buns)", 590, 45);
  textSize(15);
  stroke("White");
  fill("Black");
  if (recordingText == 0) {
    //textAlign(LEFT, BOTTOM);
    textStyle(BOLD);
    text(
      "Double click the green square to begin recording!",
      width / 2 - 10,
      height - 15
    );
  } else if (recordingText == 1) {
    text(
      "Recording in Progress, Double click the green\n square to stop recording.",
      width / 2 - 5,
      height - 30
    );
    
    
  } else {
    text("Done! Double Click to Download and \n play your recording!", width / 2, height - 30);
  }
  fill(120,100,ellipseOpacity);
  stroke(120,100,ellipseOpacity);
  rect(width - 50, height - 50, 50, 50);
}

function mousePressed() {
  blackKeyExists = false;
  //Match the sound to the according BLACK key
  for (let i = 8; i < keys.length; i++) {
    if (
      mouseX > keys[i].xPos &&
      mouseX < keys[i].xPos + 50 &&
      mouseY > 100 &&
      mouseY < 300
    ) {
      assignSound = soundList[i];
      //changes the color of key that has been pressed
      if (!tutorialStarted) {
        keys[i].color = "DeepSkyBlue";
      }
      assignColor = i;
      blackKeyExists = true;
      //plays note designated to key that was pressed
      assignSound.play();
    }
  }
  //Match the sound to the according WHITE key (if mouse is not on black key)
  if (!blackKeyExists) {
    for (let i = 0; i < 8; i++) {
      if (
        mouseX > keys[i].xPos &&
        mouseX < keys[i].xPos + 100 &&
        mouseY > 100 &&
        mouseY < 500
      ) {
        assignSound = soundList[i];
        //changes the color of key that has been pressed
        if (!tutorialStarted) {
          keys[i].color = "DeepSkyBlue";
        }
        assignColor = i;
        //plays note designated to key that was pressed
        assignSound.play();
      }
    }
  }
  // begins tutorial if button is pressed
  if (mouseX > 50 && mouseX < 130 && mouseY > 20 && mouseY < 60) {
    if (tutorialStarted == true) {
      for (let i = 0; i < 8; i++) {
        keys[i].color = "white";
      }
    }
    tutorialTrack = 0;
    tutorialStarted = true;
    tutorialPicked = 1;
    tutorial(tutorialTrack);
  }
  if (mouseX > 500 && mouseX < 580 && mouseY > 20 && mouseY < 60) {
    if (tutorialStarted == true) {
      for (let i = 0; i < 8; i++) {
        keys[i].color = "white";
      }
    }
    tutorialTrack = 0;
    tutorialStarted = true;
    tutorialPicked = 2;
    tutorial(tutorialTrack);
  }
}

function mouseReleased() {
  // when key is released, sound stops
  assignSound.stop();
  if (assignColor > 7 && !tutorialStarted) {
    //changes key to its original color
    keys[assignColor].color = "black";
    keys[assignColor].show();
  } else if (!tutorialStarted) {
    keys[assignColor].color = "white";
  }
  // continues tutorial unless sheet music has ended
  if (
    !blackKeyExists &&
    mouseX > keys[sheetMusicOne[tutorialTrack]].xPos &&
    mouseX < keys[sheetMusicOne[tutorialTrack]].xPos + 100 &&
    mouseY > keys[sheetMusicOne[tutorialTrack]].yPos &&
    mouseY < keys[sheetMusicOne[tutorialTrack]].yPos + 400 &&
    tutorialStarted == true
  ) {
    tutorial(tutorialTrack + 1);
    if (tutorialTrack == sheetMusicOne.length - 2) {
      tutorialStarted = false;
    } else {
      tutorialTrack++;
    }
  }
  if (
    !blackKeyExists &&
    mouseX > keys[sheetMusicTwo[tutorialTrack]].xPos &&
    mouseX < keys[sheetMusicTwo[tutorialTrack]].xPos + 100 &&
    mouseY > keys[sheetMusicTwo[tutorialTrack]].yPos &&
    mouseY < keys[sheetMusicTwo[tutorialTrack]].yPos + 400 &&
    tutorialStarted == true
  ) {
    tutorial(tutorialTrack + 1);
    if (tutorialTrack == sheetMusicOne.length - 2) {
      tutorialStarted = false;
    } else {
      tutorialTrack++;
    }
  }
}

// shows the next step of the tutorial in dark blue
function tutorial(tutorialTrack) {
  if (tutorialPicked == 1) {
    if (tutorialTrack > 0) {
      keys[sheetMusicOne[tutorialTrack - 1]].color = "white";
    }
    keys[sheetMusicOne[tutorialTrack]].color = "DarkBlue";
  } else if (tutorialPicked == 2) {
    if (tutorialTrack > 0) {
      keys[sheetMusicTwo[tutorialTrack - 1]].color = "white";
    }
    keys[sheetMusicTwo[tutorialTrack]].color = "DarkBlue";
  }
}

class PianoKeys {
  constructor(xPos, color) {
    this.xPos = xPos;
    this.color = color;
    // if statement to make the piano keys their correct size
    if (color == "black") {
      this.pianoH = 200;
      this.pianoW = 50;
    } else if (color == "white") {
      this.pianoH = 400;
      this.pianoW = 100;
    }
    this.yPos = 100;
  }

  show() {
    //draws the piano keys
    stroke("black");
    fill(this.color);
    rect(this.xPos, this.yPos, this.pianoW, this.pianoH);
  }
}

function doubleClicked() {
  if (mouseX >= width - 50 && mouseY >= height - 50 && doubleClicked) {
    //let recordingIp = false;
    //if (key === "r") {
    recordingText++;
    userStartAudio();

    if (state === 0 && mic.enabled) {
      recorder.record(soundFile);

      text("Recording!", 0, height - 50);

      state++;
    } else if (state === 1) {
      recorder.stop();
      recordingText++;

      state++;
    } else if (state === 2) {
      recordingText++;
      soundFile.play();
      save(soundFile, "myPianoSong.wav");

      state++;
    }
  }
}
