const WORLD_W = 50;
const WORLD_H = 50;
const WORLD_COLS = 16;
const WORLD_ROWS = 12;

var levelOne = [
		0, 0, 0, 1, 1, 1, 1, 1, 13, 1, 1, 1, 1, 1, 1, 1,
		0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		0, 12, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		1, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1,
		1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 4, 13, 1, 1, 0, 1,
		1, 0, 0, 1, 12, 0, 12, 12, 1, 1, 1, 1, 4, 1, 0, 1,
		1, 0, 0, 1, 0, 0, 1, 4, 1, 13, 1, 0, 0, 1, 0, 1,
		1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 13, 0, 0, 14, 0, 1,
		1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 13, 0, 1,
		1, 2, 0, 1, 0, 0, 7, 0, 0, 0, 8, 0, 0, 1, 0, 1,
		1, 0, 1, 1, 0, 0, 12, 1, 0, 0, 1, 0, 0, 1, 0, 1,
		1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 13, 1, 1, 1, 1, 1
	];

var levelTwo =[
		0, 0, 1, 1, 16, 2, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1,
		1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1,
		1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 4, 0, 0, 1,
		1, 0, 0, 0, 4, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,
		1, 1, 0, 1, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1,
		1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 11, 1, 1, 1,
		1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0,
		3, 0, 9, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0,
		1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0,
		1, 0, 0, 0, 1, 1, 0, 0, 10, 0, 0, 4, 1, 1, 1, 0,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0
		];


var levelThree =[
		1, 1, 1, 1, 1, 1, 2, 0, 16, 1, 1, 1, 1, 1, 1, 1,
		1, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 1,
		1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1,
		1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1,
		1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1,
		1, 0, 0, 4, 0, 6, 0, 0, 0, 5, 0, 4, 0, 0, 0, 1,
		1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1,
		0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0,
		0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 1, 1, 15, 1, 1, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 1, 1, 3, 1, 1, 0, 0, 0, 0, 0, 0
		];

var levelList = [levelOne, levelTwo, levelThree];
var levelNow = 0;
var worldMap = [];

const TILE_ROAD = 0;
const TILE_WALL = 1;
const TILE_START = 2;
const TILE_DOOR_NEXT = 3;
const TILE_INBAG = 4;
const TILE_BARRIER = 5;
const TILE_BARRIER2 = 6;
const TILE_BARRIER3 = 7;
const TILE_BARRIER4 = 8;
const TILE_BARRIER5 = 9;
const TILE_BARRIER6 = 10;
const TILE_BARRIER7 = 11;

const TILE_WALL1 = 12;
const TILE_WALL2 = 13;

const TILE_BARRIER8 = 14;
const TILE_BARRIER9 = 15;

const TILE_DOOR_PREV = 16;

function returnTileTypeAtColRow(col, row) {
	if(col >= 0 && col < WORLD_COLS &&
		row >= 0 && row < WORLD_ROWS) {
		 var worldIndexUnderCoord = rowColToArrayIndex(col, row);
		 return worldMap[worldIndexUnderCoord];
	} else {
		return WORLD_WALL;
	}
}

function getTileIndexAtPixelCoord(atX, atY) {
	var warriorWorldCol = Math.floor(atX / WORLD_W);
	var warriorWorldRow = Math.floor(atY / WORLD_H);
	var worldIndexUnderWarrior = rowColToArrayIndex(warriorWorldCol, warriorWorldRow);

	if(warriorWorldCol >= 0 && warriorWorldCol < WORLD_COLS &&
		warriorWorldRow >= 0 && warriorWorldRow < WORLD_ROWS) {
		return worldIndexUnderWarrior;
	}

	return undefined;
} // end of warriorWorldHandling


function rowColToArrayIndex(col, row) {
	return col + WORLD_COLS * row;
}

function tileTypeHasTransparency(checkTileType){
		return (checkTileType == TILE_WALL) ||
			(checkTileType == TILE_WALL1) ||
			(checkTileType == TILE_WALL2) ||
			(checkTileType == TILE_DOOR_NEXT) ||
			(checkTileType == TILE_DOOR_PREV) ||
			(checkTileType == TILE_INBAG) ||
			(checkTileType == TILE_BARRIER)||
			(checkTileType == TILE_BARRIER2)||
			(checkTileType == TILE_BARRIER3)||
			(checkTileType == TILE_BARRIER4)||
			(checkTileType == TILE_BARRIER5)||
			(checkTileType == TILE_BARRIER6)||
			(checkTileType == TILE_BARRIER7)||
			(checkTileType == TILE_BARRIER8)||
			(checkTileType == TILE_BARRIER9);
}

function drawWorlds() {

	var arrayIndex = 0;
	var drawTileX = 0;
	var drawTileY = 0;
	for(var eachRow=0;eachRow<WORLD_ROWS;eachRow++) {
		for(var eachCol=0;eachCol<WORLD_COLS;eachCol++) {

			var arrayIndex = rowColToArrayIndex(eachCol, eachRow);
			var tileKindHere = worldMap[arrayIndex];
			var useImg = worldPics[tileKindHere];

			if( tileTypeHasTransparency(tileKindHere) ){
				canvasContext.drawImage(worldPics[TILE_ROAD], drawTileX, drawTileY)
			}

			canvasContext.drawImage(useImg,drawTileX,drawTileY);
			drawTileX += WORLD_W;
			arrayIndex++;
		} // end of for each col
		drawTileY += WORLD_H;
		drawTileX = 0;
	} // end of for each row
}
