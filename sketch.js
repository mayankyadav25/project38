var backImage,backgr;
var player, player_running;
var ground,ground_img;

var FoodGroup, meatImage;
var obstaclesGroup, obstacle_img;


var survival_time;
var score=0;
var PLAY=1;
var END=0;
var gameState=PLAY;


function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  

  meatImage = loadImage("meat.png");
  obstacle_img = loadImage("stone.png"); 
  
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  ground.visible=false;
  
  FoodGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  
  background(255);
  
    if(gameState===PLAY){
      if(ground.x<0) {
    ground.x=ground.width/2;
  }
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
      if(FoodGroup.isTouching(player)){
      FoodGroup.destroyEach();
    score = score + 2;
    }
      survival_time = Math.round(frameCount / frameRate());
    switch(score){
        case 10: player.scale=0.12;
                break;
        case 20: player.scale=0.14;
                break;
        case 30: player.scale=0.16;
                break;
        case 40: player.scale=0.18;
                break;
        default: break;
    }
      
    if(keyDown("space")&&player.y>310 ) {
      player.velocityY = -14;
    }
    player.velocityY = player.velocityY + 0.4;
      player.collide(ground);
    spawnFood();
    spawnObstacles();
      if(obstaclesGroup.isTouching(player)){
        gameState=END
      }
    }

  player.debug=true;
 
  drawSprites();
   stroke("white");
  textSize(20);
  fill("white");
  text("SCORE: "+ score, 500,50);
  text("SURVIVAL TIME:" +survival_time,100,50)
    if(gameState===END){
    backgr.velocityX=0;
    obstaclesGroup.velocityXEach=0;
    FoodGroup.velocityXEach=0;
    FoodGroup.destroyEach();
    obstaclesGroup.destroyEach();
    player.destroy();
    stroke("white");
    fill("red");
    textSize(80);
    text("GAME OVER",100,200)
    
  }
  
}

function spawnFood() {
  if (frameCount % 80 === 0) {var meat=createSprite(600,Math.round(random(120,200)),40,10);
    
    meat.addImage(meatImage);
    meat.scale = 0.1;
    meat.velocityX = -5;
 
    meat.lifetime = 300;
    player.depth = meat.depth + 1;
    

    FoodGroup.add(meat);
  }
}

function spawnObstacles() {
  if(frameCount %130===0){
    var obstacle = createSprite(800,350,10,40);
    obstacle.velocityX = -6;
    obstacle.addImage(obstacle_img);
       
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    

    obstaclesGroup.add(obstacle);
  }
}


  
