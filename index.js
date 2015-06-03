ThunderConnector = require('thunder-connector');
var keypress = require('keypress')
, tty = require('tty');

ThunderConnector.connect();

function mycallback(){
	console.log('return');
	return "finished";
}

exports.turnLeftDegrees = function turnLeftDegrees(degrees){
	degrees = degrees || 10;
	stopTime = Math.floor(degrees * 22.3);
	//console.log(stopTime);
	setTimeout(function(){ThunderConnector.command('left');},0);
	setTimeout(function(){ThunderConnector.command('stop');},stopTime);
	//setTimeout(mycallback,stopTime);
}

exports.turnRightDegrees = function turnRightDegrees(degrees){
	degrees = degrees || 10;
	stopTime = Math.floor(degrees * 22.3);
	//console.log(stopTime);
	setTimeout(function(){ThunderConnector.command('right');},0);
	setTimeout(function(){ThunderConnector.command('stop');},stopTime);
	//setTimeout(mycallback,stopTime);
}

exports.up = function up(degrees){
	degrees = degrees || 10;
	stopTime = Math.floor(degrees * 22.3);
	setTimeout(function(){ThunderConnector.command('up');},0);
	setTimeout(function(){ThunderConnector.command('stop');},stopTime);
}

exports.down = function down(degrees){
	degrees = degrees || 10;
	stopTime = Math.floor(degrees * 22.3);
	setTimeout(function(){ThunderConnector.command('down');},0);
	setTimeout(function(){ThunderConnector.command('stop');},stopTime);
}

exports.fire = function fire(){
	setTimeout(function(){ThunderConnector.command('fire');},0);
}

exports.keycontrol = function keycontrol(){
	keypress(process.stdin);
	function turnUpDegrees(degrees){
		stopTime = Math.floor(degrees * 22.3)
		setTimeout(function(){ThunderConnector.command('up');},0);
		setTimeout(function(){ThunderConnector.command('stop');},stopTime);
	}
	function turnLeftDegrees(degrees){
		stopTime = Math.floor(degrees * 22.3)
		setTimeout(function(){ThunderConnector.command('left');},0);
		setTimeout(function(){ThunderConnector.command('stop');},stopTime);
	}
	function turnDownDegrees(degrees){
		stopTime = Math.floor(degrees * 22.3)
		setTimeout(function(){ThunderConnector.command('down');},0);
		setTimeout(function(){ThunderConnector.command('stop');},stopTime);
	}
	function turnRightDegrees(degrees){
		stopTime = Math.floor(degrees * 22.3)
		setTimeout(function(){ThunderConnector.command('right');},0);
		setTimeout(function(){ThunderConnector.command('stop');},stopTime);
	}
// listen for the "keypress" event
process.stdin.on('keypress', function (ch, key) {
	console.log('got "keypress"', key);
	if (key.name == "w") {
		turnUpDegrees(2.3);
    // if (key.name == "shift" && key.name == "w")
    // {
    //   turnUpDegrees(1);
    // }
}
if (key.name == "a") {
	turnLeftDegrees(2.3);
}
if (key.name == "s") {
	turnDownDegrees(2.3);
}
if (key.name == "d") {
	turnRightDegrees(2.3);
}

if (key.name == "f") {
    // console.log("Fire");
    setTimeout(function(){ThunderConnector.command('fire');},0);
    setTimeout(function(){ThunderConnector.command('stop');},10000);
}
if (key && key.ctrl && key.name == 'c') {
	process.stdin.pause();
}
});

if (typeof process.stdin.setRawMode == 'function') {
	process.stdin.setRawMode(true);
} else {
	tty.setRawMode(true);
}
process.stdin.resume();

}