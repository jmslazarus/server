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
websockserver = new ws.Server({ 
  // server: https.createServer({
  //   key: fs.readFileSync('key.pem'),
  //   cert: fs.readFileSync('cert.pem')
  // }),
  port: 443,
  path: '/terminal'
});
app.listen(3000, () => console.log('Server ready on port 3000.'));

module.exports = app;