var loadCount = 0;
var hero;
var enemies=[];

function init() {
    console.log("init called");        
    itemsToLoad = 3; // <-- verander dit in het aantal afbeeldingen er ingeladen moet worden

    //alle afbeeldingen volgen hier	

    //level preloads
    backgroundImage = preload('assets/background.png');
    heroImage = preload('assets/hero.png');
    spikesImage = preload('assets/spikes.png');
    blockImage = preload('assets/block.png');
    
    //menu preloads
    background_menuImage = preload('assets/background_menu.jpg');
    
    menu_arrowImage = preload('assets/menu_arrow.png');
    
    press_menuImage = preload('assets/press.png');
    
    menu_titleImage = preload('assets/menu_title.png');
    
    menu_startImage = preload('assets/menu_start.png');
    menu_start_2Image = preload('assets/menu_start2.png');
    
    menu_spaceImage = preload('assets/menu_space.png');
    
    menu_quitImage = preload('assets/menu_quit.png');
    menu_quit_2Image = preload('assets/menu_quit2.png');

    //end screen preloads
    end_backgroundImage = preload('assets/end_background.jpg');
    end_background2Image = preload('assets/end_background2.jpg');
    Game_overImage = preload('assets/GameOver.png');
    
    end_menuImage = preload('assets/end_menu.png');
    end_menu2Image = preload('assets/end_menu2.png');
    
    try_againImage = preload('assets/try_again.png');
    try_again2Image = preload('assets/try_again2.png');
    
    quit_gameImage = preload('assets/quit_game.png');
    quit_game2Image = preload('assets/quit_game2.png');
   
    shopImage = preload('assets/shop.png');
    shop2Image = preload('assets/shop2.png');

    //tutorial level
    youTutorialImage = preload('assets/you_tutorial.png');
    zinTutorialImage = preload('assets/zin_tutorial.png');
    zinTutorialImage = preload('assets/zin_tutorial.png');


    
    switchGameState(GAME_STATE_IDLE);
	
}

function preload(path){
        img = new Image();
        img.src = path;
        img.onload = itemLoaded;
        return img;
 }

 function itemLoaded(event) {
    //leave this function as it is
    console.log("itemLoaded called")

    loadCount++;
    console.log("loading:" + loadCount)

    if (loadCount >= itemsToLoad) {
        console.log("everything loaded...");
        makeKineticImages();
    }

}

function doNothing(){
  //do nothing
}

function makeKineticImages() {
   console.log( "makeKineticImages");

    // all images here! Even those you do not use in the start of the game

    background1 = new Kinetic.Image({X:0, Y:0, image: backgroundImage});
    background2 = new Kinetic.Image({X:1000, Y:0, image: backgroundImage});
    hero = new Kinetic.Image({X:100, Y:445, image: heroImage});
    spikes = new Kinetic.Image({X:900, Y:445, image: spikesImage});
    block1 = new Kinetic.Image({X:1200, Y:445, image: blockImage});
    block2 = new Kinetic.Image({X:1400, Y:445, image: blockImage});
    block3 = new Kinetic.Image({X:1400, Y:445, image: blockImage});
    background_menu = new Kinetic.Image({X:0, Y:0, image: background_menuImage});
    press = new Kinetic.Image({X:0, Y:0, image: press_menuImage});
    menu_title = new Kinetic.Image({X:5, Y:5, image: menu_titleImage});
    menu_start = new Kinetic.Image({X:5, Y:250, image: menu_startImage});
    menu_start_2 = new Kinetic.Image({X:5, Y:250, image: menu_start_2Image});
    menu_space = new Kinetic.Image({X:700, Y:430, image: menu_spaceImage});
    menu_quit = new Kinetic.Image({X:5, Y:350, image: menu_quitImage});
    menu_quit_2 = new Kinetic.Image({X:5, Y:350, image: menu_quit_2Image});
    
    end_background = new Kinetic.Image({X:0, Y:0, image: end_backgroundImage, opacity:0.3});
    end_background2 = new Kinetic.Image({X:0, Y:0, image: end_background2Image});
   
    try_again = new Kinetic.Image({X:10, Y:200, image: try_againImage});
    try_again2 = new Kinetic.Image({X:10, Y:200, image: try_again2Image});
   
    end_menu = new Kinetic.Image({X:10, Y:260, image: end_menuImage});
    end_menu2 = new Kinetic.Image({X:10, Y:260, image: end_menu2Image});
    
    shop = new Kinetic.Image({X:10, Y:320, image: shopImage});
    shop2 = new Kinetic.Image({X:10, Y:320, image: shop2Image});
    
    quit_game = new Kinetic.Image({X:10, Y:380, image: quit_gameImage});
    quit_game2 = new Kinetic.Image({X:10, Y:380, image: quit_game2Image});
    
    GameOver = new Kinetic.Image({X:170, Y:50, image: Game_overImage});
   

    menu_arrow = new Kinetic.Image({X:612, Y:460, image: menu_arrowImage});
    you_tutorial = new Kinetic.Image({X:160, Y:400, image: youTutorialImage});
    zin_tutorial = new Kinetic.Image({X:10, Y:10, image: zinTutorialImage});
    
      
    
    switchGameState(GAME_STATE_INIT_LEVEL_MENU);
}