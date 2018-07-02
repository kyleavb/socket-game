var express = require('express');
var app = express();
var db = require('../models');
var router = express.Router();
var isLoggedIn = require('../middleware/isLoggedIn');
var gamePort = process.env.GAME_PORT
var server = app.listen(gamePort, ()=>{
    console.log(`Castor Running on ${gamePort}`)
});
var socket = require('socket.io');
var io = socket(server);

function newConnect(user){
    io.sockets.on("connection", (socket)=>{
        socket.username = user;
        console.log(`User: ${socket.username} has connected!`);

        socket.on('send-chat', function(data){
            console.log(`User ${socket.username} sent chat: ${data}`);
            io.emit('rec-chat', socket.username + ': ' + data);
        });
    });
}

router.get('/', isLoggedIn,(req, res)=>{
    newConnect(req.user.user_name)
    res.render('game');
    
})

module.exports = router;