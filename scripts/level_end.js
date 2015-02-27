var showEndTime = new Kinetic.Text({x: 320,y: 160,text:'', fontSize: 25,fontFamily: 'Calibri', fill: 'black', });
var enterTry = false;
var enterMenu = false;
var menuTrigger = false;
var TryTrigger = true;
var shopTrigger = false;
var quitTrigger = false;
var menuBackTrigger = false;
var shopBackTrigger = false;
// all the variables.

function start_end(){
	// alle plaatjes in het level plaatsen, beginposities.
	
	gameObjectsLayer.removeChildren();

	gameObjectsLayer.add(end_background2);
	gameObjectsLayer.add(end_background);
	gameObjectsLayer.add(showEndTime);
	gameObjectsLayer.add(GameOver);
	gameObjectsLayer.add(menu_arrow);
	gameObjectsLayer.add(menu_space);
	gameObjectsLayer.add(end_menu2);
	gameObjectsLayer.add(try_again2);
	gameObjectsLayer.add(shop2);
	gameObjectsLayer.add(quit_game2);
	

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
	
	if(currentGameState==GAME_STATE_END) {

	end_background.scale({x: 0.5, y: 0.45});
	GameOver.scale({x: 1.5, y: 1.5});
	end_menu.scale({x: 0.6, y: 0.6});
	end_menu2.scale({x: 0.6, y: 0.6});
	try_again.scale({x: 0.6, y: 0.6});
	try_again2.scale({x: 0.6, y: 0.6});
	shop.scale({x: 0.6, y: 0.6});
	shop2.scale({x: 0.6, y: 0.6});
	quit_game.scale({x: 0.6, y: 0.6});
	quit_game2.scale({x: 0.6, y: 0.6});

	console.log(shopBackTrigger);

	if(keyPressList[38] && TryTrigger == true) {				//try again button
		try_again2.remove();
		gameObjectsLayer.add(try_again);
		end_menu.remove();
		gameObjectsLayer.add(end_menu2);
		shop.remove();
		gameObjectsLayer.add(shop2);
		quit_game.remove();
		gameObjectsLayer.add(quit_game2);
		enterTry = true
		enterMenu = false;
		menuTrigger = true;
		TryTrigger = false;
		shopTrigger = true;
		keyPressList[38] = false;
	}
	if(keyPressList[40] && menuTrigger == true){				//menu button 
		end_menu2.remove();	
		gameObjectsLayer.add(end_menu);
		try_again.remove();
		gameObjectsLayer.add(try_again2);
		enterTry = false;
		enterMenu = true;
		menuTrigger = false;
		TryTrigger = true;
		shopTrigger = true;
		menuBackTrigger = true;
		keyPressList[40] = false;
	}
	if(keyPressList[38] && menuBackTrigger == true) {
		try_again.remove();
		gameObjectsLayer.add(try_again2);
		shop.remove();
		gameObjectsLayer.add(shop2);
		end_menu2.remove();
		gameObjectsLayer.add(end_menu);
		quit_game.remove();
		gameObjectsLayer.add(quit_game2);
		TryTrigger = true;
		menuBackTrigger = false;
		keyPressList[38] = false;
	}
	if(keyPressList[40] && shopTrigger == true) {
		end_menu.remove();
		gameObjectsLayer.add(end_menu2)
		shop2.remove();
		gameObjectsLayer.add(shop);
		try_again.remove();
		quitTrigger = true;
		shopTrigger = false;
		TryTrigger = false;
		keyPressList[40] = false;
	}
	if(keyPressList[38] && shopBackTrigger == true) {
		quit_game.remove();
		gameObjectsLayer.add(quit_game2);
		shop2.remove();
		gameObjectsLayer.add(shop);
		shopBackTrigger = false;
		keyPressList[38] = false;
	}
	if(keyPressList[40] && quitTrigger == true) {
		quit_game2.remove();
		gameObjectsLayer.add(quit_game);
		shop.remove();
		gameObjectsLayer.add(shop2);
		shopBackTrigger = true
		shopTrigger = true;
		quitTrigger = false;
		keyPressList[40] = false;
	}
	if(keyPressList[13] && enterTry == true && currentGameState == GAME_STATE_END) {
		switchGameState(GAME_STATE_INIT_LEVEL);
	}
	if(keyPressList[13] && enterMenu == true && currentGameState == GAME_STATE_END) {
		switchGameState(GAME_STATE_MENU);
	}
	showEndTime.setText('You survived '+ parseInt(time) + ' seconds');
}
}
	

	  