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

//start var if you press space it's true.
var pause = false;

//ability timer that counts down from 30 to 0.
var useAbilityTimer = 30;


//vars so that you can shoot.
var bulletTimer = 30;
var bulletShoot = false;

//real timer
var time = 0;
//cointimer that's is the same as realtimer only difference is that it gives you money.
var coinTime = 0;

//tutorial vars in the beginning of the game.
var showTime = new Kinetic.Text({x: 10,y: 10,text:'', fontSize: 20,fontFamily: 'Calibri', fill: 'black', });
var shopShow = new Kinetic.Text({x: 650,y: 10,text:'', fontSize: 20,fontFamily: 'Calibri', fill: 'black', });
var koopShow = new Kinetic.Text({x: 540,y: 40,text:'', fontSize: 20,fontFamily: 'Calibri', fill: 'black', });
//text vars to show ability tutorial.
var bulletAbilityShow = new Kinetic.Text({x: 400,y: 470,text:'', fontSize: 20,fontFamily: 'Calibri', fill: 'black', });
var jumpAbilityShow = new Kinetic.Text({x: 400,y: 440,text:'', fontSize: 20,fontFamily: 'Calibri', fill: 'black', });
var coinAbilityShow = new Kinetic.Text({x: 400,y: 410,text:'', fontSize: 20,fontFamily: 'Calibri', fill: 'black', });
//bullet array
var bullets = [];
//var that controls the time in the level.
var levelSpeed = false;

var level_backgroundSound = new Audio('assets/level_background.mp3');

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
	gameObjectsLayer.add(shopShow);
	gameObjectsLayer.add(koopShow);
	
	
	//reset all gameobject if you switch back to this level.
	hero.offsetY(50);
	hero.setY(495);
	hero.setX(100);
	background1.setX(0);
	background2.setX(1000);
	spikes.setX(900);
	block1.setX(1200);
	block2.setX(1400);
	block3.setX(1600);


	
	gameObjectsLayer.draw();
			
	switchGameState(GAME_STATE_LEVEL); 
}



function level_level() {
	//this will not make your game speed up if you swith back to this level.
	if(levelSpeed == false) {
	gameLoop=setInterval(update_level,20);  
	levelSpeed = true;
}
	//update();
	//20 is de 'wachttijd in milliseconden, de functie 'update' wordt om de 0.02 s aangeroepen.
	// Dit voorbeeld is dus 50 fps (mits de hardware het aankan)
}


