//Move the catcher with the left and right arrow keys to catch the falling objects. 

/* VARIABLES */
let catcher, fallingObject;
let score = 0;
let backgroundImg;
let catcherImg;
let fallingObjectImg;
let secondfallingObject;
let secondfallingObjectImg;
let soundFlower;
let soundRock;
let backgroundSound;



/* PRELOAD LOADS FILES */
function preload(){
  FallingObjectImg = loadImage("assets/flower.png");
  backgroundImg=loadImage ("assets/grass.jpeg");
  catcherImg= loadImage("assets/basket.png");
  secondfallingObjectImg = loadImage ("assets/rock.png");
  soundFlower = loadSound ("assets/soundflower.wav");
  soundRock = loadSound ("assets/rocksound.mp3");
  backgroundSound = loadSound ("assets/background.mp3");
}

/* SETUP RUNS ONCE */
function setup() {
  createCanvas(400,400);
  //resize
  FallingObjectImg. resize (80,0);
  backgroundImg.resize(400,400);
  catcherImg.resize (80, 0);
  secondfallingObjectImg.resize (80,0);

  //Create catcher 
  catcher = new Sprite(catcherImg, 200,380,100,20, "k");
  catcher.color = color(95,158,160);

  //Create falling object
  fallingObject = new Sprite(FallingObjectImg,100,0,10);
  fallingObject.color = color(0,128,128);
  fallingObject.velocity.y = 2;
  fallingObject.rotationLock = true; 
  
  secondfallingObject = new Sprite(secondfallingObjectImg, 100, 0, 10);
  secondfallingObject.color = color(0,128,128);
  secondfallingObject.velocity.y = 2;
  secondfallingObject.rotationLock = true;

  backgroundMusic();

}

/* DRAW LOOP REPEATS */
function draw() {
  background(224,224,224);

  // background image
  image (backgroundImg, 0, 0 );

  // Draw directions to screen
  fill(0);
  textSize(12);
  text("Help GWC collect \n hope by \nmoving the \nbasket with the \nleft and right \narrow keys to \ncatch the flowers! \n", width-100, 20);

  //If fallingObject reaches bottom, move back to random position at top
  if (fallingObject.y >= height) {
    fallingObject.y = 0;
    fallingObject.x = random(50,370);
    fallingObject.vel.y = random(3,5);
    
    //Spicy 
    score = score - 1;
  }

  if (secondfallingObject.y >= height) {
    secondfallingObject.y = 0;
    secondfallingObject.x = random(50,370);
    secondfallingObject.vel.y = random(2,4);
    score = score + 0;
    
  }
  
  //Move catcher
  if (kb.pressing("left")) {
    catcher.vel.x = -3;
  } else if (kb.pressing("right")) {
    catcher.vel.x = 3;
  } else {
    catcher.vel.x = 0;
  }

  //Stop catcher at edges of screen
  if (catcher.x < 50) {
    catcher.x = 50;
  } else if (catcher.x > 350) {
    catcher.x = 350;
  }

  // If fallingObject collides with catcher, move back to random position at top
  if (fallingObject.collides(catcher)) {
    fallingObject.y = 0;
    fallingObject.x = random(width);
    fallingObject.vel.y = random(1,5);
    fallingObject.direction = "down";
    score = score + 1;
    soundFlower.play()
  }

  if (secondfallingObject.collides(catcher)) {
    secondfallingObject.y = 0;
    secondfallingObject.x = random(width);
    secondfallingObject.velocity.y = random(1,5);
    secondfallingObject.direction = "down"; 
    score = score - 1;
    soundRock.play()
  }

  // Draw the score to screen
  fill(0, 128, 128);
  textSize(20);
  text("Score = " + score, 10, 30);
  
  //Spicy - Check to see if player won
  if (score == 10) {
    youWin();

    // Restart the game if player clicks the mouse
    if (mouseIsPressed) {
      restart();
    }
  }
  
    //Medium - If score is less then zero, you lose
  if (score < -1) {
    background(224,224,224);
    
    //Draw sprites off of screen
    catcher.pos = { x: 600, y: -300 };
    fallingObject.pos = { x: -100, y: 0 };
    secondfallingObject.pos = { x: -100, y: 0 };
    //Draw end of game text
    textSize(20);
    fill(0);
    text("You lose!", width/2 - 50, height/2 - 30); 
    textSize(12);
    text("Reload to play again.", width/2 - 70, height/2);
  }
}

/* FUNCTIONS */

//Spicy
function youWin() {
  background(224,224,224);
  
  //Draw sprites off of screen
  catcher.pos = { x: 600, y: -300 };
  fallingObject.pos = { x: -100, y: 0 };
  secondfallingObject.pos = { x: -100, y: 0 };

  //Draw end of game text
  textSize(20);
  fill("#55483F");
  text("You win!", width/2 - 50, height/2 - 30); 
  textSize(12);
  text("Click the mouse anywhere to play again.", width/2 - 120, height/2);
}

//Spicy 
function restart() {
  //Reset score
  score = 0;

  //Reset sprites
  catcher.pos = { x: 200, y: 380 };
  fallingObject.y = 0;
  fallingObject.x = random(width);
  fallingObject.velocity.y = random(1,5);
  fallingObject.direction = "down";
  
  secondfallingObject.y = 0;
  secondfallingObject.x = random(width);
  secondfallingObject.velocity.y = random(1,5);
  secondfallingObject.direction = "down";
}

if (firstFallingObject.collides(secondFallingObject)) {
    firstFallingObject.direction = "down";
    secondFallingObject.direction = "down";
  }

function backgroundMusic (){
  backgroundSound.play ();
  backgroundSound.loop ();
  backgroundSound.setVolume(1);
  userStartAudio ();
}