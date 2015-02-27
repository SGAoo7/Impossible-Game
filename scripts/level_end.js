var showEndTime = new Kinetic.Text({x: 320,y: 160,text:'', fontSize: 25,fontFamily: 'Calibri', fill: 'black', });
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
	gameObjectsLayer.add(end_menu);
	gameObjectsLayer.add(try_again);
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
	end_background.scale({x: 0.5, y: 0.45});
	GameOver.scale({x: 1.5, y: 1.5});
	end_menu.scale({x: 0.8, y: 0.8});
	end_menu2.scale({x: 0.8, y: 0.8});
	try_again.scale({x: 0.8, y: 0.8});
	try_again2.scale({x: 0.8, y: 0.8});
	shop.scale({x: 0.8, y: 0.8});
	shop2.scale({x: 0.8, y: 0.8});
	quit_game.scale({x: 0.8, y: 0.8});
	quit_game2.scale({x: 0.8, y: 0.8});

	showEndTime.setText('You survived '+ parseInt(time) + ' seconds');
}
	

	  