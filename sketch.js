var play = 1;
var end = 0;
var gameState = 1;


var monkey , monkeyrunning;
var banana ,bananaimage, obstacle, obstacleimage;
var foodGroup, obstacleGroup;

var ground;

var back_ground,backgroundimage,gameoverImage,gameover;

var survivalTime = 0;

function preload(){
  
  
  monkeyrunning =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaimage = loadImage("banana.png");
  obstacleimage = loadImage("obstacle.png");
 backgroundimage = loadImage("1.jpg");
  gameoverImage = loadImage("Game-over-2.png")
}



function setup() {
 
  createCanvas(680,300);
  
  ground = createSprite(400,290,900,10);
  ground.x = ground.width /2;
  ground.velocityX = -7;
  
   back_ground = createSprite(340,150,680,300);
  back_ground.addImage(backgroundimage);
  back_ground.sale = 0.9;
  back_ground.velocityX = -4;
  
  
  
  monkey = createSprite(100,260,10,50);
  monkey.addAnimation("running", monkeyrunning);
  monkey.scale = 0.1

  gameover = createSprite(340,150,200,10);
 

  
  obstacleGroup = createGroup();
  foodGroup = createGroup();
}


function draw() {

  gameover.visible = false;
  
  if(gameState === play){
  
    
    if (ground.x < 350){
      ground.x = ground.width/2;
  }
  
  if (back_ground.x < 250){
      back_ground.x = back_ground.width/2;
  }
  
  if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -9;
  }
  
  monkey.velocityY = monkey.velocityY + 0.3
  

  
 
  monkey.collide(ground);
  
  spawnobstacles();
  spawnfood();
  
  if (monkey.isTouching(foodGroup)) {
  foodGroup.destroyEach();

 
 }
  } 
  
  monkey.debug = false;
   
  if(obstacleGroup.isTouching(monkey)){
    
  gameState = end;
  }
  
  if(gameState === end){
    gameover.addImage(gameoverImage);
   gameover.scale = 0.5;
  survivalTime = 0;
    gameover.visible = true;
   
   
    
    
      monkey.velocityX = 0;
      ground.velocityX = 0;
      back_ground.velocityX = 0;
      obstacleGroup.velocityX = 0;
     
     
      foodGroup.destroyEach();
      obstacleGroup.destroyEach();
    monkey.destroy();
      
  
  }
  
  
  
  
  
  
  drawSprites();

  
  textSize(20);
 
   fill("black");
survivalTime = survivalTime +Math.round(getFrameRate()/60);
  text("survival time: "+ survivalTime, 250,30);
  
   
}

function spawnobstacles(){
 if (frameCount % 300 === 0){
    obstacle = createSprite(670,245,30,30);
   obstacle.velocityX = -7
   obstacle.addImage(obstacleimage);
    obstacle.setLifetime=10;
 
 
   obstacle.scale = 0.2;
 
   obstacleGroup.add(obstacle);
 

 
 
 
 
 
 }
}

function spawnfood(){
  
  if (frameCount % 80 === 0){
     banana = createSprite(340,250,30,30);
    banana.velocityX = -7
    banana.addImage(bananaimage);
    banana.setLifetime=10;
    banana.y = Math.round(random(120,200));
    
  banana.scale = 0.1;

  foodGroup.add(banana);

  
  
  
  }
} 
