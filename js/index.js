const myCanvas = document.querySelector('canvas');
const ctx = myCanvas.getContext("2d");

myCanvas.style.border = "1px solid black"

const bgImg = new Image();
bgImg.src = "../images/road.png"
const bgImg2 = new Image();
bgImg2.src = "../images/road.png"
const carImg = new Image();
carImg.src = "../images/car.png"

let bg1y = 0;
let bg2y = -myCanvas.height;

//game variables
let score = 0;
let gameOver = false;
let animateId;
let carWidth = 50;
let carHeight = 100;
let carX = myCanvas.width/2 - carWidth/2
let carY = myCanvas.height - carHeight
let carSpeed = 5;
let isMovingLeft = false;
let isMovingRight = false;

let maxLeft = 40;
let maxRight = myCanvas.width - 40; 

let obstacleWidth = getRandomInt(80, 320);
let obstacleHeight = 30;
let obstacleX = getRandomInt(40,350);
let obstacleY = 0
let obstacleSpeed = 5

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

const drawObstacle = () => {
  ctx.beginPath()
  ctx.fillStyle = 'red'
  ctx.rect(obstacleX, obstacleY, obstacleWidth, obstacleHeight)
  ctx.fill()
  ctx.closePath()
}



window.onload = () => {
  document.getElementById('start-button').onclick = () => {
    startGame();
  };
  
  function animate() {
    ctx.drawImage(bgImg, 0, bg1y, myCanvas.width, myCanvas.height);
    ctx.drawImage(bgImg2, 0, bg2y, myCanvas.width, myCanvas.height);
    bg1y += 2;
    bg2y += 2;
    
    if(bg1y > myCanvas.height) {
      bg1y = -myCanvas.height
    }
    if(bg2y > myCanvas.height) {
      bg2y = -myCanvas.height
    }
    ctx.font = '48px serif'
    ctx.fillText(score, 10, 48)
    //

    ctx.drawImage(carImg, carX, carY, carWidth, carHeight)
    if (isMovingLeft && carX > maxLeft) {
      carX -= carSpeed
    }
    if (isMovingRight && carX + carWidth < maxRight) {
      carX += carSpeed
    }

    //
    drawObstacle() 
      obstacleY += obstacleSpeed
    if(obstacleY > myCanvas.height + 5) {
      obstacleY = 0;
      obstacleWidth = getRandomInt(80,320);
      obstacleX = getRandomInt(40, 350);
    }
    if(obstacleX + obstacleWidth > myCanvas.width) {
      obstacleX = getRandomInt(40,350)
    } 
    



    if(obstacleX < carX + carWidth &&
      obstacleX + obstacleWidth > carX &&
      obstacleHeight < carY + carHeight &&
      obstacleHeight + obstacleY > carY) {
      gameOver = true
    } 
    else if (gameOver === false && obstacleY > myCanvas.height){
      score += 1
      setInterval(function () {startGame()}, 10000); 
    }
    


    if (!gameOver) {
      animateId = requestAnimationFrame(animate)
    } else {
      cancelAnimationFrame(animateId)
    }
  }

  function startGame() {
    animate();
  }
  document.addEventListener('keypress', event => {
    if (event.key === 'a') {
      isMovingLeft = true
    }
    if (event.key === 'd') {
      isMovingRight = true
    }
  })
  document.addEventListener('keyup', () => {
    isMovingLeft = false
    isMovingRight = false
  })
};
