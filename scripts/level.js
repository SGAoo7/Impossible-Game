//leven variables
var heroLife = 1;

//level snelheid variable
var levelSnelheid = 6;

//gravity en jump variables
var canJump = true;
var jumpSpeed = 10;
var JTimer = 0;
var jumpTimer = 0;
var gravity = 10;
var collisionBorder = 495;

//start var. als je op spatie drukt ga je uit de tutorial.
var pause = false;

//ability timers die van 30 to 0 tellen. En als die 0 zijn kan je niet meer je ability gebruiken.
var useAbilityTimerCoin = 30;
var useAbilityTimerBullet = 30;
var useAbilityTimerJump = 30;


//vars die zorgen dat je kan schieten.
var bulletTimer = 30;
var bulletShoot = false;

//echte timer in het level.
var time = 0;
//deze var geeft je geld en werkt samen met de time var.
var coinTime = 0;

//laat de tutorial zien.
var showTime = new Kinetic.Text({x: 10,y: 10,text:'', fontSize: 20,fontFamily: 'Calibri', fill: 'black', });
var shopShow = new Kinetic.Text({x: 650,y: 10,text:'', fontSize: 20,fontFamily: 'Calibri', fill: 'black', });
var koopShow = new Kinetic.Text({x: 540,y: 40,text:'', fontSize: 20,fontFamily: 'Calibri', fill: 'black', });
//laat de tutorial zien van de abilities. Als je die gekocht hebt, anders zie je ze niet.
var bulletAbilityShow = new Kinetic.Text({x: 400,y: 470,text:'', fontSize: 20,fontFamily: 'Calibri', fill: 'black', });
var jumpAbilityShow = new Kinetic.Text({x: 400,y: 440,text:'', fontSize: 20,fontFamily: 'Calibri', fill: 'black', });
var coinAbilityShow = new Kinetic.Text({x: 400,y: 410,text:'', fontSize: 20,fontFamily: 'Calibri', fill: 'black', });
//bullet array
var bullets = [];
//var die zorgt dat het script niet versneld wordt als je terug gaat van een ander script naar dit script.
var levelSpeed = false;

//sounds
var level_backgroundSound = new Audio('assets/audio/level_background.mp3');
var explosion = new Audio('assets/audio/explosion.wav');
var shootAudio = new Audio('assets/audio/shoot.wav');

function start_level(){
	// alle plaatjes in het level plaatsen, beginposities.
	
	gameObjectsLayer.removeChildren();

	//backgrounds
	gameObjectsLayer.add(background1);
	gameObjectsLayer.add(background2);
	
	//hero
	gameObjectsLayer.add(hero);

	//block 1, 2 en 3
	gameObjectsLayer.add(block1);
	gameObjectsLayer.add(block2);	
	gameObjectsLayer.add(block3);	
	
	//tutorial
	gameObjectsLayer.add(you_tutorial);	
	gameObjectsLayer.add(zin_tutorial);	
	gameObjectsLayer.add(shopShow);
	gameObjectsLayer.add(koopShow);
	
	//onzichtbaar block
	gameObjectsLayer.add(onzichtbaar_blok1);
	gameObjectsLayer.add(onzichtbaar_blok2);
	gameObjectsLayer.add(onzichtbaar_blok3);

	
	
	//reset alle gameobject als je terug switcht van een ander script naar dit script.
	hero.offsetY(50);
	hero.setY(495);
	hero.setX(100);
	background1.setX(0);
	background2.setX(1000);
	block1.setX(1200);
	block2.setX(1900);
	block3.setX(2400);
	
	gameObjectsLayer.draw();
			
	switchGameState(GAME_STATE_LEVEL); 
}



function level_level() {
	//zorgt ervoor dat je game niet versneldt. als je van terug switch van een ander script naar dit script.
	if(levelSpeed == false) {
	gameLoop=setInterval(update_level,20);  
	levelSpeed = true;
}
	//update();
	//20 is de 'wachttijd in milliseconden, de functie 'update' wordt om de 0.02 s aangeroepen.
	// Dit voorbeeld is dus 50 fps (mits de hardware het aankan)
}


