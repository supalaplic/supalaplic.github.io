function SmallCell(ctr)
{
  var controller = ctr;

  var savedFood = [];

  //transforms data
  this.position;
  this.velocity;
  this.acceleration;

  //physics data
  this.maxSpeed;
  this.maxForce;

  //visual data
  this.radius = createVector(40, 40);;
  this.color = [174, 77, 77];

  //cell data
  this.instanceId;
  this.maxSeekDistance = 50;
  this.isDead = false;

  //behaviors
  this.behaviorsWeight = {seek:0.1, avoid:1};
  var currTarget = createVector(random(width), random(height));


  function saveFood()
  {
    savedFood.push(randomInsideUnitCircle().mult(12))
  }


  this.initialize = function(instanceId, initialPos){

    if(initialPos == undefined)
      this.position = createVector(random(width), random(height));
    else
    {
      this.position = createVector(initialPos.x, initialPos.y);
      TweenLite.fromTo(this.radius, 0.8, {x:20, y:20},
        {x:this.radius.x, y:this.radius.y,
        ease:Back.easeOut.config(1.7)});
    }

    this.acceleration = createVector(0, 0);
    this.velocity = createVector(0, 0);

    this.maxSpeed = 0.8;
    this.maxForce = 0.1;

    this.instanceId = instanceId;
  }

  this.update = function(){

    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);

    this.position.add(this.velocity);

    this.acceleration.mult(0);
  }

  this.applyForce = function(force){

    this.acceleration.add(force);
  }

  this.seek = function(target){

    var arriveRange = 100;
    var distToDest = p5.Vector.dist(this.position, target);
    var speed = lerp(0.4, this.maxSpeed, constrain(distToDest / arriveRange, 0, 1));
    var desired = p5.Vector.sub(target, this.position);
    desired.setMag(speed);

    var steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxForce);

    return steer;
  }

  this.collisionAvoidance = function(cells){

    if(this.velocity.x == 0 && this.velocity.y == 0)
      return false;

    var seeAheadDistance = 100;
    var smallestDist = 100000;
    var desired;
    var toCollide;

    var mV = this.velocity.copy();
    mV.mult(seeAheadDistance);

    for (var i = 0; i < cells.length; i++) {
      var moveVec = cells[i].velocity.copy();
      moveVec.mult(seeAheadDistance);
      moveVec = p5.Vector.sub(mV, moveVec);

      if(cells[i].instanceId != this.instanceId)
      {
        //algh from : http://www.gamasutra.com/view/feature/131424/pool_hall_lessons_fast_accurate_.php?page=2

        //early escape test:
        //A stops before collision with B
        var dist = p5.Vector.dist(this.position, cells[i].position)
        dist -= this.radius.x / 2 + cells[i].radius.y / 2;

        //early escape test:
        //check if A moves in the direction of B
        var n = moveVec.copy();
        n.normalize();

        var c = p5.Vector.sub(cells[i].position, this.position);
        var d = p5.Vector.dot(n, c);

        if(d <= 0)
          continue;

        if(moveVec.mag < dist || dist < 0)
          continue;

        //escape test:
        //if the closest that A will get to B
        //is more than the sum of their radii, there's no
        //way they are going collide
        var lengthC = c.mag();
        var f = (lengthC * lengthC) - (d * d);
        var sumRadiiSquared = (this.radius.x / 2 + cells[i].radius.y / 2) *
        (this.radius.x / 2 + cells[i].radius.y / 2);

        if(f > sumRadiiSquared)
          continue;

        //compute actual collision point
        var t = sumRadiiSquared - f;
        if(t < 0)
          continue;

        var distance = d - sqrt(t);

        var mag = moveVec.mag();
        if(mag < distance)
          continue;

        //this step should be skip in other implementations
        //as only the smalles collision between all existing objects
        //is needed
        if(distance > smallestDist)
          continue;

        smallestDist = distance;
        toCollide = cells[i];

        n.mult(distance);
        desired = n.mag() / moveVec.mag();
      }
    }

    if (desired == undefined) {
      return false;
    }

    desired = p5.Vector.mult(mV, desired);
    desired.add(this.position);
    desired.sub(toCollide.position);
    desired.setMag(this.maxSpeed);

    var avoid = p5.Vector.sub(desired, this.velocity);
    avoid.setMag(this.maxForce);

    return avoid;
  }

  this.findTarget = function(foods)
  {
    var minDist;
    var target;

    for (var i = 0; i < foods.length; i++)
    {
      var dist = p5.Vector.dist(this.position, foods[i].position);
      if(dist <= this.maxSeekDistance && (minDist == undefined || dist < minDist))
      {
        minDist = dist;
        target = foods[i];
      }
    }
    return target
  }

  this.computeTarget = function(target){

    var distToTarget;

    if(target != undefined){
      distToTarget = p5.Vector.dist(this.position, target.position);
      if(distToTarget < 15)
      {
        controller.eatFood(target);
        saveFood();

        if(savedFood.length >= 5)
          this.isDead = true;
      }
    }
    else {
      distToTarget = p5.Vector.dist(this.position, currTarget);
      if(distToTarget < 15)
      {
        currTarget = createVector(
          random(this.radius.x / 2,  width - this.radius.x / 2),
          random(this.radius.y / 2,  height - this.radius.y / 2));
      }
    }
  }

  this.applyBehaviors = function(cells, food)
  {
    var target = this.findTarget(food);

    var avoidForce = this.collisionAvoidance(cells);

    if(avoidForce)
    {
      avoidForce.mult(this.behaviorsWeight.avoid);
      this.applyForce(avoidForce);
    }


    var seekForce = this.seek(target != undefined ?
                              target.position : currTarget);

    seekForce.mult(this.behaviorsWeight.seek);

    if(!avoidForce)
      this.applyForce(seekForce);



    this.computeTarget(target);
  }



  this.display = function(){

    var dirAngle = this.velocity.heading() + PI/2;

    colorMode(HSB, 360, 100, 100);
    fill(this.color);
    stroke(100, 1, 100);
    strokeWeight(1.5);

    push();
    translate(this.position.x, this.position.y);
    rotate(dirAngle);
    ellipse(0, 0, this.radius.x, this.radius.y);
    pop();

    this.displaySavedFood();
  }

  this.displaySavedFood = function(){

    noStroke();
    colorMode(HSB, 255);

    push();

    translate(this.position.x, this.position.y);
    rotate((frameCount * 0.015) % 360);
    for (var i = 0; i < savedFood.length; i++) {
      fill(250, 210, 255);
      ellipse(savedFood[i].x, savedFood[i].y, 10);
    }
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
