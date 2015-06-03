var irobot = require('irobot');
var robot = new irobot.Robot('/dev/ttyUSB0',{baudrate: 115200});
//var robot = new irobot.Robot('/dev/ttyO0');
robot.on('ready', function () {
  console.log('READY');
});

var speed = 50;

ThunderConnector = require('thunder-connector');
console.log(ThunderConnector);
ThunderConnector.connect();
missile = require("./index");
//ThunderConnector.command('fire');
//ThunderConnector.command('down');
//setTimeout(function(){ThunderConnector.command('fire');},500);
// setTimeout(function(){ThunderConnector.command('right');},100);
// setTimeout(function(){ThunderConnector.command('left');},1500);

// setTimeout(function(){ThunderConnector.command('up');},2000);
// setTimeout(function(){ThunderConnector.command('stop');},3500);
// setTimeout(function(){ThunderConnector.command('fire');},5000);
// setTimeout(function(){ThunderConnector.command('fire');},9000);
// setTimeout(function(){ThunderConnector.command('left');},12000);

// setTimeout(function(){ThunderConnector.command('fire');},13000);
// setTimeout(function(){ThunderConnector.command('left');},18000);

// setTimeout(function(){ThunderConnector.command('fire');},19000);
// setTimeout(function(){ThunderConnector.command('down');},22000);


var https = require('https');
var fs = require('fs');
var options = {
    key: fs.readFileSync('/etc/ssl/server.key'),
    cert: fs.readFileSync('/etc/ssl/server.crt'),
    ca: fs.readFileSync('/etc/ssl/server.ca.crt')
};


https.createServer(options, function(req, res) {
    if (req.method == 'POST') {
        var jsonString = '';
        req.on('data', function(data) {
            jsonString += data;
        });
        req.on('end', function() {
            console.dir(jsonString, {
                depth: 5
            });
            echoResponse = {};
            echoResponse.version = "1.0";
            echoResponse.response = {};
            echoResponse.response.outputSpeech = {};


            echoResponse.response.outputSpeech.type = "PlainText"
            echoResponse.response.outputSpeech.text = "Awaiting your command!"
            echoResponse.response.shouldEndSession = "false";
            theRequest = JSON.parse(jsonString);
            console.log('JSON', theRequest.request);
            if (typeof theRequest.request.intent !== 'undefined') {
                choice = theRequest.request.intent.slots.Choice.value;
                echoResponse.response.outputSpeech.text = choice;
                degrees = theRequest.request.intent.slots.Degrees.value;
                //console.log("degrees",degrees);

                if(choice === "center"){
                    echoResponse.response.outputSpeech.text = 'center';
                    setTimeout(function(){ThunderConnector.command('left');},0);
                    setTimeout(function(){ThunderConnector.command('stop');},5000);
                    setTimeout(function(){ThunderConnector.command('down');},6000);
                    setTimeout(function(){ThunderConnector.command('stop');},10000);
                    setTimeout(function(){ThunderConnector.command('right');},11000);
                    setTimeout(function(){ThunderConnector.command('stop');},15000);
                    setTimeout(function(){ThunderConnector.command('up');},16000);
                    setTimeout(function(){ThunderConnector.command('stop');},18000);
                }
                if(choice === "counterclockwise"){
                    // echoResponse.response.outputSpeech.text = 'left';
                    // missile.turnLeftDegrees(10);
                    console.log("moved left");
                    //turnLeftDegrees(10);
                    data = {left: speed, right: -speed};
                    console.log("speed",speed);
                    speed = speed + 20;
                    console.log("speed2",speed);
                    robot.drive(data);
                }
                if(choice === "clockwise"){
                    // echoResponse.response.outputSpeech.text = 'right';
                    // missile.turnRightDegrees(10);
                    console.log("moved right");
                    //turnRightDegrees(10);
                    data = {left: -speed, right: speed};
                    console.log("speed",speed);
                    speed = speed + 20;
                    console.log("speed2",speed);
                    robot.drive(data);
                } 
                if(choice === "forward"){
                    // echoResponse.response.outputSpeech.text = 'up';
                    // setTimeout(function(){ThunderConnector.command('up');},0);
                    // setTimeout(function(){ThunderConnector.command('stop');},500);
                    console.log("moved forward");
                    //up(10);
                    data = {left: speed, right: speed};
                    console.log("speed",speed);
                    //speed = speed + 20;
                    //console.log("speed2",speed);
                    robot.drive(data);
                } 
                if(choice === "back"){
                    // echoResponse.response.outputSpeech.text = 'down';
                    // setTimeout(function(){ThunderConnector.command('down');},0);
                    // setTimeout(function(){ThunderConnector.command('stop');},500);
                    console.log("moved backwards");
                    //down(10);
                    data = {left: -speed, right: -speed};
                    console.log("speed",speed);
                    speed = speed + 20;
                    console.log("speed2",speed);
                    robot.drive(data);
                } 
                if(choice === "stop"){
                    // echoResponse.response.outputSpeech.text = 'stop';
                    // setTimeout(function(){ThunderConnector.command('stop');},0);
                    console.log("stop");
                    data = {left: 0, right: 0};
                    robot.drive(data);
                } 
                if(choice === "speed up"){
                    // echoResponse.response.outputSpeech.text = 'stop';
                    // setTimeout(function(){ThunderConnector.command('stop');},0);
                    console.log("increased speed");
                    speed = speed + 20;
                    console.log("new speed",speed);
                    data = {left: speed, right: speed};
                    robot.drive(data);
                }                          }
                myResponse = JSON.stringify(echoResponse);
                res.setHeader('Content-Length', myResponse.length);
                res.writeHead(200);
                res.end(myResponse);
                console.log('from post', myResponse);

            });
} else {
    myResponse = JSON.stringify(echoResponse);
    res.setHeader('Content-Length', myResponse.length);
    res.writeHead(200);
    res.end(myResponse);
}
}).listen(3000); //Put number in the 3000 range for testing and 443 for production