function update_level() {

	//volume van audio regelen
	level_backgroundSound.volume = 0.2;
	explosion.volume = 0.5;

	//display alle images
	shopShow.setText('*You can buy things in the shop*');
	koopShow.setText('*For every 15 seconds you live you get 1 coin*');
	bulletAbilityShow.setText('When you play the game, press "q" and then enter to shoot.');
	jumpAbilityShow.setText('When you play the game, press "w" and you will jump higher.');
	coinAbilityShow.setText('When you play the game, press "e" and you will get more money.');
	showTime.setText('You lived '+ parseInt(time) + ' seconds');

	//if statement als je doodgaat. je gaat dood als je tegen de x=0 komt.
	if(currentGameState == GAME_STATE_LEVEL) {
		if(hero.getX() <= 0) {
			heroLife = 0;
			level_backgroundSound.pause();
			playGameOverSound = true;
			level_backgroundSound.currentTime = 0;	
			switchGameState(GAME_STATE_INIT_LEVEL_END);
		}
	}
	//als je een ability gekocht hebt zie je de tutorial ervan.
	if(bullet >= 1 && pause == false) {
		gameObjectsLayer.add(bulletAbilityShow);
	}  
	if(jump >= 1 && pause == false) {
		gameObjectsLayer.add(jumpAbilityShow);
	}
	if(faster >= 1 && pause == false) {
		gameObjectsLayer.add(coinAbilityShow);
	}
 	//start als je spatie drukt
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
	//dit grote systeem hieronder geeft eigenglijk aan dat je als je je ability geactiveerd hebt, 
	//dat er dan een timer gaat aflopen die zorgt hoelang je de ability kan gebruiken.
	// Als je dood gaat kan je je abilty ook niet meer gebruiken alleen dat staat in een ander script.
	//daarna wordt wat de ability ook is geactiveerd en wordt natuurlijk ook op een moment gedeactiveerd. 
	//timer en level play
	if(pause == true && heroLife == 1) {
		levelSnelheid = 6;
		level_backgroundSound.play();
		time += 0.02;
		coinTime += 0.02;
		gameObjectsLayer.add(showTime);
			//gebruik coin ability voor 30 seconden
			if(useCoinAbility == true) {
				useAbilityTimerCoin -= 0.02;
				coinTime += 0.04;
				if(useAbilityTimerCoin <= 0) {
					coinTime += 0.02;
					useCoinAbility = false;
					useAbilityTimerCoin = 30;
					faster --;
				}
			}
			//gebruik jump ability voor 30 seconden
			if(useJumpAbility == true) {
				useAbilityTimerJump -= 0.02;
				jumpSpeed = 20
				if(useAbilityTimerJump <= 0) {
					jumpSpeed = 10;
					useJumpAbility = false;
					useAbilityTimerJump = 30;
					jump --;
				}
			}
			//gebruik bullet ability voor 30 seconden en maak bullets aan.
			if(useBulletAbility == true) {
				useAbilityTimerBullet -= 0.02;
				if(keyPressList[13] && bulletShoot == true) {
					bulletTimer = 30;
					bulletShoot = false;
					shootAudio.play();
					bullets.push(new Kinetic.Image({x:hero.getX() + 50, Y:hero.getY() - 30, image:bulletImage}))
					if(useAbilityTimerBullet <= 0) {
						useBulletAbility = false;
						useAbilityTimerBullet = 30;
						bullet --;
					}
					for(i=0; i<bullets.length; i++) {
							gameObjectsLayer.add(bullets[i]);
					}
				}
			}	
	}
	//timer zodat je niet achter elkaar kan schieten.
	if(bulletTimer > 0) {
		bulletTimer -=1;
		if(bulletTimer == 0) {
			bulletShoot = true;
		}
	}
	//collision met bullet[i] en de verschillende blokken.
	for (i=0;i<bullets.length;i++) {
	if (collision(bullets[i],block1)){
		block1.remove();
		explosion.play();
		onzichtbaar_blok1.setY(600);					
		bullets[i].remove();
		block1.setY(600);
		bullets[i].setY(600);
	}
}
	for (i=0;i<bullets.length;i++) {
	if (collision(bullets[i],block2)){
		block2.remove();					
		bullets[i].remove();
		explosion.play();
		onzichtbaar_blok2.setY(600);	
		block2.setY(600);
		bullets[i].setY(600);
	}
}
	for (i=0;i<bullets.length;i++) {
	if (collision(bullets[i],block3)){
		block3.remove();	
		explosion.play();				
		bullets[i].remove();
		block3.setY(600);
		onzichtbaar_blok3.setY(600);	
		bullets[i].setY(600);
	}
}
	//bullets[i] border
	for(i=0;i<bullets.length;i++) {							
		if (bullets[i].getX()>=950) {
			bullets[i].setY(600);
		}
	}
	//bullets[i] bewegen
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
	//coins timer. als je cointime 15 is krijg je een coin.
	if(coinTime >= 15) {
		coinTime = 0;
		coins += 1;
	}
	
	//collison met hero en de verschillende blokken, en ik heb hier een systeem gemaakt waardoor je kan springen als je op een blok staat.
	if(collision(hero, onzichtbaar_blok1)) {
		hero.setY(onzichtbaar_blok1.getY() - 10);
		hero.setX(hero.getX() + levelSnelheid);
		if(keyPressList[32]) {
			hero.setY(hero.getY() - 50);	
			JTimer = 0;
			jumpTimer = 0;
			canJump = true;		
			}
		
	}
	if(collision(hero, onzichtbaar_blok2)) {
		hero.setY(onzichtbaar_blok2.getY() - 10);
		hero.setX(hero.getX() + levelSnelheid);
		if(keyPressList[32]) {
		hero.setY(hero.getY() - 50);	
		JTimer = 0;
		jumpTimer = 0;	
		canJump = true;
		}
		
	}
	if(collision(hero, onzichtbaar_blok3)) {
		hero.setY(onzichtbaar_blok3.getY() - 10);
		hero.setX(hero.getX() + levelSnelheid);
		if(keyPressList[32]) {
		hero.setY(hero.getY() - 50);	
		JTimer = 0;
		jumpTimer = 0;	
		canJump = true;
		}

	}

	//block 1, 2 and 3

	block1.setX(block1.getX()-levelSnelheid);			//block1 sidescroll
	block2.setX(block2.getX()-levelSnelheid);			//block2 sidescroll
	block3.setX(block3.getX()-levelSnelheid);			//block3 sidescroll

	
	//zet de onzichtbare blokken op de bovenkant van de gewone blokken. Zodat je als je op de onzichtbare blokken komt je over de gewone blokkenn heen kan.
	onzichtbaar_blok1.setX(block1.getX());
	onzichtbaar_blok1.setY(block1.getY());
	onzichtbaar_blok2.setX(block2.getX());
	onzichtbaar_blok2.setY(block2.getY());
	onzichtbaar_blok3.setX(block3.getX());
	onzichtbaar_blok3.setY(block3.getY());

	//collision met alle blokken. Dan zet hij alle blokken weer op een random locatie.
	if(collision(block1, block2)) {
		block1.setX(Math.floor((Math.random() * 50) + 950));
		block1.setY(445)
	}
	if(collision(block1, block3)) {
		block1.setX(Math.floor((Math.random() * 300) + 1100));
		block1.setY(445);
	}
	if(collision(block2, block3)) {
		block3.setX(Math.floor((Math.random() * 200) + 1400));
		block3.setY(Math.floor((Math.random() * 50) + 300));
	}
	//als de blokken getX -200 is. Worden ze op een andere random locatie gezet.
	//als ze in elkaar of dicht bij elkaar zijn worden ze gereset.
	//block 1 en 2 zijn altijd op de grond en blok 3 zweeft altijd in de lucht.
	if(block1.getX() <= -200) {
		block1.setX(Math.floor((Math.random() * 50) + 950));
		block1.setY(445);
		if(currentGameState == GAME_STATE_LEVEL) {
		gameObjectsLayer.add(block1);
		}
		if(block2.getX() >= block1.getX() +40) {
			block2.setX(block1.getX()+Math.floor((Math.random() * 50) + 1000));
		}
	}
	if(block2.getX() <= -200) {
		block2.setX(Math.floor((Math.random() * 300) + 1100));
		block2.setY(445);
		if(currentGameState == GAME_STATE_LEVEL) {
		gameObjectsLayer.add(block2);
		}
		if(block1.getX() >= block2.getX() +40) {
			block1.setX(block2.getX()+Math.floor((Math.random() * 50) + 1000));
		}
	}
	//bij block 3 wordt alleen de y ass gereset als hij collision heeft met block 1 en 2.
	//dit is omdat block 3 alleen in de lucht zweeft.
	if(block3.getX() <= -200) {
		block3.setX(Math.floor((Math.random() * 200) + 1400));
		block3.setY(Math.floor((Math.random() * 50) + 300));
		if(currentGameState == GAME_STATE_LEVEL) {
		gameObjectsLayer.add(block3);
		}
		if(block3.getY() >= block2.getY() +20) {
			block3.setY(block2.getY()+Math.floor((Math.random() * 50) + 300));
		}
		if(block3.getY() >= block1.getY() +20) {
			block3.setY(block1.getY()+Math.floor((Math.random() * 50) + 300));
		}
		
	}

	//backgrounds

	background1.setX(background1.getX()-levelSnelheid); //background 1 sidescroll
	background2.setX(background2.getX()-levelSnelheid); //background 2 sidescroll

	if(background1.getX() <= -1000) {					//background 1 naar setX 1000
		background1.setX(background2.getX()+1000);
	}
	if(background2.getX() <= -1000) {					//background 2 naar setX 1000
		background2.setX(background1.getX()+1000);
	}
	
	//collisions met hero en blokken
	if (collision(block1, hero)) {						//collison met block 1 en hero
		hero.setX(hero.getX()-levelSnelheid);
	}
	if (collision(block2, hero)) {						//collison met block 2 en hero
		hero.setX(hero.getX()-levelSnelheid);
	}
	if (collision(block3, hero)) {						//collison met block 2 en hero
		hero.setX(hero.getX()-levelSnelheid);
	}
	
	//jump en gravity sysmtem

	if(keyPressList[32] && canJump == true && jumpTimer <= 0 && JTimer <= 0) {			//als dit allemaal waar is kan je springen.
		canJump = false;
		jumpTimer = 14;
		keyPressList[32] = false;
	}	
	if(jumpTimer <= 0){  																//jumptimer canjump true
		canJump = true;
	}
	else {																				
		jumpTimer -= 1;
	}
	if(canJump == false) {																//ga naar boven als je springt.
		hero.setY(hero.getY() -jumpSpeed);
	}
	else if(hero.getY() < collisionBorder) {											//ga naar beneden als je in de lucht bent.
		JTimer += 1;
		hero.setY(hero.getY() + gravity);
	 }
	else {
		JTimer = 0;
	}
	gameObjectsLayer.draw();
}