//deze variables zijn voor welke knop geselecteerd is
var quitTrue = false;
var startTrue = false;

//deze variables zijn voor de audio in het menu te laten afspelen. selectSound wordt ook bij andere scripts gebruikt.
var selectSound = new Audio('assets/audio/selectSound.wav');
var menu_backgroundSound = new Audio ('assets/audio/menu_backgroundSound.mp3');

function start_menu(){
	// alle plaatjes in het level plaatsen, beginposities.
	
	gameObjectsLayer.removeChildren();
	
	gameObjectsLayer.add(background_menu);
	gameObjectsLayer.add(menu_title);
	gameObjectsLayer.add(menu_start);
	gameObjectsLayer.add(menu_space);
	gameObjectsLayer.add(menu_quit);
	gameObjectsLayer.add(menu_arrow);
	menu_backgroundSound.play();
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

	//volume van audio regelen.
	menu_backgroundSound.volume = 0.5;
	selectSound.volume = 0.2
	if(currentGameState == GAME_STATE_MENU) {

	background_menu.scale({x:0.5, y:0.5});
	
	//dit systeem zorgt er voor dat je de knoppen kan selecteren. Als je naar boven gaat en naar onder met de pijltjetoetsen.
	//in princiepe werkt het zo. Als je naar boven gaat met pijltjes dan komt er een nieuwe image en de andere gaat weg.
	//zo weet je of je iets geselecteerd hebt.
	if(keyPressList[40]) {									//menu quit button
		gameObjectsLayer.add(menu_quit_2);
		menu_start_2.remove();
		quitTrue = true;
		startTrue = false;
		selectSound.play();
	}
	if(keyPressList[38]) {									//menu start button
		gameObjectsLayer.add(menu_start_2);
		menu_quit_2.remove();
		startTrue = true;
		quitTrue = false;
		selectSound.play();
	}
	if(keyPressList[13] && quitTrue == true) {				//quit button pressed
		window.close();
		quitTrue = false;
	}	
	if(keyPressList[13] && startTrue == true) {				//start button pressed
		menu_backgroundSound.currentTime = 0;	
		menu_backgroundSound.pause();
		heroLife = 1;
		pause = false;
		time = 0;
		switchGameState(GAME_STATE_INIT_LEVEL);
		startTrue = false;
		menu_backgroundSound.pause();
	}
	gameObjectsLayer.draw();
	}
}  