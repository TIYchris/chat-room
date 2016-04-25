import socketio from 'socket.io';

const users = [];

export default (server) => {
  const io = new socketio(server);

  io.on('connection', function(socket) {
    socket.on('add:message', function (message) {
      socket.broadcast.emit('add:message', message);
    });

    socket.on('USER_JOINED', function (userName) {
    	users.push({
        userName: userName,
        socket: socket
      });

      socket.broadcast.emit('USER_JOINED', userName);
  	});

  	socket.on('USER_LEFT', function (userName) {
  		const index = findIndex(users, function(user) {
        return user.userName === userName;
      });

  		if (index > -1) {
  			users.splice(index, 1);
  		}

      socket.broadcast.emit('USER_LEFT', userName);
  	});

    socket.on('disconnect', function() {
      const index = findIndex(users, function(user) {
        return user.socket === socket;
      });

      if (index > -1) {
        socket.broadcast.emit('USER_LEFT', users[index].userName);
        users.splice(index, 1);
      }
    });

    // One second after connection, send a "joined" message for everyone already logged in.
  	setTimeout(function() {
      users.forEach(function(user) {
    	   socket.emit('USER_JOINED', user.userName);
      });
  	}, 1000);  	
  });
}

function findIndex(array, cb) {
  for (var i = 0; i < array.length; ++i) {
    if (cb(array[i])) {
      return i;
    }
  }

  return -1;
}
