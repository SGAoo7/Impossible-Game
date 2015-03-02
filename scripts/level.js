//health variables
var heroLife = 1;

//level variables
var levelSnelheid = 3;

//gravity and jump variables
var canJump = true;
var jumpSpeed = 10;
var JTimer = 0;
var jumpTimer = 0;

var gravity = 10;

var collisionBorder = 495;

var heroInAir = false;

var pause = false;

var time = 0;
var coinTime = 0;
var showTime = new Kinetic.Text({x: 10,y: 10,text:'', fontSize: 20,fontFamily: 'Calibri', fill: 'black', });

//var level_backgroundSound = new Audio('assets/level_background.mp3');

// all the variables.

function start_level(){
	// alle plaatjes in het level plaatsen, beginposities.
	
	gameObjectsLayer.removeChildren();

	//backgrounds
	gameObjectsLayer.add(background1);
	gameObjectsLayer.add(background2);
	
	//hero
	gameObjectsLayer.add(hero);
	
	//spikes
	gameObjectsLayer.add(spikes);

	//block 1, 2 and 3
	gameObjectsLayer.add(block1);
	gameObjectsLayer.add(block2);	
	gameObjectsLayer.add(block3);	
	
	gameObjectsLayer.add(you_tutorial);	
	gameObjectsLayer.add(zin_tutorial);	

	//onzichtbaar block
	gameObjectsLayer.add(onzichtbaar_blok1);
	gameObjectsLayer.add(onzichtbaar_blok2);
	gameObjectsLayer.add(onzichtbaar_blok3);
	
	//level_backgroundSound.play();

	hero.offsetY(50);
	hero.setY(495);

	
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

	hero.setX(hero.getX() -2);
	if(currentGameState == GAME_STATE_LEVEL) {
		if(hero.getX() <= 0) {
			heroLife = 0;
			switchGameState(GAME_STATE_INIT_LEVEL_END);
		}
	} 

	if(pause == false) {
		levelSnelheid = 0;
		if(keyPressList[32]) {
			pause = true;
			zin_tutorial.remove();
			you_tutorial.remove();
		}
	}
	//hero.setX(hero.getX() -1);
	if(pause == true && heroLife == 1) {
		levelSnelheid = 3;
		time += 0.02;
		coinTime += 0.02;
		gameObjectsLayer.add(showTime);
	}
	if(coinTime >= 1) {
		coinTime = 0;
		coins += 1;
	}
	if(coins >= 10) {
		jumpBuy = true;

	}
	if(collision(hero, onzichtbaar_blok1)) {
		hero.setY(onzichtbaar_blok1.getY() - 10);
		hero.setX(hero.getX() + 3);
	}
	if(collision(hero, onzichtbaar_blok2)) {
		hero.setY(onzichtbaar_blok2.getY() - 10);
		hero.setX(hero.getX() + 3);
	}
	if(collision(hero, onzichtbaar_blok3)) {
		hero.setY(onzichtbaar_blok3.getY() - 10);
		hero.setX(hero.getX() + 3);
	}
	showTime.setText('You lived '+ parseInt(time) + ' seconds');
	//hero
	//hero.setX(hero.getX() -2);
	
	// if(currentGameState==GAME_STATE_LEVEL) {
	// 	 if(coins == 11) {
	// 	 	switchGameState(GAME_STATE_INIT_LEVEL_END);
	// 	 	heroLife = 0;
	// 	 }
	// }
	//spikes

	spikes.setX(spikes.getX()-levelSnelheid);			//spikes sidescroll

	//block 1, 2 and 3

	block1.setX(block1.getX()-levelSnelheid);			//block1 sidescroll
	block2.setX(block2.getX()-levelSnelheid);			//block2 sidescroll
	block3.setX(block3.getX()-levelSnelheid);			//block3 sidescroll

	onzichtbaar_blok1.setX(block1.getX());
	onzichtbaar_blok1.setY(block1.getY());
	onzichtbaar_blok2.setX(block2.getX());
	onzichtbaar_blok2.setY(block2.getY());
	onzichtbaar_blok3.setX(block3.getX());
	onzichtbaar_blok3.setY(block3.getY());

	if(collision(block1, block2)) {
		block1.setX(Math.floor((Math.random() * 1000) + 950));
		block1.setY(445)
	}
	if(collision(block1, block3)) {
		block2.setX(Math.floor((Math.random() * 1400) + 1100));
		block2.setY(445);
	}
	if(collision(block2, block3)) {
		block3.setX(Math.floor((Math.random() * 1600) + 1400));
		block3.setY(Math.floor((Math.random() * 100) + 0));
	}
	if(block1.getX() <= -200) {
		block1.setX(Math.floor((Math.random() * 1000) + 950));
		block1.setY(445);
			if(block2.getX() >= block1.getX() +40) {
				block2.setX(block1.getX()+Math.floor((Math.random() * 100) + 50));
			}
	}
	if(block2.getX() <= -200) {
		block2.setX(Math.floor((Math.random() * 1400) + 1100));
		block2.setY(445);
			if(block1.getX() >= block2.getX() +40) {
				block1.setX(block2.getX()+Math.floor((Math.random() * 100) + 50));
			}
	}
	if(block3.getX() <= -200) {
		block3.setX(Math.floor((Math.random() * 1600) + 1400));
		block3.setY(Math.floor((Math.random() * 350) + 300));
	}

	//backgrounds

	background1.setX(background1.getX()-levelSnelheid); //background 1 sidescroll
	background2.setX(background2.getX()-levelSnelheid); //background 2 sidescroll

	if(background1.getX() <= -1000) {					//background 1 set to 1000
		background1.setX(background2.getX()+1000);
	}
	if(background2.getX() <= -1000) {					//background 2 set to 1000
		background2.setX(background1.getX()+1000);
	}
	
	//collisions

	//if(collision(hero,spikes)){							//collison between hero and spikes
	
	//}
	if (collision(block1, hero)) {						//collison between block 1 and hero
		hero.setX(hero.getX()-levelSnelheid);
	}
	if (collision(block2, hero)) {						//collison between block 2 and hero
		hero.setX(hero.getX()-levelSnelheid);
	}

	//health
	console.log(JTimer);
	
	//jump and gravity sysmtem

	if(keyPressList[32] && canJump == true && jumpTimer <= 0 && JTimer <= 0) {
		canJump = false;
		jumpTimer = 10;
		keyPressList[32] = false;
	}
	if(jumpTimer <= 0){
		canJump = true;
	}
	else {
		jumpTimer -= 1 ;
	}
	if(canJump == false) {
		hero.setY(hero.getY() -jumpSpeed);
	}
	else if(hero.getY() < collisionBorder) {
		JTimer += 1;
		hero.setY(hero.getY() + gravity);
	}
	else {
		JTimer = 0;
	}
	
	gameObjectsLayer.draw();
}
	

	  