const GAME_STATE_IDLE = "idle";
const GAME_STATE_INIT = "init";
const GAME_STATE_INIT_LEVEL = "start_level"; 
const GAME_STATE_INIT_LEVEL_MENU = "start_menu"; 
const GAME_STATE_INIT_LEVEL_END = "start_end"; 
const GAME_STATE_LEVEL = "level_level";
const GAME_STATE_MENU = "level_menu";
const GAME_STATE_END = "level_end";

var currentGameState = 1;
var currentGameStateFunction = null;

function switchGameState(newState) {
    console.log("switchGameState to newState:" + newState);
    currentGameState = newState;
    switch (currentGameState) {
		  case GAME_STATE_IDLE:
            currentGameStateFunction = doNothing;
            break;
		 
		 case GAME_STATE_INIT:
            currentGameStateFunction = init;
            break;
 
        case GAME_STATE_INIT_LEVEL:
            currentGameStateFunction = start_level;
            break;
        
        case GAME_STATE_LEVEL:
            currentGameStateFunction = level_level;
            break;

        case GAME_STATE_INIT_LEVEL_MENU:
            currentGameStateFunction = start_menu;
            break;
	    
		case GAME_STATE_MENU:
            currentGameStateFunction = level_menu;
            break;

        case GAME_STATE_INIT_LEVEL_END:
            currentGameStateFunction = start_end;
            break;

        case GAME_STATE_END:
            currentGameStateFunction = level_end;
            break;
    }

	currentGameStateFunction();
}

