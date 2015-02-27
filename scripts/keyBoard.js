 var keyPressList=[];

document.onkeydown = function(e){
	e=e?e:window.event;
	//console.log(e.keyCode + "down");
	keyPressList[e.keyCode] = true;
}

document.onkeyup = function(e){
	e=e?e:window.event;
	//console.log(e.keyCode + "up");
	keyPressList[e.keyCode] = false;
}