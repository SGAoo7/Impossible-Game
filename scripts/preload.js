var loadCount = 0;
var hero;
var enemies=[];

function init() {
    console.log("init called");        
    itemsToLoad = 42; // <-- verander dit in het aantal afbeeldingen er ingeladen moet worden

    //alle afbeeldingen volgen hier	

    //level preloads
    backgroundImage = preload('assets/level/background.png');
    heroImage = preload('assets/level/hero.png');
    blockImage = preload('assets/level/block.png');
    onzichtbaarBlokImage = preload('assets/level/onzichtbaar_blok.png');
    bulletImage = preload('assets/level/bullet.png');

    
    //menu preloads
    background_menuImage = preload('assets/menu/background_menu.jpg');
    menu_arrowImage = preload('assets/menu/menu_arrow.png');
    press_menuImage = preload('assets/menu/press.png');
    menu_titleImage = preload('assets/menu/menu_title.png');
    menu_startImage = preload('assets/menu/menu_start.png');
    menu_start_2Image = preload('assets/menu/menu_start2.png');
    menu_spaceImage = preload('assets/menu/menu_space.png');
    menu_quitImage = preload('assets/menu/menu_quit.png');
    menu_quit_2Image = preload('assets/menu/menu_quit2.png');

    //end screen preloads
    end_backgroundImage = preload('assets/endScreen/end_background.jpg');
    end_background2Image = preload('assets/endScreen/end_background2.jpg');
    Game_overImage = preload('assets/endScreen/GameOver.png');
    end_menuImage = preload('assets/endScreen/end_menu.png');
    end_menu2Image = preload('assets/endScreen/end_menu2.png');
    try_againImage = preload('assets/endScreen/try_again.png');
    try_again2Image = preload('assets/endScreen/try_again2.png');
    quit_gameImage = preload('assets/endScreen/quit_game.png');
    quit_game2Image = preload('assets/endScreen/quit_game2.png');
    shopImage = preload('assets/endScreen/shop.png');
    shop2Image = preload('assets/endScreen/shop2.png');

    //tutorial preloads
    youTutorialImage = preload('assets/level/you_tutorial.png');
    zinTutorialImage = preload('assets/level/zin_tutorial.png');

    //shop preloads
    shop_backgroundImage = preload('assets/shop/shop_background.png');
    shop_escapeImage = preload('assets/shop/shop_escape.png');
    shop_shopImage = preload('assets/shop/shop_shop.png');
    shop_bulletsImage = preload('assets/shop/shop_bullets.png');
    shop_jumpImage = preload('assets/shop/shop_jump.png');
    shop_coinImage = preload('assets/shop/shop_coin.png');
    shop_enterImage = preload('assets/shop/shop_enter.png');
    shop_moneyImage = preload('assets/shop/shop_money.png');
    shop_abilitiesImage = preload('assets/shop/shop_abilities.png');
    costs_bulletsImage = preload('assets/shop/cost_bullets.png');
    costs_jumpImage = preload('assets/shop/cost_jump.png');
    costs_coinImage = preload('assets/shop/cost_coin.png');
    
    //deze preloads staan voor het aantal abilities die je hebt in de shop.
    bullet_lolImage = preload('assets/shop/bullet_lol.png');
    jump_lolImage = preload('assets/shop/jump_lol.png');
    coin_lolImage = preload('assets/shop/coin_lol.png');
     
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

    //makeImages level
    background1 = new Kinetic.Image({X:0, Y:0, image: backgroundImage});
    background2 = new Kinetic.Image({X:1000, Y:0, image: backgroundImage});
    hero = new Kinetic.Image({X:100, Y:445, image: heroImage});
    block1 = new Kinetic.Image({X:1500, Y:445, image: blockImage});
    block2 = new Kinetic.Image({X:2000, Y:445, image: blockImage});
    block3 = new Kinetic.Image({X:1400, Y:445, image: blockImage});
    onzichtbaar_blok1 = new Kinetic.Image({X:-10, Y:-10, image: onzichtbaarBlokImage});
    onzichtbaar_blok2 = new Kinetic.Image({X:-10, Y:-10, image: onzichtbaarBlokImage});
    onzichtbaar_blok3 = new Kinetic.Image({X:-10, Y:-10, image: onzichtbaarBlokImage});

    //makeImages menu
    background_menu = new Kinetic.Image({X:0, Y:0, image: background_menuImage});
    press = new Kinetic.Image({X:0, Y:0, image: press_menuImage});
    menu_title = new Kinetic.Image({X:5, Y:5, image: menu_titleImage});
    menu_start = new Kinetic.Image({X:5, Y:250, image: menu_startImage});
    menu_start_2 = new Kinetic.Image({X:5, Y:250, image: menu_start_2Image});
    menu_space = new Kinetic.Image({X:705, Y:430, image: menu_spaceImage});
    menu_quit = new Kinetic.Image({X:5, Y:350, image: menu_quitImage});
    menu_quit_2 = new Kinetic.Image({X:5, Y:350, image: menu_quit_2Image});
    
    //makeImages end screen
    end_background = new Kinetic.Image({X:0, Y:0, image: end_backgroundImage, opacity:0.3});
    end_background2 = new Kinetic.Image({X:0, Y:0, image: end_background2Image});
    try_again = new Kinetic.Image({X:14, Y:200, image: try_againImage});
    try_again2 = new Kinetic.Image({X:14, Y:200, image: try_again2Image});
    end_menu = new Kinetic.Image({X:14, Y:260, image: end_menuImage});
    end_menu2 = new Kinetic.Image({X:14, Y:260, image: end_menu2Image});
    shop = new Kinetic.Image({X:14, Y:320, image: shopImage});
    shop2 = new Kinetic.Image({X:14, Y:320, image: shop2Image});
    quit_game = new Kinetic.Image({X:14, Y:380, image: quit_gameImage});
    quit_game2 = new Kinetic.Image({X:14, Y:380, image: quit_game2Image});
    GameOver = new Kinetic.Image({X:170, Y:50, image: Game_overImage});
    menu_arrow = new Kinetic.Image({X:612, Y:460, image: menu_arrowImage});
    
    //makeImages tutorial
    you_tutorial = new Kinetic.Image({X:160, Y:400, image: youTutorialImage});
    zin_tutorial = new Kinetic.Image({X:10, Y:10, image: zinTutorialImage});
    
    //makeImages shop screen
    shop_background = new Kinetic.Image({X: -7, Y:0, image: shop_backgroundImage});
    shop_escape = new Kinetic.Image({X: 30, Y:455, image: shop_escapeImage, opacity: 1});
    shop_shop = new Kinetic.Image({X: 40, Y:25, image: shop_shopImage, opacity: 1});
    shop_bullets = new Kinetic.Image({X: 270, Y:20, image: shop_bulletsImage, opacity: 0.5});
    shop_jump = new Kinetic.Image({X: 485, Y:20, image: shop_jumpImage, opacity: 0.5});
    shop_coin = new Kinetic.Image({X: 700, Y:20, image: shop_coinImage, opacity: 0.5});
    shop_arrow = new Kinetic.Image({X:320, Y:455, image: menu_arrowImage});
    shop_enter = new Kinetic.Image({X:700, Y:455, image: shop_enterImage, opacity: 0.6});
    cost_bullets = new Kinetic.Image({X:310, Y:380, image: costs_bulletsImage, opacity: 0.6});
    cost_jump = new Kinetic.Image({X: 520, Y:380, image: costs_jumpImage, opacity: 0.6});
    cost_coin = new Kinetic.Image({X: 730, Y:380, image: costs_coinImage, opacity: 0.6});
    shop_money = new Kinetic.Image({X: 40, Y:120, image: shop_moneyImage});
    bullet_lol = new Kinetic.Image({X: 40, Y:250, image: bullet_lolImage});
    jump_lol = new Kinetic.Image({X: 40, Y:290, image: jump_lolImage});
    coin_lol = new Kinetic.Image({X: 40, Y:330, image: coin_lolImage});
    shop_abilities = new Kinetic.Image({X: 70, Y:200, image: shop_abilitiesImage});
   
    switchGameState(GAME_STATE_INIT_LEVEL_MENU);
}