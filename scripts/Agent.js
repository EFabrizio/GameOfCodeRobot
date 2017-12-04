define(['mozart', 'Behavior', 'Builder', 'Body'], function (mozart, behavior, Builder, Body) {
Behavior = behavior.B;

var agent = new Behavior(function(bodyPriv, bodyPubl){
<<<<<<< HEAD

||||||| merged common ancestors
=======
	var time = "var timer = document.getElementById('timer').value+3;";
>>>>>>> 0867aa511f0bc9a9f52e171527b7a82ead37267f
	if(!bodyPubl.isAgent()){return;}

	robotSprite = bodyPriv.getSprite("robot");
	gunSprite = bodyPriv.getSprite("gun");
	deadSprite = bodyPriv.getSprite("dead");
	winSprite = bodyPriv.getSprite("win");
	if(bodyPriv.properties.health < 1 || bodyPriv.properties.energy < 1 || timer == 0){
		robotSprite.hide(); gunSprite.hide();winSprite.hide(); deadSprite.show(); return;}
	if(bodyPriv.properties.win){robotSprite.hide(); gunSprite.hide(); deadSprite.hide();winSprite.show(); return;}
	if(bodyPriv.properties.nextMove){
		var options = bodyPriv.properties.nextMove.split(':');
		var turned = robotSprite.getInfo().fh?-1:1;// false: right, true: left
		var position = true;
			if(turned<0){gunSprite.setPos(-5,0);}else{gunSprite.setPos(5,0);}
		if(options[0] == "jump"){
			if(bodyPubl.onGround()){
				bodyPriv.k.ay = -15;
				bodyPriv.properties.energy -= 2;
			}
		}else if(options[0] == "move"){
			var amount = Number(options[1]);
			if(Math.abs(amount) > 20){amount = 20 * Math.sign(amount);}
			gunSprite.hide();
			robotSprite.show();

			if(turned < 0) {
				bodyPriv.k.ax = -amount;
			}else {
				bodyPriv.k.ax = amount;
			}
				bodyPriv.properties.energy -= Math.abs(amount)/10;
		}else if(options[0] == "gun"){
			gunSprite.show();
			robotSprite.hide();
			builder = bodyPriv.engine.priv.builder;
			builder.addToEngine(bodyPriv.engine.priv, "bullet",
				{x: bodyPriv.k.x + turned * 35, y:bodyPriv.k.y, vx: turned*10, t: engine.getTime()},[{r: Math.PI*(turned-1)/2}]);
		}else if(options[0] == "turn"){
			turned *= -1;

			robotSprite.fliph();
			deadSprite.fliph();
			gunSprite.fliph();
			if(turned<0){gunSprite.setPos(-5,0);}else{gunSprite.setPos(5,0);}
		}
	}
	bodyPriv.properties.nextMove = null;
	var hideGlobals = "var window=undefined;var engine=undefined;var effects=undefined;var collide=undefined;var context=undefined;";

	var logging = "outputDiv = document.getElementById('output'); console = {log: function(a){outputDiv.innerHTML += '<hr><b>&larr; ' + a + '</b>'; outputDiv.scrollTop = outputDiv.scrollHeight;}, error: function(a){outputDiv.innerHTML += '<hr><i>' + a + '</i>'; outputDiv.scrollTop = outputDiv.scrollHeight;}};";

				
	var scriptTail = "if(typeof(loop) == 'undefined'){loop = function(){}}; if(typeof(iniciar) == 'undefined'){init = function(){}}; return {init: iniciar, loop: loop};";
	if(typeof newcommand !== 'undefined' && newcommand !== ""){
		bodyPubl.command(newcommand);
		newcommand = "";
	}
	var g;
	if(typeof newcode !== 'undefined' && newcode){
		g = Function(hideGlobals + logging + editor.getValue() + scriptTail);
		g().init(bodyPubl)
		// emptyObj = {info: function(){return bodyPubl.info()}};
		// g().init(emptyObj)
		bodyPubl.step = g().loop
		newcode = false;
	}


			customProperties = [];
			customFunctions = [];
			var keys = Object.keys(bodyPubl);
			for(key of keys){
				if(key == 'step') continue;
				if(typeof(bodyPubl[key]) == 'function'){
					customFunctions.push(key);
				}else{
					customProperties.push({key: key, value: bodyPubl[key]})
				}
			}
			customPropertiesString = "";
			for(prop of customProperties){
				customPropertiesString += "<tr><td><b>" + prop.key + ": </b></td><td><b>" + prop.value + "</b></td></tr>";
			}
			customFunctionsString = "";
			for(prop of customFunctions){
				customFunctionsString += "<tr><td><b>" + prop + ": </b></td><td><b>[Function]</b></td></tr>";
			}

			vida.innerHTML = "<br><br><table>" +
			"<tr><td>energia: </td><td>" + (Math.round(bodyPriv.properties.energy * 10) / 10) + "</td></tr>" +
			"<tr><td>vida: </td><td>" + (Math.round(bodyPriv.properties.health * 10) / 10) + "</td></tr>" +
			"<tr><td>monedas: </td><td>" + bodyPriv.properties.coins + "</td></tr>" +
			"<tr><td>x: </td><td>" + (Math.round(bodyPriv.k.x * 10) / 10) + "</td></tr>" +
			"<tr><td>y: </td><td>" + (Math.round(bodyPriv.k.y * 10) / 10) + "</td></tr>" +

		"</table><br>"


});
return agent;
});
