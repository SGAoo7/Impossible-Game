var line2 = new Kinetic.Line({
 			x: 100,
  			y: 100,
  			points: [-60, 330, 780, 330],
  			stroke: '#E6E6E6'
});
var line = new Kinetic.Line({
 			x: 100,
  			y: 100,
  			points: [-60, 0, 150, 0],
  			stroke: '#E6E6E6'
});
var jumpTrigger = false;
var bulletTrigger = true;
var coinTrigger = false;

var jumpBackTrigger = false;
var bulletBackTrigger = true;
var coinBackTrigger = false;

var jumpBuy = false;
var jumpExtraBuy = false;
var bulletBuy = false;
var bulletExtraBuy = false;
var coinsBuy = false;
var coinsExtraBuy = false;

var useJumpAbility = false;
var useCoinAbility = false;
var useBulletAbility = false;

var coins = 0;
var showCoins = new Kinetic.Text({x: 150,y: 120,text:'', fontSize: 24,fontFamily: 'Calibri', fill: 'white', });
var bullet = 0;
var showBullets = new Kinetic.Text({x: 150,y: 250,text:'', fontSize: 24,fontFamily: 'Calibri', fill: 'white', });
var jump = 0;
var showJumps = new Kinetic.Text({x: 150,y: 290,text:'', fontSize: 24,fontFamily: 'Calibri', fill: 'white', });
var faster = 0;
var showFaster = new Kinetic.Text({x: 150,y: 330,text:'', fontSize: 24,fontFamily: 'Calibri', fill: 'white', });

var shop_buySound = new Audio('assets/shop_buySound.mp3');
var shop_backgroundSound = new Audio('assets/shop_backgroundSound.mp3');

var kopenTrue = false;

// all the variables.

function start_shop(){
	// alle plaatjes in het level plaatsen, beginposities.
	
	gameObjectsLayer.removeChildren();

	gameObjectsLayer.add(end_background2);
	gameObjectsLayer.add(end_background);
	gameObjectsLayer.add(shop_background);
	gameObjectsLayer.add(shop_escape);
	gameObjectsLayer.add(shop_shop);
	gameObjectsLayer.add(line);
	gameObjectsLayer.add(line2);
	gameObjectsLayer.add(shop_bullets);
	gameObjectsLayer.add(shop_jump);
	gameObjectsLayer.add(shop_coin);
	gameObjectsLayer.add(shop_arrow);
	gameObjectsLayer.add(shop_enter);
	gameObjectsLayer.add(cost_bullets);
	gameObjectsLayer.add(cost_jump);
	gameObjectsLayer.add(cost_coin);
	gameObjectsLayer.add(shop_money);
	gameObjectsLayer.add(shop_abilities);
	gameObjectsLayer.add(bullet_lol);
	gameObjectsLayer.add(jump_lol);
	gameObjectsLayer.add(coin_lol);
	gameObjectsLayer.add(showCoins);
	gameObjectsLayer.add(showBullets);
	gameObjectsLayer.add(showJumps);
	gameObjectsLayer.add(showFaster);
	kopenTrue = true;
	shop_backgroundSound.play();
	gameObjectsLayer.draw();

	level_shop();
}



function level_shop() {
	gameLoop=setInterval(update_shop,20);  
	//update();
	//20 is de 'wachttijd in milliseconden, de functie 'update' wordt om de 0.02 s aangeroepen.
	// Dit voorbeeld is dus 50 fps (mits de hardware het aankan)
	
}


