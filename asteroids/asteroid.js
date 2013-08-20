function Asteroid(x, y, radius) {
  MovingObject.apply(this, arguments);
  this.radius = 10;
  this.velocity = {};
  this.velocity.dx = Math.random() * 2 - 1;
  this.velocity.dy = Math.random() * 2 - 1;
};

Asteroid.prototype = new MovingObject();

Asteroid.MAX_RADIUS = 50;
Asteroid.randomAsteroid = function(maxX, maxY) {
  return new Asteroid(
    maxX * Math.random(),
    maxY * Math.random(),
    Asteroid.MAX_RADIUS * Math.random()
  );
};

Asteroid.prototype.draw = function(ctx) {
  ctx.fillStyle = this.getRandomColor();
  ctx.beginPath();

  ctx.arc(
    this.x,
    this.y,
    this.radius,
    0,
    2 * Math.PI,
    false
  );

  ctx.fill();
};

Asteroid.prototype.getRandomColor = function() {
	var letters = '0123456789ABCDEF'.split('');
	    var color = '#';
	    for (var i = 0; i < 6; i++ ) {
	        color += letters[Math.round(Math.random() * 15)];
	    }
	return color;
}
