const express = require('express');
const https = require('https');
const fs = require('fs');
const WebSocket = require('ws');

const app = express();

// HTTPS options
const options = {
//   key: fs.readFileSync('path/to/your/key.pem'),
//   cert: fs.readFileSync('path/to/your/cert.pem')
};

// Create HTTPS server
const server = https.createServer(options, app);

// Create WebSocket server on top of HTTPS server
const wss = new WebSocket.Server({ server });

// Handle WebSocket connections
wss.on('connection', function connection(ws) {
  console.log('Client connected');

  ws.on('message', function incoming(message) {
    console.log('received: %s', message);

    // Broadcasting to all clients
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  // Optional: Send a message to the client when it connects
  ws.send('Welcome to the WebSocket server!');
});

// Start the server
server.listen(443, () => {
  console.log('HTTPS server listening on port 443');
});