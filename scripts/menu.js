var quitTrue = false;
var startTrue = false;
var begin = false;

// all the variables.

function start_menu(){
	// alle plaatjes in het level plaatsen, beginposities.
	
	gameObjectsLayer.removeChildren();
	
	gameObjectsLayer.add(background_menu);
	gameObjectsLayer.add(menu_title);
	gameObjectsLayer.add(menu_start);
	gameObjectsLayer.add(menu_space);
	gameObjectsLayer.add(menu_quit);
	gameObjectsLayer.add(menu_arrow);

	gameObjectsLayer.draw();

	hero.setX(100);
			
	switchGameState(GAME_STATE_MENU); 

}



function level_menu() {
	gameLoop=setInterval(update_menu,20);  
	//update();
	//20 is de 'wachttijd in milliseconden, de functie 'update' wordt om de 0.02 s aangeroepen.
	// Dit voorbeeld is dus 50 fps (mits de hardware het aankan)
	
}

function update_menu(){

	if(currentGameState == GAME_STATE_MENU) {

	background_menu.scale({x:0.5, y:0.5});
	
	if(keyPressList[40]) {									//menu quit button
		gameObjectsLayer.add(menu_quit_2);
		menu_start_2.remove();
		quitTrue = true;
		startTrue = false;
	}
	if(keyPressList[38]) {									//menu start button
		gameObjectsLayer.add(menu_start_2);
		menu_quit_2.remove();
		startTrue = true;
		quitTrue = false;
	}
	if(keyPressList[13] && quitTrue == true) {
		window.close();
		quitTrue = false;
	}
	if(keyPressList[13] && startTrue == true) {
		switchGameState(GAME_STATE_INIT_LEVEL);
		startTrue = false;
		begin = true;
	}
	gameObjectsLayer.draw();
	}
}  