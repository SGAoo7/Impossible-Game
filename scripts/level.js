//health variables
var heroLife = 1;

//level variables
var levelSnelheid = 2;

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
var showTime = new Kinetic.Text({x: 10,y: 10,text:'', fontSize: 20,fontFamily: 'Calibri', fill: 'black', });

//var level_backgroundSound = new Audio('assets/level_background.mp3');

// all the variables.

function start(){
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
	
	//level_backgroundSound.play();

	hero.offsetY(50);
	hero.setY(495);

	
	gameObjectsLayer.draw();
			
	switchGameState(GAME_STATE_LEVEL); 
}



function level() {
	gameLoop=setInterval(update,20);  
	//update();
	//20 is de 'wachttijd in milliseconden, de functie 'update' wordt om de 0.02 s aangeroepen.
	// Dit voorbeeld is dus 50 fps (mits de hardware het aankan)
	
}


function update() {

	if(pause == false) {
		levelSnelheid = 0;
		if(keyPressList[32]) {
			pause = true;
			zin_tutorial.remove();
			you_tutorial.remove();
		}
	}
	if(pause == true && heroLife == 1) {
		levelSnelheid = 2;
		time += 0.02;
		gameObjectsLayer.add(showTime);
		
	} 
	showTime.setText('You lived '+ parseInt(time) + ' seconds');
	//hero
	hero.setX(hero.getX() -1);
	 if(hero.getX() <= 0) {
	 	switchGameState(GAME_STATE_INIT_LEVEL_END);
	 	heroLife = 0;
	 }
	//spikes

	spikes.setX(spikes.getX()-levelSnelheid);			//spikes sidescroll

	//block 1, 2 and 3

	block1.setX(block1.getX()-levelSnelheid);			//block1 sidescroll
	block2.setX(block2.getX()-levelSnelheid);			//block2 sidescroll
	block3.setX(block3.getX()-levelSnelheid);			//block3 sidescroll

	if(collision(block1, block2)) {
		block1.setX(Math.floor((Math.random() * 1000) + 950));
		block2.setX(Math.floor((Math.random() * 1000) + 950));
	}
	if(collision(block1, block3)) {
		block1.setX(Math.floor((Math.random() * 1000) + 950));
		block3.setX(Math.floor((Math.random() * 1000) + 950));
	}
	if(collision(block2, block3)) {
		block2.setX(Math.floor((Math.random() * 1000) + 950));
		block3.setX(Math.floor((Math.random() * 1000) + 950));
	}
	if(block1.getX() <= -200) {
		block1.setX(Math.floor((Math.random() * 1000) + 950));
		block1.setY(Math.floor((Math.random() * 300) + 200));
	}
	if(block2.getX() <= -200) {
		block2.setX(Math.floor((Math.random() * 1000) + 950));
		block2.setY(Math.floor((Math.random() * 300) + 200));
	}
	if(block3.getX() <= -200) {
		block3.setX(Math.floor((Math.random() * 1000) + 950));
		block3.setY(Math.floor((Math.random() * 300) + 200));
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

	/*if(collision(hero,spikes)){							//collison between hero and spikes
		heroLife -=1;
	}
	if (collision(block1, hero)) {						//collison between block 1 and hero
		hero.setX(hero.getX()-2);
	}
	if (collision(block2, hero)) {						//collison between block 2 and hero
		hero.setX(hero.getX()-2);
	}*/

	//health

	
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
		heroInAir = true;
		hero.setY(hero.getY() + gravity);
	}
	else {
		JTimer = 0;
		heroInAir = false;
	}
	// if(heroInAir == true) {
	// 	jumpSpeed += gravity;
	// }

	blockCollision(block1.getX() + 70, block1.getY(), block1.getX() + 70, block1.getY());
	blockCollision(block2.getX() + 70, block2.getY(), block2.getX() + 70, block2.getY());
	blockCollision(block3.getX() + 70, block3.getY(), block3.getX() + 70, block3.getY());

	gameObjectsLayer.draw();
}

	function blockCollision(x1, y1, x2, y2){
		if (hero.getX() >= x1 && hero.getY() <= y1 && hero.getX() <= x2) {
			collisionHight = y1 -30;
		}


		if (hero.getX() >= x1 && hero.getY() <= y2 && hero.getY() >= y1 && hero.getX() <= x2) {
			hero.setY(y2 + 1);
			upTimer = 0;
		}

}
	

	  