var PLAY = 1;
var END = 0;
var gameState = PLAY;

var jungle, invisiblejungle;

var obstaclesGroup, obstacle1;

var score = 0;

var gameOver, restart;

function preload() {
    kangaroo_running = loadAnimation("frog.png");
    jungleImage = loadImage("background.png");

    obstacle1 = loadImage("rock.png");
    gameOverImg = loadImage("gameOver.png");
    restartImg = loadImage("restart.png");

}
function setup() {
    createCanvas(800, 400);

    jungle = createSprite(400, 100, 400, 20);
    jungle.addImage("jungle", jungleImage);
    jungle.scale = 0.3
    jungle.x = width / 2;

    kangaroo = createSprite(50, 200, 20, 50);
    kangaroo.addAnimation("running", kangaroo_running);
    kangaroo.scale = 0.15;
    kangaroo.setCollider("circle", 0, 0, 300)

    invisibleGround = createSprite(400, 350, 1600, 10);
    invisibleGround.visible = false;

    obstaclesGroup = new Group();

    score = 0;

    gameOver = createSprite(400, 100);
    gameOver.addImage(gameOverImg);

    restart = createSprite(550, 140);
    restart.addImage(restartImg);

    gameOver.scale = 0.5;
    restart.scale = 0.1;

    gameOver.visible = false;
    restart.visible = false;
}

function draw() {
    background(255);


    if (gameState === PLAY) {

        jungle.velocityX = -3

        if (jungle.x < 100) {
            jungle.x = 400
        }
        if (keyDown("space") && kangaroo.y > 270) {
            kangaroo.velocityY = -16;
        }

        kangaroo.velocityY = kangaroo.velocityY + 0.8

        spawnObstacles();

        kangaroo.collide(invisibleGround);

        if (obstaclesGroup.isTouching(kangaroo)) {
            gameState = END;
        }

    }
    else if (gameState === END) {

        kangaroo.velocityY = 0;
        jungle.velocityX = 0;
        obstaclesGroup.setVelocityXEach(0);

        gameOver.visible = true;
        restart.visible = true;

        obstaclesGroup.setLifetimeEach(-1);

    }


    drawSprites();


}



function spawnObstacles() {
    if (frameCount % 120 === 0) {

        var obstacle = createSprite(800, 310, 40, 40);

        obstacle.setCollider("rectangle", 0, 0, 200, 200)
        obstacle.addImage(obstacle1);
        obstacle.velocityX = -(6 + 3 * score / 100)
        obstacle.scale = 0.15;

        obstacle.lifetime = 400;
        obstaclesGroup.add(obstacle);

    }
}