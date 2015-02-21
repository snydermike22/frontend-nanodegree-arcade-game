//Brings in the form data from the url and parses out what chacracter they selected
    var SearchString = window.location.search.substring(1);
    var VariableArray = SearchString.split('+');
    for(var i = 0; i < VariableArray.length; i++){
        var KeyValuePair = VariableArray[i].split('=');
    }

//Lives,levels, and Score variables
var count = 1;
var score = 0;
var lives = 3;

//Music for game
var audio = new Audio('music/Super_Mario_Bros._Theme_Song.mp3');
audio.play();

var Enemy = function() {
// Variables applied to each of our instances go here,
// we've provided one for you to get started
// The image/sprite for our enemies, this uses
// a helper we've provided to easily load images
// enemy function with random starting points off the screen.  Also Slow start speed
  this.sprite = 'images/enemy-bug.png';
  this.x = Math.floor((Math.random() * -500) + -50); //start x location off screen
  this.y = Math.floor((Math.random() * 8) + 1) * 50;  // start Y location from 1 to 8 times 50
  this.speed = Math.floor((Math.random() * 1) + 1) * 100;  // speed 100
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  this.x += this.speed * dt;
    if (this.x > 600) {
        this.reset()
    }
};

// After enenemy comes back new random start x spot off the screen, random y and speed random multiplied by level
Enemy.prototype.reset = function() {
    this.x = Math.floor((Math.random() * -500) + -50);
    this.y = Math.floor((Math.random() * 8) + 1) * 50;
    this.speed = Math.floor((Math.random() * count) + 1) * 100;   // speed varibale from 1 to level * 100
}

//checking x and Y cooridinates of both player and enemy. If they intersect. its a collission. Puts the player within a radius of bug
function checkCollisions() {
  allEnemies.forEach(function(enemy) {                     
    if ( ((player.x - 50) < enemy.x) && (enemy.x < (player.x + 50 ))){
        if ( ((player.y - 50) < enemy.y) && (enemy.y < (player.y + 45 ))){
            var lose = new Audio('music/pacman-death-tune.mp3');
                        {
                            lose.play();
                            alert("You lost a life. Back to level 1");
                        }
                    count = 0;
                    lives = lives - 1
                    player.reset("N");
                    return (count);
        }
    }
});

//checking x and Y cooridinates of both player and gem. If they intersect. its a collection of the gem
  if ( ((player.x - 60) < gems.x) && (gems.x < (player.x + 55 ))){
    if ( ((player.y - 60) < gems.y) && (gems.y < (player.y + 60 ))){
        gems.reset();
        }
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.  
//Reads the url to see what character was selected. 
var player = function() {
  if (VariableArray[1] === "Mike") {
    this.sprite = "images/char-boy.png";
  }
  else if (VariableArray[1] === "Kayla") {
    this.sprite = "images/char-princess-girl.png";
  }
  else {
    this.sprite = "images/char-pink-girl.png";
  }
  this.x = 200;
  this.y = 475;
 }

//need to write a player.update() to move sprite
player.prototype.update = function(dt) {
  this.x * (dt);
  this.y * (dt);
if (this.y < 0) {
  this.reset()
    }
}

// After player comes back checks level, score and lives. Sets up player in same column where they entered water
player.prototype.reset = function(died) {
  count = count + 1;
  this.x = this.x;
  this.y = 475;
    if (died != "N") {
    score = score + 50;
}
    else {
    score = score;
    }
    if (lives === 0) {
    alert("Your bug food! Game Over");
    window.location.href = "gameload.html";
    }
}

//draws sprite
player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

//allowed keys function. left, right, up down and move pixels to match screen
player.prototype.handleInput = function(allowedKeys) {
var x = 1;
    if (allowedKeys === 'up' && this.y > 0) {
        this.y = this.y - 73;
    }
    if (allowedKeys === 'down' && this.y < 475) {
        this.y = this.y + 73;
    }
    if (allowedKeys === 'right' && this.x < 500) {
        this.x = this.x + 100;
    }
    if (allowedKeys === 'left' && this.x > 0) {
        this.x = this.x - 100;
    }
    if (this.y === -6) {
    }
}

// loads the gem and randomly puts it on the board
var Gems = function() {
// Variables applied to each of our instances go here,
// we've provided one for you to get started
// The image/sprite for our players, this uses
// a helper we've provided to easily load images
  this.sprite = 'images/GemBlue.png';
  this.x = Math.floor((Math.random() * 5) + 1) * 100;
  this.y = Math.floor((Math.random() * 5) + 1) * 100;
}

// Update the gems's position, required method for game
// Parameter: dt, a time delta between ticks
Gems.prototype.update = function(dt) {
// You should multiply any movement by the dt parameter
// which will ensure the game runs at the same speed for
// all computers.
  this.x * (dt);
  this.y * (dt);
}

// Draw the gems on the screen, required method for game
Gems.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
// End draw Gems

// reset gems afater they are eaten.
Gems.prototype.reset = function() {
  score = score + 50;
  this.x = Math.floor((Math.random() * 5) + 1) * 100;
  this.y = Math.floor((Math.random() * 5) + 1) * 100;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
// Place the Gem object in a variable called gems
var allEnemies = [new Enemy(), new Enemy(), new Enemy(), new Enemy()];
var player = new player();
var gems = new Gems();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {

    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
