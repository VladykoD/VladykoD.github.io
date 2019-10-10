const COUNT = 100;
const SNOW_WIDTH = 20;
const SNOW_HEIGHT = 20;
const SNOW_RADIUS = 20;

var canvas, canvasContext;
var i = 0;
var snowList = [];
var dir = 1;
var pattern;

var img = new Image();
img.src = "images/3.png";


window.onload = function() {
	canvas = document.getElementById('gameCanvas');

	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	canvasContext = canvas.getContext('2d');

	for(i=0; i<COUNT; i++){
		snowList.push(new snowClass());
	}

	var framesPerSecond = 30;
	setInterval(function(){
		clear();
		for(i=0; i<snowList.length; i++){
			snowList[i].create();
			snowList[i].move();
		}
	}, 1000/framesPerSecond);
}

window.onresize = function(){
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
}


function snowClass(){

	this.reset = function(){
		this.x = Math.random() * canvas.width;
		this.y = -SNOW_RADIUS * ( Math.random() * 6);
		this.dir = parseInt(Math.random(0,10) * 10)/2 == 0 ? -1 : 1;
		this.speedX = 1 - this.dir * ( Math.random() * 1.3);
		this.speedY = 1 + Math.random() * 1.4;
		this.degrees = Math.random() * 100;
	}
	this.reset();

	this.create = function(){
		canvasContext.fillStyle = 'rgba(255,255,255,0)';
		canvasContext.fillRect(this.x,this.y, SNOW_WIDTH, SNOW_HEIGHT);
	}

	this.move = function() {
		this.x += this.speedX;
		this.y += this.speedY;
		this.degrees += 2*this.speedX ;

		drawRotatedRect(this.x,this.y,SNOW_WIDTH,SNOW_HEIGHT,this.degrees);

		if(this.x < (-SNOW_RADIUS/2) || this.x > (canvas.width + SNOW_RADIUS/2) || this.y > (canvas.height + SNOW_RADIUS/2)){
			this.reset();
		}
	}
}

function drawRotatedRect(x,y,width,height,degrees){
	canvasContext.save();
	canvasContext.beginPath();
	canvasContext.translate( x+width/2, y+height/2 );
	canvasContext.rotate(degrees*Math.PI/180);
	canvasContext.rect( -width/2, -height/2, width,height);
	pattern = canvasContext.createPattern(img, 'repeat');
	canvasContext.fillStyle = pattern;
	canvasContext.fill();
	canvasContext.restore();
}

function clear() {
	canvasContext.fillStyle = '#34699a';
	canvasContext.fillRect(0,0,canvas.width, canvas.height);
}

function colorCircle(centerX, centerY, radius, fillColor) {
	canvasContext.fillStyle = fillColor;
	canvasContext.beginPath();
	canvasContext.arc(centerX, centerY, radius, 0,Math.PI*2, true);
	canvasContext.fill();
}
