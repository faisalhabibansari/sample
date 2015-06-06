var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var users ={};

app.get('/hello', function(req, res){
 res.send('<h1>Hello world</h1>');
  
});

app.get('/', function(req, res){
 // res.send('<h1>Hello world</h1>');
 res.sendFile(__dirname + '/index.html');
  
});

app.get('/test1', function(req, res){
 res.sendFile(__dirname + '/test1.html');
  
});

app.get('/test3', function(req, res){
 res.sendFile(__dirname + '/test3.html');
  
});


/*
io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
    console.log('user disconnected');
  });
   socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    io.emit('chat message', "hii   "+msg);
  });
});*/

/*
io.on('connection', function(socket){

//console.log("socket  :"+socket.id);

    console.log("url"+socket.handshake.url);
    clientId=socket.handshake.query.clientId;
    console.log("connected clientId:"+clientId);
    

   socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    io.emit('chat message', "hii   "+msg);
  });
});
*/

io.on('connection', function(socket){

    clientId=socket.handshake.query.clientId;
    console.log("connected clientId:"+clientId);

    users[clientId] = socket;
    console.log(clientId+" socket  :"+users[clientId].id);
    
   socket.on('chat message', function(msg){
    console.log('message: ' + msg.ms);
    if(users.hasOwnProperty(msg.to))
    {
    	users[msg.to].emit('chat message', msg.from+" : "+msg.ms)
    }
    else
    {
      // io.emit('chat message', msg.from+" : "+msg.ms); //sends message to everyone including sender.
       socket.broadcast.emit('chat message', msg.from+" : "+msg.ms); //sends message to everyone excluding sender.
    }
  });
});






http.listen(3000, function(){
  console.log('listening on *:3000');
});