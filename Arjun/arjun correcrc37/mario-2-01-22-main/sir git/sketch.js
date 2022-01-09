var OGmario,OGmario_img, mario, marioRunning, marioCollide, bgImage, bg, brickGroup, brickImg, coinImg, coinGroup, score=0, mushroom, turtle,headBashChar, headBashCharIMAGE;
var headBashCharGroup;
var Movemush ;//31-12-21
var gamestate= 'off';
var restart;
var bg1;
var dieSound;
var start;
function preload(){
    jumpSound=loadSound("sounds/jump.mp3");
    headBashCharIMAGE = loadImage("images/og/head_bash_car.png")
    bgImage = loadImage("images/og/bgold.jpg");
    mushroom = loadAnimation("images/mush1.png","images/mush2.png","images/mush3.png","images/mush4.png","images/mush5.png","images/mush6.png");
    turtle = loadAnimation("images/tur1.png","images/tur2.png","images/tur3.png","images/tur4.png","images/tur5.png");
    marioRunning = loadAnimation("images/mar1.png","images/mar2.png","images/mar3.png","images/mar4.png","images/mar5.png","images/mar6.png","images/mar7.png");
    brickImg = loadImage("images/brick.png");
    OGmario_img=loadImage("images/og/OGmario.png");
    coinImg=loadAnimation("images/con1.png","images/con2.png","images/con3.png","images/con4.png","images/con5.png","images/con6.png");
    restartImg=loadImage('images/restart transparent.png');
    dieSound=loadSound('sounds/dieSound.mp3');
    bg1 = loadImage("images/bgnew.jpg")
}
//var h = window.innerHeight-500;
function setup() {
createCanvas(2000, 1000);
bg=createSprite(500,250);
bg.addImage("1",bgImage);
bg.addImage("2",bg1)
bg.scale=0.99;
//bg.velocityX=-5;
// 23-12-21        
   
platform=createSprite(width/2,height-150,width,10);
platform.visible=false

OGmario=createSprite(200,400,50,60);
//mario.addAnimation("running",marioRunning);
OGmario.addImage(OGmario_img);
OGmario.scale=0.5; //original value was 0.2 for class(codr) asset


obstacleGroup = new Group();
brickGroup = new Group();
coinGroup = new Group();
brickBorderGroup = new Group();
headBashCharGroup  = new Group();
OGmario.debug=true;
OGmario.setCollider("rectangle",0,0,100,181);

restart=createSprite(1000,500,100,100);
restart.addImage(restartImg);
restart.visible=false;
start =createSprite(1000,500)

//html
let div = createDiv('this is some text');
let p = createP('this is a paragraph');
div.style('font-size', '106px');
p.style('font-size', '86px');
//radio
radio = createRadio();
  radio.option('1');
  radio.option('2');

  radio.style('font-size', '60px');
}

