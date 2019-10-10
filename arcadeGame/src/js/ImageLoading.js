var warriorPic = document.createElement('img');
var worldPics = [];

var picsToLoad = 0;

function countLoadedImagesAndLaunchIfREady(){
  picsToLoad--;
  if(picsToLoad == 0){
    ImageLoadingDoneToStartGame();
  }
}

function beginLoadingImage(imgVar, fileName){
  imgVar.onload = countLoadedImagesAndLaunchIfREady();
  imgVar.src = "images/" + fileName;
}

function loadImageForWorldCode(worldCode, fileName){
  worldPics[worldCode] = document.createElement("img");
  beginLoadingImage(worldPics[worldCode], fileName);
}

function loadImages(){
  var imageList = [
    {varName: warriorPic, theFile: "super1.png"},

    {worldType: TILE_WALL, theFile: "table.png"},
    {worldType: TILE_WALL1, theFile: "table1.png"},
    {worldType: TILE_WALL2, theFile: "table2.png"},
    {worldType: TILE_ROAD, theFile: "grass.png"},
    {worldType: TILE_DOOR_NEXT, theFile: "door.png"},
    {worldType: TILE_DOOR_PREV, theFile: "doorback.png"},
    {worldType: TILE_INBAG, theFile: "resume.png"},
    {worldType: TILE_BARRIER, theFile: "hr1.png"},
    {worldType: TILE_BARRIER2, theFile: "hr2.png"},
    {worldType: TILE_BARRIER3, theFile: "hr3.png"},
    {worldType: TILE_BARRIER4, theFile: "hr4.png"},
    {worldType: TILE_BARRIER5, theFile: "hr5.png"},
    {worldType: TILE_BARRIER6, theFile: "hr6.png"},
    {worldType: TILE_BARRIER7, theFile: "hr7.png"},
    {worldType: TILE_BARRIER8, theFile: "hr8.png"},
    {worldType: TILE_BARRIER9, theFile: "hr9.png"},

  ];


	picsToLoad = imageList.length;

  for(var i=0; i<imageList.length; i++){
    if(imageList[i].varName != undefined){
      beginLoadingImage(imageList[i].varName, imageList[i].theFile);
    } else {
      loadImageForWorldCode(imageList[i].worldType, imageList[i].theFile)
    }
  }
}
