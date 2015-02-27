
//var level_backgroundSound = new Audio('assets/level_background.mp3');

// all the variables.

function start_end(){
	// alle plaatjes in het level plaatsen, beginposities.
	
	gameObjectsLayer.removeChildren();

	gameObjectsLayer.add(background1);
	gameObjectsLayer.add(background_menu);

	gameObjectsLayer.draw();


			
	switchGameState(GAME_STATE_END); 
}



function level_end() {
	gameLoop=setInterval(update_end,20);  
	//update();
	//20 is de 'wachttijd in milliseconden, de functie 'update' wordt om de 0.02 s aangeroepen.
	// Dit voorbeeld is dus 50 fps (mits de hardware het aankan)
	
}


function update_end() {
	background_menu.scale({x: 0.1, y: 0.1});
	background1.setX(0);
}
	

	  