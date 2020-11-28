var app = require('express')();
var http = require('http').Server(app);
var io = require('./node_modules/socket.io')(http);
var port = process.env.PORT || 3000;


let onlineUsers = {};


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });


  socket.on('new user', function(username) {
    //Save the username as key to access the user's socket id
    onlineUsers[username] = socket.id;
    //Save the username to socket as well. This is important for later.
    socket["username"] = username;
    console.log(`✋ ${username} has joined the chat! ✋`);
    io.emit("new user", username, {
      // channels : channels,
    });
  })

});


http.listen(port, function(){
  console.log('listening on *:' + port);
});
