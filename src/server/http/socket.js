import socketio from 'socket.io';

export default (server) => {
  const io = new socketio(server);

  io.on('connection', function(socket) {
    socket.on('add:message', function (message) {
      socket.broadcast.emit('add:message', message);
    })
  });
}


