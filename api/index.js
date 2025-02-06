const express = require('express');
const app = express();
const ws = require("ws");

// Create application/x-www-form-urlencoded parser
app.use(express.static('public'));

app.get('/', function (req, res) {
	res.status(200).send('<h1>hello</h1>');
});

app.get('/about', function (req, res) {
	res.status(200).send('<h1>about page</h1>');
});

const eof = function() {
  ws.send('<EOL>'); 
}

const message = function(data, flags) {
  var message = data.toString("utf-8"); 
      split = message.split(' '),
      command = split[0];
  
  console.log('[TerminalServer] Message: ', message);
  switch (command) {
    case "shit": 
      ws.send('right now the only command is "help" and it\'s not very helpful'); 
      eof();
      break;
    case "help": 
      ws.send('you get no help'); 
      eof();
      break;
    case "": 
      ws.send(''); 
      eof();
      break;
    case "generate": 
      ws.send('<br>');
      ws.send('_.o[ Internet Proceedural Generation Script ]o._<br><br>');
      // this.initdb();
      // this.generate(split[1], split[2]);
      break;
    default: 
      ws.send("'" + command + "' is not a valid command"); 
      eof();
      break;
  }
}
const connected = function(ws, req) {
  console.log('[TerminalServer] Connected: ', req.socket.remoteAddress);
  ws.send('established.<br>');

  eof();

  ws.on('message', function (data, flags) { message(data, flags) });
}

const websockserver = new ws.Server({ 
  port: 443,
  path: '/terminal'
});

websockserver.on('connection', function (ws, req) { connected(ws, req) });
console.log('[TerminalServer] Listening for websockets');

app.listen(3000, () => console.log('Server ready on port 3000.'));

module.exports = app;