function MovingObject(x, y) {
  this.x = x;
  this.y = y;
  this.velocity = { dx: 0, dy: 0 };
}

MovingObject.prototype.update = function() {
  var dx = this.velocity.dx;
  var dy = this.velocity.dy;
  this.x += dx;
  this.y += dy;
};

MovingObject.prototype.isOffScreen = function() {
  if ((this.x < 0 || this.y < 0) || (this.x > 500 || this.y > 500)) {
    return true;
  } else {
    return false;
  }
};

MovingObject.prototype.correctPosition = function() {

  if (this.x < 0) {
    this.x += 500;
  } else if (this.x > 500) {
    this.x -= 500;
  };

  if (this.y < 0) {
    this.y += 500;
  } else if (this.y >500) {
    this.y -= 500;
  };
};