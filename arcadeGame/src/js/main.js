var body = document.querySelector("body");

var canvas, canvasContext;
var superWarrior = new warriorClass();



window.onload = function(){
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');

  loadImages();

  body.classList.add('clear-modal');
  setTimeout(function(){
	  body.classList.remove('clear-modal');
	  document.getElementById('preloader').classList.remove('active');

	  document.getElementById('greetingsModal').classList.add('active')
  },300)

}

function ImageLoadingDoneToStartGame(){
  var framesPerSecond = 30;
  setInterval(updateAll, 1000/framesPerSecond);

  setupInput();

  loadLevel(levelList[levelNow]);
}

function nextLevel(){
  levelNow++;
  if(levelNow >= levelList.length){
  	body.classList.add('active-modal');
	document.getElementById('goodByeModal').classList.add('active')

    levelNow = 0;
  }
  loadLevel(levelList[levelNow])
}

function prevLevel(){
  levelNow--;
  if(levelNow < 0){
    levelNow = 0;
  }
  loadLevel(levelList[levelNow])
}

function loadLevel(whichLevel){
    worldMap = whichLevel.slice();
    superWarrior.reset(warriorPic, "");
}


function updateAll(){
  moveAll();
  drawAll();
}

function moveAll(){
  superWarrior.move();
}
function drawAll(){
  drawWorlds();
  superWarrior.draw();
}



var modals = document.querySelectorAll('.close-modal, .shadow');
for(var i=0; i<modals.length; i++){
	modals[i].addEventListener('click', function () {
		closeModal();
	});
}

function closeModal(){
	body.classList.add('clear-modal');
	setTimeout(function(){
		body.classList.remove('clear-modal');
		body.classList.remove('active-modal');
		var modalList = document.querySelectorAll('.modal');
		for(var i=0; i<modalList.length; i++){
			modalList[i].classList.remove('active');
		}
	},300)
}