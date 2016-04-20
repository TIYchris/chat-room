import store from 'store';
import io from 'socket.io-client';

const socket = io();

socket.on('add:message', function(message){
  store.dispatch({
    type: 'ADD_MESSAGE',
    message: message
  });
})

export function addMessage(message) {
  socket.emit('add:message', message);
  store.dispatch({
    type: 'ADD_MESSAGE',
    message: message
  });
}
