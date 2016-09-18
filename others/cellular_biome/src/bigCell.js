function BigCell(ctr)
{
  var controller = ctr;

  //transforms data
  this.position;
  this.velocity;
  this.acceleration;

  //physics data
  this.maxSpeed;
  this.maxForce;

  //visual data
  this.radius = createVector(70, 70);
  this.color = {h:50, s:100, b:100};

  //cell data
  this.instanceId;
  this.maxSeekDistance = 50;
  this.divisionDelay = random(1000, 3000);
  this.isDead = false;

  //seeking
  var currTarget = createVector(random(width), random(height));


  this.initialize = function(initailPos, instanceId, preWarm){
    this.position = createVector(initailPos.x, initailPos.y);
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(0, 0);

    this.maxSpeed = 0.2;
    this.maxForce = 0.025;

    this.instanceId = instanceId;
    if(!preWarm){
      TweenLite.fromTo(this.radius, 1, {x:40, y:40},
        {x:this.radius.x, y:this.radius.y, ease:Elastic.easeOut.config(1, 0.4)});
    }
  }

  this.update = function(){

    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);

    this.position.add(this.velocity);

    this.acceleration.mult(0)
  }

  this.applyForce = function(force){
    this.acceleration.add(force);
  }

  this.seek = function(target){

    var arriveRange = 50;
    var distToDest = p5.Vector.dist(this.position, target);
    var speed = lerp(0.4, this.maxSpeed, constrain(distToDest / arriveRange, 0, 1));
    var desired = p5.Vector.sub(target, this.position);
    desired.setMag(speed);

    var steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxForce);

    this.applyForce(steer);

    if(distToDest < 15)
    return true;
    return false;
  }

  this.move = function(){

    if(int(frameCount % this.divisionDelay) == 0)
    {
      // TweenMax.to(this.color, 1, {h:174, s:100, b:100,
      // ease:Power3.easeInOut});

      TweenMax.to(this.radius, 1, {x:55, y:55,
         ease: Elastic.easeIn.config(1, 0.2),
         onComplete:divide, onCompleteParams:[this]});

    }


    if(this.seek(currTarget))
    currTarget = createVector(
      random(this.radius.x / 2,  width - this.radius.x / 2),
      random(this.radius.y / 2,  height - this.radius.y / 2));

  }

  function divide(cell){
    for (var i = 0; i < random(2, 4); i++)
    {
      var pos = createVector(cell.position.x, cell.position.y);
      pos.add(randomInsideUnitCircle().mult(15));
      controller.createSmallCells(1, pos);
    }

    cell.isDead = true;
  }

  this.display = function(){

    var dirAngle = this.velocity.heading() + PI/2;

    colorMode(HSB, 360, 100, 100);
    fill(this.color.h, this.color.s, this.color.b);

    stroke(100, 1, 100);
    strokeWeight(2);

    push();
    translate(this.position.x, this.position.y);
    rotate(dirAngle);
    ellipse(0, 0, this.radius.x, this.radius.y);
    pop();
  }

  function randomInsideUnitCircle()
  {
    var t = 2 * PI * random();
    var u = random() + random();
    var r = u > 1 ? 2 - u : u;
    return createVector(r * cos(t), r * sin(t));
  }

}