function update_level() {

	//volume of background music
	level_backgroundSound.volume = 0.2;

	//set all text
	shopShow.setText('*You can buy things in the shop*');
	koopShow.setText('*For every 30 seconds you live you get 1 coin*');
	bulletAbilityShow.setText('When you play the game, press "q" and then enter to shoot.');
	jumpAbilityShow.setText('When you play the game, press "w" and you will jump higher.');
	coinAbilityShow.setText('When you play the game, press "e" and you will get more money.');
	showTime.setText('You lived '+ parseInt(time) + ' seconds');

	//if statement when you die
	if(currentGameState == GAME_STATE_LEVEL) {
		if(hero.getX() <= 0) {
			heroLife = 0;
			level_backgroundSound.pause();
			playGameOverSound = true;
			level_backgroundSound.currentTime = 0;	
			switchGameState(GAME_STATE_INIT_LEVEL_END);
		}
	}
	//if you buyed an ability tutorial will show
	if(bullet >= 1 && pause == false) {
		gameObjectsLayer.add(bulletAbilityShow);
	}  
	if(jump >= 1 && pause == false) {
		gameObjectsLayer.add(jumpAbilityShow);
	}
	if(faster >= 1 && pause == false) {
		gameObjectsLayer.add(coinAbilityShow);
	}
 	//start if you press space
 	if(pause == false) {
		levelSnelheid = 0;
		  
		if(keyPressList[32]) {
			pause = true;
			zin_tutorial.remove();
			you_tutorial.remove();
			shopShow.remove();
			bulletAbilityShow.remove();
			jumpAbilityShow.remove();
			coinAbilityShow.remove();
			koopShow.remove();
		}
	}
	//timer and level play
	if(pause == true && heroLife == 1) {
		levelSnelheid = 3;
		level_backgroundSound.play();
		time += 0.02;
		coinTime += 1;
		gameObjectsLayer.add(showTime);
			//use coin ability for 30 seconds
			if(useCoinAbility == true) {
				useAbilityTimer -= 1.02;
				coins += 1;
					if(useAbilityTimer <= 0) {
						useCoinAbility = false;
						faster -= 0;
						coins += 0;
						useAbilityTimer = 30;
					}
			}
			//use jump ability for 30 seconds
			if(useJumpAbility == true) {
				useAbilityTimer -= 0.02;
				jumpSpeed = 20
					if(useAbilityTimer <= 0) {
						useJumpAbility = false;
						jump -= 0;
						jumpSpeed = 10;
						useAbilityTimer = 30;
					}
			}
			//use bullet ability for 30 seconds and make bullets.
			if(useBulletAbility == true) {
				useAbilityTimer -= 0.02;
				if(keyPressList[13] && bulletShoot == true) {
					bulletTimer = 30;
					bulletShoot = false;
					bullets.push(new Kinetic.Image({x:hero.getX() + 50, Y:hero.getY() - 30, image:bulletImage}))
					for(i=0; i<bullets.length; i++) {
							gameObjectsLayer.add(bullets[i]);
					}
				}
					if(useAbilityTimer <= 0) {
						useBulletAbility = false;
						bullet -= 1;
						useAbilityTimer = 30;
					}
			}
			
	}
	//timer for when you can shoot again.
	if(bulletTimer > 0) {
		bulletTimer -=1;
		if(bulletTimer == 0) {
			bulletShoot = true;
		}
	}
	//collision with bullet[i] and the different blocks.
	for (i=0;i<bullets.length;i++) {
	if (collision(bullets[i],block1)){
		block1.remove();					
		bullets[i].remove();
		block1.setY(600);
		bullets[i].setY(600);
	}
}
	for (i=0;i<bullets.length;i++) {
	if (collision(bullets[i],block2)){
		block2.remove();					
		bullets[i].remove();
		block2.setY(600);
		bullets[i].setY(600);
	}
}
	for (i=0;i<bullets.length;i++) {
	if (collision(bullets[i],block3)){
		block3.remove();					
		bullets[i].remove();
		block3.setY(600);
		bullets[i].setY(600);
	}
}
	//bullets[i] border
	for(i=0;i<bullets.length;i++) {							
		if (bullets[i].getX()>=950) {
			bullets[i].setY(600);
		}
	}
	//bullets[i] move
	for(i=0; i<bullets.length; i++) {
		bullets[i].setX(bullets[i].getX() + 2);
	}
	
	//jump ability activator
	if(jump >= 1 && keyPressList[87]) {
		useJumpAbility = true;		
	}
	if(jump == 0) {
		useJumpAbility = false;
	}
	//faster coins ability activator
	if(faster >= 1 && keyPressList[69]) {
		useCoinAbility = true;		
	}
	if(faster == 0) {
		useCoinAbility = false;
	}
	//bullet ability activator
	if(bullet >= 1 && keyPressList[81]) {
		useBulletAbility = true;
	}
	if(bullet == 0) {
		useBulletAbility = false;
	}
	//coins timer
	if(coinTime >= 1) {
		coinTime = 0;
		coins += 1;
	}
	
	//collison with hero and onzichtbaren blocks.
	if(collision(hero, onzichtbaar_blok1)) {
		hero.setY(onzichtbaar_blok1.getY() - 10);
		hero.setX(hero.getX() + levelSnelheid);
		JTimer = 0;
	}
	if(collision(hero, onzichtbaar_blok2)) {
		hero.setY(onzichtbaar_blok2.getY() - 10);
		hero.setX(hero.getX() + levelSnelheid);
		JTimer = 0;
	}
	if(collision(hero, onzichtbaar_blok3)) {
		hero.setY(onzichtbaar_blok3.getY() - 10);
		hero.setX(hero.getX() + levelSnelheid);
		JTimer = 0;
	}

	//hero

	spikes.setX(spikes.getX()-levelSnelheid);			//spikes sidescroll

	//block 1, 2 and 3

	block1.setX(block1.getX()-levelSnelheid);			//block1 sidescroll
	block2.setX(block2.getX()-levelSnelheid);			//block2 sidescroll
	block3.setX(block3.getX()-levelSnelheid);			//block3 sidescroll

	
	//set onzichtbaar blokken on the X of normal blocks.
	onzichtbaar_blok1.setX(block1.getX());
	onzichtbaar_blok1.setY(block1.getY());
	onzichtbaar_blok2.setX(block2.getX());
	onzichtbaar_blok2.setY(block2.getY());
	onzichtbaar_blok3.setX(block3.getX());
	onzichtbaar_blok3.setY(block3.getY());

	//collision between all blocks. Will set blocks random again.
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
	//if blocks getX -200 they will reset.
	if(block1.getX() <= -200) {
		block1.setX(Math.floor((Math.random() * 1000) + 950));
		block1.setY(445);
		if(currentGameState == GAME_STATE_LEVEL) {
		gameObjectsLayer.add(block1);
	}
			if(block2.getX() >= block1.getX() +40) {
				block2.setX(block1.getX()+Math.floor((Math.random() * 100) + 50));
			}
	}
	if(block2.getX() <= -200) {
		block2.setX(Math.floor((Math.random() * 1400) + 1100));
		block2.setY(445);
		if(currentGameState == GAME_STATE_LEVEL) {
		gameObjectsLayer.add(block2);
	}
			if(block1.getX() >= block2.getX() +40) {
				block1.setX(block2.getX()+Math.floor((Math.random() * 100) + 50));
			}
	}
	if(block3.getX() <= -200) {
		if(currentGameState == GAME_STATE_LEVEL) {
		gameObjectsLayer.add(block3);
	}
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
	
	//collisions with hero and other gameobjects

	//if(collision(hero,spikes)){							//collison between hero and spikes
	
	//}
	if (collision(block1, hero)) {						//collison between block 1 and hero
		hero.setX(hero.getX()-levelSnelheid);
	}
	if (collision(block2, hero)) {						//collison between block 2 and hero
		hero.setX(hero.getX()-levelSnelheid);
	}
	
	//jump and gravity sysmtem

	if(keyPressList[32] && canJump == true && jumpTimer <= 0 && JTimer <= 0) {			//if this is all true you can jump
		canJump = false;
		jumpTimer = 10;
		keyPressList[32] = false;
	}	
	if(jumpTimer <= 0){  																//jumptimer canjump true
		canJump = true;
	}
	else {																				
		jumpTimer -= 1;
	}
	if(canJump == false) {																//move up if you jump
		hero.setY(hero.getY() -jumpSpeed);
	}
	else if(hero.getY() < collisionBorder) {											//move down if you jump
		JTimer += 1;
		hero.setY(hero.getY() + gravity);
	}
	else {
		JTimer = 0;
	}
	gameObjectsLayer.draw();
}
	

	  