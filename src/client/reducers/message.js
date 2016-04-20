/*
Message example:
messages: [
  {
    creator: 'username',
    creatorColor: '#666666',
    content: 'asdf',
    contentColor: '#666666'
  },
  {...}
]

 */

const messagesInitialState = {
  messages: []
}

export default function (state = messagesInitialState, action) {
  switch (action.type) {
    case 'ADD_MESSAGE':

      let newState = Object.assign({}, state);

      newState.messages.push(action.message);

      return newState;

    default:
      return state;
  }
}
