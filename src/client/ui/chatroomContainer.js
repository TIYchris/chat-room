import React from 'react';
import io from 'socket.io-client';
import { addMessage, loginUser , logoutUser } from 'actions/actions';
import store from 'store';
import Message from 'ui/message';
import Login from 'ui/login';

require('assets/styles/chatroomContainer.scss');


export default React.createClass({
	getInitialState:function(){
		return {
			messages: [],
			currentMessage: '',
      userName: window.localStorage.getItem('userName')
		};
	},

	componentWillMount: function () {
		this.unsubscribe = store.subscribe(this.storeUpdated);

    if (this.state.userName) {
      loginUser(this.state.userName);
    }
	},

  storeUpdated: function(){
      const currentStore = store.getState();
      this.setState({
          currentMessage: '',
          messages: currentStore.messageReducer.messages,
          userName: currentStore.messageReducer.userName,
          users: currentStore.messageReducer.users
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
      window.localStorage.setItem('color', this.refs.color.value);
      window.localStorage.setItem('font', this.refs.font.value);
      window.localStorage.setItem('fontSize', this.refs.fontSize.value)

    	if (this.state.currentMessage !== '') {
        const payload = {
          content: this.state.currentMessage,
          userName: this.state.userName,
          color: window.localStorage.getItem('color'),
          font: window.localStorage.getItem('font'),
          fontSize: window.localStorage.getItem('fontSize')
        };
      	addMessage(payload);
      	this.setState({
        	currentMessage: ''
      	});  
    	}
    	this.refs.messageInput.focus();
  },

  componentWillUpdate: function () {
    	const node = this.refs.messages;
      if (!node) {
        return;
      }

    	this.shouldScrollBottom = (node.scrollTop + node.offsetHeight) === node.scrollHeight;
  },
  	
  componentDidUpdate: function () {
      const node = this.refs.messages;
   		if (node && this.shouldScrollBottom) {
      		node.scrollTop = node.scrollHeight
    	}
 	},

  logout: function() {
    logoutUser(this.state.userName);
  },

	render: function () {
      if (!this.state.userName) {
         return (<Login />);
      }

	    return (
        <div>
  	    	<div className="chatContainer">
            <button onClick={this.logout}>Logout</button>
  	    		<h1 className="title">The Chat Room</h1>
  	    		<div id="chatarea" ref="messages">
    					{this.state.messages.map(function(message, index){
    						return (<Message key={index} message={message} />)
    					})}
    				</div>
  	    		<form id="chatform" onSubmit={this.onSubmit}>
      				<input autoComplete="off" className="text" ref="messageInput" onChange={this.onChange} value={this.state.currentMessage} type="text" id="chatfield" />
      			  <button className="button" type="submit">Submit</button>
    				</form>
  	    	</div>
          <div className="usersBox">
            {this.state.users.map(function(user, index){
              return (<div key={index}>{user}</div>)
            })}
          </div>
          <form className="prefs">
              <input type="color" ref="color" />
              <select ref="fontSize">
                <option style={{fontSize: '16px'}}>normal</option>
                <option style={{fontSize: '12px'}}>small</option>
                <option style={{fontSize: '20px'}}>large</option>
              </select>
              <select ref="font">
                <option style={{fontFamily: 'Comic Sans MS'}}>Comic Sans MS</option>
                <option style={{fontFamily: 'Arial'}}>Arial</option>
                <option style={{fontFamily: 'Georgia, serif'}}>Georgia, serif</option>
                <option style={{fontFamily: 'Arial, Helvetica, sans-serif'}}>Arial, Helvetica, sans-serif</option>
                <option style={{fontFamily: "'Arial Black', Gadget, sans-serif"}}>Arial Black, Gadget, sans-serif</option>
                <option style={{fontFamily: "'Comic Sans MS', cursive, sans-serif"}}>Comic Sans MS, cursive, sans-serif</option>
                <option style={{fontFamily: 'Impact, Charcoal, sans-serif'}}>Impact, Charcoal, sans-serif</option>
                <option style={{fontFamily: 'Tahoma, Geneva, sans-serif'}}>Tahoma, Geneva, sans-serif</option>
                <option style={{fontFamily: "'Courier New', Courier, monospace"}}>"Courier New", Courier, monospace</option>
                <option style={{fontFamily: "'Lucida Console', Monaco, monospace"}}>"Lucida Console", Monaco, monospace</option>
              </select>
            </form>
        </div>
	    )
	}
});
