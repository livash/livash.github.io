function Game(xDim, yDim, numAsteroids) {
  this.xDim = xDim;
  this.yDim = yDim;
  this.bullets = [];
  this.ship = new Ship(this.xDim/2, this.yDim/2);
  this.asteroids = [];
	this.destroyedAsteroids = 0;
  for (var i = 0; i <numAsteroids; i++) {
    this.asteroids.push(Asteroid.randomAsteroid(xDim, yDim));
  }
};

Game.prototype.draw = function(ctx) {
  ctx.clearRect(0, 0, this.xDim, this.yDim);
	this.drawScore(ctx);

  for (var i = 0; i < this.asteroids.length; i++) {
    this.asteroids[i].draw(ctx);
  }

  this.ship.drawShip(ctx);

  for (var j = 0; j < this.bullets.length; j++) {
    if (this.bullets[j]) {
      this.bullets[j].draw(ctx);
    }
  }
};

Game.prototype.drawScore = function(ctx) {
	ctx.fillStyle = "blue";
	ctx.font = "bold 16px Arial";
	ctx.fillText("Score:" + this.destroyedAsteroids, 20, 20);
};

Game.prototype.start = function(canvasEl) {
  var ctx = canvasEl.getContext('2d');
  var that = this;
  this.keys();
  this.interval = window.setInterval(function() {
    that.draw(ctx);
    that.update();
  }, 33);
};

Game.prototype.update = function(){
  for(var i = 0; i < this.asteroids.length; i++){
    if (this.asteroids[i].isOffScreen()) {
      this.asteroids[i] = Asteroid.randomAsteroid(this.xDim, this.yDim);
    };
    this.asteroids[i].update();
  };

  for(var i = 0; i < this.bullets.length; i++) {
    for(var j = 0; j < this.asteroids.length; j++) {
      if (this.bullets[i]) {
        if (this.bullets[i].isHit(this.asteroids[j])) {
					this.destroyedAsteroids++;
        	this.bullets.splice(i, 1);
        	this.asteroids[j] = Asteroid.randomAsteroid(this.xDim, this.yDim);
        }
      }
    }
  }

  for(var j = 0; j < this.bullets.length; j++){
      if (this.bullets[j].isOffScreen()) {
        this.bullets.splice(j, 1);
      } else {
      this.bullets[j].update();
    };
  };
  //check if ship is off the screen, then
  this.ship.correctPosition();
  this.ship.update();

  if (this.ship.isHit(this.asteroids)) {
    console.log("Hit");
    window.clearInterval(this.interval);
  }

};

Game.prototype.keys = function() {
  var that = this;
  key('left', function() {
    that.ship.power(-1,0);
  });
  key('up', function() {
    that.ship.power(0,-1);
  });
  key('down', function() {
    that.ship.power(0,1);
  });
  key('right', function() {
    that.ship.power(1,0);
  });
  key('space', function() {
    that.ship.fireBullet(that);
  });
}