/* global createCanvas, colorMode, HSB, width, height, random, round, background, fill, noFill, color, random,
          rect, ellipse, stroke, image, loadImage, frameRate, text, sound, p5, save, p5.AudioIn,
          mouseX,key, mouseY, strokeWeight, line, mouseIsPressed, windowWidth, windowHeight, noStroke, 
          keyCode, UP_ARROW, LEFT_ARROW, RIGHT_ARROW, DOWN_ARROW, textSize, noLoop, loop, createAudio, play */

let backgroundColor,
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
  sheetMusic,
  tutorialTrack,
  tutorialStarted;

let mic, recorder, soundFile;
let recordingText = false;
let state = 0;

function setup() {
  // canvas and color settings
  let cnv = createCanvas(800, 600);
  // cnv.mousePressed(canvasPressed);

  colorMode(HSB, 360, 100, 100);
  backgroundColor = 95;
  keys = [];
  soundList = [];
  sheetMusic = [0, 0, 4, 4, 5, 5, 4, 3, 3, 2, 2, 1, 1, 0, 4, 4, 3, 3, 2, 2, 1];
  let whiteKeyCount = 0;
  tutorialTrack = 0;
  tutorialStarted = false;
  for (let i = 0; i < 8; i++) {
    //appends new piano keys to keys array
    keys.push(new PianoKeys(whiteKeyCount, "white"));
    whiteKeyCount += 100;
  }
  let blackKeyCount = 75;
  for (let i = 0; i < 5; i++) {
    //appends new piano keys to keys array
    keys.push(new PianoKeys(blackKeyCount, "black"));
    if (i == 1) {
      blackKeyCount += 200;
    } else {
      blackKeyCount += 100;
    }
  }

  mic = new p5.AudioIn();
  mic.start();
  recorder = new p5.SoundRecorder();

  recorder.setInput(mic);

  soundFile = new p5.SoundFile();

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
}

function draw() {
  background(backgroundColor);
  //shows the piano keys on the screen
  for (let i = 0; i < keys.length; i++) {
    keys[i].show();
  }
  
  //tells user which key is which
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
  //***make the button look prettier***
  fill("white");
  rect(50, 20, 80, 40);
  fill("gray");
  textSize(20);
  text("Tutorial", 55, 45);
  textSize(20);
  if (recordingText == false) {
    text("Double click the red circle to begin recording!", 0, height - 50);
  }
  fill('red');
  stroke('red');
  rect(width - 50, height - 50, 50, 50);
}

function mousePressed() {
  let blackKeyExists = false;
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
      keys[i].color = "DeepSkyBlue";
      assignColor = i;
      blackKeyExists = true;
      //plays note designated to key that was pressed
      assignSound.play();
    }
  }
  //Match the sound to the according WHITE key
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
        keys[i].color = "DeepSkyBlue";
        assignColor = i;
        //plays note designated to key that was pressed
        assignSound.play();
      }
    }
  }

  if (mouseX > 50 && mouseX < 130 && mouseY > 20 && mouseY < 40) {
    tutorial(tutorialTrack);
    tutorialStarted = true;
  }

  if (
    mouseX > keys[sheetMusic[tutorialTrack]].xPos &&
    mouseX < keys[sheetMusic[tutorialTrack]].xPos + 100 &&
    mouseY > keys[sheetMusic[tutorialTrack]].yPos &&
    mouseY < keys[sheetMusic[tutorialTrack]].yPos + 400 &&
    tutorialStarted == true
  ) {
    tutorial(tutorialTrack + 1);
    tutorialTrack++;
  }
}

function mouseReleased() {
  assignSound.stop();
  if (assignColor > 7) {
    //changes key to its original color
    keys[assignColor].color = "black";
    keys[assignColor].show();
  } else if (!tutorialStarted) {
    keys[assignColor].color = "white";
  }
}

function tutorial(tutorialTrack) {
  if (tutorialTrack != 0) {
    keys[sheetMusic[tutorialTrack - 1]].color = "white";
  }
  keys[sheetMusic[tutorialTrack]].color = "DarkBlue";
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
/*
function canvasPressed() {
  let recordingIp = false;
  if (key === "r") {
    recordingText = true;
    userStartAudio();

    if (state === 0 && mic.enabled) {
      recorder.record(soundFile);

      if (recordingIp == false) {
        stroke("red");
        fill("red");
        ellipse(width - 50, height - 50, 50, 50);
        stroke("black");
        fill("black");
        text("Recording!", 0, height - 50);
      }
      if (key === "s") {
        state++;
      }
    } else if (state === 1) {
      recorder.stop();
      recordingIp = true;
      if (key === "d") {
        state++;
      }
    } else if (state === 2) {
      soundFile.play();
      save(soundFile, "myPianoSong.wav");
      if (key === " e") {
        state++;
      }
    }
  }
}
*/
function doubleClicked() {
  if (mouseX >= width - 50 && mouseY >= height - 50 && doubleClicked) {
    let recordingIp = false;
    //if (key === "r") {
    recordingText = true;
    userStartAudio();

    if (state === 0 && mic.enabled) {
      recorder.record(soundFile);

      if (recordingIp == false) {
        stroke("red");
        fill("red");
        ellipse(width - 50, height - 50, 50, 50);
        stroke("black");
        fill("black");
        text("Recording!", 0, height - 50);
      }
      
      text("Recording!", 0, height - 50);

      state++;
    } else if (state === 1) {
      recorder.stop();
      recordingIp = true;

      state++;
    } else if (state === 2) {
      soundFile.play();
      save(soundFile, "myPianoSong.wav");

      state++;
    }
  }
}
//}

/*

let mic, recorder, soundFile;
let state = 0;

function setup() {
  let cnv = createCanvas(100, 100);
  cnv.mousePressed(canvasPressed);
  background(220);
  //textAlign(CENTER, CENTER);

  // create an audio in
  mic = new p5.AudioIn();

  // prompts user to enable their browser mic
  mic.start();

  // create a sound recorder
  recorder = new p5.SoundRecorder();

  // connect the mic to the recorder
  recorder.setInput(mic);

  // this sound file will be used to
  // playback & save the recording
  soundFile = new p5.SoundFile();

  text('tap to record', width/2, height/2);
}

function canvasPressed() {
  // ensure audio is enabled
  userStartAudio();

  // make sure user enabled the mic
  if (state === 0 && mic.enabled) {

    // record to our p5.SoundFile
    recorder.record(soundFile);

    background(255,0,0);
    text('Recording!', width/2, height/2);
    state++;
  }
  else if (state === 1) {
    background(0,255,0);

    // stop recorder and
    // send result to soundFile
    recorder.stop();

    text('Done! Tap to play and download', width/2, height/2, width - 20);
    state++;
  }

  else if (state === 2) {
    soundFile.play(); // play the result!
    save(soundFile, 'mySound.wav');
    state++;
  }
}
*/
