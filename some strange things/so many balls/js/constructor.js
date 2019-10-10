function ballClass(){
	var tempRandAng = Math.random()*Math.PI*.7;
	var tempRandSpeed = 1 + Math.random()*3.0;

	this.speedX = Math.cos(tempRandAng)*tempRandSpeed;
	this.speedY = Math.sin(tempRandAng)*tempRandSpeed;


	this.reset = function() {
		for(var eachRow=0;eachRow<TRACK_ROWS;eachRow++) {
			for(var eachCol=0;eachCol<TRACK_COLS;eachCol++) {
				var arrayIndex = rowColToArrayIndex(eachCol, eachRow);

				if(trackGrid[arrayIndex] == TRACK_START) {
					trackGrid[arrayIndex] = TRACK_ROAD;
					this.x = eachCol * TRACK_W + TRACK_W/2;
					this.y = eachRow * TRACK_H + TRACK_H/2;
				}
			}
		}
	}// end of reset


	this.move = function() {
		this.x += this.speedX;
		this.y += this.speedY;

		if(this.x < 0) {
			this.speedX *= -1;
		}
		if(this.x > canvas.width) {
			this.speedX *= -1;
		}
		if(this.y < 0) {
			this.speedY *= -1;
		}
		if(this.y > canvas.height) {
			this.speedY *= -1;
		}
	}// end of move



	this.position = function(){
		var xPosition = parseInt((Math.random(0,1)*TRACK_COLS));
		var yPosition = parseInt((Math.random(0,1)*TRACK_ROWS));

		if(trackGrid[rowColToArrayIndex(xPosition,yPosition)] != TRACK_WALL){
			trackGrid[rowColToArrayIndex(xPosition,yPosition)] = TRACK_START;
		} else {
			this.position();
		}
	}// end of position


	this.create = function(){
		colorCircle(this.x, this.y, 4, '#f79c1d');
	}// end of create
}
