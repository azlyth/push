var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

// Return static assets
app.use(express.static(__dirname + "/assets"));

// Start the server
server.listen(8000);

var percentSize = 30;

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  socket.emit('initialize', percentSize);

  socket.on('change', function (change) {
    percentSize += change;
    socket.emit('update', percentSize);
    socket.broadcast.emit('update', percentSize);
  });

});
