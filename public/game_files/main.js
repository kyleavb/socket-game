var socket = io.connect('http://localhost:3001');

$(document).ready(()=>{
    $('#sub').click(function(e){
        console.log('button clicked')
        socket.emit('send-chat', $('#m').val());
    });

    socket.on('rec-chat', function(msg){
        $('#msg').prepend($('<li>').text(msg));
    });
})