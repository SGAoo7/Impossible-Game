//var dat je eindtijd showt hoeveel je hebt gehaald.
var showEndTime = new Kinetic.Text({x: 320,y: 160,text:'', fontSize: 25,fontFamily: 'Calibri', fill: 'black', });

//vars voor het activeren van de buttons als je door gaat naar het volgende script.
var enterTry = false;
var enterMenu = false;
var enterShop = false;
var enterQuit = false;

//vars voor het activeren van de buttons als je omlaag gaat met de pijltjestoetsen.
var menuTrigger = false;
var TryTrigger = true;
var shopTrigger = false;
var quitTrigger = false;

//vars voor het activeren van de buttons als je omhoog gaat met de pijltjestoetsen.
var menuBackTrigger = false;
var shopBackTrigger = false;
var quitBackTrigger = true;

//game over geluid
var gameOverSound = new Audio('assets/audio/GameOverSound.mp3');

//var die zorgt dat je als je doodgaat het game over geluid hoort en niet als je terugkomt van de shop.
var playGameOverSound = false;

function start_end(){
	// alle plaatjes in het level plaatsen, beginposities.
	
	gameObjectsLayer.removeChildren();

	//alle images adden.
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

	//laat alleen gameoversound spelen als je net dood gegaan bent. Niet als je terugkomt uit de shop.
	if(playGameOverSound == true) {
			gameOverSound.play();
			playGameOverSound = false;
	}

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
	

	if(currentGameState==GAME_STATE_END) {								//als deze gamestate geactiveerd is speel de rest van de code af.
		kopenTrue = false;

	if(useCoinAbility == true) {
		useCoinAbility = false;
		useAbilityTimerCoin = 30;
		faster -= 1;
		coinTime += 0.02;
	}
	if(useJumpAbility == true) {
		useJumpAbility = false;
		useAbilityTimerJump = 30;
		jump -= 1;
		jumpSpeed = 10;
	}
	if(useBulletAbility == true) {
		useAbilityTimerBullet = 30;
		useBulletAbility = false;
		bullet --;
	}

	//scale alle images
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

	if(keyPressList[38] && TryTrigger == true) {						//try again button.			
		try_again2.remove();
		gameObjectsLayer.add(try_again);
		end_menu.remove();
		gameObjectsLayer.add(end_menu2);
		shop.remove();
		gameObjectsLayer.add(shop2);
		quit_game.remove();
		gameObjectsLayer.add(quit_game2);
		quitBackTrigger = false;
		enterTry = true
		enterMenu = false;
		menuTrigger = true;
		menuBackTrigger = false;
		TryTrigger = false;
		shopTrigger = false;
		shopBackTrigger = false;
		quitTrigger = false;
		keyPressList[38] = false;
		selectSound.play();
	}
	if(keyPressList[40] && menuTrigger == true){						//menu button		
		end_menu2.remove();	
		gameObjectsLayer.add(end_menu);
		try_again.remove();
		gameObjectsLayer.add(try_again2);
		shop.remove();
		gameObjectsLayer.add(shop2);
		quit_game.remove();
		gameObjectsLayer.add(quit_game2);
		enterTry = false;
		enterMenu = true;
		enterShop = false;
		menuTrigger = false;
		TryTrigger = true;
		shopBackTrigger = false;
		shopTrigger = true;
		keyPressList[40] = false;
		selectSound.play();
	}	
	if(keyPressList[38] && menuBackTrigger == true) {					//menu button back
		try_again.remove();
		gameObjectsLayer.add(try_again2);
		shop.remove();
		gameObjectsLayer.add(shop2);
		end_menu2.remove();
		gameObjectsLayer.add(end_menu);
		quit_game.remove();
		gameObjectsLayer.add(quit_game2);
		TryTrigger = true;
		enterMenu = true;
		enterShop = false;
		menuTrigger = false;
		shopBackTrigger = false;
		shopTrigger = true;
		menuBackTrigger = false;
		keyPressList[38] = false;
		selectSound.play();
	}
	if(keyPressList[40] && shopTrigger == true) {						//shop button
		end_menu.remove();
		gameObjectsLayer.add(end_menu2)
		shop2.remove();
		gameObjectsLayer.add(shop);
		try_again.remove();
		gameObjectsLayer.add(try_again2);
		quit_game.remove();
		gameObjectsLayer.add(quit_game2);
		quitTrigger = false;
		menuTrigger = false;
		enterShop = true;
		enterMenu = false;
		menuBackTrigger = true;
		quitBackTrigger = true;
		shopTrigger = false;
		TryTrigger = false;
		shopBackTrigger = false;
		keyPressList[40] = false;
		selectSound.play();
	}
	if(keyPressList[38] && shopBackTrigger == true) {					//shop back button
		quit_game.remove();
		gameObjectsLayer.add(quit_game2);
		shop2.remove();
		gameObjectsLayer.add(shop);
		try_again.remove();
		gameObjectsLayer.add(try_again2);
		quit_game.remove();
		gameObjectsLayer.add(quit_game2);
		shopBackTrigger = false;
		menuBackTrigger = true;
		quitBackTrigger = true;
		enterQuit = false;
		enterShop = true;
		menuTrigger = false;
		TryTrigger = false;
		quitTrigger = true;
		keyPressList[38] = false;
		selectSound.play();
	} 
	if(keyPressList[40] && quitBackTrigger == true) {					//quit back button
		quit_game2.remove();
		gameObjectsLayer.add(quit_game);
		shop.remove();
		gameObjectsLayer.add(shop2);
		end_menu.remove();
		gameObjectsLayer.add(end_menu2);
		try_again.remove();
		gameObjectsLayer.add(try_again2);
		shopBackTrigger = true;
		quitBackTrigger = false;
		menuBackTrigger = false;
		enterShop = false;
		TryTrigger = false;
		shopTrigger = false;
		menuTrigger = false;
		quitTrigger = false;
		enterQuit = true;
		keyPressList[40] = false;
		selectSound.play();
	}
	if(keyPressList[38] && quitTrigger == true) {						//quit button
		quit_game.remove();
		gameObjectsLayer.add(quit_game2);
		shop.remove();
		gameObjectsLayer.add(shop2);
		try_again.remove();
		gameObjectsLayer.add(try_again2);
		quit_game2.remove();
		gameObjectsLayer.add(quit_game);
		shopBackTrigger = false;
		menuBackTrigger = false;
		quitBackTrigger = false;
		enterQuit = true;
		menuTrigger = false;
		TryTrigger = false;
		quitTrigger = false;
		quitBackTrigger = false;
		keyPressList[38] = false;
		selectSound.play();
	}
	if(keyPressList[13] && enterTry == true) {							//press try again button
		switchGameState(GAME_STATE_INIT_LEVEL);
		pause = false;
		time = 0;
		heroLife = 1;
		useAbilityTimerCoin = 30;
		useAbilityTimerBullet = 30;
		useAbilityTimerJump = 30;
		gameOverSound.currentTime = 0;
		gameOverSound.pause();
		shop_buySound.pause();
	}
	if(keyPressList[13] && enterMenu == true) {							//press menu button
		switchGameState(GAME_STATE_INIT_LEVEL_MENU);
		gameOverSound.pause();
		shop_buySound.pause();
	}
	if(keyPressList[13] && enterShop == true) {							//press shop button
		switchGameState(GAME_STATE_INIT_LEVEL_SHOP);
		gameOverSound.pause();
		playGameOverSound = false;
		//gameOverSound.currentTime = 20;
		shop_buySound.pause();
	}
	if(keyPressList[13] && enterQuit == true) {							//press quit button
		window.close();
	}
	showEndTime.setText('You survived '+ parseInt(time) + ' seconds');	//laat zien hoelang je het overleeft hebt in de game.
}
}
	

	  