function update_shop() {

	//set all text and scale all images
	showCoins.setText(coins);	
	showBullets.setText(bullet);	
	showJumps.setText(jump);	
	showFaster.setText(faster);	
	end_background.scale({x: 0.5, y: 0.45});
	shop_background.scale({x: 1.51, y: 1.28});
	
	if(keyPressList[27]) {										//esc button
		shop_backgroundSound.pause();
		switchGameState(GAME_STATE_INIT_LEVEL_END);
		shop_buySound.pause();
		menu_backgroundSound.pause();
		gameOverSound.currentTime = 8;	
		shop_backgroundSound.currentTime = 0;
		kopenTrue = false;
		playGameOverSound = false;
		shop_buySound.currentTime = 0;	
	}
	if(keyPressList[39] && bulletTrigger == true) {				//bullet buy active
		shop_bullets.opacity(1);
		cost_bullets.opacity(1);
		shop_enter.opacity(1);
		bulletTrigger = false;
		keyPressList[39] = false;
		jumpTrigger = true;
		bulletExtraBuy = true;
		jumpExtraBuy = false;
	}	
	if(keyPressList[39] && jumpTrigger == true) {				//jump buy active
		bulletBackTrigger = true;
		shop_jump.opacity(1);
		cost_jump.opacity(1);
		cost_bullets.opacity(0.6);
		keyPressList[39] = false;
		jumpTrigger = false;
		coinTrigger = true;
		jumpExtraBuy = true;
		bulletExtraBuy = false;
		coinsExtraBuy = false;
		shop_bullets.opacity(0.6);
	}
	if(keyPressList[39] && coinTrigger == true) {				//coin buy active
		shop_coin.opacity(1);
		cost_coin.opacity(1);
		shop_jump.opacity(0.6);
		cost_jump.opacity(0.6);
		coinTrigger = false;
		jumpBackTrigger = true;
		keyPressList[39] = false;
		jumpBackTrigger = true;
		jumpExtraBuy = false;
		coinsExtraBuy = true;
		jumpBuy = false;
	}
	if(keyPressList[37] && jumpBackTrigger == true) {			//jump back buy active
		jumpBackTrigger = false;
		coinTrigger = true;
		bulletBackTrigger = true;
		keyPressList[37] = false;
		shop_jump.opacity(1);
		shop_coin.opacity(0.6);
		cost_coin.opacity(0.6);
		cost_jump.opacity(1);
		bulletExtraBuy = false;
		coinsExtraBuy = false;
		jumpExtraBuy = true;
	}
	if(keyPressList[37] && bulletBackTrigger == true) {			//bullet back buy active
		bulletBackSTrigger = false;
		coinTrigger = true;
		jumpTrigger = true;
		keyPressList[37] = false;
		shop_jump.opacity(0.6);
		cost_jump.opacity(0.6);
		shop_bullets.opacity(1);
		cost_bullets.opacity(1);
		bulletExtraBuy = true
		jumpExtraBuy = false;
	}
	if(keyPressList[13] && jumpBuy == true && jumpExtraBuy == true && kopenTrue == true) {		//buy jump
		coins -= 10;
		shop_buySound.play();
		jump += 1;
		keyPressList[13] = false;
		 if(coins <= 0) {
		 	coins = 0;
		 }
	}
	if(keyPressList[13] && bulletBuy == true && bulletExtraBuy == true && kopenTrue == true) {	//buy bullet
		coins -= 12;
		bullet += 1;
		shop_buySound.play();
		keyPressList[13] = false;
		 if(coins <= 0) {
		 	coins = 0;
		 }
	}	
	if(keyPressList[13] && coinsBuy == true && coinsExtraBuy == true && kopenTrue == true) {	//buy faster coins
		coins -= 11;
		faster += 1;
		shop_buySound.play();
		keyPressList[13] = false;
		 if(coins <= 0) {
		 	coins = 0;
		 }
	}
	//can you buy jump ability?
	if(coins >= 10) {
		jumpBuy = true;
	}
	else {
		jumpBuy = false;
	}
	//can you buy bullet ability?
	if(coins>= 12) {
		bulletBuy = true;
	}
	else {
		bulletBuy = false;
	}
	//can you buy faster coins ability?
	if(coins>= 11) {
		coinsBuy = true;
	}
	else {
		coinsBuy = false;
	}
}
	

	  