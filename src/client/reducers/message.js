const messagesInitialState = {
  messages: [],
  users: []
}

export default function (state = messagesInitialState, action) {
  const newState = Object.assign({}, state);

  switch (action.type) {
    case 'ADD_MESSAGE':
    	newState.messages.push(action.message);
    	break;

    case 'USER_LOGGED_IN':
    	newState.userName = action.userName;
    	break;

    case 'USER_LOGGED_OUT':
    	newState.userName = undefined;
    	break;

    case 'USER_JOINED':
    	newState.users.push(action.userName);
    	break;

    case 'USER_LEFT':
    	var index = newState.users.indexOf(action.userName);
		if (index > -1) {
		    newState.users.splice(index, 1);
		}
    	break;
  }

  return newState;
}
