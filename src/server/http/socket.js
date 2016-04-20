import socketio from 'socket.io';

export default (server) => {
  const io = new socketio(server);

  io.on('connection', function(socket) {
    socket.on('message', function (message) {
      socket.broadcast.emit('new message', message);
    })
  });
}


