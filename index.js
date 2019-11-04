const path = require('path');
const express = require('express');
const app = express();

//settings
app.set('port', process.env.PORT || 3000);

//static files
app.use(express.static(path.join(__dirname, 'public')));


//start the server
const server = app.listen(app.get('port'), ()=>{
  console.log('server on port', app.get('port'));
});

//websocket
const SocketIO = require('socket.io');
const io = SocketIO(server);

io.on('connection', (socket)=>{
  console.log('new connection is done', socket.id);

  socket.on('mymessage', (data)=>{
    io.sockets.emit('mymessage', data);
  });

  socket.on('chat:typing',(data)=>{
    socket.broadcast.emit('chat:typing', data);
  })
});
