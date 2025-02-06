const express = require('express');
const https = require('https');
const app = express();
const ws = require("ws");

// Create application/x-www-form-urlencoded parser
app.use(express.static('public'));
const server = https.createServer({ /* options */ }, app).listen(3001);
app.get('/', function (req, res) {
	res.status(200).send('<h1>hello</h1>');
});

app.get('/about', function (req, res) {
	res.status(200).send('<h1>about page</h1>');
});

const eof = function(ws) {
  ws.send('<EOL>'); 
}

const message = function(ws, data, flags) {
  var message = data.toString("utf-8"); 
      split = message.split(' '),
      command = split[0];
  
  console.log('[TerminalServer] Message: ', message);
  switch (command) {
    case "shit": 
      ws.send('right now the only command is "help" and it\'s not very helpful'); 
      eof(ws);
      break;
    case "help": 
      ws.send('you get no help'); 
      eof(ws);
      break;
    case "": 
      ws.send(''); 
      eof(ws);
      break;
    case "generate": 
      ws.send('<br>');
      ws.send('_.o[ Internet Proceedural Generation Script ]o._<br><br>');
      // this.initdb();
      // this.generate(split[1], split[2]);
      break;
    default: 
      ws.send("'" + command + "' is not a valid command"); 
      eof(ws);
      break;
  }
}
const connected = function(ws, req) {
  console.log('[TerminalServer] Connected: ', req.socket.remoteAddress);
  ws.send('established.<br>');

  eof(ws);

  ws.on('message', function (data, flags) { message(ws, data, flags) });
}

const websockserver = new ws.Server({ 
  server: server
});

websockserver.on('connection', function (ws, req) { connected(ws, req) });
console.log('[TerminalServer] Listening for websockets');


// websockserver.handleUpgrade(req, req.socket, Buffer.alloc(0), (ws) => {
//   wss.emit('connection', ws, req);
// });
app.listen(3000, () => console.log('Server ready on port 3000.'));

module.exports = app;