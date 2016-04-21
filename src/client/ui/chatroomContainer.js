import React from 'react';
import io from 'socket.io-client';
import { addMessage } from 'actions/actions';
import store from 'store';
import Message from 'ui/message';
import Login from 'ui/login';

require('assets/styles/chatroomContainer.scss');

var socket = io();


export default React.createClass({
	getInitialState:function(){
		return {
			messages: [],
			currentMessage: ''
		};
	},

	componentWillMount: function () {
		this.unsubscribe = store.subscribe(this.storeUpdated);
	},

  storeUpdated: function(){
      let currentStore = store.getState();
      this.setState({
          currentMessage: '',
          messages: currentStore.messageReducer.messages
      });
  },

	componentWillUnmount: function () {
    	this.unsubscribe();
  },

	onChange: function () {
    	this.setState({
      		currentMessage: this.refs.messageInput.value
    	});
  },

	onSubmit: function(e){
    	e.preventDefault();

    	if (this.state.currentMessage !== '') {
        var payload = {
          content: this.state.currentMessage,
          userName: window.localStorage.getItem('userName'),
          color: window.localStorage.getItem('color')
        };
      	addMessage(payload);
      	this.setState({
        	currentMessage: ''
      	});
    	}
    	this.refs.messageInput.focus();
  },

  componentWillUpdate: function () {
    	var node = this.refs.messages;
    	this.shouldScrollBottom = (node.scrollTop + node.offsetHeight) === node.scrollHeight;
  },
  	
  componentDidUpdate: function () {
   		if (this.shouldScrollBottom) {
      		var node = this.refs.messages;
      		node.scrollTop = node.scrollHeight
    	}
 	},

  logout: function() {
    window.localStorage.removeItem("userName");
    location.reload();
  },

	render: function () {
      if (!window.localStorage.getItem("userName")) {
         return (<Login />);
      }

	    return (
	    	<div>
          <button onClick={this.logout}>Logout</button>
	    		<h1 className="title">The Chat Room</h1>
	    		<div id="chatarea" ref="messages">
  					{this.state.messages.map(function(message, index){
  						return (<Message key={index} message={message} />)
  					})}
  				</div>
	    		<form id="chatform" onSubmit={this.onSubmit}>
    				<input className="text" ref="messageInput" onChange={this.onChange} value={this.state.currentMessage} type="text" id="chatfield" />
    				<button className="button" type="submit">Submit</button>
  				</form>
	    	</div>
	    )
	}
});
