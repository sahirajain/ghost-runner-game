var PLAY=1
var END=0
var towerImg, tower;
var  doorImg, door, doorsGroup, climberImg, climber, climbersGroup, ghost, ghostImg,score, invisibleBlockGroup, invisibleBlock;
var gameState = PLAY

function preload(){
    ghost_running =   loadAnimation("ghost-jumping.png","ghost-standing.png");
    ghost_collided = loadImage("ghost-standing.png");

    door=loadImage("door.png");
    tower=loadImage("tower.png")

    gameOver=loadImage("Game-Over-PNG-Image.png")
    restart=loadImage("images.jpg")
}



function setup() {
    createCanvas(600, 200);
    ghost = createSprite(50,180,20,50);
    ghost.addAnimation("running",ghost_running);
    

    gameOver = createSprite(300,100);
    gameOver.addImage(gameOver);

    restart = createSprite(300,140);
    restart.addImage(restart);

    gameOver.scale = 0.5;
    restart.scale = 0.5;

    gameOver.visible = false;
    restart.visible = false;

    obstaclesGroup = new Group();

    score = 0;
}



function draw() {
  
    background(0);
  
    text("Score: "+ score, 500,50);
    console.log("gamestate")
    if (gameState===PLAY){
        score = score + Math.round(getFrameRate()/60);

        if(keyDown("space") && ghost.x >= 159) {
            ghost.velocityX = -12;
          }
          ghost.velocityY = ghost.velocityY + 0.8
          if (tower.y < 0){
            tower.y = tower.width/2;
          }
          if(door.isTouching(ghost)){
            gameState = END;
    }
}
else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    tower.velocityY = 0;
    ghost.velocityX = 0;
    //ghost.changeAnimation("collided",ghost_collided);
    
}
if(mousePressedOver(restart)) {
    reset();
  }
  drawSprites();
}
function reset(){
    gameState = PLAY;
    gameOver.visible = false;
    restart.visible = false;
    
   
    
    
    ghost.changeAnimation("running",ghost_running);
    
    if(localStorage["HighestScore"]<score){
      localStorage["HighestScore"] = score;
    }
    console.log(localStorage["HighestScore"]);
    
    score = 0;
    
  }
