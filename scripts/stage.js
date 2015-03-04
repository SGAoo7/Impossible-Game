// via deze functie kunnen we alle gameobjecten toevoegen aan het canvas.
//var backgroundLayer = new Kinetic.Layer();
var	gameObjectsLayer = new Kinetic.Layer();

window.onload = function () {

	var stage = new Kinetic.Stage({
	    container: "container",
	    width: 950,
	    height: 500
	});

	//stage.add(backgroundLayer);
	stage.add(gameObjectsLayer);
}