var canvas;
var ctx;
var player
var numStars = 75;
var numAstroids = 5;
var gameLoop;
var currentScore;
var firstTime = true;

// Event listeners for the key functions
window.addEventListener('keyup', function(event) { Key.onKeyup(event); }, false);
window.addEventListener('keydown', function(event) { Key.onKeydown(event); }, false);
window.addEventListener("load", onLoad);

// Dictionary that holds a bool whether a key is being pressed
var Key = {
  _pressed: {},

  LEFT: 37,
  RIGHT: 39,

  isDown: function(keyCode) {
    return this._pressed[keyCode];
  },

  onKeydown: function(event) {
    this._pressed[event.keyCode] = true;
  },

  onKeyup: function(event) {
    delete this._pressed[event.keyCode];
  }
};

/*
* This will run when the webpage is loaded, mainly to load fonts in
*/
function onLoad() {
  // load the correct font in
  var link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css?family=Press+Start+2P';
  document.getElementsByTagName('head')[0].appendChild(link);

  // This will tie all of this code to the canvas component
  canvas = document.getElementById('game');
  ctx = canvas.getContext('2d');
}

/*
* Main game loop, updates the game state each frame. ~50fps.
*/
function updateLoop() {
  if (gameLoop) {
    clear();
    updatePlayerLoc();
    updateStarLoc();
    updateAstroidLoc();
    checkCollisions();
    drawCurrentScore();
    player.draw();
  } else {
    endgame();
  }
}

/*
* The player has collided with an asteroid, display game over message and
*
*/
function endgame() {
  clear();
  updateStarLoc();
  updateAstroidLoc();
  if (player.frameid != player.frames.length - 1) {
      player.frameid += 0.25;
      player.draw();
  } else {
    ctx.font = '35px "Press Start 2P"';
    ctx.fillText('Game Over', canvas.width/2 - 160, canvas.height/2);
    ctx.font = '15px "Press Start 2P"';
    ctx.fillText('Score: ' + currentScore, canvas.width/2 - 55, canvas.height/2 + 30);
    ctx.font = '15px "Press Start 2P"';
    ctx.fillText('Press start to play again' , canvas.width/2 - 180, canvas.height/2 + 60);
  }
}

function drawCurrentScore() {
  ctx.font = '10px "Press Start 2P"';
  ctx.fillText('Score: ' + currentScore, 10, 30);
}

/*
* This method is the event listener for the start button under the canvas
*/
function onStartButtonClick() {
  gameLoop = true;
  currentScore = 0;
  astroids = [];
  stars = [];

  for (i = 0; i < numStars; i++) {
    addStar(true);
  }

  for (i = 0; i < numAstroids; i++) {
    addAstroid();
  }

  var shipImg = new Image();
  shipImg.src = "images/millennium_falcon.png";

  var explosion1 = new Image();
  explosion1.src = "images/e1.png";

  var explosion2 = new Image();
  explosion2.src = "images/e2.png";

  var explosion3 = new Image();
  explosion3.src = "images/e3.png";

  var explosion4 = new Image();
  explosion4.src = "images/e4.png";

  var explosion5 = new Image();
  explosion5.src = "images/e5.png";

  var clear = new Image();
  clear.src = "images/clear.png";

  // initialize the player object
  player = {
    x : canvas.width/2 - 37.5,
    y : canvas.height - 150,
    width : 100,
    height : 125,
    angle : Math.PI / 2,
    velocityx : 0,
    rotatingLeft: false,
    rotatingRight: false,
    frames : [shipImg, explosion1, explosion2, explosion3, explosion4, explosion5, clear],
    frameid : 0,
    thrust: 0.1,
    draw : function() {
      rotateAndPaintImage(ctx, this.frames[Math.floor(this.frameid)], this.angle, this.x, this.y, this.width, this.height);
    }
  };
  // call update at 50 fps
  if (firstTime) {
    interval = setInterval(updateLoop, 20);
    firstTime = false;
  }
}

