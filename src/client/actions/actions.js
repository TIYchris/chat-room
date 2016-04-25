import store from 'store';
import io from 'socket.io-client';

const socket = io();

socket.on('add:message', function(message){
  store.dispatch({
    type: 'ADD_MESSAGE',
    message: message
  });
});

socket.on('USER_JOINED', function(userName){
  store.dispatch({
    type: 'USER_JOINED',
    userName: userName
  });

  store.dispatch({
    type: 'ADD_MESSAGE',
    message: {
      userName: "system",
      content: userName + ' has joined',
      fontStyle: "italic",
      fontSize: "10px",
      time: new Date()
    }
  });
});

socket.on('USER_LEFT', function(userName){
  store.dispatch({
    type: 'USER_LEFT',
    userName: userName
  });

  store.dispatch({
    type: 'ADD_MESSAGE',
    message: {
      userName: "system",
      content: userName + ' has left',
      fontStyle: "italic",
      fontSize: "10px",
      time: new Date()
    }
  });
});

socket.on('USERS', function(users){
  console.log("Current Users: ", users)
});

export function addMessage(message) {
  socket.emit('add:message', message);
  store.dispatch({
    type: 'ADD_MESSAGE',
    message: message
  });
}

export function loginUser(userName) {
	socket.emit("USER_JOINED", userName);
    window.localStorage.setItem("userName", userName);
	store.dispatch({
		type: "USER_LOGGED_IN",
		userName: userName
	});
}

export function logoutUser(userName) {
	socket.emit("USER_LEFT", userName);
    window.localStorage.removeItem("userName");
    store.dispatch({
      type: "USER_LOGGED_OUT"
    });

}