
//var level_backgroundSound = new Audio('assets/level_background.mp3');

// all the variables.

function start_level(){
	// alle plaatjes in het level plaatsen, beginposities.
	
	gameObjectsLayer.removeChildren();
	
	gameObjectsLayer.draw();
			
	switchGameState(GAME_STATE_LEVEL); 
}



function level_level() {
	gameLoop=setInterval(update_level,20);  
	//update();
	//20 is de 'wachttijd in milliseconden, de functie 'update' wordt om de 0.02 s aangeroepen.
	// Dit voorbeeld is dus 50 fps (mits de hardware het aankan)
	
}


function update_level() {

}
	

	  