/*
* Helper method to update the player location and angle based on
* keyboard input
*/
function updatePlayerLoc() {
  if (Key.isDown(Key.LEFT)) {
    if (player.angle > 1.0471975511965976) {
      player.rotatingLeft = true;
    }
  }

  if (Key.isDown(Key.RIGHT)) {
    if (player.angle < 2.0943951023931953) {
      player.rotatingRight = true;
    }
  }

  player.x += player.velocityx;

  if (player.x > canvas.width - 50) {
    player.x = canvas.width - 50;
  } else if (player.x < 0 - 50) {
    player.x = 0 - 50;
  }

  if(player.rotatingRight) {
    player.angle += 5*(Math.PI / 180);
    player.velocityx += 0.75;
    player.rotatingRight = false;
  } else if (player.rotatingLeft) {
    player.angle -= 5*(Math.PI / 180);
    player.velocityx -= 0.75;
    player.rotatingLeft = false;
  }
}

/*
* Helper method that updates the location of the stars each frame
*/
function updateStarLoc() {
  for (i = 0; i < stars.length; i++) {
    var star = stars[i];
    if (star.y > canvas.height) {
      stars.splice(i, 1);
      addStar(false);
    } else {
      star.y += star.velocity;
      star.draw();
    }
  }
}

/*
* Helper method that updates the location and orientation of the
* astroids each frame
*/
function updateAstroidLoc() {
  for (i = 0; i < astroids.length; i++) {
    var astroid = astroids[i];
    if (astroid.y > canvas.height) {
      astroids.splice(i, 1);
      if (gameLoop) {currentScore += 1;}
      i--;
      addAstroid();
    } else {
      astroid.y += astroid.velocity;
      astroid.angle += astroid.spinVelocity;
      astroid.draw();
    }
  }
}

/*
* Helper method to check collisions with all of the active asteroids
* and the player
*/
function checkCollisions() {
  for (i = 0; i < astroids.length; i++) {
    var astroid = astroids[i];
    dx = Math.abs((astroid.x + astroid.size/2) - (player.x + player.width/2)) + 20;
    dy = Math.abs((astroid.y + astroid.size/2) - (player.y + player.height/2));
    dist = Math.sqrt(dx * dx + dy * dy);
    if (dist + 15 < astroid.size/2 + player.width/2)  {
      gameLoop = false;
    }
  }
}

/*
* Adds a star to the star list, stars move in the background to give
* the illusion that the player is moving through space.
*/
function addStar(randomY) {
  // at the begining we want stars with random y but as the game goes on
  // we can spawn them at the top of the screen
  if (randomY) {
    var star = {
      x : Math.random() * canvas.width,
      y : Math.random() * canvas.height,
      velocity : Math.random() * 5,
      radius: Math.random() * 1.0,
      draw : function () {
        ctx.fillStyle = "#FFFFFF";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        ctx.fill();
      }
    };
  } else {
    var star = {
      x : Math.random() * canvas.width,
      y : 0,
      velocity : Math.random() * 5,
      radius: Math.random() * 1.0,
      draw : function () {
        ctx.fillStyle = "#FFFFFF";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        ctx.fill();
      }
    };
  }

  stars.push(star);
}

/*
* Adds a random asteroid to the astroids list
*/
function addAstroid() {
  // chooses a random asteroid img
  var num = Math.floor(Math.random() * 3)
  var img = new Image();
  img.src = "images/astroid" + num + ".png";

  // create an asteroid object that has a random x, size, velocity, and spinVelocity
  var astroid = {
    x : Math.random() * canvas.width,
    y : -200,
    velocity : Math.random() * 5 + 3,
    sprite : img,
    spinVelocity : Math.random() * (Math.PI / 180),
    angle : 0,
    size : Math.random() * 100 + 50,
    draw : function () {
      rotateAndPaintImage(ctx, this.sprite, this.angle, this.x, this.y, this.size, this.size);
    }
  };
  astroids.push(astroid);
}

/*
* Helper method that paints and image at an x, y location and orientation
*/
function rotateAndPaintImage(context, image, angleInRad, positionX, positionY, width, height) {
  context.translate(positionX + width/2, positionY + height/2);
  context.rotate(angleInRad);
  context.drawImage(image, -width/2, -height/2, width, height);
  context.rotate(-angleInRad);
  context.translate(-(positionX + width/2), -(positionY + height/2));
}

/*
* Clears the frame
*/
function clear() {
  ctx.clearRect(0, 0, canvas.width + 500, canvas.height + 500);
}
