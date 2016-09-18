
function Controller()
{
  var self = this;
  var smallCells = [];
  var bigCells = [];
  var food = [];

  var currInstanceId = 0;

  this.foodSpawnDelay = createVector(500, 600);

  this.createSmallCells = function(number, position) {
    for (var i = 0; i < number; i++) {
      var cell = new SmallCell(self);
      cell.initialize(generateNewId(), position);
      smallCells.push(cell);
    }
  }

  function createFood(number, preWarm) {
    for (var i = 0; i < number; i++) {
      var f = new Food();
      f.initialize(generateNewId(), preWarm);
      food.push(f);
    }
  }

  function updateFood() {
    for (var i = 0; i < food.length; i++) {
      food[i].update();
      food[i].display();
    }
  }

  this.updateCells = function() {

    for (var i = 0; i < smallCells.length; i++) {
      if(smallCells[i].isDead)
      {
        this.convertToBigCell(i);
        i--;
        continue;
      }
      smallCells[i].applyBehaviors(smallCells.concat(bigCells), food);
      smallCells[i].update();
      smallCells[i].display();
    }

    for (var i = 0; i < bigCells.length; i++) {
      bigCells[i].move();
      if(bigCells[i].isDead)
      {
        this.destroyBigCell(i);
        i--;
        continue;
      }

      bigCells[i].update();
      bigCells[i].display();
    }
  }

  function generateNewId(){
    return ++currInstanceId;
  }

  this.eatFood = function(f){
    for (var i = 0; i < food.length; i++) {
      if(food[i].instanceId == f.instanceId)
      {
        food.splice(i, 1);
        return;
      }
    }
  }


  this.destroyBigCell = function(index){
      bigCells.splice(index, 1);
  }

  this.convertToBigCell = function(index){
    var bigCell = new BigCell(self);
    bigCell.initialize(smallCells[index].position, generateNewId());
    bigCells.push(bigCell);
    smallCells.splice(index, 1);
  }


  this.initialize = function(){

    this.createSmallCells(20);
    createFood(35, true);

  }

  this.display = function(){
    updateFood();
    this.updateCells();

    this.generateFood();
  }


  var currSpawnTime = random(this.foodSpawnDelay.x, this.foodSpawnDelay.y);
  this.generateFood = function(){
    if(int(frameCount % currSpawnTime) == 0)
    {
      createFood(3);
      currSpawnTime = random(this.foodSpawnDelay.x, this.foodSpawnDelay.y);
    }
  }

}
