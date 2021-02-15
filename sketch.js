//declaring the variables
var PLAY=1;
var END=0;
var gameState=1;


var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var SurvivalTime

function preload(){
  
  //loading animations or images
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
  
 
}



function setup() {
 
  
  
  
  //creating the monkey
  monkey=createSprite(80, 315, 20, 20);
 monkey.addAnimation("running", monkey_running) ;
  monkey.scale=0.1;
  
  
  
  //creating the ground
  ground=createSprite(400, 350, 900, 10);
  ground.velocityX=-4;
ground.x=ground.width/2;
  
  
 // creating the grounps
obstacleGroup=new Group();
  FoodGroup= new Group();
 
  SurvivalTime=0;
  
   
  monkey.setCollider("circle",5,5,260);
  monkey.debug=false;
  
  
}



function draw() {


  background("white");
  textSize(15);
  text("Survival Time: " + SurvivalTime, 270,40);
  
  if(gameState==PLAY){
    
    ground.velocityX=-4;
    
  //making the monkey jump
  if(keyDown("space")  && monkey.y>=314) {
    monkey.velocityY=-16;
     }
    
  //giving gravity to the monkey
  monkey.velocityY=monkey.velocityY+0.8;
  
      
  //Adding infinite ground
  if(ground.x>0){
    ground.x=ground.width/2;
  }
     //score
  if(frameCount % 50==0 ){
     SurvivalTime= SurvivalTime+1;
  }
  
  
    
    if(obstacleGroup.isTouching(monkey)){
      gameState=END;
    }
    
    
    
  }else if(gameState==END){
    ground.velocityX=0;
    monkey.velocityY=0;
    
    //reset();
    
    obstacleGroup.setVelocityXEach(0)
    FoodGroup.setVelocityXEach(0);
    
    FoodGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
  }
  
  

 
  //destroying the food
  if(monkey.isTouching(FoodGroup)){
    FoodGroup.destroyEach();
  }
   
  //making the monkey with the ground
  monkey.collide(ground);
  
  bananas();
  
  obstacles();
  
  
drawSprites();
  function bananas(){
    if(frameCount % 80==0){
       var bananas=createSprite(450, Math.round(random(120,200)),20,20);
      bananas.addImage( bananaImage);
      bananas.velocityX=-4;
      bananas.scale=0.1;
      FoodGroup.add(bananas);
       }
  }
    function obstacles(){
      if(frameCount % 300==0 ){
        var obstacles=createSprite(Math.round(random(450, 460)),330,20,20);
        obstacles.addImage( obstacleImage);
        obstacles.velocityX=-4;
        obstacles.scale=0.1;
        obstacleGroup.add(obstacles)
      }
    }
   
  //function reset(){
   // gameState=PLAY;
   // obstacleGroup.destroyEach();
   // FoodGroup.destroyEach();
   // SurvivalTime=0;
 // }
  
  
}






