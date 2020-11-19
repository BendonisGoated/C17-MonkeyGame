
var monkey , monkey_running,monkeyStopped;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup, bananaGroup;
var score = 0;
var ground;
var PLAY = 1;
var  END = 0;
var gameState = PLAY;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
  monkeyStopped = loadAnimation("sprite_0.png")
 
}



function setup() {
  createCanvas(500,400);
  monkey = createSprite(100,320,10,10);
  monkey.addAnimation("monkey",monkey_running);
  monkey.addAnimation("stopped",monkeyStopped)
  monkey.scale = 0.15;
  
  ground = createSprite(250,370,500,10);
  ground.velocityX = -10;
  
   bananaGroup = new Group();
  obstacleGroup = new Group();
}


function draw() {
    background("red");
  
  if(gameState===PLAY) {
    ground.velocityX = -5;
    
         if(ground.x<ground.width/2){
           ground.x = ground.width/2;
           }

        if(keyDown("space")){
           monkey.velocityY= -10;
           }

        monkey.velocityY = monkey.velocityY + 0.8;

         food(); 
        obstacles();
       
        score = score + Math.round(frameRate()/60)
    
        if(obstacleGroup.isTouching(monkey)){
          gameState= END;
        }
         
     }
      else if(gameState===END){
        ground.velocityX= 0;
        monkey.velocityX= 0;
        monkey.changeAnimation("stopped",monkeyStopped);
        obstacleGroup.setVelocityXEach(0);
        bananaGroup.destroyEach();
        obstacleGroup.setLifetimeEach(-1);
      }
  
     monkey.collide(ground);
    
  
  
   
   
    drawSprites();
  
  stroke("black")
  text("Survival time :"+ score,400,50);
  
}

function food(){
  if(frameCount%60===0){
     banana = createSprite(500,Math.round(random(100,200)),10,10);
    banana.addImage(bananaImage);
    banana.velocityX= -9;
    banana.scale= 0.1;
    banana.lifetime = 120;
    bananaGroup.add(banana);
     }
}

function obstacles() {
  if(frameCount%100===0){
    obstacle = createSprite(500,330,10,10);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX= -9;
    obstacle.scale= 0.2
    obstacle.lifetime = 100;
    obstacleGroup.add(obstacle);
    
  }
    
}



