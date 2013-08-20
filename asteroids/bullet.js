function Bullet(x, y, velocity) {
  this.x = x;
  this.y = y;
  this.velocity = velocity;
  this.speed = 10;
}

Bullet.prototype = new MovingObject();

Bullet.prototype.draw = function(context) {

  var bSize = 1;
  context.beginPath();
  context.moveTo(this.x, this.y);
  context.lineTo(this.x + this.velocity.dx * bSize, this.y + this.velocity.dy * bSize);
  context.lineWidth = 3;
  context.strokeStyle = 'black';
  context.stroke();

};

Bullet.prototype.isHit = function(asteroid) {
  var x = this.x - asteroid.x;
  var y = this.y - asteroid.y;
  var dist = Math.sqrt((x * x) + (y * y));
  if (dist <= asteroid.radius) {
    return true;
  }
  return false;
}