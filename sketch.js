var tower, towerImage; 
var door, doorImage, doorGroup;
var climber, climberImage, climberGroup;
var invisibleClimber, invisibleClimberGroup;
var ghost, ghostImage;
var gameState = "play";



function preload () {
  
  towerImage = loadImage ("tower.png");
  doorImage = loadImage ("door.png");
  climberImage = loadImage ("climber.png");
  ghostImage = loadImage("ghost-standing.png");
   spookySound = loadSound("spooky.wav");
  
  
  
  
  
}

function setup () {
  createCanvas(600,600);
  spookySound.play();
  tower = createSprite (300,300, 20,20);
  tower.addImage (towerImage);
  tower.velocityY = 1;
  
  doorGroup = new Group ();
  climberGroup = new Group ();
  invisibleClimberGroup = new Group () ;
  
  
  ghost = createSprite (300,300, 20,20);
  ghost.addImage(ghostImage);
  ghost.scale = 0.4;

  
 
}

function draw () {
 
  if (gameState === "play") {
  if (tower.y>400) {
    tower.y=300;
  }
  
  if (keyDown("Space")) {
    ghost.velocityY = -12;
  }
  
  if (keyDown("right")) {
    ghost.velocityX = 12;
  }
  
  if (keyDown("left")) {
    ghost.velocityX = -12;
  }
  
  ghost.velocityY = ghost.velocityY + 0.8;
  
  spawnDoor();
  
  if(climberGroup.isTouching(ghost)){
      ghost.velocityY = 0;
    }
  
   if(invisibleClimberGroup.isTouching(ghost) || ghost.y > 600){
      ghost.destroy();
      gameState = "end"
    }
    
  }

 
  
  drawSprites ();

    
 if (gameState === "end"){
    background ("black");
   stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230,250)
  }
  
}



function spawnDoor () {
  if (frameCount%240 === 0) { 
    //create Sprites and add image
    door = createSprite (300, 50, 20,20);
    door.addImage(doorImage);
    
    climber = createSprite (300,100,20,20);
    climber.addImage(climberImage);
    
    invisibleClimber = createSprite (300,150,20,20);
    invisibleClimber.visible = false;
    
    door.x = Math.round(random(100,400));
    door.velocityY = 1;  
    
    climber.x = door.x;
    climber.velocityY = 1;
    
    invisibleClimber.x = climber.x - 50;
    invisibleClimber.velocityY = 1;
    
   door.depth = ghost.depth
    ghost.depth = ghost.depth + 1;
    
    //Avoid memory leak so assign lifetime to variable
    door.lifetime = 699;
    climber.lifetime = door.lifetime
    invisibleClimber.lifetime = climber.lifetime
    
    doorGroup.add(door);
    climberGroup.add(climber);
    invisibleClimberGroup.add(invisibleClimber);
    
  }
   
}
