const KEY_W = 87;
const KEY_A = 65;
const KEY_S = 83;
const KEY_D = 68;

function setupInput(){
  document.addEventListener('keydown', keyPressed);
  document.addEventListener('keyup', keyReleased);
  superWarrior.setupInput(KEY_W, KEY_D, KEY_S, KEY_A);
}


function keySet(keyEvent, setTo){
  if(!document.querySelector("body").classList.contains('active-modal')) {

    if (keyEvent.keyCode == superWarrior.controlKeyLeft) {
      superWarrior.keyHeld_West = setTo;
    }
    if (keyEvent.keyCode == superWarrior.controlKeyRight) {
      superWarrior.keyHeld_East = setTo;
    }
    if (keyEvent.keyCode == superWarrior.controlKeyUp) {
      superWarrior.keyHeld_North = setTo;
    }
    if (keyEvent.keyCode == superWarrior.controlKeyDown) {
      superWarrior.keyHeld_South = setTo;
    }
  }

  if(keyEvent.keyCode == 32 || keyEvent.keyCode == 13 || keyEvent.keyCode == 27){
    closeModal();
  }
}

function keyPressed(evt){
//	console.log("Key pressed: "+evt.keyCode);
  keySet(evt, true);
	evt.preventDefault();
}
function keyReleased(evt){
  keySet(evt,  false);
}
