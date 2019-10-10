const TRACK_W = 30;
const TRACK_H = 30;
const TRACK_GAP = 2;
const TRACK_COLS = 27;
const TRACK_ROWS = 22;

const TRACK_ROAD = 0;
const TRACK_WALL = 1;
const TRACK_START = 2;

var trackGrid = [];


function isTrackAtColRow(col, row) {
  if(col >= 0 && col < TRACK_COLS && row >= 0 && row < TRACK_ROWS) {
    var trackIndexUnderCoord = rowColToArrayIndex(col, row);
    return (trackGrid[trackIndexUnderCoord] == TRACK_WALL);
  } else {
    return false;
  }
}


function ballTrackHandling(whichBall) {
	var ballTrackCol = Math.floor(whichBall.x / TRACK_W);
	var ballTrackRow = Math.floor(whichBall.y / TRACK_H);
	var trackIndexUnderBall = rowColToArrayIndex(ballTrackCol, ballTrackRow);

	if(ballTrackCol >= 0 && ballTrackCol < TRACK_COLS &&
		ballTrackRow >= 0 && ballTrackRow < TRACK_ROWS) {

		if(isTrackAtColRow( ballTrackCol,ballTrackRow )) {
			var prevBallX = whichBall.x - whichBall.speedX*.8;
			var prevBallY = whichBall.y - whichBall.speedY*.8;
			var prevTrackCol = Math.floor(prevBallX / TRACK_W);
			var prevTrackRow = Math.floor(prevBallY / TRACK_H);

			var bothTestsFailed = true;

			if(prevTrackCol != ballTrackCol) {
				if(isTrackAtColRow(prevTrackCol, ballTrackRow) == false) {
					whichBall.speedX *= -.8;
					bothTestsFailed = false;
				}
			}
			if(prevTrackRow != ballTrackRow) {
				if(isTrackAtColRow(ballTrackCol, prevTrackRow) == false) {
					whichBall.speedY *= -1;
					bothTestsFailed = false;
				}
			}

			if(bothTestsFailed) {
				whichBall.speedX *= -1;
				whichBall.speedY *= -1;
			}
		}
	}
}


function rowColToArrayIndex(col, row) {
	return col + TRACK_COLS * row;
}

function drawTracks() {
	colorRect(0,0, canvas.width,canvas.height, '#34699a');

	for(var eachRow=0;eachRow<TRACK_ROWS;eachRow++) {
		for(var eachCol=0;eachCol<TRACK_COLS;eachCol++) {

			var arrayIndex = rowColToArrayIndex(eachCol, eachRow);

			if(trackGrid[arrayIndex] == TRACK_WALL) {
				colorRect(TRACK_W*eachCol,TRACK_H*eachRow,
					TRACK_W-TRACK_GAP,TRACK_H-TRACK_GAP, '#113f67');
			}
		}
	}
}
