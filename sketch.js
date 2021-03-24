var path, mainCyclist;
var pathImg, mainRacerImg1, mainRacerImg2;
var player1, pinkCG, oppPink1Img;
var player2, yellowCG, oppYellow2Img;
var player3, redCG, oppRed3Img;
var oppPink1Change, oppYellow2Change, oppRed3Change;
var mainPlayer3Change;
var END = 0;
var PLAY = 1;
var gameState = PLAY;
var gameOver, gameOverImg, restart;
var cycleBell;
var distance = 0;

function preload() {
  pathImg = loadImage("images/Road.png");
  mainRacerImg1 = loadAnimation("images/mainPlayer1.png", "images/mainPlayer2.png");
  mainRacerImg2 = loadAnimation("images/mainPlayer3.png");
  oppPink1Img = loadAnimation("images/opponent1.png", "images/opponent2.png");

  oppYellow2Img = loadAnimation("images/opponent4.png", "images/opponent5.png");

  oppRed3Img = loadAnimation("images/opponent7.png", "images/opponent8.png");

  oppPink1Change = loadAnimation("images/opponent3.png");

  oppYellow2Change = loadAnimation("images/opponent6.png");

  oppRed3Change = loadAnimation("images/opponent9.png");

  mainPlayer3Change = loadAnimation("images/mainPlayer3.png")

  gameOverImg = loadImage("images/gameOver.png");

  cycleBell = loadSound("sound/bell.mp3");
}

function setup() {

  createCanvas(900, 300);

  // Moving background
  path = createSprite(100, 150);
  path.addImage(pathImg);
  path.velocityX = -5;

  //creating boy running
  mainCyclist = createSprite(70, 150, 20, 20);
  mainCyclist.addAnimation("SahilRunning", mainRacerImg1);
  //mainCyclist.addAnimation("mainPlayer", mainPlayer3Change);
  mainCyclist.scale = 0.07;
  mainCyclist.setCollider("circle", 0, 0, 70);
  mainCyclist.debug = false;

  gameOver = createSprite(450, 150);
  gameOver.addImage(gameOverImg);
  gameOver.scale=0.6;

  pinkCG = new Group();
  yellowCG = new Group();
  redCG = new Group();
}

function draw() {
  background(0);



  drawSprites();

  textSize(20);
  fill(255);
  text("Distance: " + distance, 350, 30);

  if (gameState === PLAY) {

    gameOver.visible=false;
    distance = distance + Math.round(getFrameRate() / 50);
    path.velocityX = -(6 + 2 * distance / 150);

    mainCyclist.y = World.mouseY;

    edges = createEdgeSprites();
    mainCyclist.collide(edges);

    if (path.x < 0) {
      path.x = width / 2;
    }
    if (keyDown("space")) {
      cycleBell.play();
    }

    var select_oppPlayer = Math.round(random(1, 3));

    if (World.frameCount % 150 == 0) {

      if (select_oppPlayer == 1) {
        pinkCyclists();
      } else if (select_oppPlayer == 2) {
        yellowCyclists();
      } else {
        redCyclists();

      }
    }

    if (pinkCG.isTouching(mainCyclist)) {
      gameState = END;
      player1.velocityY = 0;
      player1.addAnimation("opponentPlayer1", oppPink1Change);
    }

    if (yellowCG.isTouching(mainCyclist)) {
      gameState = END;
      player2.velocityY = 0;
      player2.addAnimation("opponentPlayer4", oppYellow2Change);
    }
    if (redCG.isTouching(mainCyclist)) {
      gameState = END;
      player3.velocityY = 0;
      player3.addAnimation("opponentPlayer7", oppRed3Change);
    }

    distance = distance + Math.round(getFrameRate() / 50);




  } else if (gameState === END) {

    gameOver.visible = true;
    textSize(20);
    fill(255);
    text("Press Up Arrow To Restart The Game!", 300, 200);

    path.velocityX = 0;
    mainCyclist.velocityY = 0;
    mainCyclist.addAnimation("SahilRunning", mainRacerImg2);
    pinkCG.setVelocityXEach(0);
    pinkCG.setLifetimeEach(-1);


    yellowCG.setVelocityXEach(0);
    yellowCG.setLifetimeEach(-1);

    redCG.setVelocityXEach(0);
    redCG.setLifetimeEach(-1);

    if (keyDown("UP_ARROW")) {
      reset();
    }
  }
}

function pinkCyclists() {
  player1 = createSprite(1100, Math.round(random(50, 250)))
  player1.scale = 0.06;
  player1.velocityX = -(6 + 2 * distance / 150);
  player1.setLifetime = 170;
  player1.addAnimation("opponentPlayer1", oppPink1Img);
  pinkCG.add(player1);
}

function yellowCyclists() {
  player2 = createSprite(1100, Math.round(random(50, 250)));
  player2.scale = 0.06;
  player2.velocityX = -(6 + 2 * distance / 150);
  player2.setLifetime = 170;
  player2.addAnimation("opponentPlayer4", oppYellow2Img);
  yellowCG.add(player2);
}

function redCyclists() {
  player3 = createSprite(1100, Math.round(random(50, 250)))
  player3.scale = 0.06;
  player3.velocityX = -(6 + 2 * distance / 150);
  player3.setLifetime = 170;
  player3.addAnimation("opponentPlayer7", oppRed3Img);
  redCG.add(player3);
}

function reset() {
  gameState = PLAY;
  gameOver.visible = false;
mainCyclist.addAnimation("SahilRunning", mainRacerImg1);
  pinkCG.destroyEach();
  yellowCG.destroyEach();
  redCG.destroyEach();

  distance = 0;

}