function draw() {
    background(0);
if(mousePressedOver(start)){
    gamestate ="play"
    start.visible =false
    removeElements(); 

}

    if(gamestate=='play'){
        OGmario.collide(platform);
        if(keyDown("w")){        
            // 23-12-21        
        // weired sound solved on w key press 
            if(OGmario.y>=platform.y-60){
                OGmario.velocityY=-30;
                jumpSound.play();     
            }
        }
        OGmario.velocityY=OGmario.velocityY+1.50;
        // 23-12-21
        

        if(bg.x<100){
            bg.x=bg.width/4;
        }
        
        if(keyDown("a")){
            OGmario.x=OGmario.x-16;
        }
        if(keyDown("d")){
            OGmario.x=OGmario.x+16;
        }

        brickGeneration();
        //console.log(brickGroup.get(0).X);
        for(var i = 0;i<brickGroup.length;i++){
            var temp = brickGroup.get(i);
            // if(OGmario.x){

            // }
            if(temp.isTouching(OGmario)){
                OGmario.collide(temp);
                //console.log(temp.x);
                if(keyDown("w")){
                    if(OGmario.y<=temp.y){
                        OGmario.velocityY=-30;
                    }
                }
            if(OGmario){}
            }
            OGmario.velocityX=0;
        }

        for(var i =0;i<brickBorderGroup.length;i++){

            
            var temp = brickBorderGroup.get(i);
            if(temp.isTouching(OGmario) && headBashCharStatus){
                headBashChar=createSprite(temp.x,temp.y-65,350);
                headBashCharStatus= false;
                headBashChar.scale=0.4;
                ////// 23-12-21                
            Movemush = frameCount;
                headBashChar.addImage(headBashCharIMAGE);
                headBashChar.lifetime=150;
                // 23-12-21
                headBashCharGroup.add(headBashChar)
                
            }
            if(frameCount%250===0){
                headBashCharStatus= true; 
            }
            if(frameCount > Movemush+20){
                headBashCharGroup.setVelocityYEach(5)
                //wdheadBashCharGroup.setVelocityXEach(-5)
            }

        }
        //31-12-21
        headBashCharGroup.collide(platform)
        
        for(var i=0;i<headBashCharGroup.length;i++){
            var temp=headBashCharGroup.get(i);
            if(OGmario.isTouching(temp)){
                temp.destroy();
                temp=null;
                score=score+10;
            }
        }
        coinGeneration();
        for(var i = 0;i<coinGroup.length;i++){
            var temp = coinGroup.get(i);
            if(temp.isTouching(OGmario)){
                score++;
                //console.log(score);
                temp.destroy();
                temp=null;
            }
        }
        if(OGmario.x<100){
            OGmario.x=100;
        }
        
        if(OGmario.y<50){
            OGmario.y=50;
        }

        enemies();
        for(var i = 0; i<obstacleGroup.length;i++){
            var temp=obstacleGroup.get(i);
            if(OGmario.isTouching(temp)){
                gamestate='end';

            }
        }

        //for clodes 

        cloudes()

    }
    if(gamestate=='end'){
        brickGroup.setVelocityXEach(0);
        coinGroup.setVelocityXEach(0);
        obstacleGroup.setVelocityXEach(0);
        bg.velocityX=0;
        //4-1-2022
        OGmario.velocityX=0;
        OGmario.velocityY=0;
        obstacleGroup.setLifetimeEach(-1);
        coinGroup.setLifetimeEach(-1);
        brickGroup.setLifetimeEach(-1);
       // dieSound.play();
        restart.visible=true;
        if(mousePressedOver(restart)){
            restartGame();
}
    }

    let val = radio.value();
    if (val=="1") {
      bg.addImage(bgImage)
    }
    if (val=="2") {
        bg.addImage(bg1)
      }

    drawSprites();
    textSize(75);
    stroke("blue");
    strokeWeight(6);
    fill("#EBADAF");
    text("Score:"+score,100,100);
}

function brickGeneration(){
    if(frameCount%250===0){
        var brick= createSprite(2000, 100, 40, 10);
        brick.y=random(200,700);
        var brickBorder= createSprite(brick.x, brick.y+20, 40, 10);
        brickBorder.visible=true;
        brickBorder.velocityX=-5;
        brickBorder.lifetime=500;
        brick.debug=true;
        brick.addImage(brickImg);
        brick.velocityX=-5;
        brick.lifetime=500;
        brick.scale=0.8;
        brick.setCollider("rectangle",0,0,200,50);
        brickGroup.add(brick);
        brickBorderGroup.add(brickBorder);
    }
}

function coinGeneration() {
    if(frameCount%100==0){
        var coin=createSprite(2000,100,40,10);
        coin.x=random(50,1800);
        coin.y=random(50,800);
        coin.addAnimation("coin",coinImg);
        coin.scale=0.1;
        coin.velocityX=-5;
        coin.lifetime=500;
        coinGroup.add(coin);
    }
}

function enemies() {
    if(frameCount%200==0){
        //// 23-12-21        
       // chnage y cordinate
    var obstacle= createSprite(1800,800,12,12)
    obstacle.velocityX=-5;
    var choice=Math.round(random(1,2));
    switch (choice) {
        case 1:
            obstacle.addAnimation("mush",mushroom);
            break;
        case 2:
            obstacle.addAnimation("tur",turtle);
            break;
    }
//// 23-12-21        
       // velocity applied 2 times
    //obstacle.velocityY=-3;
    //obstacle.collide(platform);
    obstacle.scale=0.25;
    obstacle.lifetime=500;
    obstacleGroup.add(obstacle);
    }
}

function restartGame(){
    gamestate='play';
    restart.visible=false;
    score=0;
    obstacleGroup.destroyEach()
    coinGroup.destroyEach()
 
    brickGroup.destroyEach()
}

function cloudes() {
    fill("white")
    ellipse(200,200,30,20)
}