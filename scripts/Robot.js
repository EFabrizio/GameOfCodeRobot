define(['mozart', 'Body'], function (mozart, Body) {
var Robot = Body.subclass(function(prototype, _, _protected, __, __private) {
	prototype.init = function(options) {
		prototype.super.init.call(this, options);
	};

	prototype.getOpponentProperties = function(){
		return __(this).opponent.getK();
	};

	// nope:
	prototype.setOpponent = function(op){
		__(this).opponent = op;
	};

	prototype.step = function(){
		var _x = prototype.super.getX.call(this);
		var _op = prototype.super.getOpponentProperties.call(this);
		var towardopponent = (_op.x - _x) / Math.abs(_op.x - _x);

		if(Math.abs(_op.x - _x) > 200){
			_protected.super.move.call(this,towardopponent*5,0);
		}else{
		}
	}
	//prototype.getEnergy = function(){ return __(this).energy; };
	// ^ will need to call super properties energy
});


var RobotOne = Robot.subclass(function(prototype, _, _protected, __, __private) {
	prototype.init = function(options) {
		prototype.super.init.call(this, options);
	};

	prototype.info = function(){
		var p = _protected.super.super.getProperties.call(this);
		var k =  prototype.super.super.getK.call(this);
		k.energy = p.energy; k.health = p.health; k.coins = p.coins; k.nextMove = p.nextMove;
		return k;
	};

	prototype.wait = function(){
		_protected.super.super.setNextMove.call(this,null);
	};
	prototype.turn = function(){
		_protected.super.super.setNextMove.call(this,"turn");
	};
	prototype.gun = function(){
		_protected.super.super.setNextMove.call(this,"gun");
	};
	prototype.jump = function(){
		if(this.onGround()&&Math.abs(this.getK().vy)<1){
			_protected.super.super.setNextMove.call(this,"jump");
		}
	};
	prototype.move = function(dx){
		if(dx != Number(dx)){return;}
		_protected.super.super.setNextMove.call(this,"move:"+dx);
	};

	prototype.command = function(string){
		var hideGlobals = "var window=undefined;var engine=undefined;var effects=undefined;var collide=undefined;var context=undefined;";
		var stringFn = new Function("var robot = this;" + hideGlobals + "var return_output = " + string + "\nreturn return_output;");
		var outputDiv = document.getElementById("output");
		if(outputDiv.innerHTML === ""){
			outputDiv.innerHTML += "&rarr; " + string;
		}else{
			outputDiv.innerHTML += "<hr>&rarr; " + string;
		}
		try {
			var output = stringFn.call(this);
			if(output !== undefined){
				outputDiv.innerHTML += "<br><b>&larr; " + output + "</b>";
			}
		}
		catch(err) {
			outputDiv.innerHTML += "<br><i>" + err.name + ": " + err.message + "</i>";
		}
		outputDiv.scrollTop = outputDiv.scrollHeight;
	};

	prototype.step = function(robot){};

});



/*


var Robot = Body.subclass(function(prototype, _, _protected, __, __private) {
	prototype.init = function(x, y, img) {
		__(this).x = x;
		__(this).y = y;
		__(this).image = img;
		__(this).health = 100;
		__(this).energy = 100;
		__(this).coins = 0;
		elements.push(this);
		gravitatingObjects.push(this);
	};
	prototype.getX = function(){
		return __(this).x;
	};

	prototype.getOpponentProperties = function(){
		return {x: __(this).opponent.getX()};
	};

	prototype.setOpponent = function(op){
		__(this).opponent = op;
	};

	prototype.redraw = function(){
		context.drawImage(images[__(this).image], __(this).x, __(this).y, 30, 41);
	};

	_protected.move = function(dx,dy){
		__(this).x += dx;
		__(this).y += dy;
	};
});


var RobotOne = Robot.subclass(function(prototype, _, _protected, __, __private) {
	prototype.init = function(x, y, img) {
		prototype.super.init.call(this, x, y, img);
	};

	prototype.step = function(){
		var _x = prototype.super.getX.call(this);
		var _op = prototype.super.getOpponentProperties.call(this);
		var towardopponent = (_op.x - _x) / Math.abs(_op.x - _x);

		if(Math.abs(_op.x - _x) > 200){
			_protected.super.move.call(this,towardopponent*5,0);
		}else{
		}
	}
});
	*/


return {'Robot': Robot, 'RobotOne': RobotOne};
});
