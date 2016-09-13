$(document).ready(function() {
  var socket = io.connect();
  var $chat = $('#chat');
  var $message_text = $('#message_text');
  var $message_btn = $('#message_btn');

  $message_btn.click(function(event) {
    socket.emit('send message', $message_text.val());
    $message_text.val('');
  });

  socket.on('new message', function(data){
    $chat.append(data + "<br/>");

  });
});
