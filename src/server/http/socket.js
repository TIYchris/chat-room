import socketio from 'socket.io';

const users = [];

export default (server) => {
  const io = new socketio(server);

  io.on('connection', function(socket) {
    socket.on('add:message', function (message) {
      socket.broadcast.emit('add:message', message);
    });

    socket.on('USER_JOINED', function (userName) {
    	users.push(userName);
      	socket.broadcast.emit('USER_JOINED', userName);
  	});

  	socket.on('USER_LEFT', function (userName) {
  		const index = users.find(userName);
  		if (index > -1) {
  			users.splice(index, 1);
  		}
      	socket.broadcast.emit('USER_LEFT', userName);
  	});

	// setInterval(function() {
	//    socket.broadcast.emit('USERS', users);
	// }, 1000);  	
  });
}

