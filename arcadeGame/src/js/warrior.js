const PLAYER_MOVE_SPEED = 3.0;

function warriorClass(){
  this.x = 75;
  this.y = 75;
  this.name = "---";
  this.keysHeld = 0;

  this.keyHeld_North = false;
  this.keyHeld_South = false;
  this.keyHeld_West = false;
  this.keyHeld_East = false;

  this.setupInput = function(upKey, rightKey, downKey, leftKey){
    this.controlKeyUp = upKey;
    this.controlKeyRight = rightKey;
    this.controlKeyDown = downKey;
    this.controlKeyLeft = leftKey;
  };

  this.reset = function(whichImage, warriorName) {
    this.name = warriorName;
    this.myWarriorPic = whichImage;
		this.keysHeld = 0;

    for(var eachRow=0;eachRow<WORLD_ROWS;eachRow++) {
      for(var eachCol=0;eachCol<WORLD_COLS;eachCol++) {
        var arrayIndex = rowColToArrayIndex(eachCol, eachRow);
        if(worldMap[arrayIndex] == TILE_START) {
          worldMap[arrayIndex] = TILE_ROAD;
          this.x = eachCol * WORLD_W + WORLD_W/2;
          this.y = eachRow * WORLD_H + WORLD_H/2;
          return;
        }
      }
    }
    //console.log("Никто не играет :(");
  };//end of warriorReset



  this.move = function(){
    var nextX = this.x;
    var nextY = this.y;

    if(this.keyHeld_North){
      nextY -= PLAYER_MOVE_SPEED;
    }
    if(this.keyHeld_South){
      nextY += PLAYER_MOVE_SPEED;
    }
    if(this.keyHeld_West){
      nextX -= PLAYER_MOVE_SPEED;
    }
    if(this.keyHeld_East){
      nextX += PLAYER_MOVE_SPEED;
    }


    var walkIntoTileIndex = getTileIndexAtPixelCoord(nextX, nextY);
    var walkIntoTileType = TILE_WALL || TILE_WALL1 || TILE_WALL2;

		if(walkIntoTileIndex != undefined) {
			walkIntoTileType = worldMap[walkIntoTileIndex];
		}

    switch(walkIntoTileType){
      case TILE_ROAD:
        this.x = nextX;
        this.y = nextY;
        break;
      case TILE_DOOR_NEXT:
        nextLevel();
        break;
      case TILE_DOOR_PREV:
        prevLevel();
        break;
      case TILE_BARRIER9:
      case TILE_BARRIER8:
      case TILE_BARRIER7:
      case TILE_BARRIER6:
      case TILE_BARRIER5:
      case TILE_BARRIER4:
      case TILE_BARRIER3:
      case TILE_BARRIER2:
      case TILE_BARRIER:
        if(this.keysHeld > 0){
          this.keysHeld--;
          document.getElementById('resumeCol').innerHTML = this.keysHeld ;
          worldMap[walkIntoTileIndex] = TILE_ROAD;
        } else {
          document.getElementById('resumeError').innerHTML = 'У&nbsp;меня нет резюме, я&nbsp;не&nbsp;могу пройти.';
        }
        break;
      case TILE_INBAG:
        document.getElementById('resumeError').innerHTML = '';
        this.keysHeld++;
        document.getElementById('resumeCol').innerHTML =  this.keysHeld ;
        worldMap[walkIntoTileIndex] = TILE_ROAD;
        break;
      case TILE_WALL2:
      case TILE_WALL1:
      case TILE_WALL:
      default:
          break;
    }
  };//end of warriorMove

  this.draw = function(){
    drawBitmapCenteredWithRotation(this.myWarriorPic, this.x, this.y);
  };//end of warriorDraw
}
