var menu = document.getElementById("menu");
var play = document.getElementById("play");


var prevlevelButton = document.getElementById("prevlevel");
var levelButton = document.getElementById("level");
var startButton = document.getElementById("start");

var level = 1;



var saveCode = function(level, code)
{
	if(!localStorage)
	{
		return false;
	}
	localStorage['js_robot_level_' + level] = code;
};

var getCode = function(level)
{
	var code = localStorage['js_robot_level_' + level];
	return code?code:'';
};



var maxLevels = 1;
var levels;
var agent;
requirejs.config({
    baseUrl: 'scripts',
});

requirejs(['mozart', '../data/levels'],
  function (mozart, levelData) {

		levels = (new levelData()).levels;

    maxLevels = levels.length;

	menu.style.display = "block";

	if(location.hash.length > 0){
		if(!isNaN(location.hash.slice(7,8))){
			level = Number(location.hash.slice(7,8));
			if(level <= maxLevels){
				code = getCode(level);
				startGame(level, code);
				menu.style.display = "none";
			}
		}
	}
});

prevlevelButton.onclick = function(){
	level = Math.max(1, level - 1);
	levelButton.innerHTML = "Level " + level;
};

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

levelButton.onclick = function(){
	level = Math.min(maxLevels, level + 1);
	levelButton.innerHTML = "Level " + level;
};

function startGame(level, code){
	menu.style.display = "none";
	play.style.display = "inherit";
	startLevel(level);
  if(code !== undefined && code !== ''){
    editor.setValue(code);
    openCodeDiv();
  }
}

startButton.onclick = function(){
	startGame(level, '');
	location.hash = "level=" + level;
};






var backtomenu = document.getElementById("backtomenu");
var nextlevel = document.getElementById("nextlevel");
var restartlevel = document.getElementById("restartlevel");
var submit = document.getElementById("submitCode");
var code = document.getElementById("code");
var codeDiv = document.getElementById("codeDiv");
var command = document.getElementById("command");
var commandDiv = document.getElementById("commandDiv");
var buttonbar = document.getElementById("buttonbar");

var codeBtn = document.getElementById("codeBtn");

var vida = document.getElementById("vida");

var timerElement = document.getElementById("timer");

var minmaxBtn = document.getElementById("minmax");
var lineheight = document.getElementById("lineheight");
var codearea = document.getElementById("codearea");

var newcode = false;
var newcommand = "";

var timer = 300, minutes, seconds;

var x = setInterval(function() {

        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        timerElement.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = 0;
        }

},1000);





backtomenu.onclick = function(){
	location.hash = "";
	location.reload();
};

nextlevel.onclick = function(){
	level = Math.min(maxLevels, level + 1);
	location.hash = "Nivel=" + level;
	location.reload();
};

restartlevel.onclick = function(){
	location.hash = "Nivel=" + level;
	saveCode(level, editor.getValue());
	location.reload();
};

function applyScript(){
	document.getElementsByClassName('CodeMirror')[0].classList.add('execute');
	setTimeout(function(){document.getElementsByClassName('CodeMirror')[0].classList.remove('execute');}, 80);
	newcode = true;
}

submit.onclick = function(){
	saveCode(level, editor.getValue());
	applyScript();
};

var commandLog = [];
var commandIndex = 0;

command.onkeydown = function(e) {
    if(e.keyCode === 13) {
		newcommand = command.value;
		commandLog.push(command.value);
		commandIndex = 0;
		command.classList.add('execute');
		setTimeout(function(){command.classList.remove('execute');}, 80);
		e.preventDefault();
	}else if(e.keyCode === 38 && commandLog.length -1 > commandIndex) {
		commandIndex++;
		command.value = commandLog[commandLog.length - 1 - commandIndex];
		e.preventDefault();
	}else if(e.keyCode === 40 && commandIndex > 0) {
		commandIndex--;
		command.value = commandLog[commandLog.length - 1 - commandIndex];
		e.preventDefault();
	}
};
code.onkeydown = function(e) {
    if(e.keyCode === 9) {
        var start = this.selectionStart;
        var end = this.selectionEnd;
		var value = this.value;
        this.value = (value.substring(0, start) + "\t" + value.substring(end));
        this.selectionStart = this.selectionEnd = start + 1;
        e.preventDefault();
    }
};

function openCommandDiv(){
	commandDiv.style.display = "block";

	codeDiv.style.display = "none";

	codeBtn.className = "";

	commandBtn.className = "selected";
	minmaxBtn.innerHTML = "<a>_</a>";
	buttonbar.classList.remove("minimized");
	command.focus();
}
function openCodeDiv(){
	codeDiv.style.display = "block";

	commandDiv.style.display = "none";



	codeBtn.className = "selected";
	minmaxBtn.innerHTML = "<a>_</a>";
	buttonbar.classList.remove("minimized");
}

var oldCodeareaHeight = 0;
function minimize(){
	buttonbar.classList.add("minimized");
	codeDiv.style.display = "none";

	commandDiv.style.display = "none";
	minmaxBtn.innerHTML = "<a>&#11027;</a>";
  oldCodeareaHeight = codearea.style.height;
  codearea.style.height = 35;
}
function maximize(){
   codearea.style.height = oldCodeareaHeight;
	buttonbar.classList.remove("minimized");
	 if(codeBtn.className == "selected"){
		openCodeDiv();
	}
}



codeBtn.onclick = function(){
	openCodeDiv();
	if(codearea.style.height == '35px'){
		maximize();
	}
};
minmaxBtn.onclick = function(){
	if(codeDiv.style.display == "none" &&
			commandDiv.style.display == "none")
	{
		maximize();
	}else{
		minimize();
	}
};

var dragy = 0;
var dragging = false;
buttonbar.onmousedown = function(e){
  if(codearea.style.height != '35px'){
  	dragy = e.clientY;
  	dragging = true;
  }
};

onmouseup = function(e){
	dragging = false;
	buttonbar.style.cursor = "default";
};

onmousemove = function(e){
	if(dragging){
		buttonbar.style.cursor = "ns-resize";
		var height = Number(codearea.style.height.replace("px",""));
		var newheight = height + dragy - e.clientY;
		if(newheight < 104){newheight = 104;}
		codearea.style.height = newheight;
		dragy = e.clientY;
  }
};


onkeydown = function(e) {
    if(e.metaKey || e.ctrlKey) {
    	if(e.keyCode == 13) {
			applyScript();
		}else if(e.keyCode == 37) {

      return false;
		}else if(e.keyCode == 38) {
			maximize();
      return false;
		}else if(e.keyCode == 39) {
			if(codeBtn.classList.contains("selected")){
				openCommandDiv();
			}
      return false;
		}else if(e.keyCode == 40) {
			minimize();
      return false;
		}
	}
};

