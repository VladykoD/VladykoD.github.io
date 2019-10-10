const MANY_BALLS = 400;

var canvas, canvasContext;
var i = 0;
var ballList = [];

function createBalls(){
	for(i=0; i<MANY_BALLS; i++){
		ballList.push(new ballClass());
	}
}

window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

	var framesPerSecond = 30;
	setInterval(updateAll, 1000/framesPerSecond);

	createBalls();

	for(i=0; i<ballList.length; i++){
		ballList[i].position();
		ballList[i].reset();
	}
}

function updateAll() {
	moveAll();
	drawAll();
}

function moveAll() {
	for(i=0; i<ballList.length; i++){
		ballList[i].move();
		ballTrackHandling(ballList[i]);
	}
}

function drawAll() {
	drawTracks();

	for(i=0; i<ballList.length; i++){
		ballList[i].create();
	}
}
