import React from 'react';
import io from 'socket.io-client';
import Chatroom from 'ui/chatroom';


var socket = io();


export default React.createClass({
	getInitialState:function(){
		return {
			messages: [],
		};
	},

	componentWillMount:function(){
		socket.on('new message', this.onNewMessage);
	},

	onNewMessage: function(data) {
		this.addMessage(data.msg);		
	},

	addMessage: function(value){
		var messages = this.state.messages;
		messages.push(value);

		this.setState({
			messages: messages
		})
	},

	onSubmit: function(e){
		e.preventDefault();

		var chatfield = document.querySelector("#chatfield");

		var val = chatfield.value;
		this.addMessage(val);

		socket.emit('message', {msg: val});

		chatfield.value = "";
	},

  // 	componentWillUpdate: function () {
  //   	var node = this.refs.messages;
  //   	this.shouldScrollBottom = node.scrollTop + node.offsetHeight === node.scrollHeight;
  // 	},
  	
  // 	componentDidUpdate: function () {
  //  		if (this.shouldScrollBottom) {
  //     		var node = this.refs.messages;
  //     		node.scrollTop = node.scrollHeight
  //   	}
 	// },

	render: function () {
	    return (
	    	<Chatroom messages={this.state.messages} onSubmit={this.onSubmit} />
	    	
	    )
	}
});
