var PORT = 8111;
var net = require('net');
var socket = net.connect({port:8111},function(){
    socket.write('session opened');
    socket.on('data',function(data){
      console.log(data.toString());
      socket.destroy();
    });

    socket.on('close',function(){
      console.log('session closed');
    });
});
