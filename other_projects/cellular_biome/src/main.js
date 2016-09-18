
var controller;

function setup()
{
  createCanvas(800, 600);
  controller = new Controller();
  controller.initialize();
}

function draw()
{
  colorMode(HSB, 360, 100, 100);
  background(207, 97, 15);
  controller.display();
}

function getTitle() {
  return "<h1>Cellular Biome</h1>" +
         "<p>Steering Behaviors</p>"
}

function getDescription(){
  return "<ul>" +
         "<li>Cells are controlled using steering behaviors.</li>" +
         "<li>Each small cells is trying to reach a random position.</li>" +
         "<li>If a small cell finds food, it will change its trajectory.</li>" +
         "<li>When a small cell ate 5 food pieces, it converts in a big cell.</li>" +
         "<li>Small cells plan their trajectory in such a way that they never collide (except when they are created).</li>" +
         "<li>Focus on the trajectory of one small cell in order to see how they avoid each other!.</li>" +
         "</ul>"
}

function onLoad() {
  document.body.insertBefore(createHTML("<div id='title'>" + getTitle() + "</div>"), document.body.childNodes[0]);
  document.body.insertBefore(createHTML("<div id='description'>" + getDescription() + "</div>"), document.body.childNodes[3]);
}

function createHTML(htmlStr) {
  var frag = document.createDocumentFragment(),
      temp = document.createElement('div');
  temp.innerHTML = htmlStr;
  while (temp.firstChild) {
      frag.appendChild(temp.firstChild);
  }
  return frag;
}
