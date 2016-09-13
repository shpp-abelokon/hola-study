var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var port = process.env.PORT || 3000;

server.listen(port, function(){
  console.log('Server started');
});

app.use('/', express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

io.sockets.on('connection', function(socket){
  socket.on('send message', function(data){
    io.sockets.emit('new message', data);
    // socket.broadcast.emit('new message', data);
  });
});
