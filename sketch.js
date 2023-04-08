var PLAY = 1;
var END = 0;
var WIN = 2;
var gameState = PLAY;
var bunny_running , bunny_collided , bunny
var obstacle1 , obstaclesGroup
var gameOver , restart
var jungle , jungleImage 
var bush ,invisibleGround

var score=0;

function preload(){
bunny_running = loadAnimation("bunny-1.png","bunny-2.png","bunny-3.png","bunny-4.png","bunny-5.png","bunny-6.png","bunny-7.png","bunny-8.png")
bunny_collided = loadAnimation("bunny-1.png")
jungleImage = loadImage("Jungle.png")
gameOverImg = loadImage("Game Over.png")
restartImg = loadImage("restart.png")
carrotImg = loadImage("carrot.png")
obstacle1Img = loadImage("rock.png")
bushImg = loadImage("bush.png")
}

function setup() {
    createCanvas(600,600)

    jungle = createSprite(400,100,400,20);
    jungle.addImage(jungleImage);
    jungle.scale=1

    bunny = createSprite(80,320,20,50);
    bunny.addAnimation("running", bunny_running);
    bunny.addAnimation("collided", bunny_collided);
    bunny.scale = 0.5;
    bunny.setCollider("circle",0,0,300)
  
    invisibleGround = createSprite(400,350,1600,10);
    invisibleGround.visible = false;
  
    gameOver = createSprite(400,100);
    gameOver.addImage(gameOverImg);
    
    restart = createSprite(550,140);
    restart.addImage(restartImg);
    
    gameOver.scale = 0.5;
    restart.scale = 0.1;
  
    gameOver.visible = false;
    restart.visible = false;
    
    
    bushesGroup = new Group();
    obstaclesGroup = new Group();
    
    score = 0;
  
}
function draw() {
    background(255);

    bunny.x=camera.position.x-270;
   
  if (gameState===PLAY){

    jungle.velocityX=-3

    if(jungle.x<100)
    {
       jungle.x=400
    }
   console.log(bunny.y)
    if(keyDown("space")) {
      bunny.velocityY = -16;
        }
        spawnbushes();
    spawnObstacles();
}
bunny.velocityY = bunny.velocityY + 0.8

    bunny.collide(invisibleGround);
    if(bunny.isTouching(obstaclesGroup)){
      gameState = END;
    }

    if(bunny.isTouching(bushesGroup)){
      score = score + 1;
      bushesGroup.destroyEach();
    }
  else if (gameState === END) {
    gameOver.x=camera.position.x;
    restart.x=camera.position.x;
    gameOver.visible = true;
    restart.visible = true;
    bunny.velocityY = 0;
    jungle.velocityX = 0;
    obstaclesGroup.setVelocityXEach(0);
    bushesGroup.setVelocityXEach(0);

    bunny.changeAnimation("collided",bunny_collided);
    
    obstaclesGroup.setLifetimeEach(-1);
    bushesGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
        reset();
    }
  }
  else if (gameState === WIN) {
    jungle.velocityX = 0;
    bunny.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    bushesGroup.setVelocityXEach(0);

    bushes.changeAnimation("collided",bunny_collided);

    obstaclesGroup.setLifetimeEach(-1);
    bushesGroup.setLifetimeEach(-1);
  }
  drawSprites();

  textSize(20);
  stroke(3);
  fill("black")
  text("Score: "+ score, camera.position.x,50);
  
  if(score >= 5){
    bunny.visible = false;
    textSize(30);
    stroke(3);
    fill("black");
    text("Congragulations!! You win the game!! ", 70,200);
    gameState = WIN;
  }
}

function spawnbushes() {
 
  if (frameCount % 150 === 0) {

    var bush = createSprite(camera.position.x+500,330,40,10);

    bush.velocityX = -(6 + 3*score/100)
    bush.scale = 0.6;

    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: bush.addImage(bushImg);
              break;
      case 2: carrot.addImage(carrotImg);
              break;
      default: break;
    }
       
    bush.scale = 0.05;
    bush.lifetime = 400;
    
    bush.setCollider("rectangle",0,0,bush.width/2,bush.height/2)
    bushesGroup.add(bush);
    
  }
  
}

function spawnObstacles() {
  if(frameCount % 120 === 0) {

    var obstacle1 = createSprite(camera.position.x+400,330,40,40);
    obstacle1.setCollider("rectangle",0,0,200,200)
    obstacle1.addImage(obstacle1Img);
    obstacle1.velocityX = -(6 + 3*score/100)
    obstacle1.scale = 0.05;      

    obstacle1.lifetime = 400;
    obstaclesGroup.add(obstacle1);
    
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  bunny.visible = true;
    bunny.changeAnimation("collided", bunny_collided);
    bushesGroup.destroyEach();
    obstaclesGroup.destroyEach();
  score = 0;
}