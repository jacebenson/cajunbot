// Setup basic express server
var fs = require('fs');
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

var responses = {};
var responsesDirectory = './responses/';

fs.readdir(responsesDirectory, function(err, files) {
 files.forEach(function(file) {
  try {
    responses[file] = require(responsesDirectory + file);
  } catch (e) {
    console.log(e);
  }
  });
});   
server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static('chat'));

// constructors
var bot = {};

// Chatroom

var numUsers = 0;

io.on('connection', function (socket) {
  var addedUser = false;

  // when the client emits 'new message', this listens and executes
  socket.on('new message', function (data) {
    // we tell the client to execute 'new message'
    socket.broadcast.emit('new message', {
      username: socket.username,
      message: data
    });
    console.log(data);
    for(var response in responses){
            var msg = {
                    author: {
                            bot: (function(){
                                    var returnBool = false;
                                    if(socket.username === 'CajunBot'){
                                            returnBool = true;
                                    }
                                    return returnBool;
                            })()
                    },
                    channel: {
                            send: function(dataString){
                                    console.log('trying to send message back...', dataString);
                                    var message = {
                                            username: 'CajunBot',
                                            message: dataString
                                    }
                                    //socket.broadcast.emit('new message', message);
                                    io.emit('new message', message);
                            }
                    },
                    content: data
            };
     responses[response].command(bot,msg , responses);
   }
  });

  // when the client emits 'add user', this listens and executes
  socket.on('add user', function (username) {
    if (addedUser) return;

    // we store the username in the socket session for this client
    socket.username = username;
    ++numUsers;
    addedUser = true;
    socket.emit('login', {
      numUsers: numUsers
    });
    // echo globally (all clients) that a person has connected
    socket.broadcast.emit('user joined', {
      username: socket.username,
      numUsers: numUsers
    });
  });

  // when the client emits 'typing', we broadcast it to others
  socket.on('typing', function () {
    socket.broadcast.emit('typing', {
      username: socket.username
    });
  });

  // when the client emits 'stop typing', we broadcast it to others
  socket.on('stop typing', function () {
    socket.broadcast.emit('stop typing', {
      username: socket.username
    });
  });

  // when the user disconnects.. perform this
  socket.on('disconnect', function () {
    if (addedUser) {
      --numUsers;

      // echo globally that this client has left
      socket.broadcast.emit('user left', {
        username: socket.username,
        numUsers: numUsers
      });
    }
  });
});
