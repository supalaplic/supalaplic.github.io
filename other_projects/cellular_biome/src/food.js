function Food()
{
  this.position;
  this.radius = 10;
  this.color = [353, 87, 91];

  this.instanceId;

  this.initialize = function(instanceId, preWarm){
    this.position = createVector(random(width), random(height));
    this.instanceId = instanceId;

    if(!preWarm)
      TweenLite.fromTo(this, 1, {radius:0},
        {radius:this.radius, ease:Elastic.easeOut.config(1, 0.5)});
    }

    this.update = function(){

    }

    this.display = function()
    {
      noStroke();
      colorMode(HSB, 360, 100, 100);
      fill(this.color);
      ellipse(this.position.x, this.position.y, this.radius)
    }

  }
